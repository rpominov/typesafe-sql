type client

type parameter = {dataTypeID: int}

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

type description = {parameters: array<parameter>, row: option<array<field>>}

@module("@typesafe-sql/describe-query-basic") @val
external createClient: NodePostgres.config => Promise.t<client> = "createClient"

@send external terminate: client => Promise.t<unit> = "terminate"

@send
external describe: (client, string) => Promise.t<description> = "describe"

// https://www.postgresql.org/docs/14/protocol-error-fields.html
// https://github.com/brianc/node-postgres/blob/4fa7ee891a456168a75695ac026792136f16577f/packages/pg-protocol/src/parser.ts#L371-L386
type databaseError = {
  // Seem to always be "error"
  "name": string,
  "message": string,
  "length": int,
  // Severity: the field contents are ERROR, FATAL, or PANIC (in an error message),
  // or WARNING, NOTICE, DEBUG, INFO, or LOG (in a notice message),
  // or a localized translation of one of these. Always present.
  "severity": option<string>,
  // Code: the SQLSTATE code for the error (see Appendix A). Not localizable. Always present.
  // https://www.postgresql.org/docs/14/errcodes-appendix.html
  "code": option<string>,
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

type errorMeta = {
  isFatal: bool,
  databaseError: option<databaseError>,
}

@module("@typesafe-sql/describe-query-basic") @val
external getErrorMetaData: 'a => errorMeta = "getErrorMetaData"
