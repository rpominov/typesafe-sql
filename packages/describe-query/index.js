const { Client } = require("pg");

class DescribeClient {
  constructor(options) {
    this._options = options;
    this._connection = null;
    this._types = null;
    this._columns = null;
    this._listener = null;
  }

  async _connect() {
    const pgClient = new Client(this._options);
    await pgClient.connect();

    let namespaces = new Map(
      (await pgClient.query("select * from pg_catalog.pg_namespace")).rows.map(
        (row) => [row.oid, row]
      )
    );

    this._types = new Map(
      (await pgClient.query("select * from pg_catalog.pg_type")).rows.map(
        (row) => [
          row.oid,
          { ...row, namespace: namespaces.get(row.typnamespace) },
        ]
      )
    );

    const tables = new Map(
      (await pgClient.query("select * from pg_catalog.pg_class")).rows.map(
        (row) => {
          const namespace = namespaces.get(row.relnamespace);
          const key = [namespace.nspname, row.relname].join(",");
          return [key, { ...row, namespace: namespace }];
        }
      )
    );

    this._columns = new Map(
      (
        await pgClient.query("select * from information_schema.columns")
      ).rows.map((row) => {
        const table = tables.get([row.table_schema, row.table_name].join(","));
        const key = [table.oid, row.ordinal_position].join(",");
        return [key, { ...row, table: table }];
      })
    );

    // We want to steal the connection from the client and use it directly from now on
    pgClient.connection.removeAllListeners();
    this._connection = pgClient.connection;

    this._connection.on("errorMessage", (err) => {
      this._listener
        ? this._listener("errorMessage", err)
        : console.error("Unexpected error:", err);
    });

    this._connection.on("error", (err) => {
      this._listener
        ? this._listener("error", err)
        : console.error("Unexpected error:", err);
    });

    this._connection.on("end", () => {
      this._listener && this._listener("end");
      this._connection = null;
    });

    this._connection.on("rowDescription", (msg) => {
      this._listener
        ? this._listener("rowDescription", msg)
        : console.error("Unexpected RowDescription message:", msg);
    });

    this._connection.on("parameterDescription", (msg) => {
      this._listener
        ? this._listener("parameterDescription", msg)
        : console.error("Unexpected ParameterDescription message:", msg);
    });

    this._connection.on("readyForQuery", () => {
      this._listener
        ? this._listener("readyForQuery")
        : console.error("Unexpected ReadyForQuery message:", msg);
    });
  }

  terminate() {
    if (this._connection === null) {
      console.warn("Already terminated");
    } else {
      const connection = this._connection;
      this._connection = null;
      connection.end();
    }
  }

  async describe(query) {
    if (this._connection === null) {
      return Promise.reject(new Error("The client has been terminated"));
    }

    if (this._listener !== null) {
      return Promise.reject(new Error("Another request is in progress"));
    }

    return new Promise((resolve, reject) => {
      let rowDescription;
      let parameterDescription;

      this._listener = (tag, arg) => {
        switch (tag) {
          case "errorMessage":
          case "error":
            reject(arg);
            this._listener = null;
            break;

          case "end":
            reject(new Error("Connection has been terminated"));
            this._listener = null;
            break;

          case "rowDescription":
            rowDescription = arg;
            break;

          case "parameterDescription":
            parameterDescription = arg;
            break;

          case "readyForQuery":
            resolve({
              input: parameterDescription.dataTypeIDs.map((id) =>
                this._types.get(id)
              ),
              output:
                rowDescription == null
                  ? null
                  : rowDescription.fields.map((field) => {
                      return {
                        name: field.name,
                        type: this._types.get(field.dataTypeID),
                        collumn: this._columns.get(
                          [field.tableID, field.columnID].join(",")
                        ),
                      };
                    }),
            });
            this._listener = null;
            break;
        }
      };

      // https://www.postgresql.org/docs/14/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      this._connection.parse({ name: "", text: query });
      this._connection.describe({ name: "", type: "S" });
      this._connection.sync();
    });
  }
}

exports.createClient = async (options) => {
  const client = new DescribeClient(options);
  await client._connect();
  return client;
};
