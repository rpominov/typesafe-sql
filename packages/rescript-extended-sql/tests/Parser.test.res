open Jest
open TypesafeSqlSharedTypes.ExtendedSql

let ind0 = ""
let ind1 = "  "
let incInd = ind => ind ++ ind1

let showStr = x => x->Js.Json.string->Js.Json.stringify

let showAll = (arr, showItem, ind) =>
  "\n" ++
  ind->incInd ++
  arr->Js.Array2.map(showItem)->Js.Array2.joinWith("\n" ++ ind->incInd) ++ "\n"

let showLocation = ({start, end}) => `${start->Js.Int.toString}-${end->Js.Int.toString}`

let showFuzzyLocation = ({start, end}: parseError) =>
  switch end->Js.Null.toOption {
  | None => start->Js.Int.toString
  | Some(end) => `${start->Js.Int.toString}-${end->Js.Int.toString}`
  }

let rec showAst = (ast, ind) => {
  let showNode = (node: node) =>
    switch node {
    | #InlineComment(str) => `InlineComment(${str->showStr})`
    | #BlockComment(str) => `BlockComment(${str->showStr})`
    | #SqlChunk(str) => `SqlChunk(${str->showStr})`
    | #Parameter({name}) => `Parameter(${name->showStr})`
    | #RawParameter({name, options}) =>
      `RawParameter(${name->showStr} [${options->showAll(showStr, ind->incInd)}${ind->incInd}])`
    | #BatchParameter({name, separator, body}) =>
      `BatchParameter(${name->showStr} ${separator->showStr} ${body->showAst(ind->incInd)})`
    }

  let showLocatedNode = obj => `${showNode(obj.node)} at ${showLocation(obj)}`

  `[${ast->showAll(showLocatedNode, ind)}${ind}]`
}

let showParsedStatement = ({attributes, ast}, ind) =>
  `(${attributes->Js.Json.stringifyAny->getExn(__LOC__)} ${ast->showAst(ind)})`

let showErr = obj => `Error(${obj.message->showStr} at ${obj->showFuzzyLocation})`

let expectToMatchSnapshot = makeSnapshotMatcher(result =>
  switch result {
  | Error(err) => showErr(err)
  | Ok(statement) => `Ok${statement->showParsedStatement(ind0)}`
  }
)

let expectToMatchSnapshotFile = makeSnapshotMatcher(result =>
  switch result {
  | Error(err) => showErr(err)
  | Ok({separator, statements}) =>
    `Ok(${separator->showStr} [${statements->showAll(showParsedStatement(_, ind1), ind0)}])`
  }
)

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
    "SELECT :foo = :foo",
    "SELECT ':'",
    "SELECT '\\:'",
    "SELECT :num:raw<1|2>",
    "SELECT :num:raw<>",
    "SELECT '\\:num\\:raw<1|2>'",
    "SELECT :num:raw<1,|> 2",
    "SELECT :num:raw<<<1<|>|||2>>>",
    "SELECT :num:raw<<<1|||2>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :bar)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<(:foo, :foo)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:batch<:bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo:raw<foo|bar>)>>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo, :bar)>",
    "INSERT INTO test (foo, bar) VALUES :values:batch<<(:foo /* <comment> */)>>",
  ],
  "parse(\"%s\")",
  code => code->Parser.parse->expectToMatchSnapshot,
)

// TODO: more tests for parseFile
each(["SELECT 1;SELECT 2;", "-- @separator:### \nSELECT 1###SELECT 2"], "parseFile(\"%s\")", code =>
  code->Parser.parseFile->expectToMatchSnapshotFile
)
