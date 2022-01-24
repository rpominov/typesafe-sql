const net = require('net');
const client = net.createConnection({ port: 5432, host: "localhost" }, () => {
    // 'connect' listener.
    console.log('connected to server!');

    let buffer = Buffer.alloc(31);
    let pos = 0
    pos = buffer.writeInt32LE(0x00030000, pos)
    pos += buffer.write("user", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("roman", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("database", pos)
    pos = buffer.writeUInt8(0, pos)
    pos += buffer.write("roman", pos)
    pos = buffer.writeUInt8(0, pos)
    pos = buffer.writeUInt8(0, pos)

    console.log(pos)

    client.write(buffer);
});
client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});
client.on('end', () => {
    console.log('disconnected from server');
});