// TODO: delete when tests are ready

// module DescribeQuery = TypesafeSQLDescribeQuery

// let main = client => {
//   let root = Fs.resoloveRoot(None)

//   let handleFile = src => {
//     Js.log(src)

//     let dest = PathRebuild.transformExn("{0..-2}.json", src)
//     Fs.read(Fs.joinPath(root, src))
//     ->Promise.chainOk(Steps.Parse.asyncParse)
//     ->Promise.chainOk(parsed =>
//       Steps.Describe.describeMany(
//         client,
//         parsed->Js.Array2.map(x => x.processedStatement),
//       )->Promise.chainOk(Steps.Generate.generate(parsed, _, Steps.Generate.exampleGenerator))
//     )
//     ->Promise.chainOk(Fs.write(Fs.joinPath(root, dest), _))
//     ->Promise.chain(result => {
//       switch result {
//       | Error(err) => Js.Console.errorMany(err.msg)
//       | _ => ()
//       }
//       Promise.resolve()
//     })
//   }

//   Fs.resolve(root, ["**/*.sql"])->Promise.chain(result =>
//     switch result {
//     | Error(err) => {
//         Js.Console.errorMany(err.msg)
//         Promise.resolve([])
//       }
//     | Ok(files) => files->Js.Array2.map(handleFile)->Js.Promise.all
//     }
//   )
// }

// DescribeQuery.createClient(
//   DescribeQuery.config(
//     ~host="localhost",
//     ~user="testuser",
//     ~password="testpassword",
//     ~database="testdatabase",
//     (),
//   ),
// )->Promise.done(client => client->main->Promise.done(_ => client->DescribeQuery.terminate))

Client.make(
  ~dbConfig=TypesafeSQLDescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
  ~rootDir=".",
  ~sources=["**/*.sql"],
  ~output="{0..-2}.json",
  ~generator=Steps.Generate.exampleGenerator,
)->Promise.done(result => {
  switch result {
  | Error(err) => Js.Console.errorMany(err.msg)
  | Ok(client) =>
    client
    ->Client.build
    ->Promise.done(_ => {
      client->Client.terminate
    })
  }
})
