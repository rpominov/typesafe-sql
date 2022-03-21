module A = Js.Array2
module S = Js.String2
module O = Belt.Option
module I = Belt.Int
module E = Js.Exn
module P = Promise
module J = Js.Json
module D = DescribeQuery.Client

module Parse = {
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

  // for compatibility with other functions
  let asyncParse = text =>
    switch text->parse {
    | Error(msg) => Error(msg->LogError.wrapString)
    | Ok(parsed) => Ok(parsed)
    }->Promise.resolve
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

  let describe = (client, text) => {
    client
    ->D.describe(text)
    ->P.catch(
      LogError.wrap(
        _,

        // TODO
        //
        // switch (e->D.getErrorMetaData).databaseError {
        // | None => (LogError.Loggable.fromJsExn(e), None)
        // | Some(dbe) => (dbe->D.getVerboseMessage->LogError.Loggable.make, dbe["position"])
        // }
        exn => {
          let (message, pos) = switch exn {
          | Js.Exn.Error(e) => (LogError.Loggable.fromJsExn(e), None)
          | _ => (LogError.Loggable.make(exn), None)
          }

          let statement = switch pos->O.flatMap(I.fromString) {
          | None => text
          | Some(p) => highlight(text, p)
          }

          [
            `Database server could not process the following statement:\n\n${statement}`->LogError.Loggable.make,
            message,
          ]
        },
      ),
    )
  }

  let describeMany = (client, texts) => {
    let rec helper = (result, i) =>
      if i === texts->A.length {
        result
      } else {
        result->P.chainOk(result' =>
          describe(client, texts[i])
          ->P.chainOk(description => A.concat(result', [description])->Ok->P.resolve)
          ->helper(i + 1)
        )
      }
    helper([]->Ok->P.resolve, 0)
  }
}

module Generate = {
  type parameter = {name: string, datatype: D.dataType}

  type t = {
    name: string,
    originalStatement: string,
    processedStatement: string,
    parameters: array<parameter>,
    columns: option<array<D.field>>,
  }

  let compose = (parsed, described) => {
    if parsed->A.length !== described->A.length {
      E.raiseError("Parsed / described mismatch (queries count)")
    }
    Belt.Array.zipBy(parsed, described, (p: Parse.t, d: D.description) => {
      if p.parameters->A.length !== d.parameters->A.length {
        E.raiseError("Parsed / described mismatch (parameters count)")
      }
      {
        name: p.name,
        originalStatement: p.originalStatement,
        processedStatement: p.processedStatement,
        parameters: Belt.Array.zipBy(p.parameters, d.parameters, (name, data) => {
          name: name,
          datatype: data,
        }),
        columns: d.row,
      }
    })
  }

  let generate = (parsed, described, generator: array<t> => P.t<string>) => {
    P.resolve()
    ->P.chain(() => generator(compose(parsed, described)))
    ->P.catch(LogError.wrapExnVerbose)
  }

  let exampleGenerator = (data: array<t>) => {
    data
    ->A.map(item =>
      {
        "name": item.name,
        "statement": item.processedStatement,
        "parameters": item.parameters->A.map(p =>
          {
            "name": p.name,
            "type": p.datatype,
          }
        ),
        "columns": switch item.columns {
        | None => Obj.magic(Js.Null.empty)
        | Some(arr) =>
          arr->A.map(c =>
            {
              "name": c.name,
              "type": c.dataType,
            }
          )
        },
      }->Obj.magic
    )
    ->J.array
    ->J.stringifyWithSpace(2)
    ->P.resolve
  }
}
