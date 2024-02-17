import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRight, ShiftRightBinary } from './shift';
import { t, T } from './test-cases/binary-shift-right-signed';

//----------------------------------------------------------------------
// SHIFT RIGHT SIGNED
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift

test.each(t)('$a >> $b === $expected', ({
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

  // the extra `>>> 0` is to convert the result to an unsigned 32-bit integer
  // just as a matter of convenience, we treat all numbers as unsigned 32-bit integers
  expect((a >> b) >>> 0).toBe(expected);
});

type sRsLen = T['length'] // =>
type iRs  = 14
type bRs  = T[iRs]['b']                        // =>

type abRs = T[iRs]['a_binary']                 // =>
type rbRs = ShiftRightBinary<abRs, bRs, false> // =>
type ebRs = T[iRs]['e_binary']                 // =>

type aRs  = T[iRs]['a']                        // =>
type rRs  = ShiftRight<aRs, bRs, false>        // =>
type yRs  = T[iRs]['expected']                 // =>

type test = [
  Expect<Equal<T['length'], 28>>,

  Expect<Equal<ShiftRightBinary<T[ 0]['a_binary'], T[ 0]['b'], true>, T[ 0]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 1]['a_binary'], T[ 1]['b'], true>, T[ 1]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 2]['a_binary'], T[ 2]['b'], true>, T[ 2]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 3]['a_binary'], T[ 3]['b'], true>, T[ 3]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 4]['a_binary'], T[ 4]['b'], true>, T[ 4]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 5]['a_binary'], T[ 5]['b'], true>, T[ 5]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 6]['a_binary'], T[ 6]['b'], true>, T[ 6]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 7]['a_binary'], T[ 7]['b'], true>, T[ 7]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 8]['a_binary'], T[ 8]['b'], true>, T[ 8]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 9]['a_binary'], T[ 9]['b'], true>, T[ 9]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[10]['a_binary'], T[10]['b'], true>, T[10]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[11]['a_binary'], T[11]['b'], true>, T[11]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[12]['a_binary'], T[12]['b'], true>, T[12]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[13]['a_binary'], T[13]['b'], true>, T[13]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[14]['a_binary'], T[14]['b'], true>, T[14]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[15]['a_binary'], T[15]['b'], true>, T[15]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[16]['a_binary'], T[16]['b'], true>, T[16]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[17]['a_binary'], T[17]['b'], true>, T[17]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[18]['a_binary'], T[18]['b'], true>, T[18]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[19]['a_binary'], T[19]['b'], true>, T[19]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[20]['a_binary'], T[20]['b'], true>, T[20]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[21]['a_binary'], T[21]['b'], true>, T[21]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[22]['a_binary'], T[22]['b'], true>, T[22]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[23]['a_binary'], T[23]['b'], true>, T[23]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[24]['a_binary'], T[24]['b'], true>, T[24]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[25]['a_binary'], T[25]['b'], true>, T[25]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[26]['a_binary'], T[26]['b'], true>, T[26]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[27]['a_binary'], T[27]['b'], true>, T[27]['e_binary']>>,

  Expect<Equal<ShiftRight<T[ 0]['a'], T[ 0]['b'], true>, T[ 0]['expected']>>,
  Expect<Equal<ShiftRight<T[ 1]['a'], T[ 1]['b'], true>, T[ 1]['expected']>>,
  Expect<Equal<ShiftRight<T[ 2]['a'], T[ 2]['b'], true>, T[ 2]['expected']>>,
  Expect<Equal<ShiftRight<T[ 3]['a'], T[ 3]['b'], true>, T[ 3]['expected']>>,
  Expect<Equal<ShiftRight<T[ 4]['a'], T[ 4]['b'], true>, T[ 4]['expected']>>,
  Expect<Equal<ShiftRight<T[ 5]['a'], T[ 5]['b'], true>, T[ 5]['expected']>>,
  Expect<Equal<ShiftRight<T[ 6]['a'], T[ 6]['b'], true>, T[ 6]['expected']>>,
  Expect<Equal<ShiftRight<T[ 7]['a'], T[ 7]['b'], true>, T[ 7]['expected']>>,
  Expect<Equal<ShiftRight<T[ 8]['a'], T[ 8]['b'], true>, T[ 8]['expected']>>,
  Expect<Equal<ShiftRight<T[ 9]['a'], T[ 9]['b'], true>, T[ 9]['expected']>>,
  Expect<Equal<ShiftRight<T[10]['a'], T[10]['b'], true>, T[10]['expected']>>,
  Expect<Equal<ShiftRight<T[11]['a'], T[11]['b'], true>, T[11]['expected']>>,
  Expect<Equal<ShiftRight<T[12]['a'], T[12]['b'], true>, T[12]['expected']>>,
  Expect<Equal<ShiftRight<T[13]['a'], T[13]['b'], true>, T[13]['expected']>>,
  Expect<Equal<ShiftRight<T[14]['a'], T[14]['b'], true>, T[14]['expected']>>,
  Expect<Equal<ShiftRight<T[15]['a'], T[15]['b'], true>, T[15]['expected']>>,
  Expect<Equal<ShiftRight<T[16]['a'], T[16]['b'], true>, T[16]['expected']>>,
  Expect<Equal<ShiftRight<T[17]['a'], T[17]['b'], true>, T[17]['expected']>>,
  Expect<Equal<ShiftRight<T[18]['a'], T[18]['b'], true>, T[18]['expected']>>,
  Expect<Equal<ShiftRight<T[19]['a'], T[19]['b'], true>, T[19]['expected']>>,
  Expect<Equal<ShiftRight<T[20]['a'], T[20]['b'], true>, T[20]['expected']>>,
  Expect<Equal<ShiftRight<T[21]['a'], T[21]['b'], true>, T[21]['expected']>>,
  Expect<Equal<ShiftRight<T[22]['a'], T[22]['b'], true>, T[22]['expected']>>,
  Expect<Equal<ShiftRight<T[23]['a'], T[23]['b'], true>, T[23]['expected']>>,
  Expect<Equal<ShiftRight<T[24]['a'], T[24]['b'], true>, T[24]['expected']>>,
  Expect<Equal<ShiftRight<T[25]['a'], T[25]['b'], true>, T[25]['expected']>>,
  Expect<Equal<ShiftRight<T[26]['a'], T[26]['b'], true>, T[26]['expected']>>,
  Expect<Equal<ShiftRight<T[27]['a'], T[27]['b'], true>, T[27]['expected']>>,
]