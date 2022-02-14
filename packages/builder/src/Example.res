// TODO: delete when tests are ready

module DescribeQuery = TypesafeSQLDescribeQuery

let main = client => {
  Steps.Read.read("./src/example.sql")
  ->Promise.chainOk(Steps.Parse.asyncParse)
  ->Promise.chainOk(parsed =>
    Steps.Describe.describeMany(
      client,
      parsed->Js.Array2.map(x => x.processedStatement),
    )->Promise.chainOk(Steps.Generate.generate(parsed, _, Steps.Generate.exampleGenerator))
  )
  ->Promise.chainOk(Steps.Write.write("./src/example.json", _))
  ->Promise.chain(result => {
    switch result {
    | Error(err) => Js.Console.errorMany(err.msg)
    | _ => ()
    }
    Promise.resolve()
  })
}

DescribeQuery.createClient(
  DescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
)->Promise.done(client => client->main->Promise.done(() => client->DescribeQuery.terminate))
