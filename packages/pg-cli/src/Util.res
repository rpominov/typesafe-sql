include TypesafeSqlErrors.Util

let mapAsyncSeq = (arr, fn) =>
  arr->Array.reduce(Promise.resolve([]), (acc, item) =>
    acc->Promise.chain(arr => fn(item)->Promise.map(val => arr->Array.concat([val])))
  )
