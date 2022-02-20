type t<+'a> = Js.Promise.t<'a>

type unknown
let assertNotPromiseLike: unknown => unit = %raw(`(obj) => {
  if (obj != null && typeof obj.then === 'function') {
    throw new Error('Cannot create a Promise containing another Promise: ' + obj)
  }
}`)

@scope("Promise") @val external resolve: 'a => t<'a> = "resolve"
let resolve = x => {
  assertNotPromiseLike(x->Obj.magic)
  resolve(x)
}

@scope("Promise") @val external reject: exn => t<'a> = "reject"
@scope("Promise") @val external all: array<t<'a>> => t<array<'a>> = "all"
@scope("Promise") @val external all2: ((t<'a>, t<'b>)) => t<('a, 'b)> = "all"
@scope("Promise") @val external all3: ((t<'a>, t<'b>, t<'c>)) => t<('a, 'b, 'c)> = "all"
@scope("Promise") @val external all4: ((t<'a>, t<'b>, t<'c>, t<'d>)) => t<('a, 'b, 'c, 'd)> = "all"
@scope("Promise") @val
external all5: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>)) => t<('a, 'b, 'c, 'd, 'e)> = "all"
@scope("Promise") @val
external all6: ((t<'a>, t<'b>, t<'c>, t<'d>, t<'e>, t<'f>)) => t<('a, 'b, 'c, 'd, 'e, 'f)> = "all"
@scope("Promise") @val external race: array<t<'a>> => t<'a> = "race"

@ocaml.doc(
  "The reject callback is not provided by design.\nResolve with a `result`'s `Error` instead"
)
@new
external make: (@uncurry (((. 'a) => unit) => unit)) => t<'a> = "Promise"
let make = fn =>
  make(resolve =>
    fn(x => {
      assertNotPromiseLike(x->Obj.magic)
      resolve(. x)
    })
  )

@send
external then: (t<'a>, (. 'a) => t<'b>, option<(. Js.Promise.error) => t<'b>>) => t<'b> = "then"

let catch = (promise, fn) =>
  promise->then(
    (. x) => x->Ok->resolve,
    Some((. e) => e->Js.Exn.anyToExnInternal->fn->Error->resolve),
  )

let chain = (promise, fn) => promise->then((. x) => x->fn, None)
let map = (promise, fn) => promise->then((. x) => x->fn->resolve, None)

let crash = exn => {
  Js.Console.error2("Unexpected error!\n", LogError.Loggable.fromExnVerbose(exn))
  Node.Process.exit(1)
}

let done = (promise, fn) => promise->then((. x) => {
    try {
      x->fn
      resolve()
    } catch {
    | exn => crash(exn)
    }
  }, Some((. e) => e->Js.Exn.anyToExnInternal->crash))->ignore

let chainOk = (promise, fn) =>
  promise->chain(val =>
    switch val {
    | Ok(x) => fn(x)
    | Error(x) => resolve(Error(x))
    }
  )
let mapOk = (promise, fn) => promise->chainOk(val => val->fn->resolve)

let mergeErrors = promise =>
  promise->chain(res =>
    switch res {
    | Error(e) => Error(e)
    | Ok(Error(e)) => Error(e)
    | Ok(Ok(x)) => Ok(x)
    }->resolve
  )

let sequence = arr => {
  let rec helper = (result, i) =>
    if i === arr->Js.Array2.length {
      result
    } else {
      result->chain(r => arr[i]()->chain(x => Js.Array2.concat(r, [x])->resolve)->helper(i + 1))
    }
  helper([]->resolve, 0)
}
