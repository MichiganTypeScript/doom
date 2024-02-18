import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft } from './shift';
import { t, T } from './test-cases/shift-left';

//----------------------------------------------------------------------
// SHIFT LEFT UNSIGNED
// https://developer.mozila.org/en-US/docs/WebAssembly/Reference/Numeric/Left_shift

test.each(t)('$a << $b === $e', ({
  a,
  b,
  e,
}) => {
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);
  expect(a << b).toBe(e);
});

type i = 2
type a = T[i]['a']// =>
type b = T[i]['b']// =>
type e = T[i]['e']// =>
type x = ShiftLeft<a, b> // =>

type test = [
  Expect<Equal<ShiftLeft<T[ 0]['a'], T[ 0]['b']>, T[ 0]['e']>>,
  Expect<Equal<ShiftLeft<T[ 1]['a'], T[ 1]['b']>, T[ 1]['e']>>,
  Expect<Equal<ShiftLeft<T[ 2]['a'], T[ 2]['b']>, T[ 2]['e']>>,
  Expect<Equal<ShiftLeft<T[ 3]['a'], T[ 3]['b']>, T[ 3]['e']>>,
  Expect<Equal<ShiftLeft<T[ 4]['a'], T[ 4]['b']>, T[ 4]['e']>>,
  Expect<Equal<ShiftLeft<T[ 5]['a'], T[ 5]['b']>, T[ 5]['e']>>,
  Expect<Equal<ShiftLeft<T[ 6]['a'], T[ 6]['b']>, T[ 6]['e']>>,
  Expect<Equal<ShiftLeft<T[ 7]['a'], T[ 7]['b']>, T[ 7]['e']>>,
  Expect<Equal<ShiftLeft<T[ 8]['a'], T[ 8]['b']>, T[ 8]['e']>>,
  Expect<Equal<ShiftLeft<T[ 9]['a'], T[ 9]['b']>, T[ 9]['e']>>,
  Expect<Equal<ShiftLeft<T[10]['a'], T[10]['b']>, T[10]['e']>>,
  Expect<Equal<ShiftLeft<T[11]['a'], T[11]['b']>, T[11]['e']>>,
  Expect<Equal<ShiftLeft<T[12]['a'], T[12]['b']>, T[12]['e']>>,

  Expect<Equal<T['length'], 13>>,
]
