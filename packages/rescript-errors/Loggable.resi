type t

type cause = None | Exn(exn) | Native(Native.t)
let cause: t => cause

let fromText: string => t
let fromExn: exn => t
let fromExnVerbose: exn => t

let annotate: (t, string) => t

let toString: t => string

type unknown

let compile: t => array<unknown>

let log: (~logger: array<unknown> => unit=?, t) => unit

let logSeparately: (~logger: unknown => unit=?, t) => unit
