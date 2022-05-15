type t

@new external make: string => t = "Error"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message
@get external message: t => string = "message"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
@get external name: t => string = "name"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
@get external stack: t => string = "stack"

// https://nodejs.org/api/errors.html#errorcode
let code: t => option<string>

let fromExn: exn => option<t>
let forceExn: exn => t

let fromJsExn: Js.Exn.t => option<t>
let forceJsExn: Js.Exn.t => t
