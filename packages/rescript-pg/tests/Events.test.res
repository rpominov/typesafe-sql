open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let client = Pg.Client.make()
beforeAllAsync(() => client->Pg.Client.connect)
afterAllAsync(() => client->Pg.Client.end)

testAsyncCb("Error", done => {
  expectAssertions(1)

  let app = "events.Error.test"
  let client2 = Pg.Client.make(~application_name=app, ())

  let errors = []
  client2
  ->Pg.Client.on(
    #error(
      err => {
        switch Pg.DatabaseError.fromJsExn(err) {
        | Some(dbErr) => dbErr.code
        | _ => err->Js.Exn.message->Belt.Option.getUnsafe
        }
        ->Js.Array2.push(errors, _)
        ->ignore
        if errors->Js.Array2.length === 2 {
          expect(errors)->toEqual(["57P01", "Connection terminated unexpectedly"])
          done(.)
        }
      },
    ),
  )
  ->ignore

  client2
  ->Pg.Client.connect
  ->then(() =>
    client->Pg.query(
      "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE application_name = $1",
      ~parameters=[app],
    )
  )
  ->ignore
})

testAsync("Notice", () => {
  expectAssertions(1)

  let notices = []
  let callback = notice => notices->Js.Array2.push(notice)->ignore

  client->Pg.Client.on(#notice(callback))->ignore

  client
  ->Pg.query("DO language plpgsql $$ BEGIN RAISE NOTICE 'test 123'; END $$")
  ->then(_ => {
    expect(notices->Js.Array2.map(n => n.message))->toEqual(["test 123"])
    client->Pg.Client.off(#notice(callback))->ignore
    Js.Promise.resolve()
  })
})

testAsync("Notification", () => {
  expectAssertions(1)

  let notifications = []
  let callback = n => notifications->Js.Array2.push(n)->ignore

  client->Pg.Client.on(#notification(callback))->ignore

  client
  ->Pg.query("LISTEN foo")
  ->then(_ => client->Pg.query("NOTIFY foo, 'bar'"))
  ->then(_ => client->Pg.query("NOTIFY foo"))
  ->then(_ => {
    expect(notifications->Js.Array2.map(n => (n.channel, n.payload)))->toEqual([
      ("foo", "bar"),
      ("foo", ""),
    ])
    client->Pg.Client.off(#notification(callback))->ignore
    Js.Promise.resolve()
  })
})
