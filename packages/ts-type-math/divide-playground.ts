import { Expect, Extends } from "type-testing"
import { _DivideBinaryArbitrary } from "./divide"


// 4 digits
// 16 union members
type divisor_4 =   '0011' // M
type fallback_4 =  '0000' // A
type dividend_4 =  '0111' // Q
type quotient_4 =  '0010' // result
type remainder_4 = '0001' // result
type stopAt_4 = 3

type DivideBinary_4<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_4, stopAt_4>





type x_4 = DivideBinary_4<dividend_4, divisor_4>
//   ^?
type tx_4 = Expect<Extends<x_4, { quotient: quotient_4, remainder: remainder_4 }>>

type s0_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, 0, true>
//   ^?
type t0_4 = Expect<Extends<s0_4, { A: fallback_4, Q: dividend_4 }>>

type s1_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, 1, true>
//   ^?
type t1_4 = Expect<Extends<s1_4, { A: '0000', Q: '1110' }>>

type s2_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, 2, true>
//   ^?
type t2_4 = Expect<Extends<s2_4, { A: '0001', Q: '1100' }>>

type s3_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, 3, true>
//   ^?
type t3_4 = Expect<Extends<s3_4, { A: '0000', Q: '1001' }>>

type s_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, 4, true>
//   ^?
type t_4 = Expect<Extends<s_4, { A: remainder_4, Q: quotient_4 }>>


// 5 digits
// 32 union members
type divisor_5 =   '00011' // M
type fallback_5 =  '00000' // A
type dividend_5 =  '00111' // Q
type quotient_5 =  '00010' // result
type remainder_5 = '00001' // result
type stopAt_5 = 4

type DivideBinary_5<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_5, stopAt_5>

type x_5 = DivideBinary_5<dividend_5, divisor_5>
//   ^?
type tx_5 = Expect<Extends<x_5, { quotient: quotient_5, remainder: remainder_5 }>>

type s0_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 0, true>
//   ^?
type t0_5 = Expect<Extends<s0_5, { A: fallback_5, Q: dividend_5 }>>

type s1_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 1, true>
//   ^?
type t1_5 = Expect<Extends<s1_5, { A: '00000', Q: '01110' }>>

type s2_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 2, true>
//   ^?
type t2_5 = Expect<Extends<s2_5, { A: '00000', Q: '11100' }>>

type s3_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 3, true>
//   ^?
type t3_5 = Expect<Extends<s3_5, { A: '00001', Q: '11000' }>>

type s4_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 4, true>
//   ^?
type t4_5 = Expect<Extends<s4_5, { A: '00000', Q: '10001' }>>

type s_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, 5, true>
//   ^?
type t_5 = Expect<Extends<s_5, { A: remainder_5, Q: quotient_5 }>>



// 6 digits
// 64 union members
type divisor_6 =   '000011' // M
type fallback_6 =  '000000' // A
type dividend_6 =  '000111' // Q
type quotient_6 =  '000010' // result
type remainder_6 = '000001' // result
type stopAt_6 = 5

type DivideBinary_6<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_6, stopAt_6>

type x_6 = DivideBinary_6<dividend_6, divisor_6>
//   ^?
type tx_6 = Expect<Extends<x_6, { quotient: quotient_6, remainder: remainder_6 }>>

type s0_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 0, true>
//   ^?
type t0_6 = Expect<Extends<s0_6, { A: fallback_6, Q: dividend_6 }>>

type s1_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 1, true>
//   ^?
type t1_6 = Expect<Extends<s1_6, { A: '000000', Q: '001110' }>>

type s2_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 2, true>
//   ^?
type t2_6 = Expect<Extends<s2_6, { A: '000000', Q: '011100' }>>

type s3_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 3, true>
//   ^?
type t3_6 = Expect<Extends<s3_6, { A: '000000', Q: '111000' }>>

type s4_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 4, true>
//   ^?
type t4_6 = Expect<Extends<s4_6, { A: '000001', Q: '110000' }>>

type s5_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 5, true>
//   ^?
type t5_6 = Expect<Extends<s5_6, { A: '000000', Q: '100001' }>>

type s_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, 6, true>
//   ^?
type t_6 = Expect<Extends<s_6, { A: remainder_6, Q: quotient_6 }>>




// 7 digits
// 128 union members
type divisor_7 =   '0000011' // M
type fallback_7 =  '0000000' // A
type dividend_7 =  '0000111' // Q
type quotient_7 =  '0000010' // result
type remainder_7 = '0000001' // result
type stopAt_7 = 6

type DivideBinary_7<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_7, stopAt_7>

type x_7 = DivideBinary_7<dividend_7, divisor_7>
//   ^?
type tx_7 = Expect<Extends<x_7, { quotient: quotient_7, remainder: remainder_7 }>>

type s0_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 0, true>
//   ^?
type t0_7 = Expect<Extends<s0_7, { A: fallback_7, Q: dividend_7 }>>

type s1_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 1, true>
//   ^?
type t1_7 = Expect<Extends<s1_7, { A: '0000000', Q: '0001110' }>>

type s2_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 2, true>
//   ^?
type t2_7 = Expect<Extends<s2_7, { A: '0000000', Q: '0011100' }>>

type s3_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 3, true>
//   ^?
type t3_7 = Expect<Extends<s3_7, { A: '0000000', Q: '0111000' }>>

type s4_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 4, true>
//   ^?
type t4_7 = Expect<Extends<s4_7, { A: '0000000', Q: '1110000' }>>

type s5_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 5, true>
//   ^?
type t5_7 = Expect<Extends<s5_7, { A: '0000001', Q: '1100000' }>>

type s6_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 6, true>
//   ^?
type t6_7 = Expect<Extends<s6_7, { A: '0000000', Q: '1000001' }>>

type s_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, 7, true>
//   ^?
type t_7 = Expect<Extends<s_7, { A: remainder_7, Q: quotient_7 }>>


// 8 digits
// 256 union members
type divisor_8 =   '00000011' // M
type fallback_8 =  '00000000' // A
type dividend_8 =  '00000111' // Q
type quotient_8 =  '00000010' // result
type remainder_8 = '00000001' // result
type stopAt_8 = 7

type DivideBinary_8<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_8, stopAt_8>

type x_8 = DivideBinary_8<dividend_8, divisor_8>
//   ^?
type tx_8 = Expect<Extends<x_8, { quotient: quotient_8, remainder: remainder_8 }>>

type s0_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 0, true>
//   ^?
type t0_8 = Expect<Extends<s0_8, { A: fallback_8, Q: dividend_8 }>>

type s1_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 1, true>
//   ^?
type t1_8 = Expect<Extends<s1_8, { A: '00000000', Q: '00001110' }>>

type s2_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 2, true>
//   ^?
type t2_8 = Expect<Extends<s2_8, { A: '00000000', Q: '00011100' }>>

type s3_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 3, true>
//   ^?
type t3_8 = Expect<Extends<s3_8, { A: '00000000', Q: '00111000' }>>

type s4_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 4, true>
//   ^?
type t4_8 = Expect<Extends<s4_8, { A: '00000000', Q: '01110000' }>>

type s5_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 5, true>
//   ^?
type t5_8 = Expect<Extends<s5_8, { A: '00000000', Q: '11100000' }>>

type s6_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 6, true>
//   ^?
type t6_8 = Expect<Extends<s6_8, { A: '00000001', Q: '11000000' }>>

type s7_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 7, true>
//   ^?
type t7_8 = Expect<Extends<s7_8, { A: '00000000', Q: '10000001' }>>

type s_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, 8, true>
//   ^?
type t_8 = Expect<Extends<s_8, { A: remainder_8, Q: quotient_8 }>>

// // 9 digits
// // 512 union members

// type divisor_9 =   '000000011' // M
// type fallback_9 =  '000000000' // A
// type dividend_9 =  '000000111' // Q
// type quotient_9 =  '000000010' // result
// type remainder_9 = '000000001' // result
// type stopAt_9 = 8

// type DivideBinary_9<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_9, stopAt_9>

// type x_9 = DivideBinary_9<dividend_9, divisor_9>
// //   ^?
// type tx_9 = Expect<Extends<x_9, { quotient: quotient_9, remainder: remainder_9 }>>


// // 10 digits
// // 1024 union members

// type divisor_10 =   '0000000011' // M
// type fallback_10 =  '0000000000' // A
// type dividend_10 =  '0000000111' // Q
// type quotient_10 =  '0000000010' // result
// type remainder_10 = '0000000001' // result
// type stopAt_10 = 9

// type DivideBinary_10<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_10, stopAt_10>







// type x_10 = DivideBinary_10<dividend_10, divisor_10>
// //   ^?
// type tx_10 = Expect<Extends<x_10, { quotient: quotient_10, remainder: remainder_10 }>>


// // 11 digits
// // 2048 union members

// type divisor_11 =   '00000000011' // M
// type fallback_11 =  '00000000000' // A
// type dividend_11 =  '00000000111' // Q
// type quotient_11 =  '00000000010' // result
// type remainder_11 = '00000000001' // result
// type stopAt_11 = 10

// type DivideBinary_11<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_11, stopAt_11>

// type x_11 = DivideBinary_11<dividend_11, divisor_11>
// //   ^?
// type tx_11 = Expect<Extends<x_11, { quotient: quotient_11, remainder: remainder_11 }>>


// // 12 digits
// // 4096 union members

// type divisor_12 =   '000000000011' // M
// type fallback_12 =  '000000000000' // A
// type dividend_12 =  '000000000111' // Q
// type quotient_12 =  '000000000010' // result
// type remainder_12 = '000000000001' // result
// type stopAt_12 = 11

// type DivideBinary_12<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_12, stopAt_12>

// type x_12 = DivideBinary_12<dividend_12, divisor_12>
// //   ^?
// type tx_12 = Expect<Extends<x_12, { quotient: quotient_12, remainder: remainder_12 }>>


// // 13 digits
// // 8192 union members
// type divisor_13 =   '0000000000011' // M
// type fallback_13 =  '0000000000000' // A
// type dividend_13 =  '0000000000111' // Q
// type quotient_13 =  '0000000000010' // result
// type remainder_13 = '0000000000001' // result
// type stopAt_13 = 12

// type DivideBinary_13<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_13, stopAt_13>

// type x_13 = DivideBinary_13<dividend_13, divisor_13>
// //   ^?
// type tx_13 = Expect<Extends<x_13, { quotient: quotient_13, remainder: remainder_13 }>>


// // 14 digits
// // 16384 union members
// type divisor_14 =   '00000000000011' // M
// type fallback_14 =  '00000000000000' // A
// type dividend_14 =  '00000000000111' // Q
// type quotient_14 =  '00000000000010' // result
// type remainder_14 = '00000000000001' // result
// type stopAt_14 = 13

// type DivideBinary_14<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_14, stopAt_14>

// type x_14 = DivideBinary_14<dividend_14, divisor_14>
// //   ^?
// type tx_14 = Expect<Extends<x_14, { quotient: quotient_14, remainder: remainder_14 }>>