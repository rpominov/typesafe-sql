# @typesafe-sql/describe-query

This package allows you to get information about SQL queries. For example:

```js
import { createClient } from "@typesafe-sql/describe-query";

const client = await createClient({
  host: "localhost",
  port: 5432,
  user: "Username",
  password: "Password",
  database: "Database",
});

const description = await client.describe(
  "SELECT NOW(), * FROM users WHERE name = $1 AND age > $2"
);

// description = {
//
//   input: [
//     { typname: "text", ... },
//     { typname: "int4", ... },
//   ],
//
//   output: [
//     {
//       name: "now",
//       type: { typname: "timestamptz", ... },
//       column: null
//     },
//     {
//       name: "id",
//       type: { typname: "int4", ... },
//       column: { table_name: "users", column_name: "id", is_nullable: "NO", ... }
//     },
//     {
//       name: "name",
//       type: { typname: "text", ... },
//       column: { table_name: "users", column_name: "name", is_nullable: "YES", ... }
//     },
//     ...
//   ],
//
// };

client.terminate();
```

The library connects to your database server and asks it to parse and describe the query.
**But it does not run the query.**

The most useful information is about data types.
But you also get some information about tables and columns the data comes from.

## Installation

```
npm i @typesafe-sql/describe-query
```

## API

### `createClient(Config): Promise<Client>`

Creates a client.
`Config` is passed directly to `node-postgres`.
See documentation at: https://node-postgres.com/api/client#new-clientconfig-object

### `client.terminate()`

Terminates the connection to the server.

### `client.describe(string): Promise<Info>`

Fetches information about the query from the server.
The information has the following shape:

```js
{
  // information about parameters of the query
  input: Array<Datatype>,

  // information about the rows that the query produce
  // will be null if the query does not produce rows e.g., an INSERT query
  output: ?Array<{
    name: string,
    type: Datatype,
    column: ?Column, // will be null if data does not come from a table e.g., SELECT NOW()
  }>

}
```

Where:

```js
Namespace = {
  oid: number,
  nspname: string,
  ... // the rest of the fields from the pg_catalog.pg_namespace table,
      // see https://www.postgresql.org/docs/current/catalog-pg-namespace.html
}

Datatype = {
  oid: number,
  typname: string,
  namespace: Namespace,
  ... // the rest of the fields from the pg_catalog.pg_type table,
      // see https://www.postgresql.org/docs/current/catalog-pg-type.html
}

Table = {
  oid: number,
  relname: string,
  namespace: Namespace,
  ... // the rest of the fields from the pg_catalog.pg_class table,
      // see https://www.postgresql.org/docs/current/catalog-pg-class.html
}

Column = {
  column_name: string,
  is_nullable: "YES" | "NO",
  table: Table,
  ... // the rest of the fields from the information_schema.columns table,
      // see https://www.postgresql.org/docs/current/infoschema-columns.html
}
```
