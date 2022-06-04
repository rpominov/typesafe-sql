open Jest

exception Custom({"test": int})

test("Invalid error", () => {
  let fn = %raw(`() => { throw 123 }`)
  try {
    fn()
  } catch {
  | exn => expect(Native.fromExn(exn))->toEqual(None)
  }
})

test("Valid error", () => {
  let fn = %raw(`() => { throw new Error("test") }`)
  try {
    fn()
  } catch {
  | exn => expect(Native.fromExn(exn))->toEqual(Some(Native.make("test")))
  }
})

test("fromJsExn", () => {
  expect(Native.make("test")->Obj.magic->Native.fromJsExn)->toEqual(Some(Native.make("test")))
})

test("name", () => {
  expect(Native.make("")->Native.name)->toBe("Error")
})

test("message", () => {
  expect(Native.make("test")->Native.message)->toBe("test")
})

test("code", () => {
  expect(Native.make("")->Native.code)->toBe(None)

  let fn = %raw(`() => { require('node:net').connect(-1) }`)

  try {
    fn()
  } catch {
  | Js.Exn.Error(err) =>
    // For some reason, in the Jest enviroment
    // the error that connect() throws ends up not being an instanceof Error.
    // So the below line does not work.
    // https://github.com/facebook/jest/issues/2549
    //
    // let err' = err->Native.fromJsExn->Belt.Option.getExn
    //
    // NOTE: maybe instanceof Error check is not a good idea in general
    // as something simillar can happen in other enviroments

    // To bypass the instanceof check, do an unsafe cast
    let err' = err->Obj.magic

    expect(err'->Native.code)->toBe(Some("ERR_SOCKET_BAD_PORT"))
  }
})

test("toExn + fromExn", () => {
  let err = Native.make("test")
  expect(err->Native.toExn->Native.fromExn->Belt.Option.getExn)->toBe(err)
})

test("rethrowAsNative", () => {
  let fn = %raw(`() => { throw new Error("test") }`)
  let nativeCatch = %raw(`(fn) => { try { fn(); return new Error("Did not throw") } catch(e) { return e } }`)

  // by default ReScript rethrows as a ReScript exception even if the original error was a JS error
  nativeCatch(() =>
    try {
      fn()
    } catch {
    | Not_found => assert false
    }
  )
  ->expect
  ->not_
  ->toEqual(Some(Native.make("test")))

  // rethrowAsNative fixes this
  nativeCatch(() =>
    try {
      fn()
    } catch {
    | Not_found => assert false
    | exn => Errors.Native.rethrowAsNative(exn)
    }
  )
  ->expect
  ->toEqual(Some(Native.make("test")))
})
