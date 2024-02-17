import type { Expect, Equal } from 'type-testing';
import type { entry } from './shift-right-signed.actual'
import { shiftRightSignedTests } from '../../ts-type-math/test-cases/shift-right'

import { getWasm } from '../utils'
import { expect, test } from 'vitest'

const name = 'shift-right-signed';
test(name, async () => {
  const entry = await getWasm('from-wat', name);
  expect(shiftRightSignedTests).toHaveLength(28);
  shiftRightSignedTests.forEach(({ a, b, expected }) => {
    expect(entry(a, b) >>> 0).toStrictEqual(expected);
  });
});

type S = typeof shiftRightSignedTests;
type i = 2
type a = S[i]['a']        // =>
type b = S[i]['b']        // =>
type t = entry<[a, b]>    // =>
type e = S[i]['expected'] // =>

type testCases = [
  Expect<Equal<entry<[S[ 0]['a'], S[ 0]['b']]>, S[ 0]['expected']>>,
  Expect<Equal<entry<[S[ 1]['a'], S[ 1]['b']]>, S[ 1]['expected']>>,
  Expect<Equal<entry<[S[ 2]['a'], S[ 2]['b']]>, S[ 2]['expected']>>,
  Expect<Equal<entry<[S[ 3]['a'], S[ 3]['b']]>, S[ 3]['expected']>>,
  Expect<Equal<entry<[S[ 4]['a'], S[ 4]['b']]>, S[ 4]['expected']>>,
  Expect<Equal<entry<[S[ 5]['a'], S[ 5]['b']]>, S[ 5]['expected']>>,
  Expect<Equal<entry<[S[ 6]['a'], S[ 6]['b']]>, S[ 6]['expected']>>,
  Expect<Equal<entry<[S[ 7]['a'], S[ 7]['b']]>, S[ 7]['expected']>>,
  Expect<Equal<entry<[S[ 8]['a'], S[ 8]['b']]>, S[ 8]['expected']>>,
  Expect<Equal<entry<[S[ 9]['a'], S[ 9]['b']]>, S[ 9]['expected']>>,
  Expect<Equal<entry<[S[10]['a'], S[10]['b']]>, S[10]['expected']>>,
  Expect<Equal<entry<[S[11]['a'], S[11]['b']]>, S[11]['expected']>>,
  Expect<Equal<entry<[S[12]['a'], S[12]['b']]>, S[12]['expected']>>,
  Expect<Equal<entry<[S[13]['a'], S[13]['b']]>, S[13]['expected']>>,
  Expect<Equal<entry<[S[14]['a'], S[14]['b']]>, S[14]['expected']>>,
  Expect<Equal<entry<[S[15]['a'], S[15]['b']]>, S[15]['expected']>>,
  Expect<Equal<entry<[S[16]['a'], S[16]['b']]>, S[16]['expected']>>,
  Expect<Equal<entry<[S[17]['a'], S[17]['b']]>, S[17]['expected']>>,
  Expect<Equal<entry<[S[18]['a'], S[18]['b']]>, S[18]['expected']>>,
  Expect<Equal<entry<[S[19]['a'], S[19]['b']]>, S[19]['expected']>>,
  Expect<Equal<entry<[S[20]['a'], S[20]['b']]>, S[20]['expected']>>,
  Expect<Equal<entry<[S[21]['a'], S[21]['b']]>, S[21]['expected']>>,
  Expect<Equal<entry<[S[22]['a'], S[22]['b']]>, S[22]['expected']>>,
  Expect<Equal<entry<[S[23]['a'], S[23]['b']]>, S[23]['expected']>>,
  Expect<Equal<entry<[S[24]['a'], S[24]['b']]>, S[24]['expected']>>,
  Expect<Equal<entry<[S[25]['a'], S[25]['b']]>, S[25]['expected']>>,
  Expect<Equal<entry<[S[26]['a'], S[26]['b']]>, S[26]['expected']>>,
  Expect<Equal<entry<[S[27]['a'], S[27]['b']]>, S[27]['expected']>>,
]
