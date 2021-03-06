// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var PkgDir = require("pkg-dir");
var Process = require("process");
var Chokidar = require("rescript-chokidar/lib/js/Chokidar.bs.js");
var LogError = require("@typesafe-sql/rescript-common/lib/js/src/LogError.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");

function defaultRoot(param) {
  var x = PkgDir.sync();
  if (x !== undefined) {
    return x;
  } else {
    return Process.cwd();
  }
}

function resoloveRoot(custom) {
  if (custom !== undefined) {
    if (Path.isAbsolute(custom)) {
      return custom;
    } else {
      return Path.join(defaultRoot(undefined), custom);
    }
  } else {
    return defaultRoot(undefined);
  }
}

function resolve(root, globs) {
  var watcher = {
    contents: undefined
  };
  var close = function (param) {
    var watcher$p = watcher.contents;
    if (watcher$p !== undefined) {
      return Caml_option.valFromOption(watcher$p).close();
    } else {
      return $$Promise.resolve(undefined);
    }
  };
  var flatten = function (dict) {
    return Belt_Array.concatMany(Js_dict.entries(dict).map(function (param) {
                    var dir = param[0];
                    return param[1].map(function (file) {
                                return Path.join(dir, file);
                              });
                  }));
  };
  return $$Promise.chain($$Promise.mapOk($$Promise.$$catch($$Promise.make(function (resolvePr) {
                          var watcher$p = Chokidar.watchMany({
                                cwd: root
                              }, globs);
                          watcher.contents = Caml_option.some(watcher$p.on("error", (function (err) {
                                        return Curry._1(resolvePr, {
                                                    TAG: /* Error */1,
                                                    _0: LogError.wrapNodeCbError(err)
                                                  });
                                      })).on("ready", (function (param) {
                                      return Curry._1(resolvePr, {
                                                  TAG: /* Ok */0,
                                                  _0: flatten(watcher$p.getWatched())
                                                });
                                    })));
                          
                        }), LogError.wrapExnVerbose), (function (x) {
                    return x;
                  })), (function (res0) {
                return $$Promise.chain($$Promise.$$catch(close(undefined), LogError.wrapExnVerbose), (function (res1) {
                              var tmp;
                              tmp = res0.TAG === /* Ok */0 ? (
                                  res1.TAG === /* Ok */0 ? ({
                                        TAG: /* Ok */0,
                                        _0: res0._0
                                      }) : ({
                                        TAG: /* Error */1,
                                        _0: res1._0
                                      })
                                ) : ({
                                    TAG: /* Error */1,
                                    _0: res0._0
                                  });
                              return $$Promise.resolve(tmp);
                            }));
              }));
}

function read(path) {
  return $$Promise.make(function (resolve) {
              Fs.readFile(path, "utf8", (function (err, content) {
                      return Curry._1(resolve, (err == null) ? (
                                    content !== undefined ? ({
                                          TAG: /* Ok */0,
                                          _0: content
                                        }) : ({
                                          TAG: /* Ok */0,
                                          _0: ""
                                        })
                                  ) : ({
                                      TAG: /* Error */1,
                                      _0: LogError.wrapNodeCbError(err)
                                    }));
                    }));
              
            });
}

function write(path, content) {
  return $$Promise.make(function (resolve) {
              Fs.writeFile(path, content, "utf8", (function (err) {
                      return Curry._1(resolve, (err == null) ? ({
                                      TAG: /* Ok */0,
                                      _0: undefined
                                    }) : ({
                                      TAG: /* Error */1,
                                      _0: LogError.wrapNodeCbError(err)
                                    }));
                    }));
              
            });
}

function joinPath(prim0, prim1) {
  return Path.join(prim0, prim1);
}

exports.joinPath = joinPath;
exports.resolve = resolve;
exports.resoloveRoot = resoloveRoot;
exports.read = read;
exports.write = write;
/* fs Not a pure module */
