type _SplitToBytes<
  T extends string,

  Acc extends string[] = [],

  RESULT extends string[] =
    T extends `${infer b1}${infer b2}${infer b3}${infer b4}${infer b5}${infer b6}${infer b7}${infer b8}${infer Tail}`
    ? _SplitToBytes<Tail, [...Acc, `${b1}${b2}${b3}${b4}${b5}${b6}${b7}${b8}`]>
    : Acc
> = RESULT;

export type SplitToBytes<
  T extends string,

  RESULT extends string[] =
    _SplitToBytes<T>
> = RESULT;

type _JoinBytes<
  T extends string[],

  Acc extends string = '',

  RESULT extends string =
    T extends [infer byte extends string, ...infer Tail extends string[]]
    ? _JoinBytes<Tail, `${Acc}${byte}`>
    : Acc
> = RESULT;

export type JoinBytes<
  T extends string[],

  RESULT extends string =
    _JoinBytes<T>
> = RESULT;