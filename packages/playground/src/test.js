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

  const a = client.describe("SELECT1 0 a;");
  const b = client.describe("SELECT 0 b;");
  const c = client.describe("SELECT 0 c;");

  client.terminate();

  try {
    console.log(await a);
  } catch (error) {
    console.error("a", error.message);
  }

  try {
    console.log(await b);
  } catch (error) {
    console.error("b", error.message);
  }

  try {
    console.log(await c);
  } catch (error) {
    console.error("c", error.message);
  }

  client.terminate();
}

main();
