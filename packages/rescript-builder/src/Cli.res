type argv = {
  version: bool,
  debug: bool,
  help: bool, // NOTE: this doesn't do anything currently
  quiet: bool,
  generator: option<string>,
  output: option<string>,
  config: option<string>,
  host: option<string>,
  port: option<string>,
  username: option<string>,
  password: option<string>,
  dbname: option<string>,
  connection: option<string>,
  inputs: array<string>, // TODO: make this a named parameter
}

type source = {
  input: array<string>,
  output: option<(. string) => string>,
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

let showHelp = () => {
  // no short/log help, only short with a link to the docs...
  Js.log("TODO: show help")
}

let exitWithError = err => {
  Errors.Loggable.log(err)
  Js.log("")
  showHelp()
  Node.Process.exit(1)
}

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
| Some(cmd) => `Unknown command: ${cmd}`->Errors.Loggable.fromText->exitWithError
}

exception UnknownArg(string)
exception InvalidFlag(string, Minimist.val)
let argv = try {
  let result = unparsedArgv->Minimist.parse(
    ~flags=["version", "debug", "help", "quiet"],
    ~params=[
      "generator",
      "output",
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
        raise(UnknownArg(s))
      } else {
        true
      },
  )

  switch result->Minimist.getSeparated {
  | None | Some([]) => ()
  | _ => raise(UnknownArg("--"))
  }

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

  {
    version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    help: getFlagExn("help"),
    quiet: getFlagExn("quiet"),
    generator: getParam("generator"),
    output: getParam("output"),
    config: getParam("config"),
    host: getParam("host"),
    port: getParam("port"),
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection"),
    inputs: result->Minimist.getRest,
  }
} catch {
| UnknownArg(name) => `Unknown argument: ${name}`->Errors.Loggable.fromText->exitWithError
| InvalidFlag(name, String(str)) =>
  `Invalid flag value: --${name} = ${str}`->Errors.Loggable.fromText->exitWithError
| InvalidFlag(name, Float(num)) =>
  `Invalid flag value: --${name} = ${num->Js.Float.toString}`
  ->Errors.Loggable.fromText
  ->exitWithError
| InvalidFlag(name, _) => `Invalid flag value: --${name}`->Errors.Loggable.fromText->exitWithError
}

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
      debug: None,
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
        debug: obj->property("debug", nullable(bool)),
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
                      // TODO: this accepts "" as a vaild output
                      // Not sure where to catch, here, or in PathRebuild
                      switch PathRebuild.make(str) {
                      | Ok(fn) => (. x) => fn(x)
                      | Error(msg) =>
                        Errors.Loggable.fromText(
                          `Invalid "output" value. ${msg}`,
                        )->raiseValidationError
                      },
                    function,
                    fn => fn->Obj.magic,
                  ),
                ),
                (i, o) => {input: i, output: o},
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
    Js.log2("Using config from:", path)
    data
  }
| (path, Error(err)) =>
  exitWithError(err->Errors.Loggable.prepend(`Failed to load config file "${path}"! Reason:\n\n`))
}

switch command {
| #help if argv.version => Js.log("TODO: show version")
| #help => showHelp()
| #build => {
    Js.log2(config, argv)
    Js.log("TODO: build")
  }
| #watch => Js.log("TODO: watch")
| #pipe => Js.log("TODO: pipe")
}
