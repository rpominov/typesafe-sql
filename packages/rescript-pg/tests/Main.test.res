open Jest

testAsync("Connect/disconnect w/o errors", () => {
  let client = Pg.Client.make(
    ~user="testuser",
    ~password=Pg.Password.make("testpassword"),
    ~database="testdatabase",
    ~host="localhost",
    ~port=5432,
    (),
  )
  client->Pg.Client.connect->Js.Promise.then_(() => client->Pg.Client.end, _)
})

testAsync("Connect/disconnect w/o errors (no config)", () => {
  let client = Pg.Client.make()
  client->Pg.Client.connect->Js.Promise.then_(() => client->Pg.Client.end, _)
})
