import { Expect, Extends } from "type-testing"
import { _DivideBinaryArbitrary } from "./divide"
import { Wasm } from './wasm';

type B = 0 | 1;

// 4 digits
// 16 union members
type divisor_4 =   '0011' // M
type fallback_4 =  '0000' // Q
type dividend_4 =  '0111' // D
type quotient_4 =  '0010' // result
type remainder_4 = '0001' // result

type DivideBinary_4<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_4>





type x_4 = DivideBinary_4<dividend_4, divisor_4>
//   ^?
type tx_4 = Expect<Extends<x_4, { quotient: quotient_4, remainder: remainder_4 }>>

type s0_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, dividend_4>
//   ^?
type t0_4 = Expect<Extends<s0_4, { A: fallback_4, Q: dividend_4 }>>

type s1_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, dividend_4 extends `${B}${infer T}` ? T : ''>
//   ^?
type t1_4 = Expect<Extends<s1_4, { A: '0000', Q: '1110' }>>

type s2_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, dividend_4 extends `${B}${B}${infer T}` ? T : ''>
//   ^?
type t2_4 = Expect<Extends<s2_4, { A: '0001', Q: '1100' }>>

type s3_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, dividend_4 extends `${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t3_4 = Expect<Extends<s3_4, { A: '0000', Q: '1001' }>>

type s_4 = _DivideBinaryArbitrary<dividend_4, divisor_4, fallback_4, dividend_4 extends `${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t_4 = Expect<Extends<s_4, { A: remainder_4, Q: quotient_4 }>>

// 5 digits
// 32 union members
type divisor_5 =   '00011' // M
type fallback_5 =  '00000' // Q
type dividend_5 =  '00111' // D
type quotient_5 =  '00010' // result
type remainder_5 = '00001' // result

type DivideBinary_5<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_5>

type x_5 = DivideBinary_5<dividend_5, divisor_5>
//   ^?
type tx_5 = Expect<Extends<x_5, { quotient: quotient_5, remainder: remainder_5 }>>

type s0_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5>
//   ^?
type t0_5 = Expect<Extends<s0_5, { A: fallback_5, Q: dividend_5 }>>

type s1_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5 extends `${B}${infer T}` ? T : ''>
//   ^?
type t1_5 = Expect<Extends<s1_5, { A: '00000', Q: '01110' }>>

type s2_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5 extends `${B}${B}${infer T}` ? T : ''>
//   ^?
type t2_5 = Expect<Extends<s2_5, { A: '00000', Q: '11100' }>>

type s3_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5 extends `${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t3_5 = Expect<Extends<s3_5, { A: '00001', Q: '11000' }>>

type s4_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5 extends `${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t4_5 = Expect<Extends<s4_5, { A: '00000', Q: '10001' }>>

type s_5 = _DivideBinaryArbitrary<dividend_5, divisor_5, fallback_5, dividend_5 extends `${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t_5 = Expect<Extends<s_5, { A: remainder_5, Q: quotient_5 }>>

// 6 digits
// 64 union members
type divisor_6 =   '000011' // M
type fallback_6 =  '000000' // Q
type dividend_6 =  '000111' // D
type quotient_6 =  '000010' // result
type remainder_6 = '000001' // result

type DivideBinary_6<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_6>

type x_6 = DivideBinary_6<dividend_6, divisor_6>
//   ^?
type tx_6 = Expect<Extends<x_6, { quotient: quotient_6, remainder: remainder_6 }>>

type s0_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6>
//   ^?
type t0_6 = Expect<Extends<s0_6, { A: fallback_6, Q: dividend_6 }>>

type s1_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${infer T}` ? T : ''>
//   ^?
type t1_6 = Expect<Extends<s1_6, { A: '000000', Q: '001110' }>>

type s2_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${B}${infer T}` ? T : ''>
//   ^?
type t2_6 = Expect<Extends<s2_6, { A: '000000', Q: '011100' }>>

type s3_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t3_6 = Expect<Extends<s3_6, { A: '000000', Q: '111000' }>>

type s4_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t4_6 = Expect<Extends<s4_6, { A: '000001', Q: '110000' }>>

type s5_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t5_6 = Expect<Extends<s5_6, { A: '000000', Q: '100001' }>>

type s_6 = _DivideBinaryArbitrary<dividend_6, divisor_6, fallback_6, dividend_6 extends `${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t_6 = Expect<Extends<s_6, { A: remainder_6, Q: quotient_6 }>>




// 7 digits
// 128 union members
type divisor_7 =   '0000011' // M
type fallback_7 =  '0000000' // Q
type dividend_7 =  '0000111' // D
type quotient_7 =  '0000010' // result
type remainder_7 = '0000001' // result

type DivideBinary_7<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_7>

type x_7 = DivideBinary_7<dividend_7, divisor_7>
//   ^?
type tx_7 = Expect<Extends<x_7, { quotient: quotient_7, remainder: remainder_7 }>>

type s0_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7>
//   ^?
type t0_7 = Expect<Extends<s0_7, { A: fallback_7, Q: dividend_7 }>>

type s1_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${infer T}` ? T : ''>
//   ^?
type t1_7 = Expect<Extends<s1_7, { A: '0000000', Q: '0001110' }>>

type s2_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${infer T}` ? T : ''>
//   ^?
type t2_7 = Expect<Extends<s2_7, { A: '0000000', Q: '0011100' }>>

type s3_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t3_7 = Expect<Extends<s3_7, { A: '0000000', Q: '0111000' }>>

type s4_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t4_7 = Expect<Extends<s4_7, { A: '0000000', Q: '1110000' }>>

type s5_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t5_7 = Expect<Extends<s5_7, { A: '0000001', Q: '1100000' }>>

type s6_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t6_7 = Expect<Extends<s6_7, { A: '0000000', Q: '1000001' }>>

type s_7 = _DivideBinaryArbitrary<dividend_7, divisor_7, fallback_7, dividend_7 extends `${B}${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t_7 = Expect<Extends<s_7, { A: remainder_7, Q: quotient_7 }>>


// 8 digits
// 256 union members
type divisor_8 =   '00000011' // M
type fallback_8 =  '00000000' // Q
type dividend_8 =  '00000111' // D
type quotient_8 =  '00000010' // result
type remainder_8 = '00000001' // result

type DivideBinary_8<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_8>

type x_8 = DivideBinary_8<dividend_8, divisor_8>
//   ^?
type tx_8 = Expect<Extends<x_8, { quotient: quotient_8, remainder: remainder_8 }>>

type s0_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8>
//   ^?
type t0_8 = Expect<Extends<s0_8, { A: fallback_8, Q: dividend_8 }>>

type s1_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${infer T}` ? T : ''>
//   ^?
type t1_8 = Expect<Extends<s1_8, { A: '00000000', Q: '00001110' }>>

type s2_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${infer T}` ? T : ''>
//   ^?
type t2_8 = Expect<Extends<s2_8, { A: '00000000', Q: '00011100' }>>

type s3_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t3_8 = Expect<Extends<s3_8, { A: '00000000', Q: '00111000' }>>

type s4_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t4_8 = Expect<Extends<s4_8, { A: '00000000', Q: '01110000' }>>

type s5_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t5_8 = Expect<Extends<s5_8, { A: '00000000', Q: '11100000' }>>

type s6_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t6_8 = Expect<Extends<s6_8, { A: '00000001', Q: '11000000' }>>

type s7_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t7_8 = Expect<Extends<s7_8, { A: '00000000', Q: '10000001' }>>

type s_8 = _DivideBinaryArbitrary<dividend_8, divisor_8, fallback_8, dividend_8 extends `${B}${B}${B}${B}${B}${B}${B}${B}${infer T}` ? T : ''>
//   ^?
type t_8 = Expect<Extends<s_8, { A: remainder_8, Q: quotient_8 }>>

// 9 digits
// 512 union members

type divisor_9 =   '000000011' // M
type fallback_9 =  '000000000' // Q
type dividend_9 =  '000000111' // D
type quotient_9 =  '000000010' // result
type remainder_9 = '000000001' // result

type DivideBinary_9<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_9>

type x_9 = DivideBinary_9<dividend_9, divisor_9>
//   ^?
type tx_9 = Expect<Extends<x_9, { quotient: quotient_9, remainder: remainder_9 }>>


// 10 digits
// 1024 union members

type divisor_10 =   '0000000011' // M
type fallback_10 =  '0000000000' // Q
type dividend_10 =  '0000000111' // D
type quotient_10 =  '0000000010' // result
type remainder_10 = '0000000001' // result

type DivideBinary_10<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_10>







type x_10 = DivideBinary_10<dividend_10, divisor_10>
//   ^?
type tx_10 = Expect<Extends<x_10, { quotient: quotient_10, remainder: remainder_10 }>>


// 11 digits
// 2048 union members

type divisor_11 =   '00000000011' // M
type fallback_11 =  '00000000000' // Q
type dividend_11 =  '00000000111' // D
type quotient_11 =  '00000000010' // result
type remainder_11 = '00000000001' // result

type DivideBinary_11<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_11>

type x_11 = DivideBinary_11<dividend_11, divisor_11>
//   ^?
type tx_11 = Expect<Extends<x_11, { quotient: quotient_11, remainder: remainder_11 }>>


// 12 digits
// 4096 union members

type divisor_12 =   '000000000011' // M
type fallback_12 =  '000000000000' // Q
type dividend_12 =  '000000000111' // D
type quotient_12 =  '000000000010' // result
type remainder_12 = '000000000001' // result

type DivideBinary_12<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_12>

type x_12 = DivideBinary_12<dividend_12, divisor_12>
//   ^?
type tx_12 = Expect<Extends<x_12, { quotient: quotient_12, remainder: remainder_12 }>>


// 13 digits
// 8192 union members
type divisor_13 =   '0000000000011' // M
type fallback_13 =  '0000000000000' // Q
type dividend_13 =  '0000000000111' // D
type quotient_13 =  '0000000000010' // result
type remainder_13 = '0000000000001' // result

type DivideBinary_13<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_13>

type x_13 = DivideBinary_13<dividend_13, divisor_13>
//   ^?
type tx_13 = Expect<Extends<x_13, { quotient: quotient_13, remainder: remainder_13 }>>


// 14 digits
// 16384 union members
type divisor_14 =   '00000000000011' // M
type fallback_14 =  '00000000000000' // Q
type dividend_14 =  '00000000000111' // D
type quotient_14 =  '00000000000010' // result
type remainder_14 = '00000000000001' // result

type DivideBinary_14<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_14>

type x_14 = DivideBinary_14<dividend_14, divisor_14>
//   ^?
type tx_14 = Expect<Extends<x_14, { quotient: quotient_14, remainder: remainder_14 }>>

type x = _DivideBinaryArbitrary<
    dividend_14,
    divisor_14,
    Wasm.I32False
  >


// 15 digits
type divisor_15 =   '000000000000011' // M
type fallback_15 =  '000000000000000' // Q
type dividend_15 =  '000000000000111' // D
type quotient_15 =  '000000000000010' // result
type remainder_15 = '000000000000001' // result

type DivideBinary_15<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_15>

type x_15 = DivideBinary_15<dividend_15, divisor_15>
//   ^?
type tx_15 = Expect<Extends<x_15, { quotient: quotient_15, remainder: remainder_15 }>>


// 16 digits
type divisor_16 =   '0000000000000011' // M
type fallback_16 =  '0000000000000000' // Q
type dividend_16 =  '0000000000000111' // D
type quotient_16 =  '0000000000000010' // result
type remainder_16 = '0000000000000001' // result

type DivideBinary_16<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_16>

type x_16 = DivideBinary_16<dividend_16, divisor_16>
//   ^?
type tx_16 = Expect<Extends<x_16, { quotient: quotient_16, remainder: remainder_16 }>>


// 17 digits
type divisor_17 =   '00000000000000011' // M
type fallback_17 =  '00000000000000000' // Q
type dividend_17 =  '00000000000000111' // D
type quotient_17 =  '00000000000000010' // result
type remainder_17 = '00000000000000001' // result

type DivideBinary_17<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_17>

type x_17 = DivideBinary_17<dividend_17, divisor_17>
//   ^?
type tx_17 = Expect<Extends<x_17, { quotient: quotient_17, remainder: remainder_17 }>>


// 18 digits
type divisor_18 =   '000000000000000011' // M
type fallback_18 =  '000000000000000000' // Q
type dividend_18 =  '000000000000000111' // D
type quotient_18 =  '000000000000000010' // result
type remainder_18 = '000000000000000001' // result

type DivideBinary_18<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_18>

type x_18 = DivideBinary_18<dividend_18, divisor_18>
//   ^?
type tx_18 = Expect<Extends<x_18, { quotient: quotient_18, remainder: remainder_18 }>>


// 19 digits
type divisor_19 =   '0000000000000000011' // M
type fallback_19 =  '0000000000000000000' // Q
type dividend_19 =  '0000000000000000111' // D
type quotient_19 =  '0000000000000000010' // result
type remainder_19 = '0000000000000000001' // result

type DivideBinary_19<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_19>

type x_19 = DivideBinary_19<dividend_19, divisor_19>
//   ^?
type tx_19 = Expect<Extends<x_19, { quotient: quotient_19, remainder: remainder_19 }>>


// 20 digits
type divisor_20 =   '00000000000000000011' // M
type fallback_20 =  '00000000000000000000' // Q
type dividend_20 =  '00000000000000000111' // D
type quotient_20 =  '00000000000000000010' // result
type remainder_20 = '00000000000000000001' // result

type DivideBinary_20<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_20>

type x_20 = DivideBinary_20<dividend_20, divisor_20>
//   ^?
type tx_20 = Expect<Extends<x_20, { quotient: quotient_20, remainder: remainder_20 }>>


// 21 digits
type divisor_21 =   '000000000000000000011' // M
type fallback_21 =  '000000000000000000000' // Q
type dividend_21 =  '000000000000000000111' // D
type quotient_21 =  '000000000000000000010' // result
type remainder_21 = '000000000000000000001' // result

type DivideBinary_21<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_21>

type x_21 = DivideBinary_21<dividend_21, divisor_21>
//   ^?
type tx_21 = Expect<Extends<x_21, { quotient: quotient_21, remainder: remainder_21 }>>


// 22 digits
type divisor_22 =   '0000000000000000000011' // M
type fallback_22 =  '0000000000000000000000' // Q
type dividend_22 =  '0000000000000000000111' // D
type quotient_22 =  '0000000000000000000010' // result
type remainder_22 = '0000000000000000000001' // result

type DivideBinary_22<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_22>

type x_22 = DivideBinary_22<dividend_22, divisor_22>
//   ^?
type tx_22 = Expect<Extends<x_22, { quotient: quotient_22, remainder: remainder_22 }>>


// 23 digits
type divisor_23 =   '00000000000000000000011' // M
type fallback_23 =  '00000000000000000000000' // Q
type dividend_23 =  '00000000000000000000111' // D
type quotient_23 =  '00000000000000000000010' // result
type remainder_23 = '00000000000000000000001' // result

type DivideBinary_23<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_23>

type x_23 = DivideBinary_23<dividend_23, divisor_23>
//   ^?
type tx_23 = Expect<Extends<x_23, { quotient: quotient_23, remainder: remainder_23 }>>


// 24 digits
type divisor_24 =   '000000000000000000000011' // M
type fallback_24 =  '000000000000000000000000' // Q
type dividend_24 =  '000000000000000000000111' // D
type quotient_24 =  '000000000000000000000010' // result
type remainder_24 = '000000000000000000000001' // result

type DivideBinary_24<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_24>

type x_24 = DivideBinary_24<dividend_24, divisor_24>
//   ^?
type tx_24 = Expect<Extends<x_24, { quotient: quotient_24, remainder: remainder_24 }>>


// 25 digits
type divisor_25 =   '0000000000000000000000011' // M
type fallback_25 =  '0000000000000000000000000' // Q
type dividend_25 =  '0000000000000000000000111' // D
type quotient_25 =  '0000000000000000000000010' // result
type remainder_25 = '0000000000000000000000001' // result

type DivideBinary_25<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_25>

type x_25 = DivideBinary_25<dividend_25, divisor_25>
//   ^?
type tx_25 = Expect<Extends<x_25, { quotient: quotient_25, remainder: remainder_25 }>>


// 26 digits
type divisor_26 =   '00000000000000000000000011' // M
type fallback_26 =  '00000000000000000000000000' // Q
type dividend_26 =  '00000000000000000000000111' // D
type quotient_26 =  '00000000000000000000000010' // result
type remainder_26 = '00000000000000000000000001' // result

type DivideBinary_26<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_26>

type x_26 = DivideBinary_26<dividend_26, divisor_26>
//   ^?
type tx_26 = Expect<Extends<x_26, { quotient: quotient_26, remainder: remainder_26 }>>


// 27 digits
type divisor_27 =   '000000000000000000000000011' // M
type fallback_27 =  '000000000000000000000000000' // Q
type dividend_27 =  '000000000000000000000000111' // D
type quotient_27 =  '000000000000000000000000010' // result
type remainder_27 = '000000000000000000000000001' // result

type DivideBinary_27<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_27>

type x_27 = DivideBinary_27<dividend_27, divisor_27>
//   ^?
type tx_27 = Expect<Extends<x_27, { quotient: quotient_27, remainder: remainder_27 }>>


// 28 digits
type divisor_28 =   '0000000000000000000000000011' // M
type fallback_28 =  '0000000000000000000000000000' // Q
type dividend_28 =  '0000000000000000000000000111' // D
type quotient_28 =  '0000000000000000000000000010' // result
type remainder_28 = '0000000000000000000000000001' // result

type DivideBinary_28<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_28>

type x_28 = DivideBinary_28<dividend_28, divisor_28>
//   ^?
type tx_28 = Expect<Extends<x_28, { quotient: quotient_28, remainder: remainder_28 }>>


// 29 digits
type divisor_29 =   '00000000000000000000000000011' // M
type fallback_29 =  '00000000000000000000000000000' // Q
type dividend_29 =  '00000000000000000000000000111' // D
type quotient_29 =  '00000000000000000000000000010' // result
type remainder_29 = '00000000000000000000000000001' // result

type DivideBinary_29<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_29>

type x_29 = DivideBinary_29<dividend_29, divisor_29>
//   ^?
type tx_29 = Expect<Extends<x_29, { quotient: quotient_29, remainder: remainder_29 }>>


// 30 digits
type divisor_30 =   '000000000000000000000000000011' // M
type fallback_30 =  '000000000000000000000000000000' // Q
type dividend_30 =  '000000000000000000000000000111' // D
type quotient_30 =  '000000000000000000000000000010' // result
type remainder_30 = '000000000000000000000000000001' // result

type DivideBinary_30<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_30>

type x_30 = DivideBinary_30<dividend_30, divisor_30>
//   ^?
type tx_30 = Expect<Extends<x_30, { quotient: quotient_30, remainder: remainder_30 }>>


// 31 digits
type divisor_31 =   '0000000000000000000000000000011' // M
type fallback_31 =  '0000000000000000000000000000000' // Q
type dividend_31 =  '0000000000000000000000000000111' // D
type quotient_31 =  '0000000000000000000000000000010' // result
type remainder_31 = '0000000000000000000000000000001' // result

type DivideBinary_31<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_31>

type x_31 = DivideBinary_31<dividend_31, divisor_31>
//   ^?
type tx_31 = Expect<Extends<x_31, { quotient: quotient_31, remainder: remainder_31 }>>


// 32 digits
type divisor_32 =   '00000000000000000000000000000011' // M
type fallback_32 =  '00000000000000000000000000000000' // Q
type dividend_32 =  '00000000000000000000000000000111' // D
type quotient_32 =  '00000000000000000000000000000010' // result
type remainder_32 = '00000000000000000000000000000001' // result

type DivideBinary_32<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_32>

type x_32 = DivideBinary_32<dividend_32, divisor_32>
//   ^?
type tx_32 = Expect<Extends<x_32, { quotient: quotient_32, remainder: remainder_32 }>>



// 33 digits
type divisor_33 =   '000000000000000000000000000000011' // M
type fallback_33 =  '000000000000000000000000000000000' // Q
type dividend_33 =  '000000000000000000000000000000111' // D
type quotient_33 =  '000000000000000000000000000000010' // result
type remainder_33 = '000000000000000000000000000000001' // result

type DivideBinary_33<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_33>

type x_33 = DivideBinary_33<dividend_33, divisor_33>
//   ^?
type tx_33 = Expect<Extends<x_33, { quotient: quotient_33, remainder: remainder_33 }>>



// 34 digits
type divisor_34 =   '0000000000000000000000000000000011' // M
type fallback_34 =  '0000000000000000000000000000000000' // Q
type dividend_34 =  '0000000000000000000000000000000111' // D
type quotient_34 =  '0000000000000000000000000000000010' // result
type remainder_34 = '0000000000000000000000000000000001' // result

type DivideBinary_34<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_34>

type x_34 = DivideBinary_34<dividend_34, divisor_34>
//   ^?
type tx_34 = Expect<Extends<x_34, { quotient: quotient_34, remainder: remainder_34 }>>



// 35 digits
type divisor_35 =   '00000000000000000000000000000000011' // M
type fallback_35 =  '00000000000000000000000000000000000' // Q
type dividend_35 =  '00000000000000000000000000000000111' // D
type quotient_35 =  '00000000000000000000000000000000010' // result
type remainder_35 = '00000000000000000000000000000000001' // result

type DivideBinary_35<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_35>

type x_35 = DivideBinary_35<dividend_35, divisor_35>
//   ^?
type tx_35 = Expect<Extends<x_35, { quotient: quotient_35, remainder: remainder_35 }>>



// 36 digits
type divisor_36 =   '000000000000000000000000000000000011' // M
type fallback_36 =  '000000000000000000000000000000000000' // Q
type dividend_36 =  '000000000000000000000000000000000111' // D
type quotient_36 =  '000000000000000000000000000000000010' // result
type remainder_36 = '000000000000000000000000000000000001' // result

type DivideBinary_36<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_36>

type x_36 = DivideBinary_36<dividend_36, divisor_36>
//   ^?
type tx_36 = Expect<Extends<x_36, { quotient: quotient_36, remainder: remainder_36 }>>



// 37 digits
type divisor_37 =   '0000000000000000000000000000000000011' // M
type fallback_37 =  '0000000000000000000000000000000000000' // Q
type dividend_37 =  '0000000000000000000000000000000000111' // D
type quotient_37 =  '0000000000000000000000000000000000010' // result
type remainder_37 = '0000000000000000000000000000000000001' // result

type DivideBinary_37<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_37>

type x_37 = DivideBinary_37<dividend_37, divisor_37>
//   ^?
type tx_37 = Expect<Extends<x_37, { quotient: quotient_37, remainder: remainder_37 }>>



// 38 digits
type divisor_38 =   '00000000000000000000000000000000000011' // M
type fallback_38 =  '00000000000000000000000000000000000000' // Q
type dividend_38 =  '00000000000000000000000000000000000111' // D
type quotient_38 =  '00000000000000000000000000000000000010' // result
type remainder_38 = '00000000000000000000000000000000000001' // result

type DivideBinary_38<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_38>

type x_38 = DivideBinary_38<dividend_38, divisor_38>
//   ^?
type tx_38 = Expect<Extends<x_38, { quotient: quotient_38, remainder: remainder_38 }>>



// 39 digits
type divisor_39 =   '000000000000000000000000000000000000011' // M
type fallback_39 =  '000000000000000000000000000000000000000' // Q
type dividend_39 =  '000000000000000000000000000000000000111' // D
type quotient_39 =  '000000000000000000000000000000000000010' // result
type remainder_39 = '000000000000000000000000000000000000001' // result

type DivideBinary_39<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_39>

type x_39 = DivideBinary_39<dividend_39, divisor_39>
//   ^?
type tx_39 = Expect<Extends<x_39, { quotient: quotient_39, remainder: remainder_39 }>>



// 40 digits
type divisor_40 =   '0000000000000000000000000000000000000011' // M
type fallback_40 =  '0000000000000000000000000000000000000000' // Q
type dividend_40 =  '0000000000000000000000000000000000000111' // D
type quotient_40 =  '0000000000000000000000000000000000000010' // result
type remainder_40 = '0000000000000000000000000000000000000001' // result

type DivideBinary_40<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_40>

type x_40 = DivideBinary_40<dividend_40, divisor_40>
//   ^?
type tx_40 = Expect<Extends<x_40, { quotient: quotient_40, remainder: remainder_40 }>>



// 41 digits
type divisor_41 =   '00000000000000000000000000000000000000011' // M
type fallback_41 =  '00000000000000000000000000000000000000000' // Q
type dividend_41 =  '00000000000000000000000000000000000000111' // D
type quotient_41 =  '00000000000000000000000000000000000000010' // result
type remainder_41 = '00000000000000000000000000000000000000001' // result

type DivideBinary_41<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_41>

type x_41 = DivideBinary_41<dividend_41, divisor_41>
//   ^?
type tx_41 = Expect<Extends<x_41, { quotient: quotient_41, remainder: remainder_41 }>>



// 42 digits
type divisor_42 =   '000000000000000000000000000000000000000011' // M
type fallback_42 =  '000000000000000000000000000000000000000000' // Q
type dividend_42 =  '000000000000000000000000000000000000000111' // D
type quotient_42 =  '000000000000000000000000000000000000000010' // result
type remainder_42 = '000000000000000000000000000000000000000001' // result

type DivideBinary_42<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_42>

type x_42 = DivideBinary_42<dividend_42, divisor_42>
//   ^?
type tx_42 = Expect<Extends<x_42, { quotient: quotient_42, remainder: remainder_42 }>>



// 43 digits
type divisor_43 =   '0000000000000000000000000000000000000000011' // M
type fallback_43 =  '0000000000000000000000000000000000000000000' // Q
type dividend_43 =  '0000000000000000000000000000000000000000111' // D
type quotient_43 =  '0000000000000000000000000000000000000000010' // result
type remainder_43 = '0000000000000000000000000000000000000000001' // result

type DivideBinary_43<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_43>

type x_43 = DivideBinary_43<dividend_43, divisor_43>
//   ^?
type tx_43 = Expect<Extends<x_43, { quotient: quotient_43, remainder: remainder_43 }>>



// 44 digits
type divisor_44 =   '00000000000000000000000000000000000000000011' // M
type fallback_44 =  '00000000000000000000000000000000000000000000' // Q
type dividend_44 =  '00000000000000000000000000000000000000000111' // D
type quotient_44 =  '00000000000000000000000000000000000000000010' // result
type remainder_44 = '00000000000000000000000000000000000000000001' // result

type DivideBinary_44<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_44>

type x_44 = DivideBinary_44<dividend_44, divisor_44>
//   ^?
type tx_44 = Expect<Extends<x_44, { quotient: quotient_44, remainder: remainder_44 }>>



// 45 digits
type divisor_45 =   '000000000000000000000000000000000000000000011' // M
type fallback_45 =  '000000000000000000000000000000000000000000000' // Q
type dividend_45 =  '000000000000000000000000000000000000000000111' // D
type quotient_45 =  '000000000000000000000000000000000000000000010' // result
type remainder_45 = '000000000000000000000000000000000000000000001' // result

type DivideBinary_45<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_45>

type x_45 = DivideBinary_45<dividend_45, divisor_45>
//   ^?
type tx_45 = Expect<Extends<x_45, { quotient: quotient_45, remainder: remainder_45 }>>



// 46 digits
type divisor_46 =   '0000000000000000000000000000000000000000000011' // M
type fallback_46 =  '0000000000000000000000000000000000000000000000' // Q
type dividend_46 =  '0000000000000000000000000000000000000000000111' // D
type quotient_46 =  '0000000000000000000000000000000000000000000010' // result
type remainder_46 = '0000000000000000000000000000000000000000000001' // result

type DivideBinary_46<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_46>

type x_46 = DivideBinary_46<dividend_46, divisor_46>
//   ^?
type tx_46 = Expect<Extends<x_46, { quotient: quotient_46, remainder: remainder_46 }>>



// 47 digits
type divisor_47 =   '00000000000000000000000000000000000000000000011' // M
type fallback_47 =  '00000000000000000000000000000000000000000000000' // Q
type dividend_47 =  '00000000000000000000000000000000000000000000111' // D
type quotient_47 =  '00000000000000000000000000000000000000000000010' // result
type remainder_47 = '00000000000000000000000000000000000000000000001' // result

type DivideBinary_47<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_47>

type x_47 = DivideBinary_47<dividend_47, divisor_47>
//   ^?
type tx_47 = Expect<Extends<x_47, { quotient: quotient_47, remainder: remainder_47 }>>



// 48 digits
type divisor_48 =   '000000000000000000000000000000000000000000000011' // M
type fallback_48 =  '000000000000000000000000000000000000000000000000' // Q
type dividend_48 =  '000000000000000000000000000000000000000000000111' // D
type quotient_48 =  '000000000000000000000000000000000000000000000010' // result
type remainder_48 = '000000000000000000000000000000000000000000000001' // result

type DivideBinary_48<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_48>

type x_48 = DivideBinary_48<dividend_48, divisor_48>
//   ^?
type tx_48 = Expect<Extends<x_48, { quotient: quotient_48, remainder: remainder_48 }>>



// 49 digits
type divisor_49 =   '0000000000000000000000000000000000000000000000011' // M
type fallback_49 =  '0000000000000000000000000000000000000000000000000' // Q
type dividend_49 =  '0000000000000000000000000000000000000000000000111' // D
type quotient_49 =  '0000000000000000000000000000000000000000000000010' // result
type remainder_49 = '0000000000000000000000000000000000000000000000001' // result

type DivideBinary_49<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_49>

type x_49 = DivideBinary_49<dividend_49, divisor_49>
//   ^?
type tx_49 = Expect<Extends<x_49, { quotient: quotient_49, remainder: remainder_49 }>>



// 50 digits
type divisor_50 =   '00000000000000000000000000000000000000000000000011' // M
type fallback_50 =  '00000000000000000000000000000000000000000000000000' // Q
type dividend_50 =  '00000000000000000000000000000000000000000000000111' // D
type quotient_50 =  '00000000000000000000000000000000000000000000000010' // result
type remainder_50 = '00000000000000000000000000000000000000000000000001' // result

type DivideBinary_50<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_50>

type x_50 = DivideBinary_50<dividend_50, divisor_50>
//   ^?
type tx_50 = Expect<Extends<x_50, { quotient: quotient_50, remainder: remainder_50 }>>



// 51 digits
type divisor_51 =   '000000000000000000000000000000000000000000000000011' // M
type fallback_51 =  '000000000000000000000000000000000000000000000000000' // Q
type dividend_51 =  '000000000000000000000000000000000000000000000000111' // D
type quotient_51 =  '000000000000000000000000000000000000000000000000010' // result
type remainder_51 = '000000000000000000000000000000000000000000000000001' // result

type DivideBinary_51<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_51>

type x_51 = DivideBinary_51<dividend_51, divisor_51>
//   ^?
type tx_51 = Expect<Extends<x_51, { quotient: quotient_51, remainder: remainder_51 }>>



// 52 digits
type divisor_52 =   '0000000000000000000000000000000000000000000000000011' // M
type fallback_52 =  '0000000000000000000000000000000000000000000000000000' // Q
type dividend_52 =  '0000000000000000000000000000000000000000000000000111' // D
type quotient_52 =  '0000000000000000000000000000000000000000000000000010' // result
type remainder_52 = '0000000000000000000000000000000000000000000000000001' // result

type DivideBinary_52<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_52>

type x_52 = DivideBinary_52<dividend_52, divisor_52>
//   ^?
type tx_52 = Expect<Extends<x_52, { quotient: quotient_52, remainder: remainder_52 }>>



// 53 digits
type divisor_53 =   '00000000000000000000000000000000000000000000000000011' // M
type fallback_53 =  '00000000000000000000000000000000000000000000000000000' // Q
type dividend_53 =  '00000000000000000000000000000000000000000000000000111' // D
type quotient_53 =  '00000000000000000000000000000000000000000000000000010' // result
type remainder_53 = '00000000000000000000000000000000000000000000000000001' // result

type DivideBinary_53<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_53>

type x_53 = DivideBinary_53<dividend_53, divisor_53>
//   ^?
type tx_53 = Expect<Extends<x_53, { quotient: quotient_53, remainder: remainder_53 }>>



// 54 digits
type divisor_54 =   '000000000000000000000000000000000000000000000000000011' // M
type fallback_54 =  '000000000000000000000000000000000000000000000000000000' // Q
type dividend_54 =  '000000000000000000000000000000000000000000000000000111' // D
type quotient_54 =  '000000000000000000000000000000000000000000000000000010' // result
type remainder_54 = '000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_54<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_54>

type x_54 = DivideBinary_54<dividend_54, divisor_54>
//   ^?
type tx_54 = Expect<Extends<x_54, { quotient: quotient_54, remainder: remainder_54 }>>



// 55 digits
type divisor_55 =   '0000000000000000000000000000000000000000000000000000011' // M
type fallback_55 =  '0000000000000000000000000000000000000000000000000000000' // Q
type dividend_55 =  '0000000000000000000000000000000000000000000000000000111' // D
type quotient_55 =  '0000000000000000000000000000000000000000000000000000010' // result
type remainder_55 = '0000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_55<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_55>

type x_55 = DivideBinary_55<dividend_55, divisor_55>
//   ^?
type tx_55 = Expect<Extends<x_55, { quotient: quotient_55, remainder: remainder_55 }>>



// 56 digits
type divisor_56 =   '00000000000000000000000000000000000000000000000000000011' // M
type fallback_56 =  '00000000000000000000000000000000000000000000000000000000' // Q
type dividend_56 =  '00000000000000000000000000000000000000000000000000000111' // D
type quotient_56 =  '00000000000000000000000000000000000000000000000000000010' // result
type remainder_56 = '00000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_56<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_56>

type x_56 = DivideBinary_56<dividend_56, divisor_56>
//   ^?
type tx_56 = Expect<Extends<x_56, { quotient: quotient_56, remainder: remainder_56 }>>



// 57 digits
type divisor_57 =   '000000000000000000000000000000000000000000000000000000011' // M
type fallback_57 =  '000000000000000000000000000000000000000000000000000000000' // Q
type dividend_57 =  '000000000000000000000000000000000000000000000000000000111' // D
type quotient_57 =  '000000000000000000000000000000000000000000000000000000010' // result
type remainder_57 = '000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_57<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_57>

type x_57 = DivideBinary_57<dividend_57, divisor_57>
//   ^?
type tx_57 = Expect<Extends<x_57, { quotient: quotient_57, remainder: remainder_57 }>>



// 58 digits
type divisor_58 =   '0000000000000000000000000000000000000000000000000000000011' // M
type fallback_58 =  '0000000000000000000000000000000000000000000000000000000000' // Q
type dividend_58 =  '0000000000000000000000000000000000000000000000000000000111' // D
type quotient_58 =  '0000000000000000000000000000000000000000000000000000000010' // result
type remainder_58 = '0000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_58<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_58>

type x_58 = DivideBinary_58<dividend_58, divisor_58>
//   ^?
type tx_58 = Expect<Extends<x_58, { quotient: quotient_58, remainder: remainder_58 }>>



// 59 digits
type divisor_59 =   '00000000000000000000000000000000000000000000000000000000011' // M
type fallback_59 =  '00000000000000000000000000000000000000000000000000000000000' // Q
type dividend_59 =  '00000000000000000000000000000000000000000000000000000000111' // D
type quotient_59 =  '00000000000000000000000000000000000000000000000000000000010' // result
type remainder_59 = '00000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_59<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_59>

type x_59 = DivideBinary_59<dividend_59, divisor_59>
//   ^?
type tx_59 = Expect<Extends<x_59, { quotient: quotient_59, remainder: remainder_59 }>>



// 60 digits
type divisor_60 =   '000000000000000000000000000000000000000000000000000000000011' // M
type fallback_60 =  '000000000000000000000000000000000000000000000000000000000000' // Q
type dividend_60 =  '000000000000000000000000000000000000000000000000000000000111' // D
type quotient_60 =  '000000000000000000000000000000000000000000000000000000000010' // result
type remainder_60 = '000000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_60<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_60>

type x_60 = DivideBinary_60<dividend_60, divisor_60>
//   ^?
type tx_60 = Expect<Extends<x_60, { quotient: quotient_60, remainder: remainder_60 }>>



// 61 digits
type divisor_61 =   '0000000000000000000000000000000000000000000000000000000000011' // M
type fallback_61 =  '0000000000000000000000000000000000000000000000000000000000000' // Q
type dividend_61 =  '0000000000000000000000000000000000000000000000000000000000111' // D
type quotient_61 =  '0000000000000000000000000000000000000000000000000000000000010' // result
type remainder_61 = '0000000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_61<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_61>

type x_61 = DivideBinary_61<dividend_61, divisor_61>
//   ^?
type tx_61 = Expect<Extends<x_61, { quotient: quotient_61, remainder: remainder_61 }>>



// 62 digits
type divisor_62 =   '00000000000000000000000000000000000000000000000000000000000011' // M
type fallback_62 =  '00000000000000000000000000000000000000000000000000000000000000' // Q
type dividend_62 =  '00000000000000000000000000000000000000000000000000000000000111' // D
type quotient_62 =  '00000000000000000000000000000000000000000000000000000000000010' // result
type remainder_62 = '00000000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_62<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_62>

type x_62 = DivideBinary_62<dividend_62, divisor_62>
//   ^?
type tx_62 = Expect<Extends<x_62, { quotient: quotient_62, remainder: remainder_62 }>>



// 63 digits
type divisor_63 =   '000000000000000000000000000000000000000000000000000000000000011' // M
type fallback_63 =  '000000000000000000000000000000000000000000000000000000000000000' // Q
type dividend_63 =  '000000000000000000000000000000000000000000000000000000000000111' // D
type quotient_63 =  '000000000000000000000000000000000000000000000000000000000000010' // result
type remainder_63 = '000000000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_63<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_63>

type x_63 = DivideBinary_63<dividend_63, divisor_63>
//   ^?
type tx_63 = Expect<Extends<x_63, { quotient: quotient_63, remainder: remainder_63 }>>



// 64 digits
type divisor_64 =   '0000000000000000000000000000000000000000000000000000000000000011' // M
type fallback_64 =  '0000000000000000000000000000000000000000000000000000000000000000' // Q
type dividend_64 =  '0000000000000000000000000000000000000000000000000000000000000111' // D
type quotient_64 =  '0000000000000000000000000000000000000000000000000000000000000010' // result
type remainder_64 = '0000000000000000000000000000000000000000000000000000000000000001' // result

type DivideBinary_64<
  dividend extends string,
  divisor extends string
> = _DivideBinaryArbitrary<dividend, divisor, fallback_64>

type x_64 = DivideBinary_64<dividend_64, divisor_64>
//   ^?
type tx_64 = Expect<Extends<x_64, { quotient: quotient_64, remainder: remainder_64 }>>
