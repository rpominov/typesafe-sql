// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Path = require("path");
var Curry = require("rescript/lib/js/curry.js");
var Process = require("process");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Fs$Builder = require("./Fs.bs.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var PathRebuild = require("rescript-path-rebuild/lib/js/PathRebuild.bs.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");
var Require$Builder = require("./Require.bs.js");
var Minimist$Builder = require("./Minimist.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function exitWithError(err) {
  Loggable$Errors.log(undefined, err);
  console.log("");
  console.log("TODO: show help");
  return Process.exit(1);
}

var x = Belt_Array.get(Process.argv, 2);

var match = x !== undefined ? (
    x.startsWith("-") ? [
        undefined,
        Process.argv.slice(2)
      ] : [
        x,
        Process.argv.slice(3)
      ]
  ) : [
    undefined,
    []
  ];

var unparsedArgv = match[1];

var command = match[0];

var command$1;

if (command !== undefined) {
  switch (command) {
    case "build" :
        command$1 = "build";
        break;
    case "pipe" :
        command$1 = "pipe";
        break;
    case "watch" :
        command$1 = "watch";
        break;
    default:
      command$1 = exitWithError(Loggable$Errors.fromText("Unknown command: " + command));
  }
} else {
  command$1 = "help";
}

var UnknownArg = /* @__PURE__ */Caml_exceptions.create("Cli-Builder.UnknownArg");

var InvalidFlag = /* @__PURE__ */Caml_exceptions.create("Cli-Builder.InvalidFlag");

var argv;

try {
  var result = Minimist$Builder.parse([
        "generator",
        "output",
        "input",
        "config",
        "host",
        "port",
        "username",
        "password",
        "dbname",
        "connection"
      ], [
        "version",
        "debug",
        "quiet"
      ], {
        version: "v",
        generator: "g",
        debug: "D",
        input: "i",
        output: "o",
        quiet: "q",
        config: "c",
        host: "h",
        port: "p",
        username: "U",
        password: "W",
        dbname: "d",
        connection: "C"
      }, undefined, true, (function (s) {
          if (!s.startsWith("-")) {
            return true;
          }
          throw {
                RE_EXN_ID: UnknownArg,
                _1: s,
                Error: new Error()
              };
        }), unparsedArgv);
  if (unparsedArgv.includes("--")) {
    throw {
          RE_EXN_ID: UnknownArg,
          _1: "--",
          Error: new Error()
        };
  }
  var arr = result._;
  if (arr.length !== 0) {
    throw {
          RE_EXN_ID: UnknownArg,
          _1: arr[0],
          Error: new Error()
        };
  }
  var getFlagExn = function (name) {
    var v = Minimist$Builder.get(result, name);
    if (typeof v === "number") {
      throw {
            RE_EXN_ID: InvalidFlag,
            _1: name,
            _2: v,
            Error: new Error()
          };
    }
    switch (v.TAG | 0) {
      case /* Bool */0 :
          return v._0;
      case /* String */1 :
          switch (v._0) {
            case "false" :
                return false;
            case "true" :
                return true;
            default:
              throw {
                    RE_EXN_ID: InvalidFlag,
                    _1: name,
                    _2: v,
                    Error: new Error()
                  };
          }
      case /* Float */2 :
          throw {
                RE_EXN_ID: InvalidFlag,
                _1: name,
                _2: v,
                Error: new Error()
              };
      
    }
  };
  var getParam = function (name) {
    var val = Minimist$Builder.get(result, name);
    if (typeof val === "number" || val.TAG !== /* String */1) {
      return ;
    } else {
      return val._0;
    }
  };
  argv = {
    version: getFlagExn("version"),
    debug: getFlagExn("debug"),
    quiet: getFlagExn("quiet"),
    generator: getParam("generator"),
    input: getParam("input"),
    output: getParam("output"),
    config: getParam("config"),
    host: getParam("host"),
    port: getParam("port"),
    username: getParam("username"),
    password: getParam("password"),
    dbname: getParam("dbname"),
    connection: getParam("connection")
  };
}
catch (raw_name){
  var name = Caml_js_exceptions.internalToOCamlException(raw_name);
  if (name.RE_EXN_ID === UnknownArg) {
    argv = exitWithError(Loggable$Errors.fromText("Unknown argument: " + name._1));
  } else if (name.RE_EXN_ID === InvalidFlag) {
    var str = name._2;
    var name$1 = name._1;
    if (typeof str === "number") {
      argv = exitWithError(Loggable$Errors.fromText("Invalid flag value: --" + name$1));
    } else {
      switch (str.TAG | 0) {
        case /* Bool */0 :
            argv = exitWithError(Loggable$Errors.fromText("Invalid flag value: --" + name$1));
            break;
        case /* String */1 :
            argv = exitWithError(Loggable$Errors.fromText("Invalid flag value: --" + name$1 + " = " + str._0));
            break;
        case /* Float */2 :
            argv = exitWithError(Loggable$Errors.fromText("Invalid flag value: --" + name$1 + " = " + str._0.toString()));
            break;
        
      }
    }
  } else {
    throw name;
  }
}

if (argv.version) {
  console.log("0.1.0");
} else {
  var loadConfig = function (path) {
    var tmp;
    try {
      if (Fs.existsSync(path)) {
        var match = Fs$Builder.Stat.getType(path);
        if (match === "file") {
          var match$1 = Path.extname(path);
          switch (match$1) {
            case ".js" :
            case ".json" :
                tmp = {
                  TAG: /* Ok */0,
                  _0: Caml_option.some(require(Fs$Builder.makeAbsolute(path)))
                };
                break;
            default:
              tmp = {
                TAG: /* Error */1,
                _0: Loggable$Errors.fromText("Must be a .json or a .js file")
              };
          }
        } else {
          tmp = {
            TAG: /* Error */1,
            _0: Loggable$Errors.fromText("Not a file")
          };
        }
      } else {
        tmp = {
          TAG: /* Ok */0,
          _0: undefined
        };
      }
    }
    catch (raw_exn){
      var exn = Caml_js_exceptions.internalToOCamlException(raw_exn);
      tmp = {
        TAG: /* Error */1,
        _0: Loggable$Errors.fromExnVerbose(exn)
      };
    }
    return [
            path,
            tmp
          ];
  };
  var path = argv.config;
  var match$1;
  if (path !== undefined) {
    var res = loadConfig(path);
    var match$2 = res[1];
    match$1 = match$2.TAG === /* Ok */0 && match$2._0 === undefined ? [
        res[0],
        {
          TAG: /* Error */1,
          _0: Loggable$Errors.fromText("File doesn't exist")
        }
      ] : res;
  } else {
    var res$1 = loadConfig("./typesafe-sql-pg.config.json");
    var match$3 = res$1[1];
    if (match$3.TAG === /* Ok */0 && match$3._0 === undefined) {
      var res$2 = loadConfig("./typesafe-sql-pg.config.js");
      var match$4 = res$2[1];
      if (match$4.TAG === /* Ok */0 && match$4._0 === undefined) {
        var res$3 = loadConfig("./package.json");
        var match$5 = res$3[1];
        if (match$5.TAG === /* Ok */0) {
          var obj = match$5._0;
          if (obj !== undefined) {
            var obj$1 = Caml_option.valFromOption(obj);
            match$1 = [
              res$3[0],
              Require$Builder.validate(function (param) {
                    return Require$Builder.Validators.property(Require$Builder.Validators.cast(obj$1, Require$Builder.Validators.object, "This"), "typesafe-sql-pg", Require$Builder.Validators.nullable(Require$Builder.Validators.unknown));
                  })
            ];
          } else {
            match$1 = res$3;
          }
        } else {
          match$1 = res$3;
        }
      } else {
        match$1 = res$2;
      }
    } else {
      match$1 = res$1;
    }
  }
  var err = match$1[1];
  var path$1 = match$1[0];
  var match$6;
  if (err.TAG === /* Ok */0) {
    var obj$2 = err._0;
    if (obj$2 !== undefined) {
      var obj$3 = Caml_option.valFromOption(obj$2);
      match$6 = [
        path$1,
        Require$Builder.validate(function (param) {
              var obj$4 = Require$Builder.Validators.cast(obj$3, Require$Builder.Validators.object, "This");
              var some = Require$Builder.Validators.property(obj$4, "sources", Require$Builder.Validators.nullable(Require$Builder.Validators.arrayOf(Require$Builder.Validators.objectOf2("input", Require$Builder.Validators.either(Require$Builder.Validators.string, (function (x) {
                                      return [x];
                                    }), Require$Builder.Validators.arrayOf(Require$Builder.Validators.string), (function (xs) {
                                      return xs;
                                    })), "output", Require$Builder.Validators.nullable(Require$Builder.Validators.either(Require$Builder.Validators.string, (function (str) {
                                          var fn = PathRebuild.make(str);
                                          if (fn.TAG !== /* Ok */0) {
                                            return Require$Builder.Validators.raiseValidationError(Loggable$Errors.fromText("Invalid \"output\" value. " + fn._0));
                                          }
                                          var fn$1 = fn._0;
                                          return Curry.__1(fn$1);
                                        }), Require$Builder.Validators.$$function, (function (fn) {
                                          return fn;
                                        }))), (function (i, o) {
                                  return {
                                          input: i,
                                          output: o
                                        };
                                })))));
              return {
                      debug: Require$Builder.Validators.property(obj$4, "debug", Require$Builder.Validators.nullable(Require$Builder.Validators.bool)),
                      quiet: Require$Builder.Validators.property(obj$4, "quiet", Require$Builder.Validators.nullable(Require$Builder.Validators.bool)),
                      generator: Require$Builder.Validators.property(obj$4, "generator", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      host: Require$Builder.Validators.property(obj$4, "host", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      port: Require$Builder.Validators.property(obj$4, "port", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      username: Require$Builder.Validators.property(obj$4, "username", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      password: Require$Builder.Validators.property(obj$4, "password", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      dbname: Require$Builder.Validators.property(obj$4, "dbname", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      connection: Require$Builder.Validators.property(obj$4, "connection", Require$Builder.Validators.nullable(Require$Builder.Validators.string)),
                      sources: some !== undefined && some.length !== 0 ? some : undefined
                    };
            })
      ];
    } else {
      match$6 = [
        "%fallback",
        {
          TAG: /* Ok */0,
          _0: {
            debug: undefined,
            quiet: undefined,
            generator: undefined,
            host: undefined,
            port: undefined,
            username: undefined,
            password: undefined,
            dbname: undefined,
            connection: undefined,
            sources: undefined
          }
        }
      ];
    }
  } else {
    match$6 = [
      path$1,
      err
    ];
  }
  var data = match$6[1];
  var path$2 = match$6[0];
  var config;
  if (data.TAG === /* Ok */0) {
    if (!argv.quiet) {
      console.log("Using config from:", path$2);
    }
    config = data._0;
  } else {
    config = exitWithError(Loggable$Errors.prepend(data._0, "Failed to load config file \"" + path$2 + "\"! Reason:\n\n"));
  }
  console.log(config, argv);
  if (command$1 === "watch") {
    console.log("TODO: watch");
  } else if (command$1 === "pipe") {
    console.log("TODO: pipe");
  } else if (command$1 === "build") {
    console.log("TODO: build");
  } else {
    console.log("TODO: show help");
  }
}

/* x Not a pure module */
