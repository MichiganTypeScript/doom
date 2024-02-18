import { t, T } from './test-cases/binary-not';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseNot, BitwiseNotBinary } from './bitwise';

//----------------------------------------------------------------------
// BITWISE NOT
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/NOT

test.each(t)('~$a === $e', ({
  a,
  e,
  a_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(parseInt(a_binary, 2) >> 0);

  expect(Number.isInteger(e)).toBe(true);
  expect(e).toBe(parseInt(e_binary, 2) >> 0);

  expect(~a).toBe(e);

  expect(t).toHaveLength(19);
});

type i = 5;
type a = T[i]['a'];   // =>
type e = T[i]['e'];   // =>
type x = BitwiseNot<a>// =>

type ab = T[i]['a_binary'];   // =>
type eb = T[i]['e_binary'];   // =>
type xb = BitwiseNotBinary<ab>// =>

type tests = [
  Expect<Equal<BitwiseNotBinary<T[ 0]['a_binary']>, T[ 0]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 1]['a_binary']>, T[ 1]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 2]['a_binary']>, T[ 2]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 3]['a_binary']>, T[ 3]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 4]['a_binary']>, T[ 4]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 5]['a_binary']>, T[ 5]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 6]['a_binary']>, T[ 6]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 7]['a_binary']>, T[ 7]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 8]['a_binary']>, T[ 8]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 9]['a_binary']>, T[ 9]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[10]['a_binary']>, T[10]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[11]['a_binary']>, T[11]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[12]['a_binary']>, T[12]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[13]['a_binary']>, T[13]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[14]['a_binary']>, T[14]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[15]['a_binary']>, T[15]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[16]['a_binary']>, T[16]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[17]['a_binary']>, T[17]['e_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[18]['a_binary']>, T[18]['e_binary']>>,

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
