// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");

var __isError = ((x) => x instanceof Error);

function fromJsExn(e) {
  if (!__isError(e)) {
    return e;
  }
  var m = e.message;
  if (m !== undefined && m !== "") {
    return m;
  } else {
    return e.stack;
  }
}

function fromExn(e) {
  if (e.RE_EXN_ID === Js_exn.$$Error) {
    return fromJsExn(e._1);
  } else {
    return e;
  }
}

function fromExnVerbose(e) {
  if (e.RE_EXN_ID === Js_exn.$$Error) {
    return e._1;
  } else {
    return e;
  }
}

function wrap(e, fn) {
  return {
          originalExn: e,
          msg: Curry._1(fn, e)
        };
}

function wrapNodeCbError(e) {
  return {
          originalExn: Js_exn.anyToExnInternal(e),
          msg: [fromJsExn(e)]
        };
}

function wrapThrownByUserProvidedFn(e) {
  return {
          originalExn: e,
          msg: [fromExnVerbose(e)]
        };
}

var Placeholder = /* @__PURE__ */Caml_exceptions.create("LogError-TypesafeSqlBuilder.Placeholder");

function wrapString(str) {
  return {
          originalExn: {
            RE_EXN_ID: Placeholder
          },
          msg: [str]
        };
}

function Loggable_make(prim) {
  return prim;
}

function Loggable_fromJsExnVerbose(prim) {
  return prim;
}

var Loggable = {
  make: Loggable_make,
  fromJsExn: fromJsExn,
  fromJsExnVerbose: Loggable_fromJsExnVerbose,
  fromExn: fromExn,
  fromExnVerbose: fromExnVerbose
};

exports.Loggable = Loggable;
exports.wrap = wrap;
exports.wrapNodeCbError = wrapNodeCbError;
exports.wrapThrownByUserProvidedFn = wrapThrownByUserProvidedFn;
exports.wrapString = wrapString;
/* No side effect */
