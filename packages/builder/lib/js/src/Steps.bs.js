// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var Curry = require("rescript/lib/js/curry.js");
var Js_exn = require("rescript/lib/js/js_exn.js");
var Belt_Int = require("rescript/lib/js/belt_Int.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Caml_option = require("rescript/lib/js/caml_option.js");
var Promise$TypesafeSqlBuilder = require("./Promise.bs.js");
var LogError$TypesafeSqlBuilder = require("./LogError.bs.js");
var DescribeQuery = require("@typesafe-sql/describe-query");

function read(path) {
  return Promise$TypesafeSqlBuilder.make(function (resolve) {
              Fs.readFile(path, "utf8", (function (err, content) {
                      return resolve((err == null) ? (
                                    content !== undefined ? ({
                                          TAG: /* Ok */0,
                                          _0: content
                                        }) : ({
                                          TAG: /* Ok */0,
                                          _0: ""
                                        })
                                  ) : ({
                                      TAG: /* Error */1,
                                      _0: LogError$TypesafeSqlBuilder.wrapNodeCbError(err)
                                    }));
                    }));
              
            });
}

var Read = {
  read: read
};

function isValidIdentifierCh(ch) {
  var code = ch.charCodeAt(0);
  if (code >= 48 && code <= 57 || code >= 65 && code <= 90) {
    return true;
  } else if (code >= 97) {
    return code <= 122;
  } else {
    return false;
  }
}

function parseStatement(text) {
  var parameters = [];
  var commitParameter = function (newText, parameter, nextCh) {
    var index = parameters.push(parameter);
    return [
            newText + "$" + String(index) + nextCh,
            undefined
          ];
  };
  var helper = function (_newText, _state, _pos, _parameter, _name) {
    while(true) {
      var name = _name;
      var parameter = _parameter;
      var pos = _pos;
      var state = _state;
      var newText = _newText;
      var nextCh = text.charAt(pos);
      var match = text.charAt(pos + 1 | 0);
      var state$p;
      if (nextCh === "") {
        state$p = undefined;
      } else {
        switch (state) {
          case /* Code */0 :
              switch (nextCh) {
                case "-" :
                    state$p = match === "-" ? /* InlineComment */1 : state;
                    break;
                case "/" :
                    state$p = match === "*" ? /* BlockComment */2 : state;
                    break;
                default:
                  state$p = state;
              }
              break;
          case /* InlineComment */1 :
              state$p = nextCh === "\n" ? /* Code */0 : state;
              break;
          case /* BlockComment */2 :
              state$p = nextCh === "*" && match === "/" ? /* Code */0 : state;
              break;
          
        }
      }
      var match$1;
      if (parameter !== undefined) {
        match$1 = state$p !== undefined && !(state$p !== 0 || !isValidIdentifierCh(nextCh)) ? [
            newText,
            parameter + nextCh
          ] : commitParameter(newText, parameter, nextCh);
      } else {
        var exit = 0;
        if (state$p !== undefined && !(state$p !== 0 || nextCh !== "$")) {
          match$1 = [
            newText,
            ""
          ];
        } else {
          exit = 1;
        }
        if (exit === 1) {
          match$1 = [
            newText + nextCh,
            undefined
          ];
        }
        
      }
      var newText$p = match$1[0];
      var name$p;
      if (typeof name === "number") {
        if (name === /* Looking */0) {
          var exit$1 = 0;
          if (state$p === 0) {
            name$p = /* NotFound */1;
          } else {
            exit$1 = 1;
          }
          if (exit$1 === 1) {
            name$p = nextCh === "@" ? ({
                  TAG: /* Filling */0,
                  _0: ""
                }) : name;
          }
          
        } else {
          name$p = name;
        }
      } else if (name.TAG === /* Filling */0) {
        var val = name._0;
        name$p = state$p !== undefined && state$p !== 0 && isValidIdentifierCh(nextCh) ? ({
              TAG: /* Filling */0,
              _0: val + nextCh
            }) : ({
              TAG: /* Found */1,
              _0: val
            });
      } else {
        name$p = name;
      }
      if (state$p === undefined) {
        if (typeof name$p === "number" || name$p.TAG !== /* Found */1) {
          return {
                  TAG: /* Error */1,
                  _0: /* NameNotFound */0
                };
        } else {
          return {
                  TAG: /* Ok */0,
                  _0: [
                    name$p._0,
                    newText$p
                  ]
                };
        }
      }
      _name = name$p;
      _parameter = match$1[1];
      _pos = pos + 1 | 0;
      _state = state$p;
      _newText = newText$p;
      continue ;
    };
  };
  var message = helper("", /* Code */0, 0, undefined, /* Looking */0);
  if (message.TAG !== /* Ok */0) {
    return {
            TAG: /* Error */1,
            _0: message._0
          };
  }
  var match = message._0;
  return {
          TAG: /* Ok */0,
          _0: {
            name: match[0],
            parameters: parameters,
            originalStatement: text,
            processedStatement: match[1]
          }
        };
}

function parse(text) {
  var statements = text.split(";").map(function (prim) {
          return prim.trim();
        }).filter(function (val) {
        return val !== "";
      });
  var _results = [];
  var _i = 0;
  while(true) {
    var i = _i;
    var results = _results;
    if (i === statements.length) {
      return {
              TAG: /* Ok */0,
              _0: results
            };
    }
    var statement = Caml_array.get(statements, i);
    var res = parseStatement(statement);
    if (res.TAG !== /* Ok */0) {
      return {
              TAG: /* Error */1,
              _0: "The following statement is missing a name declaration. Did you forget to add a \"-- @someName\" comment?\n\n" + statement
            };
    }
    _i = i + 1 | 0;
    _results = results.concat([res._0]);
    continue ;
  };
}

function asyncParse(text) {
  var msg = parse(text);
  var tmp;
  tmp = msg.TAG === /* Ok */0 ? ({
        TAG: /* Ok */0,
        _0: msg._0
      }) : ({
        TAG: /* Error */1,
        _0: LogError$TypesafeSqlBuilder.wrapString(msg._0)
      });
  return Promise$TypesafeSqlBuilder.resolve(tmp);
}

function highlight(code, position) {
  var lines = code.split("\n");
  var newLines = [];
  var helper = function (_i, _pos) {
    while(true) {
      var pos = _pos;
      var i = _i;
      if (i === lines.length) {
        return ;
      }
      var line = Caml_array.get(lines, i);
      newLines.push(line);
      var pos$p = (pos - line.length | 0) - 1 | 0;
      if (pos > 0 && pos$p <= 0) {
        newLines.push(" ".repeat(pos - 1 | 0) + "^");
      }
      _pos = pos$p;
      _i = i + 1 | 0;
      continue ;
    };
  };
  helper(0, position);
  return newLines.join("\n");
}

function describe(client, text) {
  return Promise$TypesafeSqlBuilder.$$catch(client.describe(text), (function (__x) {
                return LogError$TypesafeSqlBuilder.wrap(__x, (function (exn) {
                              var match;
                              if (exn.RE_EXN_ID === Js_exn.$$Error) {
                                var e = exn._1;
                                var dbe = DescribeQuery.getErrorMetaData(e).databaseError;
                                if (dbe !== undefined) {
                                  var dbe$1 = Caml_option.valFromOption(dbe);
                                  match = [
                                    LogError$TypesafeSqlBuilder.Loggable.make(DescribeQuery.getVerboseMessage(dbe$1)),
                                    dbe$1.position
                                  ];
                                } else {
                                  match = [
                                    LogError$TypesafeSqlBuilder.Loggable.fromJsExn(e),
                                    undefined
                                  ];
                                }
                              } else {
                                match = [
                                  LogError$TypesafeSqlBuilder.Loggable.make(exn),
                                  undefined
                                ];
                              }
                              var p = Belt_Option.flatMap(match[1], Belt_Int.fromString);
                              var statement = p !== undefined ? highlight(text, p) : text;
                              return [
                                      LogError$TypesafeSqlBuilder.Loggable.make("Database server could not process the following statement:\n\n" + statement),
                                      match[0]
                                    ];
                            }));
              }));
}

function describeMany(client, texts) {
  var helper = function (result, i) {
    if (i === texts.length) {
      return result;
    } else {
      return Promise$TypesafeSqlBuilder.chainOk(result, (function (result$p) {
                    return helper(Promise$TypesafeSqlBuilder.chainOk(describe(client, Caml_array.get(texts, i)), (function (description) {
                                      return Promise$TypesafeSqlBuilder.resolve({
                                                  TAG: /* Ok */0,
                                                  _0: result$p.concat([description])
                                                });
                                    })), i + 1 | 0);
                  }));
    }
  };
  return helper(Promise$TypesafeSqlBuilder.resolve({
                  TAG: /* Ok */0,
                  _0: []
                }), 0);
}

function compose(parsed, described) {
  if (parsed.length !== described.length) {
    Js_exn.raiseError("Parsed / described mismatch (queries count)");
  }
  return Belt_Array.zipBy(parsed, described, (function (p, d) {
                if (p.parameters.length !== d.input.length) {
                  Js_exn.raiseError("Parsed / described mismatch (parameters count)");
                }
                return {
                        name: p.name,
                        originalStatement: p.originalStatement,
                        processedStatement: p.processedStatement,
                        parameters: Belt_Array.zipBy(p.parameters, d.input, (function (name, data) {
                                return {
                                        name: name,
                                        datatype: data.type
                                      };
                              })),
                        columns: d.output
                      };
              }));
}

function generate(parsed, described, generator) {
  return Promise$TypesafeSqlBuilder.$$catch(Promise$TypesafeSqlBuilder.chain(Promise$TypesafeSqlBuilder.resolve(undefined), (function (param) {
                    return Curry._1(generator, compose(parsed, described));
                  })), LogError$TypesafeSqlBuilder.wrapThrownByUserProvidedFn);
}

function exampleGenerator(data) {
  return Promise$TypesafeSqlBuilder.resolve(JSON.stringify(data.map(function (item) {
                      var arr = item.columns;
                      return {
                              name: item.name,
                              statement: item.processedStatement,
                              parameters: item.parameters.map(function (p) {
                                    return {
                                            name: p.name,
                                            type: p.datatype.typname
                                          };
                                  }),
                              columns: arr !== undefined ? arr.map(function (c) {
                                      return {
                                              name: c.name,
                                              type: c.type.typname
                                            };
                                    }) : null
                            };
                    }), null, 2));
}

var Generate = {
  compose: compose,
  generate: generate,
  exampleGenerator: exampleGenerator
};

function write(path, content) {
  return Promise$TypesafeSqlBuilder.make(function (resolve) {
              Fs.writeFile(path, content, "utf8", (function (err) {
                      return resolve((err == null) ? ({
                                      TAG: /* Ok */0,
                                      _0: undefined
                                    }) : ({
                                      TAG: /* Error */1,
                                      _0: LogError$TypesafeSqlBuilder.wrapNodeCbError(err)
                                    }));
                    }));
              
            });
}

var Write = {
  write: write
};

var Parse = {
  parseStatement: parseStatement,
  parse: parse,
  asyncParse: asyncParse
};

var Describe = {
  describe: describe,
  describeMany: describeMany
};

exports.Read = Read;
exports.Parse = Parse;
exports.Describe = Describe;
exports.Generate = Generate;
exports.Write = Write;
/* fs Not a pure module */
