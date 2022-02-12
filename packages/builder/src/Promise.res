@send
external then: (
  Js.Promise.t<'a>,
  'a => Js.Promise.t<'b>,
  Js.Promise.error => Js.Promise.t<'b>,
) => Js.Promise.t<'b> = "then"

let crash = exn => {
  switch Js.Exn.asJsExn(exn) {
  | Some(jsExn) => Js.Console.error(jsExn)
  | None => Js.Console.error(exn)
  }
  Node.Process.exit(1)
}

let chain = (promise, fn) =>
  promise->then(x => x->Ok->fn, e => e->Js.Exn.anyToExnInternal->Error->fn)

let done = (promise, fn) =>
  promise
  ->then(
    x => {
      try {
        x->Ok->fn
        Js.Promise.resolve()
      } catch {
      | exn => crash(exn)
      }
    },
    e => {
      try {
        e->Js.Exn.anyToExnInternal->Error->fn
        Js.Promise.resolve()
      } catch {
      | exn => crash(exn)
      }
    },
  )
  ->ignore

let test = x => Obj.dup(x)
