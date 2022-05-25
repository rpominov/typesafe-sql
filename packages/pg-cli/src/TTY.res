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
