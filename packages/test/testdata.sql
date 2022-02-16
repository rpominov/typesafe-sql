DROP TABLE IF EXISTS toys;
DROP TABLE IF EXISTS animals;
DROP TABLE IF EXISTS all_types;
DROP TABLE IF EXISTS aliases;
DROP TABLE IF EXISTS sal_emp;
DROP TYPE IF EXISTS mood;
DROP TYPE IF EXISTS happiness;

CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
CREATE TYPE happiness AS ENUM ('happy', 'very happy', 'ecstatic');

CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name text,
    is_dog boolean NOT NULL DEFAULT true
);

CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    belongs_to integer REFERENCES animals(id) ON DELETE SET NULL,
    properties text[]
);

-- https://www.postgresql.org/docs/current/datatype.html
CREATE TABLE all_types (
    bigint bigint,
    bigserial bigserial,
    bit bit(8),
    bit_varying bit varying(8),
    boolean boolean,
    box box,
    bytea bytea,
    character character(8),
    character_varying character varying(8),
    cidr cidr,
    circle circle,
    date date,
    double_precision double precision,
    inet inet,
    integer integer,
    interval interval, -- has optional parameters
    json json,
    jsonb jsonb,
    line line,
    lseg lseg,
    macaddr macaddr,
    macaddr8 macaddr8,
    money money,
    numeric numeric, -- has optional parameters
    path path,
    pg_lsn pg_lsn,
    pg_snapshot pg_snapshot,
    point point,
    polygon polygon,
    real real,
    smallint smallint,
    smallserial smallserial,
    serial serial,
    text text,
    time time, -- has optional parameters
    time_tz time with time zone, -- has optional parameters
    timestamp timestamp, -- has optional parameters
    timestamp_tz timestamp with time zone, -- has optional parameters
    tsquery tsquery,
    tsvector tsvector,
    txid_snapshot txid_snapshot, -- deprecated
    uuid uuid,
    xml xml
);

CREATE TABLE aliases (
    int8 int8,
    serial8 serial8,
    bool bool
);

CREATE TABLE sal_emp (
    name            text,
    pay_by_quarter  integer[],
    schedule        text[][]
)