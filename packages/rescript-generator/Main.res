module S = Js.String2
module A = Js.Array2

let moduleName = name => name->S.charAt(0)->S.toUpperCase ++ name->S.sliceToEnd(~from=1)

// TODO: add \"" only when necessary
// OR: run through formatter
let identifier = x => `\\\"${x}"`

let fixBuildInType = x =>
  switch x {
  // TODO: list all types
  | "bool" | "char" => x ++ "_"
  | _ => x
  }

let nullable = type_ => `Js.Nullable.t<${type_}>`
let optinable = type_ => `option<${type_}>`

let pgToReasonType = datatype => {
  let info = DescribeQuery.Client.getBaseInfo(datatype)
  [info["namespace"]->moduleName, info["name"]->fixBuildInType->identifier]->A.joinWith(".")
}

let indent = str => "  " ++ str->S.split("\n")->A.joinWith("\n  ")

let tupleOf = items =>
  switch items->A.length {
  | 0 => "array<unit>"
  | 1 => `array<${items[0]}>`
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

let runRawParameters = `let runRaw = (client, parameters: parametersRecord): Js.Promise.t<Pg.QueryResult.t<row>> => client->Pg.queryConf(Pg.QueryConfig.make(~text=statement, ~rowMode=#array, ~values=parameters->convertParameters, ()))`
let runRawNoParameters = `let runRaw = (client): Js.Promise.t<Pg.QueryResult.t<row>> => client->Pg.queryConf(Pg.QueryConfig.make(~text=statement, ~rowMode=#array, ()))`

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
          ->A.map(p => pgToReasonType(p.dataType)->nullable)
          ->tupleOf,
        ),
        typeDefinition(
          "rowRecord",
          switch data.columns {
          | None => []
          | Some(arr) => arr
          }
          ->uniqueBy(p => p.name)
          ->A.map(p => (p.name, pgToReasonType(p.dataType)->optinable))
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
            `(r: row): rowRecord => {${arr[0].name->identifier}: r->Js.Array2.unsafe_get(0)->Js.Nullable.toOption}`
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
                  | Some(n) => `${identifier(n)}: ${identifier(n)}->Js.Nullable.toOption`
                  }
                )
                ->A.filter(x => x !== "")
                ->A.joinWith(",\n")
              `((${destruct}): row): rowRecord => {\n${construct->indent}\n}`
            }
          }
        },
        noParameters ? runRawNoParameters : runRawParameters,
        switch (data.columns, noParameters) {
        | (Some(_), true) =>
          "let run = (client) => " ++
          "runRaw(client)->Js.Promise.then_(" ++ "(res: Pg.QueryResult.t<row>) => Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)"
        | (Some(_), false) =>
          "let run = (client, parameters) => " ++
          "runRaw(client, parameters)->Js.Promise.then_(" ++ "(res: Pg.QueryResult.t<row>) => Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)"
        | (None, true) =>
          "let run = (client) => " ++
          "runRaw(client)->Js.Promise.then_(" ++ "(res: Pg.QueryResult.t<row>) => Js.Promise.resolve(res.rowCount), _)"
        | (None, false) =>
          "let run = (client, parameters) => " ++
          "runRaw(client, parameters)->Js.Promise.then_(" ++ "(res: Pg.QueryResult.t<row>) => Js.Promise.resolve(res.rowCount), _)"
        },
      ]->A.joinWith("\n"),
    ),
  ]->A.joinWith("\n")
}

let generator = (data: array<TypesafeSqlBuilder.Steps.Generate.t>) =>
  ("// Generated by @typesafe-sql\n\nopen PgTypes\n\n" ++
  data->A.map(generateItem)->A.joinWith("\n\n"))->Js.Promise.resolve
