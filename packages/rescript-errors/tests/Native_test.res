open Jest

exception Custom({"test": int})

test("assert->forceExn", () => {
  try {
    assert false
  } catch {
  | exn => expect(exn->Native.forceExn)->toMatchSnapshot
  }
})

test("Not_found->forceExn", () => {
  expect(Not_found->Native.forceExn)->toMatchSnapshot

  try {
    raise(Not_found)
  } catch {
  | exn => expect(exn->Native.forceExn)->toMatchSnapshot
  }
})

test("Invalid_argument->forceExn", () => {
  expect(Invalid_argument("test")->Native.forceExn)->toMatchSnapshot

  try {
    raise(Invalid_argument("test"))
  } catch {
  | exn => expect(exn->Native.forceExn)->toMatchSnapshot
  }
})

test("Custom->forceExn", () => {
  expect(Custom({"test": 123})->Native.forceExn)->toMatchSnapshot

  try {
    raise(Custom({"test": 123}))
  } catch {
  | exn => expect(exn->Native.forceExn)->toMatchSnapshot
  }
})

test("forceExn + stack (not raised)", () => {
  let stackLines = Not_found->Native.forceExn->Native.stack->Js.String2.split("\n")

  // Message becomes part of the stack
  expect(stackLines[0])->toMatchSnapshot

  // When not raised, the exn won't have a Error property,
  // so the Error will be created inside forceExn(),
  // and the stack will point to the library file
  expect(stackLines[1]->Js.String2.includes("Native.bs.js"))->toBe(true)
})

test("forceExn + stack", () => {
  try {
    raise(Not_found)
  } catch {
  | exn => {
      let stackLines = exn->Native.forceExn->Native.stack->Js.String2.split("\n")

      // Message becomes part of the stack
      expect(stackLines[0])->toMatchSnapshot

      // When exn is raised, stack points to the file it was raised from
      expect(stackLines[1]->Js.String2.includes("Native_test.bs.js"))->toBe(true)
    }
  }
})

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

test("forceJsExn", () => {
  expect(Native.make("test")->Obj.magic->Native.forceJsExn)->toEqual(Native.make("test"))
  expect(123->Obj.magic->Native.forceJsExn)->toEqual(Native.make("123"))
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
