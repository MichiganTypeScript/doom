import type { Expect, Equal } from 'type-testing';
import type { entry } from "./shift-left.actual.d.ts"
import { shiftLeftTests } from '../../ts-type-math/test-cases/shift-left.ts';


import { getWasm } from '../utils.ts'
import { expect, test } from 'vitest';

const name = 'shift-left';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(shiftLeftTests).toHaveLength(13);
  shiftLeftTests.forEach(({ a, b, expected }) => {
    expect(entry(a, b)).toStrictEqual(expected);
  });
});

type i = 2
type a = SL[i]['a']        // =>
type b = SL[i]['b']        // =>
type t = entry<[a, b]>     // =>
type e = SL[i]['expected'] // =>

type SL = typeof shiftLeftTests;

type testCases = [
  Expect<Equal<entry<[SL[ 0]['a'], SL[ 0]['b']]>, SL[ 0]['expected']>>,
  Expect<Equal<entry<[SL[ 1]['a'], SL[ 1]['b']]>, SL[ 1]['expected']>>,
  Expect<Equal<entry<[SL[ 2]['a'], SL[ 2]['b']]>, SL[ 2]['expected']>>,
  Expect<Equal<entry<[SL[ 3]['a'], SL[ 3]['b']]>, SL[ 3]['expected']>>,
  Expect<Equal<entry<[SL[ 4]['a'], SL[ 4]['b']]>, SL[ 4]['expected']>>,
  Expect<Equal<entry<[SL[ 5]['a'], SL[ 5]['b']]>, SL[ 5]['expected']>>,
  Expect<Equal<entry<[SL[ 6]['a'], SL[ 6]['b']]>, SL[ 6]['expected']>>,
  Expect<Equal<entry<[SL[ 7]['a'], SL[ 7]['b']]>, SL[ 7]['expected']>>,
  Expect<Equal<entry<[SL[ 8]['a'], SL[ 8]['b']]>, SL[ 8]['expected']>>,
  Expect<Equal<entry<[SL[ 9]['a'], SL[ 9]['b']]>, SL[ 9]['expected']>>,
  Expect<Equal<entry<[SL[10]['a'], SL[10]['b']]>, SL[10]['expected']>>,
  Expect<Equal<entry<[SL[11]['a'], SL[11]['b']]>, SL[11]['expected']>>,
  Expect<Equal<entry<[SL[12]['a'], SL[12]['b']]>, SL[12]['expected']>>,
]
