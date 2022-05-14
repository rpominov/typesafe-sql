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

// Ok for now, but would be good to have Invalid_argument(123) instead of Invalid_argument({"_1": 123})
let stringifyExn: exn => string = %raw(`(err) =>
  JSON.stringify(
    err,
    (k, v) => {
      if (k === "") {
        return v;
      }
      if (k === "RE_EXN_ID" || k === "Error") {
        return undefined;
      }
      try {
        return JSON.stringify(v);
      } catch (e) {
        return String(v);
      }
    },
    2
  )`)

@set external setMessage: (Js.Exn.t, string) => unit = "message"
@set external setName: (Js.Exn.t, string) => unit = "name"
@set external setReScriptExn: (Js.Exn.t, exn) => unit = "reScriptExn"
@val external anyToString: 'a => string = "String"

let toJsError = exn =>
  switch classifyExn(exn) {
  | #ValidJsError(_) as err => err
  | #InvalidJsError(obj) => #ValidJsError(obj->anyToString->makeJsError) // should be extremly rare case
  | #ReScriptExn(exn) => {
      let err = switch exn->unsafeGetError->classifyErr {
      | #ValidJsError(err) => err
      | #InvalidJsError(_) => makeJsError("") // can happen when exn is created but not raise()'d
      }
      let content = stringifyExn(exn)
      err->setMessage(unsafeGetExnId(exn) ++ (content === "{}" ? "" : `(${content})`))
      err->setName("ReScript_Error")
      err->setReScriptExn(exn)
      #ValidJsError(err)
    }
  }
