type t

type cause = None | Exn(exn) | Native(Errors.Native.t)
let cause: t => cause

let fromText: string => t
let fromExn: exn => t
let fromExnVerbose: exn => t

let annotate: (t, string) => t

let toString: t => string

type unknown

let compile: t => array<unknown>

let log: (~logger: unknown => unit=?, t) => unit

let logWhole: (~logger: array<unknown> => unit=?, t) => unit
