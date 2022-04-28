type rec node =
  | SQL_Chunk(string)
  | InlineComment(string)
  | BlockComment(string)
  | Parameter(string)
  | Raw(string, array<string>)
  | Batch(string, string, ast)
and ast = array<node>
type attributes = {name: option<string>}
type parsedStatement = {
  rawText: string,
  attributes: attributes,
  ast: ast,
}
type parseError = {message: string, pos: int}

let inRange = (arr, pos) => pos < arr->Js.Array2.length

let nextEq = (arr, pos, val) => arr->inRange(pos + 1) && arr->Js.Array2.unsafe_get(pos + 1) === val

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseInlineComment = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Ok((startPos, InlineComment(acc)))
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "\n" => Ok((startPos + 1, InlineComment(acc)))
    | s => parseInlineComment(acc ++ s, symbols, startPos + 1)
    }
  }
let parseInlineComment = parseInlineComment("")

// https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-COMMENTS
let rec parseBlockComment = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Error({
      message: "Was expecting a block comment close sequence */, but reached the end of the string",
      pos: startPos,
    })
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "*" if symbols->nextEq(startPos, "/") => Ok((startPos + 2, BlockComment(acc)))
    | "/" if symbols->nextEq(startPos, "*") =>
      switch parseBlockComment("", symbols, startPos + 2) {
      | Ok((pos, BlockComment(content))) =>
        parseBlockComment(acc ++ "/*" ++ content ++ "*/", symbols, pos)
      | Error(_) as err => err
      | _ => assert false
      }
    | s => parseBlockComment(acc ++ s, symbols, startPos + 1)
    }
  }
let parseBlockComment = parseBlockComment("")

let isValidIdentifierCh = ch => {
  let code = ch->Js.String2.charCodeAt(0)
  // 0-9 || A-Z || a-z
  (code >= 48. && code <= 57.) || code >= 65. && code <= 90. || (code >= 97. && code <= 122.)
}

let rec parseRaw = (curAcc, acc, delSize, closeCnt, delCnt, name, symbols, startPos) => {
  let commit = () => acc->Js.Array2.concat([curAcc->Js.String2.slice(~from=0, ~to_=-delSize)])
  if closeCnt === delSize {
    Ok((startPos, Raw(name, commit())))
  } else if delCnt === delSize {
    parseRaw("", commit(), delSize, 0, 0, name, symbols, startPos)
  } else if symbols->inRange(startPos)->not {
    let seq = ">"->Js.String2.repeat(delSize)
    Error({
      message: `Was expecting a raw parameter close sequence ${seq}, but reached the end of the string`,
      pos: startPos,
    })
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "<" if curAcc === "" && acc->Js.Array2.length === 0 =>
      parseRaw("", [], delSize + 1, 0, 0, name, symbols, startPos + 1)
    | s =>
      parseRaw(
        curAcc ++ s,
        acc,
        delSize,
        s === ">" ? closeCnt + 1 : 0,
        s === "|" ? delCnt + 1 : 0,
        name,
        symbols,
        startPos + 1,
      )
    }
  }
}
let parseRaw = parseRaw("", [], 1, 0, 0)

let rec parseBatch = (acc, delSize, closeCnt, name, symbols, startPos) => {
  if closeCnt === delSize {
    switch acc->Js.String2.slice(~from=0, ~to_=-delSize)->toAst {
    | Ok(ast) => Ok((startPos, Batch(name, ",", ast)))
    | Error(_) as err => err
    }
  } else if symbols->inRange(startPos)->not {
    let seq = ">"->Js.String2.repeat(delSize)
    Error({
      message: `Was expecting a batch parameter close sequence ${seq}, but reached the end of the string`,
      pos: startPos,
    })
  } else {
    switch symbols->Js.Array2.unsafe_get(startPos) {
    | "<" if acc === "" => parseBatch("", delSize + 1, 0, name, symbols, startPos + 1)
    | ">" => parseBatch(acc ++ ">", delSize, closeCnt + 1, name, symbols, startPos + 1)
    | s => parseBatch(acc ++ s, delSize, 0, name, symbols, startPos + 1)
    }
  }
}
and parseParameter = (acc, symbols, startPos) =>
  if symbols->inRange(startPos)->not {
    Ok((startPos, Parameter(acc)))
  } else {
    let symbol = symbols->Js.Array2.unsafe_get(startPos)
    if isValidIdentifierCh(symbol) {
      parseParameter(acc ++ symbol, symbols, startPos + 1)
    } else if acc === "" {
      Error({
        message: "Unexpected : symbol not followed by a parameter name. If you meant to simply insert :, please escape it with a backslash \:",
        pos: startPos - 1,
      })
    } else if (
      symbol === ":" &&
      symbols->nextEq(startPos, "r") &&
      symbols->nextEq(startPos + 1, "a") &&
      symbols->nextEq(startPos + 2, "w") &&
      symbols->nextEq(startPos + 3, "<")
    ) {
      parseRaw(acc, symbols, startPos + 5)
    } else if (
      symbol === ":" &&
      symbols->nextEq(startPos, "b") &&
      symbols->nextEq(startPos + 1, "a") &&
      symbols->nextEq(startPos + 2, "t") &&
      symbols->nextEq(startPos + 3, "c") &&
      symbols->nextEq(startPos + 4, "h") &&
      symbols->nextEq(startPos + 5, "<")
    ) {
      parseBatch("", 1, 0, acc, symbols, startPos + 7)
    } else {
      Ok((startPos, Parameter(acc)))
    }
  }
and toAst = text => {
  let symbols = text->Js.String2.castToArrayLike->Js.Array2.from

  let pos = ref(0)
  let ast = []
  let currentSQLChunk = ref("")
  let error = ref(None)

  let commitSQLChunk = () =>
    if currentSQLChunk.contents !== "" {
      ast->Js.Array2.push(SQL_Chunk(currentSQLChunk.contents))->ignore
      currentSQLChunk := ""
    }

  let commitSubParse = result => {
    commitSQLChunk()
    switch result {
    | Error(err) => error := Some(err)
    | Ok((newPos, node)) => {
        ast->Js.Array2.push(node)->ignore
        pos := newPos
      }
    }
  }

  let nextEq = val => symbols->nextEq(pos.contents, val)

  while error.contents === None && symbols->inRange(pos.contents) {
    switch symbols->Js.Array2.unsafe_get(pos.contents) {
    | "-" if nextEq("-") => parseInlineComment(symbols, pos.contents + 2)->commitSubParse
    | "/" if nextEq("*") => parseBlockComment(symbols, pos.contents + 2)->commitSubParse
    | "\\" if nextEq(":") => {
        currentSQLChunk := currentSQLChunk.contents ++ ":"
        pos := pos.contents + 2
      }
    | ":" => parseParameter("", symbols, pos.contents + 1)->commitSubParse
    | s => {
        currentSQLChunk := currentSQLChunk.contents ++ s
        pos := pos.contents + 1
      }
    }
  }

  switch error.contents {
  | None => {
      commitSQLChunk()
      Ok(ast)
    }
  | Some(err) => Error(err)
  }
}

let rec commentsBeforeCode = (i, acc, ast) => {
  if i >= ast->Js.Array2.length {
    acc
  } else {
    switch ast->Js.Array2.unsafe_get(i) {
    | InlineComment(str) | BlockComment(str) => commentsBeforeCode(i + 1, acc ++ "\n" ++ str, ast)
    | SQL_Chunk(str) if str->Js.String2.trim === "" => commentsBeforeCode(i + 1, acc, ast)
    | _ => acc
    }
  }
}
let commentsBeforeCode = commentsBeforeCode(0, "")

let parseAttributes = ast =>
  switch switch %re("/^\s*@name:\s*(.*?)\s*$/m")->Js.Re.exec_(ast->commentsBeforeCode) {
  | Some(result) =>
    switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
    | None => Error("Invalid @name attribute")
    | Some(value) =>
      %re("/^[a-zA-Z][0-9a-zA-Z_]*$/")->Js.Re.test_(value)
        ? Ok(Some(value))
        : Error(`Invalid @name attribute: ${value}`)
    }
  | _ => Ok(None)
  } {
  | Ok(name) => Ok({name: name})
  | Error(msg) => Error({message: msg, pos: -1})
  }

let parse = text =>
  switch toAst(text) {
  | Error(_) as err => err
  | Ok(ast) =>
    switch parseAttributes(ast) {
    | Error(_) as err => err
    | Ok(attributes) =>
      Ok({
        rawText: text,
        attributes: attributes,
        ast: ast,
      })
    }
  }

let rec parseMany = (texts, acc, i) =>
  if i >= texts->Js.Array2.length {
    Ok(
      acc->Js.Array2.filter(parsed =>
        parsed.ast->Js.Array2.some(node =>
          switch node {
          | InlineComment(_) | BlockComment(_) => false
          | SQL_Chunk(str) if str->Js.String2.trim === "" => false
          | _ => true
          }
        )
      ),
    )
  } else {
    switch texts->Js.Array2.unsafe_get(i)->Js.String2.trim->parse {
    | Ok(parsed) => texts->parseMany(acc->Js.Array2.concat([parsed]), i + 1)
    // FIXME: pos should refer to position within file
    | Error(_) as err => err
    }
  }

let parseFile = text =>
  switch toAst(text) {
  | Error(_) as err => err
  | Ok(ast) =>
    text
    ->Js.String2.split(
      switch %re("/^\s*@separator:\s*(.*?)\s*$/m")->Js.Re.exec_(ast->commentsBeforeCode) {
      | Some(result) =>
        switch result->Js.Re.captures->Js.Array2.unsafe_get(1)->Js.Nullable.toOption {
        | None => assert false
        // FIXME: need to remove the comment with the custom separator before split()
        | Some(value) => value
        }
      | _ => ";"
      },
    )
    ->parseMany([], 0)
  }
