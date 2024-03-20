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

type QShift<Q extends string, D extends string> =
  Q extends `${0 | 1}${infer tailBits}`
  ? D extends `${infer bit}${string}` ? `${tailBits}${bit}` : never
  : never;

type NewQ<Q extends string, D extends string, V extends string> =
  [LessThanUnsignedBinary<QShift<Q, D>, V>] extends [Wasm.I32True]
  ? // A-M is negative, so restore
    QShift<Q, D>

  : // A-M is positive, so update
    SubtractBinaryFixed<QShift<Q, D>, V>;

type NewD<Q extends string, D extends string, V extends string> =
  D extends `${string}${infer tail}` // remove first digit to prep for shift left
  ? [LessThanUnsignedBinary<QShift<Q, D>, V>] extends [Wasm.I32True]
    ? `${tail}0`
    : `${tail}1` // replace shifted digit depending on A-M
  : never

/*
  Divide using Restoring Division Algorithm:
  
  The restoring division algorithm is a method to divide two unsigned binary numbers.

  It involves the following steps:
  1. Initialize the quotient (Q) to 0 and the remainder (R) to the dividend (D).
  2. Align the most significant bit (MSB) of the divisor (V) with the MSB of the dividend.
  3. Perform n iterations (where n is the number of bits in D):
     a. Shift Q and the MSB of R left by one bit.
     b. Subtract V from the left-shifted R (this becomes the new R).
     c. If the subtraction is positive or zero, write a 1 to the least significant bit (LSB) of Q.
     d. If the subtraction is negative, restore R to the value before the subtraction and write a 0 to the LSB of Q.
  4. The final value in Q is the quotient, and the final value in R is the remainder.

  Note: This method is for unsigned binary integers. For signed integers, additional steps are required to handle sign bits.

  Example (binary division of 7 by 3):
  Dividend (D) = 111 (7 in decimal), Divisor (V) = 011 (3 in decimal)
  Q = 000, R = 111
  Iteration 1: Q = 000, R = 100 (after subtraction and shift)
  Iteration 2: Q = 010, R = 001 (after subtraction and shift, and since R is positive, Q LSB becomes 1)
  Final: Q = 010 (2 in decimal), R = 001 (1 in decimal)
*/
export type _DivideBinaryArbitrary<
  D extends string, // = dividend
  V extends string, // = divisor
  Q extends string,
  StopAt extends number,
  debugMode extends boolean = false,

  Count extends 1[] = [],
> =
  Count['length'] extends StopAt
    ? debugMode extends false
      ? {
          quotient: NewD<Q, D, V>
          remainder:
            NewQ<Q, D, V> extends `1${string}`
            ? QShift<Q, D> // restore the accumulator because it's negative otherwise
            : NewQ<Q, D, V>
        }
      : {
          V: V,
          Q: Q,
          D: D,
          _QShift: QShift<Q, D>,
          _QShiftMinusM: SubtractBinaryFixed<QShift<Q, D>, V>,
          _newQ: NewQ<Q, D, V>,
          _newD: NewD<Q, D, V>,
          quotient: NewD<Q, D, V>
          remainder:
            NewQ<Q, D, V> extends `1${string}`
            ? QShift<Q, D> // restore the accumulator because it's negative otherwise
            : NewQ<Q, D, V>
        }

    : [LessThanUnsignedBinary<D, V>] extends [Wasm.I32True]
      ? {
        quotient: Wasm.I32False,
        reminder: D,
          
      }
      :_DivideBinaryArbitrary<
          NewD<Q, D, V>,
          V,
          NewQ<Q, D, V>,
          StopAt,
          debugMode,
          [1, ...Count]
        >

export type DivideUnsignedBinary32<
  dividend extends string,
  divisor extends string
> =
  [divisor] extends [Wasm.I32False] ? Wasm.I32False : // if divide by zero return zero
  [dividend] extends [divisor] ? Wasm.I32True : // if equal return 1
  [divisor] extends [Wasm.I32True] ? dividend : // if divide by 1 return dividend

  _DivideBinaryArbitrary<
    dividend,
    divisor,
    Wasm.I32False,
    31
  >['quotient']
