import { IsNegativeBinary, TwosComplementFlip } from './binary';
import { LessThanUnsignedBinary } from './comparison';
import { SubtractBinaryFixed } from "./subtract";
import { Wasm } from "./wasm";

/*
  Yes, I need this reference. I'm not good at this stuff.  Truly.

  Dividend / Divisor = Quotient

           Quotient
          __________
  Divisor | Dividend

  Dividend
  --------  =  Quotient
  Divisor
*/

// lifted from https://youtu.be/l3fM0XslOS0?t=350

type B = 0 | 1;

type LeftShiftA<A extends string, Q extends string> =
  A extends `${B}${infer tailBits}`
  ? Q extends `${infer bit}${string}`
    ? `${tailBits}${bit}`
    : never
  : never;

type Next<LeftShiftedA extends string, Q extends string, M extends string> =
  LessThanUnsignedBinary<LeftShiftedA, M> extends Wasm.I32True
    ? [ // restore
      LeftShiftedA,
      Q extends `${B}${infer tailBits}` ? `${tailBits}0` : never,
    ]
    : [ // update
      SubtractBinaryFixed<LeftShiftedA, M>,
      Q extends `${B}${infer tailBits}` ? `${tailBits}1` : never,
    ];

/*
  Restoring Division Algorithm for Unsigned Binary Numbers:
  
  The restoring division algorithm divides a binary number (dividend) by another (divisor) and finds the quotient and remainder.

  Steps:
  1. Initialize the accumulator (A) to 0, which will hold the partial remainders.
  2. The divisor (M) remains constant.
  3. The dividend is placed in the quotient register (Q).
  4. Perform the following steps for the number of bits in the dividend:
     a. Concatenate A and Q and perform a left shift (LS), shifting A and bringing in the next bit from Q.
     b. Subtract the divisor M from A.
     c. If the subtraction result is not negative (which means A >= M):
        - Set the least significant bit of Q to 1 and keep the new A.
     d. If the subtraction result is negative:
        - Set the least significant bit of Q to 0 and restore A to its value before the subtraction.
  5. The process is repeated until all bits in Q have been processed.
  6. The final content of Q is the quotient and A is the remainder.

  Example: Division of 7 (111) by 3 (011):
  - A starts at 000 and Q starts at 111. The divisor M is 011.
  - Concatenate A and Q, left-shift, and subtract M from A.
  - If the result of the subtraction is not negative, write 1 to the LSB of Q; otherwise, write 0 and restore A.
  - Continue this process until all bits in Q are processed.
  - The final Q is the quotient and A is the remainder.
*/
export type _DivideBinaryArbitrary<
  Q extends string, // dividend
  M extends string, // divisor
  A extends string,
  DebugStop extends string = never,
  ShrinkingQ extends string = Q,
> =
    ShrinkingQ extends '' | DebugStop
    ? [DebugStop] extends [never]
      ? {
        quotient: Q
        remainder: A
      }
      : Next<LeftShiftA<A, Q>, Q, M> extends [infer NewA extends string, infer NewQ extends string]
        ? {
          quotient: Q
          remainder: A,
          M: M,
          A: A,
          Q: Q,
          _LeftShiftA: LeftShiftA<A, Q>,
          _LeftShiftAMinusM: SubtractBinaryFixed<LeftShiftA<A, Q>, M>,
          _newQ: NewQ,
          _newD: NewA
        }
        : never
    : Next<LeftShiftA<A, Q>, Q, M> extends [infer NewA extends string, infer NewQ extends string]
      ? _DivideBinaryArbitrary<
          NewQ,
          M,
          NewA,
          DebugStop,
          ShrinkingQ extends `${B}${infer tailBits}` ? tailBits : ''
        >
      : never;

type ToPositiveBinary<N> =
  N extends `1${string}` ? TwosComplementFlip<N> : N;

type ToNegativeBinary<N> =
  N extends `0${string}` ? TwosComplementFlip<N> : N;

type ToNegativeProperties<O extends object, P extends keyof O> =
  { [K in keyof O]: K extends P ? ToNegativeBinary<O[K]> : O[K] };

export type DivideUnsignedBinary32<
  dividend extends string,
  divisor extends string
> =
  [divisor] extends [Wasm.I32False] ? { quotient: Wasm.I32False, remainder: Wasm.I32False } : // if divide by zero return zero
  [dividend] extends [divisor] ? { quotient: Wasm.I32True, remainder: Wasm.I32False } : // if equal return 1
  [divisor] extends [Wasm.I32True] ? { quotient: dividend, remainder: Wasm.I32False } : // if divide by 1 return dividend

  _DivideBinaryArbitrary<
    dividend,
    divisor,
    Wasm.I32False
  >;

export type DivideSignedBinary32<
  dividend extends string,
  divisor extends string
> =
  IsNegativeBinary<dividend> extends true
  ? IsNegativeBinary<divisor> extends true
    ? ToNegativeProperties<
        DivideUnsignedBinary32<
          ToPositiveBinary<dividend>,
          ToPositiveBinary<divisor>
        >, 'remainder'
      >
    : ToNegativeProperties<
        DivideUnsignedBinary32<
          ToPositiveBinary<dividend>,
          divisor
        >, 'quotient' | 'remainder'
      >
  : IsNegativeBinary<divisor> extends true
    ? ToNegativeProperties<
        DivideUnsignedBinary32<
          dividend,
          ToPositiveBinary<divisor>
        >, 'quotient'
      >
    : DivideUnsignedBinary32<
        dividend,
        divisor
      >;


export type DivideUnsignedBinary64<
  dividend extends string,
  divisor extends string
> =
  [divisor] extends [Wasm.I64False] ? { quotient: Wasm.I64False, remainder: Wasm.I64False } : // if divide by zero return zero
  [dividend] extends [divisor] ? { quotient: Wasm.I64True, remainder: Wasm.I64False } : // if equal return 1
  [divisor] extends [Wasm.I64True] ? { quotient: dividend, remainder: Wasm.I64False } : // if divide by 1 return dividend

  _DivideBinaryArbitrary<
    dividend,
    divisor,
    Wasm.I64False
  >;

export type DivideSignedBinary64<
  dividend extends string,
  divisor extends string
> =
  IsNegativeBinary<dividend> extends true
  ? IsNegativeBinary<divisor> extends true
    ? ToNegativeProperties<
        DivideUnsignedBinary64<
          ToPositiveBinary<dividend>,
          ToPositiveBinary<divisor>
        >, 'remainder'
      >
    : ToNegativeProperties<
        DivideUnsignedBinary64<
          ToPositiveBinary<dividend>,
          divisor
        >, 'quotient' | 'remainder'
      >
  : IsNegativeBinary<divisor> extends true
    ? ToNegativeProperties<
        DivideUnsignedBinary64<
          dividend,
          ToPositiveBinary<divisor>
        >, 'quotient'
      >
    : DivideUnsignedBinary64<
        dividend,
        divisor
      >;
