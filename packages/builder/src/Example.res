// TODO: delete when tests are ready

module DescribeQuery = TypesafeSQLDescribeQuery

let main = client => {
  Steps.Read.read("./src/example.sql")
  ->Promise.chainOk(content =>
    switch Steps.Parse.parse(content) {
    | Error(msg) => Error(msg->LogError.fromString)
    | Ok(parsed) => Ok(parsed)
    }->Promise.resolve
  )
  ->Promise.chainOk(parsed =>
    Steps.Describe.describeMany(
      client,
      parsed->Js.Array2.map(x => x.processedStatement),
    )->Promise.chainOk(described =>
      Steps.Generate.generate(parsed, described, Steps.Generate.exampleGenerator)
    )
  )
  ->Promise.chainOk(generated => Steps.Write.write("./src/example.json", generated))
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
)->Promise.done(client =>
  client
  ->main
  ->Promise.done(() => {
    client->DescribeQuery.terminate
  })
)
