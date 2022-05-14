let exn = (opt, loc) => {
  switch opt {
  | Some(x) => x
  | None => Js.Exn.raiseError(`Unexpected None at: ${loc}`)
  }
}

module BasicClient = {
  type t

  @module("@typesafe-sql/describe-query-basic") @val
  external createClient: (Pg.Config.t, option<Js.Exn.t => unit>) => Promise.t<t> = "createClient"

  @send external terminate: t => Promise.t<unit> = "terminate"

  type description = {parameters: array<int>, row: option<array<Pg.QueryResult.field>>}

  @send
  external describe: (t, string) => Promise.t<description> = "describe"
}

type t = {
  pgClient: Pg.Client.t,
  basicClient: BasicClient.t,
  typesLoader: Loader.t<int, Queries.GetTypes.rowRecord>,
  fieldsLoader: Loader.t<(int, int), Queries.GetAttributes.rowRecord>,
  onUnexpectedTerminationCb: option<Js.Exn.t => unit>,
  mutable terminating: bool,
  mutable terminationResult: option<Promise.t<unit>>,
  mutable fatalError: option<Js.Exn.t>,
}

let terminate = client => {
  client.terminating = true
  switch client.terminationResult {
  | Some(promise) => promise
  | None => {
      let promise = Promise.all2((
        client.basicClient->BasicClient.terminate,
        client.pgClient->Pg.Client.end,
      ))->Promise.map(_ => {
        switch (client.onUnexpectedTerminationCb, client.fatalError) {
        | (Some(cb), Some(err)) => cb(err)
        | _ => ()
        }
      })
      client.terminationResult = Some(promise)
      promise
    }
  }
}

let make = (~pgConfig=?, ~onUnexpectedTermination=?, ()) => {
  let config = switch pgConfig {
  | Some(x) => x
  | None => Pg.Config.make()
  }

  let pgClient = Pg.Client.makeWithConfig(config)
  let clientRef = ref(None)

  let onFatalError = error =>
    switch clientRef.contents {
    | Some(client) =>
      switch client.fatalError {
      | Some(_) => ()
      | None => {
          client.fatalError = Some(error)
          client->terminate->ignore
        }
      }
    | None =>
      Js.Exn.raiseError("A fatal error received before describe query client has beed initalised")
    }

  let onEnd = () => {
    let terminating = switch clientRef.contents {
    | None => false
    | Some(client) => client.terminating
    }
    if !terminating {
      "Postgres client's connection has been terminated unexpectedly, without a error"
      ->Promise.makeJsError
      ->onFatalError
    }
  }

  pgClient->Pg.Client.once(#error(onFatalError))->Pg.Client.once(#end(onEnd))->ignore

  pgClient
  ->Pg.Client.connect
  ->Promise.catch(LogError.wrapExn(~extra="Failed to connect to node-postgres client"))
  ->Promise.chainOk(_ =>
    BasicClient.createClient(config, Some(onFatalError))->Promise.catch(
      LogError.wrapExn(~extra="Failed to connect to describe-query-basic client"),
    )
  )
  ->Promise.mapOk(basicClient => {
    let client = {
      terminating: false,
      onUnexpectedTerminationCb: onUnexpectedTermination,
      terminationResult: None,
      fatalError: None,
      basicClient: basicClient,
      pgClient: pgClient,
      typesLoader: Loader.make(
        keys => Queries.GetTypes.run(pgClient, {typeIds: keys}),
        Js.Int.toString,
        row => row.oid->exn(__LOC__)->Js.Int.toString,
      ),
      fieldsLoader: Loader.make(
        keys => Queries.GetAttributes.run(pgClient, {relIds: keys->Js.Array2.map(fst)}),
        ((a, b)) => [a, b]->Js.Array2.joinWith("|"),
        row => [row.attrelid->exn(__LOC__), row.attnum->exn(__LOC__)]->Js.Array2.joinWith("|"),
      ),
    }
    clientRef := Some(client)
    Ok(client)
  })
}

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

let getBaseInfo = obj =>
  {
    "oid": obj["oid"],
    "name": obj["name"],
    "namespace": obj["namespace"],
    "len": obj["len"],
    "byVal": obj["byVal"],
    "typeType": obj["typeType"],
    "category": obj["category"],
    "isPreferred": obj["isPreferred"],
    "isDefined": obj["isDefined"],
  }
let getBaseInfo = dataType =>
  switch dataType {
  | Pseudo(obj) | Base(obj) => obj
  | Array(obj) => getBaseInfo(obj)
  | Enum(obj) => getBaseInfo(obj)
  | Range(obj) => getBaseInfo(obj)
  | MultiRange(obj) => getBaseInfo(obj)
  | Composite(obj) => getBaseInfo(obj)
  | Domain(obj) => getBaseInfo(obj)
  }

let checkForFatalThen = (promise, client, fn) => {
  promise
  ->Promise.catch(err => err)
  ->Promise.chain(result => {
    switch (client.fatalError, client.terminationResult) {
    | (Some(err), _) => Promise.reject(err)
    | (_, Some(_)) => Js.Exn.raiseError("The describe-query client has been terminated by the user")
    | _ =>
      switch result {
      | Ok(val) => fn(val)
      | Error(Js.Exn.Error(err)) => Promise.reject(err)
      | Error(err) => raise(err)
      }
    }
  })
}

let rec loadType = (client, oid): Promise.t<dataType> => {
  Promise.resolve()->checkForFatalThen(client, () => {
    client.typesLoader
    ->Loader.get(oid)
    ->checkForFatalThen(client, opt =>
      switch opt {
      | None => Js.Exn.raiseError(j`Data type with oid $oid not found`)
      | Some(data) => {
          let typeType = switch data.typtype->exn(__LOC__) {
          | "b" => #b
          | "c" => #c
          | "d" => #d
          | "e" => #e
          | "p" => #p
          | "r" => #r
          | "m" => #m
          | x => Js.Exn.raiseError("Unexpected value of pg_type.typtype: " ++ x)
          }

          let category = switch data.typcategory->exn(__LOC__) {
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

          let byVal = data.typbyval->exn(__LOC__)
          let oid = data.oid->exn(__LOC__)
          let name = data.typname->exn(__LOC__)
          let namespace = data.typnamespace->exn(__LOC__)
          let len = data.typlen->exn(__LOC__)
          let isPreferred = data.typispreferred->exn(__LOC__)
          let isDefined = data.typisdefined->exn(__LOC__)

          switch (typeType, category) {
          | (#b, #A) =>
            loadType(client, data.typelem->exn(__LOC__))->checkForFatalThen(client, elemType =>
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
                "delim": data.typdelim->exn(__LOC__),
                "elemType": elemType,
              })->Promise.resolve
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
            })->Promise.resolve
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
            })->Promise.resolve
          | (#r, _) =>
            loadType(client, data.rngsubtype->exn(__LOC__))->checkForFatalThen(client, elemType =>
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
                "elemType": elemType,
              })->Promise.resolve
            )
          | (#m, _) =>
            loadType(client, data.rngsubtype->exn(__LOC__))->checkForFatalThen(client, elemType =>
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
                "elemType": elemType,
              })->Promise.resolve
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
              "enumValues": data.enum_labels->exn(__LOC__),
            })->Promise.resolve
          | (#c, _) =>
            Promise.all(
              data.attr_types->exn(__LOC__)->Js.Array2.map(oid => loadType(client, oid)),
            )->checkForFatalThen(client, dataTypes =>
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
                "fields": Belt.Array.zip(data.attr_names->exn(__LOC__), dataTypes),
              })->Promise.resolve
            )
          | (#d, _) =>
            loadType(client, data.typbasetype->exn(__LOC__))->checkForFatalThen(client, baseType =>
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
                "baseType": baseType,
                "notNull": data.typnotnull->exn(__LOC__),
                "nDims": data.typndims->exn(__LOC__),
                "default": data.typdefault,
                "typmod": data.typtypmod->exn(__LOC__),
                "collation": data.typcollation->exn(__LOC__),
              })->Promise.resolve
            )
          }
        }
      }
    )
  })
}

type field = {
  name: string,
  dataType: dataType,
  // TODO: maybe clean this up somehow
  tableColumn: option<Queries.GetAttributes.rowRecord>,
}

type description = {
  parameters: array<dataType>,
  row: option<array<field>>,
}

// TODO: should produce Promise<result<>>
//   let describe = (client, text) => {
//     client
//     ->D.describe(text)
//     ->P.catch(
//       LogError.wrap(
//         _,

//         // TODO
//         //
//         // switch (e->D.getErrorMetaData).databaseError {
//         // | None => (LogError.Loggable.fromJsExn(e), None)
//         // | Some(dbe) => (dbe->D.getVerboseMessage->LogError.Loggable.make, dbe["position"])
//         // }
//         exn => {
//           let (message, pos) = switch exn {
//           | Js.Exn.Error(e) => (LogError.Loggable.fromJsExn(e), None)
//           | _ => (LogError.Loggable.make(exn), None)
//           }

//           let statement = switch pos->O.flatMap(I.fromString) {
//           | None => text
//           | Some(p) => highlight(text, p)
//           }

//           [
//             `Database server could not process the following statement:\n\n${statement}`->LogError.Loggable.make,
//             message,
//           ]
//         },
//       ),
//     )
//   }

let describe = (client, query) =>
  Promise.resolve()->checkForFatalThen(client, () =>
    client.basicClient
    ->BasicClient.describe(query)
    ->checkForFatalThen(client, description =>
      Promise.all3((
        description.parameters->Js.Array2.map(id => client->loadType(id))->Promise.all,
        description.row
        ->Belt.Option.getWithDefault([])
        ->Js.Array2.map(x => client->loadType(x.dataTypeID))
        ->Promise.all,
        description.row
        ->Belt.Option.getWithDefault([])
        ->Js.Array2.map(x => client.fieldsLoader->Loader.get((x.tableID, x.columnID)))
        ->Promise.all,
      ))->checkForFatalThen(client, ((parametersTypes, fieldsTypes, tableColums)) =>
        {
          parameters: parametersTypes,
          row: switch description.row {
          | None => None
          | Some(row) =>
            row
            ->Belt.Array.zip(fieldsTypes)
            ->Belt.Array.zip(tableColums)
            ->Js.Array2.map((((desc, dataType), tableColumn)) => {
              dataType: dataType,
              name: desc.name,
              tableColumn: tableColumn,
            })
            ->Some
          },
        }->Promise.resolve
      )
    )
  )
