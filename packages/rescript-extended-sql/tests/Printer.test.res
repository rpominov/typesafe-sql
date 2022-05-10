open Jest

let getAst = (res, loc) => (res->getOkExn(loc)).Parser.ast

test("Simplest query", () => {
  Parser.parse("SELECT 1")->getAst(__LOC__)->Printer.print->expect->toMatchSnapshot
})

test("Comments", () => {
  Parser.parse("-- inline\nSELECT /* block */1")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})

test("Parameters", () => {
  Parser.parse("SELECT :foo = :bar")->getAst(__LOC__)->Printer.print->expect->toMatchSnapshot
})

test("Raw", () => {
  Parser.parse("SELECT :num:raw<1|2>")->getAst(__LOC__)->Printer.print->expect->toMatchSnapshot
})

test("Raw (empty option)", () => {
  Parser.parse("SELECT :num:raw<1,|> 2")->getAst(__LOC__)->Printer.print->expect->toMatchSnapshot
})

test("Raw (<<<)", () => {
  Parser.parse("SELECT :num:raw<<<1<|>|||2>>>")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})

test("Batch", () => {
  Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})

test("Batch (nested batch)", () => {
  Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})

test("Batch (nested raw)", () => {
  Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})

test("Batch (nested comment)", () => {
  Parser.parse("INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>")
  ->getAst(__LOC__)
  ->Printer.print
  ->expect
  ->toMatchSnapshot
})
