type result
type val = Unset | Bool(bool) | String(string) | Float(float)

@get_index
external get: (result, string) => 'a = ""
let get = (r, k) =>
  switch Js.Types.classify(get(r, k)) {
  | JSNull
  | JSUndefined =>
    Unset
  | JSFalse => Bool(false)
  | JSTrue => Bool(true)
  | JSNumber(float) => Float(float)
  | JSString(string) => String(string)
  | _ => assert false
  }

@get external getPositional: result => array<string> = "_"
@get external getSeparated: result => option<array<string>> = "--"

@module
external parse: (array<string>, {..}) => result = "minimist"
let parse = (
  ~parameters: array<string>=[],
  ~flags: option<array<string>>=?,
  ~aliases: option<{..}>=?,
  ~stopEarly: option<bool>=?,
  ~separate: option<bool>=?,
  ~onUnknown: option<(. string) => bool>=?,
  argv,
) =>
  argv->parse({
    // "_" added to make sure getPositional will not return numbers
    "string": Js.Array2.concat(["_"], parameters),
    "boolean": flags,
    "alias": aliases,
    "stopEarly": stopEarly,
    "--": separate,
    "unknown": onUnknown,
  })
