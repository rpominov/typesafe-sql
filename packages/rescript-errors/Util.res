// TODO: find a better place for this code

%%private(
  let isZeroWidth = ch =>
    switch ch {
    // TODO: test for other zero width characters
    | Some("\n") => true
    | _ => false
    }
)

let highlight = (code, ~start, ~end) => {
  if start < 0 {
    Js.Exn.raiseRangeError(j`start is out of range: $start`)
  }
  if end < start {
    Js.Exn.raiseRangeError(j`end is out of range: $end`)
  }

  let symbols = code->Js.String2.castToArrayLike->Js.Array2.from

  let result = []
  let highlightSymbols = ref([])
  let highlightSymbolsEmpty = ref(true)

  for i in 0 to Js.Math.max_int(symbols->Js.Array2.length - 1, end) {
    let symbol = symbols->Belt.Array.get(i)

    if !isZeroWidth(symbol) {
      if i < start {
        highlightSymbols.contents->Js.Array2.push(" ")->ignore
      } else if i <= end {
        highlightSymbols.contents->Js.Array2.push("^")->ignore
        highlightSymbolsEmpty := false
      }
    }

    switch symbol {
    | None => ()
    | Some(x) => result->Js.Array2.push(x)->ignore
    }

    if symbol === Some("\n") {
      if !highlightSymbolsEmpty.contents {
        result->Js.Array2.pushMany(highlightSymbols.contents)->ignore
        result->Js.Array2.push("\n")->ignore
      }
      highlightSymbolsEmpty := true
      highlightSymbols := []
    }
  }

  if !highlightSymbolsEmpty.contents {
    result->Js.Array2.push("\n")->ignore
    result->Js.Array2.pushMany(highlightSymbols.contents)->ignore
  }

  result->Js.Array2.joinWith("")
}
