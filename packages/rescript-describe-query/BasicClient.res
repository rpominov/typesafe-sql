type client

type parameter = {dataTypeID: int}

type description = {parameters: array<parameter>, row: option<array<Pg.QueryResult.field>>}

@module("@typesafe-sql/describe-query-basic") @val
external createClient: Pg.Config.t => Promise.t<client> = "createClient"

@send external terminate: client => Promise.t<unit> = "terminate"

@send
external describe: (client, string) => Promise.t<description> = "describe"

type errorMeta = {
  isFatal: bool,
  databaseError: option<Pg.DatabaseError.t>,
}

@module("@typesafe-sql/describe-query-basic") @val
external getErrorMetaData: 'a => errorMeta = "getErrorMetaData"
