// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Pg from "pg";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Js_exn from "rescript/lib/es6/js_exn.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

var Password = {};

var TypesParser = {};

var QueryConfig = {};

var QueryResult = {};

var $$Notification = {};

var NoticeMessage = {};

var $$instanceof = ((x, C) => x instanceof C);

function fromJsExn(exn) {
  if ($$instanceof(exn, Pg.DatabaseError)) {
    return exn;
  }
  
}

function fromExn(exn) {
  if (exn.RE_EXN_ID === Js_exn.$$Error) {
    return fromJsExn(exn._1);
  }
  
}

function DatabaseError_toJsExn(prim) {
  return prim;
}

var DatabaseError = {
  fromJsExn: fromJsExn,
  fromExn: fromExn,
  toJsExn: DatabaseError_toJsExn
};

var Config = {};

function make(user, password, host, database, port, connectionString, statement_timeout, query_timeout, application_name, connectionTimeoutMillis, idle_in_transaction_session_timeout, ssl, types, param) {
  var tmp = {};
  if (user !== undefined) {
    tmp.user = user;
  }
  if (password !== undefined) {
    tmp.password = Caml_option.valFromOption(password);
  }
  if (host !== undefined) {
    tmp.host = host;
  }
  if (database !== undefined) {
    tmp.database = database;
  }
  if (port !== undefined) {
    tmp.port = port;
  }
  if (connectionString !== undefined) {
    tmp.connectionString = connectionString;
  }
  if (statement_timeout !== undefined) {
    tmp.statement_timeout = statement_timeout;
  }
  if (query_timeout !== undefined) {
    tmp.query_timeout = query_timeout;
  }
  if (application_name !== undefined) {
    tmp.application_name = application_name;
  }
  if (connectionTimeoutMillis !== undefined) {
    tmp.connectionTimeoutMillis = connectionTimeoutMillis;
  }
  if (idle_in_transaction_session_timeout !== undefined) {
    tmp.idle_in_transaction_session_timeout = idle_in_transaction_session_timeout;
  }
  if (ssl !== undefined) {
    tmp.ssl = Caml_option.valFromOption(ssl);
  }
  if (types !== undefined) {
    tmp.types = Caml_option.valFromOption(types);
  }
  return new Pg.Client(tmp);
}

function connectCb(client, cb) {
  client.connect(function (err) {
        return Curry._1(cb, (err == null) ? ({
                        TAG: /* Ok */0,
                        _0: undefined
                      }) : ({
                        TAG: /* Error */1,
                        _0: err
                      }));
      });
  
}

function endCb(client, cb) {
  client.end(function (err) {
        return Curry._1(cb, (err == null) ? ({
                        TAG: /* Ok */0,
                        _0: undefined
                      }) : ({
                        TAG: /* Error */1,
                        _0: err
                      }));
      });
  
}

var Client = {
  make: make,
  connectCb: connectCb,
  endCb: endCb
};

function merge(poolConfig, clientConfig) {
  return Object.assign({}, poolConfig, clientConfig);
}

var PoolConfig = {
  merge: merge
};

function make$1(idleTimeoutMillis, max, allowExitOnIdle, user, password, host, database, port, connectionString, statement_timeout, query_timeout, application_name, connectionTimeoutMillis, idle_in_transaction_session_timeout, ssl, types, param) {
  var tmp = {};
  if (idleTimeoutMillis !== undefined) {
    tmp.idleTimeoutMillis = idleTimeoutMillis;
  }
  if (max !== undefined) {
    tmp.max = max;
  }
  if (allowExitOnIdle !== undefined) {
    tmp.allowExitOnIdle = allowExitOnIdle;
  }
  var tmp$1 = {};
  if (user !== undefined) {
    tmp$1.user = user;
  }
  if (password !== undefined) {
    tmp$1.password = Caml_option.valFromOption(password);
  }
  if (host !== undefined) {
    tmp$1.host = host;
  }
  if (database !== undefined) {
    tmp$1.database = database;
  }
  if (port !== undefined) {
    tmp$1.port = port;
  }
  if (connectionString !== undefined) {
    tmp$1.connectionString = connectionString;
  }
  if (statement_timeout !== undefined) {
    tmp$1.statement_timeout = statement_timeout;
  }
  if (query_timeout !== undefined) {
    tmp$1.query_timeout = query_timeout;
  }
  if (application_name !== undefined) {
    tmp$1.application_name = application_name;
  }
  if (connectionTimeoutMillis !== undefined) {
    tmp$1.connectionTimeoutMillis = connectionTimeoutMillis;
  }
  if (idle_in_transaction_session_timeout !== undefined) {
    tmp$1.idle_in_transaction_session_timeout = idle_in_transaction_session_timeout;
  }
  if (ssl !== undefined) {
    tmp$1.ssl = Caml_option.valFromOption(ssl);
  }
  if (types !== undefined) {
    tmp$1.types = Caml_option.valFromOption(types);
  }
  return new Pg.Pool(merge(tmp, tmp$1));
}

function connectCb$1(pool, cb) {
  pool.connect(function (err, client, release) {
        if (err == null) {
          if (client == null) {
            return Js_exn.raiseError("pool.connect(.., cb) has called the cb with neither error nor result");
          } else {
            return Curry._2(cb, {
                        TAG: /* Ok */0,
                        _0: client
                      }, release);
          }
        } else {
          return Curry._2(cb, {
                      TAG: /* Error */1,
                      _0: err
                    }, release);
        }
      });
  
}

function endCb$1(client, cb) {
  client.end(function (err) {
        return Curry._1(cb, (err == null) ? ({
                        TAG: /* Ok */0,
                        _0: undefined
                      }) : ({
                        TAG: /* Error */1,
                        _0: err
                      }));
      });
  
}

var Pool = {
  make: make$1,
  connectCb: connectCb$1,
  endCb: endCb$1
};

function query(client, parameters, queryString) {
  return client.query(queryString, parameters);
}

function queryCb(client, parameters, queryString, cb) {
  var tmp = {
    text: queryString
  };
  if (parameters !== undefined) {
    tmp.values = Caml_option.valFromOption(parameters);
  }
  client.query(tmp, (function (err, res) {
          return Curry._1(cb, (err == null) ? (
                        (res == null) ? Js_exn.raiseError("client.query(.., cb) has called the cb with neither error nor result") : ({
                              TAG: /* Ok */0,
                              _0: res
                            })
                      ) : ({
                          TAG: /* Error */1,
                          _0: err
                        }));
        }));
  
}

function queryConfCb(client, obj, cb) {
  client.query(obj, (function (err, res) {
          return Curry._1(cb, (err == null) ? (
                        (res == null) ? Js_exn.raiseError("client.query(.., cb) has called the cb with neither error nor result") : ({
                              TAG: /* Ok */0,
                              _0: res
                            })
                      ) : ({
                          TAG: /* Error */1,
                          _0: err
                        }));
        }));
  
}

export {
  Password ,
  TypesParser ,
  QueryConfig ,
  QueryResult ,
  $$Notification ,
  NoticeMessage ,
  DatabaseError ,
  Config ,
  Client ,
  PoolConfig ,
  Pool ,
  query ,
  queryCb ,
  queryConfCb ,
  
}
/* pg Not a pure module */
