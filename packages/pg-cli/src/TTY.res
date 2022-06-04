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

// The "quiet" option is ignored for errors
// If someone wants to quiet everything, they can redirect output to /dev/null
// TODO: make it red?
let error = Js.Console.error
let error2 = Js.Console.error2
let error3 = Js.Console.error3
let errorMany = Js.Console.errorMany

// Info goes to stderr as recommended in https://clig.dev/#the-basics
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

// Not sure where to put this
let exitWithLoggableError = err => {
  error("ERROR!")
  Errors.Loggable.toString(err)->error
  Node.Process.exit(1)
}
let exitWithError = err => exitWithLoggableError(err->Errors.Loggable.fromText)
