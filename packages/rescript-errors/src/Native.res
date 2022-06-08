type t

let isInstanceOfError: Js.Exn.t => bool = %raw(`(x) => x instanceof Error`)

@new external make: string => t = "Error"

@get external message: t => string = "message"

@get external name: t => string = "name"

@get external stack: t => string = "stack"

@get external code: t => option<string> = "code"
let code = err =>
  switch err->code {
  | None => None
  | Some(x) as opt => Js.typeof(x) === "string" ? opt : None
  }

external unsafeFromJsExn: Js.Exn.t => t = "%identity"
let fromJsExn = exn => isInstanceOfError(exn) ? Some(unsafeFromJsExn(exn)) : None

let fromExn = exn =>
  switch exn {
  | Js.Exn.Error(err) => fromJsExn(err)
  | _ => None
  }

// Aliasing it here so that we won't have to fix in many places if anyToExnInternal will change
let toExn = Js.Exn.anyToExnInternal

external toJsExn: t => Js.Exn.t = "%identity"

let rethrowAsNative = exn => {
  switch exn {
  | Js.Exn.Error(err) => raise(err->Obj.magic)
  | _ => raise(exn)
  }
}
