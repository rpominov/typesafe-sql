// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("rescript-jest/lib/js/Jest.bs.js");
var Curry = require("rescript/lib/js/curry.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Process = require("process");
var Belt_Int = require("rescript/lib/js/belt_Int.js");
var Client$DescribeQuery = require("../Client.bs.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

var env = Process.env;

var pgUser = Jest.getExn(Js_dict.get(env, "PGUSER"), "File \"Connect.test.res\", line 6, characters 48-55");

var pgPassword = Jest.getExn(Js_dict.get(env, "PGPASSWORD"), "File \"Connect.test.res\", line 7, characters 56-63");

var pgDatabase = Jest.getExn(Js_dict.get(env, "PGDATABASE"), "File \"Connect.test.res\", line 8, characters 56-63");

var pgHost = Jest.getExn(Js_dict.get(env, "PGHOST"), "File \"Connect.test.res\", line 9, characters 48-55");

var pgPort = Jest.getExn(Belt_Int.fromString(Jest.getExn(Js_dict.get(env, "PGPORT"), "File \"Connect.test.res\", line 10, characters 48-55")), "File \"Connect.test.res\", line 10, characters 86-93");

test("No config", (function () {
        var promise = Client$DescribeQuery.make(undefined, undefined, undefined);
        return promise.then(function (result) {
                    return Client$DescribeQuery.terminate(Jest.getOkExn(result, "File \"Connect.test.res\", line 13, characters 49-56"));
                  });
      }));

test("With config", (function () {
        var promise = Client$DescribeQuery.make({
              user: pgUser,
              password: pgPassword,
              host: pgHost,
              database: pgDatabase,
              port: pgPort
            }, undefined, undefined);
        return promise.then(function (result) {
                    return Client$DescribeQuery.terminate(Jest.getOkExn(result, "File \"Connect.test.res\", line 27, characters 37-44"));
                  });
      }));

exports.$$then = $$then;
exports.env = env;
exports.pgUser = pgUser;
exports.pgPassword = pgPassword;
exports.pgDatabase = pgDatabase;
exports.pgHost = pgHost;
exports.pgPort = pgPort;
/* env Not a pure module */
