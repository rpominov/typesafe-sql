type client

@module("pg") @new
external make: NodePostgres.config => client = "Client"

@send external connect: client => Promise.t<unit> = "connect"
@send external end: client => Promise.t<unit> = "end"

type fieldInfo

type queryResult<'a> = {
  rows: 'a, // TODO: is it nullable?
  fields: array<fieldInfo>,
  command: [#INSERT | #UPDATE | #CREATE | #SELECT], // TODO: check possible values
  rowCount: int, // TODO: nullable?
}

@send external query: (client, string) => Promise.t<queryResult<'a>> = "query"

type parameters // array<any>

@send
external queryWithParameters: (client, string, parameters) => Promise.t<queryResult<'a>> = "query"

@deriving(abstract)
type queryConfig = {
  @optional values: parameters,
  @optional name: string,
  @optional rowMode: [#array], // FIXME: this affects return type
  //  @optional types: types,
  text: string,
}

@send external queryWithConfig: (client, queryConfig) => Promise.t<queryResult<'a>> = "query"

// TODO
// client.on('error', (err: Error) => void) => void
// client.on('notice', (notice: Error) => void) => void

module type QueryDefinition = {
  type parameters
  type parametersRecord
  type row
  type rows
  type rowRecord
  let statement: string
  let convertParameters: parametersRecord => parameters
}

module type MakeQuery = (Def: QueryDefinition) =>
{
  let run: (client, Def.parametersRecord) => Promise.t<queryResult<Def.rows>>
}

module MakeQuery: MakeQuery = (Def: QueryDefinition) => {
  type _config = {
    values: Def.parameters,
    rowMode: [#array],
    text: string,
  }

  @send external _query: (client, _config) => Promise.t<queryResult<Def.rows>> = "query"

  let run = (client, parameters) =>
    client->_query({
      values: parameters->Def.convertParameters,
      rowMode: #array,
      text: Def.statement,
    })
}
