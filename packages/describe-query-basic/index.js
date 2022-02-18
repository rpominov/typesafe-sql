const { Client, DatabaseError } = require("pg");

const fatal = Symbol("fatal");

class DescribeClient {
  async _connect(options) {
    const pgClient = new Client(options);
    await pgClient.connect();

    // We want to steal the connection from the client and use it directly from now on
    pgClient.connection.removeAllListeners();
    this._connection = pgClient.connection;

    for (const name of [
      "rowDescription",
      "parameterDescription",
      "errorMessage",
      "readyForQuery",
    ]) {
      this._connection.on(name, (msg) => {
        this._listener
          ? this._listener(name, msg)
          : console.error("Unexpected message:", msg);
      });
    }

    this._connection.on("error", (error) => {
      if (this._listener) {
        this._listener("fatal", error);
      }
      this._connection.end();
    });

    this._connection.on("end", () => {
      this._connection.removeAllListeners();
      this._connection = null;
      if (this._listener) {
        this._listener("fatal", new Error("Connection has been terminated"));
      }
    });
  }

  async describe(query) {
    if (this._connection == null) {
      return Promise.reject(new Error("Connection has been terminated"));
    }

    while (this._promise != null) {
      try {
        await this._promise;
      } catch (err) {
        if (err[fatal]) {
          throw err;
        }
      }
    }

    this._promise = new Promise((resolve, reject) => {
      let rowDescription;
      let parameterDescription;
      let error;

      const done = () => {
        this._listener = null;
        this._promise = null;

        if (error) {
          reject(error);
          return;
        }

        resolve({
          parameters: parameterDescription.dataTypeIDs.map((id) => ({
            typeId: id,
          })),
          row:
            rowDescription &&
            rowDescription.fields.map((field) => ({
              name: field.name,
              typeId: field.dataTypeID,
              tableId: field.tableID,
              columnId: field.columnID,
            })),
        });
      };

      this._listener = (tag, arg) => {
        switch (tag) {
          case "rowDescription":
            rowDescription = arg;
            break;

          case "parameterDescription":
            parameterDescription = arg;
            break;

          case "errorMessage":
            if (error != null) {
              console.error(error);
            }
            error = arg;
            break;

          case "fatal":
            if (error != null) {
              console.error(error);
            }
            error = arg;
            error[fatal] = true;
            done();

          case "readyForQuery":
            done();
            break;
        }
      };

      // https://www.postgresql.org/docs/14/protocol-flow.html#PROTOCOL-FLOW-EXT-QUERY
      this._connection.parse({ name: "", text: query });
      this._connection.describe({ name: "", type: "S" });
      this._connection.sync();
    });

    return this._promise;
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

exports.getErrorMetaData = (error) => {
  if (error == null) {
    error = {};
  }
  return {
    isFatal: error[fatal] === true,
    databaseError: error instanceof DatabaseError ? error : undefined,
  };
};
