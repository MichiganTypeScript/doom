import { t, T } from '../test-cases/bitwise';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseNot } from '../bitwise';

//----------------------------------------------------------------------
// BITWISE NOT
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/NOT

test.each(t)('~$a === $not', ({
  a,
  not,
}) => {
  expect(~a).toBe(not);

  expect(t).toHaveLength(24);
});

type i = 9;
type a = T[i]['a'];   // =>
type e = T[i]['not']; // =>
type x = BitwiseNot<a>// =>

type tests = [
  Expect<Equal<BitwiseNot<T[ 0]['a']>, T[ 0]['not']>>,
  Expect<Equal<BitwiseNot<T[ 1]['a']>, T[ 1]['not']>>,
  Expect<Equal<BitwiseNot<T[ 2]['a']>, T[ 2]['not']>>,
  Expect<Equal<BitwiseNot<T[ 3]['a']>, T[ 3]['not']>>,
  Expect<Equal<BitwiseNot<T[ 4]['a']>, T[ 4]['not']>>,
  Expect<Equal<BitwiseNot<T[ 5]['a']>, T[ 5]['not']>>,
  Expect<Equal<BitwiseNot<T[ 6]['a']>, T[ 6]['not']>>,
  Expect<Equal<BitwiseNot<T[ 7]['a']>, T[ 7]['not']>>,
  Expect<Equal<BitwiseNot<T[ 8]['a']>, T[ 8]['not']>>,
  Expect<Equal<BitwiseNot<T[ 9]['a']>, T[ 9]['not']>>,
  Expect<Equal<BitwiseNot<T[10]['a']>, T[10]['not']>>,
  Expect<Equal<BitwiseNot<T[11]['a']>, T[11]['not']>>,
  Expect<Equal<BitwiseNot<T[12]['a']>, T[12]['not']>>,
  Expect<Equal<BitwiseNot<T[13]['a']>, T[13]['not']>>,
  Expect<Equal<BitwiseNot<T[14]['a']>, T[14]['not']>>,
  Expect<Equal<BitwiseNot<T[15]['a']>, T[15]['not']>>,
  Expect<Equal<BitwiseNot<T[16]['a']>, T[16]['not']>>,
  Expect<Equal<BitwiseNot<T[17]['a']>, T[17]['not']>>,
  Expect<Equal<BitwiseNot<T[18]['a']>, T[18]['not']>>,
  Expect<Equal<BitwiseNot<T[19]['a']>, T[19]['not']>>,
  Expect<Equal<BitwiseNot<T[20]['a']>, T[20]['not']>>,
  Expect<Equal<BitwiseNot<T[21]['a']>, T[21]['not']>>,
  Expect<Equal<BitwiseNot<T[22]['a']>, T[22]['not']>>,
  Expect<Equal<BitwiseNot<T[23]['a']>, T[23]['not']>>,

  Expect<Equal<T['length'], 24>>,
]
