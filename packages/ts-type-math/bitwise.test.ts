import type { Expect, Equal } from 'type-testing';
import { test, expect } from "vitest";
import { bitwiseAndTests, bitwiseOrTests, bitwiseXorTests } from "./test-cases/bitwise";
import { BitwiseAnd, BitwiseAndBinary, BitwiseOr, BitwiseOrBinary, BitwiseXor, BitwiseXorBinary } from './bitwise';

//----------------------------------------------------------------------
// BITWISE AND
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/AND

test.each(bitwiseAndTests)('$a & $b === $e', ({
  a,
  b,
  e,
  a_binary,
  b_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBe(+`0b${b_binary}`);
  
  expect(Number.isInteger(e)).toBe(true);
  expect(e).toBe(+`0b${e_binary}`);

  expect((a & b) >>> 0).toBe(e);

  expect(bitwiseAndTests).toHaveLength(24);
});

type TA = typeof bitwiseAndTests;

type iA = 5;

type aA = TA[iA]['a'];        // =>
type bA = TA[iA]['b'];        // =>
type eA = TA[iA]['e'];        // =>
type xA = BitwiseAnd<aA, bA>  // =>

type aAb = TA[iA]['a_binary'];         // =>
type bAb = TA[iA]['b_binary'];         // =>
type eAb = TA[iA]['e_binary'];         // =>
type xAb = BitwiseAndBinary<aAb, bAb>  // =>

type testAnd = [
  Expect<Equal<TA['length'], 24>>,

  Expect<Equal<BitwiseAndBinary<TA[ 0]['a_binary'], TA[ 0]['b_binary']>, TA[ 0]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 1]['a_binary'], TA[ 1]['b_binary']>, TA[ 1]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 2]['a_binary'], TA[ 2]['b_binary']>, TA[ 2]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 3]['a_binary'], TA[ 3]['b_binary']>, TA[ 3]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 4]['a_binary'], TA[ 4]['b_binary']>, TA[ 4]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 5]['a_binary'], TA[ 5]['b_binary']>, TA[ 5]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 6]['a_binary'], TA[ 6]['b_binary']>, TA[ 6]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 7]['a_binary'], TA[ 7]['b_binary']>, TA[ 7]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 8]['a_binary'], TA[ 8]['b_binary']>, TA[ 8]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[ 9]['a_binary'], TA[ 9]['b_binary']>, TA[ 9]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[10]['a_binary'], TA[10]['b_binary']>, TA[10]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[11]['a_binary'], TA[11]['b_binary']>, TA[11]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[12]['a_binary'], TA[12]['b_binary']>, TA[12]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[13]['a_binary'], TA[13]['b_binary']>, TA[13]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[14]['a_binary'], TA[14]['b_binary']>, TA[14]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[15]['a_binary'], TA[15]['b_binary']>, TA[15]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[16]['a_binary'], TA[16]['b_binary']>, TA[16]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[17]['a_binary'], TA[17]['b_binary']>, TA[17]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[18]['a_binary'], TA[18]['b_binary']>, TA[18]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[19]['a_binary'], TA[19]['b_binary']>, TA[19]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[20]['a_binary'], TA[20]['b_binary']>, TA[20]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[21]['a_binary'], TA[21]['b_binary']>, TA[21]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[22]['a_binary'], TA[22]['b_binary']>, TA[22]['e_binary']>>,
  Expect<Equal<BitwiseAndBinary<TA[23]['a_binary'], TA[23]['b_binary']>, TA[23]['e_binary']>>,

  Expect<Equal<BitwiseAnd<TA[ 0]['a'], TA[ 0]['b']>, TA[ 0]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 1]['a'], TA[ 1]['b']>, TA[ 1]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 2]['a'], TA[ 2]['b']>, TA[ 2]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 3]['a'], TA[ 3]['b']>, TA[ 3]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 4]['a'], TA[ 4]['b']>, TA[ 4]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 5]['a'], TA[ 5]['b']>, TA[ 5]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 6]['a'], TA[ 6]['b']>, TA[ 6]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 7]['a'], TA[ 7]['b']>, TA[ 7]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 8]['a'], TA[ 8]['b']>, TA[ 8]['e']>>,
  Expect<Equal<BitwiseAnd<TA[ 9]['a'], TA[ 9]['b']>, TA[ 9]['e']>>,
  Expect<Equal<BitwiseAnd<TA[10]['a'], TA[10]['b']>, TA[10]['e']>>,
  Expect<Equal<BitwiseAnd<TA[11]['a'], TA[11]['b']>, TA[11]['e']>>,
  Expect<Equal<BitwiseAnd<TA[12]['a'], TA[12]['b']>, TA[12]['e']>>,
  Expect<Equal<BitwiseAnd<TA[13]['a'], TA[13]['b']>, TA[13]['e']>>,
  Expect<Equal<BitwiseAnd<TA[14]['a'], TA[14]['b']>, TA[14]['e']>>,
  Expect<Equal<BitwiseAnd<TA[15]['a'], TA[15]['b']>, TA[15]['e']>>,
  Expect<Equal<BitwiseAnd<TA[16]['a'], TA[16]['b']>, TA[16]['e']>>,
  Expect<Equal<BitwiseAnd<TA[17]['a'], TA[17]['b']>, TA[17]['e']>>,
  Expect<Equal<BitwiseAnd<TA[18]['a'], TA[18]['b']>, TA[18]['e']>>,
  Expect<Equal<BitwiseAnd<TA[19]['a'], TA[19]['b']>, TA[19]['e']>>,
  Expect<Equal<BitwiseAnd<TA[20]['a'], TA[20]['b']>, TA[20]['e']>>,
  Expect<Equal<BitwiseAnd<TA[21]['a'], TA[21]['b']>, TA[21]['e']>>,
  Expect<Equal<BitwiseAnd<TA[22]['a'], TA[22]['b']>, TA[22]['e']>>,
  Expect<Equal<BitwiseAnd<TA[23]['a'], TA[23]['b']>, TA[23]['e']>>,
]

//----------------------------------------------------------------------
// BITWISE OR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/OR

test.each(bitwiseOrTests)('$a | $b === $e', ({
  a,
  b,
  e,
  a_binary,
  b_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBe(+`0b${b_binary}`);
  
  expect(Number.isInteger(e)).toBe(true);
  expect(e).toBe(+`0b${e_binary}`);

  expect((a | b) >>> 0).toBe(e);

  expect(bitwiseOrTests).toHaveLength(24);
});

type TO = typeof bitwiseOrTests;

type iO = 5;

type aO = TO[iO]['a'];        // =>
type bO = TO[iO]['b'];        // =>
type eO = TO[iO]['e'];        // =>
type xO = BitwiseOr<aO, bO>  // =>

type aOb = TO[iO]['a_binary'];         // =>
type bOb = TO[iO]['b_binary'];         // =>
type eOb = TO[iO]['e_binary'];         // =>
type xOb = BitwiseOrBinary<aOb, bOb>  // =>

type testOr = [
  Expect<Equal<TA['length'], 24>>,

  Expect<Equal<BitwiseOrBinary<TO[ 0]['a_binary'], TO[ 0]['b_binary']>, TO[ 0]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 1]['a_binary'], TO[ 1]['b_binary']>, TO[ 1]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 2]['a_binary'], TO[ 2]['b_binary']>, TO[ 2]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 3]['a_binary'], TO[ 3]['b_binary']>, TO[ 3]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 4]['a_binary'], TO[ 4]['b_binary']>, TO[ 4]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 5]['a_binary'], TO[ 5]['b_binary']>, TO[ 5]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 6]['a_binary'], TO[ 6]['b_binary']>, TO[ 6]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 7]['a_binary'], TO[ 7]['b_binary']>, TO[ 7]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 8]['a_binary'], TO[ 8]['b_binary']>, TO[ 8]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[ 9]['a_binary'], TO[ 9]['b_binary']>, TO[ 9]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[10]['a_binary'], TO[10]['b_binary']>, TO[10]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[11]['a_binary'], TO[11]['b_binary']>, TO[11]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[12]['a_binary'], TO[12]['b_binary']>, TO[12]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[13]['a_binary'], TO[13]['b_binary']>, TO[13]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[14]['a_binary'], TO[14]['b_binary']>, TO[14]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[15]['a_binary'], TO[15]['b_binary']>, TO[15]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[16]['a_binary'], TO[16]['b_binary']>, TO[16]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[17]['a_binary'], TO[17]['b_binary']>, TO[17]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[18]['a_binary'], TO[18]['b_binary']>, TO[18]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[19]['a_binary'], TO[19]['b_binary']>, TO[19]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[20]['a_binary'], TO[20]['b_binary']>, TO[20]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[21]['a_binary'], TO[21]['b_binary']>, TO[21]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[22]['a_binary'], TO[22]['b_binary']>, TO[22]['e_binary']>>,
  Expect<Equal<BitwiseOrBinary<TO[23]['a_binary'], TO[23]['b_binary']>, TO[23]['e_binary']>>,

  Expect<Equal<BitwiseOr<TO[ 0]['a'], TO[ 0]['b']>, TO[ 0]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 1]['a'], TO[ 1]['b']>, TO[ 1]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 2]['a'], TO[ 2]['b']>, TO[ 2]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 3]['a'], TO[ 3]['b']>, TO[ 3]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 4]['a'], TO[ 4]['b']>, TO[ 4]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 5]['a'], TO[ 5]['b']>, TO[ 5]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 6]['a'], TO[ 6]['b']>, TO[ 6]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 7]['a'], TO[ 7]['b']>, TO[ 7]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 8]['a'], TO[ 8]['b']>, TO[ 8]['e']>>,
  Expect<Equal<BitwiseOr<TO[ 9]['a'], TO[ 9]['b']>, TO[ 9]['e']>>,
  Expect<Equal<BitwiseOr<TO[10]['a'], TO[10]['b']>, TO[10]['e']>>,
  Expect<Equal<BitwiseOr<TO[11]['a'], TO[11]['b']>, TO[11]['e']>>,
  Expect<Equal<BitwiseOr<TO[12]['a'], TO[12]['b']>, TO[12]['e']>>,
  Expect<Equal<BitwiseOr<TO[13]['a'], TO[13]['b']>, TO[13]['e']>>,
  Expect<Equal<BitwiseOr<TO[14]['a'], TO[14]['b']>, TO[14]['e']>>,
  Expect<Equal<BitwiseOr<TO[15]['a'], TO[15]['b']>, TO[15]['e']>>,
  Expect<Equal<BitwiseOr<TO[16]['a'], TO[16]['b']>, TO[16]['e']>>,
  Expect<Equal<BitwiseOr<TO[17]['a'], TO[17]['b']>, TO[17]['e']>>,
  Expect<Equal<BitwiseOr<TO[18]['a'], TO[18]['b']>, TO[18]['e']>>,
  Expect<Equal<BitwiseOr<TO[19]['a'], TO[19]['b']>, TO[19]['e']>>,
  Expect<Equal<BitwiseOr<TO[20]['a'], TO[20]['b']>, TO[20]['e']>>,
  Expect<Equal<BitwiseOr<TO[21]['a'], TO[21]['b']>, TO[21]['e']>>,
  Expect<Equal<BitwiseOr<TO[22]['a'], TO[22]['b']>, TO[22]['e']>>,
  Expect<Equal<BitwiseOr<TO[23]['a'], TO[23]['b']>, TO[23]['e']>>,
]


//----------------------------------------------------------------------
// BITWISE XOR
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/XOR

test.each(bitwiseXorTests)('$a ^ $b === $e', ({
  a,
  b,
  e,
  a_binary,
  b_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBe(+`0b${b_binary}`);
  
  expect(Number.isInteger(e)).toBe(true);
  expect(e).toBe(+`0b${e_binary}`);

  expect((a ^ b) >>> 0).toBe(e);

  expect(bitwiseXorTests).toHaveLength(24);
});

type TX = typeof bitwiseXorTests;

type iX = 5;

type aX = TX[iX]['a'];        // =>
type bX = TX[iX]['b'];        // =>
type eX = TX[iX]['e'];        // =>
type xX = BitwiseXor<aX, bX>  // =>

type aXb = TX[iX]['a_binary'];         // =>
type bXb = TX[iX]['b_binary'];         // =>
type eXb = TX[iX]['e_binary'];         // =>
type xXb = BitwiseXorBinary<aXb, bXb>  // =>

type testXor = [
  Expect<Equal<TA['length'], 24>>,

  Expect<Equal<BitwiseXorBinary<TX[ 0]['a_binary'], TX[ 0]['b_binary']>, TX[ 0]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 1]['a_binary'], TX[ 1]['b_binary']>, TX[ 1]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 2]['a_binary'], TX[ 2]['b_binary']>, TX[ 2]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 3]['a_binary'], TX[ 3]['b_binary']>, TX[ 3]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 4]['a_binary'], TX[ 4]['b_binary']>, TX[ 4]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 5]['a_binary'], TX[ 5]['b_binary']>, TX[ 5]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 6]['a_binary'], TX[ 6]['b_binary']>, TX[ 6]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 7]['a_binary'], TX[ 7]['b_binary']>, TX[ 7]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 8]['a_binary'], TX[ 8]['b_binary']>, TX[ 8]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[ 9]['a_binary'], TX[ 9]['b_binary']>, TX[ 9]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[10]['a_binary'], TX[10]['b_binary']>, TX[10]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[11]['a_binary'], TX[11]['b_binary']>, TX[11]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[12]['a_binary'], TX[12]['b_binary']>, TX[12]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[13]['a_binary'], TX[13]['b_binary']>, TX[13]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[14]['a_binary'], TX[14]['b_binary']>, TX[14]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[15]['a_binary'], TX[15]['b_binary']>, TX[15]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[16]['a_binary'], TX[16]['b_binary']>, TX[16]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[17]['a_binary'], TX[17]['b_binary']>, TX[17]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[18]['a_binary'], TX[18]['b_binary']>, TX[18]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[19]['a_binary'], TX[19]['b_binary']>, TX[19]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[20]['a_binary'], TX[20]['b_binary']>, TX[20]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[21]['a_binary'], TX[21]['b_binary']>, TX[21]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[22]['a_binary'], TX[22]['b_binary']>, TX[22]['e_binary']>>,
  Expect<Equal<BitwiseXorBinary<TX[23]['a_binary'], TX[23]['b_binary']>, TX[23]['e_binary']>>,

  Expect<Equal<BitwiseXor<TX[ 0]['a'], TX[ 0]['b']>, TX[ 0]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 1]['a'], TX[ 1]['b']>, TX[ 1]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 2]['a'], TX[ 2]['b']>, TX[ 2]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 3]['a'], TX[ 3]['b']>, TX[ 3]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 4]['a'], TX[ 4]['b']>, TX[ 4]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 5]['a'], TX[ 5]['b']>, TX[ 5]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 6]['a'], TX[ 6]['b']>, TX[ 6]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 7]['a'], TX[ 7]['b']>, TX[ 7]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 8]['a'], TX[ 8]['b']>, TX[ 8]['e']>>,
  Expect<Equal<BitwiseXor<TX[ 9]['a'], TX[ 9]['b']>, TX[ 9]['e']>>,
  Expect<Equal<BitwiseXor<TX[10]['a'], TX[10]['b']>, TX[10]['e']>>,
  Expect<Equal<BitwiseXor<TX[11]['a'], TX[11]['b']>, TX[11]['e']>>,
  Expect<Equal<BitwiseXor<TX[12]['a'], TX[12]['b']>, TX[12]['e']>>,
  Expect<Equal<BitwiseXor<TX[13]['a'], TX[13]['b']>, TX[13]['e']>>,
  Expect<Equal<BitwiseXor<TX[14]['a'], TX[14]['b']>, TX[14]['e']>>,
  Expect<Equal<BitwiseXor<TX[15]['a'], TX[15]['b']>, TX[15]['e']>>,
  Expect<Equal<BitwiseXor<TX[16]['a'], TX[16]['b']>, TX[16]['e']>>,
  Expect<Equal<BitwiseXor<TX[17]['a'], TX[17]['b']>, TX[17]['e']>>,
  Expect<Equal<BitwiseXor<TX[18]['a'], TX[18]['b']>, TX[18]['e']>>,
  Expect<Equal<BitwiseXor<TX[19]['a'], TX[19]['b']>, TX[19]['e']>>,
  Expect<Equal<BitwiseXor<TX[20]['a'], TX[20]['b']>, TX[20]['e']>>,
  Expect<Equal<BitwiseXor<TX[21]['a'], TX[21]['b']>, TX[21]['e']>>,
  Expect<Equal<BitwiseXor<TX[22]['a'], TX[22]['b']>, TX[22]['e']>>,
  Expect<Equal<BitwiseXor<TX[23]['a'], TX[23]['b']>, TX[23]['e']>>,
]
