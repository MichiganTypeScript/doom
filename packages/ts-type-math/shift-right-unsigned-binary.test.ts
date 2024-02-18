import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRightBinary } from './shift';
import { t, T } from './test-cases/shift-right-unsigned';
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from './test-utils';

//----------------------------------------------------------------------
// SHIFT RIGHT UNSIGNED
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift

test.each(t)('$a >>> $b === $e', ({
  a,
  b,
  e,
  a_binary,
  b_binary,
  e_binary,
}) => {
  expect(numberToTwosComplementBinary(a)).toBe(a_binary);
  expect(numberToTwosComplementBinary(b)).toBe(b_binary);
  expect(numberToTwosComplementBinary(e)).toBe(e_binary);

  const expected = binaryTwosComplementToNumber(a_binary) >>> binaryTwosComplementToNumber(b_binary)
  expect(expected).toBe(binaryTwosComplementToNumber(e_binary) >>> 0);
});

type i  = 15
type a  = T[i]['a']// =>
type b  = T[i]['b']// =>
type e  = T[i]['e']// =>
type ab = T[i]['a_binary']// =>
type bb = T[i]['b_binary']// =>
type eb = T[i]['e_binary']// =>
type xb = ShiftRightBinary<ab, bb, false> // =>

type testT = [
  Expect<Equal<ShiftRightBinary<T[ 0]['a_binary'], T[ 0]['b_binary'], false>, T[ 0]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 1]['a_binary'], T[ 1]['b_binary'], false>, T[ 1]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 2]['a_binary'], T[ 2]['b_binary'], false>, T[ 2]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 3]['a_binary'], T[ 3]['b_binary'], false>, T[ 3]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 4]['a_binary'], T[ 4]['b_binary'], false>, T[ 4]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 5]['a_binary'], T[ 5]['b_binary'], false>, T[ 5]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 6]['a_binary'], T[ 6]['b_binary'], false>, T[ 6]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 7]['a_binary'], T[ 7]['b_binary'], false>, T[ 7]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 8]['a_binary'], T[ 8]['b_binary'], false>, T[ 8]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 9]['a_binary'], T[ 9]['b_binary'], false>, T[ 9]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[10]['a_binary'], T[10]['b_binary'], false>, T[10]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[11]['a_binary'], T[11]['b_binary'], false>, T[11]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[12]['a_binary'], T[12]['b_binary'], false>, T[12]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[13]['a_binary'], T[13]['b_binary'], false>, T[13]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[14]['a_binary'], T[14]['b_binary'], false>, T[14]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[15]['a_binary'], T[15]['b_binary'], false>, T[15]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[16]['a_binary'], T[16]['b_binary'], false>, T[16]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[17]['a_binary'], T[17]['b_binary'], false>, T[17]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[18]['a_binary'], T[18]['b_binary'], false>, T[18]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[19]['a_binary'], T[19]['b_binary'], false>, T[19]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[20]['a_binary'], T[20]['b_binary'], false>, T[20]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[21]['a_binary'], T[21]['b_binary'], false>, T[21]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[22]['a_binary'], T[22]['b_binary'], false>, T[22]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[23]['a_binary'], T[23]['b_binary'], false>, T[23]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[24]['a_binary'], T[24]['b_binary'], false>, T[24]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[25]['a_binary'], T[25]['b_binary'], false>, T[25]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[26]['a_binary'], T[26]['b_binary'], false>, T[26]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<T[27]['a_binary'], T[27]['b_binary'], false>, T[27]['e_binary']>>,

  Expect<Equal<T['length'], 28>>,
]
