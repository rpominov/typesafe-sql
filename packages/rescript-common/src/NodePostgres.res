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

type client

type fieldInfo // TODO

type queryResult<'row> = {
  rows: array<'row>,
  fields: array<fieldInfo>,
  command: string,
  rowCount: int, // TODO: nullable?
}
