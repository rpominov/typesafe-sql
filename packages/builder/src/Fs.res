// "{0..-3}/{-2}.js"

// "{0..-3}/__gen__/{-2}.js"

// "__gen__/{1..-2}.js"

// "src/db/file.sql"

// -4   -3  -2    -1
//  0    1   2     3
//  src  db  file  .sql

// "{0..-3}/{-2}.js"         -> "src/db/file.js"
// "{0..-3}/__gen__/{-2}.js" -> "src/db/__gen__/file.js"
// "__gen__/{1..-2}.js"      -> "__gen__/db/file.js"

@val external int: string => float = "Number"
let int = str => {
  let result = int(str)
  let result' = result->Belt.Int.fromFloat
  result === result'->Belt.Int.toFloat ? Some(result') : None
}

type rec node = Range(int, int) | Index(int) | Literal(string) | Concat(array<node>)
type status = L(string) | S(string) | I(string) | R(string, string)

let rec parsePatternElment = (str, status_, i, results) => {
  switch status_ {
  | None => results->Ok
  | Some(status) => {
      let ch = str->Js.String2.charAt(i)
      let status' = switch (status, ch) {
      | (L(_), "") => None->Ok
      | (S(_), "") => Error("Unexpected end of string. Expected a character after \"\\\"")
      | (_, "") => Error("Unexpected end of string. Did you forget to close a range?")
      | (L(s), "\\") => S(s)->Some->Ok
      | (L(_), "{") => I("")->Some->Ok
      | (L(s), c) => L(s ++ c)->Some->Ok
      | (S(s), c) => L(s ++ c)->Some->Ok
      | (I(s), ".") => R(s, "")->Some->Ok
      | (I(_), "}") => L("")->Some->Ok
      | (I(s), c) => I(s ++ c)->Some->Ok
      | (R(s, ""), ".") => R(s, "")->Some->Ok
      | (R(_, _), ".") => Error("Unexpected \".\" inside a range")
      | (R(_, _), "}") => L("")->Some->Ok
      | (R(a, b), c) => R(a, b ++ c)->Some->Ok
      }
      switch status' {
      | Error(s) => Error(s)
      | Ok(status'') => {
          let newResult = switch (status, status'') {
          | (L(_), Some(L(_)))
          | (L(_), Some(S(_)))
          | (L(""), _)
          | (S(_), _)
          | (I(_), Some(I(_)))
          | (I(_), Some(R(_, _)))
          | (R(_, _), Some(R(_, _))) =>
            None->Ok
          | (L(s), _) => Literal(s)->Some->Ok
          | (I(a), _) =>
            switch a->int {
            | Some(a') => Index(a')->Some->Ok
            | None => Error(`Bad range limit: ${a}`)
            }
          | (R(a, b), _) =>
            switch a->int {
            | Some(a') =>
              switch b->int {
              | Some(b') =>
                // 1..2 -> ok
                // 1..-1 -> ok
                // 2..1 -> err
                // -2..-1 -> ok
                // -1..1 -> err
                // -1..-2 -> err
                if a' >= 0 ? b' > 0 && b' < a' : b' >= 0 || b' < a' {
                  Error(`Bad range limits: ${a}..${b}`)
                } else {
                  Range(a', b')->Some->Ok
                }
              | None => Error(`Bad range limit: ${b}`)
              }
            | None => Error(`Bad range limit: ${a}`)
            }
          }
          switch newResult {
          | Error(s) => Error(s)
          | Ok(newResult') => {
              let results' = switch newResult' {
              | None => results
              | Some(x) => results->Js.Array2.concat([x])
              }
              parsePatternElment(str, status'', i + 1, results')
            }
          }
        }
      }
    }
  }
}
let parsePatternElment = str => parsePatternElment(str, Some(L("")), 0, [])

let parseDistinationPattern = pattern =>
  pattern->Js.String2.split("/")->Js.Array2.map(parsePatternElment)
