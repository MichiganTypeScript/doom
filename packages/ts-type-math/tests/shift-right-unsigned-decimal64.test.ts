import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRightBigInt } from '../shift';
import { t, T } from '../test-cases/bitwise-shift-i64';
import { bitwiseBigInt } from '../test-utils';

test.each(t)('$a >>> $b === $shr_u', ({
  a,
  b,
  shr_u,
}) => {
  expect(bitwiseBigInt.shr_u(a, b)).toBe(shr_u);
});

type i = 28
type a = T[i]['a']                    // =>
type b = T[i]['b']                    // =>
type e = T[i]['shr_u']                // =>
type x = ShiftRightBigInt<a, b, false>// =>

type test = [
  Expect<Equal<ShiftRightBigInt<T[ 0]['a'], T[ 0]['b'], false>, T[ 0]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 1]['a'], T[ 1]['b'], false>, T[ 1]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 2]['a'], T[ 2]['b'], false>, T[ 2]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 3]['a'], T[ 3]['b'], false>, T[ 3]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 4]['a'], T[ 4]['b'], false>, T[ 4]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 5]['a'], T[ 5]['b'], false>, T[ 5]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 6]['a'], T[ 6]['b'], false>, T[ 6]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 7]['a'], T[ 7]['b'], false>, T[ 7]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 8]['a'], T[ 8]['b'], false>, T[ 8]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[ 9]['a'], T[ 9]['b'], false>, T[ 9]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[10]['a'], T[10]['b'], false>, T[10]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[11]['a'], T[11]['b'], false>, T[11]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[12]['a'], T[12]['b'], false>, T[12]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[13]['a'], T[13]['b'], false>, T[13]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[14]['a'], T[14]['b'], false>, T[14]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[15]['a'], T[15]['b'], false>, T[15]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[16]['a'], T[16]['b'], false>, T[16]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[17]['a'], T[17]['b'], false>, T[17]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[18]['a'], T[18]['b'], false>, T[18]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[19]['a'], T[19]['b'], false>, T[19]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[20]['a'], T[20]['b'], false>, T[20]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[21]['a'], T[21]['b'], false>, T[21]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[22]['a'], T[22]['b'], false>, T[22]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[23]['a'], T[23]['b'], false>, T[23]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[24]['a'], T[24]['b'], false>, T[24]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[25]['a'], T[25]['b'], false>, T[25]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[26]['a'], T[26]['b'], false>, T[26]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[27]['a'], T[27]['b'], false>, T[27]['shr_u']>>,
  Expect<Equal<ShiftRightBigInt<T[28]['a'], T[28]['b'], false>, T[28]['shr_u']>>,

  Expect<Equal<T['length'], 29>>,
]
