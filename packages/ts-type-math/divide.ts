import { ReverseString, SignBit } from "./binary";
import { SubtractBinary } from "./subtract";
import { WasmValue, Wasm } from "./wasm";
import { Clamp } from './split'

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

// what follows is an attempt to implement the restoring division algorithm via https://www.youtube.com/watch?v=Q8GPrxlbQy4

type Combine<a extends string, b extends string> = `${a}${b}`;

type zeroes = '00000000000000000000000000000000'

type ShiftLeftOnceBinaryArbitrary<
  a extends string,

  /** should be '0' or '1' */
  fillWith extends string,
> =
  a extends `${infer lolGtfohYouSillyBit}${infer tail}` // get it? silly bit........ch? it's 2am. gimmie a break.
  ? `${tail}${fillWith}`
  : never

// type ShiftRightOnceBinaryArbitrary<
//   a extends string,

//   /** should be '0' or '1' */
//   fillWith extends string,
// > = ReverseString<
//   ShiftLeftOnceBinaryArbitrary<
//     ReverseString<a>,
//     fillWith
//   >
// >


type ShiftRightOnceBinaryArbitrary<
  a extends string,
  fillWith extends '0' | '1',
> = ReverseString<
  Clamp.First32Bits<`${fillWith}${a}`>
>


type StopAt = 1 // maybe this needs to be 32?
type divisor ="00000000000000000000000000000011"
type dividend="00000000000000000000000000011010"
type x = _DivideBinary32<dividend, divisor>  // =>
type d = DivideBinary32<dividend, divisor>   // =>
type r = RemainderBinary32<dividend, divisor>// =>

type _DivideBinary32<
  dividend extends WasmValue, // dividend
  divisor extends WasmValue,  // divisor

  /** dividend remainder */
  dr extends WasmValue = Combine<Wasm.I32False, dividend>,

  /** divisor */
  v extends WasmValue = Combine<divisor, Wasm.I32False>,

  /** quotient */
  q extends WasmValue = Wasm.I32False,

  _counter extends 1[] = [],

  _shiftedV extends WasmValue = ShiftRightOnceBinaryArbitrary<v, '0'>,
  _subtracted extends WasmValue = Clamp.Last32Bits<SubtractBinary<dr, _shiftedV>>,
> = Satisfies<{ quotient: string; remainder: string },

  _counter['length'] extends StopAt
  ? // game over
    // { dr: dr, v: v, q: q, _counter: _counter, _shiftedV: _shiftedV, _subtracted: _subtracted, _subractionIsNegative: _subractionIsNegative }
    { quotient: q; remainder: dr }

  : // recurse
    SignBit<_subtracted> extends '1'
    ?
      _DivideBinary32<
        dividend,
        divisor,
        dr,
        _shiftedV,
        ShiftLeftOnceBinaryArbitrary<q, '0'>,
        [1, ..._counter]
      >

    : 
      _DivideBinary32<
        dividend,
        divisor,
        ShiftRightOnceBinaryArbitrary<dr, '0'>,
        _shiftedV,
        ShiftLeftOnceBinaryArbitrary<q, '1'>,
        [1, ..._counter]
      >
>

export type DivideBinary32<
  dividend extends WasmValue,
  divisor extends WasmValue
> =
  divisor extends Wasm.I32False ? Wasm.I32False :
  _DivideBinary32<dividend, divisor>['quotient']

export type RemainderBinary32<
  dividend extends WasmValue,
  divisor extends WasmValue
> =
  divisor extends Wasm.I32False ? Wasm.I32False :
  Clamp.Last32Bits<_DivideBinary32<dividend, divisor>['remainder']>
