module Password = {
  type t
  external make: string => t = "%identity"
  external makeAsync: ((. unit) => Js.Promise.t<string>) => t = "%identity"
}

module TypesParser = {
  // TODO:
  // maybe copy-paste type-overrides in:
  // - won't have to use unstable api
  // - will allow to create an empty object w/o any predefined parsers
  type t
  @module("pg/lib/type-overrides") @new external make: unit => t = "default"
  @send
  external setTypeParser: (t, int, @uncurry string => 'a) => unit = "setTypeParser"
  @send
  external setTypeParserBin: (t, int, @as("binary") _, @uncurry (Node.Buffer.t => 'a)) => unit =
    "setTypeParser"
}

module Config = {
  type t

  // https://node-postgres.com/api/client#new-clientconfig-object
  @obj
  external make: (
    ~user: string=?,
    ~password: Password.t=?,
    ~host: string=?,
    ~database: string=?,
    ~port: int=?,
    ~connectionString: string=?,
    ~statement_timeout: int=?,
    ~query_timeout: int=?,
    ~application_name: string=?,
    ~connectionTimeoutMillis: int=?,
    ~idle_in_transaction_session_timeout: int=?,
    ~ssl: {..}=?,
    ~types: TypesParser.t=?,
    unit,
  ) => t = ""
}

module QueryObject = {
  type t

  @obj
  external make: (
    ~values: 'parameters=?,
    ~name: string=?,
    ~rowMode: [#array]=?,
    ~types: TypesParser.t=?,
    ~text: string,
    unit,
  ) => t = ""
}

module QueryResult = {
  // https://github.com/brianc/node-postgres/blob/21ccd4f1b6e66774bbf24aecfccdbfe7c9b49238/packages/pg-protocol/src/messages.ts#L136-L146
  // https://github.com/brianc/node-postgres/blob/6121bd3bb0e0e8ef8ec8ad5d02f59fef86b2f992/packages/pg-protocol/src/parser.ts#L260-L269
  // https://www.postgresql.org/docs/14/protocol-message-formats.html
  type field = {
    // The field name.
    name: string,
    // If the field can be identified as a column of a specific table, the object ID of the table; otherwise zero.
    tableID: int,
    // If the field can be identified as a column of a specific table, the attribute number of the column; otherwise zero.
    columnID: int,
    // The object ID of the field's data type.
    dataTypeID: int,
    // The data type size (see pg_type.typlen). Note that negative values denote variable-width types.
    dataTypeSize: int,
    // The type modifier (see pg_attribute.atttypmod). The meaning of the modifier is type-specific.
    dataTypeModifier: int,
    // The format code being used for the field. Currently will be zero (text) or one (binary).
    // In a RowDescription returned from the statement variant of Describe,
    // the format code is not yet known and will always be zero.
    // (converted to string by node-postgres)
    mode: [#text | #binary],
  }

  type t<'row> = {
    rows: array<'row>,
    fields: array<field>,
    command: string,
    rowCount: Js.null_undefined<int>,
  }
}

module Client = {
  type t

  @module("pg") @new
  external makeWithConfig: Config.t => t = "Client"

  let make = (
    ~user=?,
    ~password=?,
    ~host=?,
    ~database=?,
    ~port=?,
    ~connectionString=?,
    ~statement_timeout=?,
    ~query_timeout=?,
    ~application_name=?,
    ~connectionTimeoutMillis=?,
    ~idle_in_transaction_session_timeout=?,
    ~ssl=?,
    ~types=?,
    unit_,
  ) =>
    Config.make(
      ~user?,
      ~password?,
      ~host?,
      ~database?,
      ~port?,
      ~connectionString?,
      ~statement_timeout?,
      ~query_timeout?,
      ~application_name?,
      ~connectionTimeoutMillis?,
      ~idle_in_transaction_session_timeout?,
      ~ssl?,
      ~types?,
      unit_,
    )->makeWithConfig

  // TODO: JS functions accept an optional second argument cb
  // - Currying might not workd correctly
  // - We should probably define versions with a cb anyway for completeness
  @send external connect: t => Js.Promise.t<unit> = "connect"
  @send external end: t => Js.Promise.t<unit> = "end"

  @send
  external query: (t, string, option<'parameters>) => Js.Promise.t<QueryResult.t<'row>> = "query"
  let query = (client, ~parameters: 'parameters=?, queryString) =>
    query(client, queryString, parameters)

  @send
  external queryObj: (t, QueryObject.t) => Js.Promise.t<QueryResult.t<'row>> = "query"

  %%private(
    let toResult = (err, res) =>
      switch err->Js.Nullable.toOption {
      | Some(e) => Error(e)
      | None =>
        switch res->Js.Nullable.toOption {
        | Some(r) => Ok(r)
        | None =>
          Js.Exn.raiseError("client.query(.., cb) has called the cb with neither error nor result")
        }
      }
  )

  @send
  external queryObjCb: (
    t,
    QueryObject.t,
    (. Js.null_undefined<Js.Exn.t>, Js.null_undefined<QueryResult.t<'a>>) => unit,
  ) => unit = "query"
  let queryCb = (client, ~parameters: 'parameters=?, queryString, cb) =>
    queryObjCb(client, QueryObject.make(~values=parameters, ~text=queryString, ()), (. err, res) =>
      cb(toResult(err, res))
    )
  let queryObjCb = (client, obj, cb) =>
    queryObjCb(client, obj, (. err, res) => cb(toResult(err, res)))

  // TODO
  // client.on('error', (err: Error) => void) => void
  // client.on('notice', (notice: Error) => void) => void
}

// https://www.postgresql.org/docs/14/protocol-error-fields.html
// https://github.com/brianc/node-postgres/blob/4fa7ee891a456168a75695ac026792136f16577f/packages/pg-protocol/src/parser.ts#L371-L386
// https://github.com/brianc/node-postgres/blob/4fa7ee891a456168a75695ac026792136f16577f/packages/pg-protocol/src/messages.ts#L97-L117
module DatabaseError: {
  // TODO: define as a record? not sure why it's an object
  type t = {
    // Seem to always be "error"
    "name": string,
    "message": string,
    "length": int,
    // Severity: the field contents are ERROR, FATAL, or PANIC (in an error message),
    // or WARNING, NOTICE, DEBUG, INFO, or LOG (in a notice message),
    // or a localized translation of one of these. Always present.
    "severity": string,
    // Code: the SQLSTATE code for the error (see Appendix A). Not localizable. Always present.
    // https://www.postgresql.org/docs/14/errcodes-appendix.html
    "code": string,
    // Detail: an optional secondary error message carrying more detail about the problem. Might run to multiple lines.
    "detail": option<string>,
    // Hint: an optional suggestion what to do about the problem.
    // This is intended to differ from Detail in that it offers advice
    // (potentially inappropriate) rather than hard facts. Might run to multiple lines.
    "hint": option<string>,
    // Position: the field value is a decimal ASCII integer,
    // indicating an error cursor position as an index into the original query string.
    // The first character has index 1, and positions are measured in characters not bytes.
    "position": option<string>,
    // Internal position: this is defined the same as the P field,
    // but it is used when the cursor position refers to an internally generated
    // command rather than the one submitted by the client.
    // The internalQuery field will always appear when this field appears.
    "internalPosition": option<string>,
    // Internal query: the text of a failed internally-generated command.
    // This could be, for example, an SQL query issued by a PL/pgSQL function.
    "internalQuery": option<string>,
    // Where: an indication of the context in which the error occurred.
    // Presently this includes a call stack traceback of active procedural
    // language functions and internally-generated queries.
    // The trace is one entry per line, most recent first.
    "where": option<string>,
    // Schema name: if the error was associated with a specific database object,
    // the name of the schema containing that object, if any.
    "schema": option<string>,
    // Table name: if the error was associated with a specific table, the name of the table.
    // (Refer to the schema name field for the name of the table's schema.)
    "table": option<string>,
    // Column name: if the error was associated with a specific table column, the name of the column.
    // (Refer to the schema and table name fields to identify the table.)
    "column": option<string>,
    // Data type name: if the error was associated with a specific data type, the name of the data type.
    // (Refer to the schema name field for the name of the data type's schema.)
    "dataType": option<string>,
    // Constraint name: if the error was associated with a specific constraint, the name of the constraint.
    // Refer to fields listed above for the associated table or domain.
    // (For this purpose, indexes are treated as constraints, even if they weren't created with constraint syntax.)
    "constraint": option<string>,
    // File: the file name of the source-code location where the error was reported.
    "file": option<string>,
    // Line: the line number of the source-code location where the error was reported.
    "line": option<string>,
    // Routine: the name of the source-code routine reporting the error.
    "routine": option<string>,
  }

  let fromJsExn: Js.Exn.t => option<t>
  let fromExn: exn => option<t>
  let toJsExn: t => Js.Exn.t
} = {
  type t = {
    "name": string,
    "message": string,
    "length": int,
    "severity": string,
    "code": string,
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

  type constructor
  @module("pg") @val
  external constructor: constructor = "DatabaseError"
  let instanceof: (Js.Exn.t, constructor) => bool = %raw(`(x, C) => x instanceof C`)
  external castUnsafe: Js.Exn.t => t = "%identity"

  let fromJsExn = exn => instanceof(exn, constructor) ? Some(exn->castUnsafe) : None
  let fromExn = exn =>
    switch exn {
    | Js.Exn.Error(jsExn) => fromJsExn(jsExn)
    | _ => None
    }
  external toJsExn: t => Js.Exn.t = "%identity"
}
