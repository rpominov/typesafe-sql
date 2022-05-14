type errorConstructor
@val external mainErrorConstructor: errorConstructor = "Error"

let isInstanceOf: (Js.Exn.t, errorConstructor) => bool = %raw(`(x, C) => x instanceof C`)

let classifyErr = err =>
  err->isInstanceOf(mainErrorConstructor) ? #ValidJsError(err) : #InvalidJsError(err)

let classifyExn = exn =>
  switch exn {
  | Js.Exn.Error(e) => classifyErr(e)
  | _ => #ReScriptExn(exn)
  }

@new external makeJsError: string => Js.Exn.t = "Error"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message
@get external message: Js.Exn.t => string = "message"
let message = (#ValidJsError(err)) => err->message

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name
@get external name: Js.Exn.t => string = "name"
let name = (#ValidJsError(err)) => err->name

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
@get external stack: Js.Exn.t => string = "stack"
let stack = (#ValidJsError(err)) => err->stack

// https://nodejs.org/api/errors.html#errorcode
@get external code: Js.Exn.t => option<string> = "code"
let code = (#ValidJsError(err)) =>
  switch err->code {
  | None => None
  | Some(x) as opt => Js.typeof(x) === "string" ? opt : None
  }

// This is unsafe because we rely on ReScript internal implementation.
// Although, it's somewhat documented here:
// https://rescript-lang.org/docs/manual/latest/exception#catch-rescript-exceptions-from-js
@get external unsafeGetError: exn => Js.Exn.t = "Error"
@get external unsafeGetExnId: exn => string = "RE_EXN_ID"

@val external anyToString: 'a => string = "String"

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

@set external setMessage: (Js.Exn.t, string) => unit = "message"
@set external setName: (Js.Exn.t, string) => unit = "name"
@set external setReScriptExn: (Js.Exn.t, exn) => unit = "reScriptExn"

let toJsError = exn =>
  switch classifyExn(exn) {
  | #ValidJsError(_) as err => err
  | #InvalidJsError(obj) => #ValidJsError(obj->anyToString->makeJsError) // should be extremly rare case
  | #ReScriptExn(exn) => {
      let err = switch exn->unsafeGetError->classifyErr {
      | #ValidJsError(err) => err
      | #InvalidJsError(_) => makeJsError("") // can happen when exn is created but not raise()'d
      }
      err->setMessage(unsafeGetExnId(exn) ++ stringifyExnContent(exn))
      err->setName("ReScript_Error")
      err->setReScriptExn(exn)
      #ValidJsError(err)
    }
  }
