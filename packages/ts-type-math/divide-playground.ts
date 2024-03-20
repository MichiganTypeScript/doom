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

// 9 digits
// 512 union members

type divisor_9 =   '000000011' // M
type fallback_9 =  '000000000' // A
type dividend_9 =  '000000111' // Q
type quotient_9 =  '000000010' // result
type remainder_9 = '000000001' // result
type stopAt_9 = 8

type DivideBinary_9<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_9, stopAt_9>

type x_9 = DivideBinary_9<dividend_9, divisor_9>
//   ^?
type tx_9 = Expect<Extends<x_9, { quotient: quotient_9, remainder: remainder_9 }>>


// 10 digits
// 1024 union members

type divisor_10 =   '0000000011' // M
type fallback_10 =  '0000000000' // A
type dividend_10 =  '0000000111' // Q
type quotient_10 =  '0000000010' // result
type remainder_10 = '0000000001' // result
type stopAt_10 = 9

type DivideBinary_10<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_10, stopAt_10>







type x_10 = DivideBinary_10<dividend_10, divisor_10>
//   ^?
type tx_10 = Expect<Extends<x_10, { quotient: quotient_10, remainder: remainder_10 }>>


// 11 digits
// 2048 union members

type divisor_11 =   '00000000011' // M
type fallback_11 =  '00000000000' // A
type dividend_11 =  '00000000111' // Q
type quotient_11 =  '00000000010' // result
type remainder_11 = '00000000001' // result
type stopAt_11 = 10

type DivideBinary_11<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_11, stopAt_11>

type x_11 = DivideBinary_11<dividend_11, divisor_11>
//   ^?
type tx_11 = Expect<Extends<x_11, { quotient: quotient_11, remainder: remainder_11 }>>


// 12 digits
// 4096 union members

type divisor_12 =   '000000000011' // M
type fallback_12 =  '000000000000' // A
type dividend_12 =  '000000000111' // Q
type quotient_12 =  '000000000010' // result
type remainder_12 = '000000000001' // result
type stopAt_12 = 11

type DivideBinary_12<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_12, stopAt_12>

type x_12 = DivideBinary_12<dividend_12, divisor_12>
//   ^?
type tx_12 = Expect<Extends<x_12, { quotient: quotient_12, remainder: remainder_12 }>>


// 13 digits
// 8192 union members
type divisor_13 =   '0000000000011' // M
type fallback_13 =  '0000000000000' // A
type dividend_13 =  '0000000000111' // Q
type quotient_13 =  '0000000000010' // result
type remainder_13 = '0000000000001' // result
type stopAt_13 = 12

type DivideBinary_13<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_13, stopAt_13>

type x_13 = DivideBinary_13<dividend_13, divisor_13>
//   ^?
type tx_13 = Expect<Extends<x_13, { quotient: quotient_13, remainder: remainder_13 }>>


// 14 digits
// 16384 union members
type divisor_14 =   '00000000000011' // M
type fallback_14 =  '00000000000000' // A
type dividend_14 =  '00000000000111' // Q
type quotient_14 =  '00000000000010' // result
type remainder_14 = '00000000000001' // result
type stopAt_14 = 13

type DivideBinary_14<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_14, stopAt_14>

type x_14 = DivideBinary_14<dividend_14, divisor_14>
//   ^?
type tx_14 = Expect<Extends<x_14, { quotient: quotient_14, remainder: remainder_14 }>>

type x = _DivideBinaryArbitrary<
    dividend_14,
    divisor_14,
    Wasm.I32False,
    1
  >


// 15 digits
type divisor_15 =   '000000000000011' // M
type fallback_15 =  '000000000000000' // A
type dividend_15 =  '000000000000111' // Q
type quotient_15 =  '000000000000010' // result
type remainder_15 = '000000000000001' // result
type stopAt_15 = 14

type DivideBinary_15<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_15, stopAt_15>

type x_15 = DivideBinary_15<dividend_15, divisor_15>
//   ^?
type tx_15 = Expect<Extends<x_15, { quotient: quotient_15, remainder: remainder_15 }>>


// 16 digits
type divisor_16 =   '0000000000000011' // M
type fallback_16 =  '0000000000000000' // A
type dividend_16 =  '0000000000000111' // Q
type quotient_16 =  '0000000000000010' // result
type remainder_16 = '0000000000000001' // result
type stopAt_16 = 15

type DivideBinary_16<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_16, stopAt_16>

type x_16 = DivideBinary_16<dividend_16, divisor_16>
//   ^?
type tx_16 = Expect<Extends<x_16, { quotient: quotient_16, remainder: remainder_16 }>>


// 17 digits
type divisor_17 =   '00000000000000011' // M
type fallback_17 =  '00000000000000000' // A
type dividend_17 =  '00000000000000111' // Q
type quotient_17 =  '00000000000000010' // result
type remainder_17 = '00000000000000001' // result
type stopAt_17 = 16

type DivideBinary_17<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_17, stopAt_17>

type x_17 = DivideBinary_17<dividend_17, divisor_17>
//   ^?
type tx_17 = Expect<Extends<x_17, { quotient: quotient_17, remainder: remainder_17 }>>


// 18 digits
type divisor_18 =   '000000000000000011' // M
type fallback_18 =  '000000000000000000' // A
type dividend_18 =  '000000000000000111' // Q
type quotient_18 =  '000000000000000010' // result
type remainder_18 = '000000000000000001' // result
type stopAt_18 = 17

type DivideBinary_18<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_18, stopAt_18>

type x_18 = DivideBinary_18<dividend_18, divisor_18>
//   ^?
type tx_18 = Expect<Extends<x_18, { quotient: quotient_18, remainder: remainder_18 }>>


// 19 digits
type divisor_19 =   '0000000000000000011' // M
type fallback_19 =  '0000000000000000000' // A
type dividend_19 =  '0000000000000000111' // Q
type quotient_19 =  '0000000000000000010' // result
type remainder_19 = '0000000000000000001' // result
type stopAt_19 = 18

type DivideBinary_19<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_19, stopAt_19>

type x_19 = DivideBinary_19<dividend_19, divisor_19>
//   ^?
type tx_19 = Expect<Extends<x_19, { quotient: quotient_19, remainder: remainder_19 }>>


// 20 digits
type divisor_20 =   '00000000000000000011' // M
type fallback_20 =  '00000000000000000000' // A
type dividend_20 =  '00000000000000000111' // Q
type quotient_20 =  '00000000000000000010' // result
type remainder_20 = '00000000000000000001' // result
type stopAt_20 = 19

type DivideBinary_20<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_20, stopAt_20>

type x_20 = DivideBinary_20<dividend_20, divisor_20>
//   ^?
type tx_20 = Expect<Extends<x_20, { quotient: quotient_20, remainder: remainder_20 }>>


// 21 digits
type divisor_21 =   '000000000000000000011' // M
type fallback_21 =  '000000000000000000000' // A
type dividend_21 =  '000000000000000000111' // Q
type quotient_21 =  '000000000000000000010' // result
type remainder_21 = '000000000000000000001' // result
type stopAt_21 = 20

type DivideBinary_21<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_21, stopAt_21>

type x_21 = DivideBinary_21<dividend_21, divisor_21>
//   ^?
type tx_21 = Expect<Extends<x_21, { quotient: quotient_21, remainder: remainder_21 }>>


// 22 digits
type divisor_22 =   '0000000000000000000011' // M
type fallback_22 =  '0000000000000000000000' // A
type dividend_22 =  '0000000000000000000111' // Q
type quotient_22 =  '0000000000000000000010' // result
type remainder_22 = '0000000000000000000001' // result
type stopAt_22 = 21

type DivideBinary_22<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_22, stopAt_22>

type x_22 = DivideBinary_22<dividend_22, divisor_22>
//   ^?
type tx_22 = Expect<Extends<x_22, { quotient: quotient_22, remainder: remainder_22 }>>


// 23 digits
type divisor_23 =   '00000000000000000000011' // M
type fallback_23 =  '00000000000000000000000' // A
type dividend_23 =  '00000000000000000000111' // Q
type quotient_23 =  '00000000000000000000010' // result
type remainder_23 = '00000000000000000000001' // result
type stopAt_23 = 22

type DivideBinary_23<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_23, stopAt_23>

type x_23 = DivideBinary_23<dividend_23, divisor_23>
//   ^?
type tx_23 = Expect<Extends<x_23, { quotient: quotient_23, remainder: remainder_23 }>>


// 24 digits
type divisor_24 =   '000000000000000000000011' // M
type fallback_24 =  '000000000000000000000000' // A
type dividend_24 =  '000000000000000000000111' // Q
type quotient_24 =  '000000000000000000000010' // result
type remainder_24 = '000000000000000000000001' // result
type stopAt_24 = 23

type DivideBinary_24<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_24, stopAt_24>

type x_24 = DivideBinary_24<dividend_24, divisor_24>
//   ^?
type tx_24 = Expect<Extends<x_24, { quotient: quotient_24, remainder: remainder_24 }>>


// 25 digits
type divisor_25 =   '0000000000000000000000011' // M
type fallback_25 =  '0000000000000000000000000' // A
type dividend_25 =  '0000000000000000000000111' // Q
type quotient_25 =  '0000000000000000000000010' // result
type remainder_25 = '0000000000000000000000001' // result
type stopAt_25 = 24

type DivideBinary_25<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_25, stopAt_25>

type x_25 = DivideBinary_25<dividend_25, divisor_25>
//   ^?
type tx_25 = Expect<Extends<x_25, { quotient: quotient_25, remainder: remainder_25 }>>


// 26 digits
type divisor_26 =   '00000000000000000000000011' // M
type fallback_26 =  '00000000000000000000000000' // A
type dividend_26 =  '00000000000000000000000111' // Q
type quotient_26 =  '00000000000000000000000010' // result
type remainder_26 = '00000000000000000000000001' // result
type stopAt_26 = 25

type DivideBinary_26<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_26, stopAt_26>

type x_26 = DivideBinary_26<dividend_26, divisor_26>
//   ^?
type tx_26 = Expect<Extends<x_26, { quotient: quotient_26, remainder: remainder_26 }>>


// // 27 digits
// type divisor_27 =   '000000000000000000000000011' // M
// type fallback_27 =  '000000000000000000000000000' // A
// type dividend_27 =  '000000000000000000000000111' // Q
// type quotient_27 =  '000000000000000000000000010' // result
// type remainder_27 = '000000000000000000000000001' // result
// type stopAt_27 = 26

// type DivideBinary_27<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_27, stopAt_27>

// type x_27 = DivideBinary_27<dividend_27, divisor_27>
// //   ^?
// type tx_27 = Expect<Extends<x_27, { quotient: quotient_27, remainder: remainder_27 }>>


// // 28 digits
// type divisor_28 =   '0000000000000000000000000011' // M
// type fallback_28 =  '0000000000000000000000000000' // A
// type dividend_28 =  '0000000000000000000000000111' // Q
// type quotient_28 =  '0000000000000000000000000010' // result
// type remainder_28 = '0000000000000000000000000001' // result
// type stopAt_28 = 27

// type DivideBinary_28<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_28, stopAt_28>

// type x_28 = DivideBinary_28<dividend_28, divisor_28>
// //   ^?
// type tx_28 = Expect<Extends<x_28, { quotient: quotient_28, remainder: remainder_28 }>>


// // 29 digits
// type divisor_29 =   '00000000000000000000000000011' // M
// type fallback_29 =  '00000000000000000000000000000' // A
// type dividend_29 =  '00000000000000000000000000111' // Q
// type quotient_29 =  '00000000000000000000000000010' // result
// type remainder_29 = '00000000000000000000000000001' // result
// type stopAt_29 = 28

// type DivideBinary_29<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_29, stopAt_29>

// type x_29 = DivideBinary_29<dividend_29, divisor_29>
// //   ^?
// type tx_29 = Expect<Extends<x_29, { quotient: quotient_29, remainder: remainder_29 }>>


// // 30 digits
// type divisor_30 =   '000000000000000000000000000011' // M
// type fallback_30 =  '000000000000000000000000000000' // A
// type dividend_30 =  '000000000000000000000000000111' // Q
// type quotient_30 =  '000000000000000000000000000010' // result
// type remainder_30 = '000000000000000000000000000001' // result
// type stopAt_30 = 29

// type DivideBinary_30<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_30, stopAt_30>

// type x_30 = DivideBinary_30<dividend_30, divisor_30>
// //   ^?
// type tx_30 = Expect<Extends<x_30, { quotient: quotient_30, remainder: remainder_30 }>>


// // 31 digits
// type divisor_31 =   '0000000000000000000000000000011' // M
// type fallback_31 =  '0000000000000000000000000000000' // A
// type dividend_31 =  '0000000000000000000000000000111' // Q
// type quotient_31 =  '0000000000000000000000000000010' // result
// type remainder_31 = '0000000000000000000000000000001' // result
// type stopAt_31 = 30

// type DivideBinary_31<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_31, stopAt_31>

// type x_31 = DivideBinary_31<dividend_31, divisor_31>
// //   ^?
// type tx_31 = Expect<Extends<x_31, { quotient: quotient_31, remainder: remainder_31 }>>


// // 32 digits
// type divisor_32 =   '00000000000000000000000000000011' // M
// type fallback_32 =  '00000000000000000000000000000000' // A
// type dividend_32 =  '00000000000000000000000000000111' // Q
// type quotient_32 =  '00000000000000000000000000000010' // result
// type remainder_32 = '00000000000000000000000000000001' // result
// type stopAt_32 = 31

// type DivideBinary_32<
//   dividend extends string,
//   divisor extends string
// > = _DivideBinaryArbitrary<dividend, divisor, fallback_32, stopAt_32>

// type x_32 = DivideBinary_32<dividend_32, divisor_32>
// //   ^?
// type tx_32 = Expect<Extends<x_32, { quotient: quotient_32, remainder: remainder_32 }>>
