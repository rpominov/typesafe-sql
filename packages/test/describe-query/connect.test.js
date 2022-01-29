const { createClient } = require("@typesafe-sql/describe-query");
const { Client } = require("pg");

test("Connects and disconnects", async () => {
  const pgClient = new Client();
  await pgClient.connect();

  const isConnected = async () => {
    let { rows } = await pgClient.query(
      "SELECT count(*) FROM pg_stat_activity WHERE application_name = 'test_app'"
    );
    return rows[0].count === "1";
  };

  expect(await isConnected()).toBe(false);

  const client = await createClient({ application_name: "test_app" });

  expect(await isConnected()).toBe(true);

  client.terminate();

  expect(await isConnected()).toBe(false);

  pgClient.end();
});

test("Fatal error propagates to all requests in the queue", async () => {
  expect.assertions(1);

  const client = await createClient({ application_name: "test_app" });

  const a = client.describe("SELECT 1");
  const b = client.describe("SELECT 1");
  const c = client.describe("SELECT 1");

  client.terminate();

  try {
    await a;
  } catch (e) {}

  try {
    await b;
  } catch (e) {}

  try {
    await c;
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      `[Error: Connection has been terminated]`
    );
  }
});

test("Requests fail after termination", async () => {
  expect.assertions(1);

  const client = await createClient({ application_name: "test_app" });
  client.terminate();

  try {
    await client.describe("SELECT 1");
  } catch (error) {
    expect(error).toMatchInlineSnapshot(
      `[Error: Connection has been terminated]`
    );
  }
});
