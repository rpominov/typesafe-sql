let parse: string => result<
  TypesafeSqlSharedTypes.ExtendedSql.parsedStatement,
  TypesafeSqlSharedTypes.ExtendedSql.parseError,
>

let parseFile: string => result<
  TypesafeSqlSharedTypes.ExtendedSql.parsedFile,
  TypesafeSqlSharedTypes.ExtendedSql.parseError,
>
