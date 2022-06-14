module Array = Belt.Array // TODO: do this everywhere and Js.Array2 as the last resort?
module Loggable = TypesafeSqlErrors.Loggable

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

let rec mapParameters = (
  parameters: Js.Dict.t<TypesafeSqlSharedTypes.ExtendedSql.paramLink<'a>>,
  fn,
) => {
  open TypesafeSqlSharedTypes.ExtendedSql
  Js.Dict.map((. x) =>
    switch x {
    | #BatchParameter({separator, fields}) =>
      #BatchParameter({
        separator: separator,
        fields: fields->mapParameters(fn),
      })
    | #Parameter({dataType}) => #Parameter({dataType: fn(dataType)})
    | #RawParameter(_) as raw => raw
    }
  , parameters)
}

let build = (ctx: Context.t) => {
  let sources = ctx->Context.sources->Process.getSomeOrExitWithError("No sources specified")
  let generator = ctx->Context.generator->Process.getSomeOrExitWithError("No generator specified")

  TypesafeSqlDescribeQuery.Client.make(~pgConfig=ctx->Context.pgConfig, ())
  ->Promise.chain(client => {
    let client = client->Process.getOkOrExitWithError
    sources
    ->mapAsyncSeq(source => {
      Fs.resolveGlobs(source.input)->Promise.chain(files => {
        Js.log(files)

        files
        ->Process.getOkOrExitWithError(
          ~prepend="Could not turn globs into a list of files. Reason:",
        )
        ->mapAsyncSeq(path =>
          path
          ->Fs.readFile(#utf8)
          ->Process.catchAndExitWithError(~prepend=`Unable to read file "${path}". Reason:`)
          ->Promise.chain(content => {
            let parsedFile = switch content->TypesafeSqlExtendedSQL.Parser.parseFile {
            | Ok(x) => x
            | Error({message}) => Process.exitWithError(message) // TODO: do better with the error (not just here)
            }

            let prinedStatements = parsedFile.statements->Array.map(statement => {
              let (sqlQueries, parameterLinks) = TypesafeSqlExtendedSQL.Printer.print(statement.ast)
              {"statement": statement, "sqlQueries": sqlQueries, "parameters": parameterLinks}
            })

            prinedStatements
            ->mapAsyncSeq(data => {
              data["sqlQueries"]->mapAsyncSeq(query =>
                client
                ->TypesafeSqlDescribeQuery.Client.describe(query->Js.String2.trim)
                ->Promise.map(x => Process.getOkOrExitWithError(x))
              )
            })
            ->Promise.chain(descriptions => {
              open TypesafeSqlSharedTypes.GeneratorInput
              generator.generate({
                rawFileContent: content,
                filePath: path,
                separator: parsedFile.separator,
                statements: prinedStatements->Array.mapWithIndex((i, data) => {
                  let {parameters, row} = descriptions->Array.getExn(i)->Array.getExn(0)
                  {
                    row: row,
                    ast: data["statement"].ast,
                    attributes: data["statement"].attributes,
                    parameters: data["parameters"]->mapParameters(index =>
                      parameters->Array.getExn(index)
                    ),
                  }
                }),
              })
            })
            ->Promise.chain(generatedCode => {
              let getOutputPath =
                source.output->Belt.Option.getWithDefault(generator.defaultOutputPath)

              let outputPath = try {
                // TODO: allow users to have this function async
                getOutputPath(path)
              } catch {
              | exn => Process.exitWithLoggableError(exn->Loggable.fromExnVerbose)
              }

              Fs.writeFile(outputPath, generatedCode, #utf8)->Process.catchAndExitWithError
            })
          })
        )
      })
    })
    ->Promise.chain(_ =>
      client->TypesafeSqlDescribeQuery.Client.terminate->Process.catchAndExitWithError
    )
  })
  ->Promise.done(() => ())
}

let watch = ctx => ctx->TTY.info("TODO: watch")

let pipe = ctx => ctx->TTY.info("TODO: pipe")
