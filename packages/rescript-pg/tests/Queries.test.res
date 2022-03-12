open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let client = Pg.Client.make()
beforeAllAsync(() => client->Pg.Client.connect)
afterAllAsync(() => client->Pg.Client.end)

testAsync("Pg.query", () => {
  expectAssertions(1)
  client
  ->Pg.query("SELECT 42 num")
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42}])
    Js.Promise.resolve()
  })
})

testAsync("Pg.query + params", () => {
  expectAssertions(1)
  client
  ->Pg.query(~parameters=(42, "text"), "SELECT $1::int num, $2::text str")
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42, "str": "text"}])
    Js.Promise.resolve()
  })
})

testAsyncCb("Pg.queryCb", done => {
  expectAssertions(1)
  client->Pg.queryCb("SELECT 42 num", result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42}])
    done(.)
  })
})

testAsyncCb("Pg.queryCb + params", done => {
  expectAssertions(1)
  client->Pg.queryCb(~parameters=(42, "text"), "SELECT $1::int num, $2::text str", result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42, "str": "text"}])
    done(.)
  })
})

testAsync("Pg.queryConf", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(Pg.QueryConfig.make(~text="SELECT 42 num", ()))
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42}])
    Js.Promise.resolve()
  })
})

testAsync("Pg.queryConf + rowMode:array", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(Pg.QueryConfig.make(~text="SELECT 42 num", ~rowMode=#array, ()))
  ->then(result => {
    expect(result.rows)->toEqual([[42]])
    Js.Promise.resolve()
  })
})

testAsync("Pg.queryConf + params", () => {
  expectAssertions(1)
  client
  ->Pg.queryConf(
    Pg.QueryConfig.make(~text="SELECT $1::int num, $2::text str", ~values=(42, "text"), ()),
  )
  ->then(result => {
    expect(result.rows)->toEqual([{"num": 42, "str": "text"}])
    Js.Promise.resolve()
  })
})

testAsyncCb("Pg.queryConfCb", done => {
  expectAssertions(1)
  client->Pg.queryConfCb(Pg.QueryConfig.make(~text="SELECT 42 num", ()), result => {
    expect((result->Belt.Result.getExn).rows)->toEqual([{"num": 42}])
    done(.)
  })
})

testAsync("Custom type parser", () => {
  expectAssertions(1)

  let typesParser = Pg.TypesParser.make(~fallback=Pg.TypesParser.globalParser, ())
  typesParser->Pg.TypesParser.setTypeParser(23, str => "Custom: " ++ str)

  client
  ->Pg.queryConf(Pg.QueryConfig.make(~text="SELECT 42 num, TRUE bool", ~types=typesParser, ()))
  ->then(result => {
    expect(result.rows)->toEqual([{"num": "Custom: 42", "bool": true}])
    Js.Promise.resolve()
  })
})

testAsync("Pg.query + error", () => {
  expectAssertions(1)
  client->Pg.query("SELECT 42 + ''")->then(_ => Js.Promise.resolve())->Js.Promise.catch(err => {
    expect((Obj.magic(err)->Pg.DatabaseError.fromJsExn->Belt.Option.getExn).code)->toEqual("22P02")
    Js.Promise.resolve()
  }, _)
})

testAsyncCb("Pg.queryCb + err", done => {
  expectAssertions(1)
  client->Pg.queryCb("SELECT 42 + ''", result => {
    expect(
      switch result {
      | Ok(_) => None
      | Error(e) => Some((e->Pg.DatabaseError.fromJsExn->Belt.Option.getExn).code)
      },
    )->toEqual(Some("22P02"))
    done(.)
  })
})
