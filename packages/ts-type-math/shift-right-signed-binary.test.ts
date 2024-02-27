import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRight, ShiftRightBinary } from './shift';
import { t, T } from './test-cases/bitwise-shift';
import { twosComplementToNumber, numberToTwosComplement } from './test-utils';

//----------------------------------------------------------------------
// SHIFT RIGHT SIGNED
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift

test.each(t)('$a_binary >> $b_binary === $shr_s_binary', ({
  a,
  b,
  shr_s,
  a_binary,
  b_binary,
  shr_s_binary,
}) => {
  expect(numberToTwosComplement(a)).toBe(a_binary);
  expect(numberToTwosComplement(b)).toBe(b_binary);
  expect(numberToTwosComplement(shr_s)).toBe(shr_s_binary);

  const expected = twosComplementToNumber(a_binary) >> twosComplementToNumber(b_binary);
  expect(expected).toBe(twosComplementToNumber(shr_s_binary));
});

type i  = 14
type a  = T[i]['a']    // =>
type b  = T[i]['b']    // =>
type e  = T[i]['shr_s']// =>
type ab = T[i]['a_binary']// =>
type bb = T[i]['b_binary']// =>
type eb = T[i]['shr_s_binary']// =>
type xb = ShiftRightBinary<ab, bb, false> // =>

type test = [
  Expect<Equal<ShiftRightBinary<T[ 0]['a_binary'], T[ 0]['b_binary'], true>, T[ 0]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 1]['a_binary'], T[ 1]['b_binary'], true>, T[ 1]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 2]['a_binary'], T[ 2]['b_binary'], true>, T[ 2]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 3]['a_binary'], T[ 3]['b_binary'], true>, T[ 3]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 4]['a_binary'], T[ 4]['b_binary'], true>, T[ 4]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 5]['a_binary'], T[ 5]['b_binary'], true>, T[ 5]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 6]['a_binary'], T[ 6]['b_binary'], true>, T[ 6]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 7]['a_binary'], T[ 7]['b_binary'], true>, T[ 7]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 8]['a_binary'], T[ 8]['b_binary'], true>, T[ 8]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[ 9]['a_binary'], T[ 9]['b_binary'], true>, T[ 9]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[10]['a_binary'], T[10]['b_binary'], true>, T[10]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[11]['a_binary'], T[11]['b_binary'], true>, T[11]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[12]['a_binary'], T[12]['b_binary'], true>, T[12]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[13]['a_binary'], T[13]['b_binary'], true>, T[13]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[14]['a_binary'], T[14]['b_binary'], true>, T[14]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[15]['a_binary'], T[15]['b_binary'], true>, T[15]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[16]['a_binary'], T[16]['b_binary'], true>, T[16]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[17]['a_binary'], T[17]['b_binary'], true>, T[17]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[18]['a_binary'], T[18]['b_binary'], true>, T[18]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[19]['a_binary'], T[19]['b_binary'], true>, T[19]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[20]['a_binary'], T[20]['b_binary'], true>, T[20]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[21]['a_binary'], T[21]['b_binary'], true>, T[21]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[22]['a_binary'], T[22]['b_binary'], true>, T[22]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[23]['a_binary'], T[23]['b_binary'], true>, T[23]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[24]['a_binary'], T[24]['b_binary'], true>, T[24]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[25]['a_binary'], T[25]['b_binary'], true>, T[25]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[26]['a_binary'], T[26]['b_binary'], true>, T[26]['shr_s_binary']>>,
  Expect<Equal<ShiftRightBinary<T[27]['a_binary'], T[27]['b_binary'], true>, T[27]['shr_s_binary']>>,

  Expect<Equal<T['length'], 28>>,
]