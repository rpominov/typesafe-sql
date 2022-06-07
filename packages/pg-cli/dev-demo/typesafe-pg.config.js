module.exports = {
  debug: false,
  username: "testuser",
  password: "testpassword",
  dbname: "testdatabase",
  host: "localhost",
  port: 5432,
  sources: [{ input: "./tmp-test-sql/*.sql" }],
  generator: "./generator.js",
};
