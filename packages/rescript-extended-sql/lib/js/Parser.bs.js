// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


function nextEq(arr, pos, val) {
  if ((pos + 1 | 0) < arr.length) {
    return arr[pos + 1 | 0] === val;
  } else {
    return false;
  }
}

function parseInlineComment(_acc, symbols, _startPos) {
  while(true) {
    var startPos = _startPos;
    var acc = _acc;
    if (startPos >= symbols.length) {
      return {
              TAG: /* Ok */0,
              _0: [
                startPos,
                {
                  TAG: /* InlineComment */1,
                  _0: acc
                }
              ]
            };
    }
    var s = symbols[startPos];
    if (s === "\n") {
      return {
              TAG: /* Ok */0,
              _0: [
                startPos + 1 | 0,
                {
                  TAG: /* InlineComment */1,
                  _0: acc
                }
              ]
            };
    }
    _startPos = startPos + 1 | 0;
    _acc = acc + s;
    continue ;
  };
}

function parseBlockComment(_acc, symbols, _startPos) {
  while(true) {
    var startPos = _startPos;
    var acc = _acc;
    if (startPos >= symbols.length) {
      return {
              TAG: /* Error */1,
              _0: {
                message: "Was expecting a block comment close sequence */, but reached the end of the string",
                pos: startPos
              }
            };
    }
    var s = symbols[startPos];
    switch (s) {
      case "*" :
          if (nextEq(symbols, startPos, "/")) {
            return {
                    TAG: /* Ok */0,
                    _0: [
                      startPos + 2 | 0,
                      {
                        TAG: /* BlockComment */2,
                        _0: acc
                      }
                    ]
                  };
          }
          break;
      case "/" :
          if (nextEq(symbols, startPos, "*")) {
            var err = parseBlockComment("", symbols, startPos + 2 | 0);
            if (err.TAG !== /* Ok */0) {
              return err;
            }
            var match = err._0;
            var content = match[1];
            if (content.TAG === /* BlockComment */2) {
              _startPos = match[0];
              _acc = acc + "/*" + content._0 + "*/";
              continue ;
            }
            throw {
                  RE_EXN_ID: "Assert_failure",
                  _1: [
                    "Parser.res",
                    48,
                    13
                  ],
                  Error: new Error()
                };
          }
          break;
      default:
        
    }
    _startPos = startPos + 1 | 0;
    _acc = acc + s;
    continue ;
  };
}

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

var partial_arg = [];

function parseParameter(_acc, symbols, _startPos) {
  while(true) {
    var startPos = _startPos;
    var acc = _acc;
    if (startPos >= symbols.length) {
      return {
              TAG: /* Ok */0,
              _0: [
                startPos,
                {
                  TAG: /* Parameter */3,
                  _0: acc
                }
              ]
            };
    }
    var symbol = symbols[startPos];
    if (!isValidIdentifierCh(symbol)) {
      if (acc === "") {
        return {
                TAG: /* Error */1,
                _0: {
                  message: "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \\:",
                  pos: startPos - 1 | 0
                }
              };
      } else if (symbol === ":" && nextEq(symbols, startPos, "r") && nextEq(symbols, startPos + 1 | 0, "a") && nextEq(symbols, startPos + 2 | 0, "w") && nextEq(symbols, startPos + 3 | 0, "<")) {
        var param = startPos + 5 | 0;
        var _curAcc = "";
        var _acc$1 = partial_arg;
        var _delSize = 1;
        var _closeCnt = 0;
        var _delCnt = 0;
        var _startPos$1 = param;
        while(true) {
          var startPos$1 = _startPos$1;
          var delCnt = _delCnt;
          var closeCnt = _closeCnt;
          var delSize = _delSize;
          var acc$1 = _acc$1;
          var curAcc = _curAcc;
          var commit = (function(curAcc,acc$1,delSize){
          return function commit(param) {
            return acc$1.concat([curAcc.slice(0, -delSize | 0)]);
          }
          }(curAcc,acc$1,delSize));
          if (closeCnt === delSize) {
            return {
                    TAG: /* Ok */0,
                    _0: [
                      startPos$1,
                      {
                        TAG: /* Raw */4,
                        _0: acc,
                        _1: commit(undefined)
                      }
                    ]
                  };
          }
          if (delCnt === delSize) {
            _delCnt = 0;
            _closeCnt = 0;
            _acc$1 = commit(undefined);
            _curAcc = "";
            continue ;
          }
          if (startPos$1 >= symbols.length) {
            return {
                    TAG: /* Error */1,
                    _0: {
                      message: "Was expecting a raw parameter close sequence " + ">".repeat(delSize) + ", but reached the end of the string",
                      pos: startPos$1
                    }
                  };
          }
          var s = symbols[startPos$1];
          switch (s) {
            case "<" :
                if (curAcc === "" && acc$1.length === 0) {
                  _startPos$1 = startPos$1 + 1 | 0;
                  _delCnt = 0;
                  _closeCnt = 0;
                  _delSize = delSize + 1 | 0;
                  _acc$1 = [];
                  _curAcc = "";
                  continue ;
                }
                break;
            case ">" :
                _startPos$1 = startPos$1 + 1 | 0;
                _delCnt = 0;
                _closeCnt = closeCnt + 1 | 0;
                _curAcc = curAcc + ">";
                continue ;
            case "|" :
                _startPos$1 = startPos$1 + 1 | 0;
                _delCnt = delCnt + 1 | 0;
                _closeCnt = 0;
                _curAcc = curAcc + "|";
                continue ;
            default:
              
          }
          _startPos$1 = startPos$1 + 1 | 0;
          _delCnt = 0;
          _closeCnt = 0;
          _curAcc = curAcc + s;
          continue ;
        };
      } else if (symbol === ":" && nextEq(symbols, startPos, "b") && nextEq(symbols, startPos + 1 | 0, "a") && nextEq(symbols, startPos + 2 | 0, "t") && nextEq(symbols, startPos + 3 | 0, "c") && nextEq(symbols, startPos + 4 | 0, "h") && nextEq(symbols, startPos + 5 | 0, "<")) {
        var _acc$2 = "";
        var _delSize$1 = 1;
        var _closeCnt$1 = 0;
        var _startPos$2 = startPos + 7 | 0;
        while(true) {
          var startPos$2 = _startPos$2;
          var closeCnt$1 = _closeCnt$1;
          var delSize$1 = _delSize$1;
          var acc$2 = _acc$2;
          if (closeCnt$1 === delSize$1) {
            var ast = toAst(acc$2.slice(0, -delSize$1 | 0));
            if (ast.TAG === /* Ok */0) {
              return {
                      TAG: /* Ok */0,
                      _0: [
                        startPos$2,
                        {
                          TAG: /* Batch */5,
                          _0: acc,
                          _1: ast._0
                        }
                      ]
                    };
            } else {
              return ast;
            }
          }
          if (startPos$2 >= symbols.length) {
            return {
                    TAG: /* Error */1,
                    _0: {
                      message: "Was expecting a batch parameter close sequence " + ">".repeat(delSize$1) + ", but reached the end of the string",
                      pos: startPos$2
                    }
                  };
          }
          var s$1 = symbols[startPos$2];
          switch (s$1) {
            case "<" :
                if (acc$2 === "") {
                  _startPos$2 = startPos$2 + 1 | 0;
                  _closeCnt$1 = 0;
                  _delSize$1 = delSize$1 + 1 | 0;
                  _acc$2 = "";
                  continue ;
                }
                break;
            case ">" :
                _startPos$2 = startPos$2 + 1 | 0;
                _closeCnt$1 = closeCnt$1 + 1 | 0;
                _acc$2 = acc$2 + ">";
                continue ;
            default:
              
          }
          _startPos$2 = startPos$2 + 1 | 0;
          _closeCnt$1 = 0;
          _acc$2 = acc$2 + s$1;
          continue ;
        };
      } else {
        return {
                TAG: /* Ok */0,
                _0: [
                  startPos,
                  {
                    TAG: /* Parameter */3,
                    _0: acc
                  }
                ]
              };
      }
    }
    _startPos = startPos + 1 | 0;
    _acc = acc + symbol;
    continue ;
  };
}

function toAst(text) {
  var symbols = Array.from(text);
  var pos = {
    contents: 0
  };
  var ast = [];
  var currentSQLChunk = {
    contents: ""
  };
  var error = {
    contents: undefined
  };
  var commitSQLChunk = function (param) {
    if (currentSQLChunk.contents !== "") {
      ast.push({
            TAG: /* SQL_Chunk */0,
            _0: currentSQLChunk.contents
          });
      currentSQLChunk.contents = "";
      return ;
    }
    
  };
  var commitSubParse = function (result) {
    commitSQLChunk(undefined);
    if (result.TAG !== /* Ok */0) {
      error.contents = result._0;
      return ;
    }
    var match = result._0;
    ast.push(match[1]);
    pos.contents = match[0];
    
  };
  var nextEq$1 = function (val) {
    return nextEq(symbols, pos.contents, val);
  };
  while(error.contents === undefined && pos.contents < symbols.length) {
    var s = symbols[pos.contents];
    var exit = 0;
    switch (s) {
      case "-" :
          if (nextEq$1("-")) {
            commitSubParse(parseInlineComment("", symbols, pos.contents + 2 | 0));
          } else {
            exit = 1;
          }
          break;
      case "/" :
          if (nextEq$1("*")) {
            commitSubParse(parseBlockComment("", symbols, pos.contents + 2 | 0));
          } else {
            exit = 1;
          }
          break;
      case ":" :
          commitSubParse(parseParameter("", symbols, pos.contents + 1 | 0));
          break;
      case "\\" :
          if (nextEq$1(":")) {
            currentSQLChunk.contents = currentSQLChunk.contents + ":";
            pos.contents = pos.contents + 2 | 0;
          } else {
            exit = 1;
          }
          break;
      default:
        exit = 1;
    }
    if (exit === 1) {
      currentSQLChunk.contents = currentSQLChunk.contents + s;
      pos.contents = pos.contents + 1 | 0;
    }
    
  };
  var err = error.contents;
  if (err !== undefined) {
    return {
            TAG: /* Error */1,
            _0: err
          };
  } else {
    commitSQLChunk(undefined);
    return {
            TAG: /* Ok */0,
            _0: ast
          };
  }
}

function parseAttributes(ast) {
  var allComments = ast.flatMap(function (node) {
          switch (node.TAG | 0) {
            case /* InlineComment */1 :
            case /* BlockComment */2 :
                return [node._0];
            default:
              return [];
          }
        }).join("\n");
  var result = /@name:(.*)/.exec(allComments);
  var name;
  if (result !== null) {
    var value = result[1];
    if (value == null) {
      name = {
        TAG: /* Error */1,
        _0: "Invalid @name attribute"
      };
    } else {
      var trimmed = value.trim();
      name = /^[a-zA-Z][0-9a-zA-Z_]*$/.test(trimmed) ? ({
            TAG: /* Ok */0,
            _0: trimmed
          }) : ({
            TAG: /* Error */1,
            _0: "Invalid @name attribute: " + trimmed
          });
    }
  } else {
    name = {
      TAG: /* Ok */0,
      _0: undefined
    };
  }
  if (name.TAG === /* Ok */0) {
    return {
            TAG: /* Ok */0,
            _0: {
              name: name._0
            }
          };
  } else {
    return {
            TAG: /* Error */1,
            _0: {
              message: name._0,
              pos: -1
            }
          };
  }
}

function parse(text) {
  var err = toAst(text);
  if (err.TAG !== /* Ok */0) {
    return err;
  }
  var ast = err._0;
  var err$1 = parseAttributes(ast);
  if (err$1.TAG === /* Ok */0) {
    return {
            TAG: /* Ok */0,
            _0: {
              rawText: text,
              attributes: err$1._0,
              ast: ast
            }
          };
  } else {
    return err$1;
  }
}

exports.parse = parse;
/* No side effect */
