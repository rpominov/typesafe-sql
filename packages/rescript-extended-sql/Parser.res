type rec node =
  | SQL_Chunk(string)
  | InlineComment(string)
  | BlockComment(string)
  | Parameter(string)
  | Raw(string, array<string>)
  | Batch(string, ast)
and ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {
  rawText: string,
  attributes: attributes,
  ast: ast,
}
type parseError = {message: string, pos: int}

// let rec walk = (arr, pos, atPos, fn) => {
//   let nextPos = pos + 1
//   let atNextPos = arr->Belt.Array.get(nextPos)
//   switch (fn(atPos, atNextPos), atNextPos) {
//   | (Some(x), _) => Ok((nextPos, x))
//   | (None, Some(s)) => walk(arr, nextPos, s, fn)
//   | _ => Error(nextPos)
//   }
// }

let inRange = (arr, pos) => pos < arr->Js.Array2.length

let nextEq = (arr, pos, val) => arr->inRange(pos + 1) && arr->Js.Array2.unsafe_get(pos + 1) === val

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseInlineComment = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Ok((startPos, InlineComment(acc)))
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "\n" => Ok((startPos + 1, InlineComment(acc)))
    | s => parseInlineComment(acc ++ s, symbols, startPos + 1)
    }
  }
let parseInlineComment = parseInlineComment("")

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseBlockComment = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Error({
      message: "Was expecting a block comment close sequence */, but reached the end of the string",
      pos: startPos,
    })
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "*" if symbols->nextEq(startPos, "/") => Ok((startPos + 2, BlockComment(acc)))
    | "/" if symbols->nextEq(startPos, "*") =>
      switch parseBlockComment("", symbols, startPos + 2) {
      | Ok((pos, BlockComment(content))) =>
        parseBlockComment(acc ++ "/*" ++ content ++ "*/", symbols, pos)
      | Error(_) as err => err
      | _ => assert false
      }
    | s => parseBlockComment(acc ++ s, symbols, startPos + 1)
    }
  }
let parseBlockComment = parseBlockComment("")

let isValidIdentifierCh = ch => {
  let code = ch->Js.String2.charCodeAt(0)
  // 0-9 || A-Z || a-z
  (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
}

let rec parseParameter = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Ok((startPos, Parameter(acc)))
  } else {
    let symbol = symbols->Js.Array2.unsafe_get(startPos)
    isValidIdentifierCh(symbol)
      ? parseParameter(acc ++ symbol, symbols, startPos + 1)
      : Ok((startPos, Parameter(acc)))
  }
let parseParameter = parseParameter("")

let toAst = text => {
  let symbols = text->Js.String2.castToArrayLike->Js.Array2.from

  let pos = ref(0)
  let ast = []
  let currentSQLChunk = ref("")
  let error = ref(None)

  let commitSQLChunk = () =>
    if currentSQLChunk.contents !== "" {
      ast->Js.Array2.push(SQL_Chunk(currentSQLChunk.contents))->ignore
      currentSQLChunk := ""
    }

  let commitSubParse = result => {
    commitSQLChunk()
    switch result {
    | Error(err) => error := Some(err)
    | Ok((newPos, commentStr)) => {
        ast->Js.Array2.push(commentStr)->ignore
        pos := newPos
      }
    }
  }

  let nextEq = val => symbols->nextEq(pos.contents, val)

  while error.contents === None && symbols->inRange(pos.contents) {
    switch symbols->Js.Array2.unsafe_get(pos.contents) {
    | "-" if nextEq("-") => parseInlineComment(symbols, pos.contents + 2)->commitSubParse
    | "/" if nextEq("*") => parseBlockComment(symbols, pos.contents + 2)->commitSubParse
    | "$" => parseParameter(symbols, pos.contents + 1)->commitSubParse
    | s => {
        currentSQLChunk := currentSQLChunk.contents ++ s
        pos := pos.contents + 1
      }
    }
  }

  switch error.contents {
  | None => {
      commitSQLChunk()
      Ok(ast)
    }
  | Some(err) => Error(err)
  }
}

@send external flatMap: (array<'a>, 'a => array<'b>) => array<'b> = "flatMap"

let parseAttributes = ast => {
  let allComments =
    ast
    ->flatMap(node =>
      switch node {
      | InlineComment(str) | BlockComment(str) => [str]
      | _ => []
      }
    )
    ->Js.Array2.joinWith("\n")

  switch switch %re("/@name:(.*)/")->Js.Re.exec_(allComments) {
  | Some(result) =>
    switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
    | None => Error("Invalid @name attribute")
    | Some(value) => {
        let trimmed = value->Js.String2.trim
        %re("/^[a-zA-Z][0-9a-zA-Z_]*$/")->Js.Re.test_(trimmed)
          ? Ok(Some(trimmed))
          : Error(`Invalid @name attribute: ${trimmed}`)
      }
    }
  | _ => Ok(None)
  } {
  | Ok(name) => Ok({name: name})
  | Error(msg) => Error({message: msg, pos: -1})
  }
}

let parse = text =>
  switch toAst(text) {
  | Error(_) as err => err
  | Ok(ast) =>
    switch parseAttributes(ast) {
    | Error(_) as err => err
    | Ok(attributes) =>
      Ok({
        rawText: text,
        attributes: attributes,
        ast: ast,
      })
    }
  }
