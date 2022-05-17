type t<'key, 'val>

let make: (array<'key> => Promise.t<array<'val>>, 'key => string, 'val => string) => t<'key, 'val>

let get: (t<'key, 'val>, 'key) => Promise.t<option<'val>>
