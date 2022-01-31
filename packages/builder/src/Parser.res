%%private(
  let isValidIdentifierCh = ch => {
    let code = ch->Js.String2.charCodeAt(0)
    // 0-9 || A-Z || a-z
    (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
  }
)

type parseState = Code | InlineComment | BlockComment
type nameStatus = Looking | Filling(string) | NotFound | Found(string)

type error = NameNotFound

let parseStatement = text => {
  let parameters = []

  let commitParameter = (newText, parameter, nextCh) => {
    let index = parameters->Js.Array2.push(parameter)
    (newText ++ "$" ++ index->Js.Int.toString ++ nextCh, None)
  }

  let rec helper = (newText, state, pos, parameter, name) => {
    let nextCh = text->Js.String2.charAt(pos)

    let state' = switch (state, nextCh, text->Js.String2.charAt(pos + 1)) {
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
  | Ok((name, newText)) => Ok((name, parameters, newText))
  | Error(message) => Error(message)
  }
}
