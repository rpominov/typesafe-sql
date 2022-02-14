type t<+'a> = Js.Promise.t<'a>

let resolve = Js.Promise.resolve
let reject = Js.Promise.reject
let race = Js.Promise.race
let make = Js.Promise.make

@send
external then: (
  Js.Promise.t<'a>,
  (. 'a) => Js.Promise.t<'b>,
  option<(. Js.Promise.error) => Js.Promise.t<'b>>,
) => Js.Promise.t<'b> = "then"

let catch = (promise, fn) =>
  promise->then(
    (. x) => x->Ok->Js.Promise.resolve,
    Some((. e) => e->Js.Exn.anyToExnInternal->fn->Error->Js.Promise.resolve),
  )

let chain = (promise, fn) => promise->then((. x) => x->fn, None)

let crash = exn => {
  Js.Console.error2("Unexpected error!\n", LogError.exnToLoggableVerbose(exn))
  Node.Process.exit(1)
}

let done = (promise, fn) => promise->then((. x) => {
    try {
      x->fn
      Js.Promise.resolve()
    } catch {
    | exn => crash(exn)
    }
  }, Some((. e) => e->Js.Exn.anyToExnInternal->crash))->ignore

let chainOk = (promise, fn) =>
  promise->chain(val =>
    switch val {
    | Ok(x) => fn(x)
    | Error(x) => resolve(Error(x))
    }
  )
