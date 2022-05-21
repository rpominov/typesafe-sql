module Minimist = {
  type options

  @obj
  external options: (
    ~string: array<string>=?,
    ~boolean: array<string>=?,
    ~alias: {..}=?,
    ~stopEarly: bool=?,
    ~\"--": bool=?,
    ~unknown: (. string) => bool=?,
    unit,
  ) => options = ""

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

  @module
  external parse: (array<string>, options) => result = "minimist"
  let parse = (
    ~stringKeys=[],
    ~boolKeys=?,
    ~aliases=?,
    ~stopEarly=?,
    ~separate=?,
    ~onUnknown=?,
    argv,
  ) =>
    parse(
      argv,
      options(
        // "_" added to make sure getRest wil not return numbers
        ~string=Js.Array2.concat(["_"], stringKeys),
        ~boolean=?boolKeys,
        ~alias=?aliases,
        ~stopEarly?,
        ~\"--"=?separate,
        ~unknown=?onUnknown,
        (),
      ),
    )
}

Node.Process.argv
->Js.Array2.sliceFrom(2)
->Minimist.parse(~boolKeys=["version"], ~stringKeys=[], ~aliases={"version": "v"})
->Minimist.getBool("version")
->Js.log
