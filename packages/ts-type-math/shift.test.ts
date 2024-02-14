import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft, ShiftLeftBinary, ShiftRight, ShiftRightBinary } from './shift';
import { shiftLeftTests } from './test-cases/shift-left';
import { shiftRightSignedTests, shiftRightUnsignedTests } from './test-cases/shift-right';
import { ReverseString } from './binary';

//----------------------------------------------------------------------
// SHIFT LEFT UNSIGNED
// https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric/Left_shift

test.each(shiftLeftTests)('$a << $b === $expected', ({
  a,
  b,
  expected,
  a_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);

  expect(Number.isInteger(expected)).toBe(true);
  expect(expected).toBe(+`0b${e_binary}`);

  expect(a << b).toBe(expected);
});

type SL = typeof shiftLeftTests;

type iL = 2;
type xL = ShiftLeft<SL[iL]['a'], SL[iL]['b']> // =>
type yL = SL[iL]['expected'];                 // =>

type testSL = [
  Expect<Equal<SL['length'], 13>>,

  Expect<Equal<ShiftLeftBinary<SL[ 0]['a_binary'], SL[ 0]['b']>, SL[ 0]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 1]['a_binary'], SL[ 1]['b']>, SL[ 1]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 2]['a_binary'], SL[ 2]['b']>, SL[ 2]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 3]['a_binary'], SL[ 3]['b']>, SL[ 3]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 4]['a_binary'], SL[ 4]['b']>, SL[ 4]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 5]['a_binary'], SL[ 5]['b']>, SL[ 5]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 6]['a_binary'], SL[ 6]['b']>, SL[ 6]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 7]['a_binary'], SL[ 7]['b']>, SL[ 7]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 8]['a_binary'], SL[ 8]['b']>, SL[ 8]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[ 9]['a_binary'], SL[ 9]['b']>, SL[ 9]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[10]['a_binary'], SL[10]['b']>, SL[10]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[11]['a_binary'], SL[11]['b']>, SL[11]['e_binary']>>,
  Expect<Equal<ShiftLeftBinary<SL[12]['a_binary'], SL[12]['b']>, SL[12]['e_binary']>>,

  Expect<Equal<ShiftLeft<SL[ 0]['a'], SL[ 0]['b']>, SL[ 0]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 1]['a'], SL[ 1]['b']>, SL[ 1]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 2]['a'], SL[ 2]['b']>, SL[ 2]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 3]['a'], SL[ 3]['b']>, SL[ 3]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 4]['a'], SL[ 4]['b']>, SL[ 4]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 5]['a'], SL[ 5]['b']>, SL[ 5]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 6]['a'], SL[ 6]['b']>, SL[ 6]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 7]['a'], SL[ 7]['b']>, SL[ 7]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 8]['a'], SL[ 8]['b']>, SL[ 8]['expected']>>,
  Expect<Equal<ShiftLeft<SL[ 9]['a'], SL[ 9]['b']>, SL[ 9]['expected']>>,
  Expect<Equal<ShiftLeft<SL[10]['a'], SL[10]['b']>, SL[10]['expected']>>,
  Expect<Equal<ShiftLeft<SL[11]['a'], SL[11]['b']>, SL[11]['expected']>>,
  Expect<Equal<ShiftLeft<SL[12]['a'], SL[12]['b']>, SL[12]['expected']>>,
]

//----------------------------------------------------------------------
// SHIFT RIGHT UNSIGNED

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
test.each(shiftRightUnsignedTests)('$a >>> $b === $expected', ({
  a,
  b,
  expected,
  a_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);

  expect(Number.isInteger(expected)).toBe(true);
  expect(expected).toBe(+`0b${e_binary}`);

  expect(a >>> b).toBe(expected);
});

type SRu  = typeof shiftRightUnsignedTests;
type sRuLen = SRu['length'] // =>
type iRu  = 0
type bRu  = SRu[iRu]['b']                      // =>

type x = "abc" extends `${infer R}${string}` ? R : never;
//   ^?

type abRu = SRu[iRu]['a_binary']                // =>
type rbRu = ShiftRightBinary<abRu, bRu, false>  // =>
type ebRu = SRu[iRu]['e_binary']                // =>

type aRu  = SRu[iRu]['a']                      // =>
type rRu  = ShiftRight<aRu, bRu, false>        // =>
type yRu  = SRu[iRu]['expected']               // =>

type testSRu = [
  Expect<Equal<SRu['length'], 28>>,

  Expect<Equal<ShiftRightBinary<SRu[ 0]['a_binary'], SRu[ 0]['b'], false>, SRu[ 0]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 1]['a_binary'], SRu[ 1]['b'], false>, SRu[ 1]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 2]['a_binary'], SRu[ 2]['b'], false>, SRu[ 2]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 3]['a_binary'], SRu[ 3]['b'], false>, SRu[ 3]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 4]['a_binary'], SRu[ 4]['b'], false>, SRu[ 4]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 5]['a_binary'], SRu[ 5]['b'], false>, SRu[ 5]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 6]['a_binary'], SRu[ 6]['b'], false>, SRu[ 6]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 7]['a_binary'], SRu[ 7]['b'], false>, SRu[ 7]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 8]['a_binary'], SRu[ 8]['b'], false>, SRu[ 8]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[ 9]['a_binary'], SRu[ 9]['b'], false>, SRu[ 9]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[10]['a_binary'], SRu[10]['b'], false>, SRu[10]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[11]['a_binary'], SRu[11]['b'], false>, SRu[11]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[12]['a_binary'], SRu[12]['b'], false>, SRu[12]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[13]['a_binary'], SRu[13]['b'], false>, SRu[13]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[14]['a_binary'], SRu[14]['b'], false>, SRu[14]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[15]['a_binary'], SRu[15]['b'], false>, SRu[15]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[16]['a_binary'], SRu[16]['b'], false>, SRu[16]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[17]['a_binary'], SRu[17]['b'], false>, SRu[17]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[18]['a_binary'], SRu[18]['b'], false>, SRu[18]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[19]['a_binary'], SRu[19]['b'], false>, SRu[19]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[20]['a_binary'], SRu[20]['b'], false>, SRu[20]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[21]['a_binary'], SRu[21]['b'], false>, SRu[21]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[22]['a_binary'], SRu[22]['b'], false>, SRu[22]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[23]['a_binary'], SRu[23]['b'], false>, SRu[23]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[24]['a_binary'], SRu[24]['b'], false>, SRu[24]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[25]['a_binary'], SRu[25]['b'], false>, SRu[25]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[26]['a_binary'], SRu[26]['b'], false>, SRu[26]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRu[27]['a_binary'], SRu[27]['b'], false>, SRu[27]['e_binary']>>,

  Expect<Equal<ShiftRight<SRu[ 0]['a'], SRu[ 0]['b'], false>, SRu[ 0]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 1]['a'], SRu[ 1]['b'], false>, SRu[ 1]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 2]['a'], SRu[ 2]['b'], false>, SRu[ 2]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 3]['a'], SRu[ 3]['b'], false>, SRu[ 3]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 4]['a'], SRu[ 4]['b'], false>, SRu[ 4]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 5]['a'], SRu[ 5]['b'], false>, SRu[ 5]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 6]['a'], SRu[ 6]['b'], false>, SRu[ 6]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 7]['a'], SRu[ 7]['b'], false>, SRu[ 7]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 8]['a'], SRu[ 8]['b'], false>, SRu[ 8]['expected']>>,
  Expect<Equal<ShiftRight<SRu[ 9]['a'], SRu[ 9]['b'], false>, SRu[ 9]['expected']>>,
  Expect<Equal<ShiftRight<SRu[10]['a'], SRu[10]['b'], false>, SRu[10]['expected']>>,
  Expect<Equal<ShiftRight<SRu[11]['a'], SRu[11]['b'], false>, SRu[11]['expected']>>,
  Expect<Equal<ShiftRight<SRu[12]['a'], SRu[12]['b'], false>, SRu[12]['expected']>>,
  Expect<Equal<ShiftRight<SRu[13]['a'], SRu[13]['b'], false>, SRu[13]['expected']>>,
  Expect<Equal<ShiftRight<SRu[14]['a'], SRu[14]['b'], false>, SRu[14]['expected']>>,
  Expect<Equal<ShiftRight<SRu[15]['a'], SRu[15]['b'], false>, SRu[15]['expected']>>,
  Expect<Equal<ShiftRight<SRu[16]['a'], SRu[16]['b'], false>, SRu[16]['expected']>>,
  Expect<Equal<ShiftRight<SRu[17]['a'], SRu[17]['b'], false>, SRu[17]['expected']>>,
  Expect<Equal<ShiftRight<SRu[18]['a'], SRu[18]['b'], false>, SRu[18]['expected']>>,
  Expect<Equal<ShiftRight<SRu[19]['a'], SRu[19]['b'], false>, SRu[19]['expected']>>,
  Expect<Equal<ShiftRight<SRu[20]['a'], SRu[20]['b'], false>, SRu[20]['expected']>>,
  Expect<Equal<ShiftRight<SRu[21]['a'], SRu[21]['b'], false>, SRu[21]['expected']>>,
  Expect<Equal<ShiftRight<SRu[22]['a'], SRu[22]['b'], false>, SRu[22]['expected']>>,
  Expect<Equal<ShiftRight<SRu[23]['a'], SRu[23]['b'], false>, SRu[23]['expected']>>,
  Expect<Equal<ShiftRight<SRu[24]['a'], SRu[24]['b'], false>, SRu[24]['expected']>>,
  Expect<Equal<ShiftRight<SRu[25]['a'], SRu[25]['b'], false>, SRu[25]['expected']>>,
  Expect<Equal<ShiftRight<SRu[26]['a'], SRu[26]['b'], false>, SRu[26]['expected']>>,
  Expect<Equal<ShiftRight<SRu[27]['a'], SRu[27]['b'], false>, SRu[27]['expected']>>,
]

type SRs  = typeof shiftRightSignedTests;
type sRsLen = SRs['length'] // =>
type iRs  = 14
type bRs  = SRs[iRs]['b']                      // =>

type abRs = SRs[iRs]['a_binary']                // =>
type rbRs = ShiftRightBinary<abRs, bRs, false>  // =>
type ebRs = SRs[iRs]['e_binary']                // =>

type aRs  = SRs[iRs]['a']                      // =>
type rRs  = ShiftRight<aRs, bRs, false>        // =>
type yRs  = SRs[iRs]['expected']               // =>

// // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift
// const bitwiseShiftRightSigned = (a: number, b: number) => a >> b;
//----------------------------------------------------------------------
// SHIFT RIGHT SIGNED

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
test.each(shiftRightSignedTests)('$a >> $b === $expected', ({
  a,
  b,
  expected,
  a_binary,
  e_binary,
}) => {
  expect(Number.isInteger(a)).toBe(true);
  expect(a).toBe(+`0b${a_binary}`);

  expect(Number.isInteger(b)).toBe(true);
  expect(b).toBeGreaterThanOrEqual(0);
  expect(b).toBeLessThanOrEqual(32);

  expect(Number.isInteger(expected)).toBe(true);
  expect(expected).toBe(+`0b${e_binary}`);

  // the extra `>>> 0` is to convert the result to an unsigned 32-bit integer
  // just as a matter of convenience, we treat all numbers as unsigned 32-bit integers
  expect((a >> b) >>> 0).toBe(expected);
});

type testSRs = [
  Expect<Equal<SRs['length'], 28>>,

  Expect<Equal<ShiftRightBinary<SRs[ 0]['a_binary'], SRs[ 0]['b'], true>, SRs[ 0]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 1]['a_binary'], SRs[ 1]['b'], true>, SRs[ 1]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 2]['a_binary'], SRs[ 2]['b'], true>, SRs[ 2]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 3]['a_binary'], SRs[ 3]['b'], true>, SRs[ 3]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 4]['a_binary'], SRs[ 4]['b'], true>, SRs[ 4]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 5]['a_binary'], SRs[ 5]['b'], true>, SRs[ 5]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 6]['a_binary'], SRs[ 6]['b'], true>, SRs[ 6]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 7]['a_binary'], SRs[ 7]['b'], true>, SRs[ 7]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 8]['a_binary'], SRs[ 8]['b'], true>, SRs[ 8]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[ 9]['a_binary'], SRs[ 9]['b'], true>, SRs[ 9]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[10]['a_binary'], SRs[10]['b'], true>, SRs[10]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[11]['a_binary'], SRs[11]['b'], true>, SRs[11]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[12]['a_binary'], SRs[12]['b'], true>, SRs[12]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[13]['a_binary'], SRs[13]['b'], true>, SRs[13]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[14]['a_binary'], SRs[14]['b'], true>, SRs[14]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[15]['a_binary'], SRs[15]['b'], true>, SRs[15]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[16]['a_binary'], SRs[16]['b'], true>, SRs[16]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[17]['a_binary'], SRs[17]['b'], true>, SRs[17]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[18]['a_binary'], SRs[18]['b'], true>, SRs[18]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[19]['a_binary'], SRs[19]['b'], true>, SRs[19]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[20]['a_binary'], SRs[20]['b'], true>, SRs[20]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[21]['a_binary'], SRs[21]['b'], true>, SRs[21]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[22]['a_binary'], SRs[22]['b'], true>, SRs[22]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[23]['a_binary'], SRs[23]['b'], true>, SRs[23]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[24]['a_binary'], SRs[24]['b'], true>, SRs[24]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[25]['a_binary'], SRs[25]['b'], true>, SRs[25]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[26]['a_binary'], SRs[26]['b'], true>, SRs[26]['e_binary']>>,
  Expect<Equal<ShiftRightBinary<SRs[27]['a_binary'], SRs[27]['b'], true>, SRs[27]['e_binary']>>,

  Expect<Equal<ShiftRight<SRs[ 0]['a'], SRs[ 0]['b'], true>, SRs[ 0]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 1]['a'], SRs[ 1]['b'], true>, SRs[ 1]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 2]['a'], SRs[ 2]['b'], true>, SRs[ 2]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 3]['a'], SRs[ 3]['b'], true>, SRs[ 3]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 4]['a'], SRs[ 4]['b'], true>, SRs[ 4]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 5]['a'], SRs[ 5]['b'], true>, SRs[ 5]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 6]['a'], SRs[ 6]['b'], true>, SRs[ 6]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 7]['a'], SRs[ 7]['b'], true>, SRs[ 7]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 8]['a'], SRs[ 8]['b'], true>, SRs[ 8]['expected']>>,
  Expect<Equal<ShiftRight<SRs[ 9]['a'], SRs[ 9]['b'], true>, SRs[ 9]['expected']>>,
  Expect<Equal<ShiftRight<SRs[10]['a'], SRs[10]['b'], true>, SRs[10]['expected']>>,
  Expect<Equal<ShiftRight<SRs[11]['a'], SRs[11]['b'], true>, SRs[11]['expected']>>,
  Expect<Equal<ShiftRight<SRs[12]['a'], SRs[12]['b'], true>, SRs[12]['expected']>>,
  Expect<Equal<ShiftRight<SRs[13]['a'], SRs[13]['b'], true>, SRs[13]['expected']>>,
  Expect<Equal<ShiftRight<SRs[14]['a'], SRs[14]['b'], true>, SRs[14]['expected']>>,
  Expect<Equal<ShiftRight<SRs[15]['a'], SRs[15]['b'], true>, SRs[15]['expected']>>,
  Expect<Equal<ShiftRight<SRs[16]['a'], SRs[16]['b'], true>, SRs[16]['expected']>>,
  Expect<Equal<ShiftRight<SRs[17]['a'], SRs[17]['b'], true>, SRs[17]['expected']>>,
  Expect<Equal<ShiftRight<SRs[18]['a'], SRs[18]['b'], true>, SRs[18]['expected']>>,
  Expect<Equal<ShiftRight<SRs[19]['a'], SRs[19]['b'], true>, SRs[19]['expected']>>,
  Expect<Equal<ShiftRight<SRs[20]['a'], SRs[20]['b'], true>, SRs[20]['expected']>>,
  Expect<Equal<ShiftRight<SRs[21]['a'], SRs[21]['b'], true>, SRs[21]['expected']>>,
  Expect<Equal<ShiftRight<SRs[22]['a'], SRs[22]['b'], true>, SRs[22]['expected']>>,
  Expect<Equal<ShiftRight<SRs[23]['a'], SRs[23]['b'], true>, SRs[23]['expected']>>,
  Expect<Equal<ShiftRight<SRs[24]['a'], SRs[24]['b'], true>, SRs[24]['expected']>>,
  Expect<Equal<ShiftRight<SRs[25]['a'], SRs[25]['b'], true>, SRs[25]['expected']>>,
  Expect<Equal<ShiftRight<SRs[26]['a'], SRs[26]['b'], true>, SRs[26]['expected']>>,
  Expect<Equal<ShiftRight<SRs[27]['a'], SRs[27]['b'], true>, SRs[27]['expected']>>,
]