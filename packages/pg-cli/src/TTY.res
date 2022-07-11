module Loggable = TypesafeSqlErrors.Loggable

// type stream

// @module("process")
// external stdout: stream = "stdout"

// @send external write: (stream, string) => unit = "write"

// let progress = promise =>
//   promise->Promise.chain(x => {
//     switch x {
//     | Ok(_) => stdout->write(".")
//     | Error(_) => ()
//     }
//     Promise.resolve(x)
//   })

@module("util") @val external inspect: ('a, option<{"colors": bool}>) => string = "inspect"

module Chalk = {
  @module("chalk") @scope("chalkStderr") @val external blue: string => string = "blue"
  @module("chalk") @scope("chalkStderr") @val external red: string => string = "redBright"
  @module("chalk") @scope("chalkStderr") @val external green: string => string = "green"
  @module("chalk") @scope("chalkStderr") @val external dim: string => string = "dim"

  type supportsColor = {level: [#0 | #1 | #2 | #3], hasBasic: bool, has256: bool, has16m: bool}
  @module("chalk") @scope("chalkStderr") @val
  external supportsColor: supportsColor = "supportsColor"
  let supportsColor = Obj.magic(supportsColor) === false ? None : Some(supportsColor)

  let inspect = obj => inspect(obj, Some({"colors": supportsColor !== None}))
  let inspectDontWrapString = obj => Js.typeof(obj) === "string" ? Obj.magic(obj) : inspect(obj)

  let blue = obj => obj->inspectDontWrapString->blue
  let red = obj => obj->inspectDontWrapString->red
  let green = obj => obj->inspectDontWrapString->green
  let dim = obj => obj->inspectDontWrapString->dim
}

// The "quiet" option is ignored for errors
// If someone wants to quiet everything, they can redirect output to /dev/null
let error = obj0 => Js.Console.error(Chalk.red(obj0))
let error2 = (obj0, obj1) => Js.Console.error2(Chalk.red(obj0), Chalk.red(obj1))
let error3 = (obj0, obj1, obj2) =>
  Js.Console.error3(Chalk.red(obj0), Chalk.red(obj1), Chalk.red(obj2))
let errorMany = arr => arr->Js.Array2.map(Chalk.red)->Js.Console.errorMany

let printLoggable = err => Loggable.toStrings(~nodeToString=node =>
    switch node {
    | Message(message) => message
    | Object(object) => Chalk.inspect(object)
    }
  , err)->Js.Array2.joinWith("")->error

// Info goes to stderr as recommended in https://clig.dev/#the-basics
// NOTE: Maybe we should do this only in the pipe mode?
let info = (ctx, val0) =>
  if !Context.quiet(ctx) {
    Js.Console.error(val0)
  }
let info2 = (ctx, val0, val1) =>
  if !Context.quiet(ctx) {
    Js.Console.error2(val0, val1)
  }
let info3 = (ctx, val0, val1, val2) =>
  if !Context.quiet(ctx) {
    Js.Console.error3(val0, val1, val2)
  }
let infoNl = ctx => ctx->info("")
