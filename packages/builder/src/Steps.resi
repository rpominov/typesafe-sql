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
    TypesafeSqlRescriptDescribeQuery.Client.client,
    string,
  ) => Promise.t<result<TypesafeSqlRescriptDescribeQuery.Client.description, LogError.t>>
  let describeMany: (
    TypesafeSqlRescriptDescribeQuery.Client.client,
    array<string>,
  ) => Promise.t<result<array<TypesafeSqlRescriptDescribeQuery.Client.description>, LogError.t>>
}

module Generate: {
  type parameter = {name: string, datatype: TypesafeSqlRescriptDescribeQuery.Client.dataType}
  type t = {
    name: string,
    originalStatement: string,
    processedStatement: string,
    parameters: array<parameter>,
    columns: option<array<TypesafeSqlRescriptDescribeQuery.Client.field>>,
  }
  let compose: (
    array<Parse.t>,
    array<TypesafeSqlRescriptDescribeQuery.Client.description>,
  ) => array<t>
  let generate: (
    array<Parse.t>,
    array<TypesafeSqlRescriptDescribeQuery.Client.description>,
    array<t> => Promise.t<string>,
  ) => Promise.t<result<string, LogError.t>>
  let exampleGenerator: array<t> => Promise.t<string>
}
