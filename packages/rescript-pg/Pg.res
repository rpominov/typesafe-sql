module Password = {
  type t
  external make: string => t = "%identity"
  external makeAsync: ((. unit) => Js.Promise.t<string>) => t = "%identity"
}

module TypesParser = {
  // TODO: maybe copy-paste type-overrides in:
  //         - won't have to use unstable api
  //         - will allow to create an empty object w/o any predefined parsers
  type t
  @module("pg/lib/type-overrides") @new external make: unit => t = "default"
  @send
  external setTypeParser: (t, int, @uncurry string => 'a) => unit = "setTypeParser"
  @send
  external setTypeParserBin: (t, int, @as("binary") _, @uncurry (Node.Buffer.t => 'a)) => unit =
    "setTypeParser"
}

module QueryResult = {
  type fieldInfo // TODO

  type t<'row> = {
    rows: array<'row>,
    fields: array<fieldInfo>,
    command: string,
    rowCount: Js.null_undefined<int>,
  }
}

module Client = {
  type t

  // https://node-postgres.com/api/client#new-clientconfig-object
  type config
  @obj
  external makeConfig: (
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
  ) => config = ""

  @module("pg") @new
  external make: config => t = "Client"

  @send external connect: t => Js.Promise.t<unit> = "connect"
  @send external end: t => Js.Promise.t<unit> = "end"

  @send external query: (t, string) => Js.Promise.t<QueryResult.t<'row>> = "query"

  @send
  external queryWithParameters: (t, string, 'parameters) => Js.Promise.t<QueryResult.t<'row>> =
    "query"

  @deriving(abstract)
  type queryConfig<'parameters> = {
    @optional values: 'parameters,
    @optional name: string,
    @optional rowMode: [#array],
    @optional types: TypesParser.t,
    text: string,
  }

  @send
  external queryWithConfig: (t, queryConfig<'parameters>) => Js.Promise.t<QueryResult.t<'row>> =
    "query"

  // TODO
  // client.on('error', (err: Error) => void) => void
  // client.on('notice', (notice: Error) => void) => void
}
