const { createClient } = require("@typesafe-sql/describe-query");

let client;

beforeAll(async () => {
  client = await createClient();
});

afterAll(() => {
  client.terminate();
});

const getError = (promise) =>
  promise.then(
    () => null,
    (e) => e
  );

test("syntax error", async () => {
  expect(await getError(client.describe("SELEC 1"))).toMatchInlineSnapshot(
    `[error: syntax error at or near "SELEC"]`
  );
});

test("wrong table name", async () => {
  expect(
    await getError(client.describe("SELECT * FROM bad_table"))
  ).toMatchInlineSnapshot(`[error: relation "bad_table" does not exist]`);
});

test("multiple statements", async () => {
  expect(
    await getError(client.describe("SELECT 1; SELECT 2;"))
  ).toMatchInlineSnapshot(
    `[error: cannot insert multiple commands into a prepared statement]`
  );
});

test("missing parameter", async () => {
  expect(
    await getError(client.describe("INSERT INTO animals VALUES ($1, $3, $4)"))
  ).toMatchInlineSnapshot(
    `[error: could not determine data type of parameter $2]`
  );
});
