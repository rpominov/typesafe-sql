module GeneratorInputData = {
  type statement = {
    rawText: string,
    parsed: ExtendedSQL.Parser.parsedStatement,
    description: DescribeQuery.Client.description,
  }

  type file = {
    rawText: string,
    statements: array<statement>,
  }
}

type codeGenerator = {
  name: string,
  defaultOutputPath: string => string,
  generate: GeneratorInputData.file => Promise.t<string>,
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
  port: option<string>,
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
  port: option<string>,
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


