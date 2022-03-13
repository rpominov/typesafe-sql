type client = {
  describeQueryClient: TypesafeSqlRescriptDescribeQuery.Client.client,
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
  | None => Pg.Config.make()
  }
  ->TypesafeSqlRescriptDescribeQuery.Client.make
  // ->Promise.catch(LogError.wrapExn(~extra="Could not connect to the database server\n\n"))
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

    // TODO: don't ignore
    client.describeQueryClient->TypesafeSqlRescriptDescribeQuery.Client.terminate->ignore
  }
}

let processFile = (client, file) => {
  TTY.stdout->TTY.write(`[${file}]`)
  switch client.output(file) {
  | Error(message) => {
      Js.Console.error(message)
      Promise.resolve()
    }
  | Ok(output) =>
    Fs.read(Fs.joinPath(client.rootDir, file))
    ->TTY.progress
    ->Promise.chainOk(Steps.Parse.asyncParse)
    ->TTY.progress
    ->Promise.chainOk(parsed =>
      client.describeQueryClient
      ->Steps.Describe.describeMany(parsed->Js.Array2.map(x => x.processedStatement))
      ->TTY.progress
      ->Promise.chainOk(Steps.Generate.generate(parsed, _, client.generator))
    )
    ->TTY.progress
    ->Promise.chainOk(Fs.write(Fs.joinPath(client.rootDir, output), _))
    ->TTY.progress
    ->Promise.chain(result => {
      switch result {
      | Error(err) => {
          TTY.stdout->TTY.write("error\n")
          LogError.log(err)
          Js.Console.error("")
        }
      | _ => TTY.stdout->TTY.write("ok\n")
      }
      Promise.resolve()
    })
  }
}

let build = client => {
  Fs.resolve(client.rootDir, client.sources)->Promise.chain(result =>
    switch result {
    | Error(err) => {
        LogError.log(err)
        Promise.resolve()
      }
    | Ok(files) =>
      files
      ->Js.Array2.map((file, ()) => processFile(client, file))
      ->Promise.sequence
      ->Promise.chain(_ => Promise.resolve())
    }
  )
}
