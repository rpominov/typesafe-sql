@val external describe: (string, @uncurry (unit => unit)) => unit = "describe"
@val external test: (string, @uncurry (unit => unit)) => unit = "test"
@val external testAsync: (string, @uncurry (unit => Js.Promise.t<unit>)) => unit = "test"
@val external testAsyncCb: (string, @uncurry (((. unit) => unit) => unit)) => unit = "test"

type e<'a>
@val external expect: 'a => e<'a> = "expect"
@send external toBe: (e<'a>, 'a) => unit = "toBe"
@send external toEqual: (e<'a>, 'a) => unit = "toEqual"
@send external toMatchSnapshot: e<'a> => unit = "toMatchSnapshot"

@val external each: (array<'a>, . string, 'a => unit) => unit = "test.each"
let each = (data, title, f) => each(data)(. title, f)

@val external each2: (array<('a, 'b)>, . string, ('a, 'b) => unit) => unit = "test.each"
let each2 = (data, title, f) => each2(data)(. title, f)

@val external each3: (array<('a, 'b, 'c)>, . string, ('a, 'b, 'c) => unit) => unit = "test.each"
let each3 = (data, title, f) => each3(data)(. title, f)

@scope("expect") @val external expectAssertions: int => unit = "assertions"

@val external beforeEach: (@uncurry (unit => unit)) => unit = "beforeEach"
@val external beforeEachAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "beforeEach"
@val external afterEach: (@uncurry (unit => unit)) => unit = "afterEach"
@val external afterEachAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "afterEach"

@val external beforeAll: (@uncurry (unit => unit)) => unit = "beforeAll"
@val external beforeAllAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "beforeAll"
@val external afterAll: (@uncurry (unit => unit)) => unit = "afterAll"
@val external afterAllAsync: (@uncurry (unit => Js.Promise.t<unit>)) => unit = "afterAll"
