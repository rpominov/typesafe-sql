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

Example:

  $ typesafe-sql-pg build \\\\
    --connection "postgres://user:password@host:5432/database" \\\\
    --input "queries/*.sql" \\\\
    --output "{dir}/{name}.res" \\\\
    --generator rescript
       
Full documentation is available at 
https://github.com/rpominov/typesafe-sql/tree/master/packages/pg-cli#readme
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

exception InvalidFlag(string, Minimist.val)
exception UnknownParameter(string)
exception ParameterError(string, string)
let argv = try {
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
    | String("true") => true
    | String("false") => false
    // Even if defined as a boolean `-f=a` or `-f=5` will produce String(_) or Float(_)
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

  {
    Context.version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    quiet: getFlagExn("quiet"),
    generator: getParam("generator"),
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
| UnknownParameter(name) => `Unknown argument: ${name}`->exitWithError
| InvalidFlag(name, String(str)) =>
  `Invalid --${name} value. A boolen flag can have values true/false or no value, got: ${str}`->exitWithError
| InvalidFlag(name, Float(num)) =>
  `Invalid --${name} value. A boolen flag can have values true/false or no value, got: ${num->Js.Float.toString}`->exitWithError
| InvalidFlag(name, _) =>
  `Invalid --${name} value. A boolen flag can have values true/false or no value.`->exitWithError
| ParameterError(name, msg) => `Invalid --${name} value. ${msg}`->exitWithError
}

if argv.version {
  Js.log(version)
} else {
  let loadConfig = path => (
    path,
    try {
      switch Node.Fs.existsSync(path) {
      | true =>
        switch Fs.Stat.getType(path) {
        | #file =>
          switch path->Fs.extname {
          | ".js" | ".json" => path->Fs.makeAbsolute->Require.require->Some->Ok
          | _ => Errors.Loggable.fromText("Must be a .json or a .js file")->Error
          }
        | _ => Errors.Loggable.fromText("Not a file")->Error
        }
      | false => Ok(None)
      }
    } catch {
    | exn => exn->Errors.Loggable.fromExnVerbose->Error
    },
  )

  let config = switch switch switch argv.config {
  | Some(path) =>
    switch loadConfig(path) {
    | (path, Ok(None)) => (path, Errors.Loggable.fromText(`File doesn't exist`)->Error)
    | res => res
    }
  | None =>
    switch loadConfig("./typesafe-sql-pg.config.json") {
    | (_, Ok(None)) =>
      switch loadConfig("./typesafe-sql-pg.config.js") {
      | (_, Ok(None)) =>
        switch loadConfig("./package.json") {
        | (path, Ok(Some(obj))) => (
            path,
            Require.validate(() => {
              open Require.Validators
              obj->cast(object, "This")->property("typesafe-sql-pg", nullable(unknown))
            }),
          )
        | res => res
        }
      | res => res
      }
    | res => res
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

        {
          Context.debug: obj->property("debug", nullable(bool)),
          quiet: obj->property("quiet", nullable(bool)),
          generator: obj->property("generator", nullable(string)),
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
                  either(string, x => [x], arrayOf(string), xs => xs),
                  "output",
                  nullable(
                    either(
                      string,
                      str =>
                        switch str {
                        | "" =>
                          Errors.Loggable.fromText(`Invalid "output" value. It cannot be an empty string.`)->failed
                        | pattern =>
                          switch pattern->PathRebuild.make {
                          | Ok(fn) => fn
                          | Error(msg) =>
                            Errors.Loggable.fromText(`Invalid "output" value. ${msg}`)->failed
                          }
                        },
                      function,
                      fn => {
                        let result = str => (fn->Obj.magic)(. str)
                        result
                      },
                    ),
                  ),
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
  | (path, Error(_) as err) => (path, err)
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
