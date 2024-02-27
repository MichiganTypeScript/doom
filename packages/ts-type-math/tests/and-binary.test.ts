import { t, T } from '../test-cases/bitwise';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseAnd, BitwiseAndBinary } from '../bitwise';
import { twosComplementToNumber, numberToTwosComplement } from '../test-utils';

//----------------------------------------------------------------------
// BITWISE AND
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/AND

test.each(t)('$a_binary & $b_binary === $e_binary', ({
  a,
  b,
  and,
  a_binary,
  b_binary,
  and_binary,
}) => {
  expect(numberToTwosComplement(a)).toBe(a_binary);
  expect(numberToTwosComplement(b)).toBe(b_binary);
  expect(numberToTwosComplement(and)).toBe(and_binary);

  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(twosComplementToNumber(b_binary)).toBe(b);
  expect(twosComplementToNumber(and_binary)).toBe(and);

  const expected = twosComplementToNumber(a_binary) & twosComplementToNumber(b_binary)
  expect(expected >> 0).toBe(twosComplementToNumber(and_binary));

  expect(t).toHaveLength(24);
});

type i = 5;

type a = T[i]['a'];       // =>
type b = T[i]['b'];       // =>
type e = T[i]['and'];     // =>
type x = BitwiseAnd<a, b> // =>

type ab = T[i]['a_binary'];        // =>
type bb = T[i]['b_binary'];        // =>
type eb = T[i]['and_binary'];      // =>
type xb = BitwiseAndBinary<ab, bb> // =>

type tests = [
  Expect<Equal<BitwiseAndBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['and_binary']>>,
  Expect<Equal<BitwiseAndBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['and_binary']>>,

  Expect<Equal<T['length'], 24>>,
]
