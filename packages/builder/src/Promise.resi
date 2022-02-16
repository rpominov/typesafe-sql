type t<+'a> = Js.Promise.t<'a>

let resolve: 'a => t<'a>

let reject: exn => t<'a>

let race: array<t<'a>> => t<'a>

let make: (@uncurry (((. 'a) => unit) => unit)) => t<'a>

let catch: (t<'a>, exn => 'b) => t<result<'a, 'b>>

let chain: (t<'a>, 'a => t<'b>) => t<'b>

let done: (t<'a>, 'a => unit) => unit

let chainOk: (t<result<'a, 'b>>, 'a => t<result<'c, 'b>>) => t<result<'c, 'b>>
