module A = Js.Array2
module S = Js.String2
module O = Belt.Option
module I = Belt.Int
module E = Js.Exn
module DQ = TypesafeSQLDescribeQuery

@val external anyToString: 'a => string = "String"

module Read = {
  @module("fs") @val
  external readFile: (
    string,
    [#utf8],
    @uncurry (Js.Nullable.t<Js.Exn.t>, option<string>) => unit,
  ) => unit = "readFile"

  // TODO: maybe do some cheks before reading (exists, not a directory, permissions, size, encoding)?
  // TODO: rewrite error

  let read = path =>
    Js.Promise.make((~resolve, ~reject) =>
      readFile(path, #utf8, (err, content) => {
        switch (err->Js.Nullable.toOption, content) {
        | (Some(e), _) =>
          resolve(.
            switch e->E.message {
            | None => anyToString(e)
            | Some(msg) => msg
            }->Error,
          )
        | (_, None) => resolve(. Ok(""))
        | (_, Some(content)) => resolve(. Ok(content))
        }
      })
    )
}

module Parse = {
  type t = {
    name: string,
    parameters: array<string>,
    originalStatement: string,
    processedStatement: string,
  }

  let isValidIdentifierCh = ch => {
    let code = ch->Js.String2.charCodeAt(0)
    // 0-9 || A-Z || a-z
    (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
  }

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

module Describe = {
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
    let (message, pos) = switch exn->E.asJsExn {
    | None => (anyToString(exn), None)
    | Some(jsExn) =>
      switch (jsExn->DQ.getErrorMetaData).databaseError {
      | Some(dbe) => (dbe->DQ.getVerboseMessage, dbe["position"])
      | None =>
        switch jsExn->E.message {
        | Some(message) => (message, None)
        | None => (anyToString(exn), None)
        }
      }
    }

    let statement' = switch pos->O.flatMap(I.fromString) {
    | None => statement
    | Some(p) => highlight(statement, p)
    }

    `Database server could not process the following statement:\n\n${statement'}\n\n${message}`
  }

  let describe = (client, text) => {
    client
    ->DQ.describe(text)
    ->Promise.chain(val => {
      switch val {
      | Ok(description) => Ok(description)
      | Error(exn) => Error(exn->errorToString(text))
      }->Js.Promise.resolve
    })
  }

  let describeMany = (client, texts) => {
    let rec helper = (result, i) => {
      if i === texts->A.length {
        result
      } else {
        result->Promise.chainOk(val => {
          switch val {
          | Error(msg) => Error(msg)->Js.Promise.resolve
          | Ok(result') =>
            describe(client, texts[i])
            ->Promise.chainOk(val =>
              switch val {
              | Ok(description) => result'->A.concat([description])->Ok
              | Error(msg) => Error(msg)
              }->Js.Promise.resolve
            )
            ->helper(i + 1)
          }
        })
      }
    }

    helper([]->Ok->Js.Promise.resolve, 0)
  }
}

module Generate = {
  type parameter = {name: string, datatype: DQ.datatype}

  type t = {
    name: string,
    originalStatement: string,
    processedStatement: string,
    parameters: array<parameter>,
    columns: option<array<DQ.outputItem>>,
  }

  let compose = (parsed, described) => {
    if parsed->A.length !== described->A.length {
      E.raiseError("Parsed / described mismatch (queries count)")
    }
    Belt.Array.zipBy(parsed, described, (p: Parse.t, d: DQ.description) => {
      if p.parameters->A.length !== d["input"]->A.length {
        E.raiseError("Parsed / described mismatch (parameters count)")
      }
      {
        name: p.name,
        originalStatement: p.originalStatement,
        processedStatement: p.processedStatement,
        parameters: Belt.Array.zipBy(p.parameters, d["input"], (name, data) => {
          name: name,
          datatype: data["type"],
        }),
        columns: d["output"],
      }
    })
  }

  let generate = (parsed, described, generator: array<t> => Js.Promise.t<string>) => {
    Js.Promise.resolve()
    ->Promise.chainOk(() => {
      generator(compose(parsed, described))
    })
    ->Promise.chain(val =>
      switch val {
      | Ok(text) => Ok(text)
      | Error(exn) =>
        switch Js.Exn.asJsExn(exn) {
        | None => anyToString(exn)
        | Some(jsExn) =>
          switch jsExn->Js.Exn.stack {
          | Some(stack) => stack
          | None =>
            switch jsExn->Js.Exn.message {
            | Some(message) => message
            | None => anyToString(exn)
            }
          }
        }->Error
      }->Js.Promise.resolve
    )
  }

  let jsonGenerator = (data: array<t>) => data->Js.Json.serializeExn->Js.Promise.resolve
}

module Write = {

}
