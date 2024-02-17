import type { Expect, Equal } from 'type-testing';
import type { entry } from './shift-left.actual'
import { t, T } from '../../ts-type-math/test-cases/binary-shift-left';

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'shift-left';
test(name, async () => {
  const entry = await getWasm('from-wat', name);
  expect(t).toHaveLength(13);
  t.forEach(({ a, b, expected }) => {
    expect(entry(a, b)).toStrictEqual(expected);
  });
});

type i = 2
type a = T[i]['a']        // =>
type b = T[i]['b']        // =>
type e = T[i]['expected'] // =>
type t = entry<[a, b]>    // =>

type testCases = [
  Expect<Equal<entry<[T[ 0]['a'], T[ 0]['b']]>, T[ 0]['expected']>>,
  Expect<Equal<entry<[T[ 1]['a'], T[ 1]['b']]>, T[ 1]['expected']>>,
  Expect<Equal<entry<[T[ 2]['a'], T[ 2]['b']]>, T[ 2]['expected']>>,
  Expect<Equal<entry<[T[ 3]['a'], T[ 3]['b']]>, T[ 3]['expected']>>,
  Expect<Equal<entry<[T[ 4]['a'], T[ 4]['b']]>, T[ 4]['expected']>>,
  Expect<Equal<entry<[T[ 5]['a'], T[ 5]['b']]>, T[ 5]['expected']>>,
  Expect<Equal<entry<[T[ 6]['a'], T[ 6]['b']]>, T[ 6]['expected']>>,
  Expect<Equal<entry<[T[ 7]['a'], T[ 7]['b']]>, T[ 7]['expected']>>,
  Expect<Equal<entry<[T[ 8]['a'], T[ 8]['b']]>, T[ 8]['expected']>>,
  Expect<Equal<entry<[T[ 9]['a'], T[ 9]['b']]>, T[ 9]['expected']>>,
  Expect<Equal<entry<[T[10]['a'], T[10]['b']]>, T[10]['expected']>>,
  Expect<Equal<entry<[T[11]['a'], T[11]['b']]>, T[11]['expected']>>,
  Expect<Equal<entry<[T[12]['a'], T[12]['b']]>, T[12]['expected']>>,
]
