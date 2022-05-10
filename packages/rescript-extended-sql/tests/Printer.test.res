open Jest

// (Js.Array2.t<string>, paramLinks<int>)

let showStr = x => x->Js.Json.string->Js.Json.stringify

let rec showParams = (indent, params: Printer.paramLinks<int>) =>
  "{\n  " ++
  indent ++
  params
  ->Js.Array2.map(({name, link}) =>
    name ++
    ": " ++
    switch link {
    | Plain(n) => `$${n->Js.Int.toString}`
    | Raw(options) =>
      `Raw(\n    ${indent}${options
        ->Js.Array2.map(showStr)
        ->Js.Array2.joinWith("\n    " ++ indent)}\n${indent}  )`
    | Batch(separator, params') => `Batch("${separator}" ${showParams(indent ++ "  ", params')})`
    }
  )
  ->Js.Array2.joinWith("\n  " ++ indent) ++
  "\n" ++
  indent ++ "}"

let expectToMatchSnapshot = makeSnapshotMatcher((
  val: (Js.Array2.t<string>, Printer.paramLinks<int>),
) => {
  let (codes, params) = val
  "SQL = [\n  " ++
  codes->Js.Array2.map(showStr)->Js.Array2.joinWith("\n  ") ++
  "\n]\nPARAMS = " ++
  showParams("", params)
})

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
  code => (code->Parser.parse->getOkExn(__LOC__)).ast->Printer.print->expectToMatchSnapshot,
)
