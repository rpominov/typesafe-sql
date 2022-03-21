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
    DescribeQuery.Client.client,
    string,
  ) => Promise.t<result<DescribeQuery.Client.description, LogError.t>>
  let describeMany: (
    DescribeQuery.Client.client,
    array<string>,
  ) => Promise.t<result<array<DescribeQuery.Client.description>, LogError.t>>
}

module Generate: {
  type parameter = {name: string, datatype: DescribeQuery.Client.dataType}
  type t = {
    name: string,
    originalStatement: string,
    processedStatement: string,
    parameters: array<parameter>,
    columns: option<array<DescribeQuery.Client.field>>,
  }
  let compose: (
    array<Parse.t>,
    array<DescribeQuery.Client.description>,
  ) => array<t>
  let generate: (
    array<Parse.t>,
    array<DescribeQuery.Client.description>,
    array<t> => Promise.t<string>,
  ) => Promise.t<result<string, LogError.t>>
  let exampleGenerator: array<t> => Promise.t<string>
}
