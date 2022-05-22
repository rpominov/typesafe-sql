module Minimist = {
  type result
  type val = Unset | Bool(bool) | String(string) | Float(float)

  @get_index
  external get: (result, string) => 'a = ""
  let get = (r, k) =>
    switch Js.Types.classify(get(r, k)) {
    | JSNull
    | JSUndefined =>
      Unset
    | JSFalse => Bool(false)
    | JSTrue => Bool(true)
    | JSNumber(float) => Float(float)
    | JSString(string) => String(string)
    | _ => assert false
    }

  @get external getRest: result => array<string> = "_"
  @get external getSeparated: result => option<array<string>> = "--"

  @module
  external parse: (array<string>, {..}) => result = "minimist"
  let parse = (
    ~params: array<string>=[],
    ~flags: option<array<string>>=?,
    ~aliases: option<{..}>=?,
    ~stopEarly: option<bool>=?,
    ~separate: option<bool>=?,
    ~onUnknown: option<(. string) => bool>=?,
    argv,
  ) =>
    argv->parse({
      // "_" added to make sure getRest will not return numbers
      "string": Js.Array2.concat(["_"], params),
      "boolean": flags,
      "alias": aliases,
      "stopEarly": stopEarly,
      "--": separate,
      "unknown": onUnknown,
    })
}

// let getExn = (opt, loc) =>
//   switch opt {
//   | Some(x) => x
//   | None => Js.Exn.raiseError(j`Unexpected None at: $loc`)
//   }

let (command, unparsedArgv) = switch Node.Process.argv->Belt.Array.get(2) {
| None => (None, [])
| Some(x) if x->Js.String2.startsWith("-") => (None, Node.Process.argv->Js.Array2.sliceFrom(2))
| opt => (opt, Node.Process.argv->Js.Array2.sliceFrom(3))
}

type argv = {
  version: bool,
  debug: bool,
  help: bool, // NOTE: this doesn't do anything currently
  quiet: bool,
  generator: option<string>,
  out: option<string>,
  config: option<string>,
  host: option<string>,
  port: option<string>,
  username: option<string>,
  password: option<string>,
  dbname: option<string>,
  connection: option<string>,
  inputs: array<string>,
}

exception UnknownArg(string)
exception InvalidFlag(string, Minimist.val)
let parsedArgv = try {
  let result = unparsedArgv->Minimist.parse(
    ~flags=["version", "debug", "help", "quiet"],
    ~params=[
      "generator",
      "out",
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
      "out": "o",
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
    out: getParam("out"),
    config: getParam("config"),
    host: getParam("host"),
    port: getParam("port"),
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection"),
    inputs: result->Minimist.getRest,
  }->Ok
} catch {
| UnknownArg(name) => Error(`Unknown argument: ${name}`)
| InvalidFlag(name, String(str)) => Error(`Invalid flag value: --${name} = ${str}`)
| InvalidFlag(name, Float(num)) =>
  Error(`Invalid flag value: --${name} = ${num->Js.Float.toString}`)
| InvalidFlag(name, _) => Error(`Invalid flag value: --${name}`)
}

let showHelp = () => {
  // no short/log help, only short with a link to the docs...
  Js.log("TODO: show help")
}

let exitWithError = err => {
  Js.log(`Error! ${err}\n`)
  showHelp()
  Node.Process.exit(1)
}

let showVersion = () => {
  Js.log("TODO: show version")
}

let build = (_: argv) => {
  Js.log("TODO: build")
}

let watch = (_: argv) => {
  Js.log("TODO: watch")
}

let pipe = (_: argv) => {
  Js.log("TODO: pipe mode")
}

switch (command, parsedArgv) {
| (None, Ok({version: true})) => showVersion()
| (None, Ok(_)) => showHelp()
| (Some("build"), Ok(args)) => build(args)
| (Some("watch"), Ok(args)) => watch(args)
| (Some("pipe"), Ok(args)) => pipe(args)
| (None | Some("build" | "watch" | "pipe"), Error(err)) => exitWithError(err)
| (Some(cmd), _) => exitWithError(`Unknown command: ${cmd}`)
}
