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

test("syntax error", async () => {
  let error;
  try {
    await client.describe("SELEC 1");
  } catch (e) {
    error = e;
  }
  expect(error).not.toBeNull();
  expect(error.message).toMatchInlineSnapshot(
    `"syntax error at or near \\"SELEC\\""`
  );
});

test("wrong table name", async () => {
  let error;
  try {
    await client.describe("SELECT * FROM bad_table");
  } catch (e) {
    error = e;
  }
  expect(error).not.toBeNull();
  expect(error.message).toMatchInlineSnapshot(
    `"relation \\"bad_table\\" does not exist"`
  );
});

test("simplet select", async () => {
  expect(await client.describe("SELECT 1")).toMatchInlineSnapshot(`
    () => {
      ?column?: ?int4
    }
  `);
});

test("simple select from a table with a parameter", async () => {
  expect(await client.describe("SELECT * FROM animals WHERE is_dog = $1"))
    .toMatchInlineSnapshot(`
    (bool) => {
      id: int4
      name: ?text
      is_dog: bool
    }
  `);
});

test("aggregate", async () => {
  expect(await client.describe("SELECT count(*) FROM animals"))
    .toMatchInlineSnapshot(`
    () => {
      count: ?int8
    }
  `);
});

test("insert", async () => {
  expect(
    await client.describe("INSERT INTO animals(name, is_dog) VALUES ($1, $2)")
  ).toMatchInlineSnapshot(`(text, bool) => null`);
});

test("insert with RETURNING", async () => {
  expect(
    await client.describe(
      "INSERT INTO animals(name, is_dog) VALUES ($1, $2) RETURNING *"
    )
  ).toMatchInlineSnapshot(`
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
