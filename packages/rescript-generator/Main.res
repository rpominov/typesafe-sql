module S = Js.String2
module A = Js.Array2

let pgToReasonType = datatype =>
  datatype["namespace"]["nspname"] === "pg_catalog" && PgTypes.isDefiend(datatype["typname"])
    ? `PgTypes.${PgTypes.fixName(datatype["typname"])}`
    : `PgTypes.unknown`

let indent = str => "  " ++ str->S.split("\n")->A.joinWith("\n  ")

let tupleOf = items => `(${items->A.joinWith(", ")})`

let recordOf = items =>
  items->A.length === 0
    ? "()"
    : [
        "{",
        items->A.map(((name, val)) => `${name}: ${val}`)->A.joinWith(",\n")->indent,
        "}",
      ]->A.joinWith("\n")

let codeComment = str => "// " ++ str->S.split("\n")->A.joinWith("\n// ")

let moduleDefinition = (name, body) =>
  [
    `module ${name->S.charAt(0)->S.toUpperCase}${name->S.sliceToEnd(~from=1)} = {`,
    body->indent,
    "}",
  ]->A.joinWith("\n")

let stringVar = (name, content) => `let ${name} = ${content->Js.Json.string->Js.Json.stringify}`

let typeDefinition = (name, value) => `type ${name} = ${value}`

let uniqueBy = (arr, fn) => arr->A.map(x => (fn(x), x))->Js.Dict.fromArray->Js.Dict.values

let generateItem = (data: TypesafeSqlBuilder.Steps.Generate.t) =>
  moduleDefinition(
    data.name,
    [
      codeComment(data.originalStatement),
      stringVar("statement", data.processedStatement),
      typeDefinition(
        "parameters",
        data.parameters->A.map(p => pgToReasonType(p.datatype))->tupleOf,
      ),
      typeDefinition(
        "parametersRecord",
        data.parameters
        ->uniqueBy(p => p.name)
        ->A.map(p => (p.name, pgToReasonType(p.datatype)))
        ->recordOf,
      ),
      `let convertParameters = (rec: parametersRecord): parameters => (${data.parameters
        ->A.map(p => `rec.${p.name}`)
        ->A.joinWith(", ")})`,
      typeDefinition(
        "column",
        switch data.columns {
        | None => "unit"
        | Some(arr) => arr->A.map(p => pgToReasonType(p["type"]))->tupleOf
        },
      ),
      typeDefinition(
        "columns",
        switch data.columns {
        | None => "unit"
        | Some(_) => "array<column>"
        },
      ),
    ]->A.joinWith("\n"),
  )

let generator = (data: array<TypesafeSqlBuilder.Steps.Generate.t>) =>
  data->A.map(generateItem)->A.joinWith("\n\n")->Js.Promise.resolve
