import type { Expect, Equal } from 'type-testing'
import { test, expect } from "vitest"
import { BitwiseOr, BitwiseOrBinary } from './bitwise'
import { t, T } from './test-cases/bitwise'
import { twosComplementToNumber, numberToTwosComplement } from './test-utils';

//----------------------------------------------------------------------
// BITWISE OR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/OR

test.each(t)('$a_binary | $b_binary === $e_binary', ({
  a,
  b,
  or,
  a_binary,
  b_binary,
  or_binary,
}) => {
  expect(numberToTwosComplement(a)).toBe(a_binary);
  expect(numberToTwosComplement(b)).toBe(b_binary);
  expect(numberToTwosComplement(or)).toBe(or_binary);

  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(twosComplementToNumber(b_binary)).toBe(b);
  expect(twosComplementToNumber(or_binary)).toBe(or);

  const expected = twosComplementToNumber(a_binary) | twosComplementToNumber(b_binary);
  expect(expected >> 0).toBe(twosComplementToNumber(or_binary));

  expect(t).toHaveLength(24);
});

type i = 5;

type a = T[i]['a'];       // =>
type b = T[i]['b'];       // =>
type e = T[i]['or'];      // =>
type x = BitwiseOr<a, b>  // =>

type ab = T[i]['a_binary'];        // =>
type bb = T[i]['b_binary'];        // =>
type eb = T[i]['or_binary'];       // =>
type xb = BitwiseOrBinary<ab, bb>  // =>

type testOr = [
  Expect<Equal<BitwiseOrBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['or_binary']>>,
  Expect<Equal<BitwiseOrBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['or_binary']>>,

  Expect<Equal<T['length'], 24>>,
]