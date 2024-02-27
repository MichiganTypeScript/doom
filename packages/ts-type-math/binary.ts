import { AddBinary } from "./add";
import { BitwiseNotBinary } from "./bitwise";
import type { DivTSBigInt, DivTSNumbers, Mod, ModBigInt } from "./hotscript-fork/numbers/impl/division";
import type { Length } from "./hotscript-fork/strings/impl/length";
import type { Add, AddBigInt } from './hotscript-fork/numbers/impl/addition';


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
];

type PowersOfTwoBigInt = [
    /* 2**0  */ 1n,
    /* 2**1  */ 2n,
    /* 2**2  */ 4n,
    /* 2**3  */ 8n,
    /* 2**4  */ 16n,
    /* 2**5  */ 32n,
    /* 2**6  */ 64n,
    /* 2**7  */ 128n,
    /* 2**8  */ 256n,
    /* 2**9  */ 512n,
    /* 2**10 */ 1024n,
    /* 2**11 */ 2048n,
    /* 2**12 */ 4096n,
    /* 2**13 */ 8192n,
    /* 2**14 */ 16384n,
    /* 2**15 */ 32768n,
    /* 2**16 */ 65536n,
    /* 2**17 */ 131072n,
    /* 2**18 */ 262144n,
    /* 2**19 */ 524288n,
    /* 2**20 */ 1048576n,
    /* 2**21 */ 2097152n,
    /* 2**22 */ 4194304n,
    /* 2**23 */ 8388608n,
    /* 2**24 */ 16777216n,
    /* 2**25 */ 33554432n,
    /* 2**26 */ 67108864n,
    /* 2**27 */ 134217728n,
    /* 2**28 */ 268435456n,
    /* 2**29 */ 536870912n,
    /* 2**30 */ 1073741824n,
    /* 2**31 */ 2147483648n,
    /* 2**32 */ 4294967296n,
    /* 2**33 */ 8589934592n,
    /* 2**34 */ 17179869184n,
    /* 2**35 */ 34359738368n,
    /* 2**36 */ 68719476736n,
    /* 2**37 */ 137438953472n,
    /* 2**38 */ 274877906944n,
    /* 2**39 */ 549755813888n,
    /* 2**40 */ 1099511627776n,
    /* 2**41 */ 2199023255552n,
    /* 2**42 */ 4398046511104n,
    /* 2**43 */ 8796093022208n,
    /* 2**44 */ 17592186044416n,
    /* 2**45 */ 35184372088832n,
    /* 2**46 */ 70368744177664n,
    /* 2**47 */ 140737488355328n,
    /* 2**48 */ 281474976710656n,
    /* 2**49 */ 562949953421312n,
    /* 2**50 */ 1125899906842624n,
    /* 2**51 */ 2251799813685248n,
    /* 2**52 */ 4503599627370496n,
    /* 2**53 */ 9007199254740992n,
    /* 2**54 */ 18014398509481984n,
    /* 2**55 */ 36028797018963970n,
    /* 2**56 */ 72057594037927940n,
    /* 2**57 */ 144115188075855870n,
    /* 2**58 */ 288230376151711740n,
    /* 2**59 */ 576460752303423500n,
    /* 2**60 */ 1152921504606847000n,
    /* 2**61 */ 2305843009213694000n,
    /* 2**62 */ 4611686018427388000n,
    /* 2**63 */ 9223372036854776000n,
];

type ProcessTSNumber<
  T extends number,

  _Acc extends string = ''
> =
  T extends 0
  ? _Acc
  : Mod<T, 2> extends infer remainder
    ? remainder extends 0
      ? ProcessTSNumber<DivTSNumbers<T, 2>, `0${_Acc}`>
      : ProcessTSNumber<DivTSNumbers<T, 2>, `1${_Acc}`>
    :never;

type ProcessTSBigInt<
  T extends bigint,

  _Acc extends string = ''
> =
  T extends 0n
  ? _Acc
  : ModBigInt<T, 2n> extends infer remainder
    ? remainder extends 0n
      ? ProcessTSBigInt<DivTSBigInt<T, 2n>, `0${_Acc}`>
      : ProcessTSBigInt<DivTSBigInt<T, 2n>, `1${_Acc}`>
    :never;

export namespace Pad {
  export type StartWith8Zeros<
    input extends string
  > = `00000000${input}`

  export type StartWith16Zeros<
    input extends string
  > = `0000000000000000${input}`

  export type StartWith24Zeros<
    input extends string
  > = `000000000000000000000000${input}`

  export type StartWith32Zeros<
    input extends string
  > = `00000000000000000000000000000000${input}`

  /** @deprecated avoid using this and try to use one of the dedicated ones if you know how many 0s you want to add */
  export type StartWithZeros<
    input extends string,
    finalLength extends number,
  > = Satisfies<string,
    Length<input> extends finalLength
    ? input
    : StartWithZeros<`0${input}`, finalLength>
  >

  export type StartWith8Ones<
    input extends string
  > = `11111111${input}`

  export type StartWith16Ones<
    input extends string
  > = `1111111111111111${input}`

  export type StartWith24Ones<
    input extends string
  > = `111111111111111111111111${input}`

  export type StartWith32Ones<
    input extends string
  > = `11111111111111111111111111111111${input}`

  /** @deprecated avoid using this and try to use one of the dedicated ones if you know how many 0s you want to add */
  export type StartWithOnes<
    input extends string,
    finalLength extends number,
  > = Satisfies<string,
    Length<input> extends finalLength
    ? input
    : StartWithOnes<`1${input}`, finalLength>
  >
}

export type TsBigIntIsNegative<
  T extends bigint
> =
  `${T}` extends `-${string}`
  ? true
  : false

export type TsNumberIsNegative<
  T extends number
> =
  `${T}` extends `-${string}`
  ? true
  : false

export type To32Binary<
  T extends number,
> = Satisfies<string,
  TsNumberIsNegative<T> extends true

  ? // we need do the Two's Complement fliperouney thing
    TwosComplementFlip<Pad.StartWithZeros<ProcessTSNumber<T>, 32>>
  
  : // full 32 bit
    Pad.StartWithZeros<ProcessTSNumber<T>, 32>
>

export type To64Binary<
  T extends bigint,
> = Satisfies<string,
  TsBigIntIsNegative<T> extends true

  ? // we need do the Two's Complement fliperouney thing
    TwosComplementFlip<Pad.StartWithZeros<ProcessTSBigInt<T>, 64>>

  : // full 64 bit
    Pad.StartWithZeros<ProcessTSBigInt<T>, 64>
>

/**
 * @interesting this can do a 32 bit string in four gulps (rather than 32)
 * 
 */
export type ReverseString<T extends string> =
  // let's go 8 at a time (rather than 1)
  T extends `${infer h1}${infer h2}${infer h3}${infer h4}${infer h5}${infer h6}${infer h7}${infer h8}${infer Tail}`

  ? // put them back together (but backwards)
    `${ReverseString<Tail>}${h8}${h7}${h6}${h5}${h4}${h3}${h2}${h1}`
  
  : // we have less than 8 left
    T extends `${infer h0}${infer t0}`
    
    ? // it wasn't some multiple of 8 so to finish up let's go one at a time
      `${ReverseString<t0>}${h0}`
      
    : // we're done
      ''

// QUESTION: I have lookup tables for 0-255 (from both binary and decimal).
// Would it be better or faster to just check that object real quick first and return that value if it exists?

export type ToDecimalUnsigned<T extends string> =
  _ToDecimalUnsigned<ReverseString<T>>;

type _ToDecimalUnsigned<
  Binary extends string,

  _PowerOfTwo extends number = 0,
  _NextPowerOfTwo extends number = Add<_PowerOfTwo, 1>
> =
  Binary extends `${infer Head}${infer Tail}`

  ? Head extends '0'
    ? _ToDecimalUnsigned<
        Tail,
        _NextPowerOfTwo
      >

    : Head extends '1'
      ? Add<
          _ToDecimalUnsigned<
            Tail,
            _NextPowerOfTwo
          >,
          PowersOfTwo[_PowerOfTwo]
        >

      : never
  : 0

type TSNumberToTSBigint<
  T extends number
> = Satisfies<bigint,
  `${T}` extends `${infer X extends bigint}` ? X : never
>


export type ToDecimalUnsignedBigInt<
  T extends string
> = Satisfies<bigint,
  _ToDecimalUnsignedBigInt<ReverseString<T>>
>;

type _ToDecimalUnsignedBigInt<
  Binary extends string,

  _PowerOfTwo extends bigint = 0n,
  _NextPowerOfTwo extends bigint = AddBigInt<_PowerOfTwo,  1n>
> =
  Binary extends `${infer Head}${infer Tail}`

  ? Head extends '0'
    ? _ToDecimalUnsignedBigInt<
        Tail,
        _NextPowerOfTwo
      >

    : Head extends '1'
      ? AddBigInt<
          _ToDecimalUnsignedBigInt<
            Tail,
            _NextPowerOfTwo
          >,
          PowersOfTwoBigInt[TSBigIntToTSNumber<_PowerOfTwo>]
        >

      : never
  : 0n

// QUESTION
// maybe performance would be better if this were just `string`?
export type Bit = '0' | '1';

export type IsNegativeBinary<
  binary extends string
> = Satisfies<boolean,
  binary extends `${infer Head extends '1'}${string}`
    ? true
    : false
>

export type SignBit<
  binary extends string
> = Satisfies<Bit,
  binary extends `${infer Head extends Bit}${string}`
    ? Head
    : never
>

// type x = ToDecimalUnsigned<"00000000001100010111100011000110">
//   ^?

export type TwosComplementFlip<
  T extends string
> = AddBinary<BitwiseNotBinary<T>, "1">

type x1 = BitwiseNotBinary<"00000011"> // =>
type x2 = AddBinary<x1, "1">           // =>

type x = TwosComplementFlip<"00000011"> // =>

type x3 = AddBinary<x, "1"> // =>

type y = ToDecimalUnsigned<x> // =>

// this takes a positive TsNumber nad makes it negative
export type WithNegativeSign<
  T extends number
> = `-${T}` extends `${infer U extends number}` ? U : never

// this takes a positive TsNumber nad makes it negative
export type WithNegativeSignBigInt<
  T extends bigint
> = `-${T}` extends `${infer U extends bigint}` ? U : never

type TSBigIntToTSNumber<
  T extends bigint
> = Satisfies<number,
  `${T}` extends `${infer X extends number}` ? X : never
>

export type ToDecimalSigned<
  binary extends string
> = Satisfies<number,
  binary extends `${infer Head}${infer remainder}`
  ? Head extends '0'
    ? // positive number
      ToDecimalUnsigned<remainder>

    : // negative number
      WithNegativeSign<
        ToDecimalUnsigned<
          TwosComplementFlip<
            remainder
          >
        >
      >
  : never
>

export type ToDecimalSignedBigInt<
  binary extends string
> = Satisfies<bigint,
  binary extends `${infer Head}${infer remainder}`
  ? Head extends '0'
    ? // positive number
      ToDecimalUnsignedBigInt<remainder>

    : // negative number
      WithNegativeSignBigInt<
        ToDecimalUnsignedBigInt<
          TwosComplementFlip<
            remainder
          >
        >
      >
  : never
>



type i = '101110';
type a = ToDecimalSigned<i>  // =>
type b = ToDecimalUnsigned<i>// =>


export type DisregardMSB<
  binary extends string
> = Satisfies<string,
  binary extends `${infer Head}${infer Tail}`
  ? Tail
  : never
>
