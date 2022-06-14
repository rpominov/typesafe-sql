module.exports = {
  debug: false,
  username: "testuser",
  password: "testpassword",
  dbname: "testdatabase",
  host: "localhost",
  port: 5432,
  sources: [{ input: "./sql/*.sql", output: "{root}{0..-4}/json/{-2}.json" }],
  generator: "./generator.js",
};
