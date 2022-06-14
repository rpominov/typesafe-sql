module.exports = {
  defaultOutputPath: "{dir}/{name}.json",
  generate: (data) => JSON.stringify(data, null, 2),
};
