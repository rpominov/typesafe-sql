type client

// https://www.postgresql.org/docs/current/catalog-pg-namespace.html
type namespace = {"oid": int, "nspname": string}

// https://www.postgresql.org/docs/current/catalog-pg-type.html
type datatype = {"oid": int, "typname": string, "namespace": namespace}

// https://www.postgresql.org/docs/current/catalog-pg-class.html
type table = {"oid": int}

// https://www.postgresql.org/docs/current/infoschema-columns.html
type column = {"column_name": string, "is_nullable": [#YES | #NO], "table": table}

// https://node-postgres.com/api/client#new-clientconfig-object
@deriving(abstract)
type config = {
  @optional user: string,
  @optional password: string,
  @optional host: string,
  @optional database: string,
  @optional port: int,
  @optional connectionString: string,
  @optional statement_timeout: int,
  @optional query_timeout: int,
  @optional application_name: string,
  @optional connectionTimeoutMillis: int,
  @optional idle_in_transaction_session_timeout: int,

  // Hard to define, probably will never need:
  //
  // password can be a function
  // ssl?: any
  // types?: any
}

type description = {
  "input": array<{
    "type": datatype,
  }>,
  "output": option<array<{"name": string, "type": datatype, "column": option<column>}>>,
}

// TODO:
//   - replace strings with poly variants where possible
type databaseError = {
  "name": string,
  "message": string,
  "length": int,
  "severity": option<string>,
  "code": option<string>,
  "detail": option<string>,
  "hint": option<string>,
  "position": option<string>,
  "internalPosition": option<string>,
  "internalQuery": option<string>,
  "where": option<string>,
  "schema": option<string>,
  "table": option<string>,
  "column": option<string>,
  "dataType": option<string>,
  "constraint": option<string>,
  "file": option<string>,
  "line": option<string>,
  "routine": option<string>,
}

@module("@typesafe-sql/describe-query") @val
external createClient: config => Js.Promise.t<client> = "createClient"

@module("@typesafe-sql/describe-query") @val
external getErrorMetaData: 'a => {"isFatal": bool, "databaseError": option<databaseError>} =
  "getErrorMetaData"

@send external terminate: client => unit = "terminate"

@send
external describe: (client, string) => Js.Promise.t<description> = "describe"

@val external anyToString: 'a => string = "String"

// TODO: move to either `builder` or `describe-query`
// TODO: use getErrorMetaData
let errorToString = exn => {
  switch switch exn->Js.Exn.asJsExn {
  | None => None
  | Some(x) => x->Js.Exn.message
  } {
  | None => anyToString(exn)
  | Some(message) => message
  }
}
