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
	(select array_agg(a.attname order by a.attnum) 
		from pg_attribute a where a.attrelid = t.typrelid) as attr_names,
	(select array_agg(a.atttypid order by a.attnum) 
		from pg_attribute a where a.attrelid = t.typrelid) as attr_types
from pg_type t
left join pg_range r on r.rngtypid = t.oid
where t.oid = ANY ($typeIds::int[]);

-- @getEnumValues
select * from where enumtypid = ANY ($typeIds::int[]) order by enumsortorder;