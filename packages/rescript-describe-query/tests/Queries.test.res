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
  client.contents->Belt.Option.getExn->Client.terminate
})

eachAsync(["SELECT 1", "SELECT oid FROM pg_type"], "Describe: %s", query => {
  expectAssertions(1)
  client.contents
  ->Belt.Option.getExn
  ->Client.describe(query)
  ->then(description => {
    expect(description)->toMatchSnapshot
    Js.Promise.resolve()
  })
})

testAsync("tableColumn", () => {
  expectAssertions(1)
  client.contents
  ->Belt.Option.getExn
  ->Client.describe("SELECT oid FROM pg_type")
  ->then(description => {
    let column =
      (description.row->Belt.Option.getExn->Belt.Array.getExn(0)).tableColumn->Belt.Option.getExn
    expect(column)->toEqual({
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
