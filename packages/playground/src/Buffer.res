%%raw("let { Buffer } = require(\"buffer\")")

type t = Node.Buffer.t

@val external alloc: int => t = "Buffer.alloc"
@val external isBuffer: 'a => bool = "Buffer.isBuffer"

@send external toString: t => string = "toString"
@send external writeInt32BE: (t, int, int) => int = "writeInt32BE"
@send external writeInt32LE: (t, int, int) => int = "writeInt32LE"
@send external writeString: (t, string, int) => int = "write"
@send external writeUInt8: (t, int, int) => int = "writeUInt8"

let cast = x => isBuffer(x) ? Some((Obj.magic(x): t)) : None
