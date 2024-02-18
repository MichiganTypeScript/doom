import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRight } from './shift';
import { t, T } from './test-cases/shift-right-signed';

//----------------------------------------------------------------------
// SHIFT RIGHT SIGNED
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift

test.each(t)('$a >> $b === $e', ({
  a,
  b,
  e,
}) => {
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);

  expect(a >> b).toBe(e);
});

type i  = 14
type a  = T[i]['a']// =>
type b  = T[i]['b']// =>
type e  = T[i]['e']// =>
type xb = ShiftRight<a, b, true> // =>

type test = [
  Expect<Equal<ShiftRight<T[ 0]['a'], T[ 0]['b'], true>, T[ 0]['e']>>,
  Expect<Equal<ShiftRight<T[ 1]['a'], T[ 1]['b'], true>, T[ 1]['e']>>,
  Expect<Equal<ShiftRight<T[ 2]['a'], T[ 2]['b'], true>, T[ 2]['e']>>,
  Expect<Equal<ShiftRight<T[ 3]['a'], T[ 3]['b'], true>, T[ 3]['e']>>,
  Expect<Equal<ShiftRight<T[ 4]['a'], T[ 4]['b'], true>, T[ 4]['e']>>,
  Expect<Equal<ShiftRight<T[ 5]['a'], T[ 5]['b'], true>, T[ 5]['e']>>,
  Expect<Equal<ShiftRight<T[ 6]['a'], T[ 6]['b'], true>, T[ 6]['e']>>,
  Expect<Equal<ShiftRight<T[ 7]['a'], T[ 7]['b'], true>, T[ 7]['e']>>,
  Expect<Equal<ShiftRight<T[ 8]['a'], T[ 8]['b'], true>, T[ 8]['e']>>,
  Expect<Equal<ShiftRight<T[ 9]['a'], T[ 9]['b'], true>, T[ 9]['e']>>,
  Expect<Equal<ShiftRight<T[10]['a'], T[10]['b'], true>, T[10]['e']>>,
  Expect<Equal<ShiftRight<T[11]['a'], T[11]['b'], true>, T[11]['e']>>,
  Expect<Equal<ShiftRight<T[12]['a'], T[12]['b'], true>, T[12]['e']>>,
  Expect<Equal<ShiftRight<T[13]['a'], T[13]['b'], true>, T[13]['e']>>,
  Expect<Equal<ShiftRight<T[14]['a'], T[14]['b'], true>, T[14]['e']>>,
  Expect<Equal<ShiftRight<T[15]['a'], T[15]['b'], true>, T[15]['e']>>,
  Expect<Equal<ShiftRight<T[16]['a'], T[16]['b'], true>, T[16]['e']>>,
  Expect<Equal<ShiftRight<T[17]['a'], T[17]['b'], true>, T[17]['e']>>,
  Expect<Equal<ShiftRight<T[18]['a'], T[18]['b'], true>, T[18]['e']>>,
  Expect<Equal<ShiftRight<T[19]['a'], T[19]['b'], true>, T[19]['e']>>,
  Expect<Equal<ShiftRight<T[20]['a'], T[20]['b'], true>, T[20]['e']>>,
  Expect<Equal<ShiftRight<T[21]['a'], T[21]['b'], true>, T[21]['e']>>,
  Expect<Equal<ShiftRight<T[22]['a'], T[22]['b'], true>, T[22]['e']>>,
  Expect<Equal<ShiftRight<T[23]['a'], T[23]['b'], true>, T[23]['e']>>,
  Expect<Equal<ShiftRight<T[24]['a'], T[24]['b'], true>, T[24]['e']>>,
  Expect<Equal<ShiftRight<T[25]['a'], T[25]['b'], true>, T[25]['e']>>,
  Expect<Equal<ShiftRight<T[26]['a'], T[26]['b'], true>, T[26]['e']>>,
  Expect<Equal<ShiftRight<T[27]['a'], T[27]['b'], true>, T[27]['e']>>,

  Expect<Equal<T['length'], 28>>,
]