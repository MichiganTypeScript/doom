import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft, ShiftLeftBinary } from './shift';
import { t, T } from './test-cases/shift-left';
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from './test-utils';

//----------------------------------------------------------------------
// SHIFT LEFT UNSIGNED
// https://developer.mozila.org/en-US/docs/WebAssembly/Reference/Numeric/Left_shift

test.each(t)('$a_binary << $b_binary === $e_binary', ({
  a,
  b,
  e,
  a_binary,
  b_binary,
  e_binary,
}) => {
  expect(binaryTwosComplementToNumber(a_binary)).toBe(a);
  expect(numberToTwosComplementBinary(a)).toBe(a_binary);

  expect(binaryTwosComplementToNumber(a_binary)).toBe(a);
  expect(numberToTwosComplementBinary(b)).toBe(b_binary);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);
  
  expect(binaryTwosComplementToNumber(e_binary)).toBe(e);
  expect(numberToTwosComplementBinary(e)).toBe(e_binary);

  expect(
    binaryTwosComplementToNumber(a_binary) << binaryTwosComplementToNumber(b_binary)
  ).toBe(binaryTwosComplementToNumber(e_binary));
});

type i = 2
type a = T[i]['a']// =>
type b = T[i]['b']// =>
type e = T[i]['e']// =>
type x = ShiftLeft<a, b> // =>

type test = [
  Expect<Equal<ShiftLeftBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['e_binary']>>,

  Expect<Equal<T['length'], 13>>,
]
