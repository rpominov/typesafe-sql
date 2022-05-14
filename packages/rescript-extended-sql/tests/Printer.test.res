open Jest

let ind0 = ""
let ind1 = "  "
let incInd = ind => ind ++ ind1

let showStr = x => x->Js.Json.string->Js.Json.stringify

let showAll = (arr, showItem, ind) =>
  "\n" ++
  ind->incInd ++
  arr->Js.Array2.map(showItem)->Js.Array2.joinWith("\n" ++ ind->incInd) ++ "\n"

let rec showParams = (params, ind) => {
  let showNamed = ({Printer.name: name, link}) => `${name}: ${link->showLink(ind->incInd)}`
  `{${params->showAll(showNamed, ind)}${ind}}`
}
and showLink = (link, ind) =>
  switch link {
  | Plain(n) => "$" ++ n->Js.Int.toString
  | Raw(options) => `Raw(${options->showAll(showStr, ind)}${ind})`
  | Batch(separator, params') => `Batch(${separator->showStr} ${params'->showParams(ind)})`
  }

let expectToMatchSnapshot = makeSnapshotMatcher(((sqlQueries, params)) =>
  `SQL = [${sqlQueries->showAll(showStr, ind0)}]\nPARAMS = ${params->showParams(ind0)}`
)

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
