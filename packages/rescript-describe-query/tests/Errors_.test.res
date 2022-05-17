open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let pgClient = Pg.Client.make()
beforeAllAsync(() => pgClient->Pg.Client.connect)
afterAllAsync(() => pgClient->Pg.Client.end)

eachAsync(["ASC", "DESC"], "Fatal error propagates to all requests in the queue (%s)", orderDir => {
  expectAssertions(1)

  let appName = "errors_propagation_test"

  Client.make(~pgConfig=Pg.Config.make(~application_name=appName, ()), ())->then(result => {
    let client = result->getOkExn(__LOC__)

    let all = Js.Promise.all([
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
    ])

    pgClient
    ->Pg.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE application_name = $1 ORDER BY backend_start ${orderDir} LIMIT 1`,
      ~parameters=[appName],
    )
    ->then(_ => all)
    ->then(results => {
      expect(results[4]->Belt.Result.isError)->toBe(true)
      Promise.resolve()
    })
  })
})

testAsync("All requests in the queue get rejected when client is terminated", () => {
  expectAssertions(1)

  Client.make()->then(result => {
    let client = result->getOkExn(__LOC__)

    let all = Js.Promise.all([
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELECT 1"),
    ])

    client
    ->Client.terminate
    ->then(_ => all)
    ->then(results => {
      expect(results[4]->Belt.Result.isError)->toBe(true)
      Promise.resolve()
    })
  })
})

testAsync("Non fatal errors don't propagate", () => {
  expectAssertions(2)
  Client.make()->then(result => {
    let client = result->getOkExn(__LOC__)
    Js.Promise.all3((
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELEC 1"),
      client->Client.describe("SELECT 1"),
    ))->then(((_, res1, res2)) => {
      expect(res1->Belt.Result.isError)->toBe(true)
      expect(res2->Belt.Result.isOk)->toBe(true)
      client->Client.terminate
    })
  })
})

testAsync("Requests fail after termination", () => {
  expectAssertions(1)
  Client.make()->then(result => {
    let client = result->getOkExn(__LOC__)
    client
    ->Client.terminate
    ->then(_ =>
      client
      ->Client.describe("SELECT 1")
      ->then(result => {
        expect(result->Belt.Result.isError)->toBe(true)
        Js.Promise.resolve()
      })
    )
  })
})

eachAsync(
  ["SELEC 1", "SELECT * FROM does_not_exist", "SELECT 1 || 1"],
  "SQL error in %p",
  query => {
    expectAssertions(1)
    Client.make()->then(result => {
      let client = result->getOkExn(__LOC__)
      client
      ->Client.describe(query)
      ->then(res => {
        expect(res)->toMatchSnapshot
        client->Client.terminate
      })
    })
  },
)

// TODO: more tests for the errors content
