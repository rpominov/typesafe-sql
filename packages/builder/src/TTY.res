type stream

@module("process")
external stdout: stream = "stdout"

@send external write: (stream, string) => unit = "write"

let progress = promise =>
  promise->Promise.chain(x => {
    switch x {
    | Ok(_) => stdout->write(".")
    | Error(_) => ()
    }
    Promise.resolve(x)
  })
