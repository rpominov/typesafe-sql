const { Client, DatabaseError } = require("pg");

class DescribeClient {
  async _connect(options) {
    const pgClient = new Client(options);
    await pgClient.connect();

    // We want to steal the connection from the client and use it directly from now on
    pgClient.connection.removeAllListeners();
    this._connection = pgClient.connection;

    const onFatalError = (error) => {
      this._fatalError = error;
      this._connection.end();
    };

    for (const name of [
      "rowDescription",
      "parameterDescription",
      "readyForQuery",
    ]) {
      this._connection.on(name, (msg) => {
        if (this._listener) {
          this._listener(name, msg);
        } else {
          console.warn(`Unexpected ${name} message from DB server:`, msg);
        }
      });
    }

    this._connection.on("errorMessage", (msg) => {
      if (this._listener) {
        this._latestRequestError = msg;
        this._listener("error", msg);
      } else {
        onFatalError(msg);
      }
    });

    this._connection.on("error", onFatalError);

    this._connection.on("end", () => {
      if (!this._terminating && this._fatalError == null) {
        if (
          this._latestRequestError != null &&
          this._latestRequestError.severity === "FATAL"
        ) {
          this._fatalError = this._latestRequestError;
        } else {
          this._fatalError = new Error(
            "Describe query client's connection has been terminated unexpectedly, without a error"
          );
        }
      }

      this._connection.removeAllListeners();
      this._connection = null;

      if (this._listener) {
        this._listener("error", this._fatalError);
      }

      if (this._onUnexpectedTerminationCb && this._fatalError != null) {
        this._onUnexpectedTerminationCb(this._fatalError);
      }
    });
  }

  async describe(query) {
    while (this._promise != null) {
      try {
        await this._promise;
      } catch (_) {}
    }

    if (this._fatalError) {
      throw this._fatalError;
    }

    if (this._terminating || this._connection == null) {
      throw new Error(
        "The describe-query-basic client has been terminated by the user"
      );
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
        } else {
          resolve({
            parameters:
              parameterDescription && parameterDescription.dataTypeIDs,
            row: rowDescription && rowDescription.fields,
          });
        }
      };

      this._listener = (tag, arg) => {
        switch (tag) {
          case "rowDescription":
            rowDescription = arg;
            break;

          case "parameterDescription":
            parameterDescription = arg;
            break;

          case "error":
            if (error != null && error !== arg) {
              console.error(arg);
            } else {
              error = arg;
            }
            if (this._fatalError != null) {
              done();
            }
            break;

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
    if (!this._terminating && this._connection != null) {
      this._terminating = true;
      this._connection.end();
    }
    return new Promise((resolve) => {
      if (this._connection != null) {
        this._connection.once("end", resolve);
      } else {
        resolve();
      }
    });
  }
}

exports.createClient = async (options, onUnexpectedTermination) => {
  const client = new DescribeClient();
  client._onUnexpectedTerminationCb = onUnexpectedTermination;
  await client._connect(options);
  return client;
};
