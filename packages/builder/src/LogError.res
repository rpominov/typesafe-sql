module Loggable = {
  @ocaml.doc("Example usage: `Js.Console.error(loggable)`")
  type t

  external make: 'a => t = "%identity"

  let __isError: Js.Exn.t => bool = %raw(`(x) => x instanceof Error`)

  let fromJsExn = e =>
    __isError(e)
      ? switch e->Js.Exn.message {
        | Some("") | None => e->Js.Exn.stack->make
        | Some(m) => make(m)
        }
      : make(e)

  external fromJsExnVerbose: Js.Exn.t => t = "%identity"

  let fromExn = e => {
    switch e {
    | Js.Exn.Error(je) => fromJsExn(je)
    | _ => make(e)
    }
  }

  let fromExnVerbose = e => {
    switch e {
    | Js.Exn.Error(je) => make(je)
    | _ => make(e)
    }
  }
}

@ocaml.doc("Example usage: `Js.Console.errorMany(err.msg)`")
type t = {
  originalExn: exn,
  msg: array<Loggable.t>,
}

let wrap = (e, fn) => {
  originalExn: e,
  msg: fn(e),
}

let wrapNodeCbError = e => {
  originalExn: Js.Exn.anyToExnInternal(e),
  msg: [Loggable.fromJsExn(e)],
}

@ocaml.doc("Wrap a error thrown by a function that was provided by a user of the library")
let wrapThrownByUserProvidedFn = e => {
  originalExn: e,
  msg: [Loggable.fromExnVerbose(e)],
}

exception Placeholder
let wrapString = (str: string) => {
  originalExn: Placeholder,
  msg: [Loggable.make(str)],
}
