open Jest

let then = (promise, fn) => Js.Promise.then_(fn, promise)

let env = Node.Process.process["env"]
let pgUser = env->Js.Dict.get("PGUSER")->getExn(__LOC__)
let pgPassword = env->Js.Dict.get("PGPASSWORD")->getExn(__LOC__)
let pgDatabase = env->Js.Dict.get("PGDATABASE")->getExn(__LOC__)
let pgHost = env->Js.Dict.get("PGHOST")->getExn(__LOC__)
let pgPort = env->Js.Dict.get("PGPORT")->getExn(__LOC__)->Belt.Int.fromString->getExn(__LOC__)

testAsync("No config", () => {
  Client.make()->then(result => result->getOkExn(__LOC__)->Client.terminate)
})

testAsync("With config", () => {
  Client.make(
    ~pgConfig=Pg.Config.make(
      ~user=pgUser,
      ~password=Pg.Password.make(pgPassword),
      ~database=pgDatabase,
      ~host=pgHost,
      ~port=pgPort,
      (),
    ),
    (),
  )->then(result => result->getOkExn(__LOC__)->Client.terminate)
})
