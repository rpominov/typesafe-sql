// const net = require('net');

// let fixSize = (buffer, lastPos) => {
//     let size = lastPos + 4
//     let finalBuffer = Buffer.alloc(size)
//     finalBuffer.writeInt32BE(size)
//     buffer.copy(finalBuffer, 4)
//     return finalBuffer
// }

// const client = net.createConnection({ port: 5432, host: "localhost" }, () => {
//     // 'connect' listener.
//     console.log('connected to server!');

//     let buffer = Buffer.alloc(128);
//     let pos = 0;
//     pos = buffer.writeInt32BE(0x00030000, pos)
//     pos += buffer.write("user", pos)
//     pos = buffer.writeUInt8(0, pos)
//     pos += buffer.write("roman", pos)
//     pos = buffer.writeUInt8(0, pos)
//     pos += buffer.write("database", pos)
//     pos = buffer.writeUInt8(0, pos)
//     pos += buffer.write("roman", pos)
//     pos = buffer.writeUInt8(0, pos)
//     pos = buffer.writeUInt8(0, pos)

//     client.write(fixSize(buffer, pos));
// });

// client.on('data', (data) => {
//     console.log(data.toString());
//     client.end();
// });

// client.on('end', () => {
//     console.log('disconnected from server');
// });

const { Client } = require('pg')

const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'roman',
    password: '1234',
    database: 'roman',
})

client.connect(err => {
    if (err) {
        console.error('connection error', err.stack)
    } else {
        console.log('connected')

        client.connection.removeAllListeners()

        // client.connection.on('backendKeyData', (...args) => console.log('backendKeyData', ...args))
        // client.connection.on('readyForQuery', (...args) => console.log('readyForQuery', ...args))
        // client.connection.on('notice', (...args) => console.log('notice', ...args))
        // client.connection.on('dataRow', (...args) => console.log('dataRow', ...args))
        // client.connection.on('portalSuspended', (...args) => console.log('portalSuspended', ...args))
        // client.connection.on('emptyQuery', (...args) => console.log('emptyQuery', ...args))
        // client.connection.on('commandComplete', (...args) => console.log('commandComplete', ...args))
        // client.connection.on('parseComplete', (...args) => console.log('parseComplete', ...args))
        // client.connection.on('copyInResponse', (...args) => console.log('copyInResponse', ...args))
        // client.connection.on('copyData', (...args) => console.log('copyData', ...args))
        // client.connection.on('notification', (...args) => console.log('notification', ...args))

        client.connection.on('errorMessage', (...args) => console.log('errorMessage', ...args))
        client.connection.on('error', (...args) => console.log('error', ...args))
        client.connection.on('rowDescription', (...args) => console.log('rowDescription', ...args))
        client.connection.on('parameterDescription', (...args) => console.log('parameterDescription', ...args))

        client.connection.parse({ name: 'test', text: 'SELECT $1::text as name' })
        client.connection.describe({ name: 'test', type: 'S' })
        client.connection.sync()
    }
})
