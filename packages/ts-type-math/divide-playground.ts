import { Expect, Extends } from "type-testing"
import { _DivideBinary32 } from "./divide"
import { _ } from "vitest/dist/reporters-rzC174PQ.js"

type divisor4 =  '0011' // M
type fallback4 = '0000' // A
type dividend4 = '0111' // Q

type s0 = _DivideBinary32<dividend4, divisor4, fallback4, 0, true>
//   ^?
type t0 = Expect<Extends<s0, { M: '0011'; A: '0000', Q: '0111' }>>

type s1 = _DivideBinary32<dividend4, divisor4, fallback4, 1, true>
//   ^?
type t1 = Expect<Extends<s1, { M: '0011'; A: '0000', Q: '1110' }>>

type s2 = _DivideBinary32<dividend4, divisor4, fallback4, 2, true>
// //   ^?
type t2 = Expect<Extends<s2, { M: '0011'; A: '0001', Q: '1100' }>>

type s3 = _DivideBinary32<dividend4, divisor4, fallback4, 3, true>
//   ^?
type t3 = Expect<Extends<s3, { M: '0011'; A: '0000', Q: '1001' }>>

type s4 = _DivideBinary32<dividend4, divisor4, fallback4, 4, true>
//   ^?
type t4 = Expect<Extends<s4, { M: '0011'; A: '0001', Q: '0010' }>>

type DivideBinary4<
  dividend extends string,
  divisor extends string
> = _DivideBinary32<dividend, divisor, '0000', 3>

type ss4 = DivideBinary4<dividend4, divisor4>
//   ^?
type tt4 = Expect<Extends<ss4, { quotient: '0010', remainder: '0001' }>>