type unknown
external toUnknown: 'a => unknown = "%identity"

type node = Text(string) | MessageOf(Native.t) | StackOf(Native.t) | Obj(unknown)

type cause = None | Exn(exn) | Native(Native.t)

type t = {
  cause: cause,
  // This format allows us to send objects directly to `console.log` without turning them into strings.
  // For Node.JS this means the best possible printing of arbitrary objects,
  // and in browsers the objects even become interactable!
  message: array<node>,
}

let cause = ({cause}) => cause

let fromText = message => {cause: None, message: [Text(message)]}

let fromExn = exn => {
  switch exn->Native.fromExn {
  | Some(err) => {cause: Native(err), message: [MessageOf(err)]}
  | None => {cause: Exn(exn), message: [Obj(exn->toUnknown)]}
  }
}

let fromExnVerbose = exn => {
  switch exn->Native.fromExn {
  | Some(err) => {cause: Native(err), message: [StackOf(err)]}
  | None => {cause: Exn(exn), message: [Obj(exn->toUnknown)]}
  }
}

let annotate = ({cause, message}, annotation) => {
  cause: cause,
  message: Js.Array2.concat([Text(annotation)], message),
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
    | Text(str) => str->toUnknown
    | MessageOf(err) =>
      switch err->Native.message {
      | "" => err->toUnknown
      | x => x->toUnknown
      }
    | StackOf(err) => err->toUnknown
    | Obj(obj) => obj->toUnknown
    }
  )
}

let log = (~logger=Js.Console.error, loggable) => {
  let compiled = loggable->compile
  for i in 0 to compiled->Js.Array2.length - 1 {
    logger(compiled[i])
  }
}

let logWhole = (~logger=Js.Console.errorMany, loggable) => logger(loggable->compile)
