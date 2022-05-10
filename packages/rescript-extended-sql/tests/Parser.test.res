open Jest

each(
  [
    "SELECT 1",
    "-- test\nSELECT -- test2\n--\n 1-- test3",
    "/* test \n abc*/\nSELECT /* test2 /* test3 */ */ 1/**/",
    "SELECT 1/* test",
    "SELECT 1/* test /* test2 ",
    "/*@name: test*/SELECT 1",
    "/*\n * @name: test\n */SELECT 1",
    "/*@name: testA4_\n@name: test1*/SELECT 1",
    "/*@name: %abc*/SELECT 1",
    "/*@name: 4abc*/SELECT 1",
    "/*@name: */SELECT 1",
    "/*abc @name: abc*/SELECT 1",
    "-- abc\n/* @name: abc*/SELECT 1",
    "SELECT 1/* @name: abc*/",
    "SELECT :foo = :bar",
    "SELECT ':'",
    "SELECT '\\:'",
    "SELECT :num:raw<1|2>",
    "SELECT :num:raw<>",
    "SELECT '\\:num\\:raw<1|2>'",
    "SELECT :num:raw<1,|> 2",
    "SELECT :num:raw<<<1<|>|||2>>>",
    "SELECT :num:raw<<<1|||2>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo, :bar)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>",
  ],
  "parse(\"%s\")",
  code => code->Parser.parse->expect->toMatchSnapshot,
)

// TODO: more tests for parseFile
each(["SELECT 1;SELECT 2;", "-- @separator:### \nSELECT 1###SELECT 2"], "parseFile(\"%s\")", code =>
  code->Parser.parseFile->expect->toMatchSnapshot
)
