open Jest

test("Simplest query", () => {
  expect(Parser.parse("SELECT 1"))->toMatchSnapshot
})
