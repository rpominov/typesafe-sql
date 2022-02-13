// TODO: delete when tests are ready

module DescribeQuery = TypesafeSQLDescribeQuery

DescribeQuery.createClient(
  DescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
)->Promise.doneOk(client =>
  Steps.Read.read("./src/example.sql")->Promise.doneOk(val =>
    switch val {
    | Error(msg) => {
        Js.Console.error(msg)
        client->DescribeQuery.terminate
      }
    | Ok(content) =>
      switch Steps.Parse.parse(content) {
      | Error(msg) => {
          Js.Console.error(msg)
          client->DescribeQuery.terminate
        }
      | Ok(parsed) => {
          let statements = parsed->Js.Array2.map(x => x.processedStatement)
          Steps.Describe.describeMany(client, statements)->Promise.doneOk(val => {
            switch val {
            | Ok(described) =>
              Steps.Generate.generate(
                parsed,
                described,
                Steps.Generate.jsonGenerator,
              )->Promise.doneOk(val => {
                switch val {
                | Ok(text) => Js.log(text)
                | Error(text) => Js.Console.error(text)
                }
                client->DescribeQuery.terminate
              })
            | Error(dbError) => {
                Js.Console.error(dbError)
                client->DescribeQuery.terminate
              }
            }
          })
        }
      }
    }
  )
)
