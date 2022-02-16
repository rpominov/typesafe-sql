module Read: {
  let read: string => Promise.t<result<string, LogError.t>>
}

module Parse: {
  type t = {
    name: string,
    parameters: array<string>,
    originalStatement: string,
    processedStatement: string,
  }
  type error = NameNotFound
  let parseStatement: string => result<t, error>
  let parse: string => result<array<t>, string>
  let asyncParse: string => Promise.t<result<array<t>, LogError.t>>
}

module Describe: {
  let describe: (
    TypesafeSQLDescribeQuery.client,
    string,
  ) => Promise.t<result<TypesafeSQLDescribeQuery.description, TypesafeSqlBuilder.LogError.t>>
  let describeMany: (
    TypesafeSQLDescribeQuery.client,
    array<string>,
  ) => Promise.t<result<array<TypesafeSQLDescribeQuery.description>, TypesafeSqlBuilder.LogError.t>>
}

module Generate: {
  type parameter = {name: string, datatype: TypesafeSQLDescribeQuery.datatype}
  type t = {
    name: string,
    originalStatement: string,
    processedStatement: string,
    parameters: array<parameter>,
    columns: option<array<TypesafeSQLDescribeQuery.outputItem>>,
  }
  let compose: (array<Parse.t>, array<TypesafeSQLDescribeQuery.description>) => array<t>
  let generate: (
    array<Parse.t>,
    array<TypesafeSQLDescribeQuery.description>,
    array<t> => Promise.t<string>,
  ) => Promise.t<result<string, LogError.t>>
  let exampleGenerator: array<t> => Promise.t<string>
}

module Write: {
  let write: (string, string) => Promise.t<result<unit, LogError.t>>
}
