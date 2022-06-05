// TODO: find all uses of Node.Fs and add aliases here for consistancy

module Stat = {
  type t

  @send external isFile: t => bool = "isFile"
  @send external isDirectory: t => bool = "isDirectory"
  @module("fs") @val external statSync: string => t = "statSync"

  let getType = filename =>
    switch filename->statSync {
    | obj if obj->isFile => #file
    | obj if obj->isDirectory => #directory
    | _ => #other
    }
}

@module("path") external isAbsolute: string => bool = "isAbsolute"
@module("path") external joinPath: (string, string) => string = "join"
@module("path") external extname: string => string = "extname"

// TODO: move to Process
@module("process") external cwd: unit => string = "cwd"

let makeAbsolute = path => path->isAbsolute ? path : joinPath(cwd(), path)

let resolveGlobs = globs => {
  let watcher = ref(None)

  let close = () =>
    switch watcher.contents {
    | None => Promise.resolve()
    | Some(watcher') => watcher'->Chokidar.close
    }

  let flatten = dict =>
    dict
    ->Js.Dict.entries
    ->Js.Array2.map(((dir, files)) => files->Js.Array2.map(file => joinPath(dir, file)))
    ->Belt.Array.concatMany

  Promise.make(resolvePr => {
    let watcher' = Chokidar.watchMany(globs)
    watcher :=
      watcher'
      ->Chokidar.on(#error((. err) => resolvePr(Errors.Loggable.fromJsExn(err)->Error)))
      ->Chokidar.on(#ready(() => resolvePr(watcher'->Chokidar.getWatched->flatten->Ok)))
      ->Some
  })
  ->Promise.catch(Errors.Loggable.fromExnVerbose)
  ->Promise.mapOk(x => x)
  ->Promise.chain(res0 =>
    close()
    ->Promise.catch(Errors.Loggable.fromExnVerbose)
    ->Promise.chain(res1 =>
      switch (res0, res1) {
      | (Error(e), _) | (_, Error(e)) => Error(e)
      | (Ok(a), _) => Ok(a)
      }->Promise.resolve
    )
  )
}

type encoding = [
  | #hex
  | #utf8
  | #ascii
  | #latin1
  | #base64
  | #ucs2
  | #base64
  | #binary
  | #utf16le
]

@module("fs/promises") @val
external readFile: (string, encoding) => Promise.t<string> = "readFile"
