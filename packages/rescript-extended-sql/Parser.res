type node = SQL_Chunk(string) | Parameter(string) | InlineComment(string) | BlockComment(string)
type ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {
  rawText: string,
  attributes: attributes,
  ast: ast,
}

// let rec walk = (arr, pos, atPos, fn) => {
//   let nextPos = pos + 1
//   let atNextPos = arr->Belt.Array.get(nextPos)
//   switch (fn(atPos, atNextPos), atNextPos) {
//   | (Some(x), _) => Ok((nextPos, x))
//   | (None, Some(s)) => walk(arr, nextPos, s, fn)
//   | _ => Error(nextPos)
//   }
// }

type parseError = {message: string, pos: int}

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseInlineComment = (~acc="", symbols, startPos) => {
  if startPos >= symbols->Js.Array2.length {
    (startPos, acc)
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "\n" => (startPos + 1, acc)
    | s => parseInlineComment(~acc=acc ++ s, symbols, startPos + 1)
    }
  }
}

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseBlockComment = (~acc="", symbols, startPos) => {
  if startPos >= symbols->Js.Array2.length {
    Error({
      message: "Was expecting a block comment close sequence */, but reached the end of the string",
      pos: startPos,
    })
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "*" if symbols->Belt.Array.get(startPos + 1) === Some("/") => Ok((startPos + 2, acc))
    | "/" if symbols->Belt.Array.get(startPos + 1) === Some("*") =>
      switch parseBlockComment(symbols, startPos + 2) {
      | Ok((pos, content)) => parseBlockComment(~acc=acc ++ "/*" ++ content ++ "*/", symbols, pos)
      | _ as err => err
      }
    | s => parseBlockComment(~acc=acc ++ s, symbols, startPos + 1)
    }
  }
}

let parse = text => {
  let symbols = text->Js.String2.castToArrayLike->Js.Array2.from

  let pos = ref(0)
  let ast = []
  let currentSQLChunk = ref("")

  let commitSQLChunk = () => {
    if currentSQLChunk.contents->Js.String2.length > 0 {
      ast->Js.Array2.push(SQL_Chunk(currentSQLChunk.contents))->ignore
      currentSQLChunk := ""
    }
  }

  let error = ref(None)

  while error.contents === None && pos.contents < symbols->Js.Array2.length {
    switch (
      symbols->Js.Array2.unsafe_get(pos.contents),
      symbols->Belt.Array.get(pos.contents + 1),
    ) {
    | ("-", Some("-")) => {
        commitSQLChunk()
        let (newPos, commentStr) = parseInlineComment(symbols, pos.contents + 2)
        ast->Js.Array2.push(InlineComment(commentStr))->ignore
        pos := newPos
      }
    | ("/", Some("*")) => {
        commitSQLChunk()
        switch parseBlockComment(symbols, pos.contents + 2) {
        | Error(err) => error := Some(err)
        | Ok((newPos, commentStr)) => {
            ast->Js.Array2.push(BlockComment(commentStr))->ignore
            pos := newPos
          }
        }
      }
    | (s, _) => {
        currentSQLChunk := currentSQLChunk.contents ++ s
        pos := pos.contents + 1
      }
    }
  }

  switch error.contents {
  | None => {
      commitSQLChunk()
      Ok({
        rawText: text,
        attributes: {name: None},
        ast: ast,
      })
    }
  | Some(err) => Error(err)
  }
}

/////////////////////////////////////////////////////////////////

module ParseTMP = {
  module A = Js.Array2
  module S = Js.String2
  module I = Belt.Int

  type t = {
    name: string,
    parameters: array<string>,
    originalStatement: string,
    processedStatement: string,
  }

  let isValidIdentifierCh = ch => {
    let code = ch->S.charCodeAt(0)
    // 0-9 || A-Z || a-z
    (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
  }

  type parseState = Code | InlineComment | BlockComment
  type nameStatus = Looking | Filling(string) | NotFound | Found(string)

  type error = NameNotFound

  let parseStatement = text => {
    let parameters = []

    let commitParameter = (newText, parameter, nextCh) => {
      let index = parameters->A.push(parameter)
      (newText ++ "$" ++ index->I.toString ++ nextCh, None)
    }

    let rec helper = (newText, state, pos, parameter, name) => {
      let nextCh = text->S.charAt(pos)

      let state' = switch (state, nextCh, text->S.charAt(pos + 1)) {
      | (_, "", _) => None
      | (Code, "-", "-") => Some(InlineComment)
      | (Code, "/", "*") => Some(BlockComment)
      | (InlineComment, "\n", _) | (BlockComment, "*", "/") => Some(Code)
      | (x, _, _) => Some(x)
      }

      let (newText', parameter') = switch (parameter, state', nextCh) {
      | (None, Some(Code), "$") => (newText, Some(""))
      | (None, _, n) => (newText ++ n, None)
      | (Some(p), Some(Code), n) =>
        isValidIdentifierCh(n) ? (newText, Some(p ++ n)) : commitParameter(newText, p, n)
      | (Some(p), _, n) => commitParameter(newText, p, n)
      }

      let name' = switch (name, state', nextCh) {
      | (Looking, Some(Code), _) => NotFound
      | (Looking, _, "@") => Filling("")
      | (Filling(val), Some(Code), _) | (Filling(val), None, _) => Found(val)
      | (Filling(val), _, n) => isValidIdentifierCh(n) ? Filling(val ++ n) : Found(val)
      | (x, _, _) => x
      }

      switch (state', name') {
      | (None, Found(name'')) => Ok((name'', newText'))
      | (None, _) => Error(NameNotFound)
      | (Some(state''), _) => helper(newText', state'', pos + 1, parameter', name')
      }
    }

    switch helper("", Code, 0, None, Looking) {
    | Ok((name, processedStatement)) =>
      Ok({
        name: name,
        parameters: parameters,
        processedStatement: processedStatement,
        originalStatement: text,
      })
    | Error(message) => Error(message)
    }
  }

  let parse = text => {
    let statements = text->S.split(";")->A.map(S.trim)->A.filter(val => val !== "")

    let rec helper = (results, i) => {
      if i === statements->A.length {
        results->Ok
      } else {
        let statement = statements[i]

        switch statement->parseStatement {
        | Ok(res) => results->A.concat([res])->helper(i + 1)
        | Error(NameNotFound) =>
          Error(
            "The following statement is missing a name declaration. Did you forget to add a \"-- @someName\" comment?\n\n" ++
            statement,
          )
        }
      }
    }

    helper([], 0)
  }
}
