// TODO: delete when tests are ready

module DescribeQuery = TypesafeSQLDescribeQuery

let example = "
  -- @allAnimals
  SELECT * FROM animals;

  -- @syntaxError
  SELECT * FROMM animals;
"

DescribeQuery.createClient(
  DescribeQuery.config(
    ~host="localhost",
    ~user="testuser",
    ~password="testpassword",
    ~database="testdatabase",
    (),
  ),
)->Promise.done(val =>
  switch val {
  | Ok(client) =>
    client->Processor.processFileContent(example, results => {
      switch results {
      | Ok(x) => Js.log(x)
      | Error(x) => Js.Console.error(x)
      }
      client->DescribeQuery.terminate
    })
  | Error(err) => Js.Console.error(err)
  }
)
