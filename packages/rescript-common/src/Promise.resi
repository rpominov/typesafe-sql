type t<+'a> = Js.Promise.t<'a>

let resolve: 'a => t<'a>

let reject: exn => t<'a>

let race: array<t<'a>> => t<'a>

let all: array<t<'a>> => t<array<'a>>
let all2: ((t<'a>, t<'b>)) => t<('a, 'b)>
let all3: ((t<'a>, t<'b>, t<'c>)) => t<('a, 'b, 'c)>
let all4: ((t<'a>, t<'b>, t<'c>, t<'d>)) => t<('a, 'b, 'c, 'd)>
let all5: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>)) => t<('a, 'b, 'c, 'd, 'e)>
let all6: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>, t<'f>)) => t<('a, 'b, 'c, 'd, 'e, 'f)>

let make: (('a => unit) => unit) => t<'a>

let catch: (t<'a>, exn => 'b) => t<result<'a, 'b>>

let chain: (t<'a>, 'a => t<'b>) => t<'b>
let map: (t<'a>, 'a => 'b) => t<'b>

let done: (t<'a>, 'a => unit) => unit

let chainOk: (t<result<'a, 'b>>, 'a => t<result<'c, 'b>>) => t<result<'c, 'b>>
let mapOk: (t<result<'a, 'b>>, 'a => result<'c, 'b>) => t<result<'c, 'b>>

let mergeErrors: t<result<result<'a, 'b>, 'b>> => t<result<'a, 'b>>

let sequence: array<unit => t<'a>> => t<Js.Array2.t<'a>>
