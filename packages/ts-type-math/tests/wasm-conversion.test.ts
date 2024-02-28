import { expect, test } from "vitest";
import { TExtend, tExtend } from "../test-cases/wasm-conversion";
import { bigIntToTwosComplement, numberToTwosComplement, twosComplementToBigInt, twosComplementToNumber, wasmConversion } from "../test-utils";
import { I64ExtendI32SDecimal, I64ExtendI32SBinary64, I64ExtendI32UDecimal, I64ExtendI32UBinary64 } from "../wasm-conversion";
import { Equal, Expect } from "type-testing";


test.each(tExtend)('wasm-converstion %#', ({
  a,
  extend_i32_u,
  extend_i32_s,
  a_binary,
  extend_i32_u_binary64,
  extend_i32_s_binary64,
}) => {
  expect(a).toBe(twosComplementToNumber(a_binary))
  expect(a_binary).toBe(numberToTwosComplement(a))

  expect(extend_i32_u).toBe(twosComplementToBigInt(extend_i32_u_binary64))
  expect(extend_i32_u_binary64).toBe(bigIntToTwosComplement(extend_i32_u))
  expect(wasmConversion.extend_i32_u(a)).toBe(extend_i32_u)

  expect(extend_i32_s).toBe(twosComplementToBigInt(extend_i32_s_binary64))
  expect(extend_i32_s_binary64).toBe(bigIntToTwosComplement(extend_i32_s))
  expect(wasmConversion.extend_i32_s(a)).toBe(extend_i32_s)
});

type i = 4
type a = TExtend[i]['a']        // =>
type ab = TExtend[i]['a_binary']// =>

type eu = TExtend[i]['extend_i32_u']// =>
type xu = I64ExtendI32UDecimal<a>          // =>
type eub = TExtend[i]['extend_i32_u_binary64']// =>
type xub = I64ExtendI32UBinary64<ab>          // =>

type es = TExtend[i]['extend_i32_s']// =>
type xs = I64ExtendI32SDecimal<a>          // =>
type esb = TExtend[i]['extend_i32_s_binary64']// =>
type xsb = I64ExtendI32SBinary64<ab>          // =>

type tests = [
  Expect<Equal<I64ExtendI32UBinary64<TExtend[0]['a_binary']>, TExtend[0]['extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[1]['a_binary']>, TExtend[1]['extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[2]['a_binary']>, TExtend[2]['extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[3]['a_binary']>, TExtend[3]['extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[4]['a_binary']>, TExtend[4]['extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[5]['a_binary']>, TExtend[5]['extend_i32_u_binary64']>>,

  Expect<Equal<I64ExtendI32UDecimal<TExtend[0]['a']>, TExtend[0]['extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[1]['a']>, TExtend[1]['extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[2]['a']>, TExtend[2]['extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[3]['a']>, TExtend[3]['extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[4]['a']>, TExtend[4]['extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[5]['a']>, TExtend[5]['extend_i32_u']>>,

  Expect<Equal<I64ExtendI32SBinary64<TExtend[0]['a_binary']>, TExtend[0]['extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[1]['a_binary']>, TExtend[1]['extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[2]['a_binary']>, TExtend[2]['extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[3]['a_binary']>, TExtend[3]['extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[4]['a_binary']>, TExtend[4]['extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[5]['a_binary']>, TExtend[5]['extend_i32_s_binary64']>>,

  Expect<Equal<I64ExtendI32SDecimal<TExtend[0]['a']>, TExtend[0]['extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[1]['a']>, TExtend[1]['extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[2]['a']>, TExtend[2]['extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[3]['a']>, TExtend[3]['extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[4]['a']>, TExtend[4]['extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[5]['a']>, TExtend[5]['extend_i32_s']>>,

  Expect<Equal<TExtend['length'], 6>>,
]