module S = Js.String2
module A = Js.Array2

let moduleName = name => name->S.charAt(0)->S.toUpperCase ++ name->S.sliceToEnd(~from=1)

// TODO: add \"" only when necessary
let identifier = x => `\\\"${x}"`

let fixBuildInType = x =>
  switch x {
  // TODO: list all types
  | "bool" | "char" => x ++ "_"
  | _ => x
  }

let optional = type_ => `option<${type_}>`

let pgToReasonType = datatype => {
  let info = TypesafeSqlRescriptDescribeQuery.Client.getBaseInfo(datatype)
  [info["namespace"]->moduleName, info["name"]->fixBuildInType->identifier]->A.joinWith(".")
}

let indent = str => "  " ++ str->S.split("\n")->A.joinWith("\n  ")

let tupleOf = items =>
  switch items->A.length {
  | 0 => "array<unit>"
  | 1 => `array<${items[0]}>` // TODO: is there a better way?
  | _ => `(\n${items->A.joinWith(",\n")->indent}\n)`
  }

let recordOf = items =>
  items->A.length === 0
    ? "Js.Dict.t<unit>"
    : [
        "{",
        items->A.map(((name, val)) => `${name->identifier}: ${val}`)->A.joinWith(",\n")->indent,
        "}",
      ]->A.joinWith("\n")

let codeComment = str => "// " ++ str->S.split("\n")->A.joinWith("\n// ")

let moduleDefinition = (name, body) =>
  [`module ${name->moduleName} = {`, body->indent, "}"]->A.joinWith("\n")

let stringVar = (name, content) => `let ${name} = ${content->Js.Json.string->Js.Json.stringify}`

let typeDefinition = (name, value) => `type ${name} = ${value}`

let uniqueBy = (arr, fn) => arr->A.map(x => (fn(x), x))->Js.Dict.fromArray->Js.Dict.values

let runRawExternal = `@send external runRaw: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"`
let runRawParameters = `let runRaw = (client, parameters) => runRaw(client, {"values": parameters->convertParameters, "text": statement, "rowMode": #array})`
let runRawNoParameters = `let runRaw = (client) => runRaw(client, {"values": (), "text": statement, "rowMode": #array})`

let generateItem = (data: TypesafeSqlBuilder.Steps.Generate.t) => {
  let noParameters = data.parameters->A.length === 0
  [
    codeComment(data.originalStatement),
    moduleDefinition(
      data.name,
      [
        stringVar("statement", data.processedStatement),
        typeDefinition(
          "parameters",
          noParameters ? "unit" : data.parameters->A.map(p => pgToReasonType(p.datatype))->tupleOf,
        ),
        typeDefinition(
          "parametersRecord",
          noParameters
            ? "unit"
            : data.parameters
              ->uniqueBy(p => p.name)
              ->A.map(p => (p.name, pgToReasonType(p.datatype)))
              ->recordOf,
        ),
        typeDefinition(
          "row",
          switch data.columns {
          | None => []
          | Some(arr) => arr
          }
          ->A.map(p => pgToReasonType(p.dataType)->optional)
          ->tupleOf,
        ),
        typeDefinition(
          "rowRecord",
          switch data.columns {
          | None => []
          | Some(arr) => arr
          }
          ->uniqueBy(p => p.name)
          ->A.map(p => (p.name, pgToReasonType(p.dataType)->optional))
          ->recordOf,
        ),
        "let convertParameters = " ++
        switch data.parameters->A.length {
        | 0 => "(_: parametersRecord): parameters => ()"
        | 1 => `(r: parametersRecord): parameters => [r.${data.parameters[0].name->identifier}]`
        | _ =>
          `(r: parametersRecord): parameters => (${data.parameters
            ->A.map(p => `r.${p.name->identifier}`)
            ->A.joinWith(", ")})`
        },
        "let convertRow = " ++
        switch data.columns {
        | None => "(_: row): rowRecord => Js.Dict.empty()"
        | Some(arr) =>
          switch arr->A.length {
          | 0 => "(_: row): rowRecord => Js.Dict.empty()"
          | 1 => `(r: row): rowRecord => {${arr[0].name->identifier}: r->Js.Array2.unsafe_get(0)}`
          | _ => {
              let mapping = []
              for i in 0 to arr->A.length - 1 {
                let name = arr[i].name
                mapping->A.push(mapping->A.includes(Some(name)) ? None : Some(name))->ignore
              }
              let destruct =
                mapping
                ->A.map(x =>
                  switch x {
                  | None => "_"
                  | Some(n) => identifier(n)
                  }
                )
                ->A.joinWith(", ")
              let construct =
                mapping
                ->A.map(x =>
                  switch x {
                  | None => ""
                  | Some(n) => `${identifier(n)}: ${identifier(n)}`
                  }
                )
                ->A.filter(x => x !== "")
                ->A.joinWith(",\n")
              `((${destruct}): row): rowRecord => {\n${construct->indent}\n}`
            }
          }
        },
        runRawExternal,
        noParameters ? runRawNoParameters : runRawParameters,
        switch (data.columns, noParameters) {
        | (Some(_), true) =>
          "let run = (client) => " ++
          "runRaw(client)->Js.Promise.then_(" ++
          "(res: NodePostgres.queryResult<row>) => " ++ "Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)"
        | (Some(_), false) =>
          "let run = (client, parameters) => " ++
          "runRaw(client, parameters)->Js.Promise.then_(" ++
          "(res: NodePostgres.queryResult<row>) => " ++ "Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)"
        | (None, true) =>
          "let run = (client) => " ++
          "runRaw(client)->Js.Promise.then_(" ++
          "(res: NodePostgres.queryResult<row>) => " ++ "Js.Promise.resolve(res.rowCount->Js.Nullable.toOption), _)"
        | (None, false) =>
          "let run = (client, parameters) => " ++
          "runRaw(client, parameters)->Js.Promise.then_(" ++
          "(res: NodePostgres.queryResult<row>) => " ++ "Js.Promise.resolve(res.rowCount->Js.Nullable.toOption), _)"
        },
      ]->A.joinWith("\n"),
    ),
  ]->A.joinWith("\n")
}

let generator = (data: array<TypesafeSqlBuilder.Steps.Generate.t>) =>
  ("// Generated by @typesafe-sql\n\nopen PgTypes\n\n" ++
  data->A.map(generateItem)->A.joinWith("\n\n"))->Js.Promise.resolve
