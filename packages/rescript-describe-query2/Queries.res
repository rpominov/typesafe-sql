// Generated by @typesafe-sql

open PgTypes

// -- @getTypes
// select
// 	t.oid,
// 	t.typname,
// 	t.typnamespace::regnamespace,
// 	t.typlen,
// 	t.typbyval,
// 	t.typtype,
// 	t.typcategory,
// 	t.typispreferred,
// 	t.typisdefined,
// 	t.typdelim,
// 	t.typrelid,
// 	t.typelem,
// 	t.typarray,
// 	t.typnotnull,
// 	t.typbasetype,
// 	t.typtypmod,
// 	t.typndims,
// 	t.typcollation,
// 	t.typdefault,
// 	r.rngsubtype,
// 	(select array_agg(a.attname order by a.attnum)
// 		from pg_attribute a where a.attrelid = t.typrelid) as attr_names,
// 	(select array_agg(a.atttypid order by a.attnum)
// 		from pg_attribute a where a.attrelid = t.typrelid) as attr_types
// from pg_type t
// left join pg_range r on r.rngtypid = t.oid
// where t.oid = ANY ($typeIds::int[])
module GetTypes = {
  let statement = "-- @getTypes\nselect\n\tt.oid,\n\tt.typname,\n\tt.typnamespace::regnamespace,\n\tt.typlen,\n\tt.typbyval,\n\tt.typtype,\n\tt.typcategory,\n\tt.typispreferred,\n\tt.typisdefined,\n\tt.typdelim,\n\tt.typrelid,\n\tt.typelem,\n\tt.typarray,\n\tt.typnotnull,\n\tt.typbasetype,\n\tt.typtypmod,\n\tt.typndims,\n\tt.typcollation,\n\tt.typdefault,\n\tr.rngsubtype,\n\t(select array_agg(a.attname order by a.attnum) \n\t\tfrom pg_attribute a where a.attrelid = t.typrelid) as attr_names,\n\t(select array_agg(a.atttypid order by a.attnum) \n\t\tfrom pg_attribute a where a.attrelid = t.typrelid) as attr_types\nfrom pg_type t\nleft join pg_range r on r.rngtypid = t.oid\nwhere t.oid = ANY ($1::int[])"
  type parameters = array<Pg_catalog._int4>
  type parametersRecord = {typeIds: Pg_catalog._int4}
  type row = (
    Pg_catalog.oid,
    Pg_catalog.name,
    Pg_catalog.regnamespace,
    Pg_catalog.int2,
    Pg_catalog.bool_,
    Pg_catalog.char_,
    Pg_catalog.char_,
    Pg_catalog.bool_,
    Pg_catalog.bool_,
    Pg_catalog.char_,
    Pg_catalog.oid,
    Pg_catalog.oid,
    Pg_catalog.oid,
    Pg_catalog.bool_,
    Pg_catalog.oid,
    Pg_catalog.int4,
    Pg_catalog.int4,
    Pg_catalog.oid,
    Pg_catalog.text,
    Pg_catalog.oid,
    Pg_catalog._name,
    Pg_catalog._oid,
  )
  type rowRecord = {
    oid: Pg_catalog.oid,
    typname: Pg_catalog.name,
    typnamespace: Pg_catalog.regnamespace,
    typlen: Pg_catalog.int2,
    typbyval: Pg_catalog.bool_,
    typtype: Pg_catalog.char_,
    typcategory: Pg_catalog.char_,
    typispreferred: Pg_catalog.bool_,
    typisdefined: Pg_catalog.bool_,
    typdelim: Pg_catalog.char_,
    typrelid: Pg_catalog.oid,
    typelem: Pg_catalog.oid,
    typarray: Pg_catalog.oid,
    typnotnull: Pg_catalog.bool_,
    typbasetype: Pg_catalog.oid,
    typtypmod: Pg_catalog.int4,
    typndims: Pg_catalog.int4,
    typcollation: Pg_catalog.oid,
    typdefault: Pg_catalog.text,
    rngsubtype: Pg_catalog.oid,
    attr_names: Pg_catalog._name,
    attr_types: Pg_catalog._oid,
  }
  let convertParameters = (r: parametersRecord): parameters => [r.typeIds]
  let convertRow = (
    (
      oid,
      typname,
      typnamespace,
      typlen,
      typbyval,
      typtype,
      typcategory,
      typispreferred,
      typisdefined,
      typdelim,
      typrelid,
      typelem,
      typarray,
      typnotnull,
      typbasetype,
      typtypmod,
      typndims,
      typcollation,
      typdefault,
      rngsubtype,
      attr_names,
      attr_types,
    ): row,
  ): rowRecord => {
    oid: oid,
    typname: typname,
    typnamespace: typnamespace,
    typlen: typlen,
    typbyval: typbyval,
    typtype: typtype,
    typcategory: typcategory,
    typispreferred: typispreferred,
    typisdefined: typisdefined,
    typdelim: typdelim,
    typrelid: typrelid,
    typelem: typelem,
    typarray: typarray,
    typnotnull: typnotnull,
    typbasetype: typbasetype,
    typtypmod: typtypmod,
    typndims: typndims,
    typcollation: typcollation,
    typdefault: typdefault,
    rngsubtype: rngsubtype,
    attr_names: attr_names,
    attr_types: attr_types,
  }
  @send
  external run: (
    NodePostgres.client,
    {"values": parameters, "text": string},
  ) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) =>
    run(client, {"values": parameters->convertParameters, "text": statement})
  @send
  external runArray: (
    NodePostgres.client,
    {"values": parameters, "text": string, "rowMode": [#array]},
  ) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) =>
    runArray(
      client,
      {"values": parameters->convertParameters, "text": statement, "rowMode": #array},
    )
}

// -- @getEnumValues
// select * from pg_enum where enumtypid = ANY ($typeIds::int[]) order by enumsortorder
module GetEnumValues = {
  let statement = "-- @getEnumValues\nselect * from pg_enum where enumtypid = ANY ($1::int[]) order by enumsortorder"
  type parameters = array<Pg_catalog._int4>
  type parametersRecord = {typeIds: Pg_catalog._int4}
  type row = (Pg_catalog.oid, Pg_catalog.oid, Pg_catalog.float4, Pg_catalog.name)
  type rowRecord = {
    oid: Pg_catalog.oid,
    enumtypid: Pg_catalog.oid,
    enumsortorder: Pg_catalog.float4,
    enumlabel: Pg_catalog.name,
  }
  let convertParameters = (r: parametersRecord): parameters => [r.typeIds]
  let convertRow = ((oid, enumtypid, enumsortorder, enumlabel): row): rowRecord => {
    oid: oid,
    enumtypid: enumtypid,
    enumsortorder: enumsortorder,
    enumlabel: enumlabel,
  }
  @send
  external run: (
    NodePostgres.client,
    {"values": parameters, "text": string},
  ) => Promise.t<NodePostgres.queryResult<rowRecord>> = "query"
  let run = (client, parameters) =>
    run(client, {"values": parameters->convertParameters, "text": statement})
  @send
  external runArray: (
    NodePostgres.client,
    {"values": parameters, "text": string, "rowMode": [#array]},
  ) => Promise.t<NodePostgres.queryResult<row>> = "query"
  let runArray = (client, parameters) =>
    runArray(
      client,
      {"values": parameters->convertParameters, "text": statement, "rowMode": #array},
    )
}
