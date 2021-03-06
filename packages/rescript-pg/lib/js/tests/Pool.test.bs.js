// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Pg = require("../Pg.bs.js");
var Curry = require("rescript/lib/js/curry.js");

function $$then(promise, fn) {
  return promise.then(Curry.__1(fn));
}

test("Connect", (function () {
        expect.assertions(1);
        var name = "pool.Connect.test";
        var pool = Pg.Pool.make(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, name, undefined, undefined, undefined, undefined, undefined);
        var promise = pool.connect();
        return promise.then(function (client) {
                    var promise = Pg.query(client, [name], "SELECT count(*) FROM pg_stat_activity WHERE application_name = $1");
                    return promise.then(function (result) {
                                client.release(undefined);
                                var promise = pool.end();
                                return promise.then(function (param) {
                                            expect(result.rows).toEqual([{
                                                    count: "1"
                                                  }]);
                                            return Promise.resolve(undefined);
                                          });
                              });
                  });
      }));

exports.$$then = $$then;
/*  Not a pure module */
