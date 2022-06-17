// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var $$Promise = require("@rpominov/rescript-promise/lib/js/Promise.bs.js");
var Process = require("process");
var Caml_option = require("rescript/lib/js/caml_option.js");
var TTY$TypesafeSqlPgCli = require("./TTY.bs.js");
var Loggable$TypesafeSqlErrors = require("@typesafe-sql/rescript-errors/lib/js/src/Loggable.bs.js");

var argv = Process.argv;

function exitWithLoggableError(usageOpt, err) {
  var usage = usageOpt !== undefined ? Caml_option.valFromOption(usageOpt) : undefined;
  TTY$TypesafeSqlPgCli.error("ERROR!");
  TTY$TypesafeSqlPgCli.printLoggable(err);
  if (usage !== undefined) {
    console.error("");
    console.error(TTY$TypesafeSqlPgCli.Chalk.dim(Caml_option.valFromOption(usage)));
  }
  return Process.exit(1);
}

function exitWithError(usage, err) {
  return exitWithLoggableError(usage, Loggable$TypesafeSqlErrors.fromText(err));
}

function getSomeOrExitWithError(option, message) {
  if (option !== undefined) {
    return Caml_option.valFromOption(option);
  } else {
    return exitWithLoggableError(undefined, Loggable$TypesafeSqlErrors.fromText(message));
  }
}

function getOkOrExitWithError(prepend, result) {
  if (result.TAG === /* Ok */0) {
    return result._0;
  }
  var error = result._0;
  return exitWithLoggableError(undefined, prepend !== undefined ? Loggable$TypesafeSqlErrors.prepend(error, prepend) : error);
}

function catchAndExitWithError(prepend, promise) {
  return $$Promise.map($$Promise.$$catch(promise, Loggable$TypesafeSqlErrors.fromExn), (function (param) {
                return getOkOrExitWithError(prepend, param);
              }));
}

var Loggable;

exports.argv = argv;
exports.Loggable = Loggable;
exports.exitWithLoggableError = exitWithLoggableError;
exports.exitWithError = exitWithError;
exports.getSomeOrExitWithError = getSomeOrExitWithError;
exports.getOkOrExitWithError = getOkOrExitWithError;
exports.catchAndExitWithError = catchAndExitWithError;
/* argv Not a pure module */
