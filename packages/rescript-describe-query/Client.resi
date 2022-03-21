type t

let make: (~pgConfig: Pg.Config.t=?, unit) => Promise.t<result<t, LogError.t>>

let terminate: t => Promise.t<unit>

// https://www.postgresql.org/docs/current/catalog-pg-type.html
type baseInfo = {
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
}

type rec dataType =
  | Pseudo(baseInfo)
  | Base(baseInfo)
  | Array({...baseInfo, "elemType": dataType, "delim": string})
  | Enum({...baseInfo, "enumValues": array<string>})
  | Range({...baseInfo, "elemType": dataType})
  | MultiRange({...baseInfo, "elemType": dataType})
  | Composite({...baseInfo, "fields": array<(string, dataType)>})
  | Domain(
      {
        ...baseInfo,
        "baseType": dataType,
        "notNull": bool,
        "nDims": int,
        "default": option<string>,
        "typmod": int,
        "collation": int,
      },
    )

let getBaseInfo: dataType => baseInfo

type field = {
  name: string,
  dataType: dataType,
  tableColumn: option<Queries.GetAttributes.rowRecord>,
}

type description = {
  parameters: array<dataType>,
  row: option<array<field>>,
}

let describe: (t, string) => Promise.t<description>
