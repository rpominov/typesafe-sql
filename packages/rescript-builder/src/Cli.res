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

let getExn = (opt, loc) =>
  switch opt {
  | Some(x) => x
  | None => Js.Exn.raiseError(j`Unexpected None at: $loc`)
  }

type argv = {
  version: bool,
  debug: bool,
  watch: bool,
  help: bool,
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

let parseArgvExn = () => {
  let result =
    Node.Process.argv
    ->Js.Array2.sliceFrom(2)
    ->Minimist.parse(
      ~flags=["version", "debug", "watch", "help", "quiet"],
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
        "watch": "w",
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
    // Minimist does this by default for `-f true`, but not `-f=true`
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
    watch: getFlagExn("watch"),
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
  }
}

let argv = try {
  parseArgvExn()->Ok
} catch {
| UnknownArg(name) => Error(`Unknown argument: ${name}`)
| InvalidFlag(name, String(str)) => Error(`Invalid flag value: --${name} = ${str}`)
| InvalidFlag(name, Float(num)) =>
  Error(`Invalid flag value: --${name} = ${num->Js.Float.toString}`)
| InvalidFlag(name, _) => Error(`Invalid flag value: --${name}`)
}

argv->Js.log
