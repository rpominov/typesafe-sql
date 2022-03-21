open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

testAsync("No config", () => {
  let client = Pg.Client.make()
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

let getExn = (opt, loc) =>
  switch opt {
  | Some(x) => x
  | None => Js.Exn.raiseError(j`Unexpected None at: $loc`)
  }

let env = Node.Process.process["env"]
let pgUser = env->Js.Dict.get("PGUSER")->getExn(__LOC__)
let pgPassword = env->Js.Dict.get("PGPASSWORD")->getExn(__LOC__)
let pgDatabase = env->Js.Dict.get("PGDATABASE")->getExn(__LOC__)
let pgHost = env->Js.Dict.get("PGHOST")->getExn(__LOC__)
let pgPort = env->Js.Dict.get("PGPORT")->getExn(__LOC__)->Belt.Int.fromString->getExn(__LOC__)

testAsync("With config", () => {
  let client = Pg.Client.make(
    ~user=pgUser,
    ~password=Pg.Password.make(pgPassword),
    ~database=pgDatabase,
    ~host=pgHost,
    ~port=pgPort,
    (),
  )
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsync("Extra options", () => {
  let client = Pg.Client.make(
    ~user=pgUser,
    ~password=Pg.Password.make(pgPassword),
    ~database=pgDatabase,
    ~host=pgHost,
    ~port=pgPort,
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
    ~user=pgUser,
    ~password=Pg.Password.makeAsync(makePass(pgPassword)),
    ~database=pgDatabase,
    ~host=pgHost,
    ~port=pgPort,
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
