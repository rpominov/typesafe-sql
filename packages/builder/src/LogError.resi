module Loggable: {
  type t
  let make: 'a => t
  let fromJsExn: Js.Exn.t => t
  let fromJsExnVerbose: Js.Exn.t => t
  let fromExn: exn => t
  let fromExnVerbose: exn => t
}

type t = {originalExn: exn, msg: array<Loggable.t>}
let wrap: (exn, exn => array<Loggable.t>) => t
let wrapNodeCbError: Js.Exn.t => t
let wrapExn: (~extra: string=?, exn) => t
let wrapExnVerbose: exn => t
let wrapString: string => t
