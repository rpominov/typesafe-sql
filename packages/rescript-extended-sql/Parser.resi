type rec node =
  | SQL_Chunk(string)
  | InlineComment(string)
  | BlockComment(string)
  | Parameter(string)
  | Raw(string, array<string>)
  | Batch(string, string, ast)
and ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {
  rawText: string,
  attributes: attributes,
  ast: ast,
}
type parseError = {message: string, pos: int}

let parse: string => result<parsedStatement, parseError>

let parseFile: string => result<array<parsedStatement>, parseError>
