import type { Expect, Equal } from 'type-testing'
import { test, expect } from "vitest"
import { BitwiseOr, BitwiseOrBinary } from './bitwise'
import { t, T } from './test-cases/or'
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from './test-utils';

//----------------------------------------------------------------------
// BITWISE OR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/OR

test.each(t)('$a | $b === $e', ({
  a,
  b,
  e,
}) => {
  expect((a | b) >> 0).toBe(e);

  expect(t).toHaveLength(24);
});

type i = 5;

type a = T[i]['a'];        // =>
type b = T[i]['b'];        // =>
type e = T[i]['e'];        // =>
type x = BitwiseOr<a, b>  // =>

type testOr = [
  Expect<Equal<BitwiseOr<T[ 0]['a'], T[ 0]['b']>, T[ 0]['e']>>,
  Expect<Equal<BitwiseOr<T[ 1]['a'], T[ 1]['b']>, T[ 1]['e']>>,
  Expect<Equal<BitwiseOr<T[ 2]['a'], T[ 2]['b']>, T[ 2]['e']>>,
  Expect<Equal<BitwiseOr<T[ 3]['a'], T[ 3]['b']>, T[ 3]['e']>>,
  Expect<Equal<BitwiseOr<T[ 4]['a'], T[ 4]['b']>, T[ 4]['e']>>,
  Expect<Equal<BitwiseOr<T[ 5]['a'], T[ 5]['b']>, T[ 5]['e']>>,
  Expect<Equal<BitwiseOr<T[ 6]['a'], T[ 6]['b']>, T[ 6]['e']>>,
  Expect<Equal<BitwiseOr<T[ 7]['a'], T[ 7]['b']>, T[ 7]['e']>>,
  Expect<Equal<BitwiseOr<T[ 8]['a'], T[ 8]['b']>, T[ 8]['e']>>,
  Expect<Equal<BitwiseOr<T[ 9]['a'], T[ 9]['b']>, T[ 9]['e']>>,
  Expect<Equal<BitwiseOr<T[10]['a'], T[10]['b']>, T[10]['e']>>,
  Expect<Equal<BitwiseOr<T[11]['a'], T[11]['b']>, T[11]['e']>>,
  Expect<Equal<BitwiseOr<T[12]['a'], T[12]['b']>, T[12]['e']>>,
  Expect<Equal<BitwiseOr<T[13]['a'], T[13]['b']>, T[13]['e']>>,
  Expect<Equal<BitwiseOr<T[14]['a'], T[14]['b']>, T[14]['e']>>,
  Expect<Equal<BitwiseOr<T[15]['a'], T[15]['b']>, T[15]['e']>>,
  Expect<Equal<BitwiseOr<T[16]['a'], T[16]['b']>, T[16]['e']>>,
  Expect<Equal<BitwiseOr<T[17]['a'], T[17]['b']>, T[17]['e']>>,
  Expect<Equal<BitwiseOr<T[18]['a'], T[18]['b']>, T[18]['e']>>,
  Expect<Equal<BitwiseOr<T[19]['a'], T[19]['b']>, T[19]['e']>>,
  Expect<Equal<BitwiseOr<T[20]['a'], T[20]['b']>, T[20]['e']>>,
  Expect<Equal<BitwiseOr<T[21]['a'], T[21]['b']>, T[21]['e']>>,
  Expect<Equal<BitwiseOr<T[22]['a'], T[22]['b']>, T[22]['e']>>,
  Expect<Equal<BitwiseOr<T[23]['a'], T[23]['b']>, T[23]['e']>>,

  Expect<Equal<T['length'], 24>>,
]