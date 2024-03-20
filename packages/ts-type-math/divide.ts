import { IsNegativeBinary } from './binary';
import { LessThanUnsignedBinary } from './comparison';
import { SubtractBinaryFixed } from "./subtract";
import { Wasm } from "./wasm";

/*
  Yes, I need this reference. I'm not good at this stuff.  Truly.

  Dividend(D) / Divisor(V) = Quotient(Q)

           Quotient(q)
          __________
  Divisor(V) | Dividend(D)

  Dividend(D)
  --------  =  Quotient(Q)
  Divisor(V)
*/

// lifted from https://youtu.be/l3fM0XslOS0?t=350

type B = 0 | 1;
type QShift<Q extends string, D extends string> =
  Q extends `${B}${infer tailBits}`
  ? D extends `${infer bit}${string}` ? `${tailBits}${bit}` : never
  : never;

type NewQ<Q extends string, D extends string, V extends string> =
  [LessThanUnsignedBinary<QShift<Q, D>, V>] extends [Wasm.I32True]
  ? // A-M is negative, so restore
    QShift<Q, D>

  : // A-M is positive, so update
    SubtractBinaryFixed<QShift<Q, D>, V>;

type NewD<Q extends string, D extends string, V extends string> =
  D extends `${B}${infer tailBits}` // remove first digit to prep for shift left
  ? [LessThanUnsignedBinary<QShift<Q, D>, V>] extends [Wasm.I32True]
    ? `${tailBits}0`
    : `${tailBits}1` // replace shifted digit depending on A-M
  : never

/*
  Restoring Division Algorithm for Unsigned Binary Numbers:
  
  The restoring division works by repeatedly subtracting the divisor from a portion of the dividend
  and shifting the partial results until all bits have been processed.

  Steps:
  1. Set the quotient (Q) to 0. The dividend (D) acts as the initial remainder.
  2. For each bit (from left to right) in the dividend:
     a. Shift the current remainder left by one bit.
     b. Subtract the divisor from the shifted remainder.
     c. If the result is positive:
        - Set the current bit of the quotient to 1.
        - The result is the new current remainder.
     d. If the result is negative:
        - Set the current bit of the quotient to 0.
        - Restore the remainder to the value before subtraction.
  3. Repeat until all bits are processed. The final quotient (Q) is the result of the division, 
     and the final remainder is the remainder of the division.

  Example: Division of 7 (111) by 3 (011):
  - Initial quotient (Q) is 0, and the remainder is 7 (111).
  - Subtract 3 (011) from 7 (111), the result is positive, so the first bit of Q is set to 1.
  - Continue with the new remainder, shift, subtract, and set bits of Q as described.
  - Final Q (quotient) will reflect the result of the division, with the remainder being what's left.
*/
export type _DivideBinaryArbitrary<
  D extends string, // dividend | current remainder
  V extends string, // divisor
  Q extends string, // quotient
  DebugStop extends string = never,
  ShrinkingD extends string = D,
> =
    ShrinkingD extends '' | DebugStop
    ? [DebugStop] extends [never]
      ? {
        quotient: D
        remainder: Q
      }
      : {
        quotient: D
        remainder: Q,
        V: V,
        Q: Q,
        D: D,
        _QShift: QShift<Q, D>,
        _QShiftMinusV: SubtractBinaryFixed<QShift<Q, D>, V>,
        _newQ: NewQ<Q, D, V>,
        _newD: NewD<Q, D, V>
      }
    : [LessThanUnsignedBinary<D, V>] extends [Wasm.I32True]
      ? {
        quotient: Q,
        remainder: D,
      }
      : _DivideBinaryArbitrary<
          NewD<Q, D, V>,
          V,
          NewQ<Q, D, V>,
          DebugStop,
          ShrinkingD extends `${B}${infer tailBits}` ? tailBits : ''
        >;

  type ToPositiveBinary<N> =
    N extends `1${infer tailBits}` ? `0${tailBits}` : N;

  type ToNegativeBinary<N> =
    N extends `0${infer tailBits}` ? `1${tailBits}` : N;
  
  type ToNegativeQuotient<O extends object> =
    { [K in keyof O]: K extends 'quotient' ? ToNegativeBinary<O[K]> : O[K] };
  
  type ToNegativeRemainder<O extends object> =
    { [K in keyof O]: K extends 'remainder' ? ToNegativeBinary<O[K]> : O[K] };
  
  type ToNegativeQuotientAndRemainder<O extends object> =
    { [K in keyof O]: K extends 'quotient' | 'remainder' ? ToNegativeBinary<O[K]> : O[K] };

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
    ? ToNegativeRemainder<
        DivideUnsignedBinary32<
          ToPositiveBinary<dividend>,
          ToPositiveBinary<divisor>
        >
      >
    : ToNegativeQuotientAndRemainder<
        DivideUnsignedBinary32<
          ToPositiveBinary<dividend>,
          divisor
        >
      >
  : IsNegativeBinary<divisor> extends true
    ? ToNegativeQuotient<
        DivideUnsignedBinary32<
          dividend,
          ToPositiveBinary<divisor>
        >
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
    ? ToNegativeRemainder<
        DivideUnsignedBinary64<
          ToPositiveBinary<dividend>,
          ToPositiveBinary<divisor>
        >
      >
    : ToNegativeQuotientAndRemainder<
        DivideUnsignedBinary64<
          ToPositiveBinary<dividend>,
          divisor
        >
      >
  : IsNegativeBinary<divisor> extends true
    ? ToNegativeQuotient<
        DivideUnsignedBinary64<
          dividend,
          ToPositiveBinary<divisor>
        >
      >
    : DivideUnsignedBinary64<
        dividend,
        divisor
      >;
