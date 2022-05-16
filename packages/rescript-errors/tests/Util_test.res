open Jest

let realWorld = `if i < start {
      highlightSymbols.contents->Js.Array2.push(_)->ignore
    } else if i <= end {
      highlightSymbols.contents->Js.Array2.push(_)->ignore
      highlightSymbolsEmpty := false
    }
`

each3(
  [("abc", 0, 0), ("abc", 3, 3), ("abc", 4, 4), (realWorld, 21, 95), (`>> ☀︎ <<`, 2, 4)],
  "%p %p %p",
  (code, start, end) => Util.highlight(~start, ~end, code)->expect->toMatchSnapshot,
)
