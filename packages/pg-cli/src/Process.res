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
  exitWithLoggableError(~showUsage?, err->Errors.Loggable.fromText)

let getOrExitWithError = (option, message) =>
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
      | Some(x) => error->Errors.Loggable.prepend(x)
      },
    )
  }

let catchAndExitWithError = (~prepend=?, promise) =>
  promise->Promise.catch(Errors.Loggable.fromExn)->Promise.map(getOkOrExitWithError(~prepend?))
