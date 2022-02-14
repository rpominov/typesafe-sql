@ocaml.doc("Example usage: `Js.Console.error(loggable)`")
type loggable

external toLoggable: 'a => loggable = "%identity"

let isError: Js.Exn.t => bool = %raw(`(x) => x instanceof Error`)

let message = e =>
  isError(e)
    ? switch e->Js.Exn.message {
      | Some("") | None => e->Js.Exn.stack->toLoggable
      | Some(m) => toLoggable(m)
      }
    : toLoggable(e)

let stack = e => isError(e) ? e->Js.Exn.stack->toLoggable : toLoggable(e)

let exnToLoggable = e => {
  switch e {
  | Js.Exn.Error(je) => message(je)
  | _ => toLoggable(e)
  }
}

let exnToLoggableVerbose = e => {
  switch e {
  | Js.Exn.Error(je) => toLoggable(je)
  | _ => toLoggable(e)
  }
}

@ocaml.doc("Example usage: `Js.Console.errorMany(err.msg)`")
type t = {
  originalExn: exn,
  msg: array<loggable>,
}

let make = (e, fn) => {
  originalExn: e,
  msg: fn(e),
}

let fromNodeCbError = e => {
  originalExn: Js.Exn.anyToExnInternal(e),
  msg: [message(e)],
}

let fromThrownByUserProvidedFn = e => {
  originalExn: e,
  msg: [exnToLoggableVerbose(e)],
}

exception Placeholder
let fromString = (str: string) => {
  originalExn: Placeholder,
  msg: [toLoggable(str)],
}
