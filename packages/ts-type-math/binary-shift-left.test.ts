import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft, ShiftLeftBinary } from './shift';
import { t, T } from './test-cases/binary-shift-left';

//----------------------------------------------------------------------
// SHIFT LEFT UNSIGNED
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/Left_shift

test.each(t)('$a << $b === $expected', ({
  a,
  b,
  expected,
  a_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);

  expect(Number.isInteger(expected)).toBe(true);
  expect(expected).toBe(+`0b${e_binary}`);

  expect(a << b).toBe(expected);
});

type iL = 2;
type xL = ShiftLeft<T[iL]['a'], T[iL]['b']> // =>
type yL = T[iL]['expected'];                 // =>

type test = [
  Expect<Equal<T['length'], 13>>,

  Expect<Equal<ShiftLeftBinary<T[ 0]['a_binary'], T[ 0]['b']>, T[ 0]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 1]['a_binary'], T[ 1]['b']>, T[ 1]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 2]['a_binary'], T[ 2]['b']>, T[ 2]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 3]['a_binary'], T[ 3]['b']>, T[ 3]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 4]['a_binary'], T[ 4]['b']>, T[ 4]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 5]['a_binary'], T[ 5]['b']>, T[ 5]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 6]['a_binary'], T[ 6]['b']>, T[ 6]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 7]['a_binary'], T[ 7]['b']>, T[ 7]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 8]['a_binary'], T[ 8]['b']>, T[ 8]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[ 9]['a_binary'], T[ 9]['b']>, T[ 9]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[10]['a_binary'], T[10]['b']>, T[10]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[11]['a_binary'], T[11]['b']>, T[11]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<T[12]['a_binary'], T[12]['b']>, T[12]['e_binary']>>,

  Expect<Equal<ShiftLeft<T[ 0]['a'], T[ 0]['b']>, T[ 0]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 1]['a'], T[ 1]['b']>, T[ 1]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 2]['a'], T[ 2]['b']>, T[ 2]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 3]['a'], T[ 3]['b']>, T[ 3]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 4]['a'], T[ 4]['b']>, T[ 4]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 5]['a'], T[ 5]['b']>, T[ 5]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 6]['a'], T[ 6]['b']>, T[ 6]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 7]['a'], T[ 7]['b']>, T[ 7]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 8]['a'], T[ 8]['b']>, T[ 8]['expected']>>,
  Expect<Equal<ShiftLeft<T[ 9]['a'], T[ 9]['b']>, T[ 9]['expected']>>,
  Expect<Equal<ShiftLeft<T[10]['a'], T[10]['b']>, T[10]['expected']>>,
  Expect<Equal<ShiftLeft<T[11]['a'], T[11]['b']>, T[11]['expected']>>,
  Expect<Equal<ShiftLeft<T[12]['a'], T[12]['b']>, T[12]['expected']>>,
]
