const { Client } = require("pg");

const main = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "roman",
    password: "1234",
    database: "roman",
  });

  await client.connect();

  const result = await client.query({
    text: "select * from tmp",
    rowMode: "array",
  });

  // const result = await client.query({
  //   text: "insert into tmp values ('test')",
  //   rowMode: "array",
  // });

  console.log(result);

  client.end();
};

main();
