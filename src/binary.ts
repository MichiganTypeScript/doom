import { Call, Numbers, Strings } from "hotscript";
import { Equal, Expect } from "type-testing";

type PowersOfTwo = [
    /* 2**0  */ 1,
    /* 2**1  */ 2,
    /* 2**2  */ 4,
    /* 2**3  */ 8,
    /* 2**4  */ 16,
    /* 2**5  */ 32,
    /* 2**6  */ 64,
    /* 2**7  */ 128,
    /* 2**8  */ 256,
    /* 2**9  */ 512,
    /* 2**10 */ 1024,
    /* 2**11 */ 2048,
    /* 2**12 */ 4096,
    /* 2**13 */ 8192,
    /* 2**14 */ 16384,
    /* 2**15 */ 32768,
    /* 2**16 */ 65536,
    /* 2**17 */ 131072,
    /* 2**18 */ 262144,
    /* 2**19 */ 524288,
    /* 2**20 */ 1048576,
    /* 2**21 */ 2097152,
    /* 2**22 */ 4194304,
    /* 2**23 */ 8388608,
    /* 2**24 */ 16777216,
    /* 2**25 */ 33554432,
    /* 2**26 */ 67108864,
    /* 2**27 */ 134217728,
    /* 2**28 */ 268435456,
    /* 2**29 */ 536870912,
    /* 2**30 */ 1073741824,
    /* 2**31 */ 2147483648,
    /* 2**32 */ 4294967296,
    /* 2**33 */ 8589934592,
    /* 2**34 */ 17179869184,
    /* 2**35 */ 34359738368,
    /* 2**36 */ 68719476736,
    /* 2**37 */ 137438953472,
    /* 2**38 */ 274877906944,
    /* 2**39 */ 549755813888,
    /* 2**40 */ 1099511627776,
    /* 2**41 */ 2199023255552,
    /* 2**42 */ 4398046511104,
    /* 2**43 */ 8796093022208,
    /* 2**44 */ 17592186044416,
    /* 2**45 */ 35184372088832,
    /* 2**46 */ 70368744177664,
    /* 2**47 */ 140737488355328,
    /* 2**48 */ 281474976710656,
    /* 2**49 */ 562949953421312,
    /* 2**50 */ 1125899906842624,
    /* 2**51 */ 2251799813685248,
    /* 2**52 */ 4503599627370496,
    /* 2**53 */ 9007199254740992,
    /* 2**54 */ 18014398509481984,
    /* 2**55 */ 36028797018963970,
    /* 2**56 */ 72057594037927940,
    /* 2**57 */ 144115188075855870,
    /* 2**58 */ 288230376151711740,
    /* 2**59 */ 576460752303423500,
    /* 2**60 */ 1152921504606847000,
    /* 2**61 */ 2305843009213694000,
    /* 2**62 */ 4611686018427388000,
    /* 2**63 */ 9223372036854776000,
];

type Process<
  T extends number,
  
  _Acc extends string = ''
> =
  T extends 0
  ? _Acc
  : Call<Numbers.Mod<T, 2>> extends infer remainder
    ? remainder extends 0
      ? Process<Call<Numbers.Div<T, 2>>, `0${_Acc}`>
      : Process<Call<Numbers.Div<T, 2>>, `1${_Acc}`>
    :never;

type Precision = 32;

type PadLeft<
  S extends string,
  N extends number
> =
  Call<Strings.Length<S>> extends N
  ? S
  : PadLeft<`0${S}`, N>

type x = PadLeft<'', Precision>;
//   ^?

type To64Binary<T extends number> =
  PadLeft<
    Process<T>,
    Precision
  >

type ReverseString<T extends string> =
  T extends `${infer Head}${infer Tail}`
  ? `${ReverseString<Tail>}${Head}`
  : ''

type ToDecimal<T extends string> =
  _ToDecimal<ReverseString<T>>;

type _ToDecimal<
  Binary extends string,

  _PowerOfTwo extends number = 0,
  _NextPowerOfTwo extends number = Call<Numbers.Add<_PowerOfTwo, 1>>
> =
  Binary extends `${infer Head}${infer Tail}`

  ? Head extends '0'
    ? _ToDecimal<
        Tail,
        _NextPowerOfTwo
      >

    : Head extends '1'
      ? Call<Numbers.Add<
          _ToDecimal<
            Tail,
            _NextPowerOfTwo
          >,
          PowersOfTwo[_PowerOfTwo]
        >>

      : never
  : 0

type Input = 100;

type BinaryNumber = To64Binary<Input>;
//   ^?

type DecimalNumber = ToDecimal<BinaryNumber>;
//   ^?

type LookupBitAnd = {
  '0': {
    '0': '0';
    '1': '0';
  };
  '1': {
    '0': '0';
    '1': '1';
  };
}

// QUESTION
// maybe performance would be better if this were just `string`?
type Bit = '0' | '1';

type ProcessLookup<
  A extends string,
  B extends string,
  Lookup extends Record<Bit, Record<Bit, Bit>>,
> =
  A extends `${infer AHead extends Bit}${infer ATail extends string}`
  ? B extends `${infer BHead extends Bit}${infer BTail extends string}`
    ? `${Lookup[AHead][BHead]}${ProcessLookup<ATail, BTail, Lookup>}`
    : never // should always be equal number of digits
  : ''

export type BitwiseAnd<
  T extends number,
  U extends number
> =
  ToDecimal<
    ProcessLookup<To64Binary<T>, To64Binary<U>, LookupBitAnd>
  >

type entry<T extends [number, number]> =
  T extends [
    infer a extends number,
    infer b extends number
  ]
  ? BitwiseAnd<a, b>
  : never

type b1 = To64Binary<1>; // =>
type b2 = To64Binary<2>; // =>

type y2 = ProcessLookup<b1, b2, LookupBitAnd>; // =>
type y3 = ToDecimal<y2>; // =>

type x1 = BitwiseAnd<1, 2>; // =>

type testCases = [
  Expect<Equal<entry<[1, 2]>, 0>>,
  Expect<Equal<entry<[3, 7]>, 3>>,
  Expect<Equal<entry<[0, 1]>, 0>>,
  Expect<Equal<entry<[8, 12]>, 8>>,
  Expect<Equal<entry<[12345, 54321]>, 4145>>,
  Expect<Equal<entry<[-1, 1]>, 1>>,
  // Expect<Equal<entry<[-1, -1]>, -1>>,
  Expect<Equal<entry<[-1, 0]>, 0>>,
  Expect<Equal<entry<[2147483647, 1]>, 1>>,
  // Expect<Equal<entry<[-2147483648, -1]>, -2147483648>>,
  Expect<Equal<entry<[123, 456]>, 72>>,
  Expect<Equal<entry<[987, 654]>, 650>>,
  // Expect<Equal<entry<[-500, 500]>, 4>>,
  // Expect<Equal<entry<[-400, 400]>, 16>>,
  // Expect<Equal<entry<[-300, 300]>, 4>>,
  // Expect<Equal<entry<[-200, 200]>, 8>>,
  Expect<Equal<entry<[0, 0]>, 0>>,
  Expect<Equal<entry<[0, -1]>, 0>>,
  Expect<Equal<entry<[-1, 0]>, 0>>,
  Expect<Equal<entry<[100000, 10000]>, 1536>>,
  Expect<Equal<entry<[200000, 20000]>, 3072>>,
  Expect<Equal<entry<[300000, 30000]>, 4384>>,
  Expect<Equal<entry<[400000, 40000]>, 6144>>,
  Expect<Equal<entry<[500000, 50000]>, 33024>>,
  Expect<Equal<entry<[600000, 60000]>, 8768>>,
  Expect<Equal<entry<[700000, 70000]>, 96>>,
  Expect<Equal<entry<[800000, 80000]>, 12288>>,
  Expect<Equal<entry<[900000, 90000]>, 72576>>,
  Expect<Equal<entry<[1000000, 100000]>, 66048>>,
  Expect<Equal<entry<[1100000, 110000]>, 34976>>,
]