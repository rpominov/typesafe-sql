@ocaml.doc("Example usage: `Js.Console.error(loggable)`")
type loggable

external toLoggable: 'a => loggable = "%identity"

let isError: Js.Exn.t => bool = %raw(`(x) => x instanceof Error`)

let jsExnToLoggable = e =>
  isError(e)
    ? switch e->Js.Exn.message {
      | Some("") | None => e->Js.Exn.stack->toLoggable
      | Some(m) => toLoggable(m)
      }
    : toLoggable(e)

external jsExnToLoggableVerbose: Js.Exn.t => loggable = "%identity"

let exnToLoggable = e => {
  switch e {
  | Js.Exn.Error(je) => jsExnToLoggable(je)
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

let wrap = (e, fn) => {
  originalExn: e,
  msg: fn(e),
}

let wrapNodeCbError = e => {
  originalExn: Js.Exn.anyToExnInternal(e),
  msg: [jsExnToLoggable(e)],
}

@ocaml.doc("Wrap a error thrown by a function that was provided by a user of the library")
let wrapThrownByUserProvidedFn = e => {
  originalExn: e,
  msg: [exnToLoggableVerbose(e)],
}

exception Placeholder
let wrapString = (str: string) => {
  originalExn: Placeholder,
  msg: [toLoggable(str)],
}
