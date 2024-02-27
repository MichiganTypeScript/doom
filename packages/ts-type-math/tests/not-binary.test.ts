import { t, T } from '../test-cases/bitwise';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseNot, BitwiseNotBinary } from '../bitwise';
import { twosComplementToNumber, numberToTwosComplement } from '../test-utils';

//----------------------------------------------------------------------
// BITWISE NOT
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/NOT

test.each(t)('~$a === $e', ({
  a,
  not,
  a_binary,
  not_binary,
}) => {
  expect(numberToTwosComplement(a)).toBe(a_binary);
  expect(numberToTwosComplement(not)).toBe(not_binary);

  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(twosComplementToNumber(not_binary)).toBe(not);

  const expected = twosComplementToNumber(a_binary);
  expect(~expected).toBe(twosComplementToNumber(not_binary));

  expect(t).toHaveLength(24);
});

type i = 5;
type a = T[i]['a'];   // =>
type e = T[i]['not']; // =>
type x = BitwiseNot<a>// =>

type ab = T[i]['a_binary'];   // =>
type eb = T[i]['not_binary']; // =>
type xb = BitwiseNotBinary<ab>// =>

type tests = [
  Expect<Equal<BitwiseNotBinary<T[ 0]['a_binary']>, T[ 0]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 1]['a_binary']>, T[ 1]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 2]['a_binary']>, T[ 2]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 3]['a_binary']>, T[ 3]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 4]['a_binary']>, T[ 4]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 5]['a_binary']>, T[ 5]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 6]['a_binary']>, T[ 6]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 7]['a_binary']>, T[ 7]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 8]['a_binary']>, T[ 8]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[ 9]['a_binary']>, T[ 9]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[10]['a_binary']>, T[10]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[11]['a_binary']>, T[11]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[12]['a_binary']>, T[12]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[13]['a_binary']>, T[13]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[14]['a_binary']>, T[14]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[15]['a_binary']>, T[15]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[16]['a_binary']>, T[16]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[17]['a_binary']>, T[17]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[18]['a_binary']>, T[18]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[19]['a_binary']>, T[19]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[20]['a_binary']>, T[20]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[21]['a_binary']>, T[21]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[22]['a_binary']>, T[22]['not_binary']>>,
  Expect<Equal<BitwiseNotBinary<T[23]['a_binary']>, T[23]['not_binary']>>,

  Expect<Equal<T['length'], 24>>,
]
