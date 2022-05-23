type unknown
external toUnknown: 'a => unknown = "%identity"

type node = Text(string) | MessageOf(Native.t) | StackOf(Native.t) | Obj(unknown)

type cause = None | Exn(exn) | Native(Native.t) | Unknown(unknown)

type t = {
  cause: cause,
  // This format allows us to send objects directly to `console.log` without turning them into strings.
  // For Node.JS this means the best possible printing of arbitrary objects,
  // and in browsers the objects even become interactable!
  message: array<node>,
}

let cause = ({cause}) => cause

let fromText = message => {cause: None, message: [Text(message)]}
let fromUnknown = obj => {cause: None, message: [Obj(obj->toUnknown)]}

let fromNative = err => {cause: Native(err), message: [MessageOf(err)]}
let fromNativeVerbose = err => {cause: Native(err), message: [StackOf(err)]}

let fromJsExn = jsExn => {
  switch jsExn->Native.fromJsExn {
  | Some(err) => fromNative(err)
  | None => {cause: Unknown(jsExn->toUnknown), message: [Obj(jsExn->toUnknown)]}
  }
}

let fromJsExnVerbose = jsExn => {
  switch jsExn->Native.fromJsExn {
  | Some(err) => fromNativeVerbose(err)
  | None => {cause: Unknown(jsExn->toUnknown), message: [Obj(jsExn->toUnknown)]}
  }
}

let fromExn = exn => {
  switch exn {
  | Js.Exn.Error(jsExn) => fromJsExn(jsExn)
  | _ => {cause: Exn(exn), message: [Obj(exn->toUnknown)]}
  }
}

let fromExnVerbose = exn => {
  switch exn {
  | Js.Exn.Error(jsExn) => fromJsExnVerbose(jsExn)
  | _ => {cause: Exn(exn), message: [Obj(exn->toUnknown)]}
  }
}

let prepend = ({cause, message}, text) => {
  cause: cause,
  message: Js.Array2.concat([Text(text)], message),
}

let append = ({cause, message}, text) => {
  cause: cause,
  message: Js.Array2.concat(message, [Text(text)]),
}

let prependUnknown = ({cause, message}, obj) => {
  cause: cause,
  message: Js.Array2.concat([Obj(obj->toUnknown)], message),
}

let appendUnknown = ({cause, message}, obj) => {
  cause: cause,
  message: Js.Array2.concat(message, [Obj(obj->toUnknown)]),
}

@val external anyToString: 'a => string = "String"
let stringifyAnySafe = val =>
  switch Js.Json.stringifyAny(val) {
  | Some(str) => str
  | None => anyToString(val)
  | exception _ => anyToString(val)
  }

let toString = ({message}) =>
  message
  ->Js.Array2.map(node =>
    switch node {
    | Text(str) => str
    | MessageOf(err) =>
      switch err->Native.message {
      | "" => err->Native.stack
      | x => x
      }
    | StackOf(err) => err->Native.stack
    | Obj(obj) => obj->stringifyAnySafe
    }
  )
  ->Js.Array2.joinWith(" ")

let compile = ({message}) => {
  message->Js.Array2.map(node =>
    switch node {
    | Obj(obj) => obj->toUnknown
    | Text(obj) => obj->toUnknown
    | StackOf(obj) => obj->toUnknown
    | MessageOf(err) =>
      switch err->Native.message {
      | "" => err->toUnknown
      | x => x->toUnknown
      }
    }
  )
}

let log = (~logger=Js.Console.errorMany, loggable) => logger(loggable->compile)

module Result = {
  type t<'a> = result<'a, t>

  let prepend = (res, str) =>
    switch res {
    | Ok(_) as ok => ok
    | Error(err) => err->prepend(str)->Error
    }

  let append = (res, str) =>
    switch res {
    | Ok(_) as ok => ok
    | Error(err) => err->append(str)->Error
    }
}
