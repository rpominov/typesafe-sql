open TypesafeSqlSharedTypes.GeneratorInput

module Format = {
  module Exec = {
    type childProcess
    type stream
    @get external stdin: childProcess => stream = "stdin"
    @send external end: (stream, string) => unit = "end"

    @module("child_process")
    external execFile: (
      string,
      array<string>,
      @uncurry (Js.Nullable.t<Js.Exn.t>, Node.Buffer.t, Node.Buffer.t) => unit,
    ) => childProcess = "execFile"
  }

  let rec findBinary = (~cwd=Node.Process.cwd(), name) => {
    try {
      let parent = Node.Path.resolve(cwd, "..")
      if parent === cwd {
        None
      } else {
        let potentialResult = Node.Path.join([cwd, "node_modules", ".bin", name])
        if Node.Fs.existsSync(potentialResult) {
          Some(potentialResult)
        } else {
          findBinary(~cwd=parent, name)
        }
      }
    } catch {
    | _ => None
    }
  }

  let rescriptBinary = findBinary("rescript")

  let format = code =>
    switch rescriptBinary {
    | None => Promise.reject(Promise.makeJsError("Could not find rescript binary"))
    | Some(binary) =>
      Js.Promise.make((~resolve, ~reject) => {
        Exec.execFile(binary, ["format", "-stdin", ".res"], (error, stdout, stderr) => {
          switch error->Js.Nullable.toOption {
          | Some(jsError) =>
            reject(.
              switch stderr->Node.Buffer.toString {
              | "" =>
                switch stdout->Node.Buffer.toString {
                | "" => jsError
                | message => Promise.makeJsError(message)
                }
              | message => Promise.makeJsError(message)
              }->Obj.magic,
            )
          | None => resolve(. stdout->Node.Buffer.toString)
          }
        })
        ->Exec.stdin
        ->Exec.end(code)
      })
    }
}

let defaultOutputPath = "{dir}/{name}.res"

let generate = (_data: t) => {
  Format.format("let x = `TODO`")
}
