module Net = {
  module BufferOrString = {
    type t
    @send external toString: t => string = "toString"
  }
  module Socket = {
    type t

    @send external onReady: (t, @as("ready") _, unit => unit) => t = "on"
    @send external onClose: (t, @as("close") _, bool => unit) => t = "on"
    @send external onData: (t, @as("data") _, BufferOrString.t => unit) => t = "on"
    @send external onEnd: (t, @as("end") _, unit => unit) => t = "on"
    @send external onError: (t, @as("error") _, Js.Exn.t => unit) => t = "on"

    @send external write: (t, Buffer.t) => bool = "write"
  }
  @module("net") external connect: (~port: string, ~host: string) => Socket.t = "connect"
}

module Message = {
  type t = {buf: Buffer.t, offset: int}
  let make = () => {buf: Buffer.alloc(128), offset: 0}
  let writeInt = (message, value): t => {
    let offset' = message.buf->Buffer.writeInt32LE(value, message.offset)
    {buf: message.buf, offset: message.offset + offset'}
  }
  let writeInt8 = (message, value): t => {
    let offset' = message.buf->Buffer.writeUInt8(value, message.offset)
    {buf: message.buf, offset: message.offset + offset'}
  }
  let writeString = (message, value): t => {
    let offset' = message.buf->Buffer.writeString(value, message.offset)
    {buf: message.buf, offset: message.offset + offset'}
  }
}

type connectionSettings = {
  host: string,
  port: string,
  user: string,
  pass: string,
  database: string,
}

let connectionSettings = {
  host: "localhost",
  port: "5432",
  user: "roman",
  pass: "1234",
  database: "roman",
}

let socket = Net.connect(~port=connectionSettings.port, ~host=connectionSettings.host)
socket
->Net.Socket.onClose(hadError => {
  Js.log2("TCP connection closed. Had error:", hadError)
})
->Net.Socket.onReady(() => {
  Js.log("TCP connection established")

  socket
  ->Net.Socket.onData(data => {
    Js.log2("Data received:", data->Net.BufferOrString.toString)
  })
  ->Net.Socket.onError(error => {
    Js.log2("TCP error:", error)
  })
  ->ignore

  let message = Message.make()
  let message = message->Message.writeInt(196608) // protocol version
  let message = message->Message.writeString("user")
  let message = message->Message.writeString(connectionSettings.user)
  let message = message->Message.writeInt8(0)
  let message = message->Message.writeString("database")
  let message = message->Message.writeString(connectionSettings.database)
  let message = message->Message.writeInt8(0)
  let message = message->Message.writeInt8(0)

  //   message.offset->Js.log

  socket->Net.Socket.write(message.buf)->Js.log
})
->ignore
