type unknown
type node = Text(string) | MessageOf(Native.t) | StackOf(Native.t) | Exn(exn) | Obj(unknown)

type cause = None | Exn(exn) | Native(Native.t)

type t = {
  cause: cause,
  // This format allows us to send objects directly to `console.log` without turning them into strings.
  // For Node.JS this means the best possible printing of arbitrary objects,
  // and in browsers the objects even become interactable!
  message: array<node>,
}

@val external anyToString: 'a => string = "String"
let stringifyAnySafe = val =>
  switch Js.Json.stringifyAny(val) {
  | Some(str) => str
  | None => anyToString(val)
  | exception _ => anyToString(val)
  }

let toString = message =>
  message
  ->Js.Array2.map(node =>
    switch node {
    | Text(str) => str
    | MessageOf(err) => err->Native.message
    | StackOf(err) => err->Native.stack
    | Exn(exn) => exn->stringifyAnySafe
    | Obj(obj) => obj->stringifyAnySafe
    }
  )
  ->Js.Array2.joinWith(" ")
