module GeneratorInputData = {
  type statement = {
    // rawText: string,
    parsed: ExtendedSQL.Parser.parsedStatement,
    description: DescribeQuery.Client.description,
  }

  type t = {
    filePath: string,
    rawFileContent: string,
    statements: array<statement>,
  }
}

type codeGenerator = {
  name: string,
  defaultOutputPath: string => string,
  generate: GeneratorInputData.t => Promise.t<string>,
}

type argv = {
  version: bool,
  debug: bool,
  quiet: bool,
  generator: option<codeGenerator>,
  input: option<string>,
  output: option<string => string>,
  config: option<string>,
  host: option<string>,
  port: option<int>,
  username: option<string>,
  password: option<string>,
  dbname: option<string>,
  connection: option<string>,
}

type source = {
  input: array<string>,
  output: option<string => string>,
}
type config = {
  debug: option<bool>,
  quiet: option<bool>,
  generator: option<codeGenerator>,
  host: option<string>,
  port: option<int>,
  username: option<string>,
  password: option<string>,
  dbname: option<string>,
  connection: option<string>,
  sources: option<array<source>>,
}

type t = {
  config: config,
  argv: argv,
}

let quiet = ctx => ctx.argv.quiet || ctx.config.quiet === Some(true)

let sources = ctx =>
  switch (ctx.argv.input, ctx.config.sources) {
  | (Some(glob), _) => Some([{input: [glob], output: ctx.argv.output}])
  | (_, Some([]) | None) => None
  | (_, Some(_) as some) => some
  }

%%private(
  let orElse = (a, b) =>
    switch a {
    | Some(_) as some => some
    | None => b
    }
)

let generator = ctx => ctx.argv.generator->orElse(ctx.config.generator)

let pgConfig = ctx =>
  Pg.Config.make(
    ~connectionString=?ctx.argv.connection->orElse(ctx.config.connection),
    ~user=?ctx.argv.username->orElse(ctx.config.username),
    ~database=?ctx.argv.dbname->orElse(ctx.config.dbname),
    ~host=?ctx.argv.host->orElse(ctx.config.host),
    ~password=?ctx.argv.password->orElse(ctx.config.password)->Belt.Option.map(Pg.Password.make),
    ~port=?ctx.argv.port->orElse(ctx.config.port),
    ~application_name="typesafe-pg",
    (),
  )
