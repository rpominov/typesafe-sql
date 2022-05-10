type rec paramLink<'a> = Plain('a) | Raw(array<string>) | Batch(string, paramLinks<'a>)
and namedParamLink<'a> = {name: string, link: paramLink<'a>}
and paramLinks<'a> = array<namedParamLink<'a>>

let rec print = (~nextParamIndex=ref(1), ast: Parser.ast) => {
  let genParamIndex = () => {
    let index = nextParamIndex.contents
    nextParamIndex := index + 1
    index
  }

  let rec loop = (nodeIndex, sqlAcc, paramsAcc) => {
    if nodeIndex < ast->Js.Array2.length {
      switch ast->Js.Array2.unsafe_get(nodeIndex) {
      | {val: SQL_Chunk(code)} => loop(nodeIndex + 1, sqlAcc ++ code, paramsAcc)
      | {val: Parameter(name)} => {
          let paramIndex = genParamIndex()
          loop(
            nodeIndex + 1,
            sqlAcc ++ "$" ++ paramIndex->Js.Int.toString,
            paramsAcc->Js.Array2.concat([{name: name, link: Plain(paramIndex)}]),
          )
        }
      | {val: RawParameter(name, codeOptions)} => {
          if codeOptions->Js.Array2.length === 0 {
            assert false
          }
          loop(
            nodeIndex + 1,
            // TODO: generate all possible SQL combinations
            sqlAcc ++ codeOptions->Js.Array2.unsafe_get(0),
            paramsAcc->Js.Array2.concat([{name: name, link: Raw(codeOptions)}]),
          )
        }
      | {val: BatchParameter(name, separator, subAst)} => {
          let (subSql, subParams) = print(~nextParamIndex, subAst)
          // TODO: Consider keeping subParams2 to check that the types are consistent between copies.
          let (subSql2, _) = print(~nextParamIndex, subAst)
          loop(
            nodeIndex + 1,
            sqlAcc ++ subSql ++ separator ++ subSql2,
            paramsAcc->Js.Array2.concat([{name: name, link: Batch(separator, subParams)}]),
          )
        }
      | {val: InlineComment(_) | BlockComment(_)} => loop(nodeIndex + 1, sqlAcc, paramsAcc)
      }
    } else {
      (sqlAcc, paramsAcc)
    }
  }

  loop(0, "", [])
}
