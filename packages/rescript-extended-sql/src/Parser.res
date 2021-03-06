open TypesafeSqlSharedTypes.ExtendedSql

type state = {
  symbols: array<string>,
  minPos: int, // inclusive
  maxPos: int, // inclusive
  mutable pos: int,
}

let end = state => state.pos > state.maxPos

let at = (state, pos) =>
  pos <= state.maxPos && pos >= state.minPos ? state.symbols->Js.Array2.unsafe_get(pos) : ""

let back = (state, offset) => {
  state.pos = state.pos - offset
  let {pos, minPos} = state
  if state.pos < minPos {
    Js.Exn.raiseError(j`The position can't be less than $minPos got: $pos. This indicates a bug in the parser!`)
  }
}

let skip = (state, offset) => {
  state.pos = state.pos + offset
  let {pos, maxPos} = state

  // it's allowed for `pos` to be `maxPos + 1` indicating the end of the parsing
  let maxPos = maxPos + 1

  if state.pos > maxPos {
    Js.Exn.raiseError(j`The position can't be more than $maxPos got: $pos. This indicates a bug in the parser!`)
  }
}

let current = state => state->at(state.pos)
let current2 = state => (state->at(state.pos), state->at(state.pos + 1))

let skipUntil = (state, predicate) =>
  while state.pos <= state.maxPos && !predicate(. state.symbols->Js.Array2.unsafe_get(state.pos)) {
    state.pos = state.pos + 1
  }

let cutStr = (state, start, end) =>
  state.symbols->Js.Array2.slice(~start, ~end_=end + 1)->Js.Array2.joinWith("")

type subParseError = WithLocation(parseError) | AutoLocation(string) | AutoLocationStart(string)

// -- ...
// ^
let parseInlineComment = state => {
  state->skip(2)
  let start = state.pos
  state->skipUntil((. x) => x === "\n")
  state->back(1)
  state->cutStr(start, state.pos)->#InlineComment->Ok
}

// /* ... */
// ^
let parseBlockComment = state => {
  state->skip(2)
  let rec loop = acc => {
    if state->end {
      "Was expecting a block comment close sequence */, but reached the end of the string"
      ->AutoLocationStart
      ->Error
    } else {
      switch state->current2 {
      | ("*", "/") => {
          state->skip(1)
          acc->#BlockComment->Ok
        }
      | ("/", "*") => {
          state->skip(2)
          switch loop("") {
          | Ok(#BlockComment(content)) => {
              state->skip(1)
              loop(acc ++ "/*" ++ content ++ "*/")
            }
          | err => err
          }
        }
      | (s, _) => {
          state->skip(1)
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
      #RawParameter({name: name, options: items})->Ok
    } else if delCount === seqLen {
      addItem(itemStart)
      loop(state.pos, 0, 0)
    } else if state->end {
      let seq = ">"->Js.String2.repeat(seqLen)
      `Was expecting a raw parameter close sequence ${seq}, but reached the end of the string`
      ->AutoLocationStart
      ->Error
    } else {
      switch state->current {
      | ">" => {
          state->skip(1)
          loop(itemStart, 0, closeCount + 1)
        }
      | "|" => {
          state->skip(1)
          loop(itemStart, delCount + 1, 0)
        }
      | _ => {
          state->skip(1)
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
let rec parseBatchParameter = (state, name): result<node, subParseError> => {
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
      `Was expecting a batch parameter close sequence ${seq}, but reached the end of the string`->Error
    } else {
      switch state->current {
      | ">" => {
          state->skip(1)
          skipBody(count + 1)
        }
      | _ => {
          state->skip(1)
          skipBody(0)
        }
      }
    }

  // :batch<<<...>>>
  //          ^---->^
  let bodyStart = state.pos
  switch skipBody(0) {
  | Error(message) => Error(AutoLocationStart(message))
  | Ok() => {
      state->back(1)

      switch state.symbols->toAst(bodyStart, state.pos - seqLen) {
      | Ok(ast) => #BatchParameter({name: name, separator: ",", body: ast})->Ok
      | Error(err) => Error(WithLocation(err))
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
  // NOTE: Might be a good idea to disallow first character to be a number.
  // Althoug, this can also be done on the code generation side,
  // if needed by a particular generator.
  state->skipUntil((. x) => !isValidIdentifierCh(x))

  if nameStart === state.pos {
    "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \:"
    ->AutoLocation
    ->Error
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
      #Parameter({name: name})->Ok
    }
  }
}

and toAst = (symbols, min, max) => {
  let state = {
    symbols: symbols,
    minPos: min,
    maxPos: max,
    pos: min,
  }
  let ast = []
  let push = node => ast->Js.Array2.push(node)->ignore

  let sqlChunkStart = ref(None)
  let sqlChunkVal = ref("")
  let pushSqlNode = () =>
    switch sqlChunkStart.contents {
    | None => ()
    | Some(start) => {
        push({start: start, end: state.pos - 1, node: #SqlChunk(sqlChunkVal.contents)})
        sqlChunkVal := ""
        sqlChunkStart := None
      }
    }
  let pushSqlSymbol = symbol => {
    if sqlChunkStart.contents === None {
      sqlChunkStart := Some(state.pos)
    }
    sqlChunkVal := sqlChunkVal.contents ++ symbol
    state->skip(1)
  }

  let error = ref(None)

  let parseWith = parser => {
    pushSqlNode()
    let start = state.pos
    switch parser(state) {
    | Ok(node) => {
        push({start: start, end: state.pos, node: node})
        state->skip(1)
      }
    | Error(AutoLocation(message)) =>
      error := Some({start: start, end: Js.Null.return(state.pos), message: message})
    | Error(AutoLocationStart(message)) =>
      error := Some({start: state.pos, end: Js.null, message: message})
    | Error(WithLocation(err)) => error := Some(err)
    }
  }

  while !(state->end) && error.contents === None {
    switch state->current2 {
    | ("-", "-") => parseWith(parseInlineComment)
    | ("/", "*") => parseWith(parseBlockComment)
    | (":", _) => parseWith(parseParameter)
    | ("\\", ":") => {
        pushSqlSymbol(":")
        state->skip(1)
      }
    | (s, _) => pushSqlSymbol(s)
    }
  }

  switch error.contents {
  | Some(err) => Error(err)
  | None => {
      pushSqlNode()
      Ok(ast)
    }
  }
}

let parseAttribute = (text, id) =>
  switch Js.Re.fromStringWithFlags("^\s*\*?\s*@" ++ id ++ ":\s*(.*?)\s*$", ~flags="m")->Js.Re.exec_(
    text,
  ) {
  | Some(result) =>
    switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
    | None => assert false
    | Some(str) => Some(str)
    }
  | _ => None
  }

let parseAttributes = (ast: ast) => {
  let rec loop = i =>
    if i < ast->Js.Array2.length {
      switch ast->Js.Array2.unsafe_get(i) {
      | {start, end, node: #InlineComment(str)} | {start, end, node: #BlockComment(str)} =>
        switch str->parseAttribute("name") {
        | None => loop(i + 1)
        | Some(value) =>
          %re("/^[a-zA-Z][0-9a-zA-Z_]*$/")->Js.Re.test_(value)
            ? Ok({name: Js.Null.return(value)})
            : Error({
                start: start,
                end: Js.Null.return(end),
                message: `Invalid @name attribute: ${value}`,
              })
        }
      | {node: #SqlChunk(str)} if str->Js.String2.trim === "" => loop(i + 1)
      | _ => Ok({name: Js.null})
      }
    } else {
      Ok({name: Js.null})
    }
  loop(0)
}

let rec findDuplicateParameter = (index, seen, ast: ast) => {
  if index >= ast->Js.Array2.length {
    None
  } else {
    switch ast->Js.Array2.unsafe_get(index) {
    | {node: #Parameter({name}) | #RawParameter({name})} as node =>
      seen->Js.Array2.includes(name)
        ? Some(node)
        : findDuplicateParameter(index + 1, seen->Js.Array2.concat([name]), ast)
    | {node: #BatchParameter({name, body})} as node =>
      seen->Js.Array2.includes(name)
        ? Some(node)
        : switch findDuplicateParameter(0, [], body) {
          | Some(_) as some => some
          | None => findDuplicateParameter(index + 1, seen->Js.Array2.concat([name]), ast)
          }
    | _ => findDuplicateParameter(index + 1, seen, ast)
    }
  }
}

let toSymbols = text => text->Js.String2.castToArrayLike->Js.Array2.from

let parseSymbols = (symbols, start, end) => {
  switch symbols->toAst(start, end) {
  | Error(_) as err => err
  | Ok(ast) =>
    switch findDuplicateParameter(0, [], ast) {
    | Some({
        start,
        end,
        node: #Parameter({name}) | #RawParameter({name}) | #BatchParameter({name}),
      }) =>
      Error({
        start: start,
        end: Js.Null.return(end),
        message: `The name "${name}" is already used for another parameter`,
      })
    | Some(_) => assert false
    | None =>
      switch parseAttributes(ast) {
      | Error(_) as err => err
      | Ok(attributes) => Ok({attributes: attributes, ast: ast})
      }
    }
  }
}

let parse = text => {
  let symbols = text->toSymbols
  symbols->parseSymbols(0, symbols->Js.Array2.length - 1)
}

let parseFile = text => {
  let symbols = text->toSymbols
  let state = {
    symbols: symbols,
    minPos: 0,
    maxPos: symbols->Js.Array2.length - 1,
    pos: 0,
  }

  let parseComment = parser => {
    let start = state.pos
    switch parser(state) {
    | Ok(#InlineComment(text) | #BlockComment(text)) =>
      switch text->parseAttribute("separator") {
      | None => Ok(None)
      | Some(val) as res =>
        val === ""
          ? Error({
              start: start,
              end: Js.Null.return(state.pos),
              message: "Invalid empty @separator attribute",
            })
          : Ok(res)
      }
    | Ok(_) => assert false
    | Error(AutoLocation(message)) =>
      Error({start: start, end: Js.Null.return(state.pos), message: message})
    | Error(AutoLocationStart(message)) => Error({start: state.pos, end: Js.null, message: message})
    | Error(WithLocation(err)) => Error(err)
    }
  }

  let rec findSeparatorAttribute = () => {
    if state->end {
      Ok(None)
    } else {
      switch state->current2 {
      | ("-", "-") =>
        switch parseComment(parseInlineComment) {
        | Ok(None) => {
            state->skip(1)
            findSeparatorAttribute()
          }
        | res => res
        }
      | ("/", "*") =>
        switch parseComment(parseBlockComment) {
        | Ok(None) => {
            state->skip(1)
            findSeparatorAttribute()
          }
        | res => res
        }
      | (symbol, _) if symbol->Js.String2.trim === "" => {
          state->skip(1)
          findSeparatorAttribute()
        }
      | _ => Ok(None)
      }
    }
  }

  switch findSeparatorAttribute() {
  | Error(_) as err => err
  | Ok(x) => {
      let separator = switch x {
      | None => {
          state.pos = 0
          [";"]
        }
      | Some(text) => {
          state->skip(1)
          text->toSymbols
        }
      }

      let rec isSeparator = i =>
        if i >= separator->Js.Array2.length {
          true
        } else {
          let pos = state.pos + i
          if (
            pos >= state.symbols->Js.Array2.length ||
              state.symbols->Js.Array2.unsafe_get(pos) !== separator->Js.Array2.unsafe_get(i)
          ) {
            false
          } else {
            isSeparator(i + 1)
          }
        }

      let statements = []
      let statementStart = ref(None)
      let pushStatement = () => {
        switch statementStart.contents {
        | None => None
        | Some(start) =>
          switch state.symbols->parseSymbols(start, state.pos - 1) {
          | Ok(statement) => {
              statements->Js.Array2.push(statement)->ignore
              statementStart := None
              None
            }
          | Error(err) => Some(err)
          }
        }
      }

      let rec loop = () => {
        if state->end {
          switch pushStatement() {
          | None => Ok({separator: separator->Js.Array2.joinWith(""), statements: statements})
          | Some(err) => Error(err)
          }
        } else if isSeparator(0) {
          switch pushStatement() {
          | None => {
              state->skip(separator->Js.Array2.length)
              loop()
            }
          | Some(err) => Error(err)
          }
        } else {
          if statementStart.contents === None {
            statementStart := Some(state.pos)
          }
          state->skip(1)
          loop()
        }
      }

      loop()
    }
  }
}
