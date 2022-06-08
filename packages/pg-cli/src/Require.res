module Loggable = TypesafeSqlErrors.Loggable
module NativeError = TypesafeSqlErrors.Native


type unknown

@module("module") @val external createRequire: (string, . string) => unknown = "createRequire"

let require = moduleId =>
  try {
    // Reference: https://github.com/sindresorhus/import-from/blob/c411bcaaa489069d9e17c232aa4d01f716ae7bd7/index.js
    Ok(Some(createRequire(Fs.Path.join(Process.cwd(), "noop.js"))(. moduleId)))
  } catch {
  | exn =>
    switch NativeError.fromExn(exn) {
    | Some(err) if err->NativeError.code === Some("MODULE_NOT_FOUND") => Ok(None)
    | _ => Error(Loggable.fromExnVerbose(exn))
    }
  }

exception Validation_error(Loggable.t)
let validate = fn =>
  try {
    Ok(fn())
  } catch {
  | Validation_error(err) => Error(err)
  | exn => NativeError.rethrowAsNative(exn)
  }

// Designed to be opened inside Require.validate()
module Validators = {
  @get_index external __getProperty: (Js.Types.obj_val, string) => unknown = ""

  let failed = err => err->Validation_error->raise

  type validator<'a> = {name: string, cast: (. unknown) => option<'a>}

  let unknown = {
    name: "unknown",
    cast: (. val) => Some(val),
  }

  let object = {
    name: "object",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSObject(x) => Some(x)
      | _ => None
      },
  }

  let string = {
    name: "string",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSString(x) => Some(x)
      | _ => None
      },
  }

  let bool = {
    name: "bool",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSFalse => Some(false)
      | JSTrue => Some(true)
      | _ => None
      },
  }

  let int = {
    name: "int",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSNumber(float) if float->Belt.Float.toInt->Belt.Int.toFloat === float =>
        Some(float->Belt.Float.toInt)
      | _ => None
      },
  }

  let function = {
    name: "function",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSFunction(f) => Some(f)
      | _ => None
      },
  }

  let array: validator<array<unknown>> = {
    name: "array",
    cast: (. val) =>
      switch val->Js.Types.classify {
      | JSObject(arr) if Js.Array.isArray(arr) => Some(arr->Obj.magic)
      | _ => None
      },
  }

  let arrayOf = validator => {
    name: `array<${validator.name}>`,
    cast: (. val) =>
      switch array.cast(. val) {
      | None => None
      | Some(arr) => {
          let acc = []
          let rec loop = i => {
            if i < arr->Js.Array2.length {
              switch validator.cast(. arr->Js.Array2.unsafe_get(i)) {
              | None => None
              | Some(x) => {
                  acc->Js.Array2.push(x)->ignore
                  loop(i + 1)
                }
              }
            } else {
              Some(acc)
            }
          }
          loop(0)
        }
      },
  }

  let objectOf2 = (key1, validator1, key2, validator2, constructor) => {
    name: `{${key1}:${validator1.name},${key2}:${validator2.name}}`,
    cast: (. val) =>
      switch object.cast(. val) {
      | None => None
      | Some(obj) =>
        switch validator1.cast(. obj->__getProperty(key1)) {
        | None => None
        | Some(val1) =>
          switch validator2.cast(. obj->__getProperty(key2)) {
          | Some(val2) => Some(constructor(val1, val2))
          | None => None
          }
        }
      },
  }

  let nullable = validator => {
    name: `nullable<${validator.name}>`,
    cast: (. val) =>
      Js.isNullable(val->Obj.magic)
        ? Some(None)
        : switch validator.cast(. val) {
          | None => None
          | some => Some(some)
          },
  }

  let either = (validatorLeft, mapLeft, validatorRight, mapRight) => {
    name: `${validatorLeft.name}|${validatorRight.name}`,
    cast: (. val) =>
      switch validatorLeft.cast(. val) {
      | Some(x) =>
        switch mapLeft(x) {
        | Ok(x) => Some(x)
        | Error(e) => failed(e)
        }
      | None =>
        switch validatorRight.cast(. val) {
        | Some(x) =>
          switch mapRight(x) {
          | Ok(x) => Some(x)
          | Error(e) => failed(e)
          }
        | None => None
        }
      },
  }

  let cast = (val, validator, name) =>
    switch validator.cast(. val) {
    | Some(x) => x
    | None =>
      Loggable.fromUnknown(val)
      ->Loggable.prepend(`${name} is not of type ${validator.name}:`)
      ->failed
    }

  let property = (obj, key, validator) =>
    obj->__getProperty(key)->cast(validator, `Property "${key}"`)
}
