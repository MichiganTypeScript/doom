import type { Expect, Equal } from 'type-testing'
import { test, expect } from "vitest"
import { BitwiseOr, BitwiseOrBinary } from './bitwise'
import { t, T } from './test-cases/or'
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from './test-utils';

//----------------------------------------------------------------------
// BITWISE OR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/OR

test.each(t)('$a_binary | $b_binary === $e_binary', ({
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

  expect(binaryTwosComplementToNumber(a_binary)).toBe(a);
  expect(binaryTwosComplementToNumber(b_binary)).toBe(b);
  expect(binaryTwosComplementToNumber(e_binary)).toBe(e);

  const expected = binaryTwosComplementToNumber(a_binary) | binaryTwosComplementToNumber(b_binary);
  expect(expected >> 0).toBe(binaryTwosComplementToNumber(e_binary));

  expect(t).toHaveLength(24);
});

type i = 5;

type a = T[i]['a'];        // =>
type b = T[i]['b'];        // =>
type e = T[i]['e'];        // =>
type x = BitwiseOr<a, b>  // =>

type ab = T[i]['a_binary'];         // =>
type bb = T[i]['b_binary'];         // =>
type eb = T[i]['e_binary'];         // =>
type xb = BitwiseOrBinary<ab, bb>  // =>

type testOr = [
  Expect<Equal<BitwiseOrBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['e_binary']>>,

  Expect<Equal<T['length'], 24>>,
]