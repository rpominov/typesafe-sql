// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Pg = require("pg");
var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Loader = require("@typesafe-sql/rescript-common/lib/js/src/Loader.bs.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var LogError = require("@typesafe-sql/rescript-common/lib/js/src/LogError.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Queries$DescribeQuery = require("./Queries.bs.js");
var DescribeQueryBasic = require("@typesafe-sql/describe-query-basic");

function terminate(client) {
  client.terminating = true;
  var promise = client.terminationResult;
  if (promise !== undefined) {
    return Caml_option.valFromOption(promise);
  }
  var promise$1 = $$Promise.map($$Promise.all2([
            client.basicClient.terminate(),
            client.pgClient.end()
          ]), (function (param) {
          var match = client.onUnexpectedTerminationCb;
          var match$1 = client.fatalError;
          if (match !== undefined && match$1 !== undefined) {
            return Curry._1(match, Caml_option.valFromOption(match$1));
          }
          
        }));
  client.terminationResult = Caml_option.some(promise$1);
  return promise$1;
}

function make(pgConfig, onUnexpectedTermination, param) {
  var config = pgConfig !== undefined ? Caml_option.valFromOption(pgConfig) : ({});
  var pgClient = new Pg.Client(config);
  var clientRef = {
    contents: undefined
  };
  var onFatalError = function (error) {
    var client = clientRef.contents;
    if (client === undefined) {
      return ;
    }
    var match = client.fatalError;
    if (match !== undefined) {
      return ;
    } else {
      client.fatalError = Caml_option.some(error);
      terminate(client);
      return ;
    }
  };
  var onEnd = function (param) {
    var client = clientRef.contents;
    var terminating = client !== undefined ? client.terminating : false;
    if (!terminating) {
      return onFatalError(new Error("Postgres client's connection has been terminated unexpectedly, without a error"));
    }
    
  };
  pgClient.once("error", onFatalError).once("end", onEnd);
  var partial_arg = "Failed to connect to node-postgres client";
  return $$Promise.mapOk($$Promise.chainOk($$Promise.$$catch(pgClient.connect(), (function (param) {
                        return LogError.wrapExn(partial_arg, param);
                      })), (function (param) {
                    var partial_arg = "Failed to connect to describe-query-basic client";
                    return $$Promise.$$catch(DescribeQueryBasic.createClient(config, onFatalError), (function (param) {
                                  return LogError.wrapExn(partial_arg, param);
                                }));
                  })), (function (basicClient) {
                var client = {
                  pgClient: pgClient,
                  basicClient: basicClient,
                  typesLoader: Loader.make((function (keys) {
                          return Queries$DescribeQuery.GetTypes.run(pgClient, {
                                      typeIds: keys
                                    });
                        }), (function (prim) {
                          return prim.toString();
                        }), (function (row) {
                          return Belt_Option.getExn(row.oid).toString();
                        })),
                  fieldsLoader: Loader.make((function (keys) {
                          return Queries$DescribeQuery.GetAttributes.run(pgClient, {
                                      relIds: keys.map(function (prim) {
                                            return prim[0];
                                          })
                                    });
                        }), (function (param) {
                          return [
                                    param[0],
                                    param[1]
                                  ].join("|");
                        }), (function (row) {
                          return [
                                    Belt_Option.getExn(row.attrelid),
                                    Belt_Option.getExn(row.attnum)
                                  ].join("|");
                        })),
                  onUnexpectedTerminationCb: onUnexpectedTermination,
                  terminating: false,
                  terminationResult: undefined,
                  fatalError: undefined
                };
                clientRef.contents = client;
                return {
                        TAG: /* Ok */0,
                        _0: client
                      };
              }));
}

function getBaseInfo(dataType) {
  switch (dataType.TAG | 0) {
    case /* Pseudo */0 :
    case /* Base */1 :
        return dataType._0;
    default:
      var obj = dataType._0;
      return {
              oid: obj.oid,
              name: obj.name,
              namespace: obj.namespace,
              len: obj.len,
              byVal: obj.byVal,
              typeType: obj.typeType,
              category: obj.category,
              isPreferred: obj.isPreferred,
              isDefined: obj.isDefined
            };
  }
}

function loadType(client, oid) {
  if (client.terminationResult !== undefined) {
    Js_exn.raiseError("The client has been terminated");
  }
  return $$Promise.chain(Loader.get(client.typesLoader, oid), (function (opt) {
                if (opt === undefined) {
                  return $$Promise.resolve(undefined);
                }
                var x = Belt_Option.getExn(opt.typtype);
                var typeType;
                switch (x) {
                  case "b" :
                      typeType = "b";
                      break;
                  case "c" :
                      typeType = "c";
                      break;
                  case "d" :
                      typeType = "d";
                      break;
                  case "e" :
                      typeType = "e";
                      break;
                  case "m" :
                      typeType = "m";
                      break;
                  case "p" :
                      typeType = "p";
                      break;
                  case "r" :
                      typeType = "r";
                      break;
                  default:
                    typeType = Js_exn.raiseError("Unexpected value of pg_type.typtype: " + x);
                }
                var x$1 = Belt_Option.getExn(opt.typcategory);
                var category;
                switch (x$1) {
                  case "A" :
                      category = "A";
                      break;
                  case "B" :
                      category = "B";
                      break;
                  case "C" :
                      category = "C";
                      break;
                  case "D" :
                      category = "D";
                      break;
                  case "E" :
                      category = "E";
                      break;
                  case "G" :
                      category = "G";
                      break;
                  case "I" :
                      category = "I";
                      break;
                  case "N" :
                      category = "N";
                      break;
                  case "P" :
                      category = "P";
                      break;
                  case "R" :
                      category = "R";
                      break;
                  case "S" :
                      category = "S";
                      break;
                  case "T" :
                      category = "T";
                      break;
                  case "U" :
                      category = "U";
                      break;
                  case "V" :
                      category = "V";
                      break;
                  case "X" :
                      category = "X";
                      break;
                  default:
                    category = Js_exn.raiseError("Unexpected value of pg_type.typcategory: " + x$1);
                }
                var byVal = Belt_Option.getExn(opt.typbyval);
                var oid = Belt_Option.getExn(opt.oid);
                var name = Belt_Option.getExn(opt.typname);
                var namespace = Belt_Option.getExn(opt.typnamespace);
                var len = Belt_Option.getExn(opt.typlen);
                var isPreferred = Belt_Option.getExn(opt.typispreferred);
                var isDefined = Belt_Option.getExn(opt.typisdefined);
                if (typeType === "c") {
                  return $$Promise.map($$Promise.all(Belt_Option.getExn(opt.attr_types).map(function (oid) {
                                      return loadType(client, oid);
                                    })), (function (dataTypes) {
                                return {
                                        TAG: /* Composite */6,
                                        _0: {
                                          typeType: typeType,
                                          category: category,
                                          byVal: byVal,
                                          oid: oid,
                                          name: name,
                                          namespace: namespace,
                                          len: len,
                                          isPreferred: isPreferred,
                                          isDefined: isDefined,
                                          fields: Belt_Array.zip(Belt_Option.getExn(opt.attr_names), dataTypes.map(Belt_Option.getExn))
                                        }
                                      };
                              }));
                } else if (typeType === "d") {
                  return $$Promise.map(loadType(client, Belt_Option.getExn(opt.typbasetype)), (function (baseType) {
                                return {
                                        TAG: /* Domain */7,
                                        _0: {
                                          typeType: typeType,
                                          category: category,
                                          byVal: byVal,
                                          oid: oid,
                                          name: name,
                                          namespace: namespace,
                                          len: len,
                                          isPreferred: isPreferred,
                                          isDefined: isDefined,
                                          baseType: Belt_Option.getExn(baseType),
                                          notNull: Belt_Option.getExn(opt.typnotnull),
                                          nDims: Belt_Option.getExn(opt.typndims),
                                          default: opt.typdefault,
                                          typmod: Belt_Option.getExn(opt.typtypmod),
                                          collation: Belt_Option.getExn(opt.typcollation)
                                        }
                                      };
                              }));
                } else if (typeType === "e") {
                  return $$Promise.resolve({
                              TAG: /* Enum */3,
                              _0: {
                                typeType: typeType,
                                category: category,
                                byVal: byVal,
                                oid: oid,
                                name: name,
                                namespace: namespace,
                                len: len,
                                isPreferred: isPreferred,
                                isDefined: isDefined,
                                enumValues: Belt_Option.getExn(opt.enum_labels)
                              }
                            });
                } else if (typeType === "m") {
                  return $$Promise.map(loadType(client, Belt_Option.getExn(opt.rngsubtype)), (function (elemType) {
                                return {
                                        TAG: /* MultiRange */5,
                                        _0: {
                                          typeType: typeType,
                                          category: category,
                                          byVal: byVal,
                                          oid: oid,
                                          name: name,
                                          namespace: namespace,
                                          len: len,
                                          isPreferred: isPreferred,
                                          isDefined: isDefined,
                                          elemType: Belt_Option.getExn(elemType)
                                        }
                                      };
                              }));
                } else if (typeType === "p") {
                  return $$Promise.resolve({
                              TAG: /* Pseudo */0,
                              _0: {
                                typeType: typeType,
                                category: category,
                                byVal: byVal,
                                oid: oid,
                                name: name,
                                namespace: namespace,
                                len: len,
                                isPreferred: isPreferred,
                                isDefined: isDefined
                              }
                            });
                } else if (typeType === "r") {
                  return $$Promise.map(loadType(client, Belt_Option.getExn(opt.rngsubtype)), (function (elemType) {
                                return {
                                        TAG: /* Range */4,
                                        _0: {
                                          typeType: typeType,
                                          category: category,
                                          byVal: byVal,
                                          oid: oid,
                                          name: name,
                                          namespace: namespace,
                                          len: len,
                                          isPreferred: isPreferred,
                                          isDefined: isDefined,
                                          elemType: Belt_Option.getExn(elemType)
                                        }
                                      };
                              }));
                } else if (category === "A") {
                  return $$Promise.map(loadType(client, Belt_Option.getExn(opt.typelem)), (function (elemType) {
                                return {
                                        TAG: /* Array */2,
                                        _0: {
                                          typeType: typeType,
                                          category: category,
                                          byVal: byVal,
                                          oid: oid,
                                          name: name,
                                          namespace: namespace,
                                          len: len,
                                          isPreferred: isPreferred,
                                          isDefined: isDefined,
                                          delim: Belt_Option.getExn(opt.typdelim),
                                          elemType: Belt_Option.getExn(elemType)
                                        }
                                      };
                              }));
                } else {
                  return $$Promise.resolve({
                              TAG: /* Base */1,
                              _0: {
                                typeType: typeType,
                                category: category,
                                byVal: byVal,
                                oid: oid,
                                name: name,
                                namespace: namespace,
                                len: len,
                                isPreferred: isPreferred,
                                isDefined: isDefined
                              }
                            });
                }
              }));
}

function describe(client, query) {
  var error = client.fatalError;
  if (error !== undefined) {
    return $$Promise.reject(Js_exn.anyToExnInternal(Caml_option.valFromOption(error)));
  } else {
    return $$Promise.chain(client.basicClient.describe(query), (function (description) {
                  return $$Promise.map($$Promise.all3([
                                  $$Promise.all(description.parameters.map(function (id) {
                                            return loadType(client, id);
                                          })),
                                  $$Promise.all(Belt_Option.getWithDefault(description.row, []).map(function (x) {
                                            return loadType(client, x.dataTypeID);
                                          })),
                                  $$Promise.all(Belt_Option.getWithDefault(description.row, []).map(function (x) {
                                            return Loader.get(client.fieldsLoader, [
                                                        x.tableID,
                                                        x.columnID
                                                      ]);
                                          }))
                                ]), (function (param) {
                                var row = description.row;
                                return {
                                        parameters: param[0].map(Belt_Option.getExn),
                                        row: row !== undefined ? Belt_Array.zip(Belt_Array.zip(row, param[1]), param[2]).map(function (param) {
                                                var match = param[0];
                                                return {
                                                        name: match[0].name,
                                                        dataType: Belt_Option.getExn(match[1]),
                                                        tableColumn: param[1]
                                                      };
                                              }) : undefined
                                      };
                              }));
                }));
  }
}

exports.make = make;
exports.terminate = terminate;
exports.getBaseInfo = getBaseInfo;
exports.describe = describe;
/* pg Not a pure module */
