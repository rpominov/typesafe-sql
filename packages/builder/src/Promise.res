type error

%%private(
  @send external then: (Js.Promise.t<'a>, 'a => Js.Promise.t<'b>) => Js.Promise.t<'b> = "then"
  @send
  external then2: (Js.Promise.t<'a>, 'a => unit, error => unit) => Js.Promise.t<unit> = "then"

  let crash = exn => {
    switch Js.Exn.asJsExn(exn) {
    | Some(jsExn) => Js.Console.error(jsExn)
    | None => Js.Console.error(exn)
    }
    Node.Process.exit(1)
  }
)

@ocaml.doc("The callback must not raise exceptions, it will crash the program")
let chain = (promise, callback) =>
  promise->then(val => {
    try {
      val->callback
    } catch {
    | exn => crash(exn)
    }
  })

@ocaml.doc("The callback must not raise exceptions, it will crash the program")
let subscribe = (promise, callback) =>
  promise
  ->then2(
    val => {
      try {
        val->Ok->callback
      } catch {
      | exn => crash(exn)
      }
    },
    error => {
      try {
        error->Js.Exn.anyToExnInternal->Error->callback
      } catch {
      | exn => crash(exn)
      }
    },
  )
  ->ignore
