import type { Div, Mod } from "./hotscript-fork/numbers/impl/division.d.ts";
import type { Length } from "./hotscript-fork/strings/impl/length.d.ts";
// import type { Add } from './hotscript-fork/numbers/impl/addition.d.ts';
import type { Add } from "ts-arithmetic"

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
  : Mod<T, 2> extends infer remainder
    ? remainder extends 0
      ? Process<Div<T, 2>, `0${_Acc}`>
      : Process<Div<T, 2>, `1${_Acc}`>
    :never;

type Precision = 32;

type PadLeft<
  S extends string,
  N extends number,

  RESULT extends string =
    Length<S> extends N
    ? S
    : PadLeft<`0${S}`, N>
> = RESULT

export type IsNegative<
  T extends number
> =
  `${T}` extends `-${string}`
  ? true
  : false

export type To32Binary<
  T extends number,

  UnsignedBinary extends string =
    PadLeft<
      Process<T>,
      Precision
    >,

  // TODO potential for bugs here because we're not actually doing negative numbers really
  RESULT extends string =
    IsNegative<T> extends true
      ? UnsignedBinary extends `${infer firstBit extends string}${infer rest extends string}`
        ? `1${rest}`
        : never
      : UnsignedBinary
> = RESULT

type ReverseString<T extends string> =
  T extends `${infer Head}${infer Tail}`
  ? `${ReverseString<Tail>}${Head}`
  : ''

// QUESTION: I have lookup tables for 0-255 (from both binary and decimal).  Would it be better or faster to just check that object real quick first and return that value if it exists?

export type ToDecimal<T extends string> =
  _ToDecimal<ReverseString<T>>;

type _ToDecimal<
  Binary extends string,

  _PowerOfTwo extends number = 0,
  _NextPowerOfTwo extends number = Add<_PowerOfTwo, 1>
> =
  Binary extends `${infer Head}${infer Tail}`

  ? Head extends '0'
    ? _ToDecimal<
        Tail,
        _NextPowerOfTwo
      >

    : Head extends '1'
      ? Add<
          _ToDecimal<
            Tail,
            _NextPowerOfTwo
          >,
          PowersOfTwo[_PowerOfTwo]
        >

      : never
  : 0

// QUESTION
// maybe performance would be better if this were just `string`?
export type Bit = '0' | '1';

export type SignBit<
  Binary extends string,
  RESULT extends Bit =
    Binary extends `${infer Head extends Bit}${string}`
    ? Head
    : never
> = RESULT;
