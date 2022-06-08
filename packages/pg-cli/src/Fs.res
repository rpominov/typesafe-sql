module Loggable = TypesafeSqlErrors.Loggable

module Stat = {
  type t
  @send external isFile: t => bool = "isFile"
  @send external isDirectory: t => bool = "isDirectory"
  @module("fs") @val external statSync: string => t = "statSync"
}

module Path = {
  @module("path") external isAbsolute: string => bool = "isAbsolute"
  @module("path") external join: (string, string) => string = "join"
  @module("path") external extname: string => string = "extname"
}

type fileEncoding = [
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

// https://nodejs.org/docs/latest-v16.x/api/fs.html#fspromisesreadfilepath-options
@module("fs/promises") @val
external readFile: (string, fileEncoding) => Promise.t<string> = "readFile"

// https://nodejs.org/docs/latest-v16.x/api/fs.html#fspromiseswritefilefile-data-options
@module("fs/promises") @val
external writeFile: (string, string, fileEncoding) => Promise.t<unit> = "writeFile"

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
    ->Js.Array2.map(((dir, files)) => files->Js.Array2.map(file => Path.join(dir, file)))
    ->Belt.Array.concatMany

  Promise.make(resolve => {
    let watcher' = Chokidar.watchMany(globs)
    watcher := Some(watcher')
    watcher'
    ->Chokidar.on(#error((. err) => resolve(Loggable.fromJsExn(err)->Error)))
    ->Chokidar.on(#ready(() => resolve(watcher'->Chokidar.getWatched->flatten->Ok)))
    ->ignore
  })
  ->Promise.catch(Loggable.fromExnVerbose)
  ->Promise.mapOk(x => x)
  ->Promise.chain(res0 =>
    close()
    ->Promise.catch(Loggable.fromExnVerbose)
    ->Promise.chain(res1 =>
      switch (res0, res1) {
      | (Error(e), _) | (_, Error(e)) => Error(e)
      | (Ok(a), _) => Ok(a)
      }->Promise.resolve
    )
  )
}
