open Jest
module Loggable = TypesafeSqlErrors.Loggable

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let client = ref(None)

beforeAllAsync(() =>
  Client.make()->then(result => {
    switch result {
    | Ok(c) => {
        client := Some(c)
        Promise.resolve()
      }
    | Error(e) => {
        Loggable.toString(e)->Js.Console.error
        Promise.reject(Promise.makeJsError("Could not create a client"))
      }
    }
  })
)

afterAllAsync(() => {
  client.contents->getExn(__LOC__)->Client.terminate
})

eachAsync(
  [
    "SELECT 1",
    "SELECT 1;",
    "SELECT 1 -- comment",
    "SELECT oid FROM pg_type",
    "SELECT oid FROM pg_type WHERE pg_type = $1",
  ],
  "Describe: %s",
  query => {
    expectAssertions(1)
    client.contents
    ->getExn(__LOC__)
    ->Client.describe(query)
    ->then(description => {
      expect(description)->toMatchSnapshot
      Js.Promise.resolve()
    })
  },
)

testAsync("tableColumn", () => {
  expectAssertions(1)
  client.contents
  ->getExn(__LOC__)
  ->Client.describe("SELECT oid FROM pg_type")
  ->then(description => {
    (
      (description->getOkExn(__LOC__)).row->Js.Null.toOption->getExn(__LOC__)->arrGetExn(0, __LOC__)
    ).tableColumn
    ->Js.Null.toOption
    ->getExn(__LOC__)
    ->expect
    ->toEqual({
      attfdwoptions: Js.null,
      attname: "oid",
      attndims: 0,
      attnotnull: true,
      attnum: Js.Null.return(1),
      attoptions: Js.null,
      attrelid: Js.Null.return(1247),
      atttypmod: -1,
      attrelname: Js.Null.return("pg_type"),
    })
    Js.Promise.resolve()
  })
})

testAsync("queue", () => {
  expectAssertions(3)

  let client = client.contents->getExn(__LOC__)

  let a = client->Client.describe("SELECT 1 a")
  let b = client->Client.describe("SELECT 1 b")
  let c = client->Client.describe("SELECT 1 c")

  Js.Promise.all3((a, b, c))->then(((a, b, c)) => {
    expect(
      ((a->getOkExn(__LOC__)).row->Js.Null.toOption->getExn(__LOC__)->arrGetExn(0, __LOC__)).name,
    )->toEqual("a")
    expect(
      ((b->getOkExn(__LOC__)).row->Js.Null.toOption->getExn(__LOC__)->arrGetExn(0, __LOC__)).name,
    )->toEqual("b")
    expect(
      ((c->getOkExn(__LOC__)).row->Js.Null.toOption->getExn(__LOC__)->arrGetExn(0, __LOC__)).name,
    )->toEqual("c")
    Js.Promise.resolve()
  })
})

// TODO: write a query that would contain all kinds of types: Array, Enum etc.
testAsync("complicated types", () => {
  expectAssertions(1)
  client.contents
  ->getExn(__LOC__)
  ->Client.describe("SELECT typacl FROM pg_type")
  ->then(description => {
    (description->getOkExn(__LOC__)).row
    ->Js.Null.toOption
    ->getExn(__LOC__)
    ->Js.Array2.map(x => x.dataType)
    ->expect
    ->toMatchSnapshot
    Js.Promise.resolve()
  })
})
