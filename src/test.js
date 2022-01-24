const net = require('net');

let fixSize = (buffer, lastPos) => {
    let size = lastPos + 4
    let finalBuffer = Buffer.alloc(size)
    finalBuffer.writeInt32BE(size)
    buffer.copy(finalBuffer, 4)
    return finalBuffer
}

const client = net.createConnection({ port: 5432, host: "localhost" }, () => {
    // 'connect' listener.
    console.log('connected to server!');

    let buffer = Buffer.alloc(128);
    let pos = 0;
    pos = buffer.writeInt32BE(0x00030000, pos)
    pos += buffer.write("user", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("roman", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("database", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("roman", pos)
    pos = buffer.writeUInt8(0, pos)
    pos = buffer.writeUInt8(0, pos)

    client.write(fixSize(buffer, pos));
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});

client.on('end', () => {
    console.log('disconnected from server');
});
