const { createClient } = require("@typesafe-sql/describe-query");
const { Client } = require("pg");

let pgClient;

beforeAll(async () => {
  pgClient = new Client();
  await pgClient.connect();
});

afterAll(() => {
  pgClient.end();
});

test("Connects and disconnects", async () => {
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

  let error;
  try {
    await client.describe("SELECT 1");
  } catch (e) {
    error = e;
  }

  expect(error).toMatchInlineSnapshot(
    `[Error: Connection has been terminated]`
  );
});
