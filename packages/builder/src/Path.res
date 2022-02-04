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
