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

@module("process") external cwd: unit => string = "cwd"

let makeAbsolute = path => path->isAbsolute ? path : joinPath(cwd(), path)
