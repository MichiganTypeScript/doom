// reverse a string
type ReverseString<S extends string> = S extends `${infer F}${infer Rest}` ? `${ReverseString<Rest>}${F}` : ''

// convert number to tuple, tail-recursion
type Number2Tuple<N extends number, _T extends unknown[] = []> = _T['length'] extends N ? _T : Number2Tuple<N, [..._T, unknown]>

// sum two numbers
type SumNumber<A extends number, B extends number> = [...Number2Tuple<A>, ...Number2Tuple<B>]['length'] & number

// sum two numbers in reversed string format
type SumReversedString<A extends string, B extends string> = 
  A extends `${infer AF extends number}${infer ARest}`
  ? B extends `${infer BF extends number}${infer BRest}`
    ? ReverseString<`${SumNumber<AF, BF>}`> extends `${infer Gewei}${infer Shiwei}`
      ? `${Gewei}${SumReversedString<ARest, SumReversedString<BRest, Shiwei>>}`
      : never
    : A
  : B

export type Sum<A extends string | number | bigint, B extends string | number | bigint> = ReverseString<SumReversedString<ReverseString<`${A}`>, ReverseString<`${B}`>>>