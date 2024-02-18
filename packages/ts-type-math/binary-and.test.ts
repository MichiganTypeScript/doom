import { t, T } from './test-cases/binary-and';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseAnd, BitwiseAndBinary } from './bitwise';
import { binaryTwosComplementToNumber, numberToTwosComplementBinary } from './test-utils';

//----------------------------------------------------------------------
// BITWISE AND
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/AND

test.each(t)('$a & $b === $e', ({
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

  expect((a & b) >> 0).toBe(e);

  expect(t).toHaveLength(24);
});

type i = 5;

type a = T[i]['a'];         // =>
type b = T[i]['b'];         // =>
type e = T[i]['e'];         // =>
type x = BitwiseAnd<a, b>  // =>

type ab = T[i]['a_binary'];         // =>
type bb = T[i]['b_binary'];         // =>
type eb = T[i]['e_binary'];         // =>
type xb = BitwiseAndBinary<ab, bb> // =>

type tests = [
  Expect<Equal<T['length'], 24>>,

  Expect<Equal<BitwiseAndBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['e_binary']>>,

  Expect<Equal<BitwiseAnd<T[ 0]['a'], T[ 0]['b']>, T[ 0]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 1]['a'], T[ 1]['b']>, T[ 1]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 2]['a'], T[ 2]['b']>, T[ 2]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 3]['a'], T[ 3]['b']>, T[ 3]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 4]['a'], T[ 4]['b']>, T[ 4]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 5]['a'], T[ 5]['b']>, T[ 5]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 6]['a'], T[ 6]['b']>, T[ 6]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 7]['a'], T[ 7]['b']>, T[ 7]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 8]['a'], T[ 8]['b']>, T[ 8]['e']>>,
  Expect<Equal<BitwiseAnd<T[ 9]['a'], T[ 9]['b']>, T[ 9]['e']>>,
  Expect<Equal<BitwiseAnd<T[10]['a'], T[10]['b']>, T[10]['e']>>,
  Expect<Equal<BitwiseAnd<T[11]['a'], T[11]['b']>, T[11]['e']>>,
  Expect<Equal<BitwiseAnd<T[12]['a'], T[12]['b']>, T[12]['e']>>,
  Expect<Equal<BitwiseAnd<T[13]['a'], T[13]['b']>, T[13]['e']>>,
  Expect<Equal<BitwiseAnd<T[14]['a'], T[14]['b']>, T[14]['e']>>,
  Expect<Equal<BitwiseAnd<T[15]['a'], T[15]['b']>, T[15]['e']>>,
  Expect<Equal<BitwiseAnd<T[16]['a'], T[16]['b']>, T[16]['e']>>,
  Expect<Equal<BitwiseAnd<T[17]['a'], T[17]['b']>, T[17]['e']>>,
  Expect<Equal<BitwiseAnd<T[18]['a'], T[18]['b']>, T[18]['e']>>,
  Expect<Equal<BitwiseAnd<T[19]['a'], T[19]['b']>, T[19]['e']>>,
  Expect<Equal<BitwiseAnd<T[20]['a'], T[20]['b']>, T[20]['e']>>,
  Expect<Equal<BitwiseAnd<T[21]['a'], T[21]['b']>, T[21]['e']>>,
  Expect<Equal<BitwiseAnd<T[22]['a'], T[22]['b']>, T[22]['e']>>,
  Expect<Equal<BitwiseAnd<T[23]['a'], T[23]['b']>, T[23]['e']>>,
]
