open Jest

test("Simplest query", () => {
  expect(Parser.parse("SELECT 1"))->toMatchSnapshot
})

test("Inline comments", () => {
  expect(Parser.parse("-- test\nSELECT -- test2\n--\n 1-- test3"))->toMatchSnapshot
})

test("Block comments", () => {
  expect(Parser.parse("/* test \n abc*/\nSELECT /* test2 /* test3 */ */ 1/**/"))->toMatchSnapshot
})

test("Block comments error", () => {
  expect(Parser.parse("SELECT 1/* test"))->toMatchSnapshot
})

test("Block comments error nested", () => {
  expect(Parser.parse("SELECT 1/* test /* test2 "))->toMatchSnapshot
})
