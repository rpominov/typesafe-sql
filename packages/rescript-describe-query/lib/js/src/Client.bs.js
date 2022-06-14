// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Pg = require("@typesafe-sql/rescript-pg/lib/js/Pg.bs.js");
var Pg$1 = require("pg");
var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Js_null = require("rescript/lib/js/js_null.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Belt_Int = require("rescript/lib/js/belt_Int.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var Util$TypesafeSqlErrors = require("@typesafe-sql/rescript-errors/lib/js/src/Util.bs.js");
var Loggable$TypesafeSqlErrors = require("@typesafe-sql/rescript-errors/lib/js/src/Loggable.bs.js");
var Loader$TypesafeSqlDescribeQuery = require("./Loader.bs.js");
var Queries$TypesafeSqlDescribeQuery = require("./Queries.bs.js");
var DescribeQueryBasic = require("@typesafe-sql/describe-query-basic");

function exn(opt, loc) {
  if (opt !== undefined) {
    return Caml_option.valFromOption(opt);
  } else {
    return Js_exn.raiseError("Unexpected None at: " + loc);
  }
}

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
  var error;
  try {
    error = {
      TAG: /* Ok */0,
      _0: new Pg$1.Client(config)
    };
  }
  catch (raw_exn){
    var exn$1 = Caml_js_exceptions.internalToOCamlException(raw_exn);
    error = {
      TAG: /* Error */1,
      _0: Loggable$TypesafeSqlErrors.fromExnVerbose(exn$1)
    };
  }
  if (error.TAG !== /* Ok */0) {
    return $$Promise.resolve(error);
  }
  var pgClient = error._0;
  var clientRef = {
    contents: undefined
  };
  var onFatalError = function (error) {
    var client = clientRef.contents;
    if (client === undefined) {
      return Js_exn.raiseError("A fatal error received before describe query client has beed initalised");
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
      return onFatalError($$Promise.makeJsError("Postgres client's connection has been terminated unexpectedly, without a error"));
    }
    
  };
  pgClient.once("error", onFatalError).once("end", onEnd);
  return $$Promise.mapOk($$Promise.chainOk($$Promise.$$catch(pgClient.connect(), (function (exn) {
                        return Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromExn(exn), "Failed to connect to node-postgres client. Reason:");
                      })), (function (param) {
                    return $$Promise.$$catch(DescribeQueryBasic.createClient(config, onFatalError), (function (exn) {
                                  return Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromExn(exn), "Failed to connect to describe-query-basic client. Reason:");
                                }));
                  })), (function (basicClient) {
                var client = {
                  pgClient: pgClient,
                  basicClient: basicClient,
                  typesLoader: Loader$TypesafeSqlDescribeQuery.make((function (keys) {
                          return Queries$TypesafeSqlDescribeQuery.GetTypes.run(pgClient, {
                                      typeIds: keys
                                    });
                        }), (function (prim) {
                          return prim.toString();
                        }), (function (row) {
                          return exn(row.oid, "File \"Client.res\", line 126, characters 32-39").toString();
                        })),
                  fieldsLoader: Loader$TypesafeSqlDescribeQuery.make((function (keys) {
                          return Queries$TypesafeSqlDescribeQuery.GetAttributes.run(pgClient, {
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
                                    exn(row.attrelid, "File \"Client.res\", line 131, characters 38-45"),
                                    exn(row.attnum, "File \"Client.res\", line 131, characters 64-71")
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

function loadAll(items, loadItem) {
  return $$Promise.all(items.map(Curry.__1(loadItem)));
}

function loadType(client, oid) {
  return $$Promise.chain($$Promise.resolve(undefined), (function (param) {
                return $$Promise.chain(Loader$TypesafeSqlDescribeQuery.get(client.typesLoader, oid), (function (opt) {
                              if (opt === undefined) {
                                return Js_exn.raiseError("Data type with oid " + oid + " not found");
                              }
                              var x = exn(opt.typtype, "File \"Client.res\", line 151, characters 50-57");
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
                              var x$1 = exn(opt.typcategory, "File \"Client.res\", line 162, characters 54-61");
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
                              var byVal = exn(opt.typbyval, "File \"Client.res\", line 181, characters 41-48");
                              var oid$1 = exn(opt.oid, "File \"Client.res\", line 182, characters 34-41");
                              var name = exn(opt.typname, "File \"Client.res\", line 183, characters 39-46");
                              var namespace = exn(opt.typnamespace, "File \"Client.res\", line 184, characters 49-56");
                              var len = exn(opt.typlen, "File \"Client.res\", line 185, characters 37-44");
                              var isPreferred = exn(opt.typispreferred, "File \"Client.res\", line 186, characters 53-60");
                              var isDefined = exn(opt.typisdefined, "File \"Client.res\", line 187, characters 49-56");
                              return $$Promise.map(typeType === "c" ? $$Promise.map(loadAll(exn(opt.attr_types, "File \"Client.res\", line 209, characters 18-25"), (function (oid) {
                                                      return loadType(client, oid);
                                                    })), (function (dataTypes) {
                                                  return {
                                                          NAME: "Composite",
                                                          VAL: {
                                                            fields: Belt_Array.zip(exn(opt.attr_names, "File \"Client.res\", line 213, characters 60-67"), dataTypes)
                                                          }
                                                        };
                                                })) : (
                                            typeType === "d" ? $$Promise.map(loadType(client, exn(opt.typbasetype, "File \"Client.res\", line 219, characters 45-52")), (function (x) {
                                                      return {
                                                              NAME: "Domain",
                                                              VAL: {
                                                                baseType: x,
                                                                notNull: exn(opt.typnotnull, "File \"Client.res\", line 223, characters 46-53"),
                                                                nDims: exn(opt.typndims, "File \"Client.res\", line 224, characters 42-49"),
                                                                default: Js_null.fromOption(opt.typdefault),
                                                                typmod: exn(opt.typtypmod, "File \"Client.res\", line 226, characters 44-51"),
                                                                collation: exn(opt.typcollation, "File \"Client.res\", line 227, characters 50-57")
                                                              }
                                                            };
                                                    })) : (
                                                typeType === "e" ? $$Promise.resolve({
                                                        NAME: "Enum",
                                                        VAL: {
                                                          enumValues: exn(opt.enum_labels, "File \"Client.res\", line 205, characters 80-87")
                                                        }
                                                      }) : (
                                                    typeType === "r" || typeType === "m" ? $$Promise.map(loadType(client, exn(opt.rngsubtype, "File \"Client.res\", line 200, characters 44-51")), (function (x) {
                                                              if (typeType === "m") {
                                                                return {
                                                                        NAME: "MultiRange",
                                                                        VAL: {
                                                                          elemType: x
                                                                        }
                                                                      };
                                                              } else {
                                                                return {
                                                                        NAME: "Range",
                                                                        VAL: {
                                                                          elemType: x
                                                                        }
                                                                      };
                                                              }
                                                            })) : (
                                                        typeType === "p" ? $$Promise.resolve("Pseudo") : (
                                                            category === "A" ? $$Promise.map(loadType(client, exn(opt.typelem, "File \"Client.res\", line 192, characters 41-48")), (function (x) {
                                                                      return {
                                                                              NAME: "Array",
                                                                              VAL: {
                                                                                elemType: x,
                                                                                delim: exn(opt.typdelim, "File \"Client.res\", line 193, characters 78-85")
                                                                              }
                                                                            };
                                                                    })) : $$Promise.resolve("Base")
                                                          )
                                                      )
                                                  )
                                              )
                                          ), (function (data) {
                                            return {
                                                    oid: oid$1,
                                                    name: name,
                                                    namespace: namespace,
                                                    len: len,
                                                    byVal: byVal,
                                                    typeType: typeType,
                                                    category: category,
                                                    isPreferred: isPreferred,
                                                    isDefined: isDefined,
                                                    typeSpecificData: data
                                                  };
                                          }));
                            }));
              }));
}

function describe(client, query) {
  var promise = $$Promise.chainOk($$Promise.$$catch(client.basicClient.describe(query), (function (exn) {
              var dbErr = Pg.DatabaseError.fromExn(exn);
              if (dbErr === undefined) {
                return Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromExnVerbose(exn), "Could not get types for the query:\n" + query + "\nError:");
              }
              var str = dbErr.position;
              var pos = str !== undefined ? Belt_Int.fromString(str) : undefined;
              var highlighted = pos !== undefined ? (
                  pos !== 0 ? Util$TypesafeSqlErrors.highlight(query, pos - 1 | 0, pos - 1 | 0) : Util$TypesafeSqlErrors.highlight(query, 0, 0)
                ) : query;
              var base = Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromExn(exn), "Could not get types for the query:\n" + highlighted + "\nError:");
              var detail = dbErr.detail;
              var base$1 = detail !== undefined && detail !== "" ? Loggable$TypesafeSqlErrors.append(base, "\nDetail: " + detail) : base;
              var hint = dbErr.hint;
              if (hint !== undefined && hint !== "") {
                return Loggable$TypesafeSqlErrors.append(base$1, "\nHint: " + hint);
              } else {
                return base$1;
              }
            })), (function (description) {
          var parametersTypes = loadAll(description.parameters, (function (id) {
                  return loadType(client, id);
                }));
          var fieldsTypes = loadAll(Belt_Option.getWithDefault(description.row, []), (function (x) {
                  return loadType(client, x.dataTypeID);
                }));
          var tableColums = loadAll(Belt_Option.getWithDefault(description.row, []), (function (x) {
                  return Loader$TypesafeSqlDescribeQuery.get(client.fieldsLoader, [
                              x.tableID,
                              x.columnID
                            ]);
                }));
          return $$Promise.mapOk($$Promise.$$catch($$Promise.all3([
                              parametersTypes,
                              fieldsTypes,
                              tableColums
                            ]), (function (exn) {
                            return Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromExn(exn), "Failed to fetch additional information about query:\n" + query + "\nError:");
                          })), (function (param) {
                        var row = description.row;
                        return {
                                TAG: /* Ok */0,
                                _0: {
                                  parameters: param[0],
                                  row: row !== undefined ? Belt_Array.zip(Belt_Array.zip(row, param[1]), param[2]).map(function (param) {
                                          var tableColumn = param[1];
                                          var match = param[0];
                                          return {
                                                  name: match[0].name,
                                                  dataType: match[1],
                                                  tableColumn: tableColumn !== undefined ? ({
                                                        attrelid: Js_null.fromOption(tableColumn.attrelid),
                                                        attrelname: Js_null.fromOption(tableColumn.relname),
                                                        attname: exn(tableColumn.attname, "File \"Client.res\", line 325, characters 40-47"),
                                                        attnotnull: exn(tableColumn.attnotnull, "File \"Client.res\", line 326, characters 46-53"),
                                                        attnum: Js_null.fromOption(tableColumn.attnum),
                                                        attndims: exn(tableColumn.attndims, "File \"Client.res\", line 328, characters 42-49"),
                                                        atttypmod: exn(tableColumn.atttypmod, "File \"Client.res\", line 329, characters 44-51"),
                                                        attoptions: Js_null.fromOption(tableColumn.attoptions),
                                                        attfdwoptions: Js_null.fromOption(tableColumn.attfdwoptions)
                                                      }) : null
                                                };
                                        }) : null
                                }
                              };
                      }));
        }));
  return $$Promise.chain($$Promise.$$catch(promise, (function (err) {
                    return err;
                  })), (function (param) {
                var match = client.fatalError;
                var match$1 = client.terminationResult;
                if (match !== undefined) {
                  return $$Promise.resolve({
                              TAG: /* Error */1,
                              _0: Loggable$TypesafeSqlErrors.prepend(Loggable$TypesafeSqlErrors.fromJsExnVerbose(Caml_option.valFromOption(match)), "While fetching information about query:\n" + query + "\nthe describe-query client has been terminated as a result of a fatal error:")
                            });
                } else if (match$1 !== undefined) {
                  return $$Promise.resolve({
                              TAG: /* Error */1,
                              _0: Loggable$TypesafeSqlErrors.fromText("While fetching information about query:\n" + query + "\nthe describe-query client has been terminated by the user")
                            });
                } else {
                  return promise;
                }
              }));
}

exports.make = make;
exports.terminate = terminate;
exports.describe = describe;
/* Pg Not a pure module */