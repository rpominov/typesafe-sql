type t

@new external make: string => t = "Error"

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/message
let message: t => string

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
let name: t => string

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack
let stack: t => string

// https://nodejs.org/api/errors.html#errorcode
let code: t => option<string>

let fromExn: exn => option<t>
let forceExn: exn => t

let fromJsExn: Js.Exn.t => option<t>
let forceJsExn: Js.Exn.t => t
