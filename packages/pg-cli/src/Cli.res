// Ideally we should read this from package.json,
// but I'm not sure how to find the file easily and reliably.
// Anyway, MUST KEEP IN SYNC.
let version = "0.1.0"

let header = `Typesafe SQL CLI for PostgreSQL [ver. ${version}]

This is a tool for generating typings for PostgreSQL queries.`

let help = `Usage: typesafe-sql-pg [--version | -v] <command> [--debug | -D] [--quiet | -q]
       [--input | -i <glob>] [--output | -o <pattern>] [--generator | -g <generator>]
       [--config | -c <path>] [--host | -h <db-host>] [--port | -p <db-port>]
       [--username | -U <db-user>] [--password | -W <db-password>]
       [--dbname | -d <db-database-name>] [--connection | -C <db-connection-string>]

typesafe-sql-pg build - Generate typings
typesafe-sql-pg watch - Generate, and continue updating as the input files change
typesafe-sql-pg pipe  - Generate using stdin as the input and output to stdout 

Example:

  $ typesafe-sql-pg build \\\\
    --connection "postgres://user:password@host:5432/database" \\\\
    --input "queries/*.sql" \\\\
    --output "{dir}/{name}.res" \\\\
    --generator rescript
       
Full documentation is available at 
https://github.com/rpominov/typesafe-sql/tree/master/packages/pg-cli
`

let quiet = ref(false)

let exitWithLoggableError = err => {
  if !quiet.contents {
    Js.Console.error("ERROR!")
    Errors.Loggable.log(err)
    Js.Console.error("")
    Js.Console.error(help)
  }
  Node.Process.exit(1)
}
let exitWithError = err => exitWithLoggableError(err->Errors.Loggable.fromText)

let (command, unparsedArgv) = switch Node.Process.argv->Belt.Array.get(2) {
| None => (None, [])
| Some(x) if x->Js.String2.startsWith("-") => (None, Node.Process.argv->Js.Array2.sliceFrom(2))
| opt => (opt, Node.Process.argv->Js.Array2.sliceFrom(3))
}

let command = switch command {
| None => #help
| Some("build") => #build
| Some("watch") => #watch
| Some("pipe") => #pipe
| Some(cmd) => `Unknown command: ${cmd}`->exitWithError
}

let outputValidator = {
  open Require.Validators
  either(
    string,
    str =>
      switch str {
      | "" =>
        Errors.Loggable.fromText(`Invalid "output" value. It cannot be an empty string.`)->Error
      | pattern =>
        switch pattern->PathRebuild.make {
        | Ok(fn) => Ok(fn)
        | Error(msg) => Errors.Loggable.fromText(`Invalid "output" value. ${msg}`)->Error
        }
      },
    function,
    fn => Ok(str => (fn->Obj.magic)(. str)),
  )
}

let resolveGenerator = moduleId => {
  switch Require.require(moduleId) {
  | Error(_) as err => err
  | Ok(None) => Error(Errors.Loggable.fromText(`Can't find module "${moduleId}"`))
  | Ok(Some(obj)) =>
    Require.validate(() => {
      open Require.Validators
      let obj = obj->cast(object, `The export of "${moduleId}"`)

      (
        {
          name: moduleId,
          defaultOutputPath: obj->property("defaultOutputPath", outputValidator),
          generate: obj->property("generate", function)->Obj.magic,
        }: Context.codeGenerator
      )
    })
  }
}

type argsParseError =
  | InvalidFlag(string, Minimist.val)
  | UnknownParameter(string)
  | ParameterError(string, string)
  | ParameterLoggableError(string, Errors.Loggable.t)
exception ArgsParseError(argsParseError)
let argv = try {
  let raise = error => raise(ArgsParseError(error))

  let result = unparsedArgv->Minimist.parse(
    ~flags=["version", "debug", "quiet"],
    ~parameters=[
      "generator",
      "output",
      "input",
      "config",
      "host",
      "port",
      "username",
      "password",
      "dbname",
      "connection",
    ],
    ~aliases={
      "version": "v",
      "generator": "g",
      "debug": "D",
      "input": "i",
      "output": "o",
      "quiet": "q",
      "config": "c",
      "host": "h",
      "port": "p",
      "username": "U",
      "password": "W",
      "dbname": "d",
      "connection": "C",
    },
    ~separate=true,
    ~onUnknown=(. s) =>
      if s->Js.String2.startsWith("-") {
        raise(UnknownParameter(s))
      } else {
        true
      },
  )

  let getFlagExn = name =>
    switch result->Minimist.get(name) {
    | Bool(v) => v
    // Minimist does this by default for `-f true`, but not for `-f=true`
    // I wish it didn't, as `true` might be one of our `inputs` in theory
    // But since it does, lets make it consistant
    | String("true") => true
    | String("false") => false
    // Even if defined as a boolean `-f=a` or `-f=5` will produce a string or a float
    | x => raise(InvalidFlag(name, x))
    }

  let getParam = name =>
    switch result->Minimist.get(name) {
    | String(val) => Some(val)
    | _ => None
    }

  quiet := getFlagExn("quiet")

  if unparsedArgv->Js.Array2.includes("--") {
    raise(UnknownParameter("--"))
  }

  switch result->Minimist.getPositional {
  | [] => ()
  | arr => raise(UnknownParameter(arr->Js.Array2.unsafe_get(0)))
  }

  let generator = switch getParam("generator") {
  | None => None
  | Some(name) =>
    switch resolveGenerator(name) {
    | Ok(generator) => Some(generator)
    | Error(error) => raise(ParameterLoggableError("generator", error))
    }
  }

  {
    Context.version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    quiet: getFlagExn("quiet"),
    generator: generator,
    input: getParam("input"),
    config: getParam("config"),
    host: getParam("host"),
    port: getParam("port"),
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection"),
    output: switch getParam("output") {
    | None => None
    | Some(str) =>
      switch str {
      | "" => raise(ParameterError("output", "It cannot be an empty string."))
      | pattern =>
        switch pattern->PathRebuild.make {
        | Ok(fn) => Some(fn)
        | Error(msg) => raise(ParameterError("output", msg))
        }
      }
    },
  }
} catch {
| ArgsParseError(error) =>
  switch error {
  | UnknownParameter(name) => `Unknown argument: ${name}`->exitWithError
  | InvalidFlag(name, String(str)) =>
    `Invalid --${name} value. A boolen flag can have values true/false or no value, got: ${str}`->exitWithError
  | InvalidFlag(name, Float(num)) =>
    `Invalid --${name} value. A boolen flag can have values true/false or no value, got: ${num->Js.Float.toString}`->exitWithError
  | InvalidFlag(name, _) =>
    `Invalid --${name} value. A boolen flag can have values true/false or no value.`->exitWithError
  | ParameterError(name, msg) => `Invalid --${name} value. ${msg}`->exitWithError
  | ParameterLoggableError(name, err) =>
    err->Errors.Loggable.prepend(`Invalid --${name} value.`)->exitWithLoggableError
  }
}

if argv.version {
  Js.log(version)
} else {
  let config = switch switch switch argv.config {
  | Some(path) =>
    switch Require.require(path) {
    | Ok(None) => (path, Errors.Loggable.fromText(`File doesn't exist`)->Error)
    | result => (path, result)
    }
  | None =>
    switch Require.require("./typesafe-sql-pg.config.json") {
    | Ok(None) =>
      switch Require.require("./typesafe-sql-pg.config.js") {
      | Ok(None) =>
        switch Require.require("./package.json") {
        | Ok(Some(obj)) => (
            "./package.json",
            Require.validate(() => {
              open Require.Validators
              obj->cast(object, "This")->property("typesafe-sql-pg", nullable(unknown))
            }),
          )
        | res => ("./package.json", res)
        }
      | res => ("./typesafe-sql-pg.config.js", res)
      }
    | res => ("./typesafe-sql-pg.config.json", res)
    }
  } {
  | (_, Ok(None)) => (
      "%fallback",
      Ok({
        Context.debug: None,
        quiet: None,
        generator: None,
        host: None,
        port: None,
        username: None,
        password: None,
        dbname: None,
        connection: None,
        sources: None,
      }),
    )
  | (path, Ok(Some(obj))) => (
      path,
      Require.validate(() => {
        open Require.Validators

        let obj = obj->cast(object, "This")

        let generator = switch obj->property("generator", nullable(string)) {
        | None => None
        | Some(name) =>
          switch resolveGenerator(name) {
          | Error(error) => failed(error)
          | Ok(x) => Some(x)
          }
        }

        {
          Context.debug: obj->property("debug", nullable(bool)),
          quiet: obj->property("quiet", nullable(bool)),
          generator: generator,
          host: obj->property("host", nullable(string)),
          port: obj->property("port", nullable(string)),
          username: obj->property("username", nullable(string)),
          password: obj->property("password", nullable(string)),
          dbname: obj->property("dbname", nullable(string)),
          connection: obj->property("connection", nullable(string)),
          sources: switch obj->property(
            "sources",
            nullable(
              arrayOf(
                objectOf2(
                  "input",
                  either(string, x => Ok([x]), arrayOf(string), xs => Ok(xs)),
                  "output",
                  nullable(outputValidator),
                  (i, o) => {Context.input: i, output: o},
                ),
              ),
            ),
          ) {
          | None | Some([]) => None
          | some => some
          },
        }
      }),
    )
  | (_, Error(_)) as res => res
  } {
  | (path, Ok(data)) => {
      if !quiet.contents && command !== #help {
        Js.Console.error2("Using config from:", path)
      }
      data
    }
  | (path, Error(err)) =>
    err
    ->Errors.Loggable.prepend(`Failed to load config file "${path}"! Reason:\n\n`)
    ->exitWithLoggableError
  }

  let ctx = {Context.config: config, argv: argv}

  switch command {
  | #help => {
      ctx->TTY.info(header)
      ctx->TTY.infoNl
      ctx->TTY.info(help)
    }
  | #build => Commands.build(ctx)
  | #watch => Commands.watch(ctx)
  | #pipe => Commands.pipe(ctx)
  }
}
