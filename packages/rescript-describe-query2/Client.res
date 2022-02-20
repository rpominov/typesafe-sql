let exn = Belt.Option.getExn

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

type client = {
  pgClient: NodePostgres.client,
  basicClient: BasicClient.client,
  typesLoader: Loader.t<int, Queries.GetTypes.rowRecord>,
  mutable terminationResult: option<Promise.t<unit>>,
}

let make = config => {
  let pgClient = NodePostgres.make(config)
  pgClient
  ->NodePostgres.connect
  ->Promise.chain(_ => BasicClient.createClient(config))
  ->Promise.map(basicClient => {
    terminationResult: None,
    basicClient: basicClient,
    pgClient: pgClient,
    typesLoader: Loader.make(
      keys => {
        Js.log(keys)
        Queries.GetTypes.run(pgClient, {typeIds: keys})->Promise.map(r => r.rows)
      },
      Js.Int.toString,
      x => x.oid->exn->Js.Int.toString,
    ),
  })
  ->Promise.catch(LogError.wrapExn)
}

let terminate = client =>
  switch client.terminationResult {
  | Some(p) => p
  | None => {
      let p =
        Promise.all2((
          client.basicClient->BasicClient.terminate,
          client.pgClient->NodePostgres.end,
        ))->Promise.map(_ => ())
      client.terminationResult = Some(p)
      p
    }
  }

let rec loadType = (client, oid): Promise.t<option<dataType>> => {
  if client.terminationResult !== None {
    Js.Exn.raiseError("The client has been terminated")
  }

  client.typesLoader
  ->Loader.get(oid)
  ->Promise.chain(opt =>
    switch opt {
    | None => Promise.resolve(None)
    | Some(data) => {
        let typeType = switch data.typtype->exn {
        | "b" => #b
        | "c" => #c
        | "d" => #d
        | "e" => #e
        | "p" => #p
        | "r" => #r
        | "m" => #m
        | x => Js.Exn.raiseError("Unexpected value of pg_type.typtype: " ++ x)
        }

        let category = switch data.typcategory->exn {
        | "A" => #A
        | "B" => #B
        | "C" => #C
        | "D" => #D
        | "E" => #E
        | "G" => #G
        | "I" => #I
        | "N" => #N
        | "P" => #P
        | "R" => #R
        | "S" => #S
        | "T" => #T
        | "U" => #U
        | "V" => #V
        | "X" => #X
        | x => Js.Exn.raiseError("Unexpected value of pg_type.typcategory: " ++ x)
        }

        let byVal = data.typbyval->exn
        let oid = data.oid->exn
        let name = data.typname->exn
        let namespace = data.typnamespace->exn
        let len = data.typlen->exn
        let isPreferred = data.typispreferred->exn
        let isDefined = data.typisdefined->exn

        switch (typeType, category) {
        | (#b, #A) =>
          loadType(client, data.typelem->exn)->Promise.map(elemType =>
            Array({
              "typeType": typeType,
              "category": category,
              "byVal": byVal,
              "oid": oid,
              "name": name,
              "namespace": namespace,
              "len": len,
              "isPreferred": isPreferred,
              "isDefined": isDefined,
              "delim": data.typdelim->exn,
              "elemType": elemType->exn,
            })->Some
          )
        | (#b, _) =>
          Base({
            "typeType": typeType,
            "category": category,
            "byVal": byVal,
            "oid": oid,
            "name": name,
            "namespace": namespace,
            "len": len,
            "isPreferred": isPreferred,
            "isDefined": isDefined,
          })
          ->Some
          ->Promise.resolve
        | (#p, _) =>
          Pseudo({
            "typeType": typeType,
            "category": category,
            "byVal": byVal,
            "oid": oid,
            "name": name,
            "namespace": namespace,
            "len": len,
            "isPreferred": isPreferred,
            "isDefined": isDefined,
          })
          ->Some
          ->Promise.resolve
        | (#r, _) =>
          loadType(client, data.rngsubtype->exn)->Promise.map(elemType =>
            Range({
              "typeType": typeType,
              "category": category,
              "byVal": byVal,
              "oid": oid,
              "name": name,
              "namespace": namespace,
              "len": len,
              "isPreferred": isPreferred,
              "isDefined": isDefined,
              "elemType": elemType->exn,
            })->Some
          )
        | (#m, _) =>
          loadType(client, data.rngsubtype->exn)->Promise.map(elemType =>
            MultiRange({
              "typeType": typeType,
              "category": category,
              "byVal": byVal,
              "oid": oid,
              "name": name,
              "namespace": namespace,
              "len": len,
              "isPreferred": isPreferred,
              "isDefined": isDefined,
              "elemType": elemType->exn,
            })->Some
          )
        | (#e, _) =>
          Enum({
            "typeType": typeType,
            "category": category,
            "byVal": byVal,
            "oid": oid,
            "name": name,
            "namespace": namespace,
            "len": len,
            "isPreferred": isPreferred,
            "isDefined": isDefined,
            "enumValues": data.enum_labels->exn,
          })
          ->Some
          ->Promise.resolve
        | (#c, _) =>
          Promise.all(
            data.attr_types->exn->Js.Array2.map(oid => loadType(client, oid)),
          )->Promise.map(dataTypes =>
            Composite({
              "typeType": typeType,
              "category": category,
              "byVal": byVal,
              "oid": oid,
              "name": name,
              "namespace": namespace,
              "len": len,
              "isPreferred": isPreferred,
              "isDefined": isDefined,
              "fields": Belt.Array.zip(data.attr_names->exn, dataTypes->Js.Array2.map(exn)),
            })->Some
          )
        | (#d, _) =>
          loadType(client, data.typbasetype->exn)->Promise.map(baseType =>
            Domain({
              "typeType": typeType,
              "category": category,
              "byVal": byVal,
              "oid": oid,
              "name": name,
              "namespace": namespace,
              "len": len,
              "isPreferred": isPreferred,
              "isDefined": isDefined,
              "baseType": baseType->exn,
              "notNull": data.typnotnull->exn,
              "nDims": data.typndims->exn,
              "default": data.typdefault,
              "typmod": data.typtypmod->exn,
              "collation": data.typcollation->exn,
            })->Some
          )
        }
      }
    }
  )
}

// -----------------------------------------------------
// TMP

// make(
//   NodePostgres.config(
//     ~host="localhost",
//     ~user="testuser",
//     ~password="testpassword",
//     ~database="testdatabase",
//     (),
//   ),
// )->Promise.done(client => {
//   let client = client->Belt.Result.getExn
//   client
//   ->loadType(71)
//   ->Promise.chain(x => {
//     Js.log(x->Obj.magic->Js.Json.stringifyWithSpace(2))
//     client->terminate
//   })
//   ->Promise.done(_ => ())
// })
