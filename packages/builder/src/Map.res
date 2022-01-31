// TODO: delete if not used

type t<'a>
@new external make: unit => t<'a> = "Map"
@send external has: (t<'a>, string) => bool = "has"
@send external get: (t<'a>, string) => option<'a> = "get"
@send external set: (t<'a>, string, 'a) => t<'a> = "set"
@send external delete: (t<'a>, string) => bool = "delete"
@send external clear: t<'a> => unit = "clear"
@get external size: t<'a> => int = "size"
@send external forEach: (t<'a>, ('a, string) => unit) => unit = "forEach"
