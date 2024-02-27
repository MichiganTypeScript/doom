import { t, T } from '../test-cases/bitwise';
import { test, expect } from 'vitest';
import { Expect, Equal } from 'type-testing';
import { BitwiseAnd, BitwiseAndBinary } from '../bitwise';
import { twosComplementToNumber, numberToTwosComplement } from '../test-utils';

//----------------------------------------------------------------------
// BITWISE AND
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/AND

test.each(t)('$a & $b === $e', ({
  a,
  b,
  and,
}) => {
  expect((a & b) >> 0).toBe(and);
  expect(t).toHaveLength(24);
});

type i = 5;
type a = T[i]['a'];       // =>
type b = T[i]['b'];       // =>
type e = T[i]['and']      // =>
type x = BitwiseAnd<a, b> // =>

type tests = [
  Expect<Equal<BitwiseAnd<T[ 0]['a'], T[ 0]['b']>, T[ 0]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 1]['a'], T[ 1]['b']>, T[ 1]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 2]['a'], T[ 2]['b']>, T[ 2]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 3]['a'], T[ 3]['b']>, T[ 3]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 4]['a'], T[ 4]['b']>, T[ 4]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 5]['a'], T[ 5]['b']>, T[ 5]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 6]['a'], T[ 6]['b']>, T[ 6]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 7]['a'], T[ 7]['b']>, T[ 7]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 8]['a'], T[ 8]['b']>, T[ 8]['and']>>,
  Expect<Equal<BitwiseAnd<T[ 9]['a'], T[ 9]['b']>, T[ 9]['and']>>,
  Expect<Equal<BitwiseAnd<T[10]['a'], T[10]['b']>, T[10]['and']>>,
  Expect<Equal<BitwiseAnd<T[11]['a'], T[11]['b']>, T[11]['and']>>,
  Expect<Equal<BitwiseAnd<T[12]['a'], T[12]['b']>, T[12]['and']>>,
  Expect<Equal<BitwiseAnd<T[13]['a'], T[13]['b']>, T[13]['and']>>,
  Expect<Equal<BitwiseAnd<T[14]['a'], T[14]['b']>, T[14]['and']>>,
  Expect<Equal<BitwiseAnd<T[15]['a'], T[15]['b']>, T[15]['and']>>,
  Expect<Equal<BitwiseAnd<T[16]['a'], T[16]['b']>, T[16]['and']>>,
  Expect<Equal<BitwiseAnd<T[17]['a'], T[17]['b']>, T[17]['and']>>,
  Expect<Equal<BitwiseAnd<T[18]['a'], T[18]['b']>, T[18]['and']>>,
  Expect<Equal<BitwiseAnd<T[19]['a'], T[19]['b']>, T[19]['and']>>,
  Expect<Equal<BitwiseAnd<T[20]['a'], T[20]['b']>, T[20]['and']>>,
  Expect<Equal<BitwiseAnd<T[21]['a'], T[21]['b']>, T[21]['and']>>,
  Expect<Equal<BitwiseAnd<T[22]['a'], T[22]['b']>, T[22]['and']>>,
  Expect<Equal<BitwiseAnd<T[23]['a'], T[23]['b']>, T[23]['and']>>,

  Expect<Equal<T['length'], 24>>,
]
