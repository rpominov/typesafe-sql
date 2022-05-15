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

@val external anyToString: 'a => string = "String"

external unsafeFromJsExn: Js.Exn.t => t = "%identity"
let fromJsExn = exn => isInstanceOfError(exn) ? Some(unsafeFromJsExn(exn)) : None
let forceJsExn = exn => isInstanceOfError(exn) ? unsafeFromJsExn(exn) : make(anyToString(exn))

let fromExn = exn =>
  switch exn {
  | Js.Exn.Error(err) => fromJsExn(err)
  | _ => None
  }

// This is unsafe because we rely on ReScript internal implementation.
// Although, it's somewhat documented here:
// https://rescript-lang.org/docs/manual/latest/exception#catch-rescript-exceptions-from-js
@get external unsafeGetError: exn => Js.Exn.t = "Error"
@get external unsafeGetExnId: exn => string = "RE_EXN_ID"
let stringifyAnySafe = val =>
  switch Js.Json.stringifyAny(val) {
  | Some(str) => str
  | None => anyToString(val)
  | exception _ => anyToString(val)
  }
let stringifyExnContent = (exn: exn) => {
  let entries =
    exn
    ->Obj.magic
    ->Js.Dict.entries
    ->Js.Array2.filter(((key, _)) => key !== "RE_EXN_ID" && key !== "Error")
  entries->Js.Array2.length === 0
    ? ""
    : `(${entries
        ->Js.Array2.map(((key, value)) => `${key}: ${stringifyAnySafe(value)}`)
        ->Js.Array2.joinWith(" ")})`
}
@set external setMessage: (t, string) => unit = "message"
@set external setName: (t, string) => unit = "name"
@set external setReScriptExn: (t, exn) => unit = "reScriptExn"
let forceExn = exn =>
  switch exn {
  | Js.Exn.Error(err) => forceJsExn(err)
  | _ => {
      let err = exn->unsafeGetError->forceJsExn
      err->setMessage(unsafeGetExnId(exn) ++ stringifyExnContent(exn))
      err->setName("ReScript_Error")
      err->setReScriptExn(exn)
      err
    }
  }
