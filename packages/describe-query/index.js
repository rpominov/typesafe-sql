const { Client } = require("pg");

class DescribeClient {
  async _connect(options) {
    const pgClient = new Client(options);
    await pgClient.connect();

    const namespaces = new Map(
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

    this._connection.on("end", () => {
      this._connection.removeAllListeners();
      this._connection = null;
      this._listener && this._listener("end");
    });
  }

  async describe(query) {
    if (this._connection == null) {
      return Promise.reject(new Error("The client has been terminated"));
    }

    if (this._listener != null) {
      return Promise.reject(new Error("Another request is in progress"));
    }

    return new Promise((resolve, reject) => {
      let rowDescription = null;
      let parameterDescription = null;

      this._listener = (tag, arg) => {
        switch (tag) {
          case "errorMessage":
          case "error":
            this._listener = null;
            reject(arg);
            break;

          case "end":
            this._listener = null;
            reject(new Error("Connection has been terminated"));
            break;

          case "rowDescription":
            rowDescription = arg;
            break;

          case "parameterDescription":
            parameterDescription = arg;
            break;

          case "readyForQuery":
            this._listener = null;
            resolve({
              input: parameterDescription.dataTypeIDs.map((id) =>
                this._types.get(id)
              ),
              output:
                rowDescription &&
                rowDescription.fields.map((field) => {
                  return {
                    name: field.name,
                    type: this._types.get(field.dataTypeID),
                    collumn: this._columns.get(
                      [field.tableID, field.columnID].join(",")
                    ),
                  };
                }),
            });
            break;
        }
      };

      // https://www.postgresql.org/docs/14/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      this._connection.parse({ name: "", text: query });
      this._connection.describe({ name: "", type: "S" });
      this._connection.sync();
    });
  }

  terminate() {
    this._connection && this._connection.end();
  }
}

exports.createClient = async (options) => {
  const client = new DescribeClient();
  await client._connect(options);
  return client;
};
