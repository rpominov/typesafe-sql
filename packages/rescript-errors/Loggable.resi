type t
type unknown

type cause = None | Exn(exn) | Native(Native.t) | Unknown(unknown)
let cause: t => cause

let fromText: string => t
let fromUnknown: 'a => t

let fromNative: Native.t => t
let fromNativeVerbose: Native.t => t

let fromJsExn: Js.Exn.t => t
let fromJsExnVerbose: Js.Exn.t => t

let fromExn: exn => t
let fromExnVerbose: exn => t

let prepend: (t, string) => t
let append: (t, string) => t

let prependUnknown: (t, 'a) => t
let appendUnknown: (t, 'a) => t

let toString: t => string

let compile: t => array<unknown>

let log: (~logger: array<unknown> => unit=?, t) => unit

module Result: {
  type t<'a> = result<'a, t>

  let prepend: (t<'a>, string) => t<'a>
  let append: (t<'a>, string) => t<'a>
}
