@module("path") external isAbsolute: string => bool = "isAbsolute"

@module("path") external joinPath: (string, string) => string = "join"

// TODO: get rid of pkg-dir
@module("pkg-dir")
external packageDirectorySync: unit => option<string> = "sync"

@module("process")
external cwd: unit => string = "cwd"

let defaultRoot = () =>
  switch packageDirectorySync() {
  | None => cwd()
  | Some(x) => x
  }

let resoloveRoot = custom => {
  switch custom {
  | None => defaultRoot()
  | Some(path) => isAbsolute(path) ? path : joinPath(defaultRoot(), path)
  }
}

let resolve = (root, globs) => {
  let watcher = ref(None)

  let close = () =>
    switch watcher.contents {
    | None => Promise.resolve()
    | Some(watcher') => watcher'->Chokidar.close
    }

  let flatten = dict => {
    dict
    ->Js.Dict.entries
    ->Js.Array2.map(((dir, files)) => files->Js.Array2.map(file => joinPath(dir, file)))
    ->Belt.Array.concatMany
  }

  Promise.make(resolvePr => {
    let watcher' = Chokidar.watchMany(~options=Chokidar.options(~cwd=root, ()), globs)
    watcher :=
      watcher'
      ->Chokidar.on(#error((. err) => resolvePr(LogError.wrapNodeCbError(err)->Error)))
      ->Chokidar.on(#ready(() => resolvePr(watcher'->Chokidar.getWatched->flatten->Ok)))
      ->Some
  })
  ->Promise.catch(LogError.wrapExnVerbose)
  ->Promise.mapOk(x => x)
  ->Promise.chain(res0 =>
    close()
    ->Promise.catch(LogError.wrapExnVerbose)
    ->Promise.chain(res1 =>
      switch (res0, res1) {
      | (Error(e), _) | (_, Error(e)) => Error(e)
      | (Ok(a), _) => Ok(a)
      }->Promise.resolve
    )
  )
}

@module("fs") @val
external readFile: (
  string,
  [#utf8],
  @uncurry (Js.Nullable.t<Js.Exn.t>, option<string>) => unit,
) => unit = "readFile"

let read = path =>
  Promise.make(resolve =>
    readFile(path, #utf8, (err, content) => {
      resolve(
        switch (err->Js.Nullable.toOption, content) {
        | (Some(e), _) => e->LogError.wrapNodeCbError->Error
        | (_, None) => Ok("")
        | (_, Some(content)) => Ok(content)
        },
      )
    })
  )

@module("fs") @val
external writeFile: (string, string, [#utf8], @uncurry (Js.Nullable.t<Js.Exn.t> => unit)) => unit =
  "writeFile"

let write = (path, content) =>
  Promise.make(resolve =>
    writeFile(path, content, #utf8, err => {
      resolve(
        switch err->Js.Nullable.toOption {
        | Some(e) => e->LogError.wrapNodeCbError->Error
        | None => Ok()
        },
      )
    })
  )

// NOTE TO SELF: to keep an option to move away from chokidar,
// in the initial api we should only take globs as an input (none of the options below)
// like so: ["**/*.res", "!**/Map.res"]
//
// maybe expose usePolling as a boolean though for network FS case
