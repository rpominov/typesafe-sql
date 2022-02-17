// TODO: delete when tests are ready


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
  | Error(err) => LogError.log(err)
  | Ok(client) =>
    client
    ->Client.build
    ->Promise.done(_ => {
      client->Client.terminate
    })
  }
})
