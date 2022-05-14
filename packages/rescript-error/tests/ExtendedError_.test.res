open Jest

test("Not_found->toJsError", () => {
  expect(Not_found->ExtendedError.toJsError)->toMatchSnapshot

  try {
    raise(Not_found)
  } catch {
  | exn => expect(exn->ExtendedError.toJsError)->toMatchSnapshot
  }
})

test("Invalid_argument->toJsError", () => {
  expect(Invalid_argument("test")->ExtendedError.toJsError)->toMatchSnapshot

  try {
    raise(Invalid_argument("test"))
  } catch {
  | exn => expect(exn->ExtendedError.toJsError)->toMatchSnapshot
  }
})

test("toJsError + stack (not raised)", () => {
  expect(
    Not_found
    ->ExtendedError.toJsError
    ->ExtendedError.stack
    ->Js.String2.split("\n")
    ->Js.Array2.unsafe_get(1)
    // When not raised, the exn won't have a Error property,
    // so the Error will be created inside toJsError(),
    // and the stack will point to the library file
    ->Js.String2.includes("ExtendedError.bs.js"),
  )->toBe(true)
})

test("toJsError + stack", () => {
  try {
    raise(Not_found)
  } catch {
  | exn =>
    expect(
      exn
      ->ExtendedError.toJsError
      ->ExtendedError.stack
      ->Js.String2.split("\n")
      ->Js.Array2.unsafe_get(1)
      // When exn is raised, stack points to the file it was raised from
      ->Js.String2.includes("ExtendedError_.test.bs.js"),
    )->toBe(true)
  }
})
