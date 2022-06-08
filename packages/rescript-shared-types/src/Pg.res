// https://www.postgresql.org/docs/current/catalog-pg-attribute.html
type tableColumn = {
  "attrelid": option<int>,
  "attrelname": option<string>, // Custom. The name of the relation
  "attname": string,
  "attnotnull": bool,
  "attnum": option<int>, // not nullable for not dropped colums?
  "attndims": int,
  "atttypmod": int,
  "attoptions": option<array<string>>,
  "attfdwoptions": option<array<string>>,
  // TODO: add attmissingval?
}

// https://www.postgresql.org/docs/current/catalog-pg-type.html
type rec dataType = {
  "oid": int,
  "name": string,
  "namespace": string,
  "len": int,
  "byVal": bool,
  // #b for a base type
  // #c for a composite type (e.g., a table's row type)
  // #d for a domain
  // #e for an enum type
  // #p for a pseudo-type
  // #r for a range type
  // #m for a multirange type
  "typeType": [#b | #c | #d | #e | #p | #r | #m],
  // https://www.postgresql.org/docs/current/catalog-pg-type.html#CATALOG-TYPCATEGORY-TABLE
  "category": [
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
  "isPreferred": bool,
  "isDefined": bool,
  "typeSpecificData": typeSpecificData,
}
and typeSpecificData = [
  | #base
  | #pseudo
  | #array({"elemType": dataType, "delim": string})
  | #enum({"enumValues": array<string>})
  | #range({"elemType": dataType})
  | #multiRange({"elemType": dataType})
  | #composite({"fields": array<(string, dataType)>})
  | #domain({
    "baseType": dataType,
    "notNull": bool,
    "nDims": int,
    "default": option<string>,
    "typmod": int,
    "collation": int,
  })
]

type field = {"name": string, "dataType": dataType, "tableColumn": option<tableColumn>}

type description = {"parameters": array<dataType>, "row": option<array<field>>}
