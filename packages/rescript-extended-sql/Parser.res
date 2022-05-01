type rec node =
  | SQL_Chunk(string)
  | InlineComment(string)
  | BlockComment(string)
  | Parameter(string)
  | RawParameter(string, array<string>)
  | BatchParameter(string, string, ast)
and ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {attributes: attributes, ast: ast}
type parseError = {message: string, pos: int}

type state = {
  symbols: array<string>,
  mutable pos: int,
}
let makeState = text => {
  symbols: text->Js.String2.castToArrayLike->Js.Array2.from,
  pos: 0,
}
let checkPos = state => {
  let pos = state.pos
  let len = state.symbols->Js.Array2.length
  if state.pos < 0 {
    Js.Exn.raiseError(j`Position can't be negative: $pos`)
  } else if state.pos > len {
    Js.Exn.raiseError(j`Position can't be greater than the text lenght: $pos > $len`)
  }
}
let end = state => state.pos >= state.symbols->Js.Array2.length
let at = (state, pos) =>
  pos < state.symbols->Js.Array2.length ? state.symbols->Js.Array2.unsafe_get(pos) : ""
let next = state => {
  state.pos = state.pos + 1
  state->checkPos
}
let back = (state, offset) => {
  state.pos = state.pos - offset
  state->checkPos
}
let skip = (state, offset) => {
  state.pos = state.pos + offset
  state->checkPos
}
let current = state => state->at(state.pos)
let current2 = state => (state->at(state.pos), state->at(state.pos + 1))

let skipUntil = (state, fn) => {
  while (
    state.pos < state.symbols->Js.Array2.length &&
      !fn(. state.symbols->Js.Array2.unsafe_get(state.pos))
  ) {
    state->next
  }
}

let cutStr = (state, start, end) =>
  state.symbols->Js.Array2.slice(~start, ~end_=end + 1)->Js.Array2.joinWith("")

// type metaNode = {
//   node: node,
//   start: int,
//   end: int,
//   rawText: string,
// }
//
// let parseWith = (state, nodeParser): result<metaNode, parseError> => {
//   let start = state.pos
//   switch nodeParser(state) {
//   | Ok(node) => {
//       state->next
//       Ok({
//         node: node,
//         start: start,
//         end: state.pos - 1,
//         rawText: state->cutStr(start, state.pos - 1),
//       })
//     }
//   // TODO: have start/end in the error
//   | Error(message) => Error({message: message, pos: state.pos})
//   }
// }

// -- comment
// ^
let parseInlineComment = state => {
  state->skip(2)
  let start = state.pos
  state->skipUntil((. x) => x === "\n")
  state->back(1)
  state->cutStr(start, state.pos)->InlineComment->Ok
}

// /* comment */
// ^
let parseBlockComment = state => {
  state->skip(2)
  let rec loop = acc => {
    if state->end {
      Error("Was expecting a block comment close sequence */, but reached the end of the string")
    } else {
      switch state->current2 {
      | ("*", "/") => {
          state->next
          acc->BlockComment->Ok
        }
      | ("/", "*") => {
          state->skip(2)
          switch loop("") {
          | Ok(BlockComment(content)) => {
              state->next
              loop(acc ++ "/*" ++ content ++ "*/")
            }
          | err => err
          }
        }
      | (s, _) => {
          state->next
          loop(acc ++ s)
        }
      }
    }
  }
  loop("")
}

// :name:raw<<<...|||...>>>
//      ^
let parseRawParameter = (state, name) => {
  // :raw<<<...
  // ^-->^
  state->skip(4)

  // :raw<<<...
  //     ^->^
  let seqStart = state.pos
  state->skipUntil((. x) => x !== "<")
  let seqLen = state.pos - seqStart

  let items = []
  let addItem = start => items->Js.Array2.push(state->cutStr(start, state.pos - seqLen - 1))->ignore

  let rec loop = (itemStart, delCount, closeCount) => {
    if closeCount === seqLen {
      addItem(itemStart)
      state->back(1)
      RawParameter(name, items)->Ok
    } else if delCount === seqLen {
      addItem(itemStart)
      loop(state.pos, 0, 0)
    } else if state->end {
      let seq = ">"->Js.String2.repeat(seqLen)
      Error(
        `Was expecting a raw parameter close sequence ${seq}, but reached the end of the string`,
      )
    } else {
      switch state->current {
      | ">" => {
          state->next
          loop(itemStart, 0, closeCount + 1)
        }
      | "|" => {
          state->next
          loop(itemStart, delCount + 1, 0)
        }
      | _ => {
          state->next
          loop(itemStart, 0, 0)
        }
      }
    }
  }

  loop(state.pos, 0, 0)
}

let isValidIdentifierCh = ch =>
  ch->Js.String2.length === 1 &&
    switch String.unsafe_get(ch, 0) {
    | '0' .. '9' | 'a' .. 'z' | 'A' .. 'Z' | '_' => true
    | _ => false
    }

// :name:batch<<<...>>>
//      ^
let rec parseBatchParameter = (state, name) => {
  // :batch<<<...>>>
  // ^---->^
  state->skip(6)

  // :batch<<<...>>>
  //       ^->^
  let seqStart = state.pos
  state->skipUntil((. x) => x !== "<")
  let seqLen = state.pos - seqStart

  let rec skipBody = count =>
    if count === seqLen {
      Ok()
    } else if state->end {
      let seq = ">"->Js.String2.repeat(seqLen)
      Error(
        `Was expecting a batch parameter close sequence ${seq}, but reached the end of the string`,
      )
    } else {
      switch state->current {
      | ">" => {
          state->next
          skipBody(count + 1)
        }
      | _ => {
          state->next
          skipBody(0)
        }
      }
    }

  // :batch<<<...>>>
  //          ^---->^
  let bodyStart = state.pos
  switch skipBody(0) {
  | Error(_) as err => err
  | Ok() => {
      state->back(1)
      switch state->cutStr(bodyStart, state.pos - seqLen)->toAst {
      | Ok(ast) => BatchParameter(name, ",", ast)->Ok
      | Error({message, pos}) => {
          state.pos = bodyStart + pos
          Error(message)
        }
      }
    }
  }
}

// :name
// :name:raw<<<...|||...>>>
// :name:batch<<<...>>>
// ^
and parseParameter = state => {
  //  :name
  // ->^
  state->skip(1)

  // :name
  //  ^-->^
  let nameStart = state.pos
  state->skipUntil((. x) => !isValidIdentifierCh(x))

  if nameStart === state.pos {
    Error(
      "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \:",
    )
  } else {
    let name = state->cutStr(nameStart, state.pos - 1)
    if (
      state->at(state.pos + 0) === ":" &&
      state->at(state.pos + 1) === "r" &&
      state->at(state.pos + 2) === "a" &&
      state->at(state.pos + 3) === "w" &&
      state->at(state.pos + 4) === "<"
    ) {
      state->parseRawParameter(name)
    } else if (
      state->at(state.pos + 0) === ":" &&
      state->at(state.pos + 1) === "b" &&
      state->at(state.pos + 2) === "a" &&
      state->at(state.pos + 3) === "t" &&
      state->at(state.pos + 4) === "c" &&
      state->at(state.pos + 5) === "h" &&
      state->at(state.pos + 6) === "<"
    ) {
      state->parseBatchParameter(name)
    } else {
      state->back(1)
      Parameter(name)->Ok
    }
  }
}

and toAst = text => {
  let state = makeState(text)
  let ast = []

  let currentSQLChunk = ref("")
  let commitSQLChunk = () =>
    if currentSQLChunk.contents !== "" {
      ast->Js.Array2.push(SQL_Chunk(currentSQLChunk.contents))->ignore
      currentSQLChunk := ""
    }

  let rec subParse = parser => {
    commitSQLChunk()
    switch parser(state) {
    | Ok(node) => {
        ast->Js.Array2.push(node)->ignore
        state->next
        // FIXME: this tail recursion is not eliminated
        loop()
      }
    | Error(message) => Error({message: message, pos: state.pos})
    }
  }
  and loop = () =>
    if state->end {
      commitSQLChunk()
      Ok()
    } else {
      switch state->current2 {
      | ("-", "-") => subParse(parseInlineComment)
      | ("/", "*") => subParse(parseBlockComment)
      | ("\\", ":") => {
          state->skip(2)
          currentSQLChunk := currentSQLChunk.contents ++ ":"
          loop()
        }
      | (":", _) => subParse(parseParameter)
      | (s, _) => {
          state->next
          currentSQLChunk := currentSQLChunk.contents ++ s
          loop()
        }
      }
    }

  switch loop() {
  | Error(_) as err => err
  | Ok() => Ok(ast)
  }
}

let rec commentsBeforeCode = (i, acc, ast) => {
  if i >= ast->Js.Array2.length {
    acc
  } else {
    switch ast->Js.Array2.unsafe_get(i) {
    | InlineComment(str) | BlockComment(str) => commentsBeforeCode(i + 1, acc ++ "\n" ++ str, ast)
    | SQL_Chunk(str) if str->Js.String2.trim === "" => commentsBeforeCode(i + 1, acc, ast)
    | _ => acc
    }
  }
}
let commentsBeforeCode = commentsBeforeCode(0, "")

let parseAttributes = ast =>
  switch switch %re("/^\s*@name:\s*(.*?)\s*$/m")->Js.Re.exec_(ast->commentsBeforeCode) {
  | Some(result) =>
    switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
    | None => Error("Invalid @name attribute")
    | Some(value) =>
      %re("/^[a-zA-Z][0-9a-zA-Z_]*$/")->Js.Re.test_(value)
        ? Ok(Some(value))
        : Error(`Invalid @name attribute: ${value}`)
    }
  | _ => Ok(None)
  } {
  | Ok(name) => Ok({name: name})
  | Error(msg) => Error({message: msg, pos: -1})
  }

let parse = text =>
  switch toAst(text) {
  | Error(_) as err => err
  | Ok(ast) =>
    switch parseAttributes(ast) {
    | Error(_) as err => err
    | Ok(attributes) => Ok({attributes: attributes, ast: ast})
    }
  }

let rec parseMany = (texts, acc, i) =>
  if i >= texts->Js.Array2.length {
    Ok(
      acc->Js.Array2.filter(parsed =>
        parsed.ast->Js.Array2.some(node =>
          switch node {
          | InlineComment(_) | BlockComment(_) => false
          | SQL_Chunk(str) if str->Js.String2.trim === "" => false
          | _ => true
          }
        )
      ),
    )
  } else {
    switch texts->Js.Array2.unsafe_get(i)->Js.String2.trim->parse {
    | Ok(parsed) => texts->parseMany(acc->Js.Array2.concat([parsed]), i + 1)
    // FIXME: pos should refer to position within file
    | Error(_) as err => err
    }
  }

let parseFile = text =>
  switch toAst(text) {
  | Error(_) as err => err
  | Ok(ast) =>
    text
    ->Js.String2.split(
      switch %re("/^\s*@separator:\s*(.*?)\s*$/m")->Js.Re.exec_(ast->commentsBeforeCode) {
      | Some(result) =>
        switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
        | None => assert false
        // FIXME: need to remove the comment with the custom separator before split()
        | Some(value) => value
        }
      | _ => ";"
      },
    )
    ->parseMany([], 0)
  }

// The above FIXMEs are tricky. We should:
//  - parse the file as a whole,
//  - add a Separator node,
//  - attach {rawText, startPos, endPod} to each node
//  - etc 
