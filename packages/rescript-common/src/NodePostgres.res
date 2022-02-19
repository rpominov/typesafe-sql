// TODO: this should probably be in it's own package eventually

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

  // TODO:
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
  rowCount: Js.null_undefined<int>,
}

@module("pg") @new
external make: config => client = "Client"

@send external connect: client => Js.Promise.t<unit> = "connect"
@send external end: client => Js.Promise.t<unit> = "end"

@send external query: (client, string) => Js.Promise.t<queryResult<'row>> = "query"

@send
external queryWithParameters: (client, string, 'parameters) => Promise.t<queryResult<'row>> =
  "query"

@deriving(abstract)
type queryConfig<'parameters> = {
  @optional values: 'parameters,
  @optional name: string,
  @optional rowMode: [#array],
  text: string,

  // TODO:
  //
  //  @optional types: types,
}

@send
external queryWithConfig: (client, queryConfig<'parameters>) => Promise.t<queryResult<'row>> =
  "query"

// TODO
// client.on('error', (err: Error) => void) => void
// client.on('notice', (notice: Error) => void) => void
