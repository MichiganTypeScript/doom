// Utils
type NumberToTuple<N extends number, T extends 1[] = []> = T['length'] extends N
  ? T
  : NumberToTuple<N, [...T, 1]>;

type Reverse<S extends string> = S extends `${infer F}${infer R}`
  ? `${Reverse<R>}${F}`
  : S;

type ToNumber<T> = T extends number ? T : never;

// Helper types
type CarryOver<N extends number> =
  `${N}` extends `${infer _}${infer __ extends number}` ? 1 : 0;

type LastDigit<N extends number> =
  `${N}` extends `${infer _}${infer D extends number}` ? D : N;

type Add<A extends number, B extends number> = ToNumber<
  [...NumberToTuple<A>, ...NumberToTuple<B>]['length']
>;

type StringSum<
  A extends string,
  B extends string,
  C extends number = 0
> = A extends `${infer AF extends number}${infer AR}`
  ? B extends `${infer BF extends number}${infer BR}`
    ? `${LastDigit<Add<Add<AF, BF>, C>>}${StringSum<
        AR,
        BR,
        CarryOver<Add<Add<AF, BF>, C>>
      >}`
    : `${LastDigit<Add<AF, C>>}${CarryOver<Add<AF, C>> extends 1
        ? StringSum<AR, '', 1>
        : AR}`
  : B extends `${infer BF extends number}${infer BR}`
  ? `${LastDigit<Add<BF, C>>}${CarryOver<Add<BF, C>> extends 1
      ? StringSum<'', BR, 1>
      : BR}`
  : C extends 0
  ? ''
  : `${C}`;

export type Sum<
  A extends string | number | bigint,
  B extends string | number | bigint
> = Reverse<StringSum<Reverse<`${A}`>, Reverse<`${B}`>>>;