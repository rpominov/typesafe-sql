type client = {
  describeQueryClient: TypesafeSQLDescribeQuery.client,
  rootDir: string,
  sources: array<string>,
  output: string => result<string, string>,
  generator: array<Steps.Generate.t> => Promise.t<string>,
  mutable processingFiles: bool,
  mutable terminated: bool,
}

let make = (~dbConfig=?, ~rootDir=?, ~sources, ~output, ~generator) => {
  switch dbConfig {
  | Some(x) => x
  | None => TypesafeSQLDescribeQuery.config()
  }
  ->TypesafeSQLDescribeQuery.createClient
  ->Promise.catch(LogError.wrapExn(~extra="Could not connect to the database server\n\n"))
  ->Promise.chainOk(describeQueryClient => {
    switch PathRebuild.make(output) {
    | Ok(fn) =>
      Ok({
        describeQueryClient: describeQueryClient,
        rootDir: Fs.resoloveRoot(rootDir),
        sources: sources,
        output: x => fn(x),
        generator: generator,
        processingFiles: false,
        terminated: false,
      })
    | Error(msg) => Error(LogError.wrapString(msg))
    }->Promise.resolve
  })
}

let terminate = client => {
  if client.terminated {
    Js.Console.warn("terminate() was applied to a client that is already terminated")
  } else {
    client.terminated = true
    client.describeQueryClient->TypesafeSQLDescribeQuery.terminate
  }
}

let processFile = (client, file) => {
  Js.log(`Processing ${file}`)
  switch client.output(file) {
  | Error(message) => {
      Js.Console.error(message)
      Promise.resolve()
    }
  | Ok(output) =>
    Fs.read(Fs.joinPath(client.rootDir, file))
    ->Promise.chainOk(Steps.Parse.asyncParse)
    ->Promise.chainOk(parsed =>
      client.describeQueryClient
      ->Steps.Describe.describeMany(parsed->Js.Array2.map(x => x.processedStatement))
      ->Promise.chainOk(Steps.Generate.generate(parsed, _, Steps.Generate.exampleGenerator))
    )
    ->Promise.chainOk(Fs.write(Fs.joinPath(client.rootDir, output), _))
    ->Promise.chain(result => {
      switch result {
      | Error(err) => Js.Console.errorMany(err.msg)
      | _ => ()
      }
      Promise.resolve()
    })
  }
}
