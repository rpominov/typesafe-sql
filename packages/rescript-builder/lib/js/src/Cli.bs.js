// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Process = require("process");
var Js_types = require("rescript/lib/js/js_types.js");
var Minimist = require("minimist");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

function get(r, k) {
  var $$float = Js_types.classify(r[k]);
  if (typeof $$float === "number") {
    switch ($$float) {
      case /* JSFalse */0 :
          return {
                  TAG: /* Bool */0,
                  _0: false
                };
      case /* JSTrue */1 :
          return {
                  TAG: /* Bool */0,
                  _0: true
                };
      case /* JSNull */2 :
      case /* JSUndefined */3 :
          return /* Unset */0;
      
    }
  } else {
    switch ($$float.TAG | 0) {
      case /* JSNumber */0 :
          return {
                  TAG: /* Float */2,
                  _0: $$float._0
                };
      case /* JSString */1 :
          return {
                  TAG: /* String */1,
                  _0: $$float._0
                };
      default:
        throw {
              RE_EXN_ID: "Assert_failure",
              _1: [
                "Cli.res",
                16,
                11
              ],
              Error: new Error()
            };
    }
  }
}

function parse(paramsOpt, flags, aliases, stopEarly, separate, onUnknown, argv) {
  var params = paramsOpt !== undefined ? paramsOpt : [];
  return Minimist(argv, {
              string: ["_"].concat(params),
              boolean: flags,
              alias: aliases,
              stopEarly: stopEarly,
              "--": separate,
              unknown: onUnknown
            });
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

var command = match[0];

var UnknownArg = /* @__PURE__ */Caml_exceptions.create("Cli-Errors.UnknownArg");

var InvalidFlag = /* @__PURE__ */Caml_exceptions.create("Cli-Errors.InvalidFlag");

var parsedArgv;

try {
  var result = parse([
        "generator",
        "out",
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
        "help",
        "quiet"
      ], {
        version: "v",
        generator: "g",
        debug: "D",
        out: "o",
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
        }), match[1]);
  var match$1 = result["--"];
  if (match$1 !== undefined && match$1.length !== 0) {
    throw {
          RE_EXN_ID: UnknownArg,
          _1: "--",
          Error: new Error()
        };
  }
  var getFlagExn = function (name) {
    var v = get(result, name);
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
    var val = get(result, name);
    if (typeof val === "number" || val.TAG !== /* String */1) {
      return ;
    } else {
      return val._0;
    }
  };
  parsedArgv = {
    TAG: /* Ok */0,
    _0: {
      version: getFlagExn("version"),
      debug: getFlagExn("debug"),
      help: getFlagExn("help"),
      quiet: getFlagExn("quiet"),
      generator: getParam("generator"),
      out: getParam("out"),
      config: getParam("config"),
      host: getParam("host"),
      port: getParam("port"),
      username: getParam("username"),
      password: getParam("password"),
      dbname: getParam("dbname"),
      connection: getParam("connection"),
      inputs: result._
    }
  };
}
catch (raw_name){
  var name = Caml_js_exceptions.internalToOCamlException(raw_name);
  if (name.RE_EXN_ID === UnknownArg) {
    parsedArgv = {
      TAG: /* Error */1,
      _0: "Unknown argument: " + name._1
    };
  } else if (name.RE_EXN_ID === InvalidFlag) {
    var str = name._2;
    var name$1 = name._1;
    if (typeof str === "number") {
      parsedArgv = {
        TAG: /* Error */1,
        _0: "Invalid flag value: --" + name$1
      };
    } else {
      switch (str.TAG | 0) {
        case /* Bool */0 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1
            };
            break;
        case /* String */1 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1 + " = " + str._0
            };
            break;
        case /* Float */2 :
            parsedArgv = {
              TAG: /* Error */1,
              _0: "Invalid flag value: --" + name$1 + " = " + str._0.toString()
            };
            break;
        
      }
    }
  } else {
    throw name;
  }
}

function exitWithError(err) {
  console.log("Error! " + err + "\n");
  console.log("TODO: show help");
  return Process.exit(1);
}

var exit = 0;

if (command !== undefined) {
  switch (command) {
    case "build" :
        if (parsedArgv.TAG === /* Ok */0) {
          console.log("TODO: build");
        } else {
          exit = 1;
        }
        break;
    case "pipe" :
        if (parsedArgv.TAG === /* Ok */0) {
          console.log("TODO: pipe mode");
        } else {
          exit = 1;
        }
        break;
    case "watch" :
        if (parsedArgv.TAG === /* Ok */0) {
          console.log("TODO: watch");
        } else {
          exit = 1;
        }
        break;
    default:
      exitWithError("Unknown command: " + command);
  }
} else if (parsedArgv.TAG === /* Ok */0) {
  if (parsedArgv._0.version) {
    console.log("TODO: show version");
  } else {
    console.log("TODO: show help");
  }
} else {
  exit = 1;
}

if (exit === 1) {
  if (parsedArgv.TAG === /* Ok */0) {
    exitWithError("Unknown command: " + command);
  } else {
    exitWithError(parsedArgv._0);
  }
}

/* x Not a pure module */
