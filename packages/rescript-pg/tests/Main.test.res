open Jest

let config = Pg.Config.make(
  ~user="testuser",
  ~password=Pg.Password.make("testpassword"),
  ~database="testdatabase",
  ~host="localhost",
  ~port=5432,
  (),
)

testAsync("Connect/disconnect w/o errors", () => {
  let client = Pg.Client.make(~config, ())
  client->Pg.Client.connect->Js.Promise.then_(() => client->Pg.Client.end, _)
})

testAsync("Connect/disconnect w/o errors (no config)", () => {
  let client = Pg.Client.make()
  client->Pg.Client.connect->Js.Promise.then_(() => client->Pg.Client.end, _)
})
