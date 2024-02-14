import type { Expect, Equal } from 'type-testing';
import type { entry } from './shift-left.actual.d.ts'
import { shiftLeftTests } from '../../ts-type-math/test-cases/shift-left.ts';

import { getWasm } from '../utils.ts'
import { expect, test } from 'vitest';

const name = 'shift-left';
test(name, async () => {
  const entry = await getWasm('from-wat', name);
  expect(shiftLeftTests).toHaveLength(13);
  shiftLeftTests.forEach(({ a, b, expected }) => {
    expect(entry(a, b)).toStrictEqual(expected);
  });
});

type i = 2
type a = S[i]['a']        // =>
type b = S[i]['b']        // =>
type t = entry<[a, b]>    // =>
type e = S[i]['expected'] // =>

type S = typeof shiftLeftTests;

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
]
