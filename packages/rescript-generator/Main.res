module S = Js.String2
module A = Js.Array2

let moduleName = name => name->S.charAt(0)->S.toUpperCase ++ name->S.sliceToEnd(~from=1)

// TODO: do only when necessary
let fixInvalidIdentifier = x => `\\\"${x}"`

let fixBuildInType = x =>
  switch x {
  // TODO: list all types
  | "bool" | "char" => x ++ "_"
  | _ => x
  }

let pgToReasonType = datatype =>
  [
    "PgTypes",
    datatype["namespace"]["nspname"]->moduleName,
    datatype["typname"]->fixBuildInType->fixInvalidIdentifier,
  ]->A.joinWith(".")

let indent = str => "  " ++ str->S.split("\n")->A.joinWith("\n  ")

let tupleOf = items => items->A.length === 0 ? "()" : `(\n${items->A.joinWith(",\n")->indent}\n)`

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
          data.parameters->A.map(p => pgToReasonType(p.datatype))->tupleOf,
        ),
        typeDefinition(
          "parametersRecord",
          data.parameters
          ->uniqueBy(p => p.name)
          ->A.map(p => (p.name, pgToReasonType(p.datatype)))
          ->recordOf,
        ),
        `let convertParameters = (r: parametersRecord): parameters => (${data.parameters
          ->A.map(p => `r.${p.name}`)
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
      ]->A.joinWith("\n\n"),
    ),
  ]->A.joinWith("\n")

let generator = (data: array<TypesafeSqlBuilder.Steps.Generate.t>) =>
  data->A.map(generateItem)->A.joinWith("\n\n")->Js.Promise.resolve
