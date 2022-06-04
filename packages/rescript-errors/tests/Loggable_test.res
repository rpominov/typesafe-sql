open Jest

test("fromText", () => {
  let loggable = Loggable.fromText("test")
  expect(loggable->Loggable.cause)->toEqual(None)
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect(loggable->Loggable.toString)->toEqual("test")
})

test("fromExn Invalid_argument", () => {
  let (loggable, exn) = try {
    raise(Invalid_argument("test"))
  } catch {
  | exn => (Loggable.fromExn(exn), exn)
  }
  expect(loggable->Loggable.cause)->toEqual(Exn(exn))
  expect(loggable->Loggable.compile)->toMatchSnapshot
  loggable
  ->Loggable.toString
  ->Js.String2.replaceByRe(%re("/at .+/g"), "at ...")
  ->expect
  ->toMatchSnapshot
})

test("fromExn Js.Exn.raiseError", () => {
  let loggable = try {
    Js.Exn.raiseError("test")
  } catch {
  | exn => Loggable.fromExn(exn)
  }
  expect(loggable->Loggable.cause)->toEqual(Native(Native.make("test")))
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect(loggable->Loggable.toString)->toEqual("test")
})

test("fromExnVerbose Js.Exn.raiseError", () => {
  let loggable = try {
    Js.Exn.raiseError("test")
  } catch {
  | exn => Loggable.fromExnVerbose(exn)
  }
  expect(loggable->Loggable.cause)->toEqual(Native(Native.make("test")))
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect((loggable->Loggable.toString->Js.String2.split("\n"))[0])->toEqual("Error: test")
})

test("fromExn Js.Exn.raiseError + prepend", () => {
  let loggable = try {
    Js.Exn.raiseError("test")
  } catch {
  | exn => Loggable.fromExn(exn)->Loggable.prepend("annotaion")
  }
  expect(loggable->Loggable.cause)->toEqual(Native(Native.make("test")))
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect(loggable->Loggable.toString)->toEqual("annotaion test")
})

test("fromExn Js.Exn.raiseError + append", () => {
  let loggable = try {
    Js.Exn.raiseError("test")
  } catch {
  | exn => Loggable.fromExn(exn)->Loggable.append("annotaion")
  }
  expect(loggable->Loggable.cause)->toEqual(Native(Native.make("test")))
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect(loggable->Loggable.toString)->toEqual("test annotaion")
})

test("fromExn (throw \"test\")", () => {
  let fn = %raw(`() => {throw "test"}`)

  let loggable = try {
    fn()
  } catch {
  | exn => Loggable.fromExn(exn)
  }
  expect(loggable->Loggable.cause)->toMatchSnapshot
  expect(loggable->Loggable.compile)->toMatchSnapshot
  expect(loggable->Loggable.toString)->toEqual(`'test'`)
})
