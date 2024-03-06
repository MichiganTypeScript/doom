import { SubtractBinary } from "./subtract";
import { Clamp } from './split'
import { AddBinary } from "./add";

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

// lifted from https://youtu.be/l3fM0XslOS0?si=V-7lzZJMAI7k5_X8&t=350

type ShiftLeftOnceBinaryArbitrary<
  a extends string,

  /** should be '0' or '1' */
  fillWith extends string,
> =
  a extends `${string}${infer tail}`
  ? `${tail}${fillWith}`
  : 'you dun goofed'

type GetMSB<
  a extends string
> =
  a extends `${infer MSB}${infer _}`
  ? MSB
  : 'dafuq you thinkin'

export type DivideBinaryArbitrary<
  Q extends string, // = dividend
  M extends string, // = divisor
  StopAt extends number,
  finalize extends string,

  A extends string = finalize,

  Count extends 1[] = [],

  _AShift extends string =
    ShiftLeftOnceBinaryArbitrary<
      A,
      GetMSB<Q> // effectively shifting Q once into A
    >,

  _newA extends string =
    Clamp.Last32Bits<
      GetMSB<A> extends '0'
        ? SubtractBinary<_AShift, M>
        :      AddBinary<_AShift, M>
    >,

  _newQ extends string =
    ShiftLeftOnceBinaryArbitrary<
      Q,
      GetMSB<_newA> extends '1'
        ? '0'
        : '1'
    >
> =
  Count['length'] extends StopAt
  ? // finalize
    {
      // // useful for debugging:
      M: M,
      A: A,
      Q: Q,
      _AShift: _AShift,
      _newA: _newA,
      _newQ: _newQ,

      quotient: _newQ,
      remainder:
        GetMSB<_newA> extends '1'
        ? _AShift // restore the accumulator because it's negative otherwise
        : _newA,
    }

  : DivideBinaryArbitrary<
      _newQ,
      M,
      StopAt,
      finalize,
      _newA,
      [1, ...Count]
    >





// import { ReverseString8Segments, SignBit } from "./binary";
// import { SubtractBinary } from "./subtract";
// import { WasmValue, Wasm } from "./wasm";
// import { Clamp } from './split'

// /*
//   Yes, I need this reference. I'm not good at this stuff.  Truly.

//   Dividend / Divisor = Quotient

//            Quotient
//           __________
//   Divisor | Dividend

//   Dividend
//   --------  =  Quotient
//   Divisor
// */

// // what follows is an attempt to implement the restoring division algorithm via https://www.youtube.com/watch?v=Q8GPrxlbQy4

// type Combine<a extends string, b extends string> = `${a}${b}`;

// type zeroes = '00000000000000000000000000000000'

// type ShiftLeftOnceBinaryArbitrary<
//   a extends string,

//   /** should be '0' or '1' */
//   fillWith extends string,
// > =
//   a extends `${infer lolGtfohYouSillyBit}${infer tail}` // get it? silly bit........ch? it's 2am. gimmie a break.
//   ? `${tail}${fillWith}`
//   : never


// type ShiftRightOnceBinaryArbitrary<
//   a extends string,
//   fillWith extends '0' | '1',
// > = ReverseString8Segments<
//   Clamp.First32Bits<`${fillWith}${a}`>
// >

// type StopAt = 32 // maybe this needs to be 32?
// type divisor ="00000000000000000000000000000011"
// type dividend="00000000000000000000000000011010"
// // export type e = _DivideBinary32<dividend, divisor>  // =>
// // type d = DivideBinary32<dividend, divisor>   // =>
// // type r = RemainderBinary32<dividend, divisor>// =>

// type _DivideBinary32<
//   dividend extends WasmValue, // dividend
//   divisor extends WasmValue,  // divisor

//   /** dividend remainder */
//   dr extends WasmValue = Combine<Wasm.I32False, dividend>,

//   /** divisor */
//   v extends WasmValue = Combine<divisor, Wasm.I32False>,

//   /** quotient */
//   q extends WasmValue = Wasm.I32False,

//   _counter extends 1[] = [],

//   _shiftedV extends WasmValue = ShiftRightOnceBinaryArbitrary<v, '0'>,
//   _subtracted extends WasmValue = Ensure.I32<SubtractBinary<dr, _shiftedV>>,
// > = Satisfies<{ quotient: string; remainder: string },

//   _counter['length'] extends StopAt
//   ? // game over
//     // { dr: dr, v: v, q: q, _counter: _counter, _shiftedV: _shiftedV, _subtracted: _subtracted, _subractionIsNegative: _subractionIsNegative }
//     { quotient: q; remainder: dr }

//   : // recurse
//     SignBit<_subtracted> extends '1'
//     ?
//       _DivideBinary32<
//         dividend,
//         divisor,
//         dr,
//         _shiftedV,
//         ShiftLeftOnceBinaryArbitrary<q, '0'>,
//         [1, ..._counter]
//       >

//     : 
//       _DivideBinary32<
//         dividend,
//         divisor,
//         ShiftRightOnceBinaryArbitrary<dr, '0'>,
//         _shiftedV,
//         ShiftLeftOnceBinaryArbitrary<q, '1'>,
//         [1, ..._counter]
//       >
// >

// export type DivideBinary32<
//   dividend extends WasmValue,
//   divisor extends WasmValue
// > =
//   divisor extends Wasm.I32False ? Wasm.I32False :
//   _DivideBinary32<dividend, divisor>['quotient']

// export type RemainderBinary32<
//   dividend extends WasmValue,
//   divisor extends WasmValue
// > =
//   divisor extends Wasm.I32False ? Wasm.I32False :
//  Ensure.I32<_DivideBinary32<dividend, divisor>['remainder']>