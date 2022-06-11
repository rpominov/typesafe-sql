open TypesafeSqlSharedTypes.Pg
module Loggable = TypesafeSqlErrors.Loggable

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

  switch try {
    Ok(Pg.Client.makeWithConfig(config))
  } catch {
  | exn => Error(Loggable.fromExnVerbose(exn))
  } {
  | Error(_) as error => Promise.resolve(error)
  | Ok(pgClient) => {
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
          Js.Exn.raiseError(
            "A fatal error received before describe query client has beed initalised",
          )
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
      ->Promise.catch(exn =>
        exn
        ->Loggable.fromExn
        ->Loggable.prepend("Failed to connect to node-postgres client. Reason:")
      )
      ->Promise.chainOk(_ =>
        BasicClient.createClient(config, Some(onFatalError))->Promise.catch(exn =>
          exn
          ->Loggable.fromExn
          ->Loggable.prepend("Failed to connect to describe-query-basic client. Reason:")
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
  }
}

let loadAll = (items, loadItem) => items->Js.Array2.map(loadItem)->Promise.all

let rec loadType = (client, oid): Promise.t<dataType> => {
  Promise.resolve()->Promise.chain(() => {
    client.typesLoader
    ->Loader.get(oid)
    ->Promise.chain(opt =>
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
            client
            ->loadType(data.typelem->exn(__LOC__))
            ->Promise.map(x => #Array({elemType: x, delim: data.typdelim->exn(__LOC__)}))

          | (#b, _) => Promise.resolve(#Base)
          | (#p, _) => Promise.resolve(#Pseudo)

          | ((#r | #m) as rangeType, _) =>
            client
            ->loadType(data.rngsubtype->exn(__LOC__))
            ->Promise.map(x =>
              rangeType === #m ? #MultiRange({elemType: x}) : #Range({elemType: x})
            )

          | (#e, _) => Promise.resolve(#Enum({enumValues: data.enum_labels->exn(__LOC__)}))

          | (#c, _) =>
            data.attr_types
            ->exn(__LOC__)
            ->loadAll(oid => client->loadType(oid))
            ->Promise.map(dataTypes =>
              #Composite({
                fields: Belt.Array.zip(data.attr_names->exn(__LOC__), dataTypes),
              })
            )

          | (#d, _) =>
            client
            ->loadType(data.typbasetype->exn(__LOC__))
            ->Promise.map(x =>
              #Domain({
                baseType: x,
                notNull: data.typnotnull->exn(__LOC__),
                nDims: data.typndims->exn(__LOC__),
                default: data.typdefault->Js.Null.fromOption,
                typmod: data.typtypmod->exn(__LOC__),
                collation: data.typcollation->exn(__LOC__),
              })
            )
          }->Promise.map(data => {
            typeType: typeType,
            category: category,
            byVal: byVal,
            oid: oid,
            name: name,
            namespace: namespace,
            len: len,
            isPreferred: isPreferred,
            isDefined: isDefined,
            typeSpecificData: data,
          })
        }
      }
    )
  })
}

// NOTE:
//   Not sure it's a good idea to catch all errors here.
//   The question to ask: do we potentially catch bugs of this library?
//   Bugs should not go into result<..>
let describe = (client, query) => {
  let promise =
    client.basicClient
    ->BasicClient.describe(query)
    ->Promise.catch(exn =>
      switch Pg.DatabaseError.fromExn(exn) {
      | None =>
        Loggable.fromExnVerbose(exn)->Loggable.prepend(
          `Could not get types for the query:\n${query}\nError:`,
        )
      | Some(dbErr) => {
          let highlighted = switch switch dbErr.position {
          | None => None
          | Some(str) => Belt.Int.fromString(str)
          } {
          | None => query
          | Some(0) => query->TypesafeSqlErrors.Util.highlight(~start=0, ~end=0)
          | Some(pos) => query->TypesafeSqlErrors.Util.highlight(~start=pos - 1, ~end=pos - 1)
          }

          let base =
            Loggable.fromExn(exn)->Loggable.prepend(
              `Could not get types for the query:\n${highlighted}\nError:`,
            )

          let base = switch dbErr.detail {
          | None | Some("") => base
          | Some(detail) => base->Loggable.append(`\nDetail: ${detail}`)
          }

          switch dbErr.hint {
          | None | Some("") => base
          | Some(hint) => base->Loggable.append(`\nHint: ${hint}`)
          }
        }
      }
    )
    ->Promise.chainOk(description => {
      let parametersTypes = description.parameters->loadAll(id => client->loadType(id))

      let fieldsTypes =
        description.row
        ->Belt.Option.getWithDefault([])
        ->loadAll(x => client->loadType(x.dataTypeID))

      let tableColums =
        description.row
        ->Belt.Option.getWithDefault([])
        ->loadAll(x => client.fieldsLoader->Loader.get((x.tableID, x.columnID)))

      Promise.all3((parametersTypes, fieldsTypes, tableColums))
      ->Promise.catch(exn =>
        Loggable.fromExn(exn)->Loggable.prepend(
          `Failed to fetch additional information about query:\n${query}\nError:`,
        )
      )
      ->Promise.mapOk(((parametersTypes, fieldsTypes, tableColums)) => Ok({
        parameters: parametersTypes,
        row: switch description.row {
        | None => Js.null
        | Some(row) =>
          row
          ->Belt.Array.zip(fieldsTypes)
          ->Belt.Array.zip(tableColums)
          ->Js.Array2.map((((desc, dataType), tableColumn)) => {
            dataType: dataType,
            name: desc.name,
            tableColumn: switch tableColumn {
            | None => Js.null
            | Some(x) =>
              Js.Null.return({
                attrelid: x.attrelid->Js.Null.fromOption,
                attrelname: x.relname->Js.Null.fromOption,
                attname: x.attname->exn(__LOC__),
                attnotnull: x.attnotnull->exn(__LOC__),
                attnum: x.attnum->Js.Null.fromOption,
                attndims: x.attndims->exn(__LOC__),
                atttypmod: x.atttypmod->exn(__LOC__),
                attoptions: x.attoptions->Js.Null.fromOption,
                attfdwoptions: x.attfdwoptions->Js.Null.fromOption,
              })
            },
          })
          ->Js.Null.return
        },
      }))
    })

  promise
  ->Promise.catch(err => err)
  ->Promise.chain(_ =>
    switch (client.fatalError, client.terminationResult) {
    | (Some(err), _) =>
      Loggable.fromJsExnVerbose(err)
      ->Loggable.prepend(
        `While fetching information about query:\n${query}\nthe describe-query client has been terminated as a result of a fatal error:`,
      )
      ->Error
      ->Promise.resolve
    | (_, Some(_)) =>
      Loggable.fromText(
        `While fetching information about query:\n${query}\nthe describe-query client has been terminated by the user`,
      )
      ->Error
      ->Promise.resolve
    | _ => promise
    }
  )
}
