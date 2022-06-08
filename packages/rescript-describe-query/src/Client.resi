type t

let make: (
  ~pgConfig: Pg.Config.t=?,
  ~onUnexpectedTermination: Js.Exn.t => unit=?,
  unit,
) => Promise.t<result<t, TypesafeSqlErrors.Loggable.t>>

let terminate: t => Promise.t<unit>

// https://www.postgresql.org/docs/current/catalog-pg-type.html
type rec dataType = {
  oid: int,
  name: string,
  namespace: string,
  len: int,
  byVal: bool,
  // #b for a base type
  // #c for a composite type (e.g., a table's row type)
  // #d for a domain
  // #e for an enum type
  // #p for a pseudo-type
  // #r for a range type
  // #m for a multirange type
  typeType: [#b | #c | #d | #e | #p | #r | #m],
  // https://www.postgresql.org/docs/current/catalog-pg-type.html#CATALOG-TYPCATEGORY-TABLE
  category: [
    | #A
    | #B
    | #C
    | #D
    | #E
    | #G
    | #I
    | #N
    | #P
    | #R
    | #S
    | #T
    | #U
    | #V
    | #X
  ],
  isPreferred: bool,
  isDefined: bool,
  typeSpecificData: typeSpecificData,
}
and typeSpecificData =
  | Base
  | Pseudo
  | Array({elemType: dataType, delim: string})
  | Enum({enumValues: array<string>})
  | Range({elemType: dataType})
  | MultiRange({elemType: dataType})
  | Composite({fields: array<(string, dataType)>})
  | Domain({
      baseType: dataType,
      notNull: bool,
      nDims: int,
      default: option<string>,
      typmod: int,
      collation: int,
    })

type field = {
  name: string,
  dataType: dataType,
  tableColumn: option<Queries.GetAttributes.rowRecord>,
}

type description = {
  parameters: array<dataType>,
  row: option<array<field>>,
}

let describe: (t, string) => Promise.t<result<description, TypesafeSqlErrors.Loggable.t>>
