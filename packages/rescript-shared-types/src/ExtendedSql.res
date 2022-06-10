@@warning("-30")

type parseError = {start: int, end: Js.null<int>, message: string}

type rec node = [
  | #SqlChunk(string)
  | #InlineComment(string)
  | #BlockComment(string)
  | #Parameter(parameterData)
  | #RawParameter(rawParameterData)
  | #BatchParameter(batchParameterData)
]
and parameterData = {name: string}
and rawParameterData = {name: string, options: array<string>}
and batchParameterData = {name: string, separator: string, body: ast}
and nodeWithLocation = {start: int, end: int, node: node}
and ast = array<nodeWithLocation>

type statementAttributes = {name: Js.null<string>}
type parsedStatement = {attributes: statementAttributes, ast: ast}
type parsedFile = {separator: string, statements: array<parsedStatement>}

type rec paramLink<'a> = [
  | #Parameter(parameterLinkData<'a>)
  | #RawParameter(rawParameterLinkData)
  | #BatchParameter(batchParameterLinkData<'a>)
]
and parameterLinkData<'a> = {dataType: 'a}
and rawParameterLinkData = {options: array<string>}
and batchParameterLinkData<'a> = {separator: string, fields: Js.Dict.t<paramLink<'a>>}

// let rec mapParamLinks = (links: array<paramLink<'a>>, fn) =>
//   links->Js.Array2.map(({name, dataType}) => {
//     name: name,
//     dataType: switch dataType {
//     | #Parameter(x) => #Parameter(fn(x))
//     | #RawParameter(_) as raw => raw
//     | #BatchParameter(separator, subLinks) => Batch(separator, subLinks->mapParamLinks(fn))
//     },
//   })
