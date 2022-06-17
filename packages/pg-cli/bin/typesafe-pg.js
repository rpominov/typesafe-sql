#!/usr/bin/env node
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) =>
    key in obj
      ? __defProp(obj, key, {
          enumerable: true,
          configurable: true,
          writable: true,
          value,
        })
      : (obj[key] = value);
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __require = /* @__PURE__ */ ((x2) =>
    typeof require !== "undefined"
      ? require
      : typeof Proxy !== "undefined"
      ? new Proxy(x2, {
          get: (a, b) => (typeof require !== "undefined" ? require : a)[b],
        })
      : x2)(function (x2) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x2 + '" is not supported');
  });
  var __commonJS = (cb, mod) =>
    function __require2() {
      return (
        mod ||
          (0, cb[__getOwnPropNames(cb)[0]])(
            (mod = { exports: {} }).exports,
            mod
          ),
        mod.exports
      );
    };
  var __copyProps = (to, from, except, desc) => {
    if ((from && typeof from === "object") || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, {
            get: () => from[key],
            enumerable:
              !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
          });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (
    (target = mod != null ? __create(__getProtoOf(mod)) : {}),
    __copyProps(
      isNodeMode || !mod || !mod.__esModule
        ? __defProp(target, "default", { value: mod, enumerable: true })
        : target,
      mod
    )
  );

  // ../describe-query-basic/index.js
  var require_describe_query_basic = __commonJS({
    "../describe-query-basic/index.js"(exports) {
      var { Client: Client3, DatabaseError: DatabaseError3 } = __require("pg");
      var DescribeClient = class {
        async _connect(options) {
          const pgClient = new Client3(options);
          await pgClient.connect();
          pgClient.connection.removeAllListeners();
          this._connection = pgClient.connection;
          const onFatalError = (error2) => {
            this._fatalError = error2;
            this._connection.end();
          };
          for (const name of [
            "rowDescription",
            "parameterDescription",
            "readyForQuery",
          ]) {
            this._connection.on(name, (msg) => {
              if (this._listener) {
                this._listener(name, msg);
              } else {
                console.warn(`Unexpected ${name} message from DB server:`, msg);
              }
            });
          }
          this._connection.on("errorMessage", (msg) => {
            if (this._listener) {
              this._latestRequestError = msg;
              this._listener("error", msg);
            } else {
              onFatalError(msg);
            }
          });
          this._connection.on("error", onFatalError);
          this._connection.on("end", () => {
            if (!this._terminating && this._fatalError == null) {
              if (
                this._latestRequestError != null &&
                this._latestRequestError.severity === "FATAL"
              ) {
                this._fatalError = this._latestRequestError;
              } else {
                this._fatalError = new Error(
                  "Describe query client's connection has been terminated unexpectedly, without a error"
                );
              }
            }
            this._connection.removeAllListeners();
            this._connection = null;
            if (this._listener) {
              this._listener("error", this._fatalError);
            }
            if (this._onUnexpectedTerminationCb && this._fatalError != null) {
              this._onUnexpectedTerminationCb(this._fatalError);
            }
          });
        }
        async describe(query) {
          while (this._promise != null) {
            try {
              await this._promise;
            } catch (_) {}
          }
          if (this._fatalError) {
            throw this._fatalError;
          }
          if (this._terminating || this._connection == null) {
            throw new Error(
              "The describe-query-basic client has been terminated by the user"
            );
          }
          this._promise = new Promise((resolve2, reject) => {
            let rowDescription;
            let parameterDescription;
            let error2;
            const done2 = () => {
              this._listener = null;
              this._promise = null;
              if (error2) {
                reject(error2);
              } else {
                resolve2({
                  parameters:
                    parameterDescription && parameterDescription.dataTypeIDs,
                  row: rowDescription && rowDescription.fields,
                });
              }
            };
            this._listener = (tag, arg) => {
              switch (tag) {
                case "rowDescription":
                  rowDescription = arg;
                  break;
                case "parameterDescription":
                  parameterDescription = arg;
                  break;
                case "error":
                  if (error2 != null && error2 !== arg) {
                    console.error(arg);
                  } else {
                    error2 = arg;
                  }
                  if (this._fatalError != null) {
                    done2();
                  }
                  break;
                case "readyForQuery":
                  done2();
                  break;
              }
            };
            this._connection.parse({ name: "", text: query });
            this._connection.describe({ name: "", type: "S" });
            this._connection.sync();
          });
          return this._promise;
        }
        terminate() {
          if (!this._terminating && this._connection != null) {
            this._terminating = true;
            this._connection.end();
          }
          return new Promise((resolve2) => {
            if (this._connection != null) {
              this._connection.once("end", resolve2);
            } else {
              resolve2();
            }
          });
        }
      };
      exports.createClient = async (options, onUnexpectedTermination) => {
        const client = new DescribeClient();
        client._onUnexpectedTerminationCb = onUnexpectedTermination;
        await client._connect(options);
        return client;
      };
    },
  });

  // ../../node_modules/minimist/index.js
  var require_minimist = __commonJS({
    "../../node_modules/minimist/index.js"(exports, module) {
      module.exports = function (args, opts) {
        if (!opts) opts = {};
        var flags = { bools: {}, strings: {}, unknownFn: null };
        if (typeof opts["unknown"] === "function") {
          flags.unknownFn = opts["unknown"];
        }
        if (typeof opts["boolean"] === "boolean" && opts["boolean"]) {
          flags.allBools = true;
        } else {
          []
            .concat(opts["boolean"])
            .filter(Boolean)
            .forEach(function (key2) {
              flags.bools[key2] = true;
            });
        }
        var aliases = {};
        Object.keys(opts.alias || {}).forEach(function (key2) {
          aliases[key2] = [].concat(opts.alias[key2]);
          aliases[key2].forEach(function (x2) {
            aliases[x2] = [key2].concat(
              aliases[key2].filter(function (y) {
                return x2 !== y;
              })
            );
          });
        });
        []
          .concat(opts.string)
          .filter(Boolean)
          .forEach(function (key2) {
            flags.strings[key2] = true;
            if (aliases[key2]) {
              flags.strings[aliases[key2]] = true;
            }
          });
        var defaults = opts["default"] || {};
        var argv4 = { _: [] };
        Object.keys(flags.bools).forEach(function (key2) {
          setArg(key2, defaults[key2] === void 0 ? false : defaults[key2]);
        });
        var notFlags = [];
        if (args.indexOf("--") !== -1) {
          notFlags = args.slice(args.indexOf("--") + 1);
          args = args.slice(0, args.indexOf("--"));
        }
        function argDefined(key2, arg2) {
          return (
            (flags.allBools && /^--[^=]+$/.test(arg2)) ||
            flags.strings[key2] ||
            flags.bools[key2] ||
            aliases[key2]
          );
        }
        function setArg(key2, val, arg2) {
          if (arg2 && flags.unknownFn && !argDefined(key2, arg2)) {
            if (flags.unknownFn(arg2) === false) return;
          }
          var value2 =
            !flags.strings[key2] && isNumber(val) ? Number(val) : val;
          setKey(argv4, key2.split("."), value2);
          (aliases[key2] || []).forEach(function (x2) {
            setKey(argv4, x2.split("."), value2);
          });
        }
        function setKey(obj, keys, value2) {
          var o = obj;
          for (var i2 = 0; i2 < keys.length - 1; i2++) {
            var key2 = keys[i2];
            if (isConstructorOrProto(o, key2)) return;
            if (o[key2] === void 0) o[key2] = {};
            if (
              o[key2] === Object.prototype ||
              o[key2] === Number.prototype ||
              o[key2] === String.prototype
            )
              o[key2] = {};
            if (o[key2] === Array.prototype) o[key2] = [];
            o = o[key2];
          }
          var key2 = keys[keys.length - 1];
          if (isConstructorOrProto(o, key2)) return;
          if (
            o === Object.prototype ||
            o === Number.prototype ||
            o === String.prototype
          )
            o = {};
          if (o === Array.prototype) o = [];
          if (
            o[key2] === void 0 ||
            flags.bools[key2] ||
            typeof o[key2] === "boolean"
          ) {
            o[key2] = value2;
          } else if (Array.isArray(o[key2])) {
            o[key2].push(value2);
          } else {
            o[key2] = [o[key2], value2];
          }
        }
        function aliasIsBoolean(key2) {
          return aliases[key2].some(function (x2) {
            return flags.bools[x2];
          });
        }
        for (var i = 0; i < args.length; i++) {
          var arg = args[i];
          if (/^--.+=/.test(arg)) {
            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            var key = m[1];
            var value = m[2];
            if (flags.bools[key]) {
              value = value !== "false";
            }
            setArg(key, value, arg);
          } else if (/^--no-.+/.test(arg)) {
            var key = arg.match(/^--no-(.+)/)[1];
            setArg(key, false, arg);
          } else if (/^--.+/.test(arg)) {
            var key = arg.match(/^--(.+)/)[1];
            var next = args[i + 1];
            if (
              next !== void 0 &&
              !/^-/.test(next) &&
              !flags.bools[key] &&
              !flags.allBools &&
              (aliases[key] ? !aliasIsBoolean(key) : true)
            ) {
              setArg(key, next, arg);
              i++;
            } else if (/^(true|false)$/.test(next)) {
              setArg(key, next === "true", arg);
              i++;
            } else {
              setArg(key, flags.strings[key] ? "" : true, arg);
            }
          } else if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1, -1).split("");
            var broken = false;
            for (var j = 0; j < letters.length; j++) {
              var next = arg.slice(j + 2);
              if (next === "-") {
                setArg(letters[j], next, arg);
                continue;
              }
              if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                setArg(letters[j], next.split("=")[1], arg);
                broken = true;
                break;
              }
              if (
                /[A-Za-z]/.test(letters[j]) &&
                /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)
              ) {
                setArg(letters[j], next, arg);
                broken = true;
                break;
              }
              if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                setArg(letters[j], arg.slice(j + 2), arg);
                broken = true;
                break;
              } else {
                setArg(letters[j], flags.strings[letters[j]] ? "" : true, arg);
              }
            }
            var key = arg.slice(-1)[0];
            if (!broken && key !== "-") {
              if (
                args[i + 1] &&
                !/^(-|--)[^-]/.test(args[i + 1]) &&
                !flags.bools[key] &&
                (aliases[key] ? !aliasIsBoolean(key) : true)
              ) {
                setArg(key, args[i + 1], arg);
                i++;
              } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
                setArg(key, args[i + 1] === "true", arg);
                i++;
              } else {
                setArg(key, flags.strings[key] ? "" : true, arg);
              }
            }
          } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
              argv4._.push(
                flags.strings["_"] || !isNumber(arg) ? arg : Number(arg)
              );
            }
            if (opts.stopEarly) {
              argv4._.push.apply(argv4._, args.slice(i + 1));
              break;
            }
          }
        }
        Object.keys(defaults).forEach(function (key2) {
          if (!hasKey(argv4, key2.split("."))) {
            setKey(argv4, key2.split("."), defaults[key2]);
            (aliases[key2] || []).forEach(function (x2) {
              setKey(argv4, x2.split("."), defaults[key2]);
            });
          }
        });
        if (opts["--"]) {
          argv4["--"] = new Array();
          notFlags.forEach(function (key2) {
            argv4["--"].push(key2);
          });
        } else {
          notFlags.forEach(function (key2) {
            argv4._.push(key2);
          });
        }
        return argv4;
      };
      function hasKey(obj, keys) {
        var o = obj;
        keys.slice(0, -1).forEach(function (key2) {
          o = o[key2] || {};
        });
        var key = keys[keys.length - 1];
        return key in o;
      }
      function isNumber(x2) {
        if (typeof x2 === "number") return true;
        if (/^0x[0-9a-f]+$/i.test(x2)) return true;
        return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x2);
      }
      function isConstructorOrProto(obj, key) {
        return (
          (key === "constructor" && typeof obj[key] === "function") ||
          key === "__proto__"
        );
      }
    },
  });

  // ../../node_modules/rescript/lib/es6/caml_array.js
  function sub(x2, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while (j < len) {
      result[j] = x2[i];
      j = (j + 1) | 0;
      i = (i + 1) | 0;
    }
    return result;
  }
  function get(xs, index) {
    if (index < 0 || index >= xs.length) {
      throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "index out of bounds",
        Error: new Error(),
      };
    }
    return xs[index];
  }

  // ../../node_modules/rescript/lib/es6/curry.js
  function app(_f, _args) {
    while (true) {
      var args = _args;
      var f = _f;
      var init_arity = f.length;
      var arity = init_arity === 0 ? 1 : init_arity;
      var len = args.length;
      var d = (arity - len) | 0;
      if (d === 0) {
        return f.apply(null, args);
      }
      if (d >= 0) {
        return (function (f2, args2) {
          return function (x2) {
            return app(f2, args2.concat([x2]));
          };
        })(f, args);
      }
      _args = sub(args, arity, -d | 0);
      _f = f.apply(null, sub(args, 0, arity));
      continue;
    }
  }
  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1:
          return o(a0);
        case 2:
          return function (param) {
            return o(a0, param);
          };
        case 3:
          return function (param, param$1) {
            return o(a0, param, param$1);
          };
        case 4:
          return function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
        case 5:
          return function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
        case 6:
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
        case 7:
          return function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
        default:
          return app(o, [a0]);
      }
    }
  }
  function __1(o) {
    var arity = o.length;
    if (arity === 1) {
      return o;
    } else {
      return function (a0) {
        return _1(o, a0);
      };
    }
  }
  function _2(o, a0, a1) {
    var arity = o.length;
    if (arity === 2) {
      return o(a0, a1);
    } else {
      switch (arity) {
        case 1:
          return app(o(a0), [a1]);
        case 2:
          return o(a0, a1);
        case 3:
          return function (param) {
            return o(a0, a1, param);
          };
        case 4:
          return function (param, param$1) {
            return o(a0, a1, param, param$1);
          };
        case 5:
          return function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
        case 6:
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
        case 7:
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
        default:
          return app(o, [a0, a1]);
      }
    }
  }
  function __2(o) {
    var arity = o.length;
    if (arity === 2) {
      return o;
    } else {
      return function (a0, a1) {
        return _2(o, a0, a1);
      };
    }
  }

  // ../../node_modules/rescript/lib/es6/caml_option.js
  function some(x2) {
    if (x2 === void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: 0,
      };
    } else if (x2 !== null && x2.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: (x2.BS_PRIVATE_NESTED_SOME_NONE + 1) | 0,
      };
    } else {
      return x2;
    }
  }
  function nullable_to_opt(x2) {
    if (x2 == null) {
      return;
    } else {
      return some(x2);
    }
  }
  function valFromOption(x2) {
    if (!(x2 !== null && x2.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
      return x2;
    }
    var depth = x2.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: (depth - 1) | 0,
      };
    }
  }

  // ../../node_modules/rescript/lib/es6/belt_Array.js
  function get2(arr, i) {
    if (i >= 0 && i < arr.length) {
      return some(arr[i]);
    }
  }
  function getExn(arr, i) {
    if (!(i >= 0 && i < arr.length)) {
      throw {
        RE_EXN_ID: "Assert_failure",
        _1: ["belt_Array.ml", 27, 4],
        Error: new Error(),
      };
    }
    return arr[i];
  }
  function zip(xs, ys) {
    var lenx = xs.length;
    var leny = ys.length;
    var len = lenx < leny ? lenx : leny;
    var s = new Array(len);
    for (var i = 0; i < len; ++i) {
      s[i] = [xs[i], ys[i]];
    }
    return s;
  }
  function concat(a1, a2) {
    var l1 = a1.length;
    var l2 = a2.length;
    var a1a2 = new Array((l1 + l2) | 0);
    for (var i = 0; i < l1; ++i) {
      a1a2[i] = a1[i];
    }
    for (var i$1 = 0; i$1 < l2; ++i$1) {
      a1a2[(l1 + i$1) | 0] = a2[i$1];
    }
    return a1a2;
  }
  function concatMany(arrs) {
    var lenArrs = arrs.length;
    var totalLen = 0;
    for (var i = 0; i < lenArrs; ++i) {
      totalLen = (totalLen + arrs[i].length) | 0;
    }
    var result = new Array(totalLen);
    totalLen = 0;
    for (var j = 0; j < lenArrs; ++j) {
      var cur = arrs[j];
      for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
        result[totalLen] = cur[k];
        totalLen = (totalLen + 1) | 0;
      }
    }
    return result;
  }
  function mapU(a, f) {
    var l = a.length;
    var r = new Array(l);
    for (var i = 0; i < l; ++i) {
      r[i] = f(a[i]);
    }
    return r;
  }
  function map(a, f) {
    return mapU(a, __1(f));
  }
  function keepU(a, f) {
    var l = a.length;
    var r = new Array(l);
    var j = 0;
    for (var i = 0; i < l; ++i) {
      var v = a[i];
      if (f(v)) {
        r[j] = v;
        j = (j + 1) | 0;
      }
    }
    r.length = j;
    return r;
  }
  function keep(a, f) {
    return keepU(a, __1(f));
  }
  function mapWithIndexU(a, f) {
    var l = a.length;
    var r = new Array(l);
    for (var i = 0; i < l; ++i) {
      r[i] = f(i, a[i]);
    }
    return r;
  }
  function mapWithIndex(a, f) {
    return mapWithIndexU(a, __2(f));
  }
  function reduceU(a, x2, f) {
    var r = x2;
    for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
      r = f(r, a[i]);
    }
    return r;
  }
  function reduce(a, x2, f) {
    return reduceU(a, x2, __2(f));
  }

  // ../../node_modules/rescript/lib/es6/belt_Float.js
  function fromString(i) {
    var i$1 = parseFloat(i);
    if (isNaN(i$1)) {
      return;
    } else {
      return i$1;
    }
  }

  // ../../node_modules/rescript-path-rebuild/lib/es6/PathRebuild.bs.js
  var Path = __toESM(__require("path"));

  // ../../node_modules/rescript/lib/es6/caml_exceptions.js
  var id = {
    contents: 0,
  };
  function create(str) {
    id.contents = (id.contents + 1) | 0;
    return str + ("/" + id.contents);
  }
  function caml_is_extension(e) {
    if (e == null) {
      return false;
    } else {
      return typeof e.RE_EXN_ID === "string";
    }
  }

  // ../../node_modules/rescript/lib/es6/caml_js_exceptions.js
  var $$Error = /* @__PURE__ */ create("Caml_js_exceptions.Error");
  function internalToOCamlException(e) {
    if (caml_is_extension(e)) {
      return e;
    } else {
      return {
        RE_EXN_ID: $$Error,
        _1: e,
      };
    }
  }

  // ../../node_modules/rescript/lib/es6/js_exn.js
  var anyToExnInternal = internalToOCamlException;
  function raiseError(str) {
    throw new Error(str);
  }
  function raiseRangeError(str) {
    throw new RangeError(str);
  }
  var $$Error$1 = $$Error;

  // ../../node_modules/rescript-path-rebuild/lib/es6/PathRebuild.bs.js
  function $$int(str) {
    var result = Number(str);
    var result$p = result | 0;
    if (result === result$p) {
      return result$p;
    }
  }
  function commit(result, status) {
    switch (status.TAG | 0) {
      case 0:
        var s = status._0;
        if (s === "") {
          return {
            TAG: 0,
            _0: result,
          };
        } else {
          return {
            TAG: 0,
            _0: result.concat({
              TAG: 1,
              _0: s,
            }),
          };
        }
      case 1:
        return raiseError("Cannot commit a Skip");
      case 2:
        var n = status._0;
        switch (n) {
          case "base":
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 2,
                _0: "base",
              }),
            };
          case "dir":
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 2,
                _0: "dir",
              }),
            };
          case "ext":
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 2,
                _0: "ext",
              }),
            };
          case "name":
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 2,
                _0: "name",
              }),
            };
          case "root":
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 2,
                _0: "root",
              }),
            };
          default:
            var n$p = $$int(n);
            if (n$p !== void 0) {
              return {
                TAG: 0,
                _0: result.concat({
                  TAG: 0,
                  _0: n$p,
                  _1: n$p,
                }),
              };
            } else {
              return {
                TAG: 1,
                _0: "Bad range limit: " + n,
              };
            }
        }
      case 3:
        return raiseError("Cannot commit a Dot");
      case 4:
        var m = status._1;
        var n$1 = status._0;
        var n$p$1 = $$int(n$1);
        if (n$p$1 === void 0) {
          return {
            TAG: 1,
            _0: "Bad range limit: " + n$1,
          };
        }
        var m$p = $$int(m);
        if (m$p !== void 0) {
          if (n$p$1 >= 0 ? m$p >= 0 && m$p < n$p$1 : m$p >= 0 || n$p$1 > m$p) {
            return {
              TAG: 1,
              _0: "Bad range limits: " + n$1 + ".." + m,
            };
          } else {
            return {
              TAG: 0,
              _0: result.concat({
                TAG: 0,
                _0: n$p$1,
                _1: m$p,
              }),
            };
          }
        } else {
          return {
            TAG: 1,
            _0: "Bad range limit: " + m,
          };
        }
    }
  }
  function printError(str, i, msg) {
    return {
      TAG: 1,
      _0: msg + "\n" + str + "\n" + " ".repeat(i) + "^",
    };
  }
  function parse2(str) {
    var _i = 0;
    var _status = {
      TAG: 0,
      _0: "",
    };
    var _mResult = {
      TAG: 0,
      _0: [],
    };
    while (true) {
      var mResult = _mResult;
      var status = _status;
      var i = _i;
      if (mResult.TAG !== 0) {
        return printError(str, (i - 1) | 0, mResult._0);
      }
      var result = mResult._0;
      var ch = str.charAt(i);
      var i$p = (i + 1) | 0;
      var exit3 = 0;
      var exit$1 = 0;
      var exit$2 = 0;
      var exit$3 = 0;
      var exit$4 = 0;
      switch (ch) {
        case "":
          switch (status.TAG | 0) {
            case 0:
              return commit(result, status);
            case 1:
              return printError(
                str,
                i,
                "Unexpected end of string. Expected a character after the escape symbol %"
              );
            default:
              return printError(
                str,
                i,
                "Unexpected end of string. Did you forget to close a range?"
              );
          }
        case "%":
          switch (status.TAG | 0) {
            case 0:
              _status = {
                TAG: 1,
                _0: status._0,
              };
              _i = i$p;
              continue;
            case 1:
              exit$4 = 6;
              break;
            default:
              exit$3 = 5;
          }
          break;
        case ".":
          switch (status.TAG | 0) {
            case 0:
              exit3 = 1;
              break;
            case 1:
              exit$4 = 6;
              break;
            case 2:
              var n = status._0;
              if (n === "") {
                return printError(str, i, "Unexpected . symbol");
              }
              _status = {
                TAG: 3,
                _0: n,
              };
              _i = i$p;
              continue;
            case 3:
              _status = {
                TAG: 4,
                _0: status._0,
                _1: "",
              };
              _i = i$p;
              continue;
            case 4:
              return printError(str, i, "Unexpected . symbol");
          }
          break;
        case "/":
          switch (status.TAG | 0) {
            case 0:
              var r = commit(result, status);
              var tmp;
              tmp =
                r.TAG === 0
                  ? {
                      TAG: 0,
                      _0: r._0.concat(0),
                    }
                  : r;
              _mResult = tmp;
              _status = {
                TAG: 0,
                _0: "",
              };
              _i = i$p;
              continue;
            case 1:
              exit$4 = 6;
              break;
            case 3:
              exit$2 = 4;
              break;
            case 2:
            case 4:
              exit$1 = 3;
              break;
          }
          break;
        case "{":
          switch (status.TAG | 0) {
            case 0:
              _mResult = commit(result, status);
              _status = {
                TAG: 2,
                _0: "",
              };
              _i = i$p;
              continue;
            case 1:
              exit$4 = 6;
              break;
            default:
              exit$3 = 5;
          }
          break;
        case "}":
          switch (status.TAG | 0) {
            case 1:
              exit$4 = 6;
              break;
            case 0:
            case 3:
              exit$3 = 5;
              break;
            case 2:
            case 4:
              exit3 = 2;
              break;
          }
          break;
        default:
          exit$4 = 6;
      }
      if (exit$4 === 6) {
        if (status.TAG === 1) {
          _status = {
            TAG: 0,
            _0: status._0 + ch,
          };
          _i = i$p;
          continue;
        }
        exit$3 = 5;
      }
      if (exit$3 === 5) {
        switch (ch) {
          case "%":
            return printError(
              str,
              i,
              "Unexpected escape symbol % inside a range"
            );
          case "{":
            return printError(str, i, "Unexpected { symbol inside a range");
          case "}":
            return printError(str, i, "Unexpected } symbol");
          default:
            exit$2 = 4;
        }
      }
      if (exit$2 === 4) {
        if (status.TAG === 3) {
          return printError(
            str,
            i,
            "Unexpected character: " + ch + ". Was expecting a . symbol"
          );
        }
        exit$1 = 3;
      }
      if (exit$1 === 3) {
        if (ch === "/") {
          return printError(str, i, "Unexpected / symbol inside a range");
        }
        exit3 = 1;
      }
      switch (exit3) {
        case 1:
          switch (status.TAG | 0) {
            case 0:
              _status = {
                TAG: 0,
                _0: status._0 + ch,
              };
              _i = i$p;
              continue;
            case 2:
              _status = {
                TAG: 2,
                _0: status._0 + ch,
              };
              _i = i$p;
              continue;
            case 4:
              _status = {
                TAG: 4,
                _0: status._0,
                _1: status._1 + ch,
              };
              _i = i$p;
              continue;
          }
        case 2:
          _mResult = commit(result, status);
          _status = {
            TAG: 0,
            _0: "",
          };
          _i = i$p;
          continue;
      }
    }
  }
  function printRange(parts, min2, max2, sep2) {
    if (min2 === max2) {
      return parts[min2];
    } else if (max2 === ((parts.length - 1) | 0)) {
      return printRange(parts, min2, (max2 - 1) | 0, sep2) + parts[max2];
    } else {
      return parts.slice(min2, (max2 + 1) | 0).join(sep2);
    }
  }
  function print(nodes, path) {
    var sep2 = Path.sep;
    var parsed = Path.parse(path);
    var withoutRoot = path.slice(parsed.root.length);
    var withoutExt = withoutRoot.slice(
      0,
      (withoutRoot.length - parsed.ext.length) | 0
    );
    var parts = withoutExt.split(sep2).concat(parsed.ext);
    var _result = "";
    var _i = 0;
    var _skipSeparator = false;
    while (true) {
      var skipSeparator = _skipSeparator;
      var i = _i;
      var result = _result;
      if (i === nodes.length) {
        return result;
      }
      var s = nodes[i];
      if (typeof s === "number") {
        _skipSeparator = false;
        _i = (i + 1) | 0;
        _result = result + (skipSeparator ? "" : sep2);
        continue;
      }
      switch (s.TAG | 0) {
        case 0:
          var max2 = s._1;
          var min2 = s._0;
          var len = parts.length;
          var min$1 = Math.max(0, min2 < 0 ? (len + min2) | 0 : min2);
          var max$1 = Math.min(
            (len - 1) | 0,
            max2 < 0 ? (len + max2) | 0 : max2
          );
          if (max$1 < min$1) {
            _skipSeparator = true;
            _i = (i + 1) | 0;
            continue;
          }
          _skipSeparator = false;
          _i = (i + 1) | 0;
          _result = result + printRange(parts, min$1, max$1, sep2);
          continue;
        case 1:
          _skipSeparator = false;
          _i = (i + 1) | 0;
          _result = result + s._0;
          continue;
        case 2:
          var match2 = s._0;
          if (match2 === "name") {
            _skipSeparator = false;
            _i = (i + 1) | 0;
            _result = result + parsed.name;
            continue;
          }
          if (match2 === "root") {
            _skipSeparator = false;
            _i = (i + 1) | 0;
            _result = result + parsed.root;
            continue;
          }
          if (match2 === "dir") {
            _skipSeparator = parsed.dir === parsed.root;
            _i = (i + 1) | 0;
            _result = result + parsed.dir;
            continue;
          }
          if (match2 === "ext") {
            _skipSeparator = false;
            _i = (i + 1) | 0;
            _result = result + parsed.ext;
            continue;
          }
          _skipSeparator = false;
          _i = (i + 1) | 0;
          _result = result + parsed.base;
          continue;
      }
    }
  }
  function make(pattern) {
    var nodes = parse2(pattern);
    if (nodes.TAG !== 0) {
      return {
        TAG: 1,
        _0: nodes._0,
      };
    }
    var nodes$1 = nodes._0;
    return {
      TAG: 0,
      _0: function (path) {
        return print(nodes$1, path);
      },
    };
  }

  // lib/es6/src/TTY.bs.js
  var Util2 = __toESM(__require("util"));

  // node_modules/chalk/source/vendor/ansi-styles/index.js
  var ANSI_BACKGROUND_OFFSET = 10;
  var wrapAnsi16 =
    (offset = 0) =>
    (code2) =>
      `\x1B[${code2 + offset}m`;
  var wrapAnsi256 =
    (offset = 0) =>
    (code2) =>
      `\x1B[${38 + offset};5;${code2}m`;
  var wrapAnsi16m =
    (offset = 0) =>
    (red2, green2, blue2) =>
      `\x1B[${38 + offset};2;${red2};${green2};${blue2}m`;
  function assembleStyles() {
    const codes = /* @__PURE__ */ new Map();
    const styles2 = {
      modifier: {
        reset: [0, 0],
        bold: [1, 22],
        dim: [2, 22],
        italic: [3, 23],
        underline: [4, 24],
        overline: [53, 55],
        inverse: [7, 27],
        hidden: [8, 28],
        strikethrough: [9, 29],
      },
      color: {
        black: [30, 39],
        red: [31, 39],
        green: [32, 39],
        yellow: [33, 39],
        blue: [34, 39],
        magenta: [35, 39],
        cyan: [36, 39],
        white: [37, 39],
        blackBright: [90, 39],
        redBright: [91, 39],
        greenBright: [92, 39],
        yellowBright: [93, 39],
        blueBright: [94, 39],
        magentaBright: [95, 39],
        cyanBright: [96, 39],
        whiteBright: [97, 39],
      },
      bgColor: {
        bgBlack: [40, 49],
        bgRed: [41, 49],
        bgGreen: [42, 49],
        bgYellow: [43, 49],
        bgBlue: [44, 49],
        bgMagenta: [45, 49],
        bgCyan: [46, 49],
        bgWhite: [47, 49],
        bgBlackBright: [100, 49],
        bgRedBright: [101, 49],
        bgGreenBright: [102, 49],
        bgYellowBright: [103, 49],
        bgBlueBright: [104, 49],
        bgMagentaBright: [105, 49],
        bgCyanBright: [106, 49],
        bgWhiteBright: [107, 49],
      },
    };
    styles2.color.gray = styles2.color.blackBright;
    styles2.bgColor.bgGray = styles2.bgColor.bgBlackBright;
    styles2.color.grey = styles2.color.blackBright;
    styles2.bgColor.bgGrey = styles2.bgColor.bgBlackBright;
    for (const [groupName, group] of Object.entries(styles2)) {
      for (const [styleName, style] of Object.entries(group)) {
        styles2[styleName] = {
          open: `\x1B[${style[0]}m`,
          close: `\x1B[${style[1]}m`,
        };
        group[styleName] = styles2[styleName];
        codes.set(style[0], style[1]);
      }
      Object.defineProperty(styles2, groupName, {
        value: group,
        enumerable: false,
      });
    }
    Object.defineProperty(styles2, "codes", {
      value: codes,
      enumerable: false,
    });
    styles2.color.close = "\x1B[39m";
    styles2.bgColor.close = "\x1B[49m";
    styles2.color.ansi = wrapAnsi16();
    styles2.color.ansi256 = wrapAnsi256();
    styles2.color.ansi16m = wrapAnsi16m();
    styles2.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
    styles2.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
    styles2.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
    Object.defineProperties(styles2, {
      rgbToAnsi256: {
        value: (red2, green2, blue2) => {
          if (red2 === green2 && green2 === blue2) {
            if (red2 < 8) {
              return 16;
            }
            if (red2 > 248) {
              return 231;
            }
            return Math.round(((red2 - 8) / 247) * 24) + 232;
          }
          return (
            16 +
            36 * Math.round((red2 / 255) * 5) +
            6 * Math.round((green2 / 255) * 5) +
            Math.round((blue2 / 255) * 5)
          );
        },
        enumerable: false,
      },
      hexToRgb: {
        value: (hex) => {
          const matches = /(?<colorString>[a-f\d]{6}|[a-f\d]{3})/i.exec(
            hex.toString(16)
          );
          if (!matches) {
            return [0, 0, 0];
          }
          let { colorString } = matches.groups;
          if (colorString.length === 3) {
            colorString = [...colorString]
              .map((character) => character + character)
              .join("");
          }
          const integer = Number.parseInt(colorString, 16);
          return [(integer >> 16) & 255, (integer >> 8) & 255, integer & 255];
        },
        enumerable: false,
      },
      hexToAnsi256: {
        value: (hex) => styles2.rgbToAnsi256(...styles2.hexToRgb(hex)),
        enumerable: false,
      },
      ansi256ToAnsi: {
        value: (code2) => {
          if (code2 < 8) {
            return 30 + code2;
          }
          if (code2 < 16) {
            return 90 + (code2 - 8);
          }
          let red2;
          let green2;
          let blue2;
          if (code2 >= 232) {
            red2 = ((code2 - 232) * 10 + 8) / 255;
            green2 = red2;
            blue2 = red2;
          } else {
            code2 -= 16;
            const remainder = code2 % 36;
            red2 = Math.floor(code2 / 36) / 5;
            green2 = Math.floor(remainder / 6) / 5;
            blue2 = (remainder % 6) / 5;
          }
          const value = Math.max(red2, green2, blue2) * 2;
          if (value === 0) {
            return 30;
          }
          let result =
            30 +
            ((Math.round(blue2) << 2) |
              (Math.round(green2) << 1) |
              Math.round(red2));
          if (value === 2) {
            result += 60;
          }
          return result;
        },
        enumerable: false,
      },
      rgbToAnsi: {
        value: (red2, green2, blue2) =>
          styles2.ansi256ToAnsi(styles2.rgbToAnsi256(red2, green2, blue2)),
        enumerable: false,
      },
      hexToAnsi: {
        value: (hex) => styles2.ansi256ToAnsi(styles2.hexToAnsi256(hex)),
        enumerable: false,
      },
    });
    return styles2;
  }
  var ansiStyles = assembleStyles();
  var ansi_styles_default = ansiStyles;

  // node_modules/chalk/source/vendor/supports-color/index.js
  var import_node_process = __toESM(__require("node:process"), 1);
  var import_node_os = __toESM(__require("node:os"), 1);
  var import_node_tty = __toESM(__require("node:tty"), 1);
  function hasFlag(flag, argv4 = import_node_process.default.argv) {
    const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
    const position = argv4.indexOf(prefix + flag);
    const terminatorPosition = argv4.indexOf("--");
    return (
      position !== -1 &&
      (terminatorPosition === -1 || position < terminatorPosition)
    );
  }
  var { env } = import_node_process.default;
  var flagForceColor;
  if (
    hasFlag("no-color") ||
    hasFlag("no-colors") ||
    hasFlag("color=false") ||
    hasFlag("color=never")
  ) {
    flagForceColor = 0;
  } else if (
    hasFlag("color") ||
    hasFlag("colors") ||
    hasFlag("color=true") ||
    hasFlag("color=always")
  ) {
    flagForceColor = 1;
  }
  function envForceColor() {
    if ("FORCE_COLOR" in env) {
      if (env.FORCE_COLOR === "true") {
        return 1;
      }
      if (env.FORCE_COLOR === "false") {
        return 0;
      }
      return env.FORCE_COLOR.length === 0
        ? 1
        : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
    }
  }
  function translateLevel(level) {
    if (level === 0) {
      return false;
    }
    return {
      level,
      hasBasic: true,
      has256: level >= 2,
      has16m: level >= 3,
    };
  }
  function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
    const noFlagForceColor = envForceColor();
    if (noFlagForceColor !== void 0) {
      flagForceColor = noFlagForceColor;
    }
    const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
    if (forceColor === 0) {
      return 0;
    }
    if (sniffFlags) {
      if (
        hasFlag("color=16m") ||
        hasFlag("color=full") ||
        hasFlag("color=truecolor")
      ) {
        return 3;
      }
      if (hasFlag("color=256")) {
        return 2;
      }
    }
    if (haveStream && !streamIsTTY && forceColor === void 0) {
      return 0;
    }
    const min2 = forceColor || 0;
    if (env.TERM === "dumb") {
      return min2;
    }
    if (import_node_process.default.platform === "win32") {
      const osRelease = import_node_os.default.release().split(".");
      if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
        return Number(osRelease[2]) >= 14931 ? 3 : 2;
      }
      return 1;
    }
    if ("CI" in env) {
      if (
        [
          "TRAVIS",
          "CIRCLECI",
          "APPVEYOR",
          "GITLAB_CI",
          "GITHUB_ACTIONS",
          "BUILDKITE",
          "DRONE",
        ].some((sign) => sign in env) ||
        env.CI_NAME === "codeship"
      ) {
        return 1;
      }
      return min2;
    }
    if ("TEAMCITY_VERSION" in env) {
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
    }
    if ("TF_BUILD" in env && "AGENT_NAME" in env) {
      return 1;
    }
    if (env.COLORTERM === "truecolor") {
      return 3;
    }
    if ("TERM_PROGRAM" in env) {
      const version2 = Number.parseInt(
        (env.TERM_PROGRAM_VERSION || "").split(".")[0],
        10
      );
      switch (env.TERM_PROGRAM) {
        case "iTerm.app":
          return version2 >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    if (/-256(color)?$/i.test(env.TERM)) {
      return 2;
    }
    if (
      /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(
        env.TERM
      )
    ) {
      return 1;
    }
    if ("COLORTERM" in env) {
      return 1;
    }
    return min2;
  }
  function createSupportsColor(stream, options = {}) {
    const level = _supportsColor(
      stream,
      __spreadValues(
        {
          streamIsTTY: stream && stream.isTTY,
        },
        options
      )
    );
    return translateLevel(level);
  }
  var supportsColor = {
    stdout: createSupportsColor({ isTTY: import_node_tty.default.isatty(1) }),
    stderr: createSupportsColor({ isTTY: import_node_tty.default.isatty(2) }),
  };
  var supports_color_default = supportsColor;

  // node_modules/chalk/source/utilities.js
  function stringReplaceAll(string2, substring, replacer) {
    let index = string2.indexOf(substring);
    if (index === -1) {
      return string2;
    }
    const substringLength = substring.length;
    let endIndex = 0;
    let returnValue = "";
    do {
      returnValue +=
        string2.substr(endIndex, index - endIndex) + substring + replacer;
      endIndex = index + substringLength;
      index = string2.indexOf(substring, endIndex);
    } while (index !== -1);
    returnValue += string2.slice(endIndex);
    return returnValue;
  }
  function stringEncaseCRLFWithFirstIndex(string2, prefix, postfix, index) {
    let endIndex = 0;
    let returnValue = "";
    do {
      const gotCR = string2[index - 1] === "\r";
      returnValue +=
        string2.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) +
        prefix +
        (gotCR ? "\r\n" : "\n") +
        postfix;
      endIndex = index + 1;
      index = string2.indexOf("\n", endIndex);
    } while (index !== -1);
    returnValue += string2.slice(endIndex);
    return returnValue;
  }

  // node_modules/chalk/source/index.js
  var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
  var GENERATOR = Symbol("GENERATOR");
  var STYLER = Symbol("STYLER");
  var IS_EMPTY = Symbol("IS_EMPTY");
  var levelMapping = ["ansi", "ansi", "ansi256", "ansi16m"];
  var styles = /* @__PURE__ */ Object.create(null);
  var applyOptions = (object2, options = {}) => {
    if (
      options.level &&
      !(
        Number.isInteger(options.level) &&
        options.level >= 0 &&
        options.level <= 3
      )
    ) {
      throw new Error("The `level` option should be an integer from 0 to 3");
    }
    const colorLevel = stdoutColor ? stdoutColor.level : 0;
    object2.level = options.level === void 0 ? colorLevel : options.level;
  };
  var chalkFactory = (options) => {
    const chalk2 = (...strings) => strings.join(" ");
    applyOptions(chalk2, options);
    Object.setPrototypeOf(chalk2, createChalk.prototype);
    return chalk2;
  };
  function createChalk(options) {
    return chalkFactory(options);
  }
  Object.setPrototypeOf(createChalk.prototype, Function.prototype);
  for (const [styleName, style] of Object.entries(ansi_styles_default)) {
    styles[styleName] = {
      get() {
        const builder = createBuilder(
          this,
          createStyler(style.open, style.close, this[STYLER]),
          this[IS_EMPTY]
        );
        Object.defineProperty(this, styleName, { value: builder });
        return builder;
      },
    };
  }
  styles.visible = {
    get() {
      const builder = createBuilder(this, this[STYLER], true);
      Object.defineProperty(this, "visible", { value: builder });
      return builder;
    },
  };
  var getModelAnsi = (model, level, type, ...arguments_) => {
    if (model === "rgb") {
      if (level === "ansi16m") {
        return ansi_styles_default[type].ansi16m(...arguments_);
      }
      if (level === "ansi256") {
        return ansi_styles_default[type].ansi256(
          ansi_styles_default.rgbToAnsi256(...arguments_)
        );
      }
      return ansi_styles_default[type].ansi(
        ansi_styles_default.rgbToAnsi(...arguments_)
      );
    }
    if (model === "hex") {
      return getModelAnsi(
        "rgb",
        level,
        type,
        ...ansi_styles_default.hexToRgb(...arguments_)
      );
    }
    return ansi_styles_default[type][model](...arguments_);
  };
  var usedModels = ["rgb", "hex", "ansi256"];
  for (const model of usedModels) {
    styles[model] = {
      get() {
        const { level } = this;
        return function (...arguments_) {
          const styler = createStyler(
            getModelAnsi(model, levelMapping[level], "color", ...arguments_),
            ansi_styles_default.color.close,
            this[STYLER]
          );
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      },
    };
    const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
    styles[bgModel] = {
      get() {
        const { level } = this;
        return function (...arguments_) {
          const styler = createStyler(
            getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_),
            ansi_styles_default.bgColor.close,
            this[STYLER]
          );
          return createBuilder(this, styler, this[IS_EMPTY]);
        };
      },
    };
  }
  var proto = Object.defineProperties(
    () => {},
    __spreadProps(__spreadValues({}, styles), {
      level: {
        enumerable: true,
        get() {
          return this[GENERATOR].level;
        },
        set(level) {
          this[GENERATOR].level = level;
        },
      },
    })
  );
  var createStyler = (open, close, parent) => {
    let openAll;
    let closeAll;
    if (parent === void 0) {
      openAll = open;
      closeAll = close;
    } else {
      openAll = parent.openAll + open;
      closeAll = close + parent.closeAll;
    }
    return {
      open,
      close,
      openAll,
      closeAll,
      parent,
    };
  };
  var createBuilder = (self, _styler, _isEmpty) => {
    const builder = (...arguments_) =>
      applyStyle(
        builder,
        arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" ")
      );
    Object.setPrototypeOf(builder, proto);
    builder[GENERATOR] = self;
    builder[STYLER] = _styler;
    builder[IS_EMPTY] = _isEmpty;
    return builder;
  };
  var applyStyle = (self, string2) => {
    if (self.level <= 0 || !string2) {
      return self[IS_EMPTY] ? "" : string2;
    }
    let styler = self[STYLER];
    if (styler === void 0) {
      return string2;
    }
    const { openAll, closeAll } = styler;
    if (string2.includes("\x1B")) {
      while (styler !== void 0) {
        string2 = stringReplaceAll(string2, styler.close, styler.open);
        styler = styler.parent;
      }
    }
    const lfIndex = string2.indexOf("\n");
    if (lfIndex !== -1) {
      string2 = stringEncaseCRLFWithFirstIndex(
        string2,
        closeAll,
        openAll,
        lfIndex
      );
    }
    return openAll + string2 + closeAll;
  };
  Object.defineProperties(createChalk.prototype, styles);
  var chalk = createChalk();
  var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });

  // ../../node_modules/rescript/lib/es6/caml_splice_call.js
  var spliceObjApply = function (obj, name, args) {
    var i, argLen;
    argLen = args.length;
    var applied = [];
    for (i = 0; i < argLen - 1; ++i) {
      applied.push(args[i]);
    }
    var lastOne = args[argLen - 1];
    for (i = 0; i < lastOne.length; ++i) {
      applied.push(lastOne[i]);
    }
    return obj[name].apply(obj, applied);
  };

  // ../../node_modules/rescript/lib/es6/belt_Option.js
  function getExn2(x2) {
    if (x2 !== void 0) {
      return valFromOption(x2);
    }
    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error(),
    };
  }
  function mapU2(opt, f) {
    if (opt !== void 0) {
      return some(f(valFromOption(opt)));
    }
  }
  function map2(opt, f) {
    return mapU2(opt, __1(f));
  }
  function getWithDefault(opt, $$default) {
    if (opt !== void 0) {
      return valFromOption(opt);
    } else {
      return $$default;
    }
  }

  // lib/es6/src/Context.bs.js
  function quiet(ctx) {
    if (ctx.argv.quiet) {
      return true;
    } else {
      return ctx.config.quiet === true;
    }
  }
  function sources(ctx) {
    var match2 = ctx.argv.input;
    var match$1 = ctx.config.sources;
    if (match2 !== void 0) {
      return [
        {
          input: [match2],
          output: ctx.argv.output,
        },
      ];
    } else if (match$1 !== void 0 && match$1.length !== 0) {
      return match$1;
    } else {
      return;
    }
  }
  function orElse(a, b) {
    if (a !== void 0) {
      return a;
    } else {
      return b;
    }
  }
  function generator(ctx) {
    return orElse(ctx.argv.generator, ctx.config.generator);
  }
  function pgConfig(ctx) {
    var tmp = {
      application_name: "typesafe-pg",
    };
    var tmp$1 = orElse(ctx.argv.username, ctx.config.username);
    if (tmp$1 !== void 0) {
      tmp.user = tmp$1;
    }
    var tmp$2 = map2(
      orElse(ctx.argv.password, ctx.config.password),
      function (prim) {
        return prim;
      }
    );
    if (tmp$2 !== void 0) {
      tmp.password = valFromOption(tmp$2);
    }
    var tmp$3 = orElse(ctx.argv.host, ctx.config.host);
    if (tmp$3 !== void 0) {
      tmp.host = tmp$3;
    }
    var tmp$4 = orElse(ctx.argv.dbname, ctx.config.dbname);
    if (tmp$4 !== void 0) {
      tmp.database = tmp$4;
    }
    var tmp$5 = orElse(ctx.argv.port, ctx.config.port);
    if (tmp$5 !== void 0) {
      tmp.port = tmp$5;
    }
    var tmp$6 = orElse(ctx.argv.connection, ctx.config.connection);
    if (tmp$6 !== void 0) {
      tmp.connectionString = tmp$6;
    }
    return tmp;
  }

  // ../rescript-errors/lib/es6/src/Loggable.bs.js
  var Util = __toESM(__require("util"));

  // ../rescript-errors/lib/es6/src/Native.bs.js
  var isInstanceOfError = (x2) => x2 instanceof Error;
  function code(err) {
    var opt = err.code;
    if (opt !== void 0 && typeof opt === "string") {
      return opt;
    }
  }
  function fromJsExn(exn2) {
    if (isInstanceOfError(exn2)) {
      return some(exn2);
    }
  }
  function fromExn(exn2) {
    if (exn2.RE_EXN_ID === $$Error$1) {
      return fromJsExn(exn2._1);
    }
  }
  function rethrowAsNative(exn2) {
    if (exn2.RE_EXN_ID === $$Error$1) {
      throw exn2._1;
    }
    throw exn2;
  }

  // ../rescript-errors/lib/es6/src/Loggable.bs.js
  function fromText(message) {
    return {
      cause: 0,
      message: [
        {
          TAG: 0,
          _0: message,
        },
      ],
    };
  }
  function fromUnknown(obj) {
    return {
      cause: 0,
      message: [
        {
          TAG: 4,
          _0: obj,
        },
      ],
    };
  }
  function fromNative(err) {
    return {
      cause: {
        TAG: 1,
        _0: err,
      },
      message: [
        {
          TAG: 1,
          _0: err,
        },
      ],
    };
  }
  function fromNativeVerbose(err) {
    return {
      cause: {
        TAG: 1,
        _0: err,
      },
      message: [
        {
          TAG: 2,
          _0: err,
        },
      ],
    };
  }
  function fromJsExn2(jsExn) {
    var err = fromJsExn(jsExn);
    if (err !== void 0) {
      return fromNative(valFromOption(err));
    } else {
      return {
        cause: {
          TAG: 2,
          _0: jsExn,
        },
        message: [
          {
            TAG: 4,
            _0: jsExn,
          },
        ],
      };
    }
  }
  function fromJsExnVerbose(jsExn) {
    var err = fromJsExn(jsExn);
    if (err !== void 0) {
      return fromNativeVerbose(valFromOption(err));
    } else {
      return {
        cause: {
          TAG: 2,
          _0: jsExn,
        },
        message: [
          {
            TAG: 4,
            _0: jsExn,
          },
        ],
      };
    }
  }
  function fromExn2(exn2) {
    if (exn2.RE_EXN_ID === $$Error$1) {
      return fromJsExn2(exn2._1);
    } else {
      return {
        cause: {
          TAG: 0,
          _0: exn2,
        },
        message: [
          {
            TAG: 3,
            _0: exn2,
          },
        ],
      };
    }
  }
  function fromExnVerbose(exn2) {
    if (exn2.RE_EXN_ID === $$Error$1) {
      return fromJsExnVerbose(exn2._1);
    } else {
      return {
        cause: {
          TAG: 0,
          _0: exn2,
        },
        message: [
          {
            TAG: 3,
            _0: exn2,
          },
        ],
      };
    }
  }
  function prepend(param, text) {
    return {
      cause: param.cause,
      message: [
        {
          TAG: 0,
          _0: text,
        },
      ].concat(param.message),
    };
  }
  function append(param, text) {
    return {
      cause: param.cause,
      message: param.message.concat([
        {
          TAG: 0,
          _0: text,
        },
      ]),
    };
  }
  function compile(param) {
    return param.message.map(function (node) {
      switch (node.TAG | 0) {
        case 0:
          return {
            TAG: 0,
            _0: node._0,
          };
        case 1:
          var err = node._0;
          var x2 = err.message;
          if (x2 === "") {
            return {
              TAG: 1,
              _0: err,
            };
          } else {
            return {
              TAG: 0,
              _0: x2,
            };
          }
        default:
          return {
            TAG: 1,
            _0: node._0,
          };
      }
    });
  }
  function toStrings(nodeToStringOpt, separatorOpt, error2) {
    var nodeToString =
      nodeToStringOpt !== void 0
        ? nodeToStringOpt
        : function (node) {
            if (node.TAG === 0) {
              return node._0;
            } else {
              return Util.inspect(node._0);
            }
          };
    var separator = separatorOpt !== void 0 ? separatorOpt : " ";
    var arr = compile(error2).map(__1(nodeToString));
    var result = [];
    for (var i = 0, i_finish = arr.length; i < i_finish; ++i) {
      var item = arr[i];
      result.push(item);
      if (
        i < ((arr.length - 1) | 0) &&
        !item.endsWith(" ") &&
        !item.endsWith("\n")
      ) {
        result.push(separator);
      }
    }
    return result;
  }

  // lib/es6/src/TTY.bs.js
  var supportsColor2 =
    chalkStderr.supportsColor === false ? void 0 : chalkStderr.supportsColor;
  function inspect3(obj) {
    return Util2.inspect(obj, {
      colors: supportsColor2 !== void 0,
    });
  }
  function inspectDontWrapString(obj) {
    if (typeof obj === "string") {
      return obj;
    } else {
      return inspect3(obj);
    }
  }
  function blue(obj) {
    return chalkStderr.blue(inspectDontWrapString(obj));
  }
  function red(obj) {
    return chalkStderr.redBright(inspectDontWrapString(obj));
  }
  function green(obj) {
    return chalkStderr.green(inspectDontWrapString(obj));
  }
  function dim(obj) {
    return chalkStderr.dim(inspectDontWrapString(obj));
  }
  var Chalk$1 = {
    supportsColor: supportsColor2,
    inspect: inspect3,
    inspectDontWrapString,
    blue,
    red,
    green,
    dim,
  };
  function error(obj0) {
    console.error(chalkStderr.redBright(inspectDontWrapString(obj0)));
  }
  function printLoggable(err) {
    var obj0 = toStrings(
      function (node) {
        if (node.TAG === 0) {
          return node._0;
        } else {
          return inspect3(node._0);
        }
      },
      void 0,
      err
    ).join("");
    console.error(chalkStderr.redBright(inspectDontWrapString(obj0)));
  }
  function info(ctx, val0) {
    if (!quiet(ctx)) {
      console.error(val0);
      return;
    }
  }
  function infoNl(ctx) {
    return info(ctx, "");
  }

  // ../../node_modules/@rpominov/rescript-promise/lib/es6/Promise.bs.js
  var Process = __toESM(__require("process"));
  function isPromiseLike(obj) {
    if (typeof obj === "object" && obj !== null) {
      return typeof obj.then === "function";
    } else {
      return false;
    }
  }
  function resolve(x2) {
    if (isPromiseLike(x2)) {
      return Promise.reject(
        new Error(
          "Cannot create a Promise containing another Promise as this will break ReScript static types"
        )
      );
    } else {
      return Promise.resolve(x2);
    }
  }
  function make2(fn) {
    return new Promise(function (resolve2, reject) {
      return _1(fn, function (x2) {
        if (isPromiseLike(x2)) {
          return reject(
            new Error(
              "Cannot create a Promise containing another Promise as this will break ReScript static types"
            )
          );
        } else {
          return resolve2(x2);
        }
      });
    });
  }
  function $$catch(promise, fn) {
    return promise.then(
      function (x2) {
        return resolve({
          TAG: 0,
          _0: x2,
        });
      },
      function (e) {
        return resolve({
          TAG: 1,
          _0: _1(fn, anyToExnInternal(e)),
        });
      }
    );
  }
  function chain(promise, fn) {
    return promise.then(__1(fn), void 0);
  }
  function map3(promise, fn) {
    return promise.then(function (x2) {
      return resolve(_1(fn, x2));
    }, void 0);
  }
  function crash(exn2) {
    console.error("Unrecoverable Promise rejection!");
    if (exn2.RE_EXN_ID === $$Error$1) {
      console.error(exn2._1);
    } else {
      console.error(exn2);
    }
    return Process.exit(1);
  }
  function done(promise, fn) {
    promise.then(
      function (x2) {
        try {
          _1(fn, x2);
          return resolve(void 0);
        } catch (raw_exn) {
          return crash(internalToOCamlException(raw_exn));
        }
      },
      function (e) {
        return crash(anyToExnInternal(e));
      }
    );
  }
  function chainOk(promise, fn) {
    return chain(promise, function (val) {
      if (val.TAG === 0) {
        return _1(fn, val._0);
      } else {
        return resolve({
          TAG: 1,
          _0: val._0,
        });
      }
    });
  }
  function mapOk(promise, fn) {
    return chainOk(promise, function (val) {
      return resolve(_1(fn, val));
    });
  }
  function makeJsError(prim) {
    return new Error(prim);
  }
  function all(prim) {
    return Promise.all(prim);
  }
  function all2(prim) {
    return Promise.all(prim);
  }
  function all3(prim) {
    return Promise.all(prim);
  }

  // lib/es6/src/Process.bs.js
  var Process2 = __toESM(__require("process"));
  var argv2 = Process2.argv;
  function exitWithLoggableError(usageOpt, err) {
    var usage2 = usageOpt !== void 0 ? valFromOption(usageOpt) : void 0;
    error("ERROR!");
    printLoggable(err);
    if (usage2 !== void 0) {
      console.error("");
      console.error(Chalk$1.dim(valFromOption(usage2)));
    }
    return Process2.exit(1);
  }
  function exitWithError(usage2, err) {
    return exitWithLoggableError(usage2, fromText(err));
  }
  function getSomeOrExitWithError(option, message) {
    if (option !== void 0) {
      return valFromOption(option);
    } else {
      return exitWithLoggableError(void 0, fromText(message));
    }
  }
  function getOkOrExitWithError(prepend2, result) {
    if (result.TAG === 0) {
      return result._0;
    }
    var error2 = result._0;
    return exitWithLoggableError(
      void 0,
      prepend2 !== void 0 ? prepend(error2, prepend2) : error2
    );
  }
  function catchAndExitWithError(prepend2, promise) {
    return map3($$catch(promise, fromExn2), function (param) {
      return getOkOrExitWithError(prepend2, param);
    });
  }

  // lib/es6/src/Require.bs.js
  var Path2 = __toESM(__require("path"));
  var Module = __toESM(__require("module"));
  var Process3 = __toESM(__require("process"));

  // ../../node_modules/rescript/lib/es6/js_types.js
  function classify(x2) {
    var ty = typeof x2;
    if (ty === "undefined") {
      return 3;
    } else if (x2 === null) {
      return 2;
    } else if (ty === "number") {
      return {
        TAG: 0,
        _0: x2,
      };
    } else if (ty === "string") {
      return {
        TAG: 1,
        _0: x2,
      };
    } else if (ty === "boolean") {
      if (x2 === true) {
        return 1;
      } else {
        return 0;
      }
    } else if (ty === "function") {
      return {
        TAG: 2,
        _0: x2,
      };
    } else if (ty === "object") {
      return {
        TAG: 3,
        _0: x2,
      };
    } else {
      return {
        TAG: 4,
        _0: x2,
      };
    }
  }

  // lib/es6/src/Require.bs.js
  function $$require(moduleId) {
    try {
      return {
        TAG: 0,
        _0: some(
          Module.createRequire(Path2.join(Process3.cwd(), "noop.js"))(moduleId)
        ),
      };
    } catch (raw_exn) {
      var exn2 = internalToOCamlException(raw_exn);
      var err = fromExn(exn2);
      if (err !== void 0 && code(valFromOption(err)) === "MODULE_NOT_FOUND") {
        return {
          TAG: 0,
          _0: void 0,
        };
      } else {
        return {
          TAG: 1,
          _0: fromExnVerbose(exn2),
        };
      }
    }
  }
  var Validation_error = /* @__PURE__ */ create(
    "Require-TypesafeSqlPgCli.Validation_error"
  );
  function validate(fn) {
    try {
      return {
        TAG: 0,
        _0: _1(fn, void 0),
      };
    } catch (raw_err) {
      var err = internalToOCamlException(raw_err);
      if (err.RE_EXN_ID === Validation_error) {
        return {
          TAG: 1,
          _0: err._1,
        };
      } else {
        return rethrowAsNative(err);
      }
    }
  }
  function failed(err) {
    throw {
      RE_EXN_ID: Validation_error,
      _1: err,
      Error: new Error(),
    };
  }
  function unknown_cast(val) {
    return some(val);
  }
  var unknown = {
    name: "unknown",
    cast: unknown_cast,
  };
  function object_cast(val) {
    var x2 = classify(val);
    if (typeof x2 === "number" || x2.TAG !== 3) {
      return;
    } else {
      return some(x2._0);
    }
  }
  var object = {
    name: "object",
    cast: object_cast,
  };
  function string_cast(val) {
    var x2 = classify(val);
    if (typeof x2 === "number" || x2.TAG !== 1) {
      return;
    } else {
      return x2._0;
    }
  }
  var string = {
    name: "string",
    cast: string_cast,
  };
  function bool_cast(val) {
    var match2 = classify(val);
    if (typeof match2 === "number") {
      if (match2 !== 1) {
        if (match2 !== 0) {
          return;
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
    cast: bool_cast,
  };
  function int_cast(val) {
    var $$float = classify(val);
    if (typeof $$float === "number") {
      return;
    }
    if ($$float.TAG !== 0) {
      return;
    }
    var $$float$1 = $$float._0;
    if (($$float$1 | 0) === $$float$1) {
      return $$float$1 | 0;
    }
  }
  var $$int2 = {
    name: "int",
    cast: int_cast,
  };
  function function_cast(val) {
    var f = classify(val);
    if (typeof f === "number" || f.TAG !== 2) {
      return;
    } else {
      return some(f._0);
    }
  }
  var $$function = {
    name: "function",
    cast: function_cast,
  };
  function array_cast(val) {
    var arr = classify(val);
    if (typeof arr === "number") {
      return;
    }
    if (arr.TAG !== 3) {
      return;
    }
    var arr$1 = arr._0;
    if (Array.isArray(arr$1)) {
      return arr$1;
    }
  }
  var array = {
    name: "array",
    cast: array_cast,
  };
  function arrayOf(validator) {
    return {
      name: "array<" + validator.name + ">",
      cast: function (val) {
        var arr = array_cast(val);
        if (arr === void 0) {
          return;
        }
        var acc = [];
        var _i = 0;
        while (true) {
          var i = _i;
          if (i >= arr.length) {
            return acc;
          }
          var x2 = validator.cast(arr[i]);
          if (x2 === void 0) {
            return;
          }
          acc.push(valFromOption(x2));
          _i = (i + 1) | 0;
          continue;
        }
      },
    };
  }
  function objectOf2(key1, validator1, key2, validator2, constructor) {
    return {
      name:
        "{" +
        key1 +
        ":" +
        validator1.name +
        "," +
        key2 +
        ":" +
        validator2.name +
        "}",
      cast: function (val) {
        var obj = object_cast(val);
        if (obj === void 0) {
          return;
        }
        var obj$1 = valFromOption(obj);
        var val1 = validator1.cast(obj$1[key1]);
        if (val1 === void 0) {
          return;
        }
        var val2 = validator2.cast(obj$1[key2]);
        if (val2 !== void 0) {
          return some(
            _2(constructor, valFromOption(val1), valFromOption(val2))
          );
        }
      },
    };
  }
  function nullable(validator) {
    return {
      name: "nullable<" + validator.name + ">",
      cast: function (val) {
        if (val == null) {
          return some(void 0);
        }
        var some3 = validator.cast(val);
        if (some3 !== void 0) {
          return some(some3);
        }
      },
    };
  }
  function either(validatorLeft, mapLeft, validatorRight, mapRight) {
    return {
      name: validatorLeft.name + "|" + validatorRight.name,
      cast: function (val) {
        var x2 = validatorLeft.cast(val);
        if (x2 !== void 0) {
          var x$1 = _1(mapLeft, valFromOption(x2));
          if (x$1.TAG === 0) {
            return some(x$1._0);
          }
          throw {
            RE_EXN_ID: Validation_error,
            _1: x$1._0,
            Error: new Error(),
          };
        }
        var x$2 = validatorRight.cast(val);
        if (x$2 === void 0) {
          return;
        }
        var x$3 = _1(mapRight, valFromOption(x$2));
        if (x$3.TAG === 0) {
          return some(x$3._0);
        }
        throw {
          RE_EXN_ID: Validation_error,
          _1: x$3._0,
          Error: new Error(),
        };
      },
    };
  }
  function cast(val, validator, name) {
    var x2 = validator.cast(val);
    if (x2 !== void 0) {
      return valFromOption(x2);
    }
    var err = prepend(
      fromUnknown(val),
      name + " is not of type " + validator.name + ":"
    );
    throw {
      RE_EXN_ID: Validation_error,
      _1: err,
      Error: new Error(),
    };
  }
  function property(obj, key, validator) {
    return cast(obj[key], validator, 'Property "' + key + '"');
  }
  var Validators = {
    failed,
    unknown,
    object,
    string,
    bool,
    $$int: $$int2,
    $$function,
    array,
    arrayOf,
    objectOf2,
    nullable,
    either,
    cast,
    property,
  };

  // ../../node_modules/rescript/lib/es6/js_dict.js
  function get3(dict, k) {
    if (k in dict) {
      return some(dict[k]);
    }
  }
  function entries(dict) {
    var keys = Object.keys(dict);
    var l = keys.length;
    var values = new Array(l);
    for (var i = 0; i < l; ++i) {
      var key = keys[i];
      values[i] = [key, dict[key]];
    }
    return values;
  }
  function map4(f, source) {
    var target = {};
    var keys = Object.keys(source);
    var l = keys.length;
    for (var i = 0; i < l; ++i) {
      var key = keys[i];
      target[key] = f(source[key]);
    }
    return target;
  }

  // lib/es6/src/Commands.bs.js
  var Promises = __toESM(__require("fs/promises"));

  // lib/es6/src/Fs.bs.js
  var Fs = __toESM(__require("fs"));
  var Path3 = __toESM(__require("path"));

  // ../../node_modules/rescript-chokidar/lib/es6/Chokidar.bs.js
  var Chokidar = __toESM(__require("chokidar"));
  function watchMany(options, dirs) {
    return Chokidar.watch(dirs, options);
  }

  // lib/es6/src/Array.bs.js
  var getExn3 = getExn;
  var concat2 = concat;
  var concatMany2 = concatMany;
  var map5 = map;
  var keep2 = keep;
  var mapWithIndex2 = mapWithIndex;
  var reduce2 = reduce;

  // lib/es6/src/Fs.bs.js
  function resolveGlobs(globs) {
    var watcher = {
      contents: void 0,
    };
    var close = function (param) {
      var watcher$p = watcher.contents;
      if (watcher$p !== void 0) {
        return valFromOption(watcher$p).close();
      } else {
        return resolve(void 0);
      }
    };
    var flatten = function (dict) {
      return concatMany2(
        map5(entries(dict), function (param) {
          var dir = param[0];
          return map5(param[1], function (file) {
            return Path3.join(dir, file);
          });
        })
      );
    };
    return chain(
      mapOk(
        $$catch(
          make2(function (resolve2) {
            var watcher$p = watchMany(void 0, globs);
            watcher.contents = some(watcher$p);
            watcher$p
              .on("error", function (err) {
                return _1(resolve2, {
                  TAG: 1,
                  _0: fromJsExnVerbose(err),
                });
              })
              .on("ready", function (param) {
                return _1(resolve2, {
                  TAG: 0,
                  _0: keep2(flatten(watcher$p.getWatched()), function (path) {
                    return Fs.statSync(path).isFile();
                  }),
                });
              });
          }),
          fromExnVerbose
        ),
        function (x2) {
          return x2;
        }
      ),
      function (res0) {
        return chain($$catch(close(void 0), fromExnVerbose), function (res1) {
          var tmp;
          tmp =
            res0.TAG === 0
              ? res1.TAG === 0
                ? {
                    TAG: 0,
                    _0: res0._0,
                  }
                : {
                    TAG: 1,
                    _0: res1._0,
                  }
              : {
                  TAG: 1,
                  _0: res0._0,
                };
          return resolve(tmp);
        });
      }
    );
  }

  // ../rescript-errors/lib/es6/src/Util.bs.js
  function isZeroWidth(ch) {
    if (ch === "\n") {
      return true;
    } else {
      return false;
    }
  }
  function highlight(code2, start, end2) {
    if (start < 0) {
      raiseRangeError("start is out of range: " + start);
    }
    if (end2 < start) {
      raiseRangeError("end is out of range: " + end2);
    }
    var symbols = Array.from(code2);
    var result = [];
    var highlightSymbols = [];
    var highlightSymbolsEmpty = true;
    for (
      var i = 0, i_finish = Math.max((symbols.length - 1) | 0, end2);
      i <= i_finish;
      ++i
    ) {
      var symbol = get2(symbols, i);
      if (!isZeroWidth(symbol)) {
        if (i < start) {
          highlightSymbols.push(" ");
        } else if (i <= end2) {
          highlightSymbols.push("^");
          highlightSymbolsEmpty = false;
        }
      }
      if (symbol !== void 0) {
        result.push(symbol);
      }
      if (symbol === "\n") {
        if (!highlightSymbolsEmpty) {
          spliceObjApply(result, "push", [highlightSymbols]);
          result.push("\n");
        }
        highlightSymbolsEmpty = true;
        highlightSymbols = [];
      }
    }
    if (!highlightSymbolsEmpty) {
      result.push("\n");
      spliceObjApply(result, "push", [highlightSymbols]);
    }
    return result.join("");
  }

  // lib/es6/src/Util.bs.js
  function mapAsyncSeq(arr, fn) {
    return reduce2(arr, resolve([]), function (acc, item) {
      return chain(acc, function (arr2) {
        return map3(_1(fn, item), function (val) {
          return concat2(arr2, [val]);
        });
      });
    });
  }

  // ../rescript-extended-sql/lib/es6/src/Parser.bs.js
  function end(state) {
    return state.pos > state.maxPos;
  }
  function at(state, pos) {
    if (pos <= state.maxPos && pos >= state.minPos) {
      return state.symbols[pos];
    } else {
      return "";
    }
  }
  function back(state, offset) {
    state.pos = (state.pos - offset) | 0;
    var minPos = state.minPos;
    var pos = state.pos;
    if (state.pos < minPos) {
      return raiseError(
        "The position can't be less than " +
          minPos +
          " got: " +
          pos +
          ". This indicates a bug in the parser!"
      );
    }
  }
  function skip(state, offset) {
    state.pos = (state.pos + offset) | 0;
    var pos = state.pos;
    var maxPos = (state.maxPos + 1) | 0;
    if (state.pos > maxPos) {
      return raiseError(
        "The position can't be more than " +
          maxPos +
          " got: " +
          pos +
          ". This indicates a bug in the parser!"
      );
    }
  }
  function current2(state) {
    return [at(state, state.pos), at(state, (state.pos + 1) | 0)];
  }
  function skipUntil(state, predicate) {
    while (state.pos <= state.maxPos && !predicate(state.symbols[state.pos])) {
      state.pos = (state.pos + 1) | 0;
    }
  }
  function cutStr(state, start, end2) {
    return state.symbols.slice(start, (end2 + 1) | 0).join("");
  }
  function parseInlineComment(state) {
    skip(state, 2);
    var start = state.pos;
    skipUntil(state, function (x2) {
      return x2 === "\n";
    });
    back(state, 1);
    return {
      TAG: 0,
      _0: {
        NAME: "InlineComment",
        VAL: cutStr(state, start, state.pos),
      },
    };
  }
  function parseBlockComment(state) {
    skip(state, 2);
    var loop = function (_acc) {
      while (true) {
        var acc = _acc;
        if (end(state)) {
          return {
            TAG: 1,
            _0: {
              TAG: 2,
              _0: "Was expecting a block comment close sequence */, but reached the end of the string",
            },
          };
        }
        var match2 = current2(state);
        var s = match2[0];
        switch (s) {
          case "*":
            if (match2[1] === "/") {
              skip(state, 1);
              return {
                TAG: 0,
                _0: {
                  NAME: "BlockComment",
                  VAL: acc,
                },
              };
            }
            break;
          case "/":
            if (match2[1] === "*") {
              skip(state, 2);
              var err = loop("");
              if (err.TAG !== 0) {
                return err;
              }
              var match$1 = err._0;
              if (typeof match$1 !== "object") {
                return err;
              }
              if (match$1.NAME !== "BlockComment") {
                return err;
              }
              skip(state, 1);
              _acc = acc + "/*" + match$1.VAL + "*/";
              continue;
            }
            break;
          default:
        }
        skip(state, 1);
        _acc = acc + s;
        continue;
      }
    };
    return loop("");
  }
  function isValidIdentifierCh(ch) {
    if (ch.length !== 1) {
      return false;
    }
    var match2 = ch.charCodeAt(0);
    if (match2 >= 91) {
      if (match2 >= 97) {
        return match2 < 123;
      } else {
        return match2 === 95;
      }
    } else if (match2 >= 58) {
      return match2 >= 65;
    } else {
      return match2 >= 48;
    }
  }
  function parseParameter(state) {
    skip(state, 1);
    var nameStart = state.pos;
    skipUntil(state, function (x2) {
      return !isValidIdentifierCh(x2);
    });
    if (nameStart === state.pos) {
      return {
        TAG: 1,
        _0: {
          TAG: 1,
          _0: "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \\:",
        },
      };
    }
    var name = cutStr(state, nameStart, (state.pos - 1) | 0);
    if (
      at(state, (state.pos + 0) | 0) === ":" &&
      at(state, (state.pos + 1) | 0) === "r" &&
      at(state, (state.pos + 2) | 0) === "a" &&
      at(state, (state.pos + 3) | 0) === "w" &&
      at(state, (state.pos + 4) | 0) === "<"
    ) {
      skip(state, 4);
      var seqStart = state.pos;
      skipUntil(state, function (x2) {
        return x2 !== "<";
      });
      var seqLen = (state.pos - seqStart) | 0;
      var items = [];
      var addItem = function (start) {
        items.push(cutStr(state, start, (((state.pos - seqLen) | 0) - 1) | 0));
      };
      var _itemStart = state.pos;
      var _delCount = 0;
      var _closeCount = 0;
      while (true) {
        var closeCount = _closeCount;
        var delCount = _delCount;
        var itemStart = _itemStart;
        if (closeCount === seqLen) {
          addItem(itemStart);
          back(state, 1);
          return {
            TAG: 0,
            _0: {
              NAME: "RawParameter",
              VAL: {
                name,
                options: items,
              },
            },
          };
        }
        if (delCount === seqLen) {
          addItem(itemStart);
          _closeCount = 0;
          _delCount = 0;
          _itemStart = state.pos;
          continue;
        }
        if (end(state)) {
          var seq = ">".repeat(seqLen);
          return {
            TAG: 1,
            _0: {
              TAG: 2,
              _0:
                "Was expecting a raw parameter close sequence " +
                seq +
                ", but reached the end of the string",
            },
          };
        }
        var match2 = at(state, state.pos);
        switch (match2) {
          case ">":
            skip(state, 1);
            _closeCount = (closeCount + 1) | 0;
            _delCount = 0;
            continue;
          case "|":
            skip(state, 1);
            _closeCount = 0;
            _delCount = (delCount + 1) | 0;
            continue;
          default:
            skip(state, 1);
            _closeCount = 0;
            _delCount = 0;
            continue;
        }
      }
    } else if (
      at(state, (state.pos + 0) | 0) === ":" &&
      at(state, (state.pos + 1) | 0) === "b" &&
      at(state, (state.pos + 2) | 0) === "a" &&
      at(state, (state.pos + 3) | 0) === "t" &&
      at(state, (state.pos + 4) | 0) === "c" &&
      at(state, (state.pos + 5) | 0) === "h" &&
      at(state, (state.pos + 6) | 0) === "<"
    ) {
      skip(state, 6);
      var seqStart$1 = state.pos;
      skipUntil(state, function (x2) {
        return x2 !== "<";
      });
      var seqLen$1 = (state.pos - seqStart$1) | 0;
      var skipBody = function (_count) {
        while (true) {
          var count = _count;
          if (count === seqLen$1) {
            return {
              TAG: 0,
              _0: void 0,
            };
          }
          if (end(state)) {
            var seq2 = ">".repeat(seqLen$1);
            return {
              TAG: 1,
              _0:
                "Was expecting a batch parameter close sequence " +
                seq2 +
                ", but reached the end of the string",
            };
          }
          var match3 = at(state, state.pos);
          if (match3 === ">") {
            skip(state, 1);
            _count = (count + 1) | 0;
            continue;
          }
          skip(state, 1);
          _count = 0;
          continue;
        }
      };
      var bodyStart = state.pos;
      var message = skipBody(0);
      if (message.TAG !== 0) {
        return {
          TAG: 1,
          _0: {
            TAG: 2,
            _0: message._0,
          },
        };
      }
      back(state, 1);
      var ast = toAst(state.symbols, bodyStart, (state.pos - seqLen$1) | 0);
      if (ast.TAG === 0) {
        return {
          TAG: 0,
          _0: {
            NAME: "BatchParameter",
            VAL: {
              name,
              separator: ",",
              body: ast._0,
            },
          },
        };
      } else {
        return {
          TAG: 1,
          _0: {
            TAG: 0,
            _0: ast._0,
          },
        };
      }
    } else {
      back(state, 1);
      return {
        TAG: 0,
        _0: {
          NAME: "Parameter",
          VAL: {
            name,
          },
        },
      };
    }
  }
  function toAst(symbols, min2, max2) {
    var state = {
      symbols,
      minPos: min2,
      maxPos: max2,
      pos: min2,
    };
    var ast = [];
    var sqlChunkStart = {
      contents: void 0,
    };
    var sqlChunkVal = {
      contents: "",
    };
    var pushSqlNode = function (param) {
      var start = sqlChunkStart.contents;
      if (start !== void 0) {
        ast.push({
          start,
          end: (state.pos - 1) | 0,
          node: {
            NAME: "SqlChunk",
            VAL: sqlChunkVal.contents,
          },
        });
        sqlChunkVal.contents = "";
        sqlChunkStart.contents = void 0;
        return;
      }
    };
    var pushSqlSymbol = function (symbol) {
      if (sqlChunkStart.contents === void 0) {
        sqlChunkStart.contents = state.pos;
      }
      sqlChunkVal.contents = sqlChunkVal.contents + symbol;
      return skip(state, 1);
    };
    var error2 = {
      contents: void 0,
    };
    var parseWith = function (parser) {
      pushSqlNode(void 0);
      var start = state.pos;
      var node = _1(parser, state);
      if (node.TAG === 0) {
        ast.push({
          start,
          end: state.pos,
          node: node._0,
        });
        return skip(state, 1);
      }
      var message = node._0;
      switch (message.TAG | 0) {
        case 0:
          error2.contents = message._0;
          return;
        case 1:
          error2.contents = {
            start,
            end: state.pos,
            message: message._0,
          };
          return;
        case 2:
          error2.contents = {
            start: state.pos,
            end: null,
            message: message._0,
          };
          return;
      }
    };
    while (!end(state) && error2.contents === void 0) {
      var match2 = current2(state);
      var s = match2[0];
      switch (s) {
        case "-":
          if (match2[1] === "-") {
            parseWith(parseInlineComment);
          } else {
            pushSqlSymbol(s);
          }
          break;
        case "/":
          if (match2[1] === "*") {
            parseWith(parseBlockComment);
          } else {
            pushSqlSymbol(s);
          }
          break;
        case ":":
          parseWith(parseParameter);
          break;
        case "\\":
          if (match2[1] === ":") {
            pushSqlSymbol(":");
            skip(state, 1);
          } else {
            pushSqlSymbol(s);
          }
          break;
        default:
          pushSqlSymbol(s);
      }
    }
    var err = error2.contents;
    if (err !== void 0) {
      return {
        TAG: 1,
        _0: err,
      };
    } else {
      pushSqlNode(void 0);
      return {
        TAG: 0,
        _0: ast,
      };
    }
  }
  function parseAttribute(text, id2) {
    var result = new RegExp(
      "^\\s*\\*?\\s*@" + id2 + ":\\s*(.*?)\\s*$",
      "m"
    ).exec(text);
    if (result === null) {
      return;
    }
    var str = result[1];
    if (!(str == null)) {
      return str;
    }
    throw {
      RE_EXN_ID: "Assert_failure",
      _1: ["Parser.res", 321, 14],
      Error: new Error(),
    };
  }
  function parseAttributes(ast) {
    var _i = 0;
    while (true) {
      var i = _i;
      if (i >= ast.length) {
        return {
          TAG: 0,
          _0: {
            name: null,
          },
        };
      }
      var match2 = ast[i];
      var match$1 = match2.node;
      if (typeof match$1 !== "object") {
        return {
          TAG: 0,
          _0: {
            name: null,
          },
        };
      }
      var variant = match$1.NAME;
      if (variant === "BlockComment" || variant === "InlineComment") {
        var value = parseAttribute(match$1.VAL, "name");
        if (value !== void 0) {
          if (/^[a-zA-Z][0-9a-zA-Z_]*$/.test(value)) {
            return {
              TAG: 0,
              _0: {
                name: value,
              },
            };
          } else {
            return {
              TAG: 1,
              _0: {
                start: match2.start,
                end: match2.end,
                message: "Invalid @name attribute: " + value,
              },
            };
          }
        }
        _i = (i + 1) | 0;
        continue;
      }
      if (variant !== "SqlChunk") {
        return {
          TAG: 0,
          _0: {
            name: null,
          },
        };
      }
      if (match$1.VAL.trim() !== "") {
        return {
          TAG: 0,
          _0: {
            name: null,
          },
        };
      }
      _i = (i + 1) | 0;
      continue;
    }
  }
  function findDuplicateParameter(_index, _seen, ast) {
    while (true) {
      var seen = _seen;
      var index = _index;
      if (index >= ast.length) {
        return;
      }
      var node = ast[index];
      var match2 = node.node;
      if (typeof match2 === "object") {
        var variant = match2.NAME;
        if (variant === "BatchParameter") {
          var match$1 = match2.VAL;
          var name = match$1.name;
          if (seen.includes(name)) {
            return node;
          }
          var some3 = findDuplicateParameter(0, [], match$1.body);
          if (some3 !== void 0) {
            return some3;
          }
          _seen = seen.concat([name]);
          _index = (index + 1) | 0;
          continue;
        }
        if (variant === "RawParameter" || variant === "Parameter") {
          var name$1 = match2.VAL.name;
          if (seen.includes(name$1)) {
            return node;
          }
          _seen = seen.concat([name$1]);
          _index = (index + 1) | 0;
          continue;
        }
        _index = (index + 1) | 0;
        continue;
      }
      _index = (index + 1) | 0;
      continue;
    }
  }
  function parseSymbols(symbols, start, end2) {
    var err = toAst(symbols, start, end2);
    if (err.TAG !== 0) {
      return err;
    }
    var ast = err._0;
    var match2 = findDuplicateParameter(0, [], ast);
    if (match2 !== void 0) {
      var match$1 = match2.node;
      if (typeof match$1 === "object") {
        var variant = match$1.NAME;
        if (
          variant === "RawParameter" ||
          variant === "Parameter" ||
          variant === "BatchParameter"
        ) {
          return {
            TAG: 1,
            _0: {
              start: match2.start,
              end: match2.end,
              message:
                'The name "' +
                match$1.VAL.name +
                '" is already used for another parameter',
            },
          };
        }
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: ["Parser.res", 390, 17],
          Error: new Error(),
        };
      }
      throw {
        RE_EXN_ID: "Assert_failure",
        _1: ["Parser.res", 390, 17],
        Error: new Error(),
      };
    }
    var err$1 = parseAttributes(ast);
    if (err$1.TAG === 0) {
      return {
        TAG: 0,
        _0: {
          attributes: err$1._0,
          ast,
        },
      };
    } else {
      return err$1;
    }
  }
  function parseFile(text) {
    var symbols = Array.from(text);
    var state = {
      symbols,
      minPos: 0,
      maxPos: (symbols.length - 1) | 0,
      pos: 0,
    };
    var parseComment = function (parser) {
      var start = state.pos;
      var match2 = _1(parser, state);
      if (match2.TAG === 0) {
        var match$1 = match2._0;
        if (typeof match$1 === "object") {
          var variant = match$1.NAME;
          if (variant === "BlockComment" || variant === "InlineComment") {
            var res = parseAttribute(match$1.VAL, "separator");
            if (res !== void 0) {
              if (res === "") {
                return {
                  TAG: 1,
                  _0: {
                    start,
                    end: state.pos,
                    message: "Invalid empty @separator attribute",
                  },
                };
              } else {
                return {
                  TAG: 0,
                  _0: res,
                };
              }
            } else {
              return {
                TAG: 0,
                _0: void 0,
              };
            }
          }
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: ["Parser.res", 429, 15],
            Error: new Error(),
          };
        }
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: ["Parser.res", 429, 15],
          Error: new Error(),
        };
      }
      var message = match2._0;
      switch (message.TAG | 0) {
        case 0:
          return {
            TAG: 1,
            _0: message._0,
          };
        case 1:
          return {
            TAG: 1,
            _0: {
              start,
              end: state.pos,
              message: message._0,
            },
          };
        case 2:
          return {
            TAG: 1,
            _0: {
              start: state.pos,
              end: null,
              message: message._0,
            },
          };
      }
    };
    var findSeparatorAttribute = function (_param2) {
      while (true) {
        if (end(state)) {
          return {
            TAG: 0,
            _0: void 0,
          };
        }
        var match2 = current2(state);
        var symbol = match2[0];
        switch (symbol) {
          case "-":
            if (match2[1] === "-") {
              var res = parseComment(parseInlineComment);
              if (res.TAG !== 0) {
                return res;
              }
              if (res._0 !== void 0) {
                return res;
              }
              skip(state, 1);
              _param2 = void 0;
              continue;
            }
            break;
          case "/":
            if (match2[1] === "*") {
              var res$1 = parseComment(parseBlockComment);
              if (res$1.TAG !== 0) {
                return res$1;
              }
              if (res$1._0 !== void 0) {
                return res$1;
              }
              skip(state, 1);
              _param2 = void 0;
              continue;
            }
            break;
          default:
        }
        if (symbol.trim() !== "") {
          return {
            TAG: 0,
            _0: void 0,
          };
        }
        skip(state, 1);
        _param2 = void 0;
        continue;
      }
    };
    var err = findSeparatorAttribute(void 0);
    if (err.TAG !== 0) {
      return err;
    }
    var x2 = err._0;
    var separator =
      x2 !== void 0
        ? (skip(state, 1), Array.from(x2))
        : ((state.pos = 0), [";"]);
    var isSeparator = function (_i) {
      while (true) {
        var i = _i;
        if (i >= separator.length) {
          return true;
        }
        var pos = (state.pos + i) | 0;
        if (
          pos >= state.symbols.length ||
          state.symbols[pos] !== separator[i]
        ) {
          return false;
        }
        _i = (i + 1) | 0;
        continue;
      }
    };
    var statements = [];
    var statementStart = {
      contents: void 0,
    };
    var pushStatement = function (param) {
      var start = statementStart.contents;
      if (start === void 0) {
        return;
      }
      var statement2 = parseSymbols(state.symbols, start, (state.pos - 1) | 0);
      if (statement2.TAG !== 0) {
        return statement2._0;
      }
      statements.push(statement2._0);
      statementStart.contents = void 0;
    };
    var _param;
    while (true) {
      if (end(state)) {
        var err$1 = pushStatement(void 0);
        if (err$1 !== void 0) {
          return {
            TAG: 1,
            _0: err$1,
          };
        } else {
          return {
            TAG: 0,
            _0: {
              separator: separator.join(""),
              statements,
            },
          };
        }
      }
      if (isSeparator(0)) {
        var err$2 = pushStatement(void 0);
        if (err$2 !== void 0) {
          return {
            TAG: 1,
            _0: err$2,
          };
        }
        skip(state, separator.length);
        _param = void 0;
        continue;
      }
      if (statementStart.contents === void 0) {
        statementStart.contents = state.pos;
      }
      skip(state, 1);
      _param = void 0;
      continue;
    }
  }

  // ../rescript-extended-sql/lib/es6/src/Printer.bs.js
  function setSafe(dict, key, val) {
    if (key !== "__proto__") {
      dict[key] = val;
    }
    return dict;
  }
  function print2(nextParamIndexOpt, ast) {
    var nextParamIndex =
      nextParamIndexOpt !== void 0
        ? nextParamIndexOpt
        : {
            contents: 1,
          };
    var genParamIndex = function (param) {
      var index = nextParamIndex.contents;
      nextParamIndex.contents = (index + 1) | 0;
      return index;
    };
    var _nodeIndex = 0;
    var _sqlAcc = [""];
    var _paramsAcc = {};
    while (true) {
      var paramsAcc = _paramsAcc;
      var sqlAcc = _sqlAcc;
      var nodeIndex = _nodeIndex;
      if (nodeIndex >= ast.length) {
        return [sqlAcc, paramsAcc];
      }
      var match2 = ast[nodeIndex];
      var match$1 = match2.node;
      var variant = match$1.NAME;
      if (variant === "BlockComment" || variant === "InlineComment") {
        _nodeIndex = (nodeIndex + 1) | 0;
        continue;
      }
      if (variant === "Parameter") {
        var paramIndex = genParamIndex(void 0);
        _paramsAcc = setSafe(paramsAcc, match$1.VAL.name, {
          NAME: "Parameter",
          VAL: {
            dataType: paramIndex,
          },
        });
        _sqlAcc = sqlAcc.map(
          (function (paramIndex2) {
            return function (x2) {
              return x2 + "$" + paramIndex2.toString();
            };
          })(paramIndex)
        );
        _nodeIndex = (nodeIndex + 1) | 0;
        continue;
      }
      if (variant === "SqlChunk") {
        var code2 = match$1.VAL;
        _sqlAcc = sqlAcc.map(
          (function (code3) {
            return function (x2) {
              return x2 + code3;
            };
          })(code2)
        );
        _nodeIndex = (nodeIndex + 1) | 0;
        continue;
      }
      if (variant === "RawParameter") {
        var match$2 = match$1.VAL;
        var options = match$2.options;
        if (options.length === 0) {
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: ["Printer.res", 35, 12],
            Error: new Error(),
          };
        }
        _paramsAcc = setSafe(paramsAcc, match$2.name, {
          NAME: "RawParameter",
          VAL: {
            options,
          },
        });
        _sqlAcc = sqlAcc.flatMap(
          (function (options2) {
            return function (x2) {
              return options2.map(function (y) {
                return x2 + y;
              });
            };
          })(options)
        );
        _nodeIndex = (nodeIndex + 1) | 0;
        continue;
      }
      var match$3 = match$1.VAL;
      var body = match$3.body;
      var separator = match$3.separator;
      var match$4 = print2(nextParamIndex, body);
      var subSql = match$4[0];
      var match$5 = print2(nextParamIndex, body);
      var subSql2 = match$5[0];
      _paramsAcc = setSafe(paramsAcc, match$3.name, {
        NAME: "BatchParameter",
        VAL: {
          separator,
          fields: match$4[1],
        },
      });
      _sqlAcc = sqlAcc
        .flatMap(
          (function (subSql3) {
            return function (x2) {
              return subSql3.map(function (y) {
                return x2 + y;
              });
            };
          })(subSql)
        )
        .flatMap(
          (function (separator2, subSql22) {
            return function (x2) {
              return subSql22.map(function (y) {
                return x2 + separator2 + y;
              });
            };
          })(separator, subSql2)
        );
      _nodeIndex = (nodeIndex + 1) | 0;
      continue;
    }
  }

  // ../rescript-pg/lib/es6/Pg.bs.js
  var Pg = __toESM(__require("pg"));
  var $$instanceof = (x2, C) => x2 instanceof C;
  function fromJsExn3(exn2) {
    if ($$instanceof(exn2, Pg.DatabaseError)) {
      return exn2;
    }
  }
  function fromExn3(exn2) {
    if (exn2.RE_EXN_ID === $$Error$1) {
      return fromJsExn3(exn2._1);
    }
  }
  function DatabaseError_toJsExn(prim) {
    return prim;
  }
  var DatabaseError2 = {
    fromJsExn: fromJsExn3,
    fromExn: fromExn3,
    toJsExn: DatabaseError_toJsExn,
  };

  // ../rescript-describe-query/lib/es6/src/Client.bs.js
  var Pg$1 = __toESM(__require("pg"));

  // ../../node_modules/rescript/lib/es6/js_null.js
  function fromOption(x2) {
    if (x2 !== void 0) {
      return valFromOption(x2);
    } else {
      return null;
    }
  }

  // ../../node_modules/rescript/lib/es6/belt_Int.js
  function fromString2(i) {
    var i$1 = parseInt(i, 10);
    if (isNaN(i$1)) {
      return;
    } else {
      return i$1;
    }
  }

  // ../rescript-describe-query/lib/es6/src/Loader.bs.js
  function make4(fetcher, keyToKey, valToKey) {
    return {
      cache: {},
      fetcher,
      keyToKey,
      valToKey,
      quenue: [],
      currentRequestResult: void 0,
    };
  }
  function fetchQuenue(loader) {
    if (loader.currentRequestResult !== void 0) {
      return;
    }
    if (loader.quenue.length <= 0) {
      loader.currentRequestResult = some(
        make2(function (resolve2) {
          loader.currentRequestResult = void 0;
          return _1(resolve2, void 0);
        })
      );
      return;
    }
    var requestKeys = {
      contents: [],
    };
    loader.currentRequestResult = some(
      map3(
        chain(resolve(void 0), function (param) {
          var keys = loader.quenue;
          loader.quenue = [];
          requestKeys.contents = keys;
          return _1(loader.fetcher, keys);
        }),
        function (values) {
          loader.currentRequestResult = void 0;
          var foundKeys = [];
          for (var i = 0, i_finish = values.length; i < i_finish; ++i) {
            var val = get(values, i);
            var keyStr = _1(loader.valToKey, val);
            foundKeys.push(keyStr);
            loader.cache["key_" + keyStr] = some(val);
          }
          for (
            var i$1 = 0, i_finish$1 = requestKeys.contents.length;
            i$1 < i_finish$1;
            ++i$1
          ) {
            var keyStr$1 = _1(loader.keyToKey, get(requestKeys.contents, i$1));
            if (!foundKeys.includes(keyStr$1)) {
              loader.cache["key_" + keyStr$1] = void 0;
            }
          }
        }
      )
    );
  }
  function get4(loader, key) {
    var keyStr = _1(loader.keyToKey, key);
    var val = get3(loader.cache, "key_" + keyStr);
    if (val !== void 0) {
      return resolve(valFromOption(val));
    } else {
      if (
        loader.quenue.every(function (k) {
          return _1(loader.keyToKey, k) !== keyStr;
        })
      ) {
        loader.quenue.push(key);
      }
      fetchQuenue(loader);
      return chain(getExn2(loader.currentRequestResult), function (param) {
        return get4(loader, key);
      });
    }
  }

  // ../rescript-describe-query/lib/es6/src/Queries.bs.js
  var statement =
    "-- @getTypes\nselect\n  t.oid,\n  t.typname,\n  t.typnamespace::regnamespace,\n  t.typlen,\n  t.typbyval,\n  t.typtype,\n  t.typcategory,\n  t.typispreferred,\n  t.typisdefined,\n  t.typdelim,\n  t.typrelid,\n  t.typelem,\n  t.typarray,\n  t.typnotnull,\n  t.typbasetype,\n  t.typtypmod,\n  t.typndims,\n  t.typcollation,\n  t.typdefault,\n  r.rngsubtype,\n  (select array_agg(a.attname::text order by a.attnum) \n    from pg_attribute a \n    where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_names,\n  (select array_agg(a.atttypid order by a.attnum) \n    from pg_attribute a where a.attrelid = t.typrelid \n    and a.attisdropped = false\n    and a.attnum >= 0) as attr_types,\n  (select array_agg(e.enumlabel::text order by e.enumsortorder)\n    from pg_enum e where e.enumtypid = t.oid) as enum_labels\nfrom pg_type t\nleft join pg_range r on r.rngtypid = t.oid\nwhere t.oid = ANY ($1::int[])";
  function convertParameters(r) {
    return [r.typeIds];
  }
  function convertRow(param) {
    return {
      oid: nullable_to_opt(param[0]),
      typname: nullable_to_opt(param[1]),
      typnamespace: nullable_to_opt(param[2]),
      typlen: nullable_to_opt(param[3]),
      typbyval: nullable_to_opt(param[4]),
      typtype: nullable_to_opt(param[5]),
      typcategory: nullable_to_opt(param[6]),
      typispreferred: nullable_to_opt(param[7]),
      typisdefined: nullable_to_opt(param[8]),
      typdelim: nullable_to_opt(param[9]),
      typrelid: nullable_to_opt(param[10]),
      typelem: nullable_to_opt(param[11]),
      typarray: nullable_to_opt(param[12]),
      typnotnull: nullable_to_opt(param[13]),
      typbasetype: nullable_to_opt(param[14]),
      typtypmod: nullable_to_opt(param[15]),
      typndims: nullable_to_opt(param[16]),
      typcollation: nullable_to_opt(param[17]),
      typdefault: nullable_to_opt(param[18]),
      rngsubtype: nullable_to_opt(param[19]),
      attr_names: nullable_to_opt(param[20]),
      attr_types: nullable_to_opt(param[21]),
      enum_labels: nullable_to_opt(param[22]),
    };
  }
  function runRaw(client, parameters) {
    return client.query({
      values: [parameters.typeIds],
      rowMode: "array",
      text: statement,
    });
  }
  function run(client, parameters) {
    var __x = runRaw(client, parameters);
    return __x.then(function (res) {
      return Promise.resolve(res.rows.map(convertRow));
    });
  }
  var GetTypes = {
    statement,
    convertParameters,
    convertRow,
    runRaw,
    run,
  };
  var statement$1 =
    "-- @getAttributes\nselect\n  a.attrelid,\n  a.attnum,\n  a.attrelid::regclass relname,\n  a.attname,\n  a.atttypid,\n  a.attndims,\n  a.atttypmod,\n  a.attnotnull,\n  a.attcollation,\n  a.attoptions,\n  a.attfdwoptions\nfrom pg_catalog.pg_attribute a where attrelid = ANY ($1::int[])";
  function convertParameters$1(r) {
    return [r.relIds];
  }
  function convertRow$1(param) {
    return {
      attrelid: nullable_to_opt(param[0]),
      attnum: nullable_to_opt(param[1]),
      relname: nullable_to_opt(param[2]),
      attname: nullable_to_opt(param[3]),
      atttypid: nullable_to_opt(param[4]),
      attndims: nullable_to_opt(param[5]),
      atttypmod: nullable_to_opt(param[6]),
      attnotnull: nullable_to_opt(param[7]),
      attcollation: nullable_to_opt(param[8]),
      attoptions: nullable_to_opt(param[9]),
      attfdwoptions: nullable_to_opt(param[10]),
    };
  }
  function runRaw$1(client, parameters) {
    return client.query({
      values: [parameters.relIds],
      rowMode: "array",
      text: statement$1,
    });
  }
  function run$1(client, parameters) {
    var __x = runRaw$1(client, parameters);
    return __x.then(function (res) {
      return Promise.resolve(res.rows.map(convertRow$1));
    });
  }
  var GetAttributes = {
    statement: statement$1,
    convertParameters: convertParameters$1,
    convertRow: convertRow$1,
    runRaw: runRaw$1,
    run: run$1,
  };

  // ../rescript-describe-query/lib/es6/src/Client.bs.js
  var DescribeQueryBasic = __toESM(require_describe_query_basic());
  function exn(opt, loc) {
    if (opt !== void 0) {
      return valFromOption(opt);
    } else {
      return raiseError("Unexpected None at: " + loc);
    }
  }
  function terminate(client) {
    client.terminating = true;
    var promise = client.terminationResult;
    if (promise !== void 0) {
      return valFromOption(promise);
    }
    var promise$1 = map3(
      all2([client.basicClient.terminate(), client.pgClient.end()]),
      function (param) {
        var match2 = client.onUnexpectedTerminationCb;
        var match$1 = client.fatalError;
        if (match2 !== void 0 && match$1 !== void 0) {
          return _1(match2, valFromOption(match$1));
        }
      }
    );
    client.terminationResult = some(promise$1);
    return promise$1;
  }
  function make5(pgConfig2, onUnexpectedTermination, param) {
    var config = pgConfig2 !== void 0 ? valFromOption(pgConfig2) : {};
    var error2;
    try {
      error2 = {
        TAG: 0,
        _0: new Pg$1.Client(config),
      };
    } catch (raw_exn) {
      var exn$1 = internalToOCamlException(raw_exn);
      error2 = {
        TAG: 1,
        _0: fromExnVerbose(exn$1),
      };
    }
    if (error2.TAG !== 0) {
      return resolve(error2);
    }
    var pgClient = error2._0;
    var clientRef = {
      contents: void 0,
    };
    var onFatalError = function (error3) {
      var client = clientRef.contents;
      if (client === void 0) {
        return raiseError(
          "A fatal error received before describe query client has beed initalised"
        );
      }
      var match2 = client.fatalError;
      if (match2 !== void 0) {
        return;
      } else {
        client.fatalError = some(error3);
        terminate(client);
        return;
      }
    };
    var onEnd = function (param2) {
      var client = clientRef.contents;
      var terminating = client !== void 0 ? client.terminating : false;
      if (!terminating) {
        return onFatalError(
          makeJsError(
            "Postgres client's connection has been terminated unexpectedly, without a error"
          )
        );
      }
    };
    pgClient.once("error", onFatalError).once("end", onEnd);
    return mapOk(
      chainOk(
        $$catch(pgClient.connect(), function (exn2) {
          return prepend(
            fromExn2(exn2),
            "Failed to connect to node-postgres client. Reason:"
          );
        }),
        function (param2) {
          return $$catch(
            DescribeQueryBasic.createClient(config, onFatalError),
            function (exn2) {
              return prepend(
                fromExn2(exn2),
                "Failed to connect to describe-query-basic client. Reason:"
              );
            }
          );
        }
      ),
      function (basicClient) {
        var client = {
          pgClient,
          basicClient,
          typesLoader: make4(
            function (keys) {
              return GetTypes.run(pgClient, {
                typeIds: keys,
              });
            },
            function (prim) {
              return prim.toString();
            },
            function (row) {
              return exn(
                row.oid,
                'File "Client.res", line 126, characters 32-39'
              ).toString();
            }
          ),
          fieldsLoader: make4(
            function (keys) {
              return GetAttributes.run(pgClient, {
                relIds: keys.map(function (prim) {
                  return prim[0];
                }),
              });
            },
            function (param2) {
              return [param2[0], param2[1]].join("|");
            },
            function (row) {
              return [
                exn(
                  row.attrelid,
                  'File "Client.res", line 131, characters 38-45'
                ),
                exn(
                  row.attnum,
                  'File "Client.res", line 131, characters 64-71'
                ),
              ].join("|");
            }
          ),
          onUnexpectedTerminationCb: onUnexpectedTermination,
          terminating: false,
          terminationResult: void 0,
          fatalError: void 0,
        };
        clientRef.contents = client;
        return {
          TAG: 0,
          _0: client,
        };
      }
    );
  }
  function loadAll(items, loadItem) {
    return all(items.map(__1(loadItem)));
  }
  function loadType(client, oid) {
    return chain(resolve(void 0), function (param) {
      return chain(get4(client.typesLoader, oid), function (opt) {
        if (opt === void 0) {
          return raiseError("Data type with oid " + oid + " not found");
        }
        var x2 = exn(
          opt.typtype,
          'File "Client.res", line 151, characters 50-57'
        );
        var typeType;
        switch (x2) {
          case "b":
            typeType = "b";
            break;
          case "c":
            typeType = "c";
            break;
          case "d":
            typeType = "d";
            break;
          case "e":
            typeType = "e";
            break;
          case "m":
            typeType = "m";
            break;
          case "p":
            typeType = "p";
            break;
          case "r":
            typeType = "r";
            break;
          default:
            typeType = raiseError("Unexpected value of pg_type.typtype: " + x2);
        }
        var x$1 = exn(
          opt.typcategory,
          'File "Client.res", line 162, characters 54-61'
        );
        var category;
        switch (x$1) {
          case "A":
            category = "A";
            break;
          case "B":
            category = "B";
            break;
          case "C":
            category = "C";
            break;
          case "D":
            category = "D";
            break;
          case "E":
            category = "E";
            break;
          case "G":
            category = "G";
            break;
          case "I":
            category = "I";
            break;
          case "N":
            category = "N";
            break;
          case "P":
            category = "P";
            break;
          case "R":
            category = "R";
            break;
          case "S":
            category = "S";
            break;
          case "T":
            category = "T";
            break;
          case "U":
            category = "U";
            break;
          case "V":
            category = "V";
            break;
          case "X":
            category = "X";
            break;
          default:
            category = raiseError(
              "Unexpected value of pg_type.typcategory: " + x$1
            );
        }
        var byVal = exn(
          opt.typbyval,
          'File "Client.res", line 181, characters 41-48'
        );
        var oid$1 = exn(
          opt.oid,
          'File "Client.res", line 182, characters 34-41'
        );
        var name = exn(
          opt.typname,
          'File "Client.res", line 183, characters 39-46'
        );
        var namespace = exn(
          opt.typnamespace,
          'File "Client.res", line 184, characters 49-56'
        );
        var len = exn(
          opt.typlen,
          'File "Client.res", line 185, characters 37-44'
        );
        var isPreferred = exn(
          opt.typispreferred,
          'File "Client.res", line 186, characters 53-60'
        );
        var isDefined = exn(
          opt.typisdefined,
          'File "Client.res", line 187, characters 49-56'
        );
        return map3(
          typeType === "c"
            ? map3(
                loadAll(
                  exn(
                    opt.attr_types,
                    'File "Client.res", line 209, characters 18-25'
                  ),
                  function (oid2) {
                    return loadType(client, oid2);
                  }
                ),
                function (dataTypes) {
                  return {
                    NAME: "Composite",
                    VAL: {
                      fields: zip(
                        exn(
                          opt.attr_names,
                          'File "Client.res", line 213, characters 60-67'
                        ),
                        dataTypes
                      ),
                    },
                  };
                }
              )
            : typeType === "d"
            ? map3(
                loadType(
                  client,
                  exn(
                    opt.typbasetype,
                    'File "Client.res", line 219, characters 45-52'
                  )
                ),
                function (x3) {
                  return {
                    NAME: "Domain",
                    VAL: {
                      baseType: x3,
                      notNull: exn(
                        opt.typnotnull,
                        'File "Client.res", line 223, characters 46-53'
                      ),
                      nDims: exn(
                        opt.typndims,
                        'File "Client.res", line 224, characters 42-49'
                      ),
                      default: fromOption(opt.typdefault),
                      typmod: exn(
                        opt.typtypmod,
                        'File "Client.res", line 226, characters 44-51'
                      ),
                      collation: exn(
                        opt.typcollation,
                        'File "Client.res", line 227, characters 50-57'
                      ),
                    },
                  };
                }
              )
            : typeType === "e"
            ? resolve({
                NAME: "Enum",
                VAL: {
                  enumValues: exn(
                    opt.enum_labels,
                    'File "Client.res", line 205, characters 80-87'
                  ),
                },
              })
            : typeType === "r" || typeType === "m"
            ? map3(
                loadType(
                  client,
                  exn(
                    opt.rngsubtype,
                    'File "Client.res", line 200, characters 44-51'
                  )
                ),
                function (x3) {
                  if (typeType === "m") {
                    return {
                      NAME: "MultiRange",
                      VAL: {
                        elemType: x3,
                      },
                    };
                  } else {
                    return {
                      NAME: "Range",
                      VAL: {
                        elemType: x3,
                      },
                    };
                  }
                }
              )
            : typeType === "p"
            ? resolve("Pseudo")
            : category === "A"
            ? map3(
                loadType(
                  client,
                  exn(
                    opt.typelem,
                    'File "Client.res", line 192, characters 41-48'
                  )
                ),
                function (x3) {
                  return {
                    NAME: "Array",
                    VAL: {
                      elemType: x3,
                      delim: exn(
                        opt.typdelim,
                        'File "Client.res", line 193, characters 78-85'
                      ),
                    },
                  };
                }
              )
            : resolve("Base"),
          function (data) {
            return {
              oid: oid$1,
              name,
              namespace,
              len,
              byVal,
              typeType,
              category,
              isPreferred,
              isDefined,
              typeSpecificData: data,
            };
          }
        );
      });
    });
  }
  function describe(client, query) {
    var promise = chainOk(
      $$catch(client.basicClient.describe(query), function (exn2) {
        var dbErr = DatabaseError2.fromExn(exn2);
        if (dbErr === void 0) {
          return prepend(
            fromExnVerbose(exn2),
            "Could not get types for the query:\n" + query + "\nError:"
          );
        }
        var str = dbErr.position;
        var pos = str !== void 0 ? fromString2(str) : void 0;
        var highlighted =
          pos !== void 0
            ? pos !== 0
              ? highlight(query, (pos - 1) | 0, (pos - 1) | 0)
              : highlight(query, 0, 0)
            : query;
        var base = prepend(
          fromExn2(exn2),
          "Could not get types for the query:\n" + highlighted + "\nError:"
        );
        var detail = dbErr.detail;
        var base$1 =
          detail !== void 0 && detail !== ""
            ? append(base, "\nDetail: " + detail)
            : base;
        var hint = dbErr.hint;
        if (hint !== void 0 && hint !== "") {
          return append(base$1, "\nHint: " + hint);
        } else {
          return base$1;
        }
      }),
      function (description) {
        var parametersTypes = loadAll(description.parameters, function (id2) {
          return loadType(client, id2);
        });
        var fieldsTypes = loadAll(
          getWithDefault(description.row, []),
          function (x2) {
            return loadType(client, x2.dataTypeID);
          }
        );
        var tableColums = loadAll(
          getWithDefault(description.row, []),
          function (x2) {
            return get4(client.fieldsLoader, [x2.tableID, x2.columnID]);
          }
        );
        return mapOk(
          $$catch(
            all3([parametersTypes, fieldsTypes, tableColums]),
            function (exn2) {
              return prepend(
                fromExn2(exn2),
                "Failed to fetch additional information about query:\n" +
                  query +
                  "\nError:"
              );
            }
          ),
          function (param) {
            var row = description.row;
            return {
              TAG: 0,
              _0: {
                parameters: param[0],
                row:
                  row !== void 0
                    ? zip(zip(row, param[1]), param[2]).map(function (param2) {
                        var tableColumn = param2[1];
                        var match2 = param2[0];
                        return {
                          name: match2[0].name,
                          dataType: match2[1],
                          tableColumn:
                            tableColumn !== void 0
                              ? {
                                  attrelid: fromOption(tableColumn.attrelid),
                                  attrelname: fromOption(tableColumn.relname),
                                  attname: exn(
                                    tableColumn.attname,
                                    'File "Client.res", line 325, characters 40-47'
                                  ),
                                  attnotnull: exn(
                                    tableColumn.attnotnull,
                                    'File "Client.res", line 326, characters 46-53'
                                  ),
                                  attnum: fromOption(tableColumn.attnum),
                                  attndims: exn(
                                    tableColumn.attndims,
                                    'File "Client.res", line 328, characters 42-49'
                                  ),
                                  atttypmod: exn(
                                    tableColumn.atttypmod,
                                    'File "Client.res", line 329, characters 44-51'
                                  ),
                                  attoptions: fromOption(
                                    tableColumn.attoptions
                                  ),
                                  attfdwoptions: fromOption(
                                    tableColumn.attfdwoptions
                                  ),
                                }
                              : null,
                        };
                      })
                    : null,
              },
            };
          }
        );
      }
    );
    return chain(
      $$catch(promise, function (err) {
        return err;
      }),
      function (param) {
        var match2 = client.fatalError;
        var match$1 = client.terminationResult;
        if (match2 !== void 0) {
          return resolve({
            TAG: 1,
            _0: prepend(
              fromJsExnVerbose(valFromOption(match2)),
              "While fetching information about query:\n" +
                query +
                "\nthe describe-query client has been terminated as a result of a fatal error:"
            ),
          });
        } else if (match$1 !== void 0) {
          return resolve({
            TAG: 1,
            _0: fromText(
              "While fetching information about query:\n" +
                query +
                "\nthe describe-query client has been terminated by the user"
            ),
          });
        } else {
          return promise;
        }
      }
    );
  }

  // lib/es6/src/Commands.bs.js
  function mapParameters(parameters, fn) {
    return map4(function (x2) {
      var variant = x2.NAME;
      if (variant === "Parameter") {
        return {
          NAME: "Parameter",
          VAL: {
            dataType: _1(fn, x2.VAL.dataType),
          },
        };
      }
      if (variant === "RawParameter") {
        return x2;
      }
      var match2 = x2.VAL;
      return {
        NAME: "BatchParameter",
        VAL: {
          separator: match2.separator,
          fields: mapParameters(match2.fields, fn),
        },
      };
    }, parameters);
  }
  function build(ctx) {
    var sources2 = getSomeOrExitWithError(sources(ctx), "No sources specified");
    var generator2 = getSomeOrExitWithError(
      generator(ctx),
      "No generator specified"
    );
    return done(
      chain(make5(some(pgConfig(ctx)), void 0, void 0), function (client) {
        var client$1 = getOkOrExitWithError(void 0, client);
        return chain(
          mapAsyncSeq(sources2, function (source) {
            return chain(resolveGlobs(source.input), function (files) {
              return mapAsyncSeq(
                getOkOrExitWithError(
                  "Could not turn glob(s) into a list of files. Reason:",
                  files
                ),
                function (path) {
                  return chain(
                    catchAndExitWithError(
                      'Unable to read file "' + path + '". Reason:',
                      Promises.readFile(path, "utf8")
                    ),
                    function (content) {
                      var x2 = parseFile(content);
                      var parsedFile;
                      parsedFile =
                        x2.TAG === 0
                          ? x2._0
                          : exitWithError(void 0, x2._0.message);
                      var prinedStatements = map5(
                        parsedFile.statements,
                        function (statement2) {
                          var match2 = print2(void 0, statement2.ast);
                          return {
                            statement: statement2,
                            sqlQueries: match2[0],
                            parameters: match2[1],
                          };
                        }
                      );
                      return chain(
                        chain(
                          mapAsyncSeq(prinedStatements, function (data) {
                            return mapAsyncSeq(
                              data.sqlQueries,
                              function (query) {
                                return map3(
                                  describe(client$1, query.trim()),
                                  function (x3) {
                                    return getOkOrExitWithError(void 0, x3);
                                  }
                                );
                              }
                            );
                          }),
                          function (descriptions) {
                            return _1(generator2.generate, {
                              filePath: path,
                              rawFileContent: content,
                              separator: parsedFile.separator,
                              statements: mapWithIndex2(
                                prinedStatements,
                                function (i, data) {
                                  var match2 = getExn3(
                                    getExn3(descriptions, i),
                                    0
                                  );
                                  var parameters = match2.parameters;
                                  return {
                                    attributes: data.statement.attributes,
                                    ast: data.statement.ast,
                                    parameters: mapParameters(
                                      data.parameters,
                                      function (index) {
                                        return getExn3(parameters, index);
                                      }
                                    ),
                                    row: match2.row,
                                  };
                                }
                              ),
                            });
                          }
                        ),
                        function (generatedCode) {
                          var getOutputPath = getWithDefault(
                            source.output,
                            generator2.defaultOutputPath
                          );
                          var outputPath;
                          try {
                            outputPath = _1(getOutputPath, path);
                          } catch (raw_exn) {
                            var exn2 = internalToOCamlException(raw_exn);
                            outputPath = exitWithLoggableError(
                              void 0,
                              fromExnVerbose(exn2)
                            );
                          }
                          return catchAndExitWithError(
                            void 0,
                            Promises.writeFile(
                              outputPath,
                              generatedCode,
                              "utf8"
                            )
                          );
                        }
                      );
                    }
                  );
                }
              );
            });
          }),
          function (param) {
            return catchAndExitWithError(void 0, terminate(client$1));
          }
        );
      }),
      function (param) {}
    );
  }
  function watch2(ctx) {
    return info(ctx, "TODO: watch");
  }
  function pipe(ctx) {
    return info(ctx, "TODO: pipe");
  }

  // lib/es6/src/Minimist.bs.js
  var import_minimist = __toESM(require_minimist());
  function get5(r, k) {
    var $$float = classify(r[k]);
    if (typeof $$float === "number") {
      switch ($$float) {
        case 0:
          return {
            TAG: 0,
            _0: false,
          };
        case 1:
          return {
            TAG: 0,
            _0: true,
          };
        case 2:
        case 3:
          return 0;
      }
    } else {
      switch ($$float.TAG | 0) {
        case 0:
          return {
            TAG: 2,
            _0: $$float._0,
          };
        case 1:
          return {
            TAG: 1,
            _0: $$float._0,
          };
        default:
          throw {
            RE_EXN_ID: "Assert_failure",
            _1: ["Minimist.res", 15, 9],
            Error: new Error(),
          };
      }
    }
  }
  function parse3(
    parametersOpt,
    flags,
    aliases,
    stopEarly,
    separate,
    onUnknown,
    argv4
  ) {
    var parameters = parametersOpt !== void 0 ? parametersOpt : [];
    return (0, import_minimist.default)(argv4, {
      string: ["_"].concat(parameters),
      boolean: flags,
      alias: aliases,
      stopEarly,
      "--": separate,
      unknown: onUnknown,
    });
  }

  // lib/es6/src/Cli.bs.js
  var version = "0.1.0";
  var header =
    "Typesafe SQL CLI for PostgreSQL [ver. " +
    version +
    "]\n\nThis is a tool for generating typings for PostgreSQL queries.";
  var usage =
    'Usage: typesafe-pg [--version | -v] <command> \n       [--input | -i <glob>] [--output | -o <pattern>] [--generator | -g <generator>]\n       [--config | -c <path>] [--host | -h <db-host>] [--port | -p <db-port>]\n       [--username | -U <db-user>] [--password | -W <db-password>]\n       [--dbname | -d <db-database-name>] [--connection | -C <db-connection-string>]\n       [--debug | -D] [--quiet | -q] [--color | --no-color]\n\ntypesafe-pg build - Generate typings\ntypesafe-pg watch - Generate, and continue updating as the input files change\ntypesafe-pg pipe  - Generate using stdin as the input and output to stdout \n\nExample:\n\n  $ typesafe-pg build \\\n    --connection "postgres://user:password@host:5432/database" \\\n    --input "queries/*.sql" \\\n    --output "{dir}/{name}.res" \\\n    --generator rescript\n       \nFull documentation is available at \nhttps://github.com/rpominov/typesafe-sql/tree/master/packages/pg-cli\n';
  var quiet2 = {
    contents: false,
  };
  function exitWithError2(err) {
    return exitWithError(some(quiet2.contents ? void 0 : usage), err);
  }
  function exitWithLoggableError2(err) {
    return exitWithLoggableError(some(quiet2.contents ? void 0 : usage), err);
  }
  var x = get2(argv2, 2);
  var match =
    x !== void 0
      ? x.startsWith("-")
        ? [void 0, argv2.slice(2)]
        : [x, argv2.slice(3)]
      : [void 0, []];
  var unparsedArgv = match[1];
  var command = match[0];
  var command$1;
  if (command !== void 0) {
    switch (command) {
      case "build":
        command$1 = "build";
        break;
      case "pipe":
        command$1 = "pipe";
        break;
      case "watch":
        command$1 = "watch";
        break;
      default:
        command$1 = exitWithError2("Unknown command: " + command);
    }
  } else {
    command$1 = "help";
  }
  function outputValidator(name) {
    return Validators.either(
      Validators.string,
      function (str) {
        if (str === "") {
          return {
            TAG: 1,
            _0: fromText(
              'Invalid "' + name + '" value. It cannot be an empty string.'
            ),
          };
        }
        var fn = make(str);
        if (fn.TAG === 0) {
          return {
            TAG: 0,
            _0: fn._0,
          };
        } else {
          return {
            TAG: 1,
            _0: fromText('Invalid "' + name + '" value. ' + fn._0),
          };
        }
      },
      Validators.$$function,
      function (fn) {
        return {
          TAG: 0,
          _0: function (str) {
            return fn(str);
          },
        };
      }
    );
  }
  function resolveGenerator(moduleId) {
    var err = $$require(moduleId);
    var ok;
    if (err.TAG === 0) {
      var obj = err._0;
      if (obj !== void 0) {
        var obj$1 = valFromOption(obj);
        ok = validate(function (param) {
          var obj$2 = Validators.cast(obj$1, Validators.object, "The export");
          return {
            name: moduleId,
            defaultOutputPath: Validators.property(
              obj$2,
              "defaultOutputPath",
              outputValidator("defaultOutputPath")
            ),
            generate: Validators.property(
              obj$2,
              "generate",
              Validators.$$function
            ),
          };
        });
      } else {
        ok = {
          TAG: 1,
          _0: fromText("Not found"),
        };
      }
    } else {
      ok = err;
    }
    if (ok.TAG === 0) {
      return ok;
    } else {
      return {
        TAG: 1,
        _0: prepend(
          ok._0,
          'Failed to load generator from "' + moduleId + '". Reason:\n'
        ),
      };
    }
  }
  var ArgsParseError = /* @__PURE__ */ create(
    "Cli-TypesafeSqlPgCli.ArgsParseError"
  );
  var argv3;
  try {
    result = parse3(
      [
        "generator",
        "output",
        "input",
        "config",
        "host",
        "port",
        "username",
        "password",
        "dbname",
        "connection",
      ],
      ["version", "debug", "quiet", "color"],
      {
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
        connection: "C",
      },
      void 0,
      true,
      function (s) {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 1,
            _0: s,
          },
          Error: new Error(),
        };
      },
      unparsedArgv
    );
    getFlagExn = function (name2) {
      var v = get5(result, name2);
      if (typeof v === "number") {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 0,
            _0: name2,
            _1: v,
          },
          Error: new Error(),
        };
      }
      switch (v.TAG | 0) {
        case 0:
          return v._0;
        case 1:
          switch (v._0) {
            case "false":
              return false;
            case "true":
              return true;
            default:
              throw {
                RE_EXN_ID: ArgsParseError,
                _1: {
                  TAG: 0,
                  _0: name2,
                  _1: v,
                },
                Error: new Error(),
              };
          }
        case 2:
          throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: 0,
              _0: name2,
              _1: v,
            },
            Error: new Error(),
          };
      }
    };
    getParam = function (name2) {
      var val = get5(result, name2);
      if (typeof val === "number" || val.TAG !== 1) {
        return;
      } else {
        return val._0;
      }
    };
    quiet2.contents = getFlagExn("quiet");
    if (unparsedArgv.includes("--")) {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 1,
          _0: "--",
        },
        Error: new Error(),
      };
    }
    arr = result._;
    if (arr.length !== 0) {
      throw {
        RE_EXN_ID: ArgsParseError,
        _1: {
          TAG: 1,
          _0: arr[0],
        },
        Error: new Error(),
      };
    }
    name = getParam("generator");
    if (name !== void 0) {
      generator$1 = resolveGenerator(name);
      if (generator$1.TAG === 0) {
        generator2 = generator$1._0;
      } else {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 3,
            _0: "generator",
            _1: generator$1._0,
          },
          Error: new Error(),
        };
      }
    } else {
      generator2 = void 0;
    }
    str = getParam("output");
    if (str !== void 0) {
      if (str === "") {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 2,
            _0: "output",
            _1: "It cannot be an empty string.",
          },
          Error: new Error(),
        };
      }
      fn = make(str);
      if (fn.TAG === 0) {
        tmp = fn._0;
      } else {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 2,
            _0: "output",
            _1: fn._0,
          },
          Error: new Error(),
        };
      }
    } else {
      tmp = void 0;
    }
    str$1 = getParam("port");
    if (str$1 !== void 0) {
      $$float = fromString(str$1);
      if ($$float !== void 0) {
        if (($$float | 0) === $$float) {
          tmp$1 = $$float | 0;
        } else {
          throw {
            RE_EXN_ID: ArgsParseError,
            _1: {
              TAG: 2,
              _0: "port",
              _1: "Not an integer: " + str$1,
            },
            Error: new Error(),
          };
        }
      } else {
        throw {
          RE_EXN_ID: ArgsParseError,
          _1: {
            TAG: 2,
            _0: "port",
            _1: "Not an integer: " + str$1,
          },
          Error: new Error(),
        };
      }
    } else {
      tmp$1 = void 0;
    }
    argv3 = {
      version: getFlagExn("version"),
      debug: getFlagExn("debug"),
      quiet: getFlagExn("quiet"),
      generator: generator2,
      input: getParam("input"),
      output: tmp,
      config: getParam("config"),
      host: getParam("host"),
      port: tmp$1,
      username: getParam("username"),
      password: getParam("password"),
      dbname: getParam("dbname"),
      connection: getParam("connection"),
    };
  } catch (raw_error) {
    error2 = internalToOCamlException(raw_error);
    if (error2.RE_EXN_ID === ArgsParseError) {
      error$1 = error2._1;
      switch (error$1.TAG | 0) {
        case 0:
          str$2 = error$1._1;
          name$1 = error$1._0;
          if (typeof str$2 === "number") {
            argv3 = exitWithError2(
              "Invalid --" +
                name$1 +
                " value. A boolen flag can have values true/false or no value."
            );
          } else {
            switch (str$2.TAG | 0) {
              case 0:
                argv3 = exitWithError2(
                  "Invalid --" +
                    name$1 +
                    " value. A boolen flag can have values true/false or no value."
                );
                break;
              case 1:
                argv3 = exitWithError2(
                  "Invalid --" +
                    name$1 +
                    " value. A boolen flag can have values true/false or no value, got: " +
                    str$2._0
                );
                break;
              case 2:
                argv3 = exitWithError2(
                  "Invalid --" +
                    name$1 +
                    " value. A boolen flag can have values true/false or no value, got: " +
                    str$2._0.toString()
                );
                break;
            }
          }
          break;
        case 1:
          argv3 = exitWithError2("Unknown argument: " + error$1._0);
          break;
        case 2:
          argv3 = exitWithError2(
            "Invalid --" + error$1._0 + " value. " + error$1._1
          );
          break;
        case 3:
          argv3 = exitWithLoggableError2(
            prepend(error$1._1, "Invalid --" + error$1._0 + " value.")
          );
          break;
      }
    } else {
      argv3 = rethrowAsNative(error2);
    }
  }
  var result;
  var getFlagExn;
  var getParam;
  var arr;
  var name;
  var generator2;
  var generator$1;
  var str;
  var tmp;
  var fn;
  var str$1;
  var tmp$1;
  var $$float;
  var error2;
  var error$1;
  var str$2;
  var name$1;
  if (argv3.version) {
    console.log(version);
  } else {
    path = argv3.config;
    if (path !== void 0) {
      result$1 = $$require(path);
      res =
        result$1.TAG === 0 && result$1._0 === void 0
          ? [
              path,
              {
                TAG: 1,
                _0: fromText("File doesn't exist"),
              },
            ]
          : [path, result$1];
    } else {
      res$1 = $$require("./typesafe-pg.config.json");
      if (res$1.TAG === 0 && res$1._0 === void 0) {
        res$2 = $$require("./typesafe-pg.config.js");
        if (res$2.TAG === 0 && res$2._0 === void 0) {
          res$3 = $$require("./package.json");
          if (res$3.TAG === 0) {
            obj = res$3._0;
            if (obj !== void 0) {
              obj$1 = valFromOption(obj);
              res = [
                "./package.json",
                validate(function (param) {
                  return Validators.property(
                    Validators.cast(obj$1, Validators.object, "This"),
                    "typesafe-pg",
                    Validators.nullable(Validators.unknown)
                  );
                }),
              ];
            } else {
              res = ["./package.json", res$3];
            }
          } else {
            res = ["./package.json", res$3];
          }
        } else {
          res = ["./typesafe-pg.config.js", res$2];
        }
      } else {
        res = ["./typesafe-pg.config.json", res$1];
      }
    }
    match$1 = res[1];
    if (match$1.TAG === 0) {
      obj$2 = match$1._0;
      if (obj$2 !== void 0) {
        obj$3 = valFromOption(obj$2);
        match$2 = [
          res[0],
          validate(function (param) {
            var obj$4 = Validators.cast(obj$3, Validators.object, "This");
            var name = Validators.property(
              obj$4,
              "generator",
              Validators.nullable(Validators.string)
            );
            var generator2;
            if (name !== void 0) {
              var error2 = resolveGenerator(name);
              generator2 =
                error2.TAG === 0 ? error2._0 : Validators.failed(error2._0);
            } else {
              generator2 = void 0;
            }
            var some3 = Validators.property(
              obj$4,
              "sources",
              Validators.nullable(
                Validators.arrayOf(
                  Validators.objectOf2(
                    "input",
                    Validators.either(
                      Validators.string,
                      function (x2) {
                        return {
                          TAG: 0,
                          _0: [x2],
                        };
                      },
                      Validators.arrayOf(Validators.string),
                      function (xs) {
                        return {
                          TAG: 0,
                          _0: xs,
                        };
                      }
                    ),
                    "output",
                    Validators.nullable(outputValidator("output")),
                    function (i, o) {
                      return {
                        input: i,
                        output: o,
                      };
                    }
                  )
                )
              )
            );
            return {
              debug: Validators.property(
                obj$4,
                "debug",
                Validators.nullable(Validators.bool)
              ),
              quiet: Validators.property(
                obj$4,
                "quiet",
                Validators.nullable(Validators.bool)
              ),
              generator: generator2,
              host: Validators.property(
                obj$4,
                "host",
                Validators.nullable(Validators.string)
              ),
              port: Validators.property(
                obj$4,
                "port",
                Validators.nullable(Validators.$$int)
              ),
              username: Validators.property(
                obj$4,
                "username",
                Validators.nullable(Validators.string)
              ),
              password: Validators.property(
                obj$4,
                "password",
                Validators.nullable(Validators.string)
              ),
              dbname: Validators.property(
                obj$4,
                "dbname",
                Validators.nullable(Validators.string)
              ),
              connection: Validators.property(
                obj$4,
                "connection",
                Validators.nullable(Validators.string)
              ),
              sources: some3 !== void 0 && some3.length !== 0 ? some3 : void 0,
            };
          }),
        ];
      } else {
        match$2 = [
          "%fallback",
          {
            TAG: 0,
            _0: {
              debug: void 0,
              quiet: void 0,
              generator: void 0,
              host: void 0,
              port: void 0,
              username: void 0,
              password: void 0,
              dbname: void 0,
              connection: void 0,
              sources: void 0,
            },
          },
        ];
      }
    } else {
      match$2 = res;
    }
    data = match$2[1];
    path$1 = match$2[0];
    if (data.TAG === 0) {
      if (!quiet2.contents && command$1 !== "help") {
        console.error(Chalk$1.dim("Using config from:"), Chalk$1.dim(path$1));
      }
      config = data._0;
    } else {
      config = exitWithLoggableError2(
        prepend(
          data._0,
          'Failed to load config file "' + path$1 + '"! Reason:\n\n'
        )
      );
    }
    ctx = {
      config,
      argv: argv3,
    };
    if (command$1 === "watch") {
      watch2(ctx);
    } else if (command$1 === "pipe") {
      pipe(ctx);
    } else if (command$1 === "build") {
      build(ctx);
    } else {
      info(ctx, header);
      infoNl(ctx);
      info(ctx, usage);
    }
  }
  var path;
  var res;
  var result$1;
  var res$1;
  var res$2;
  var res$3;
  var obj;
  var obj$1;
  var match$1;
  var match$2;
  var obj$2;
  var obj$3;
  var data;
  var path$1;
  var config;
  var ctx;
})();
