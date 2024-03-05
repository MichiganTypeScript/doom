import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i32eqz.actual'
import { t, T } from '../../ts-type-math/test-cases/comparison'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('eqz($a) === $eqz', async ({ a, b, eqz }) => {
  const entry = await getWasm("from-wat-single", 'single-i32eqz');
  expect(entry(a)).toStrictEqual(eqz);
});

type i = 0;
type a = T[i]['a'];   // =>
type b = T[i]['b'];   // =>
type e = T[i]['eqz']; // =>
type x = entry<[a]>;  // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['eqz']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['eqz']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['eqz']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['eqz']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['eqz']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['eqz']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['eqz']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['eqz']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['eqz']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['eqz']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['eqz']>>,
  Expect<Equal<entry<[T[11]['a']]>, T[11]['eqz']>>,
  Expect<Equal<entry<[T[12]['a']]>, T[12]['eqz']>>,
  Expect<Equal<entry<[T[13]['a']]>, T[13]['eqz']>>,
  Expect<Equal<entry<[T[14]['a']]>, T[14]['eqz']>>,
  Expect<Equal<entry<[T[15]['a']]>, T[15]['eqz']>>,
  Expect<Equal<entry<[T[16]['a']]>, T[16]['eqz']>>,
  Expect<Equal<entry<[T[17]['a']]>, T[17]['eqz']>>,
  Expect<Equal<entry<[T[18]['a']]>, T[18]['eqz']>>,
  Expect<Equal<entry<[T[19]['a']]>, T[19]['eqz']>>,
  Expect<Equal<entry<[T[20]['a']]>, T[20]['eqz']>>,
  Expect<Equal<entry<[T[21]['a']]>, T[21]['eqz']>>,
  Expect<Equal<entry<[T[22]['a']]>, T[22]['eqz']>>,
  Expect<Equal<entry<[T[23]['a']]>, T[23]['eqz']>>,
  Expect<Equal<entry<[T[24]['a']]>, T[24]['eqz']>>,
  Expect<Equal<entry<[T[25]['a']]>, T[25]['eqz']>>,
  Expect<Equal<entry<[T[26]['a']]>, T[26]['eqz']>>,
  Expect<Equal<entry<[T[27]['a']]>, T[27]['eqz']>>,
  Expect<Equal<entry<[T[28]['a']]>, T[28]['eqz']>>,
  Expect<Equal<entry<[T[29]['a']]>, T[29]['eqz']>>,
  Expect<Equal<entry<[T[30]['a']]>, T[30]['eqz']>>,
  Expect<Equal<entry<[T[31]['a']]>, T[31]['eqz']>>,

  Expect<Equal<T['length'], 32>>,
]
