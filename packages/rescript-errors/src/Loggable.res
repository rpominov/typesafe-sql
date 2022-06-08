type unknown
external toUnknown: 'a => unknown = "%identity"

type cause = None | Exn(exn) | Native(Native.t) | Unknown(unknown)

type internalNode =
  | MessageLiteral(string)
  | MessageOf(Native.t)
  | StackOf(Native.t)
  | UnknownExn(exn)
  | Unknown(unknown)

type node = Message(string) | Object(unknown)

type t = {
  cause: cause,
  message: array<internalNode>,
}

let cause = ({cause}) => cause

let fromText = message => {cause: None, message: [MessageLiteral(message)]}
let fromUnknown = obj => {cause: None, message: [Unknown(obj->toUnknown)]}

let fromNative = err => {cause: Native(err), message: [MessageOf(err)]}
let fromNativeVerbose = err => {cause: Native(err), message: [StackOf(err)]}

let fromJsExn = jsExn => {
  switch jsExn->Native.fromJsExn {
  | Some(err) => fromNative(err)
  | None => {cause: Unknown(jsExn->toUnknown), message: [Unknown(jsExn->toUnknown)]}
  }
}

let fromJsExnVerbose = jsExn => {
  switch jsExn->Native.fromJsExn {
  | Some(err) => fromNativeVerbose(err)
  | None => {cause: Unknown(jsExn->toUnknown), message: [Unknown(jsExn->toUnknown)]}
  }
}

let fromExn = exn => {
  switch exn {
  | Js.Exn.Error(jsExn) => fromJsExn(jsExn)
  | _ => {cause: Exn(exn), message: [UnknownExn(exn)]}
  }
}

let fromExnVerbose = exn => {
  switch exn {
  | Js.Exn.Error(jsExn) => fromJsExnVerbose(jsExn)
  | _ => {cause: Exn(exn), message: [UnknownExn(exn)]}
  }
}

let prepend = ({cause, message}, text) => {
  cause: cause,
  message: Js.Array2.concat([MessageLiteral(text)], message),
}

let append = ({cause, message}, text) => {
  cause: cause,
  message: Js.Array2.concat(message, [MessageLiteral(text)]),
}

let prependUnknown = ({cause, message}, obj) => {
  cause: cause,
  message: Js.Array2.concat([Unknown(obj->toUnknown)], message),
}

let appendUnknown = ({cause, message}, obj) => {
  cause: cause,
  message: Js.Array2.concat(message, [Unknown(obj->toUnknown)]),
}

@module("util") @val external inspect: 'a => string = "inspect"

let compile = ({message}) => {
  message->Js.Array2.map(node =>
    switch node {
    | MessageLiteral(obj) => Message(obj)
    | MessageOf(err) =>
      switch err->Native.message {
      | "" => Object(err->toUnknown)
      | x => Message(x)
      }
    // TODO: add stack, do all built in exceptions
    // | UnknownExn(Invalid_argument(str)) => Object(`Invalid_argument(${str})`->toUnknown)
    | UnknownExn(obj) => Object(obj->toUnknown)
    | StackOf(obj) => Object(obj->toUnknown)
    | Unknown(obj) => Object(obj->toUnknown)
    }
  )
}

let toStrings = (
  ~nodeToString=node =>
    switch node {
    | Message(str) => str
    | Object(obj) => obj->inspect
    },
  ~separator=" ",
  error,
) => {
  let arr = error->compile->Js.Array2.map(nodeToString)

  let result = []

  for i in 0 to arr->Js.Array2.length - 1 {
    let item = arr->Js.Array2.unsafe_get(i)
    result->Js.Array2.push(item)->ignore

    if (
      i < arr->Js.Array2.length - 1 &&
      !Js.String2.endsWith(item, " ") &&
      !Js.String2.endsWith(item, "\n")
    ) {
      result->Js.Array2.push(separator)->ignore
    }
  }

  result
}

let toString = error => error->toStrings->Js.Array2.joinWith("")

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
