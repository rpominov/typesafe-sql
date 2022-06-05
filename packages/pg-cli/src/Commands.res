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

let build = (ctx: Context.t) => {
  let sources = ctx->Context.sources->Process.getOrExitWithError("No sources specified")
  // let generator = ctx->Context.generator->Process.getOrExitWithError("No generator specified")

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
          Js.log3(source, path, content)
          Promise.resolve("TODO")
        })
      )
    )
  )
  ->Promise.done(x => Js.log(x)) // TMP
}

let watch = ctx => ctx->TTY.info("TODO: watch")

let pipe = ctx => ctx->TTY.info("TODO: pipe")
