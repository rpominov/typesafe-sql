module Fs = {
  module Stat = {
    type t

    @send external isFile: t => bool = "isFile"
    @send external isDirectory: t => bool = "isDirectory"
    @module("fs") @val external statSync: string => t = "statSync"

    let getType = filename =>
      switch filename->statSync {
      | obj if obj->isFile => #file
      | obj if obj->isDirectory => #directory
      | _ => #other
      }
  }

  @module("path") external isAbsolute: string => bool = "isAbsolute"
  @module("path") external joinPath: (string, string) => string = "join"
  @module("path") external extname: string => string = "extname"

  @module("process") external cwd: unit => string = "cwd"

  let makeAbsolute = path => path->isAbsolute ? path : joinPath(cwd(), path)

  // let resolve = (root, globs) => {
  //   let watcher = ref(None)

  //   let close = () =>
  //     switch watcher.contents {
  //     | None => Promise.resolve()
  //     | Some(watcher') => watcher'->Chokidar.close
  //     }

  //   let flatten = dict => {
  //     dict
  //     ->Js.Dict.entries
  //     ->Js.Array2.map(((dir, files)) => files->Js.Array2.map(file => joinPath(dir, file)))
  //     ->Belt.Array.concatMany
  //   }

  //   Promise.make(resolvePr => {
  //     let watcher' = Chokidar.watchMany(~options=Chokidar.options(~cwd=root, ()), globs)
  //     watcher :=
  //       watcher'
  //       ->Chokidar.on(#error((. err) => resolvePr(Errors.Loggable.fromJsExn(err)->Error)))
  //       ->Chokidar.on(#ready(() => resolvePr(watcher'->Chokidar.getWatched->flatten->Ok)))
  //       ->Some
  //   })
  //   ->Promise.catch(Errors.Loggable.fromExnVerbose)
  //   ->Promise.mapOk(x => x)
  //   ->Promise.chain(res0 =>
  //     close()
  //     ->Promise.catch(Errors.Loggable.fromExnVerbose)
  //     ->Promise.chain(res1 =>
  //       switch (res0, res1) {
  //       | (Error(e), _) | (_, Error(e)) => Error(e)
  //       | (Ok(a), _) => Ok(a)
  //       }->Promise.resolve
  //     )
  //   )
  // }

  // @module("fs") @val
  // external readFile: (
  //   string,
  //   [#utf8],
  //   @uncurry (Js.Nullable.t<Errors.Native.t>, option<string>) => unit,
  // ) => unit = "readFile"

  // let read = path =>
  //   Promise.make(resolve =>
  //     readFile(path, #utf8, (err, content) =>
  //       switch (err->Js.Nullable.toOption, content) {
  //       | (Some(e), _) => e->Errors.Loggable.fromNative->Error
  //       | (_, None) => Ok("")
  //       | (_, Some(content)) => Ok(content)
  //       }->resolve
  //     )
  //   )

  // @module("fs") @val
  // external writeFile: (
  //   string,
  //   string,
  //   [#utf8],
  //   @uncurry (Js.Nullable.t<Errors.Native.t> => unit),
  // ) => unit = "writeFile"

  // let write = (path, content) =>
  // Promise.make(resolve =>
  //   writeFile(path, content, #utf8, err =>
  //     switch err->Js.Nullable.toOption {
  //     | Some(e) => e->Errors.Loggable.fromNative->Error
  //     | None => Ok()
  //     }->resolve
  //   )
  // )

  // NOTE TO SELF: to keep an option to move away from chokidar,
  // in the initial api we should only take globs as an input (none of the options below)
  // like so: ["**/*.res", "!**/Map.res"]
  //
  // maybe expose usePolling as a boolean though for network FS case
}

module Require = {
  type unknown
  @val external require: string => unknown = "require"

  exception Validation_error(Errors.Loggable.t)
  let validate = (fn, obj) =>
    try {
      Ok(fn(obj))
    } catch {
    | Validation_error(err) => Error(err)
    }

  // Designed to be opened inside Require.validate()
  module Validators = {
    @get_index external getProperty: (Js.Types.obj_val, string) => unknown = ""

    // let annotateError = (fn, annotator) => {
    //   try {
    //     fn()
    //   } catch {
    //   | Validation_error(err) => err->annotator->Validation_error->raise
    //   }
    // }

    type validator<'a> = {name: string, cast: (. unknown) => option<'a>}

    let object = {
      name: "object",
      cast: (. val) =>
        switch val->Js.Types.classify {
        | JSObject(x) => Some(x)
        | _ => None
        },
    }

    let string = {
      name: "string",
      cast: (. val) =>
        switch val->Js.Types.classify {
        | JSString(x) => Some(x)
        | _ => None
        },
    }

    let bool = {
      name: "bool",
      cast: (. val) =>
        switch val->Js.Types.classify {
        | JSFalse => Some(false)
        | JSTrue => Some(true)
        | _ => None
        },
    }

    let function = {
      name: "function",
      cast: (. val) =>
        switch val->Js.Types.classify {
        | JSFunction(f) => Some(f)
        | _ => None
        },
    }

    let array: validator<array<unknown>> = {
      name: "array",
      cast: (. val) =>
        switch val->Js.Types.classify {
        | JSObject(arr) if Js.Array.isArray(arr) => Some(arr->Obj.magic)
        | _ => None
        },
    }

    let arrayOf = validator => {
      name: `array<${validator.name}>`,
      cast: (. val) =>
        switch array.cast(. val) {
        | None => None
        | Some(arr) => {
            let acc = []
            let rec loop = i => {
              if i < arr->Js.Array2.length {
                switch validator.cast(. arr->Js.Array2.unsafe_get(i)) {
                | None => None
                | Some(x) => {
                    acc->Js.Array2.push(x)->ignore
                    loop(i + 1)
                  }
                }
              } else {
                Some(acc)
              }
            }
            loop(0)
          }
        },
    }

    let objectOf2 = (key1, validator1, key2, validator2) => {
      name: `{${key1}:${validator1.name},${key2}:${validator2.name}}`,
      cast: (. val) =>
        switch object.cast(. val) {
        | None => None
        | Some(obj) =>
          switch validator1.cast(. obj->getProperty(key1)) {
          | None => None
          | Some(val1) =>
            switch validator2.cast(. obj->getProperty(key2)) {
            | Some(val2) => Some((val1, val2))
            | None => None
            }
          }
        },
    }

    let nullable = validator => {
      name: `nullable<${validator.name}>`,
      cast: (. val) => Js.isNullable(val->Obj.magic) ? Some(None) : validator.cast(. val)->Some,
    }

    type either<'a, 'b> = Left('a) | Right('b)
    let either = (validatorLeft, validatorRight) => {
      name: `${validatorLeft.name}|${validatorRight.name}`,
      cast: (. val) =>
        switch validatorLeft.cast(. val) {
        | Some(x) => Some(Left(x))
        | None =>
          switch validatorRight.cast(. val) {
          | Some(x) => Some(Right(x))
          | None => None
          }
        },
    }

    let cast = (val, validator, name) => {
      switch validator.cast(. val) {
      | Some(x) => x
      | None =>
        Errors.Loggable.fromUnknown(val)
        ->Errors.Loggable.prepend(`${name} is not of type ${validator.name}:`)
        ->Validation_error
        ->raise
      }
    }

    let property = (obj, key, validator) =>
      obj->getProperty(key)->cast(validator, `Property "${key}"`)
  }
}

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

type output = Pattern(string) | Function(string => string)
type source = {input: array<string>, output: option<output>}

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
  sources: array<source>,
}

let loadConfig = argv => {
  let load = path =>
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
    | exn =>
      exn->Errors.Loggable.fromExnVerbose->Errors.Loggable.append(`\n\nIn file: ${path}`)->Error
    }

  let validate = Require.validate(obj => {
    open Require.Validators

    let obj = obj->cast(object, "This")

    let source = objectOf2(
      "input",
      either(string, arrayOf(string)),
      "output",
      nullable(either(string, function)),
    )

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
      sources: obj
      ->property("sources", arrayOf(source))
      ->Js.Array2.map(((input, output)) => {
        input: switch input {
        | Left(x) => [x]
        | Right(xs) => xs
        },
        output: switch output {
        | Some(Left(str)) => Some(Pattern(str))
        | Some(Right(fn)) => Some(Function(fn->Obj.magic))
        | None => None
        },
      }),
    }
  })

  let unvalidated = switch argv.config {
  | Some(path) =>
    switch load(path) {
    | Error(err) => err->Error
    | Ok(None) => Errors.Loggable.fromText(`File ${path} doesn't exist`)->Error
    | Ok(Some(_)) as res => res
    }
  | None =>
    switch load("./tsafe-sql-pg.config.json") {
    | (Error(_) | Ok(Some(_))) as res => res
    | Ok(None) =>
      switch load("./tsafe-sql-pg.config.js") {
      | (Error(_) | Ok(Some(_))) as res => res
      | Ok(None) => load("./package.json") // TODO: special case parse
      }
    }
  }

  switch unvalidated {
  | Error(_) as err => err
  | Ok(None) => Ok(None)
  | Ok(Some(val)) =>
    switch val->validate {
    | Ok(config) => Ok(Some(config))
    | Error(err) => err->Error
    }
  }
}

let build = argv => {
  // Js.log("TODO: build")

  // tmp
  switch argv->loadConfig {
  | Error(err) =>
    err->Errors.Loggable.prepend("Couldn't load config! Reason:\n\n")->Errors.Loggable.log
  | Ok(x) => Js.log(x)
  }
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
