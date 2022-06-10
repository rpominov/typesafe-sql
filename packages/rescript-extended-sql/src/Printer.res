open TypesafeSqlSharedTypes.ExtendedSql

@send external flatMap: (array<'a>, 'a => array<'b>) => array<'b> = "flatMap"

// Not sure we need this really
let setSafe = (dict, key, val) => {
  if key !== "__proto__" {
    dict->Js.Dict.set(key, val)
  }
  dict
}

let rec print = (~nextParamIndex=ref(1), ast: TypesafeSqlSharedTypes.ExtendedSql.ast) => {
  let genParamIndex = () => {
    let index = nextParamIndex.contents
    nextParamIndex := index + 1
    index
  }

  let rec loop = (nodeIndex, sqlAcc, paramsAcc) => {
    if nodeIndex < ast->Js.Array2.length {
      switch ast->Js.Array2.unsafe_get(nodeIndex) {
      | {node: #SqlChunk(code)} =>
        loop(nodeIndex + 1, sqlAcc->Js.Array2.map(x => x ++ code), paramsAcc)
      | {node: #Parameter({name})} => {
          let paramIndex = genParamIndex()
          loop(
            nodeIndex + 1,
            sqlAcc->Js.Array2.map(x => x ++ "$" ++ paramIndex->Js.Int.toString),
            paramsAcc->setSafe(name, #Parameter({dataType: paramIndex})),
          )
        }
      | {node: #RawParameter({name, options})} => {
          if options->Js.Array2.length === 0 {
            assert false
          }
          loop(
            nodeIndex + 1,
            sqlAcc->flatMap(x => options->Js.Array2.map(y => x ++ y)),
            paramsAcc->setSafe(name, #RawParameter({options: options})),
          )
        }
      | {node: #BatchParameter({name, separator, body})} => {
          let (subSql, subParams) = print(~nextParamIndex, body)
          // TODO: Consider keeping subParams2 to check that the types are consistent between copies.
          let (subSql2, _) = print(~nextParamIndex, body)
          loop(
            nodeIndex + 1,
            sqlAcc
            ->flatMap(x => subSql->Js.Array2.map(y => x ++ y))
            ->flatMap(x => subSql2->Js.Array2.map(y => x ++ separator ++ y)),
            paramsAcc->setSafe(name, #BatchParameter({separator: separator, fields: subParams})),
          )
        }
      | {node: #InlineComment(_) | #BlockComment(_)} => loop(nodeIndex + 1, sqlAcc, paramsAcc)
      }
    } else {
      (sqlAcc, paramsAcc)
    }
  }

  loop(0, [""], Js.Dict.empty())
}
