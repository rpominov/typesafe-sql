const { createClient } = require("@typesafe-sql/describe-query");

let client;

beforeAll(async () => {
  client = await createClient();
});

afterAll(() => {
  client.terminate();
});

test("syntax error", async () => {
  let error;
  try {
    await client.describe("SELEC 1");
  } catch (e) {
    error = e;
  }
  expect(error).toMatchInlineSnapshot(
    `[error: syntax error at or near "SELEC"]`
  );
});

test("wrong table name", async () => {
  let error;
  try {
    await client.describe("SELECT * FROM bad_table");
  } catch (e) {
    error = e;
  }
  expect(error).toMatchInlineSnapshot(
    `[error: relation "bad_table" does not exist]`
  );
});

test("multiple statements", async () => {
  let error;
  try {
    await client.describe("SELECT 1; SELECT 2;");
  } catch (e) {
    error = e;
  }
  expect(error).toMatchInlineSnapshot(
    `[error: cannot insert multiple commands into a prepared statement]`
  );
});

test("missing parameter", async () => {
  let error;
  try {
    await client.describe("INSERT INTO animals VALUES ($1, $3, $4)");
  } catch (e) {
    error = e;
  }
  expect(error).toMatchInlineSnapshot(
    `[error: could not determine data type of parameter $2]`
  );
});
