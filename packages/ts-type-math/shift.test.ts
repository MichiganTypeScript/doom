import { Equal, Expect } from 'type-testing';
import { test, expect } from 'vitest';
import { ShiftLeft, ShiftLeftBinary } from './shift';
import { shiftLeftTests } from './test-cases/shift-left';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift
const bitwiseShiftRightSigned = (a: number, b: number) => a >> b;

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift
const bitwiseShiftRightUnsigned = (a: number, b: number) => a >>> b;

/**********************/
/* BITWISE SHIFT LEFT */
/**********************/

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

// type lol = ShiftLeft<12345678, 5>; // =>

type i = 2;
type x = ShiftLeft<SL[i]['a'], SL[i]['b']> // =>
type y = SL[i]['expected'];                // =>

type test = [
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