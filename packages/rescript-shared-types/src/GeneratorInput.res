// TODO: remove all types that are not used here from rescript-shared-types ?

type statement = {
  attributes: ExtendedSql.statementAttributes,
  ast: ExtendedSql.ast, // TODO: add Pg.dataType to parameter nodes in ast as well?
  parameters: Js.Dict.t<ExtendedSql.paramLink<Pg.dataType>>,
  row: Js.null<array<Pg.field>>,
}

type t = {
  filePath: string,
  rawFileContent: string,
  separator: string,
  statements: array<statement>,
}
