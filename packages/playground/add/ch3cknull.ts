type Computable = string | number | bigint

type NumberToTupleBase<
  T extends string,
  R extends any[] = []
> =
  `${T}` extends `${number}`
  ? `${T}` extends `${R['length']}`
    ? R
    : NumberToTupleBase<T, [...R, 1]>
  : []

type Expand10<
  T extends any[]
> = [
  ...T, // 0
  ...T, // 1
  ...T, // 2
  ...T, // 3
  ...T, // 4
  ...T, // 5
  ...T, // 6
  ...T, // 7
  ...T, // 8
  ...T, // 9
]

type NumberToTuple<
  S extends Computable,
  Res extends any[] = [],
> =
  `${S}` extends `${infer L}${infer R}`
  ? NumberToTuple<
      R,
      [
        ...Expand10<Res>,
        ...NumberToTupleBase<L>
      ]
    >
  : Res

type Remaind10<T extends any[]> =
  T extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer R]
  ? {
    number: R['length']
    count: [1]
  }
  : {
    number: T['length']
    count: []
  }

type HalfAdd<
  A extends Computable,
  B extends Computable,
  count extends any[] = []
> =
  Remaind10<[
    ...NumberToTuple<A>,
    ...NumberToTuple<B>,
    ...count
  ]>

type Reverse<
  T extends string
> =
  T extends `${infer L}${infer R}`
  ? `${Reverse<R>}${L}`
  : ''

type StrAdd<
  A extends string,
  B extends string,
  count extends any[] = []
> =
  A extends `${infer AL}${infer AR}`
  
  ? B extends `${infer BL}${infer BR}`
    ? `${HalfAdd<AL, BL, count>['number'] & number}${StrAdd<AR,  BR, HalfAdd<AL, BL, count>['count']>}`
    : `${HalfAdd<AL,  0, count>['number'] & number}${StrAdd<AR, '0', HalfAdd<AL,  0, count>['count']>}`
  
    : B extends `${infer BL}${infer BR}`
    ? `${HalfAdd<0,  BL, count>['number'] & number}${StrAdd<'',  BR, HalfAdd<'', BL, count>['count']>}`
    : count extends [1]
      ? '1'
      : ''

export type Sum<
  A extends Computable,
  B extends Computable
> =
  Reverse<
    StrAdd<
      Reverse<`${A}`>,
      Reverse<`${B}`>
    >
  >