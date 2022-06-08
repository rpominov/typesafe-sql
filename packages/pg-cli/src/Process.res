let argv = Node.Process.argv
module Loggable = TypesafeSqlErrors.Loggable


@module("process") external cwd: unit => string = "cwd"

let exitWithLoggableError = (~showUsage=None, err) => {
  TTY.error("ERROR!")
  TTY.printLoggable(err)
  switch showUsage {
  | None => ()
  | Some(usage) => {
      Js.Console.error("")
      Js.Console.error(usage->TTY.Chalk.dim)
    }
  }
  Node.Process.exit(1)
}

let exitWithError = (~showUsage=?, err) =>
  exitWithLoggableError(~showUsage?, err->Loggable.fromText)

let getSomeOrExitWithError = (option, message) =>
  switch option {
  | Some(val) => val
  | None => exitWithError(message)
  }

let getOkOrExitWithError = (~prepend=?, result) =>
  switch result {
  | Ok(val) => val
  | Error(error) =>
    exitWithLoggableError(
      switch prepend {
      | None => error
      | Some(x) => error->Loggable.prepend(x)
      },
    )
  }

let catchAndExitWithError = (~prepend=?, promise) =>
  promise->Promise.catch(Loggable.fromExn)->Promise.map(getOkOrExitWithError(~prepend?))
