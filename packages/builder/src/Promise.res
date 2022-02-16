type t<+'a> = Js.Promise.t<'a>

// TODO: define as external, add all()
let resolve = Js.Promise.resolve
let reject = Js.Promise.reject
let race = Js.Promise.race

@new external make: (@uncurry (((. 'a) => unit) => unit)) => t<'a> = "Promise"

@send
external then: (t<'a>, (. 'a) => t<'b>, option<(. Js.Promise.error) => t<'b>>) => t<'b> = "then"

let catch = (promise, fn) =>
  promise->then(
    (. x) => x->Ok->Js.Promise.resolve,
    Some((. e) => e->Js.Exn.anyToExnInternal->fn->Error->Js.Promise.resolve),
  )

let chain = (promise, fn) => promise->then((. x) => x->fn, None)

let crash = exn => {
  Js.Console.error2("Unexpected error!\n", LogError.Loggable.fromExnVerbose(exn))
  Node.Process.exit(1)
}

let done = (promise, fn) => promise->then((. x) => {
    try {
      x->fn
      Js.Promise.resolve()
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
