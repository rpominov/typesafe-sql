let isValidIdentifierCh = ch => {
  let code = ch->Js.String2.charCodeAt(0)
  // 0-9 || A-Z || a-z
  (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
}

type parseState = Code | InlineComment | BlockComment
type name = NotFound | InProgress(string) | Done(string)

let parseStatement = text => {
  let parameters = []

  let commitParameter = (result, parameter, nextCh) => {
    let index = parameters->Js.Array2.push(parameter)
    (result ++ "$" ++ index->Js.Int.toString ++ nextCh, None)
  }

  let rec helper = (result, state, pos, parameter, name) => {
    let nextCh = text->Js.String2.charAt(pos)

    let state' = switch (state, nextCh, text->Js.String2.charAt(pos + 1)) {
    | (_, "", _) => None
    | (Code, "-", "-") => Some(InlineComment)
    | (Code, "/", "*") => Some(BlockComment)
    | (InlineComment, "\n", _) | (BlockComment, "*", "/") => Some(Code)
    | (x, _, _) => Some(x)
    }

    let (result', parameter') = switch (parameter, state', nextCh) {
    | (None, Some(Code), "$") => (result, Some(""))
    | (None, _, n) => (result ++ n, None)
    | (Some(p), Some(Code), n) =>
      isValidIdentifierCh(n) ? (result, Some(p ++ n)) : commitParameter(result, p, n)
    | (Some(p), _, n) => commitParameter(result, p, n)
    }

    let name' = switch (name, state', nextCh) {
    | (NotFound, Some(Code), _) => NotFound
    | (NotFound, _, "@") => InProgress("")
    | (InProgress(val), Some(Code), _) | (InProgress(val), None, _) => Done(val)
    | (InProgress(val), _, n) => isValidIdentifierCh(n) ? InProgress(val ++ n) : Done(val)
    | (x, _, _) => x
    }

    switch state' {
    | None => (name', result')
    | Some(state'') => helper(result', state'', pos + 1, parameter', name')
    }
  }

  let (name, result) = helper("", Code, 0, None, NotFound)

  (name, parameters, result->Js.String2.trim)
}

let parseFileContents = text => text->Js.String2.split(";")->Js.Array2.map(parseStatement)

let example = "

-- @userById
SELECT * FROM users WHERE id = $id;

-- @createUser 
INSERT INTO users(name) 
VALUES ($name/**/) /* test comment $name */
RETURNING *;SELECT * FROM users WHERE id = $id OR $id = 0 -- @userById1"

example->parseFileContents->Js.log
