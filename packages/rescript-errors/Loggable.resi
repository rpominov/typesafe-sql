type t
type unknown

type cause = None | Exn(exn) | Native(Native.t) | Unknown(unknown)
let cause: t => cause

let fromText: string => t

let fromJsExn: Js.Exn.t => t
let fromJsExnVerbose: Js.Exn.t => t

let fromExn: exn => t
let fromExnVerbose: exn => t

let prepend: (t, string) => t
let append: (t, string) => t

let toString: t => string

let compile: t => array<unknown>

let log: (~logger: array<unknown> => unit=?, t) => unit
