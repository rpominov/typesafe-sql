module Path = {
  type t = {
    dir: string,
    root: string,
    base: string,
    name: string,
    ext: string,
  }
  @module("path") external format: t => string = "format"
  @module("path") external parse: string => t = "parse"

  @module("path") external basename: string => string = "basename"

  @module("path")
  external basenameExt: (string, string) => string = "basename"

  @module("path") external delimiter: string = "delimiter"

  @module("path") external dirname: string => string = "dirname"

  @module("path") external extname: string => string = "extname"

  @module("path") external isAbsolute: string => bool = "isAbsolute"

  @module("path") @variadic
  external join: array<string> => string = "join"

  @module("path") external join2: (string, string) => string = "join"

  @module("path") external normalize: string => string = "normalize"

  @module("path")
  external relative: (~from: string, ~to_: string) => string = "relative"

  @module("path") @variadic
  external resolve: array<string> => string = "resolve"

  @module("path") external sep: string = "sep"

  @module("path")
  external toNamespacedPath: string => string = "toNamespacedPath"
}

let watcher = Chokidar.watchMany(// ~options=Chokidar.options(~ignored=[Anymatch.glob("**/Fs.res")], ()),
["**/*.res", "!**/Map.res"])

watcher
->Chokidar.on(
  #all(
    (. a, b, c) => {
      // Js.log3(a, b, c)
      ignore()
    },
  ),
)
->ignore

(
  () => {
    watcher->Chokidar.getWatched->Js.log
  }
)
->Js.Global.setTimeout(1000)
->ignore

// NOTE TO SELF: to keep an option to move away from chokidar,
// in the initial api we should only take globs as an input (none of the options below)
// like so: ["**/*.res", "!**/Map.res"]
//
// maybe expose usePolling as a boolean though for network FS case
