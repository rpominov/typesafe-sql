module DescribeQuery = TypesafeSQLDescribeQuery

@send external flat: array<array<'a>> => array<'a> = "flat"

let isValidIdentifierCh = ch => {
  let code = ch->Js.String2.charCodeAt(0)
  // 0-9 || A-Z || a-z
  (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
}

type parseState = Code | InlineComment | BlockComment
type name = Looking | InProgress(string) | NotFound | Found(string)

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
    | (Looking, _, "@") => InProgress("")
    | (InProgress(val), Some(Code), _) | (InProgress(val), None, _) => Found(val)
    | (InProgress(val), _, n) => isValidIdentifierCh(n) ? InProgress(val ++ n) : Found(val)
    | (x, _, _) => x
    }

    switch (state', name') {
    | (None, Found(name'')) => Ok((name'', newText'))
    | (None, _) =>
      Error(
        "The following statement is missing a name declaration. Did you forget to add a \"-- @someName\" comment?\n\n" ++
        text,
      )
    | (Some(state''), _) => helper(newText', state'', pos + 1, parameter', name')
    }
  }

  switch helper("", Code, 0, None, Looking) {
  | Ok((name, newText)) => Ok((name, parameters, newText))
  | Error(message) => Error(message)
  }
}

type parsedAndDescribed = {
  name: string,
  parameters: array<string>,
  text: string,
  description: DescribeQuery.description,
}

let processFileContent = (client, text, cb) => {
  let statements =
    text->Js.String2.split(";")->Js.Array2.map(Js.String2.trim)->Js.Array2.filter(val => val !== "")

  let rec helper = (index, results) => {
    if index >= statements->Js.Array2.length {
      results->Ok->cb
    } else {
      switch statements[index]->parseStatement {
      | Error(message) => message->Error->cb
      | Ok((name, parameters, text)) =>
        client
        ->DescribeQuery.describe(text)
        ->Promise.subscribe(val =>
          switch val {
          | Ok(description) =>
            helper(
              index + 1,
              results->Js.Array2.concat([
                {
                  name: name,
                  parameters: parameters,
                  text: text,
                  description: description,
                },
              ]),
            )
          | Error(exn) =>
            Error(
              "Database server could not process the following statement:\n\n" ++
              text ++
              "\n\n" ++
              exn->DescribeQuery.errorToString,
            )->cb
          }
        )
      }
    }
  }

  helper(0, [])
}

let example = "
  -- @allAnimals
  SELECT * FROM animals;

  -- @syntaxError
  SELECT * FROMM animals;
"

DescribeQuery.createClient(
  DescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
)->Promise.subscribe(val =>
  switch val {
  | Ok(client) =>
    client->processFileContent(example, results => {
      switch results {
      | Ok(x) => Js.log(x)
      | Error(x) => Js.Console.error(x)
      }
      client->DescribeQuery.terminate
    })
  | Error(err) => Js.Console.error(err)
  }
)
