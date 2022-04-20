type node = Literal(string) | Parameter(string) | Comment(string)
type ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {
  rawText: string,
  attributes: attributes,
  ast: ast,
}

let parse = text => {
  {
    rawText: text,
    attributes: {name: None},
    ast: [Literal(text)],
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
