// Generated by @typesafe-sql

open PgTypes

// -- @noRows
// create table test (id serial)
module NoRows = {
  let statement = "-- @noRows\ncreate table test (id serial)"
  type parameters = unit
  type parametersRecord = unit
  type row = array<unit>
  type rowRecord = Js.Dict.t<unit>
  let convertParameters = (_: parametersRecord): parameters => ()
  let convertRow = (_: row): rowRecord => Js.Dict.empty()
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client) => run(client, {"values": (), "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})
}

// -- @empty
// select from pg_type
module Empty = {
  let statement = "-- @empty\nselect from pg_type"
  type parameters = unit
  type parametersRecord = unit
  type row = array<unit>
  type rowRecord = Js.Dict.t<unit>
  let convertParameters = (_: parametersRecord): parameters => ()
  let convertRow = (_: row): rowRecord => Js.Dict.empty()
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client) => run(client, {"values": (), "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})
}

// -- @one
// select oid from pg_type
module One = {
  let statement = "-- @one\nselect oid from pg_type"
  type parameters = unit
  type parametersRecord = unit
  type row = array<Pg_catalog.\"oid">
  type rowRecord = {
    \"oid": Pg_catalog.\"oid"
  }
  let convertParameters = (_: parametersRecord): parameters => ()
  let convertRow = (r: row): rowRecord => {\"oid": r->Js.Array2.unsafe_get(0)}
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client) => run(client, {"values": (), "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})
}

// -- @two
// select oid, typname from pg_type
module Two = {
  let statement = "-- @two\nselect oid, typname from pg_type"
  type parameters = unit
  type parametersRecord = unit
  type row = (
    Pg_catalog.\"oid",
    Pg_catalog.\"name"
  )
  type rowRecord = {
    \"oid": Pg_catalog.\"oid",
    \"typname": Pg_catalog.\"name"
  }
  let convertParameters = (_: parametersRecord): parameters => ()
  let convertRow = ((\"oid", \"typname"): row): rowRecord => {
    \"oid": \"oid",
    \"typname": \"typname"
  }
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client) => run(client, {"values": (), "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})
}

// -- @oneParam
// select oid, typname from pg_type where oid = $oid
module OneParam = {
  let statement = "-- @oneParam\nselect oid, typname from pg_type where oid = $1"
  type parameters = array<Pg_catalog.\"oid">
  type parametersRecord = {
    \"oid": Pg_catalog.\"oid"
  }
  type row = (
    Pg_catalog.\"oid",
    Pg_catalog.\"name"
  )
  type rowRecord = {
    \"oid": Pg_catalog.\"oid",
    \"typname": Pg_catalog.\"name"
  }
  let convertParameters = (r: parametersRecord): parameters => [r.\"oid"]
  let convertRow = ((\"oid", \"typname"): row): rowRecord => {
    \"oid": \"oid",
    \"typname": \"typname"
  }
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) => run(client, {"values": parameters->convertParameters, "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) => runArray(client, {"values": parameters->convertParameters, "text": statement, "rowMode": #array})
}

// -- @twoParams
// select oid, typname from pg_type where oid = $oid and typname = $name
module TwoParams = {
  let statement = "-- @twoParams\nselect oid, typname from pg_type where oid = $1 and typname = $2"
  type parameters = (
    Pg_catalog.\"oid",
    Pg_catalog.\"name"
  )
  type parametersRecord = {
    \"oid": Pg_catalog.\"oid",
    \"name": Pg_catalog.\"name"
  }
  type row = (
    Pg_catalog.\"oid",
    Pg_catalog.\"name"
  )
  type rowRecord = {
    \"oid": Pg_catalog.\"oid",
    \"typname": Pg_catalog.\"name"
  }
  let convertParameters = (r: parametersRecord): parameters => (r.\"oid", r.\"name")
  let convertRow = ((\"oid", \"typname"): row): rowRecord => {
    \"oid": \"oid",
    \"typname": \"typname"
  }
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) => run(client, {"values": parameters->convertParameters, "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) => runArray(client, {"values": parameters->convertParameters, "text": statement, "rowMode": #array})
}

// -- @nonUniqueColumnNames
// select oid, typname name, 'name' name, typcategory from pg_type
module NonUniqueColumnNames = {
  let statement = "-- @nonUniqueColumnNames\nselect oid, typname name, 'name' name, typcategory from pg_type"
  type parameters = unit
  type parametersRecord = unit
  type row = (
    Pg_catalog.\"oid",
    Pg_catalog.\"name",
    Pg_catalog.\"text",
    Pg_catalog.\"char_"
  )
  type rowRecord = {
    \"oid": Pg_catalog.\"oid",
    \"name": Pg_catalog.\"text",
    \"typcategory": Pg_catalog.\"char_"
  }
  let convertParameters = (_: parametersRecord): parameters => ()
  let convertRow = ((\"oid", \"name", _, \"typcategory"): row): rowRecord => {
    \"oid": \"oid",
    \"name": \"name",
    \"typcategory": \"typcategory"
  }
  @send external run: (NodePostgres.client, {"values": parameters, "text": string}) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client) => run(client, {"values": (), "text": statement})
  @send external runArray: (NodePostgres.client, {"values": parameters, "text": string, "rowMode": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client) => runArray(client, {"values": (), "text": statement, "rowMode": #array})
}