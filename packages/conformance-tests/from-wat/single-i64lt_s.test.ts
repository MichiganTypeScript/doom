import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i64lt_s.actual'
import { t, T, Ops } from '../../ts-type-math/test-cases/comparison-i64'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('lt_s($a, $b) === $lt_s', async ({ a, b, lt_s }) => {
  const entry = await getWasm<Ops['lt_s']>("from-wat", 'single-i64lt_s');
  expect(entry(a, b)).toStrictEqual(lt_s);
});

type tests = [
  Expect<Equal<entry<[T[ 0]['a'], T[ 0]['b']]>, T[ 0]['lt_s']>>,
  Expect<Equal<entry<[T[ 1]['a'], T[ 1]['b']]>, T[ 1]['lt_s']>>,
  Expect<Equal<entry<[T[ 2]['a'], T[ 2]['b']]>, T[ 2]['lt_s']>>,
  Expect<Equal<entry<[T[ 3]['a'], T[ 3]['b']]>, T[ 3]['lt_s']>>,
  Expect<Equal<entry<[T[ 4]['a'], T[ 4]['b']]>, T[ 4]['lt_s']>>,
  Expect<Equal<entry<[T[ 5]['a'], T[ 5]['b']]>, T[ 5]['lt_s']>>,
  Expect<Equal<entry<[T[ 6]['a'], T[ 6]['b']]>, T[ 6]['lt_s']>>,
  Expect<Equal<entry<[T[ 7]['a'], T[ 7]['b']]>, T[ 7]['lt_s']>>,
  Expect<Equal<entry<[T[ 8]['a'], T[ 8]['b']]>, T[ 8]['lt_s']>>,
  Expect<Equal<entry<[T[ 9]['a'], T[ 9]['b']]>, T[ 9]['lt_s']>>,
  Expect<Equal<entry<[T[10]['a'], T[10]['b']]>, T[10]['lt_s']>>,
  Expect<Equal<entry<[T[11]['a'], T[11]['b']]>, T[11]['lt_s']>>,
  Expect<Equal<entry<[T[12]['a'], T[12]['b']]>, T[12]['lt_s']>>,
  Expect<Equal<entry<[T[13]['a'], T[13]['b']]>, T[13]['lt_s']>>,
  Expect<Equal<entry<[T[14]['a'], T[14]['b']]>, T[14]['lt_s']>>,
  Expect<Equal<entry<[T[15]['a'], T[15]['b']]>, T[15]['lt_s']>>,
  Expect<Equal<entry<[T[16]['a'], T[16]['b']]>, T[16]['lt_s']>>,
  Expect<Equal<entry<[T[17]['a'], T[17]['b']]>, T[17]['lt_s']>>,
  Expect<Equal<entry<[T[18]['a'], T[18]['b']]>, T[18]['lt_s']>>,
  Expect<Equal<entry<[T[19]['a'], T[19]['b']]>, T[19]['lt_s']>>,
  Expect<Equal<entry<[T[20]['a'], T[20]['b']]>, T[20]['lt_s']>>,
  Expect<Equal<entry<[T[21]['a'], T[21]['b']]>, T[21]['lt_s']>>,
  Expect<Equal<entry<[T[22]['a'], T[22]['b']]>, T[22]['lt_s']>>,
  Expect<Equal<entry<[T[23]['a'], T[23]['b']]>, T[23]['lt_s']>>,
  Expect<Equal<entry<[T[24]['a'], T[24]['b']]>, T[24]['lt_s']>>,
  Expect<Equal<entry<[T[25]['a'], T[25]['b']]>, T[25]['lt_s']>>,
  Expect<Equal<entry<[T[26]['a'], T[26]['b']]>, T[26]['lt_s']>>,
  Expect<Equal<entry<[T[27]['a'], T[27]['b']]>, T[27]['lt_s']>>,
  Expect<Equal<entry<[T[28]['a'], T[28]['b']]>, T[28]['lt_s']>>,
  Expect<Equal<entry<[T[29]['a'], T[29]['b']]>, T[29]['lt_s']>>,
  Expect<Equal<entry<[T[30]['a'], T[30]['b']]>, T[30]['lt_s']>>,
  Expect<Equal<entry<[T[31]['a'], T[31]['b']]>, T[31]['lt_s']>>,

  Expect<Equal<T['length'], 32>>,
]
