module Minimist = {
  type result

  @get_index
  external getBool: (result, string) => bool = ""
  let getBool = (r, k) => {
    let val = getBool(r, k)
    Js.typeof(val) === "boolean" ? Some(val) : None
  }

  @get_index
  external getString: (result, string) => string = ""
  let getString = (r, k) => {
    let val = getString(r, k)
    Js.typeof(val) === "string" ? Some(val) : None
  }

  @get external getRest: result => array<string> = "_"
  @get external getSeparated: result => option<array<string>> = "--"

  @module
  external parse: (array<string>, {..}) => result = "minimist"
  let parse = (
    ~params: array<string>=[],
    ~flags: option<array<string>>=?,
    ~aliases: option<{..}>=?,
    ~stopEarly: option<bool>=?,
    ~separate: option<bool>=?,
    ~onUnknown: option<(. string) => bool>=?,
    argv,
  ) =>
    argv->parse({
      "string": Js.Array2.concat(["_"], params),
      "boolean": flags,
      "alias": aliases,
      "stopEarly": stopEarly,
      "--": separate,
      "unknown": onUnknown,
    })
}

Node.Process.argv
->Js.Array2.sliceFrom(2)
->Minimist.parse(~flags=["version"], ~params=[], ~aliases={"version": "v"})
->Minimist.getBool("version")
->Js.log
