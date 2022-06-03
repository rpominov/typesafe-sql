// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_types = require("rescript/lib/js/js_types.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Caml_exceptions = require("rescript/lib/js/caml_exceptions.js");
var Loggable$Errors = require("@typesafe-sql/rescript-errors/lib/js/Loggable.bs.js");
var Caml_js_exceptions = require("rescript/lib/js/caml_js_exceptions.js");

var Validation_error = /* @__PURE__ */Caml_exceptions.create("Require-Builder.Validation_error");

function validate(fn) {
  try {
    return {
            TAG: /* Ok */0,
            _0: Curry._1(fn, undefined)
          };
  }
  catch (raw_err){
    var err = Caml_js_exceptions.internalToOCamlException(raw_err);
    if (err.RE_EXN_ID === Validation_error) {
      return {
              TAG: /* Error */1,
              _0: err._1
            };
    }
    throw err;
  }
}

function failed(err) {
  throw {
        RE_EXN_ID: Validation_error,
        _1: err,
        Error: new Error()
      };
}

function unknown_cast(val) {
  return Caml_option.some(val);
}

var unknown = {
  name: "unknown",
  cast: unknown_cast
};

function object_cast(val) {
  var x = Js_types.classify(val);
  if (typeof x === "number" || x.TAG !== /* JSObject */3) {
    return ;
  } else {
    return Caml_option.some(x._0);
  }
}

var object = {
  name: "object",
  cast: object_cast
};

function string_cast(val) {
  var x = Js_types.classify(val);
  if (typeof x === "number" || x.TAG !== /* JSString */1) {
    return ;
  } else {
    return x._0;
  }
}

var string = {
  name: "string",
  cast: string_cast
};

function bool_cast(val) {
  var match = Js_types.classify(val);
  if (typeof match === "number") {
    if (match !== 1) {
      if (match !== 0) {
        return ;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  
}

var bool = {
  name: "bool",
  cast: bool_cast
};

function function_cast(val) {
  var f = Js_types.classify(val);
  if (typeof f === "number" || f.TAG !== /* JSFunction */2) {
    return ;
  } else {
    return Caml_option.some(f._0);
  }
}

var $$function = {
  name: "function",
  cast: function_cast
};

function array_cast(val) {
  var arr = Js_types.classify(val);
  if (typeof arr === "number") {
    return ;
  }
  if (arr.TAG !== /* JSObject */3) {
    return ;
  }
  var arr$1 = arr._0;
  if (Array.isArray(arr$1)) {
    return arr$1;
  }
  
}

var array = {
  name: "array",
  cast: array_cast
};

function arrayOf(validator) {
  return {
          name: "array<" + validator.name + ">",
          cast: (function (val) {
              var arr = array_cast(val);
              if (arr === undefined) {
                return ;
              }
              var acc = [];
              var _i = 0;
              while(true) {
                var i = _i;
                if (i >= arr.length) {
                  return acc;
                }
                var x = validator.cast(arr[i]);
                if (x === undefined) {
                  return ;
                }
                acc.push(Caml_option.valFromOption(x));
                _i = i + 1 | 0;
                continue ;
              };
            })
        };
}

function objectOf2(key1, validator1, key2, validator2, constructor) {
  return {
          name: "{" + key1 + ":" + validator1.name + "," + key2 + ":" + validator2.name + "}",
          cast: (function (val) {
              var obj = object_cast(val);
              if (obj === undefined) {
                return ;
              }
              var obj$1 = Caml_option.valFromOption(obj);
              var val1 = validator1.cast(obj$1[key1]);
              if (val1 === undefined) {
                return ;
              }
              var val2 = validator2.cast(obj$1[key2]);
              if (val2 !== undefined) {
                return Caml_option.some(Curry._2(constructor, Caml_option.valFromOption(val1), Caml_option.valFromOption(val2)));
              }
              
            })
        };
}

function nullable(validator) {
  return {
          name: "nullable<" + validator.name + ">",
          cast: (function (val) {
              if (val == null) {
                return Caml_option.some(undefined);
              }
              var some = validator.cast(val);
              if (some !== undefined) {
                return Caml_option.some(some);
              }
              
            })
        };
}

function either(validatorLeft, mapLeft, validatorRight, mapRight) {
  return {
          name: validatorLeft.name + "|" + validatorRight.name,
          cast: (function (val) {
              var x = validatorLeft.cast(val);
              if (x !== undefined) {
                var x$1 = Curry._1(mapLeft, Caml_option.valFromOption(x));
                if (x$1.TAG === /* Ok */0) {
                  return Caml_option.some(x$1._0);
                }
                throw {
                      RE_EXN_ID: Validation_error,
                      _1: x$1._0,
                      Error: new Error()
                    };
              }
              var x$2 = validatorRight.cast(val);
              if (x$2 === undefined) {
                return ;
              }
              var x$3 = Curry._1(mapRight, Caml_option.valFromOption(x$2));
              if (x$3.TAG === /* Ok */0) {
                return Caml_option.some(x$3._0);
              }
              throw {
                    RE_EXN_ID: Validation_error,
                    _1: x$3._0,
                    Error: new Error()
                  };
            })
        };
}

function cast(val, validator, name) {
  var x = validator.cast(val);
  if (x !== undefined) {
    return Caml_option.valFromOption(x);
  }
  var err = Loggable$Errors.prepend(Loggable$Errors.fromUnknown(val), name + " is not of type " + validator.name + ":");
  throw {
        RE_EXN_ID: Validation_error,
        _1: err,
        Error: new Error()
      };
}

function property(obj, key, validator) {
  return cast(obj[key], validator, "Property \"" + key + "\"");
}

var Validators = {
  failed: failed,
  unknown: unknown,
  object: object,
  string: string,
  bool: bool,
  $$function: $$function,
  array: array,
  arrayOf: arrayOf,
  objectOf2: objectOf2,
  nullable: nullable,
  either: either,
  cast: cast,
  property: property
};

exports.Validation_error = Validation_error;
exports.validate = validate;
exports.Validators = Validators;
/* No side effect */
