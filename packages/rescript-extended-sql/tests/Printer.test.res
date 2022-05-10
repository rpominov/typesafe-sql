open Jest

each(
  [
    "SELECT 1",
    "-- inline\nSELECT /* block */1",
    "SELECT :foo = :bar",
    "SELECT :num:raw<1|2>",
    "SELECT :num:raw<1,|> 2",
    "SELECT :num:raw<<<'<|>'|||'2'>>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>",
  ],
  "%s",
  code => (code->Parser.parse->getOkExn(__LOC__)).ast->Printer.print->expect->toMatchSnapshot,
)
