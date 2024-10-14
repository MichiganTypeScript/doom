import { expect, test } from "vitest";
import { TExtend, tExtend } from "../test-cases/wasm-conversion";
import { bigIntToTwosComplement, numberToTwosComplement, twosComplementToBigInt, twosComplementToNumber, wasmConversion } from "../test-utils";
import { I64ExtendI32SDecimal, I64ExtendI32SBinary64, I64ExtendI32UDecimal, I64ExtendI32UBinary64, I32Extend16SDecimal, I32Extend16SBinary32 } from "../wasm-conversion";
import { Equal, Expect } from "type-testing";


test.each(tExtend)('wasm-converstion %#', ({
  a,
  i32extend16_s,
  i64extend_i32_u,
  i64extend_i32_s,
  a_binary,
  i32extend16_s_binary,
  i64extend_i32_u_binary64,
  i64extend_i32_s_binary64,
}) => {
  expect(a).toBe(twosComplementToNumber(a_binary))
  expect(a_binary).toBe(numberToTwosComplement(a))

  expect(i32extend16_s).toBe(twosComplementToNumber(i32extend16_s_binary))
  expect(i32extend16_s_binary).toBe(numberToTwosComplement(i32extend16_s))
  expect(wasmConversion.i32extend16_s(a)).toBe(i32extend16_s)
  
  expect(i64extend_i32_s).toBe(twosComplementToBigInt(i64extend_i32_s_binary64))
  expect(i64extend_i32_s_binary64).toBe(bigIntToTwosComplement(i64extend_i32_s))
  expect(wasmConversion.i64extend_i32_s(a)).toBe(i64extend_i32_s)

  expect(i64extend_i32_u).toBe(twosComplementToBigInt(i64extend_i32_u_binary64))
  expect(i64extend_i32_u_binary64).toBe(bigIntToTwosComplement(i64extend_i32_u))
  expect(wasmConversion.i64extend_i32_u(a)).toBe(i64extend_i32_u)
});

type i = 3
type a = TExtend[i]['a']        // =>
type ab = TExtend[i]['a_binary']// =>

type e3s = TExtend[i]['i32extend16_s']         // =>
type x3s = I32Extend16SDecimal<a>              // =>
type e3sb = TExtend[i]['i32extend16_s_binary']// =>
type x3sb = I32Extend16SBinary32<ab>          // =>

type eu = TExtend[i]['i64extend_i32_u']           // =>
type xu = I64ExtendI32UDecimal<a>                 // =>
type eub = TExtend[i]['i64extend_i32_u_binary64']// =>
type xub = I64ExtendI32UBinary64<ab>             // =>

type es = TExtend[i]['i64extend_i32_s']           // =>
type xs = I64ExtendI32SDecimal<a>                 // =>
type esb = TExtend[i]['i64extend_i32_s_binary64']// =>
type xsb = I64ExtendI32SBinary64<ab>             // =>

type tests = [
  Expect<Equal<I32Extend16SBinary32<TExtend[0]['a_binary']>, TExtend[0]['i32extend16_s_binary']>>,
  Expect<Equal<I32Extend16SBinary32<TExtend[1]['a_binary']>, TExtend[1]['i32extend16_s_binary']>>,
  Expect<Equal<I32Extend16SBinary32<TExtend[2]['a_binary']>, TExtend[2]['i32extend16_s_binary']>>,
  Expect<Equal<I32Extend16SBinary32<TExtend[3]['a_binary']>, TExtend[3]['i32extend16_s_binary']>>,
  Expect<Equal<I32Extend16SBinary32<TExtend[4]['a_binary']>, TExtend[4]['i32extend16_s_binary']>>,
  Expect<Equal<I32Extend16SBinary32<TExtend[5]['a_binary']>, TExtend[5]['i32extend16_s_binary']>>,

  Expect<Equal<I32Extend16SDecimal<TExtend[0]['a']>, TExtend[0]['i32extend16_s']>>,
  Expect<Equal<I32Extend16SDecimal<TExtend[1]['a']>, TExtend[1]['i32extend16_s']>>,
  Expect<Equal<I32Extend16SDecimal<TExtend[2]['a']>, TExtend[2]['i32extend16_s']>>,
  Expect<Equal<I32Extend16SDecimal<TExtend[3]['a']>, TExtend[3]['i32extend16_s']>>,
  Expect<Equal<I32Extend16SDecimal<TExtend[4]['a']>, TExtend[4]['i32extend16_s']>>,
  Expect<Equal<I32Extend16SDecimal<TExtend[5]['a']>, TExtend[5]['i32extend16_s']>>,

  Expect<Equal<I64ExtendI32UBinary64<TExtend[0]['a_binary']>, TExtend[0]['i64extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[1]['a_binary']>, TExtend[1]['i64extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[2]['a_binary']>, TExtend[2]['i64extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[3]['a_binary']>, TExtend[3]['i64extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[4]['a_binary']>, TExtend[4]['i64extend_i32_u_binary64']>>,
  Expect<Equal<I64ExtendI32UBinary64<TExtend[5]['a_binary']>, TExtend[5]['i64extend_i32_u_binary64']>>,

  Expect<Equal<I64ExtendI32UDecimal<TExtend[0]['a']>, TExtend[0]['i64extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[1]['a']>, TExtend[1]['i64extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[2]['a']>, TExtend[2]['i64extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[3]['a']>, TExtend[3]['i64extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[4]['a']>, TExtend[4]['i64extend_i32_u']>>,
  Expect<Equal<I64ExtendI32UDecimal<TExtend[5]['a']>, TExtend[5]['i64extend_i32_u']>>,

  Expect<Equal<I64ExtendI32SBinary64<TExtend[0]['a_binary']>, TExtend[0]['i64extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[1]['a_binary']>, TExtend[1]['i64extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[2]['a_binary']>, TExtend[2]['i64extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[3]['a_binary']>, TExtend[3]['i64extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[4]['a_binary']>, TExtend[4]['i64extend_i32_s_binary64']>>,
  Expect<Equal<I64ExtendI32SBinary64<TExtend[5]['a_binary']>, TExtend[5]['i64extend_i32_s_binary64']>>,

  Expect<Equal<I64ExtendI32SDecimal<TExtend[0]['a']>, TExtend[0]['i64extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[1]['a']>, TExtend[1]['i64extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[2]['a']>, TExtend[2]['i64extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[3]['a']>, TExtend[3]['i64extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[4]['a']>, TExtend[4]['i64extend_i32_s']>>,
  Expect<Equal<I64ExtendI32SDecimal<TExtend[5]['a']>, TExtend[5]['i64extend_i32_s']>>,

  Expect<Equal<TExtend['length'], 6>>,
]