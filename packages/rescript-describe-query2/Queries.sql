-- @getTypes
select
 	n.oid namespace_oid,
 	n.nspname,
 	t.oid,
 	t.typname, 
 	t.typtype,
 	t.typcategory,
 	t.typdelim,
 	e.oid elem_oid, 
 	e.typname elem_typname,
 	e.typtype elem_typtype,
 	e.typcategory elem_typcategory
from pg_type t 
left join pg_namespace n on t.typnamespace = n.oid 
left join pg_type e on t.typelem = e.oid
where t.oid = ANY ($typeIds::int[]);