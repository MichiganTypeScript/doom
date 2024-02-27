import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeftBinary64 } from '../shift';
import { t, T } from '../test-cases/bitwise-shift-i64';
import { twosComplementToBigInt, bigIntToTwosComplement, bitwiseBigInt } from '../test-utils';

test.each(t)('$a_binary64 << $b_binary64 === $shl_binary64', ({
  a,
  b,
  shl,
  a_binary64,
  b_binary64,
  shl_binary64,
}) => {
  const aBig = twosComplementToBigInt(a_binary64);
  expect(aBig).toBe(a);
  expect(bigIntToTwosComplement(a)).toBe(a_binary64);

  const bBig = twosComplementToBigInt(b_binary64);
  expect(bBig).toBe(b);
  expect(bigIntToTwosComplement(b)).toBe(b_binary64);

  expect(b).toBeGreaterThanOrEqual(0n);
  expect(b).toBeLessThanOrEqual(64n);
  
  const shlBig = twosComplementToBigInt(shl_binary64);
  expect(shlBig).toBe(shl);
  expect(bigIntToTwosComplement(shl)).toBe(shl_binary64);

  expect(bitwiseBigInt.shl(aBig, bBig)).toBe(shlBig);
});

type i = 28
type a = T[i]['a_binary64']     // =>
type b = T[i]['b_binary64']     // =>
type e = T[i]['shl_binary64']   // =>
type x = ShiftLeftBinary64<a, b>// =>

type test = [
  Expect<Equal<ShiftLeftBinary64<T[ 0]['a_binary64'], T[ 0]['b_binary64']>, T[ 0]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 1]['a_binary64'], T[ 1]['b_binary64']>, T[ 1]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 2]['a_binary64'], T[ 2]['b_binary64']>, T[ 2]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 3]['a_binary64'], T[ 3]['b_binary64']>, T[ 3]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 4]['a_binary64'], T[ 4]['b_binary64']>, T[ 4]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 5]['a_binary64'], T[ 5]['b_binary64']>, T[ 5]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 6]['a_binary64'], T[ 6]['b_binary64']>, T[ 6]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 7]['a_binary64'], T[ 7]['b_binary64']>, T[ 7]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 8]['a_binary64'], T[ 8]['b_binary64']>, T[ 8]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[ 9]['a_binary64'], T[ 9]['b_binary64']>, T[ 9]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[10]['a_binary64'], T[10]['b_binary64']>, T[10]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[11]['a_binary64'], T[11]['b_binary64']>, T[11]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[12]['a_binary64'], T[12]['b_binary64']>, T[12]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[13]['a_binary64'], T[13]['b_binary64']>, T[13]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[14]['a_binary64'], T[14]['b_binary64']>, T[14]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[15]['a_binary64'], T[15]['b_binary64']>, T[15]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[16]['a_binary64'], T[16]['b_binary64']>, T[16]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[17]['a_binary64'], T[17]['b_binary64']>, T[17]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[18]['a_binary64'], T[18]['b_binary64']>, T[18]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[19]['a_binary64'], T[19]['b_binary64']>, T[19]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[20]['a_binary64'], T[20]['b_binary64']>, T[20]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[21]['a_binary64'], T[21]['b_binary64']>, T[21]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[22]['a_binary64'], T[22]['b_binary64']>, T[22]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[23]['a_binary64'], T[23]['b_binary64']>, T[23]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[24]['a_binary64'], T[24]['b_binary64']>, T[24]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[25]['a_binary64'], T[25]['b_binary64']>, T[25]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[26]['a_binary64'], T[26]['b_binary64']>, T[26]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[27]['a_binary64'], T[27]['b_binary64']>, T[27]['shl_binary64']>>,
  Expect<Equal<ShiftLeftBinary64<T[28]['a_binary64'], T[28]['b_binary64']>, T[28]['shl_binary64']>>,

  Expect<Equal<T['length'], 29>>,
]
