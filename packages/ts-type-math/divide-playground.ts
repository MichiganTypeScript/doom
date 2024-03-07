// import { SubtractBinary } from "./subtract";
// import { Clamp } from './split'
// import { AddBinary } from "./add";
// import { Equal, Expect } from "type-testing";
// import { Wasm } from './wasm'
// import { DivideBinaryArbitrary } from "./divide";

// type dividend = '00001111101111001100111010110010'
// type divisor  = '00000000000001001100110010011110'

// type x0 = DivideBinaryArbitrary<dividend, divisor, 0, Wasm.I32False>
// //   ^?
// type x1 = DivideBinaryArbitrary<dividend, divisor, 1, Wasm.I32False>
// //   ^?
// type x2 = DivideBinaryArbitrary<dividend, divisor, 2, Wasm.I32False>
// //   ^?
// type x3 = DivideBinaryArbitrary<dividend, divisor, 3, Wasm.I32False>
// //   ^?
// type x31 = DivideBinaryArbitrary<dividend, divisor, 31, Wasm.I32False>
// //   ^?

// type xt = [
//   // Expect<Equal<x2['quotient'],  '00000000000000000000000000000010'>>,
//   // Expect<Equal<x2['remainder'], Wasm.I32False>>,
//   // Expect<Equal<x2['remainder'], 'bad'>>,
// ]

// type s = SubtractBinary<Wasm.I32False, Wasm.I32True> // =>
// type c = Clamp.Last32Bits<s> // =>
// type a =      AddBinary<'00101', '00011'> // =>


// type fallback = '00000000000000000000000000000000';

// type inputs = [
//   {
//     dividend: '00000000000000000000000000000111';
//     divisor:  '00000000000000000000000000000011';

//     quotient: '00000000000000000000000000000010';
//     remainder:'00000000000000000000000000000001';
//   }
// ]

// // type z = DivideBinaryArbitrary<
// //   inputs[0]['dividend'],
// //   inputs[0]['divisor'],
// //   31,
// //   fallback
// // >

// // type x = [
// //   Expect<Equal<z['quotient'],  inputs[0]['quotient']>>,
// //   Expect<Equal<z['remainder'], inputs[0]['remainder']>>,
// // ]

// // export type DivideBinary32<
// //   dividend extends string,
// //   divisor extends string,
// //   a extends number,
// //   b extends string
// // > = DivideBinaryArbitrary<
// //   dividend,
// //   divisor,
// //   31,
// //   fallback
// // >

// // type d = DivideBinary32<inputs[0]['dividend'], inputs[0]['divisor'], 31, fallback>
// // //   ^?


// // type xd = [
// //   Expect<Equal<d['quotient'],  inputs[0]['quotient']>>,
// //   Expect<Equal<d['remainder'], inputs[0]['remainder']>>,
// // ]
