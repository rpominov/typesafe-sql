type t

let make: (
  ~pgConfig: Pg.Config.t=?,
  ~onUnexpectedTermination: Js.Exn.t => unit=?,
  unit,
) => Promise.t<result<t, TypesafeSqlErrors.Loggable.t>>

let terminate: t => Promise.t<unit>

let describe: (
  t,
  string,
) => Promise.t<result<TypesafeSqlSharedTypes.Pg.description, TypesafeSqlErrors.Loggable.t>>
