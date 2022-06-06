// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Chokidar = require("rescript-chokidar/lib/js/Chokidar.bs.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");

var Stat = {};

var Path$1 = {};

function resolveGlobs(globs) {
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
  return $$Promise.chain($$Promise.mapOk($$Promise.$$catch($$Promise.make(function (resolve) {
                          var watcher$p = Chokidar.watchMany(undefined, globs);
                          watcher.contents = Caml_option.some(watcher$p);
                          watcher$p.on("error", (function (err) {
                                    return Curry._1(resolve, {
                                                TAG: /* Error */1,
                                                _0: Loggable$Errors.fromJsExn(err)
                                              });
                                  })).on("ready", (function (param) {
                                  return Curry._1(resolve, {
                                              TAG: /* Ok */0,
                                              _0: flatten(watcher$p.getWatched())
                                            });
                                }));
                          
                        }), Loggable$Errors.fromExnVerbose), (function (x) {
                    return x;
                  })), (function (res0) {
                return $$Promise.chain($$Promise.$$catch(close(undefined), Loggable$Errors.fromExnVerbose), (function (res1) {
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

exports.Stat = Stat;
exports.Path = Path$1;
exports.resolveGlobs = resolveGlobs;
/* path Not a pure module */
