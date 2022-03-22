open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let catch = (promise, cb) => Js.Promise.catch(err => {
    cb(err)
    Js.Promise.resolve()
  }, promise->then(_ => Js.Promise.resolve()))

eachAsync(["ASC", "DESC"], "Fatal error propagates to all requests in the queue (%s)", orderDir => {
  expectAssertions(1)

  let appName = "errors_propagation_test"
  let all = ref(None)

  let pgClient = Pg.Client.make()

  pgClient
  ->Pg.Client.connect
  ->then(() => {
    Client.make(~pgConfig=Pg.Config.make(~application_name=appName, ()), ())->then(result => {
      let client = result->getOkExn(__LOC__)

      all :=
        Js.Promise.all([
          // will likely succeed, because it's not async under the hood
          client->Client.describe("SELECT 1")->catch(_ => ()),
          // should observe a fatal error and fail
          client->Client.describe("SELECT 1")->catch(_ => ()),
          // the fatal error should propagate to this request,
          // that at the time of the error waiting in the queue
          client->Client.describe("SELECT 1")->catch(err => expect(err)->toMatchSnapshot),
        ])->Some

      Js.Promise.resolve()
    })
  })
  ->then(_ =>
    pgClient->Pg.query(
      `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE application_name = $1 ORDER BY backend_start ${orderDir} LIMIT 1`,
      ~parameters=[appName],
    )
  )
  ->then(_ => all.contents->getExn(__LOC__)->then(_ => pgClient->Pg.Client.end))
})

testAsync("All requests in the queue get rejected when client is terminated", () => {
  expectAssertions(1)

  Client.make()->then(result => {
    let client = result->getOkExn(__LOC__)

    let all = Js.Promise.all([
      // will likely succeed, because it's not async under the hood
      client->Client.describe("SELECT 1")->catch(_ => ()),
      // should observe a fatal error and fail
      client->Client.describe("SELECT 1")->catch(_ => ()),
      // the fatal error should propagate to this request,
      // that at the time of the error waiting in the queue
      client->Client.describe("SELECT 1")->catch(err => expect(err)->toMatchSnapshot),
    ])

    client->Client.terminate->then(_ => all->then(_ => Js.Promise.resolve()))
  })
})

testAsync("Non fatal errors don't propagate", () => {
  expectAssertions(2)

  Client.make()->then(result => {
    let client = result->getOkExn(__LOC__)

    Js.Promise.all3((
      client->Client.describe("SELECT 1"),
      client->Client.describe("SELEC 1")->catch(err => expect(err)->toMatchSnapshot),
      client->Client.describe("SELECT 1"),
    ))->then(((_, _, res)) => {
      expect(res)->toMatchSnapshot
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
    ->then(_ => {
      Js.Promise.catch(err => {
        expect(err)->toMatchSnapshot
        Js.Promise.resolve()
      }, client->Client.describe("SELECT 1")->then(_ => Js.Promise.resolve()))
    })
  })
})
