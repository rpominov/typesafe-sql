const { createClient } = require("@typesafe-sql/describe-query");

async function main() {
  const client = await createClient({
    host: "localhost",
    port: 5432,
    user: "roman",
    password: "1234",
    database: "roman",
  });

  console.log(await client.describe("select name as nickname, * from people"));
  console.log(await client.describe("insert into people values ($1, $2, $3)"));
  console.log(
    await client.describe(
      "SELECT $1::text as test, $2::int as test1, * from people"
    )
  );
  console.log(await client.describe("SELECT NOW();"));

  client.terminate();
}

main();
