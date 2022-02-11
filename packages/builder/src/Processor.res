module DescribeQuery = TypesafeSQLDescribeQuery
module A = Js.Array2
module S = Js.String2

type parsedAndDescribed = {
  name: string,
  parameters: array<string>,
  text: string,
  description: DescribeQuery.description,
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
