type located<'a, 'end> = {
  start: int, // inclusive
  end: 'end, // inclusive
  val: 'a,
}

type rec node =
  | SQL_Chunk(string)
  | InlineComment(string)
  | BlockComment(string)
  | Parameter(string)
  | RawParameter(string, array<string>)
  | BatchParameter(string, string, ast)
and ast = array<located<node, int>>

type statementAttributes = {name: option<string>}
type parsedStatement = {attributes: statementAttributes, ast: ast}

type parseError = located<string, option<int>>

let parse: string => result<parsedStatement, parseError>

type parsedFile = {
  separator: string,
  statements: array<parsedStatement>,
}

let parseFile: string => result<parsedFile, parseError>
