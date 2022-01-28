const { createClient } = require("@typesafe-sql/describe-query");

expect.addSnapshotSerializer({
  serialize(val /*, config, indentation, depth, refs, printer*/) {
    const input = val.input.map((x) => x.type.typname).join(", ");
    const output =
      val.output == null
        ? "null"
        : `{\n${val.output
            .map(
              (x) =>
                `  ${x.name}${
                  x.column != null && x.name !== x.column.column_name
                    ? `(${x.column.column_name})`
                    : ""
                }: ${x.column?.is_nullable === "NO" ? "" : "?"}${
                  x.type.typname
                }`
            )
            .join("\n")}\n}`;
    return `(${input}) => ${output}`;
  },
  test(val) {
    return (
      val &&
      Array.isArray(val.input) &&
      (val.output === null || Array.isArray(val.output))
    );
  },
});

let client;

beforeAll(async () => {
  client = await createClient();
});

afterAll(() => {
  client.terminate();
});

test("simplest select", async () => {
  const query = "SELECT 1";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    () => {
      ?column?: ?int4
    }
  `);
});

test("simplest select with a semicolon", async () => {
  const query = "SELECT 1;";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    () => {
      ?column?: ?int4
    }
  `);
});

test("simplest select with a commnet", async () => {
  const query = "SELECT 1 -- comment";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    () => {
      ?column?: ?int4
    }
  `);
});

test("simple select from a table with a parameter", async () => {
  const query = "SELECT * FROM animals WHERE is_dog = $1";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    (bool) => {
      id: int4
      name: ?text
      is_dog: bool
    }
  `);
});

test("aggregate", async () => {
  const query = "SELECT count(*) FROM animals";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    () => {
      count: ?int8
    }
  `);
});

test("insert", async () => {
  const query = "INSERT INTO animals(name, is_dog) VALUES ($1, $2)";
  expect(await client.describe(query)).toMatchInlineSnapshot(
    `(text, bool) => null`
  );
});

test("insert with RETURNING", async () => {
  const query = "INSERT INTO animals(name, is_dog) VALUES ($1, $2) RETURNING *";
  expect(await client.describe(query)).toMatchInlineSnapshot(`
    (text, bool) => {
      id: int4
      name: ?text
      is_dog: bool
    }
  `);
});

test("many queries", async () => {
  const a = client.describe("SELECT 1 a");
  const b = client.describe("SELECT 1 b");
  const c = client.describe("SELECT 1 c");

  expect(await a).toMatchInlineSnapshot(`
    () => {
      a: ?int4
    }
  `);
  expect(await b).toMatchInlineSnapshot(`
    () => {
      b: ?int4
    }
  `);
  expect(await c).toMatchInlineSnapshot(`
    () => {
      c: ?int4
    }
  `);
});
