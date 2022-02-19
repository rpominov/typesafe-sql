type baseInfo = {
  "oid": int,
  "name": string,
  "namespace": string,
  "len": int,
  "byVal": bool,
  @ocaml.doc(
    "`b` for a base type,\n" ++
    "`c` for a composite type (e.g., a table's row type),\n" ++
    "`d` for a domain,\n" ++
    "`e` for an enum type,\n" ++
    "`p` for a pseudo-type,\n" ++
    "`r` for a range type,\n" ++
    "`m` for a multirange type\n\n" ++ "https://www.postgresql.org/docs/current/catalog-pg-type.html"
  )
  "typeType": [#b | #c | #d | #e | #p | #r | #m],
  @ocaml.doc(
    "https://www.postgresql.org/docs/current/catalog-pg-type.html#CATALOG-TYPCATEGORY-TABLE"
  )
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
  | Composite({...baseInfo, "relId": int /* "fields": array<(string, dataType)> */})
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
