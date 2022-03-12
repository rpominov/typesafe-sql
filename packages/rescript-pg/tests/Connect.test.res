open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

testAsync("No config", () => {
  let client = Pg.Client.make()
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsync("With config", () => {
  let client = Pg.Client.make(
    ~user="testuser",
    ~password=Pg.Password.make("testpassword"),
    ~database="testdatabase",
    ~host="localhost",
    ~port=5432,
    (),
  )
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsync("Extra options", () => {
  let client = Pg.Client.make(
    ~user="testuser",
    ~password=Pg.Password.make("testpassword"),
    ~database="testdatabase",
    ~host="localhost",
    ~port=5432,
    ~application_name="Test",
    ~connectionTimeoutMillis=1000,
    ~idle_in_transaction_session_timeout=1000,
    ~query_timeout=1000,
    ~statement_timeout=1000,
    (),
  )
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsync("Async password", () => {
  // to make sure currying doesn't break anything
  let makePass1 = (pass, _: unit) => Js.Promise.resolve(pass)
  let makePass2 = (pass, _: unit) => Js.Promise.resolve(pass)
  let makePass = Js.Math.random() > 0.5 ? makePass1 : makePass2

  let client = Pg.Client.make(
    ~user="testuser",
    ~password=Pg.Password.makeAsync(makePass("testpassword")),
    ~database="testdatabase",
    ~host="localhost",
    ~port=5432,
    (),
  )
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsyncCb("Callbacks", done => {
  expectAssertions(2)
  let client = Pg.Client.make()
  client->Pg.Client.connectCb(res1 => {
    client->Pg.Client.endCb(res2 => {
      expect(res1)->toEqual(Ok())
      expect(res2)->toEqual(Ok())
      done(.)
    })
  })
})

testAsync("Custom type parser", () => {
  expectAssertions(1)

  let typesParser = Pg.TypesParser.make(~fallback=Pg.TypesParser.globalParser, ())
  typesParser->Pg.TypesParser.setTypeParser(23, str => "Custom: " ++ str)

  let client = Pg.Client.make(~types=typesParser, ())
  client
  ->Pg.Client.connect
  ->then(() => client->Pg.query("SELECT 42 num, TRUE bool"))
  ->then(result => {
    client
    ->Pg.Client.end
    ->then(_ => {
      expect(result.rows)->toEqual([{"num": "Custom: 42", "bool": true}])
      Js.Promise.resolve()
    })
  })
})
