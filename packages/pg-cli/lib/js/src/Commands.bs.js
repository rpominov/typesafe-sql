// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Promises = require("fs/promises");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");
var Fs$TypesafeSqlPgCli = require("./Fs.bs.js");
var TTY$TypesafeSqlPgCli = require("./TTY.bs.js");
var Context$TypesafeSqlPgCli = require("./Context.bs.js");
var Process$TypesafeSqlPgCli = require("./Process.bs.js");
var Loggable$TypesafeSqlErrors = require("@typesafe-sql/rescript-errors/lib/js/src/Loggable.bs.js");
var Parser$TypesafeSqlExtendedSQL = require("@typesafe-sql/rescript-extended-sql/lib/js/src/Parser.bs.js");
var Printer$TypesafeSqlExtendedSQL = require("@typesafe-sql/rescript-extended-sql/lib/js/src/Printer.bs.js");
var Client$TypesafeSqlDescribeQuery = require("@typesafe-sql/rescript-describe-query/lib/js/src/Client.bs.js");

function mapAsyncSeq(arr, fn) {
  return Belt_Array.reduce(arr, $$Promise.resolve([]), (function (acc, item) {
                return $$Promise.chain(acc, (function (arr) {
                              return $$Promise.map(Curry._1(fn, item), (function (val) {
                                            return Belt_Array.concat(arr, [val]);
                                          }));
                            }));
              }));
}

function mapParameters(parameters, fn) {
  return Js_dict.map((function (x) {
                var variant = x.NAME;
                if (variant === "Parameter") {
                  return {
                          NAME: "Parameter",
                          VAL: {
                            dataType: Curry._1(fn, x.VAL.dataType)
                          }
                        };
                }
                if (variant === "RawParameter") {
                  return x;
                }
                var match = x.VAL;
                return {
                        NAME: "BatchParameter",
                        VAL: {
                          separator: match.separator,
                          fields: mapParameters(match.fields, fn)
                        }
                      };
              }), parameters);
}

function build(ctx) {
  var sources = Process$TypesafeSqlPgCli.getSomeOrExitWithError(Context$TypesafeSqlPgCli.sources(ctx), "No sources specified");
  var generator = Process$TypesafeSqlPgCli.getSomeOrExitWithError(Context$TypesafeSqlPgCli.generator(ctx), "No generator specified");
  return $$Promise.done($$Promise.chain(Client$TypesafeSqlDescribeQuery.make(Caml_option.some(Context$TypesafeSqlPgCli.pgConfig(ctx)), undefined, undefined), (function (client) {
                    var client$1 = Process$TypesafeSqlPgCli.getOkOrExitWithError(undefined, client);
                    return $$Promise.chain(mapAsyncSeq(sources, (function (source) {
                                      return $$Promise.chain(Fs$TypesafeSqlPgCli.resolveGlobs(source.input), (function (files) {
                                                    return mapAsyncSeq(Process$TypesafeSqlPgCli.getOkOrExitWithError(undefined, files), (function (path) {
                                                                  return $$Promise.chain(Process$TypesafeSqlPgCli.catchAndExitWithError("Unable to read file \"" + path + "\". Reason:", Promises.readFile(path, "utf8")), (function (content) {
                                                                                var x = Parser$TypesafeSqlExtendedSQL.parseFile(content);
                                                                                var parsedFile;
                                                                                parsedFile = x.TAG === /* Ok */0 ? x._0 : Process$TypesafeSqlPgCli.exitWithError(undefined, x._0.message);
                                                                                var prinedStatements = Belt_Array.map(parsedFile.statements, (function (statement) {
                                                                                        var match = Printer$TypesafeSqlExtendedSQL.print(undefined, statement.ast);
                                                                                        return {
                                                                                                statement: statement,
                                                                                                sqlQueries: match[0],
                                                                                                parameters: match[1]
                                                                                              };
                                                                                      }));
                                                                                return $$Promise.chain($$Promise.chain(mapAsyncSeq(prinedStatements, (function (data) {
                                                                                                      return mapAsyncSeq(data.sqlQueries, (function (query) {
                                                                                                                    return $$Promise.map(Client$TypesafeSqlDescribeQuery.describe(client$1, query.trim()), (function (x) {
                                                                                                                                  return Process$TypesafeSqlPgCli.getOkOrExitWithError(undefined, x);
                                                                                                                                }));
                                                                                                                  }));
                                                                                                    })), (function (descriptions) {
                                                                                                  return Curry._1(generator.generate, {
                                                                                                              filePath: path,
                                                                                                              rawFileContent: content,
                                                                                                              separator: parsedFile.separator,
                                                                                                              statements: Belt_Array.mapWithIndex(prinedStatements, (function (i, data) {
                                                                                                                      var match = Belt_Array.getExn(Belt_Array.getExn(descriptions, i), 0);
                                                                                                                      var parameters = match.parameters;
                                                                                                                      return {
                                                                                                                              attributes: data.statement.attributes,
                                                                                                                              ast: data.statement.ast,
                                                                                                                              parameters: mapParameters(data.parameters, (function (index) {
                                                                                                                                      return Belt_Array.getExn(parameters, index);
                                                                                                                                    })),
                                                                                                                              row: match.row
                                                                                                                            };
                                                                                                                    }))
                                                                                                            });
                                                                                                })), (function (generatedCode) {
                                                                                              var getOutputPath = Belt_Option.getWithDefault(source.output, generator.defaultOutputPath);
                                                                                              var outputPath;
                                                                                              try {
                                                                                                outputPath = Curry._1(getOutputPath, path);
                                                                                              }
                                                                                              catch (raw_exn){
                                                                                                var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
                                                                                                outputPath = Process$TypesafeSqlPgCli.exitWithLoggableError(undefined, Loggable$TypesafeSqlErrors.fromExnVerbose(exn));
                                                                                              }
                                                                                              return Process$TypesafeSqlPgCli.catchAndExitWithError(undefined, Promises.writeFile(outputPath, generatedCode, "utf8"));
                                                                                            }));
                                                                              }));
                                                                }));
                                                  }));
                                    })), (function (param) {
                                  return Process$TypesafeSqlPgCli.catchAndExitWithError(undefined, Client$TypesafeSqlDescribeQuery.terminate(client$1));
                                }));
                  })), (function (param) {
                
              }));
}

function watch(ctx) {
  return TTY$TypesafeSqlPgCli.info(ctx, "TODO: watch");
}

function pipe(ctx) {
  return TTY$TypesafeSqlPgCli.info(ctx, "TODO: pipe");
}

var $$Array;

var Loggable;

exports.$$Array = $$Array;
exports.Loggable = Loggable;
exports.mapAsyncSeq = mapAsyncSeq;
exports.mapParameters = mapParameters;
exports.build = build;
exports.watch = watch;
exports.pipe = pipe;
/* Promise Not a pure module */
