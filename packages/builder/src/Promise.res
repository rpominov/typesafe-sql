@send
external then: (
  Js.Promise.t<'a>,
  (. 'a) => Js.Promise.t<'b>,
  option<(. Js.Promise.error) => Js.Promise.t<'b>>,
) => Js.Promise.t<'b> = "then"

let crash = exn => {
  switch Js.Exn.asJsExn(exn) {
  | Some(jsExn) => Js.Console.error2("Unexpected error!", jsExn)
  | None => Js.Console.error2("Unexpected error!", exn)
  }
  Node.Process.exit(1)
}

let chain = (promise, fn) =>
  promise->then((. x) => x->Ok->fn, Some((. e) => e->Js.Exn.anyToExnInternal->Error->fn))

let chainOk = (promise, fn) => promise->then((. x) => x->fn, None)

let done = (promise, fn) =>
  promise
  ->then(
    (. x) => {
      try {
        x->Ok->fn
        Js.Promise.resolve()
      } catch {
      | exn => crash(exn)
      }
    },
    Some(
      (. e) => {
        try {
          e->Js.Exn.anyToExnInternal->Error->fn
          Js.Promise.resolve()
        } catch {
        | exn => crash(exn)
        }
      },
    ),
  )
  ->ignore

let doneOk = (promise, fn) => promise->then((. x) => {
    try {
      x->fn
      Js.Promise.resolve()
    } catch {
    | exn => crash(exn)
    }
  }, Some((. e) => e->Js.Exn.anyToExnInternal->crash))->ignore
