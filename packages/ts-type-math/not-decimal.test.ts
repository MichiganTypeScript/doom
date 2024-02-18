import { t, T } from './test-cases/not';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseNot, BitwiseNotBinary } from './bitwise';

//----------------------------------------------------------------------
// BITWISE NOT
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/NOT

test.each(t)('~$a === $e', ({
  a,
  e,
}) => {
  expect(~a).toBe(e);

  expect(t).toHaveLength(19);
});

type i = 5;
type a = T[i]['a'];   // =>
type e = T[i]['e'];   // =>
type x = BitwiseNot<a>// =>

type tests = [
  Expect<Equal<BitwiseNot<T[ 0]['a']>, T[ 0]['e']>>,
  Expect<Equal<BitwiseNot<T[ 1]['a']>, T[ 1]['e']>>,
  Expect<Equal<BitwiseNot<T[ 2]['a']>, T[ 2]['e']>>,
  Expect<Equal<BitwiseNot<T[ 3]['a']>, T[ 3]['e']>>,
  Expect<Equal<BitwiseNot<T[ 4]['a']>, T[ 4]['e']>>,
  Expect<Equal<BitwiseNot<T[ 5]['a']>, T[ 5]['e']>>,
  Expect<Equal<BitwiseNot<T[ 6]['a']>, T[ 6]['e']>>,
  Expect<Equal<BitwiseNot<T[ 7]['a']>, T[ 7]['e']>>,
  Expect<Equal<BitwiseNot<T[ 8]['a']>, T[ 8]['e']>>,
  Expect<Equal<BitwiseNot<T[ 9]['a']>, T[ 9]['e']>>,
  Expect<Equal<BitwiseNot<T[10]['a']>, T[10]['e']>>,
  Expect<Equal<BitwiseNot<T[11]['a']>, T[11]['e']>>,
  Expect<Equal<BitwiseNot<T[12]['a']>, T[12]['e']>>,
  Expect<Equal<BitwiseNot<T[13]['a']>, T[13]['e']>>,
  Expect<Equal<BitwiseNot<T[14]['a']>, T[14]['e']>>,
  Expect<Equal<BitwiseNot<T[15]['a']>, T[15]['e']>>,
  Expect<Equal<BitwiseNot<T[16]['a']>, T[16]['e']>>,
  Expect<Equal<BitwiseNot<T[17]['a']>, T[17]['e']>>,
  Expect<Equal<BitwiseNot<T[18]['a']>, T[18]['e']>>,

  Expect<Equal<T['length'], 19>>,
]
