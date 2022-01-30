// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';


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
            newText + "$" + index.toString() + nextCh,
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
        var exit$1 = 0;
        if (state$p === 0) {
          name$p = /* NotFound */0;
        } else {
          exit$1 = 1;
        }
        if (exit$1 === 1) {
          name$p = nextCh === "@" ? ({
                TAG: /* InProgress */0,
                _0: ""
              }) : name;
        }
        
      } else if (name.TAG === /* InProgress */0) {
        var val = name._0;
        name$p = state$p !== undefined && state$p !== 0 && isValidIdentifierCh(nextCh) ? ({
              TAG: /* InProgress */0,
              _0: val + nextCh
            }) : ({
              TAG: /* Done */1,
              _0: val
            });
      } else {
        name$p = name;
      }
      if (state$p === undefined) {
        return [
                name$p,
                newText$p
              ];
      }
      _name = name$p;
      _parameter = match$1[1];
      _pos = pos + 1 | 0;
      _state = state$p;
      _newText = newText$p;
      continue ;
    };
  };
  var match = helper("", /* Code */0, 0, undefined, /* NotFound */0);
  return [
          match[0],
          parameters,
          match[1]
        ];
}

function parseFileContents(text) {
  return text.split(";").map(function (x) {
              return parseStatement(x.trim());
            });
}

var example = "\n\n-- @userById\nSELECT * FROM users WHERE id = $id;\n\n-- @createUser \nINSERT INTO users(name) \nVALUES ($name/**/) /* test comment $name */\nRETURNING *;SELECT * FROM users WHERE id = $id OR $id = 0 -- @userById1";

console.log(parseFileContents(example));

exports.isValidIdentifierCh = isValidIdentifierCh;
exports.parseStatement = parseStatement;
exports.parseFileContents = parseFileContents;
exports.example = example;
/*  Not a pure module */
