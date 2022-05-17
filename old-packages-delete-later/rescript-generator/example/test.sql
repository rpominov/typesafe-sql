-- @noRows
create table test (id serial);

-- @empty
select from pg_type;

-- @one
select oid from pg_type;

-- @two
select oid, typname from pg_type;

-- @oneParam
select oid, typname from pg_type where oid = $oid;

-- @twoParams
select oid, typname from pg_type where oid = $oid and typname = $name;

-- @nonUniqueColumnNames
select oid, typname name, 'name' name, typcategory from pg_type;

