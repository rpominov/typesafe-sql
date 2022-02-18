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

let pgToReasonType = datatype =>
  [
    datatype["namespace"]["nspname"]->moduleName,
    datatype["typname"]->fixBuildInType->identifier,
  ]->A.joinWith(".")

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

let generateItem = (data: TypesafeSqlBuilder.Steps.Generate.t) =>
  [
    codeComment(data.originalStatement),
    moduleDefinition(
      data.name,
      [
        stringVar("statement", data.processedStatement),
        typeDefinition(
          "parameters",
          data.parameters->A.length === 0
            ? "unit"
            : data.parameters->A.map(p => pgToReasonType(p.datatype))->tupleOf,
        ),
        typeDefinition(
          "parametersRecord",
          data.parameters->A.length === 0
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
          ->A.map(p => pgToReasonType(p["type"]))
          ->tupleOf,
        ),
        typeDefinition(
          "rowRecord",
          switch data.columns {
          | None => []
          | Some(arr) => arr
          }
          ->uniqueBy(p => p["name"])
          ->A.map(p => (p["name"], pgToReasonType(p["type"])))
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
          | 1 =>
            `(r: row): rowRecord => {${arr[0]["name"]->identifier}: r->Js.Array2.unsafe_get(0)}`
          | _ => {
              let mapping = []
              for i in 0 to arr->A.length - 1 {
                let name = arr[i]["name"]
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
        `@send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"`,
        data.parameters->A.length > 0
          ? `let run = (client, parameters) => run(client, {"values": parameters->convertParameters, "text": statement})`
          : `let run = (client) => run(client, {"values": (), "text": statement})`,
        `@send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"`,
        data.parameters->A.length > 0
          ? `let runArray = (client, parameters) => runArray(client, {"values": parameters->convertParameters, "text": statement, "rowMode": #array})`
          : `let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})`,
      ]->A.joinWith("\n"),
    ),
  ]->A.joinWith("\n")

let generator = (data: array<TypesafeSqlBuilder.Steps.Generate.t>) =>
  ("// Generated by @typesafe-sql\n\nopen PgTypes\n\n" ++
  data->A.map(generateItem)->A.joinWith("\n\n"))->Js.Promise.resolve

// module Tmp = {
//   // type _config = {
//   //   values: Def.parameters,
//   //   rowMode: [#array],
//   //   text: string,
//   // }

//   @send
//   external run: (
//     NodePostgres.client,
//     {"values": string, "text": string},
//   ) => Promise.t<NodePostgres.queryResult<string>> = "query"

//   // let run = (client, parameters) =>
//   //   client->_query({
//   //     values: parameters->Def.convertParameters,
//   //     rowMode: #array,
//   //     text: Def.statement,
//   //   })
// }
