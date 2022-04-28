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

test("Name attribute", () => {
  expect(Parser.parse("/*@name: test*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (2nd ignored)", () => {
  expect(Parser.parse("/*@name: testA4_\n@name: test1*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (invalid)", () => {
  expect(Parser.parse("/*@name: %abc*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (invalid, starts with a digit)", () => {
  expect(Parser.parse("/*@name: 4abc*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (empty)", () => {
  expect(Parser.parse("/*@name: */SELECT 1"))->toMatchSnapshot
})

test("Name attribute (text before)", () => {
  expect(Parser.parse("/*abc @name: abc*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (many comments)", () => {
  expect(Parser.parse("-- abc\n/* @name: abc*/SELECT 1"))->toMatchSnapshot
})

test("Name attribute (after code)", () => {
  expect(Parser.parse("SELECT 1/* @name: abc*/"))->toMatchSnapshot
})

test("Parameters", () => {
  expect(Parser.parse("SELECT :foo = :bar"))->toMatchSnapshot
})

test("Parameters (no name, error)", () => {
  expect(Parser.parse("SELECT ':'"))->toMatchSnapshot
})

test("Parameters (no name, escaped)", () => {
  expect(Parser.parse("SELECT '\\:'"))->toMatchSnapshot
})

test("Raw", () => {
  expect(Parser.parse("SELECT :num:raw<1|2>"))->toMatchSnapshot
})

test("Raw (escaped)", () => {
  expect(Parser.parse("SELECT '\\:num\\:raw<1|2>'"))->toMatchSnapshot
})

test("Raw (empty option)", () => {
  expect(Parser.parse("SELECT :num:raw<1,|> 2"))->toMatchSnapshot
})

test("Raw (<<<)", () => {
  expect(Parser.parse("SELECT :num:raw<<<1<|>|||2>>>"))->toMatchSnapshot
})

test("Raw (<<<, not closed)", () => {
  expect(Parser.parse("SELECT :num:raw<<<1|||2>>"))->toMatchSnapshot
})

test("Batch", () => {
  expect(
    Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>"),
  )->toMatchSnapshot
})

test("Batch (nested batch)", () => {
  expect(
    Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>"),
  )->toMatchSnapshot
})

test("Batch (nested raw)", () => {
  expect(
    Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>"),
  )->toMatchSnapshot
})

test("Batch (not closed)", () => {
  expect(
    Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo, :bar)>"),
  )->toMatchSnapshot
})

test("Batch (nested comment)", () => {
  expect(
    Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>"),
  )->toMatchSnapshot
})

test("Parse file", () => {
  expect(Parser.parseFile("SELECT 1;SELECT 2;"))->toMatchSnapshot
})

test("Parse file (custom separator)", () => {
  expect(Parser.parseFile("-- @separator:### \nSELECT 1###SELECT 2"))->toMatchSnapshot
})

// TODO: more tests for parseFile
