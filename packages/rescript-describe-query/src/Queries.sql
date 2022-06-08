-- @getTypes
select
  t.oid,
  t.typname,
  t.typnamespace::regnamespace,
  t.typlen,
  t.typbyval,
  t.typtype,
  t.typcategory,
  t.typispreferred,
  t.typisdefined,
  t.typdelim,
  t.typrelid,
  t.typelem,
  t.typarray,
  t.typnotnull,
  t.typbasetype,
  t.typtypmod,
  t.typndims,
  t.typcollation,
  t.typdefault,
  r.rngsubtype,
  (select array_agg(a.attname::text order by a.attnum) 
    from pg_attribute a 
    where a.attrelid = t.typrelid 
    and a.attisdropped = false
    and a.attnum >= 0) as attr_names,
  (select array_agg(a.atttypid order by a.attnum) 
    from pg_attribute a where a.attrelid = t.typrelid 
    and a.attisdropped = false
    and a.attnum >= 0) as attr_types,
  (select array_agg(e.enumlabel::text order by e.enumsortorder)
    from pg_enum e where e.enumtypid = t.oid) as enum_labels
from pg_type t
left join pg_range r on r.rngtypid = t.oid
where t.oid = ANY ($typeIds::int[]);

-- @getAttributes
select
  a.attrelid,
  a.attnum,
  a.attrelid::regclass relname,
  a.attname,
  a.atttypid,
  a.attndims,
  a.atttypmod,
  a.attnotnull,
  a.attcollation,
  a.attoptions,
  a.attfdwoptions
from pg_catalog.pg_attribute a where attrelid = ANY ($relIds::int[]);