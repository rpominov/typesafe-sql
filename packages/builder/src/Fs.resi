let joinPath: (string, string) => string
let resolve: (string, array<string>) => Promise.t<result<array<string>, LogError.t>>
let resoloveRoot: option<string> => string
let read: string => Promise.t<result<string, LogError.t>>
let write: (string, string) => Promise.t<result<unit, LogError.t>>
