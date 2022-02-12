module DescribeQuery = TypesafeSQLDescribeQuery
module A = Js.Array2
module S = Js.String2
module O = Belt.Option
module I = Belt.Int

type parsedAndDescribed = {
  name: string,
  parameters: array<string>,
  text: string,
  description: DescribeQuery.description,
}

@val external anyToString: 'a => string = "String"

let highlight = (code, position) => {
  let lines = code->S.split("\n")
  let newLines = []
  let rec helper = (i, pos) => {
    if i !== lines->A.length {
      let line = lines[i]
      newLines->A.push(line)->ignore
      let pos' = pos - line->S.length - 1
      if pos > 0 && pos' <= 0 {
        newLines->A.push(" "->S.repeat(pos - 1) ++ "^")->ignore
      }
      helper(i + 1, pos')
    }
  }
  helper(0, position)
  newLines->A.joinWith("\n")
}

let errorToString = (exn, statement) => {
  let (message, pos) = switch exn->Js.Exn.asJsExn {
  | None => (anyToString(exn), None)
  | Some(x) => {
      let meta = x->DescribeQuery.getErrorMetaData
      switch (meta.databaseError, x->Js.Exn.message) {
      | (Some(dbe), Some(message)) => (message ++ "\n\n" ++ meta.verboseMessage, dbe["position"])
      | (_, Some(message)) => (message, None)
      | _ => (anyToString(exn), None)
      }
    }
  }

  let statement' = switch pos->O.flatMap(I.fromString) {
  | None => statement
  | Some(p) => highlight(statement, p)
  }

  `Database server could not process the following statement:\n\n${statement'}\n\n${message}`
}

let processFileContent = (client, text, cb) => {
  let statements = text->S.split(";")->A.map(S.trim)->A.filter(val => val !== "")

  let rec helper = (index, results) => {
    if index >= statements->A.length {
      results->Ok->cb
    } else {
      switch statements[index]->Parser.parseStatement {
      | Error(NameNotFound) =>
        Error(
          "The following statement is missing a name declaration. Did you forget to add a \"-- @someName\" comment?\n\n" ++
          statements[index],
        )->cb
      | Ok((name, parameters, text)) =>
        client
        ->DescribeQuery.describe(text)
        ->Promise.done(val =>
          switch val {
          | Ok(description) =>
            helper(
              index + 1,
              results->A.concat([
                {
                  name: name,
                  parameters: parameters,
                  text: text,
                  description: description,
                },
              ]),
            )
          | Error(exn) => Error(exn->errorToString(text))->cb
          }
        )
      }
    }
  }

  helper(0, [])
}
