open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

testAsync("Connect", () => {
  expectAssertions(1)

  let name = "pool.Connect.test"
  let pool = Pg.Pool.make(~application_name=name, ())
  pool
  ->Pg.Pool.connect
  ->then(client =>
    client
    ->Pg.query(
      "SELECT count(*) FROM pg_stat_activity WHERE application_name = $1",
      ~parameters=[name],
    )
    ->then(result => {
      client->Pg.Pool.release()
      Pg.Pool.end(pool)->then(() => {
        expect(result.rows)->toEqual([{"count": "1"}])
        Js.Promise.resolve()
      })
    })
  )
})
