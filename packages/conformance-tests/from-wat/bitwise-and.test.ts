import type { Expect, Equal } from 'type-testing';
import type { entry } from './bitwise-and.actual'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'
import { t, T } from '../../ts-type-math/test-cases/binary-and';

const name = 'bitwise-and';
test(name, async () => {
  const entry = await getWasm('from-wat', name);
  expect(t).toHaveLength(24);
  t.forEach(({ a, b, e }) => {
    expect(entry(a, b) >> 0).toStrictEqual(e);
  });
});

type i = 2
type a = T[i]['a']     // =>
type b = T[i]['b']     // =>
type e = T[i]['e']     // =>
type t = entry<[a, b]> // =>

type testCases = [
  Expect<Equal<entry<[T[ 0]['a'], T[ 0]['b']]>, T[ 0]['e']>>,
  Expect<Equal<entry<[T[ 1]['a'], T[ 1]['b']]>, T[ 1]['e']>>,
  Expect<Equal<entry<[T[ 2]['a'], T[ 2]['b']]>, T[ 2]['e']>>,
  Expect<Equal<entry<[T[ 3]['a'], T[ 3]['b']]>, T[ 3]['e']>>,
  Expect<Equal<entry<[T[ 4]['a'], T[ 4]['b']]>, T[ 4]['e']>>,
  Expect<Equal<entry<[T[ 5]['a'], T[ 5]['b']]>, T[ 5]['e']>>,
  Expect<Equal<entry<[T[ 6]['a'], T[ 6]['b']]>, T[ 6]['e']>>,
  Expect<Equal<entry<[T[ 7]['a'], T[ 7]['b']]>, T[ 7]['e']>>,
  Expect<Equal<entry<[T[ 8]['a'], T[ 8]['b']]>, T[ 8]['e']>>,
  Expect<Equal<entry<[T[ 9]['a'], T[ 9]['b']]>, T[ 9]['e']>>,
  Expect<Equal<entry<[T[10]['a'], T[10]['b']]>, T[10]['e']>>,
  Expect<Equal<entry<[T[11]['a'], T[11]['b']]>, T[11]['e']>>,
  Expect<Equal<entry<[T[12]['a'], T[12]['b']]>, T[12]['e']>>,
  Expect<Equal<entry<[T[13]['a'], T[13]['b']]>, T[13]['e']>>,
  Expect<Equal<entry<[T[14]['a'], T[14]['b']]>, T[14]['e']>>,
  Expect<Equal<entry<[T[15]['a'], T[15]['b']]>, T[15]['e']>>,
  Expect<Equal<entry<[T[16]['a'], T[16]['b']]>, T[16]['e']>>,
  Expect<Equal<entry<[T[17]['a'], T[17]['b']]>, T[17]['e']>>,
  Expect<Equal<entry<[T[18]['a'], T[18]['b']]>, T[18]['e']>>,
  Expect<Equal<entry<[T[19]['a'], T[19]['b']]>, T[19]['e']>>,
  Expect<Equal<entry<[T[20]['a'], T[20]['b']]>, T[20]['e']>>,
  Expect<Equal<entry<[T[21]['a'], T[21]['b']]>, T[21]['e']>>,
  Expect<Equal<entry<[T[22]['a'], T[22]['b']]>, T[22]['e']>>,
  Expect<Equal<entry<[T[23]['a'], T[23]['b']]>, T[23]['e']>>,
]
