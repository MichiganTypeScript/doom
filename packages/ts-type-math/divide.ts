import { SubtractBinaryFixed } from "./subtract";
import { AddBinaryFixed } from "./add";
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

type ShiftLeftOnceBinaryArbitraryFill1<
  slobaf1 extends string
> =
  slobaf1 extends `${string}${infer tail}`
  ? `${tail}1`
  : 'you dun goofed1'

type ShiftLeftOnceBinaryArbitraryFill0<
  slobaf0 extends string
> =
  slobaf0 extends `${string}${infer tail}`
  ? `${tail}0`
  : 'you dun goofed0'


export type _DivideBinaryArbitrary<
  Q extends string, // = dividend
  M extends string, // = divisor
  A extends string,
  StopAt extends number,

  Count extends 1[] = [],

  _AShift extends string =
    `${
      A extends `${string}${infer tail}` ? tail : never
    }${
      // effectively shifting Q once into A
      Q extends `${infer bit}${string}` ? bit : never
    }`,

  _AShiftMinusM extends string =
    SubtractBinaryFixed<
      _AShift,
      M
    >,

  _newA extends string =
    _AShiftMinusM extends `1${string}`
    ? // A-M is negative, so restore
      _AShift

    : // A-M is positive, so update
      _AShiftMinusM,


  _newQ extends string =
    _AShiftMinusM extends `1${string}`
    ? ShiftLeftOnceBinaryArbitraryFill0<Q>
    : ShiftLeftOnceBinaryArbitraryFill1<Q>,

> =
  `${Count['length']}` extends `${StopAt}`
    ? {
        quotient: _newQ
        remainder:
          _newA extends `1${string}`
          ? _AShift // restore the accumulator because it's negative otherwise
          : _newA
      }

    : _DivideBinaryArbitrary<
        _newQ,
        M,
      _newA,
        StopAt,
        [1, ...Count]
      >

export type DivideUnsignedBinary32<
  dividend extends string,
  divisor extends string
> =
  divisor extends Wasm.I32False ? Wasm.I32False : // if divide by zero return zero
  dividend extends divisor ? Wasm.I32True : // if equal return 1
  divisor extends Wasm.I32True ? dividend : // if divide by 1 return dividend

  _DivideBinaryArbitrary<
    dividend,
    divisor,
    Wasm.I32False,
    31
  >['quotient']