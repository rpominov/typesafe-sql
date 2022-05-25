type argv = {
  version: bool,
  debug: bool,
  quiet: bool,
  generator: option<string>,
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
  generator: option<string>,
  host: option<string>,
  port: option<string>,
  username: option<string>,
  password: option<string>,
  dbname: option<string>,
  connection: option<string>,
  sources: option<array<source>>,
}

type context = {
  config: config,
  argv: argv,
}

let quiet = ctx => ctx.argv.quiet || ctx.config.quiet === Some(true)
