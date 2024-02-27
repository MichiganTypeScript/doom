import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftRightBinary64 } from '../shift';
import { t, T } from '../test-cases/bitwise-shift-i64';
import { twosComplementToBigInt, bigIntToTwosComplement, bitwiseBigInt } from '../test-utils';

test.each(t)('$a_binary64 >>> $b_binary64 === $shr_u_binary64', ({
  a_binary64,
  b_binary64,
  shr_u_binary64,
}) => {
  const aBig = twosComplementToBigInt(a_binary64);
  const bBig = twosComplementToBigInt(b_binary64);
  const shr_uBig = twosComplementToBigInt(shr_u_binary64);

  expect(bitwiseBigInt.shr_u(aBig, bBig)).toBe(shr_uBig);
});

type i = 28
type a = T[i]['a_binary64']             // =>
type b = T[i]['b_binary64']             // =>
type e = T[i]['shr_u_binary64']         // =>
type x = ShiftRightBinary64<a, b, false>// =>

type test = [
  Expect<Equal<ShiftRightBinary64<T[ 0]['a_binary64'], T[ 0]['b_binary64'], false>, T[ 0]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 1]['a_binary64'], T[ 1]['b_binary64'], false>, T[ 1]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 2]['a_binary64'], T[ 2]['b_binary64'], false>, T[ 2]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 3]['a_binary64'], T[ 3]['b_binary64'], false>, T[ 3]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 4]['a_binary64'], T[ 4]['b_binary64'], false>, T[ 4]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 5]['a_binary64'], T[ 5]['b_binary64'], false>, T[ 5]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 6]['a_binary64'], T[ 6]['b_binary64'], false>, T[ 6]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 7]['a_binary64'], T[ 7]['b_binary64'], false>, T[ 7]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 8]['a_binary64'], T[ 8]['b_binary64'], false>, T[ 8]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[ 9]['a_binary64'], T[ 9]['b_binary64'], false>, T[ 9]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[10]['a_binary64'], T[10]['b_binary64'], false>, T[10]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[11]['a_binary64'], T[11]['b_binary64'], false>, T[11]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[12]['a_binary64'], T[12]['b_binary64'], false>, T[12]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[13]['a_binary64'], T[13]['b_binary64'], false>, T[13]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[14]['a_binary64'], T[14]['b_binary64'], false>, T[14]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[15]['a_binary64'], T[15]['b_binary64'], false>, T[15]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[16]['a_binary64'], T[16]['b_binary64'], false>, T[16]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[17]['a_binary64'], T[17]['b_binary64'], false>, T[17]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[18]['a_binary64'], T[18]['b_binary64'], false>, T[18]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[19]['a_binary64'], T[19]['b_binary64'], false>, T[19]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[20]['a_binary64'], T[20]['b_binary64'], false>, T[20]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[21]['a_binary64'], T[21]['b_binary64'], false>, T[21]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[22]['a_binary64'], T[22]['b_binary64'], false>, T[22]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[23]['a_binary64'], T[23]['b_binary64'], false>, T[23]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[24]['a_binary64'], T[24]['b_binary64'], false>, T[24]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[25]['a_binary64'], T[25]['b_binary64'], false>, T[25]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[26]['a_binary64'], T[26]['b_binary64'], false>, T[26]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[27]['a_binary64'], T[27]['b_binary64'], false>, T[27]['shr_u_binary64']>>,
  Expect<Equal<ShiftRightBinary64<T[28]['a_binary64'], T[28]['b_binary64'], false>, T[28]['shr_u_binary64']>>,

  Expect<Equal<T['length'], 29>>,
]
