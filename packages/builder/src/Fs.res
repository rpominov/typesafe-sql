Js.log("1")

let watcher = Chokidar.watchMany(// ~options=Chokidar.options(~ignored=[Anymatch.glob("**/Fs.res")], ()),
["**/*.res", "!**/Map.res"])

watcher
->Chokidar.on(
  #all(
    (. a, b, c) => {
      // Js.log3(a, b, c)
      ignore()
    },
  ),
)
->ignore

(
  () => {
    watcher->Chokidar.getWatched->Js.log
  }
)
->Js.Global.setTimeout(1000)
->ignore

// NOTE TO SELF: to keep an option to move away from chokidar,
// in the initial api we should only take globs as an input (none of the options below)
// like so: ["**/*.res", "!**/Map.res"]
//
// maybe expose usePolling as a boolean though for network FS case

//   ignored: '*.txt',
//   followSymlinks: true,
//   cwd: '.',
//   depth: 99,

//   usePolling: false,
//   interval: 100,
//   binaryInterval: 300,

//
//

//   ignorePermissionErrors: false,
//   atomic: true // or a custom 'atomicity delay', in milliseconds (default 100)
