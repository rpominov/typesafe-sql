// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Curry = require("rescript/lib/js/curry.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Caml_array = require("rescript/lib/js/caml_array.js");
var Client$TypesafeSqlRescriptDescribeQuery = require("@typesafe-sql/rescript-describe-query/lib/js/Client.bs.js");

function moduleName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function identifier(x) {
  return "\\\"" + x + "\"";
}

function fixBuildInType(x) {
  switch (x) {
    case "bool" :
    case "char" :
        return x + "_";
    default:
      return x;
  }
}

function optional(type_) {
  return "option<" + type_ + ">";
}

function pgToReasonType(datatype) {
  var info = Client$TypesafeSqlRescriptDescribeQuery.getBaseInfo(datatype);
  return [
            moduleName(info.namespace),
            identifier(fixBuildInType(info.name))
          ].join(".");
}

function indent(str) {
  return "  " + str.split("\n").join("\n  ");
}

function tupleOf(items) {
  var match = items.length;
  if (match !== 0) {
    if (match !== 1) {
      return "(\n" + indent(items.join(",\n")) + "\n)";
    } else {
      return "array<" + Caml_array.get(items, 0) + ">";
    }
  } else {
    return "array<unit>";
  }
}

function recordOf(items) {
  if (items.length === 0) {
    return "Js.Dict.t<unit>";
  } else {
    return [
              "{",
              indent(items.map(function (param) {
                          return identifier(param[0]) + ": " + param[1];
                        }).join(",\n")),
              "}"
            ].join("\n");
  }
}

function codeComment(str) {
  return "// " + str.split("\n").join("\n// ");
}

function moduleDefinition(name, body) {
  return [
            "module " + moduleName(name) + " = {",
            indent(body),
            "}"
          ].join("\n");
}

function stringVar(name, content) {
  return "let " + name + " = " + JSON.stringify(content);
}

function typeDefinition(name, value) {
  return "type " + name + " = " + value;
}

function uniqueBy(arr, fn) {
  return Js_dict.values(Js_dict.fromArray(arr.map(function (x) {
                      return [
                              Curry._1(fn, x),
                              x
                            ];
                    })));
}

var runRawExternal = "@send external runRaw: (NodePostgres.client, {\"values\": parameters, \"text\": string, \"rowMode\": [#array]}) => Promise.t<NodePostgres.queryResult<row>> = \"query\"";

var runRawParameters = "let runRaw = (client, parameters) => runRaw(client, {\"values\": parameters->convertParameters, \"text\": statement, \"rowMode\": #array})";

var runRawNoParameters = "let runRaw = (client) => runRaw(client, {\"values\": (), \"text\": statement, \"rowMode\": #array})";

function generateItem(data) {
  var noParameters = data.parameters.length === 0;
  var arr = data.columns;
  var arr$1 = data.columns;
  var match = data.parameters.length;
  var arr$2 = data.columns;
  var tmp;
  if (arr$2 !== undefined) {
    var match$1 = arr$2.length;
    if (match$1 !== 0) {
      if (match$1 !== 1) {
        var mapping = [];
        for(var i = 0 ,i_finish = arr$2.length; i < i_finish; ++i){
          var name = Caml_array.get(arr$2, i).name;
          mapping.push(mapping.includes(name) ? undefined : name);
        }
        var destruct = mapping.map(function (x) {
                if (x !== undefined) {
                  return identifier(x);
                } else {
                  return "_";
                }
              }).join(", ");
        var construct = mapping.map(function (x) {
                  if (x !== undefined) {
                    return identifier(x) + ": " + identifier(x);
                  } else {
                    return "";
                  }
                }).filter(function (x) {
                return x !== "";
              }).join(",\n");
        tmp = "((" + destruct + "): row): rowRecord => {\n" + indent(construct) + "\n}";
      } else {
        tmp = "(r: row): rowRecord => {" + identifier(Caml_array.get(arr$2, 0).name) + ": r->Js.Array2.unsafe_get(0)}";
      }
    } else {
      tmp = "(_: row): rowRecord => Js.Dict.empty()";
    }
  } else {
    tmp = "(_: row): rowRecord => Js.Dict.empty()";
  }
  var match$2 = data.columns;
  return [
            codeComment(data.originalStatement),
            moduleDefinition(data.name, [
                    stringVar("statement", data.processedStatement),
                    typeDefinition("parameters", noParameters ? "unit" : tupleOf(data.parameters.map(function (p) {
                                    return pgToReasonType(p.datatype);
                                  }))),
                    typeDefinition("parametersRecord", noParameters ? "unit" : recordOf(uniqueBy(data.parameters, (function (p) {
                                        return p.name;
                                      })).map(function (p) {
                                    return [
                                            p.name,
                                            pgToReasonType(p.datatype)
                                          ];
                                  }))),
                    typeDefinition("row", tupleOf((
                                arr !== undefined ? arr : []
                              ).map(function (p) {
                                  return optional(pgToReasonType(p.dataType));
                                }))),
                    typeDefinition("rowRecord", recordOf(uniqueBy(arr$1 !== undefined ? arr$1 : [], (function (p) {
                                      return p.name;
                                    })).map(function (p) {
                                  return [
                                          p.name,
                                          optional(pgToReasonType(p.dataType))
                                        ];
                                }))),
                    "let convertParameters = " + (
                      match !== 0 ? (
                          match !== 1 ? "(r: parametersRecord): parameters => (" + data.parameters.map(function (p) {
                                    return "r." + identifier(p.name);
                                  }).join(", ") + ")" : "(r: parametersRecord): parameters => [r." + identifier(Caml_array.get(data.parameters, 0).name) + "]"
                        ) : "(_: parametersRecord): parameters => ()"
                    ),
                    "let convertRow = " + tmp,
                    runRawExternal,
                    noParameters ? runRawNoParameters : runRawParameters,
                    match$2 !== undefined ? (
                        noParameters ? "let run = (client) => runRaw(client)->Js.Promise.then_((res: NodePostgres.queryResult<row>) => Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)" : "let run = (client, parameters) => runRaw(client, parameters)->Js.Promise.then_((res: NodePostgres.queryResult<row>) => Js.Promise.resolve(res.rows->Js.Array2.map(convertRow)), _)"
                      ) : (
                        noParameters ? "let run = (client) => runRaw(client)->Js.Promise.then_((res: NodePostgres.queryResult<row>) => Js.Promise.resolve(res.rowCount->Js.Nullable.toOption), _)" : "let run = (client, parameters) => runRaw(client, parameters)->Js.Promise.then_((res: NodePostgres.queryResult<row>) => Js.Promise.resolve(res.rowCount->Js.Nullable.toOption), _)"
                      )
                  ].join("\n"))
          ].join("\n");
}

function generator(data) {
  return Promise.resolve("// Generated by @typesafe-sql\n\nopen PgTypes\n\n" + data.map(generateItem).join("\n\n"));
}

var S;

var A;

exports.S = S;
exports.A = A;
exports.moduleName = moduleName;
exports.identifier = identifier;
exports.fixBuildInType = fixBuildInType;
exports.optional = optional;
exports.pgToReasonType = pgToReasonType;
exports.indent = indent;
exports.tupleOf = tupleOf;
exports.recordOf = recordOf;
exports.codeComment = codeComment;
exports.moduleDefinition = moduleDefinition;
exports.stringVar = stringVar;
exports.typeDefinition = typeDefinition;
exports.uniqueBy = uniqueBy;
exports.runRawExternal = runRawExternal;
exports.runRawParameters = runRawParameters;
exports.runRawNoParameters = runRawNoParameters;
exports.generateItem = generateItem;
exports.generator = generator;
/* Client-TypesafeSqlRescriptDescribeQuery Not a pure module */
