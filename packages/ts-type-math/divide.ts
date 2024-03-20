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

type AShift<A extends string, Q extends string> =
  A extends `${string}${infer tail}`
  ? Q extends `${infer bit}${string}` ? `${tail}${bit}` : never
  : never;

type NewA<A extends string, Q extends string, M extends string> =
  [LessThanUnsignedBinary<AShift<A, Q>, M>] extends [Wasm.I32True]
  ? // A-M is negative, so restore
    AShift<A, Q>

  : // A-M is positive, so update
    SubtractBinaryFixed<AShift<A, Q>, M>;

type NewQ<A extends string, Q extends string, M extends string> =
  Q extends `${string}${infer tail}` // remove first digit to prep for shift left
  ? [LessThanUnsignedBinary<AShift<A, Q>, M>] extends [Wasm.I32True]
    ? `${tail}0`
    : `${tail}1` // replace shifted digit depending on A-M
  : never

export type _DivideBinaryArbitrary<
  Q extends string, // = dividend
  M extends string, // = divisor
  A extends string,
  StopAt extends number,
  debugMode extends boolean = false,

  Count extends 1[] = [],
> =
  Count['length'] extends StopAt
    ? debugMode extends false
      ? {
          quotient: NewQ<A, Q, M>
          remainder:
            NewA<A, Q, M> extends `1${string}`
            ? AShift<A, Q> // restore the accumulator because it's negative otherwise
            : NewA<A, Q, M>
        }
      : {
          M: M,
          A: A,
          Q: Q,
          _AShift: AShift<A, Q>,
          _AShiftMinusM: SubtractBinaryFixed<AShift<A, Q>, M>,
          _newA: NewA<A, Q, M>,
          _newQ: NewQ<A, Q, M>,
        }

    : [LessThanUnsignedBinary<Q, M>] extends [Wasm.I32True]
      ? {
        quotient: Wasm.I32False,
        reminder: Q,
          
      }
      :_DivideBinaryArbitrary<
          NewQ<A, Q, M>,
          M,
          NewA<A, Q, M>,
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
