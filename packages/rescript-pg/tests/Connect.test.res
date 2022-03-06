open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

testAsync("Connect/disconnect w/o errors (no config)", () => {
  let client = Pg.Client.make()
  client->Pg.Client.connect->then(() => client->Pg.Client.end)
})

testAsync("Connect/disconnect w/o errors", () => {
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

testAsync("async password", () => {
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
