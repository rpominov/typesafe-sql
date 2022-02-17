// TODO: delete when tests are ready

TypesafeSqlBuilder.Client.make(
  ~dbConfig=TypesafeSQLDescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
  ~rootDir=".",
  ~sources=["**/*.sql"],
  ~output="{0..-2}.txt",
  ~generator=Main.generator,
)->Promise.done(result => {
  switch result {
  | Error(err) => LogError.log(err)
  | Ok(client) =>
    client
    ->TypesafeSqlBuilder.Client.build
    ->Promise.done(_ => {
      client->TypesafeSqlBuilder.Client.terminate
    })
  }
})
