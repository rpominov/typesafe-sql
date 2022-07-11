// Js.Exn.t can point to an arbitrary object,
// not necessarily a Error (example: `throw null`).
// Native.t is always an instance of Error.

type t

@new external make: string => t = "Error"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message
@get external message: t => string = "message"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/name
@get external name: t => string = "name"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
@get external stack: t => string = "stack"

// https://nodejs.org/api/errors.html#errorcode
let code: t => option<string>

let fromJsExn: Js.Exn.t => option<t>
external toJsExn: t => Js.Exn.t = "%identity"

let fromExn: exn => option<t>
let toExn: t => exn

// by default ReScript rethrows as a ReScript exception even if the original error was a JS error
// (see example in tests)
let rethrowAsNative: exn => 'a
