@val external describe: (string, @uncurry (unit => unit)) => unit = "describe"
@val external test: (string, @uncurry (unit => unit)) => unit = "test"
@val external testAsync: (string, @uncurry (unit => Js.Promise.t<unit>)) => unit = "test"
@val external testAsyncCb: (string, @uncurry (((. unit) => unit) => unit)) => unit = "test"

type e<'a>
@val external expect: 'a => e<'a> = "expect"
@send external not_: e<'a> => e<'a> = "not"
@send external toBe: (e<'a>, 'a) => unit = "toBe"
@send external toEqual: (e<'a>, 'a) => unit = "toEqual"
@send external toMatchSnapshot: e<'a> => unit = "toMatchSnapshot"
@send external toContain: (e<array<'a>>, 'a) => unit = "toContain"
@send external toContainEqual: (e<array<'a>>, 'a) => unit = "toContainEqual"

@val external each: (array<'a>, . string, 'a => unit) => unit = "test.each"
let each = (data, title, f) => each(data)(. title, f)
@val external each2: (array<('a, 'b)>, . string, ('a, 'b) => unit) => unit = "test.each"
let each2 = (data, title, f) => each2(data)(. title, f)
@val external each3: (array<('a, 'b, 'c)>, . string, ('a, 'b, 'c) => unit) => unit = "test.each"
let each3 = (data, title, f) => each3(data)(. title, f)

@val external eachAsync: (array<'a>, . string, 'a => Js.Promise.t<unit>) => unit = "test.each"
let eachAsync = (data, title, f) => eachAsync(data)(. title, f)
@val
external each2Async: (array<('a, 'b)>, . string, ('a, 'b) => Js.Promise.t<unit>) => unit =
  "test.each"
let each2Async = (data, title, f) => each2Async(data)(. title, f)
@val
external each3Async: (array<('a, 'b, 'c)>, . string, ('a, 'b, 'c) => Js.Promise.t<unit>) => unit =
  "test.each"
let each3Async = (data, title, f) => each3Async(data)(. title, f)

@scope("expect") @val external expectAssertions: int => unit = "assertions"

@val external beforeEach: (@uncurry (unit => unit)) => unit = "beforeEach"
@val external beforeEachAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "beforeEach"
@val external afterEach: (@uncurry (unit => unit)) => unit = "afterEach"
@val external afterEachAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "afterEach"

@val external beforeAll: (@uncurry (unit => unit)) => unit = "beforeAll"
@val external beforeAllAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "beforeAll"
@val external afterAll: (@uncurry (unit => unit)) => unit = "afterAll"
@val external afterAllAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "afterAll"

@scope("expect") @val
external addSnapshotSerializer: {"test": 'a => bool, "print": 'a => string} => unit =
  "addSnapshotSerializer"

let makeSnapshotMatcher = (print: 'a => string): ('a => unit) => {
  let id = Js.Math.random()
  addSnapshotSerializer({
    "test": x => !Js.isNullable(x->Obj.magic) && x["id"] === id,
    "print": obj => print(obj["val"]),
  })
  x => {"id": id, "val": x}->expect->toMatchSnapshot
}

// These are better than Belt.Option.getExn etc.,
// because they throw Js.Exn,
// which lets Jest print the stack correctly.
// Also, the loc option helps to futher pin down the source of the error.

let getExn = (opt, loc) =>
  switch opt {
  | Some(x) => x
  | None => Js.Exn.raiseError(j`Unexpected None at: $loc`)
  }

let getOkExn = (res, loc) =>
  switch res {
  | Ok(x) => x
  | Error(e) => {
      Js.Console.error3("Unexpected Error(", e, ")")
      Js.Exn.raiseError(j`Unexpected Error(_) at: $loc`)
    }
  }

let getErrorExn = (res, loc) =>
  switch res {
  | Ok(x) => {
      Js.Console.error3("Unexpected Ok(", x, ")")
      Js.Exn.raiseError(j`Unexpected Ok(_) at: $loc`)
    }
  | Error(e) => e
  }

let arrGetExn = (arr, i, loc) =>
  if i >= 0 && i < arr->Js.Array.length {
    arr->Js.Array2.unsafe_get(i)
  } else {
    Js.Exn.raiseError(j`Invalid array index $i at: $loc`)
  }
