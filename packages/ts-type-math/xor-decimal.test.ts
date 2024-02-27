import type { Expect, Equal } from 'type-testing';
import { test, expect } from "vitest";
import { t, T } from "./test-cases/bitwise";
import { BitwiseXor, BitwiseXorBinary } from './bitwise';
import { twosComplementToNumber, numberToTwosComplement } from './test-utils';

//----------------------------------------------------------------------
// BITWISE XOR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/XOR

test.each(t)('$a ^ $b === $e', ({
  a,
  b,
  xor,
  a_binary,
  b_binary,
  xor_binary,
}) => {
  expect(numberToTwosComplement(a)).toBe(a_binary);
  expect(numberToTwosComplement(b)).toBe(b_binary);
  expect(numberToTwosComplement(xor)).toBe(xor_binary);

  expect(twosComplementToNumber(a_binary)).toBe(a);
  expect(twosComplementToNumber(b_binary)).toBe(b);
  expect(twosComplementToNumber(xor_binary)).toBe(xor);

  expect((a ^ b) >> 0).toBe(xor);

  expect(t).toHaveLength(24);
});

type iX = 9;

type aX = T[iX]['a'];        // =>
type bX = T[iX]['b'];        // =>
type eX = T[iX]['xor']       // =>
type xX = BitwiseXor<aX, bX> // =>

type aXb = T[iX]['a_binary'];         // =>
type bXb = T[iX]['b_binary'];         // =>
type eXb = T[iX]['xor_binary'];       // =>
type xXb = BitwiseXorBinary<aXb, bXb> // =>

type testXor = [
  Expect<Equal<BitwiseXorBinary<T[ 0]['a_binary'], T[ 0]['b_binary']>, T[ 0]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 1]['a_binary'], T[ 1]['b_binary']>, T[ 1]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 2]['a_binary'], T[ 2]['b_binary']>, T[ 2]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 3]['a_binary'], T[ 3]['b_binary']>, T[ 3]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 4]['a_binary'], T[ 4]['b_binary']>, T[ 4]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 5]['a_binary'], T[ 5]['b_binary']>, T[ 5]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 6]['a_binary'], T[ 6]['b_binary']>, T[ 6]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 7]['a_binary'], T[ 7]['b_binary']>, T[ 7]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 8]['a_binary'], T[ 8]['b_binary']>, T[ 8]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[ 9]['a_binary'], T[ 9]['b_binary']>, T[ 9]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[10]['a_binary'], T[10]['b_binary']>, T[10]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[11]['a_binary'], T[11]['b_binary']>, T[11]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[12]['a_binary'], T[12]['b_binary']>, T[12]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[13]['a_binary'], T[13]['b_binary']>, T[13]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[14]['a_binary'], T[14]['b_binary']>, T[14]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[15]['a_binary'], T[15]['b_binary']>, T[15]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[16]['a_binary'], T[16]['b_binary']>, T[16]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[17]['a_binary'], T[17]['b_binary']>, T[17]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[18]['a_binary'], T[18]['b_binary']>, T[18]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[19]['a_binary'], T[19]['b_binary']>, T[19]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[20]['a_binary'], T[20]['b_binary']>, T[20]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[21]['a_binary'], T[21]['b_binary']>, T[21]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[22]['a_binary'], T[22]['b_binary']>, T[22]['xor_binary']>>,
  Expect<Equal<BitwiseXorBinary<T[23]['a_binary'], T[23]['b_binary']>, T[23]['xor_binary']>>,

  Expect<Equal<BitwiseXor<T[ 0]['a'], T[ 0]['b']>, T[ 0]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 1]['a'], T[ 1]['b']>, T[ 1]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 2]['a'], T[ 2]['b']>, T[ 2]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 3]['a'], T[ 3]['b']>, T[ 3]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 4]['a'], T[ 4]['b']>, T[ 4]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 5]['a'], T[ 5]['b']>, T[ 5]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 6]['a'], T[ 6]['b']>, T[ 6]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 7]['a'], T[ 7]['b']>, T[ 7]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 8]['a'], T[ 8]['b']>, T[ 8]['xor']>>,
  Expect<Equal<BitwiseXor<T[ 9]['a'], T[ 9]['b']>, T[ 9]['xor']>>,
  Expect<Equal<BitwiseXor<T[10]['a'], T[10]['b']>, T[10]['xor']>>,
  Expect<Equal<BitwiseXor<T[11]['a'], T[11]['b']>, T[11]['xor']>>,
  Expect<Equal<BitwiseXor<T[12]['a'], T[12]['b']>, T[12]['xor']>>,
  Expect<Equal<BitwiseXor<T[13]['a'], T[13]['b']>, T[13]['xor']>>,
  Expect<Equal<BitwiseXor<T[14]['a'], T[14]['b']>, T[14]['xor']>>,
  Expect<Equal<BitwiseXor<T[15]['a'], T[15]['b']>, T[15]['xor']>>,
  Expect<Equal<BitwiseXor<T[16]['a'], T[16]['b']>, T[16]['xor']>>,
  Expect<Equal<BitwiseXor<T[17]['a'], T[17]['b']>, T[17]['xor']>>,
  Expect<Equal<BitwiseXor<T[18]['a'], T[18]['b']>, T[18]['xor']>>,
  Expect<Equal<BitwiseXor<T[19]['a'], T[19]['b']>, T[19]['xor']>>,
  Expect<Equal<BitwiseXor<T[20]['a'], T[20]['b']>, T[20]['xor']>>,
  Expect<Equal<BitwiseXor<T[21]['a'], T[21]['b']>, T[21]['xor']>>,
  Expect<Equal<BitwiseXor<T[22]['a'], T[22]['b']>, T[22]['xor']>>,
  Expect<Equal<BitwiseXor<T[23]['a'], T[23]['b']>, T[23]['xor']>>,

  Expect<Equal<T['length'], 24>>,
]
