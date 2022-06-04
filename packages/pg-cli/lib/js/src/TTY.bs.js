// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Process = require("process");
var Context$Builder = require("./Context.bs.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");
var Caml_splice_call = require("rescript/lib/js/caml_splice_call.js");

function error(prim) {
  console.error(prim);
  
}

function error2(prim0, prim1) {
  console.error(prim0, prim1);
  
}

function error3(prim0, prim1, prim2) {
  console.error(prim0, prim1, prim2);
  
}

function errorMany(prim) {
  Caml_splice_call.spliceApply(console.error, [prim]);
  
}

function info(ctx, val0) {
  if (!Context$Builder.quiet(ctx)) {
    console.error(val0);
    return ;
  }
  
}

function info2(ctx, val0, val1) {
  if (!Context$Builder.quiet(ctx)) {
    console.error(val0, val1);
    return ;
  }
  
}

function info3(ctx, val0, val1, val2) {
  if (!Context$Builder.quiet(ctx)) {
    console.error(val0, val1, val2);
    return ;
  }
  
}

function infoNl(ctx) {
  return info(ctx, "");
}

function exitWithLoggableError(err) {
  console.error("ERROR!");
  var prim = Loggable$Errors.toString(err);
  console.error(prim);
  return Process.exit(1);
}

function exitWithError(err) {
  return exitWithLoggableError(Loggable$Errors.fromText(err));
}

exports.error = error;
exports.error2 = error2;
exports.error3 = error3;
exports.errorMany = errorMany;
exports.info = info;
exports.info2 = info2;
exports.info3 = info3;
exports.infoNl = infoNl;
exports.exitWithLoggableError = exitWithLoggableError;
exports.exitWithError = exitWithError;
/* process Not a pure module */
