const { createClient } = require("@typesafe-sql/describe-query");

let client;

beforeAll(async () => {
  client = await createClient();
});

afterAll(() => {
  client.terminate();
});

const essential = (description) => {
  return {
    input: description.input.map((x) => x.type.typname),
    output: description.output.map((x) => ({
      name: x.name,
      type: x.type.typname,
      column: x.column?.column_name,
      nullable: x.column?.is_nullable,
    })),
  };
};

test("example", async () => {
  const description = await client.describe(
    "SELECT * FROM animals WHERE is_dog = $1"
  );

  expect(essential(description)).toMatchInlineSnapshot(`
    Object {
      "input": Array [
        "bool",
      ],
      "output": Array [
        Object {
          "column": "id",
          "name": "id",
          "nullable": "NO",
          "type": "int4",
        },
        Object {
          "column": "name",
          "name": "name",
          "nullable": "YES",
          "type": "text",
        },
        Object {
          "column": "is_dog",
          "name": "is_dog",
          "nullable": "NO",
          "type": "bool",
        },
      ],
    }
  `);
});
