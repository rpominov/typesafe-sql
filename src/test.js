const { Client } = require('pg')

function prepareTypesInfo(namespaces, typeResponse) {
    return new Map(typeResponse.rows.map(row => [row.oid, { ...row, namespace: namespaces.get(row.typnamespace) }]));
}

function prepareColumnsInfo(namespaces, classResponse, columnsResponse) {
    const tables = new Map(classResponse.rows.map(row => {
        const namespace = namespaces.get(row.relnamespace);
        const key = [namespace.nspname, row.relname].join(',');
        return [key, { ...row, namespace: namespace }]
    }))

    return new Map(columnsResponse.rows.map(row => {
        const table = tables.get([row.table_schema, row.table_name].join(','))
        const key = [table.oid, row.ordinal_position].join(',')
        return [key, { ...row, table: table }]
    }))
}

function prepareData(data, typesInfo, columnsInfo) {
    return {
        input: data.parameterDescription.dataTypeIDs.map(id => typesInfo.get(id)),
        output: data.rowDescription == null ? null : data.rowDescription.fields.map(field => {
            return {
                name: field.name,
                type: typesInfo.get(field.dataTypeID),
                collumn: columnsInfo.get([field.tableID, field.columnID].join(','))
            }
        }),
    };
}

class DescribeClient {
    constructor(pgClientOptions) {
        this._pgClient = new Client(pgClientOptions)
        this._connection = null
        this._connected = false
        this._terminated = false
        this._connecting = false
        this._currentRequestCb = null
        this._rowDescription = null
        this._parameterDescription = null
        this._typesInfo = null;
        this._columnsInfo = null;
    }
    _handleEnd() {
        if (this._currentRequestCb !== null) {
            this._callCurrentRequestCb(new Error('Connection terminated'))
        }
        this._terminated = true
    }
    _handleError(err) {
        if (this._currentRequestCb !== null) {
            this._callCurrentRequestCb(err)
        } else {
            console.error("Unexpected error:", err)
        }
    }
    _callCurrentRequestCb(err, data) {
        const cb = this._currentRequestCb;
        this._currentRequestCb = null;
        cb(err, data)
    }
    _callCurrentRequestCbWithData() {
        const data = { rowDescription: this._rowDescription, parameterDescription: this._parameterDescription }
        this._rowDescription = null
        this._parameterDescription = null
        this._callCurrentRequestCb(null, data)
    }
    _handleRowDescription(msg) {
        if (this._currentRequestCb === null) {
            console.error("Unexpected RowDescription message:", msg)
        } else {
            this._rowDescription = msg
        }
    }
    _handleParameterDescription(msg) {
        if (this._currentRequestCb === null) {
            console.error("Unexpected ParameterDescription message:", msg)
        } else {
            this._parameterDescription = msg
        }
    }
    _handleReadyForQuery() {
        if (this._currentRequestCb === null) {
            console.error("Unexpected ReadyForQuery message")
        } else {
            this._callCurrentRequestCbWithData()
        }
    }
    async connect() {
        if (this._connected) {
            return Promise.reject(new Error('Already connected'))
        }

        if (this._connecting) {
            return Promise.reject(new Error('Already connecting'))
        }

        if (this._terminated) {
            return Promise.reject(new Error('The client has been terminated'))
        }

        this._connecting = true;

        await this._pgClient.connect()

        let namespaces = new Map(
            (await this._pgClient.query("select * from pg_catalog.pg_namespace"))
                .rows
                .map(row => [row.oid, row])
        )
        this._typesInfo = prepareTypesInfo(namespaces, await this._pgClient.query("select * from pg_catalog.pg_type"))
        this._columnsInfo = prepareColumnsInfo(
            namespaces,
            await this._pgClient.query("select * from pg_catalog.pg_class"),
            await this._pgClient.query("select * from information_schema.columns")
        )

        // We want to steal the connection from the client and use it directly from now on
        this._pgClient.connection.removeAllListeners()
        this._connection = this._pgClient.connection
        this._pgClient = null

        this._connection.on('errorMessage', this._handleError.bind(this))
        this._connection.on('error', this._handleError.bind(this))
        this._connection.on('end', this._handleEnd.bind(this))
        this._connection.on('rowDescription', this._handleRowDescription.bind(this))
        this._connection.on('parameterDescription', this._handleParameterDescription.bind(this))
        this._connection.on('readyForQuery', this._handleReadyForQuery.bind(this))

        this._connecting = false;
        this._connected = true
    }
    terminate() {
        if (this._terminated) {
            console.warn('Already terminated')
        } else {
            this._terminated = true
            const target = this._pgClient ?? this._connection
            this._pgClient = null
            this._connection = null
            target.end()
        }
    }
    async describe(query) {
        if (this._terminated) {
            return Promise.reject(new Error('The client has been terminated'))
        }

        if (this._currentRequestCb !== null) {
            return Promise.reject(new Error('Another request is in progress'))
        }

        if (!this._connected) {
            await this.connect()
        }

        let resolve;
        let reject;
        const promise = new Promise((resolve_, reject_) => { resolve = resolve_; reject = reject_ })
        this._currentRequestCb = (err, data) => {
            if (err) { reject(err) }
            else { resolve(prepareData(data, this._typesInfo, this._columnsInfo)) }
        }
        this._connection.parse({ name: '', text: query })

        // https://www.postgresql.org/docs/14/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
        this._connection.describe({ name: '', type: 'S' })
        this._connection.sync()
        return promise
    }
}


async function main() {
    const client = new DescribeClient({
        host: 'localhost',
        port: 5432,
        user: 'roman',
        password: '1234',
        database: 'roman',
    })

    console.log(await client.describe('select name as nickname, * from people'));
    console.log(await client.describe('insert into people values ($1, $2, $3)'));
    console.log(await client.describe('SELECT $1::text as test, $2::int as test1, * from people'))
    console.log(await client.describe('SELECT NOW();'))

    client.terminate()
}

main()