@@warning("-30")

// https://www.postgresql.org/docs/current/catalog-pg-attribute.html
type tableColumn = {
  attrelid: Js.null<int>,
  attrelname: Js.null<string>, // Custom. The name of the relation
  attname: string,
  attnotnull: bool,
  attnum: Js.null<int>, // not nullable for not dropped colums?
  attndims: int,
  atttypmod: int,
  attoptions: Js.null<array<string>>,
  attfdwoptions: Js.null<array<string>>,
  // TODO: add attmissingval?
}

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
and typeSpecificData = [
  | #Base
  | #Pseudo
  | #Array(arrayData)
  | #Enum(enumData)
  | #Range(rangeData)
  | #MultiRange(rangeData)
  | #Composite(compositeData)
  | #Domain(domainData)
]
and arrayData = {elemType: dataType, delim: string}
and enumData = {enumValues: array<string>}
and rangeData = {elemType: dataType}
and compositeData = {fields: array<(string, dataType)>}
and domainData = {
  baseType: dataType,
  notNull: bool,
  nDims: int,
  default: Js.null<string>,
  typmod: int,
  collation: int,
}

type field = {name: string, dataType: dataType, tableColumn: Js.null<tableColumn>}
type description = {parameters: array<dataType>, row: Js.null<array<field>>}
