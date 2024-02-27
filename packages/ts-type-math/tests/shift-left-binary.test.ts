import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft, ShiftLeftBinaryO } from '../shift';
import { t, T } from '../test-cases/bitwise-shift';
import { twosComplementToNumber, numberToTwosComplement } from '../test-utils';

//----------------------------------------------------------------------
// SHIFT LEFT UNSIGNED
// https://developer.mozila.org/en-US/docs/WebAssembly/Reference/Numeric/Left_shift

test.each(t)('$a_binary << $b_binary === $shl_binary', ({
  a,
  b,
  shl,
  a_binary,
  b_binary,
  shl_binary,
}) => {
  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(numberToTwosComplement(a)).toBe(a_binary);

  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(numberToTwosComplement(b)).toBe(b_binary);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);
  
  expect(twosComplementToNumber(shl_binary)).toBe(shl);
  expect(numberToTwosComplement(shl)).toBe(shl_binary);

  expect(
    twosComplementToNumber(a_binary) << twosComplementToNumber(b_binary)
  ).toBe(twosComplementToNumber(shl_binary));
});

type i = 2
type a = T[i]['a']      // =>
type b = T[i]['b']      // =>
type e = T[i]['shl']    // =>
type x = ShiftLeft<a, b>// =>

type test = [
  Expect<Equal<ShiftLeftBinaryO<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[10]['a_binary'], T[10]['b_binary']>, T[10]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[11]['a_binary'], T[11]['b_binary']>, T[11]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[12]['a_binary'], T[12]['b_binary']>, T[12]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[13]['a_binary'], T[13]['b_binary']>, T[13]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[14]['a_binary'], T[14]['b_binary']>, T[14]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[15]['a_binary'], T[15]['b_binary']>, T[15]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[16]['a_binary'], T[16]['b_binary']>, T[16]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[17]['a_binary'], T[17]['b_binary']>, T[17]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[18]['a_binary'], T[18]['b_binary']>, T[18]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[19]['a_binary'], T[19]['b_binary']>, T[19]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[20]['a_binary'], T[20]['b_binary']>, T[20]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[21]['a_binary'], T[21]['b_binary']>, T[21]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[22]['a_binary'], T[22]['b_binary']>, T[22]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[23]['a_binary'], T[23]['b_binary']>, T[23]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[24]['a_binary'], T[24]['b_binary']>, T[24]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[25]['a_binary'], T[25]['b_binary']>, T[25]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[26]['a_binary'], T[26]['b_binary']>, T[26]['shl_binary']>>,
  Expect<Equal<ShiftLeftBinaryO<T[27]['a_binary'], T[27]['b_binary']>, T[27]['shl_binary']>>,

  Expect<Equal<T['length'], 28>>,
]
