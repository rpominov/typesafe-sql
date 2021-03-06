// Generated by ReScript, PLEASE EDIT WITH CARE

import * as Pg from "../Pg.bs.js";
import * as Pg$1 from "pg";
import * as Curry from "rescript/lib/es6/curry.js";
import * as Belt_Option from "rescript/lib/es6/belt_Option.js";
import * as Belt_Result from "rescript/lib/es6/belt_Result.js";
import * as Caml_option from "rescript/lib/es6/caml_option.js";

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

var client = Pg.Client.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);

beforeAll(function () {
      return client.connect();
    });

afterAll(function () {
      return client.end();
    });

test("Pg.query", (function () {
        expect.assertions(1);
        var promise = Pg.query(client, undefined, "SELECT 42 num");
        return promise.then(function (result) {
                    expect(result.rows).toEqual([{
                            num: 42
                          }]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.query + params", (function () {
        expect.assertions(1);
        var promise = Pg.query(client, [
              42,
              "text"
            ], "SELECT $1::int num, $2::text str");
        return promise.then(function (result) {
                    expect(result.rows).toEqual([{
                            num: 42,
                            str: "text"
                          }]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.queryCb", (function (done) {
        expect.assertions(1);
        return Pg.queryCb(client, undefined, "SELECT 42 num", (function (result) {
                      expect(Belt_Result.getExn(result).rows).toEqual([{
                              num: 42
                            }]);
                      return done();
                    }));
      }));

test("Pg.queryCb + params", (function (done) {
        expect.assertions(1);
        return Pg.queryCb(client, [
                    42,
                    "text"
                  ], "SELECT $1::int num, $2::text str", (function (result) {
                      expect(Belt_Result.getExn(result).rows).toEqual([{
                              num: 42,
                              str: "text"
                            }]);
                      return done();
                    }));
      }));

test("Pg.queryConf", (function () {
        expect.assertions(1);
        var promise = client.query({
              text: "SELECT 42 num"
            });
        return promise.then(function (result) {
                    expect(result.rows).toEqual([{
                            num: 42
                          }]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.queryConf + rowMode:array", (function () {
        expect.assertions(1);
        var promise = client.query({
              rowMode: "array",
              text: "SELECT 42 num"
            });
        return promise.then(function (result) {
                    expect(result.rows).toEqual([[42]]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.queryConf + params", (function () {
        expect.assertions(1);
        var promise = client.query({
              values: [
                42,
                "text"
              ],
              text: "SELECT $1::int num, $2::text str"
            });
        return promise.then(function (result) {
                    expect(result.rows).toEqual([{
                            num: 42,
                            str: "text"
                          }]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.queryConfCb", (function (done) {
        expect.assertions(1);
        return Pg.queryConfCb(client, {
                    text: "SELECT 42 num"
                  }, (function (result) {
                      expect(Belt_Result.getExn(result).rows).toEqual([{
                              num: 42
                            }]);
                      return done();
                    }));
      }));

test("Custom type parser", (function () {
        expect.assertions(1);
        var typesParser = Pg.TypesParser.make(Caml_option.some(Pg$1.types), undefined);
        typesParser.setTypeParser(23, (function (str) {
                return "Custom: " + str;
              }));
        var promise = client.query({
              types: typesParser,
              text: "SELECT 42 num, TRUE bool"
            });
        return promise.then(function (result) {
                    expect(result.rows).toEqual([{
                            num: "Custom: 42",
                            bool: true
                          }]);
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.query + error", (function () {
        expect.assertions(1);
        var promise = Pg.query(client, undefined, "SELECT 42 + ''");
        var __x = promise.then(function (param) {
              return Promise.resolve(undefined);
            });
        return __x.catch(function (err) {
                    expect(Belt_Option.getExn(Pg.DatabaseError.fromJsExn(err)).code).toEqual("22P02");
                    return Promise.resolve(undefined);
                  });
      }));

test("Pg.queryCb + err", (function (done) {
        expect.assertions(1);
        return Pg.queryCb(client, undefined, "SELECT 42 + ''", (function (result) {
                      var tmp;
                      tmp = result.TAG === /* Ok */0 ? undefined : Belt_Option.getExn(Pg.DatabaseError.fromJsExn(result._0)).code;
                      expect(tmp).toEqual("22P02");
                      return done();
                    }));
      }));

export {
  $$then ,
  client ,
  
}
/* client Not a pure module */
