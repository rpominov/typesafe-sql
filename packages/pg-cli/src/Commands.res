module Array = Belt.Array // TODO: do this everywhere and Js.Array2 as the last resort?

// TODO: move?
// let allOk = results => {
//   let error = ref(None)
//   let i = ref(0)
//   let oks = []

//   while error.contents === None && i.contents < results->Array.length {
//     switch results->Array.getUnsafe(i.contents) {
//     | Ok(val) => oks->Js.Array2.push(val)->ignore
//     | Error(err) => error := Some(err)
//     }
//     i := i.contents + 1
//   }

//   switch error.contents {
//   | None => Ok(oks)
//   | Some(err) => Error(err)
//   }
// }

// TODO: move?
let mapAsyncSeq = (arr, fn) =>
  arr->Array.reduce(Promise.resolve([]), (acc, item) =>
    acc->Promise.chain(arr => fn(item)->Promise.map(val => arr->Array.concat([val])))
  )

// TMP
@module("util") @val external inspect: ('a, {"colors": bool, "depth": int}) => string = "inspect"

let build = (ctx: Context.t) => {
  let sources = ctx->Context.sources->Process.getSomeOrExitWithError("No sources specified")
  // let generator = ctx->Context.generator->Process.getSomeOrExitWithError("No generator specified")

  DescribeQuery.Client.make(~pgConfig=ctx->Context.pgConfig, ())
  ->Promise.chain(client => {
    let client = client->Process.getOkOrExitWithError
    sources
    ->mapAsyncSeq(source =>
      Fs.resolveGlobs(source.input)->Promise.chain(files =>
        files
        ->Process.getOkOrExitWithError
        ->mapAsyncSeq(path =>
          path
          ->Fs.readFile(#utf8)
          ->Process.catchAndExitWithError(~prepend=`Unable to read file "${path}". Reason:`)
          ->Promise.chain(content => {
            let parsedFile = switch content->ExtendedSQL.Parser.parseFile {
            | Ok(x) => x
            | Error({val}) => Process.exitWithError(val) // TODO: do better with the error
            }

            parsedFile.statements->mapAsyncSeq(statement => {
              let (sqlQueries, parameterLinks) = ExtendedSQL.Printer.print(statement.ast)

              sqlQueries
              ->mapAsyncSeq(query =>
                client
                ->DescribeQuery.Client.describe(query->Js.String2.trim)
                ->Promise.map(x => Process.getOkOrExitWithError(x))
              )
              ->Promise.chain(descriptions => {
                Js.log(
                  {
                    "statement": statement,
                    "sqlQueries": sqlQueries,
                    "parameterLinks": parameterLinks,
                    "source": source,
                    "path": path,
                    "content": content,
                    "descriptions": descriptions,
                  }->inspect({"colors": true, "depth": 100}),
                )
                Promise.resolve("TODO")
              })
            })
          })
        )
      )
    )
    ->Promise.chain(_ => client->DescribeQuery.Client.terminate->Process.catchAndExitWithError)
  })
  ->Promise.done(x => Js.log(x)) // TMP
}

let watch = ctx => ctx->TTY.info("TODO: watch")

let pipe = ctx => ctx->TTY.info("TODO: pipe")
