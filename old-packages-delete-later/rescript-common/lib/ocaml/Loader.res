type t<'key, 'val> = {
  cache: Js.Dict.t<option<'val>>,
  fetcher: array<'key> => Promise.t<array<'val>>,
  keyToKey: 'key => string,
  valToKey: 'val => string,
  mutable quenue: array<'key>,
  mutable currentRequestResult: option<Promise.t<unit>>,
}

let make = (fetcher, keyToKey, valToKey) => {
  cache: Js.Dict.empty(),
  fetcher: fetcher,
  keyToKey: keyToKey,
  valToKey: valToKey,
  quenue: [],
  currentRequestResult: None,
}

let fetchQuenue = loader => {
  if loader.currentRequestResult === None {
    if loader.quenue->Js.Array2.length > 0 {
      let requestKeys = ref([])
      loader.currentRequestResult =
        Promise.resolve()
        ->Promise.chain(_ => {
          let keys = loader.quenue
          loader.quenue = []
          requestKeys := keys
          loader.fetcher(keys)
        })
        ->Promise.map(values => {
          loader.currentRequestResult = None

          let foundKeys = []
          for i in 0 to values->Js.Array2.length - 1 {
            let val = values[i]
            let keyStr = loader.valToKey(val)
            foundKeys->Js.Array2.push(keyStr)->ignore
            loader.cache->Js.Dict.set("key_" ++ keyStr, Some(val))
          }

          for i in 0 to requestKeys.contents->Js.Array2.length - 1 {
            let keyStr = requestKeys.contents[i]->loader.keyToKey
            if foundKeys->Js.Array2.includes(keyStr)->not {
              loader.cache->Js.Dict.set("key_" ++ keyStr, None)
            }
          }
        })
        ->Some
    } else {
      loader.currentRequestResult = Some(
        Promise.make(resolve => {
          loader.currentRequestResult = None
          resolve()
        }),
      )
    }
  }
}

let rec get = (loader, key) => {
  let keyStr = loader.keyToKey(key)
  switch loader.cache->Js.Dict.get("key_" ++ keyStr) {
  | Some(val) => Promise.resolve(val)
  | None => {
      if loader.quenue->Js.Array2.every(k => loader.keyToKey(k) !== keyStr) {
        loader.quenue->Js.Array2.push(key)->ignore
      }
      fetchQuenue(loader)
      loader.currentRequestResult->Belt.Option.getExn->Promise.chain(_ => get(loader, key))
    }
  }
}
