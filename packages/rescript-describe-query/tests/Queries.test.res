open Jest

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
        LogError.log(e)
        Promise.reject(e.originalExn)
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
    (description.row->getExn(__LOC__)->arrGetExn(0, __LOC__)).tableColumn
    ->getExn(__LOC__)
    ->expect
    ->toEqual({
      attcollation: Some(0),
      attfdwoptions: None,
      attname: Some("oid"),
      attndims: Some(0),
      attnotnull: Some(true),
      attnum: Some(1),
      attoptions: None,
      attrelid: Some(1247),
      atttypid: Some(26),
      atttypmod: Some(-1),
      relname: Some("pg_type"),
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
    expect((a.row->getExn(__LOC__)->arrGetExn(0, __LOC__)).name)->toEqual("a")
    expect((b.row->getExn(__LOC__)->arrGetExn(0, __LOC__)).name)->toEqual("b")
    expect((c.row->getExn(__LOC__)->arrGetExn(0, __LOC__)).name)->toEqual("c")
    Js.Promise.resolve()
  })
})
