type Computable = string | number | bigint

type NumberToTuple<T extends Computable, R extends any[] = []> = `${T}` extends `${number}`
? `${T}` extends `${R['length']}`
  ? R
  : NumberToTuple<T, [...R, 1]>
: []

type Remaind10<T extends any[]> = T extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer R]
? {
  number: R['length']
  count: '1'
}
: {
  number: T['length']
  count: ''
}

type Reverse<T extends string> = T extends `${infer L}${infer R}` ? `${Reverse<R>}${L}` : ''

type HalfAdd<A extends Computable, B extends Computable, count extends string = ''> = 
    Remaind10<[...NumberToTuple<A>, ...NumberToTuple<B>, ...count extends '1' ? [1] : []]>

type StrAdd<A extends string, B extends string, count extends string = '0'> =
A extends `${infer AL}${infer AR}`
  ? B extends `${infer BL}${infer BR}`
    ? `${HalfAdd<AL, BL, count>['number'] & number}${StrAdd<AR, BR, HalfAdd<AL, BL, count>['count']>}`
    : `${HalfAdd<AL, count>['number'] & number}${StrAdd<AR, '0', HalfAdd<AL, count>['count']>}`
  : B extends `${infer BL}${infer BR}`
    ? `${HalfAdd<BL, count>['number'] & number}${StrAdd<'', BR, HalfAdd<BL, count>['count']>}`
    : count

export type Sum<A extends Computable, B extends Computable> = Reverse<StrAdd<Reverse<`${A}`>, Reverse<`${B}`>>>