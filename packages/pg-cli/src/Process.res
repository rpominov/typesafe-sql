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
