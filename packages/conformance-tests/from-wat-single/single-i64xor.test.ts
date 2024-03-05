import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i64xor.actual'
import { t, T, Ops } from '../../ts-type-math/test-cases/bitwise-i64'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('xor($a, $b) === $xor', async ({ a, b, xor }) => {
  const entry = await getWasm<Ops['xor']>("from-wat-single", 'single-i64xor');
  expect(entry(a, b)).toStrictEqual(xor);
});

type tests = [
  Expect<Equal<entry<[T[ 0]['a'], T[ 0]['b']]>, T[ 0]['xor']>>,
  Expect<Equal<entry<[T[ 1]['a'], T[ 1]['b']]>, T[ 1]['xor']>>,
  Expect<Equal<entry<[T[ 2]['a'], T[ 2]['b']]>, T[ 2]['xor']>>,
  Expect<Equal<entry<[T[ 3]['a'], T[ 3]['b']]>, T[ 3]['xor']>>,
  Expect<Equal<entry<[T[ 4]['a'], T[ 4]['b']]>, T[ 4]['xor']>>,
  Expect<Equal<entry<[T[ 5]['a'], T[ 5]['b']]>, T[ 5]['xor']>>,
  Expect<Equal<entry<[T[ 6]['a'], T[ 6]['b']]>, T[ 6]['xor']>>,
  Expect<Equal<entry<[T[ 7]['a'], T[ 7]['b']]>, T[ 7]['xor']>>,
  Expect<Equal<entry<[T[ 8]['a'], T[ 8]['b']]>, T[ 8]['xor']>>,
  Expect<Equal<entry<[T[ 9]['a'], T[ 9]['b']]>, T[ 9]['xor']>>,
  Expect<Equal<entry<[T[10]['a'], T[10]['b']]>, T[10]['xor']>>,
  Expect<Equal<entry<[T[11]['a'], T[11]['b']]>, T[11]['xor']>>,
  Expect<Equal<entry<[T[12]['a'], T[12]['b']]>, T[12]['xor']>>,
  Expect<Equal<entry<[T[13]['a'], T[13]['b']]>, T[13]['xor']>>,
  Expect<Equal<entry<[T[14]['a'], T[14]['b']]>, T[14]['xor']>>,
  Expect<Equal<entry<[T[15]['a'], T[15]['b']]>, T[15]['xor']>>,
  Expect<Equal<entry<[T[16]['a'], T[16]['b']]>, T[16]['xor']>>,
  Expect<Equal<entry<[T[17]['a'], T[17]['b']]>, T[17]['xor']>>,
  Expect<Equal<entry<[T[18]['a'], T[18]['b']]>, T[18]['xor']>>,
  Expect<Equal<entry<[T[19]['a'], T[19]['b']]>, T[19]['xor']>>,
  Expect<Equal<entry<[T[20]['a'], T[20]['b']]>, T[20]['xor']>>,
  Expect<Equal<entry<[T[21]['a'], T[21]['b']]>, T[21]['xor']>>,
  Expect<Equal<entry<[T[22]['a'], T[22]['b']]>, T[22]['xor']>>,
  Expect<Equal<entry<[T[23]['a'], T[23]['b']]>, T[23]['xor']>>,

  Expect<Equal<T['length'], 24>>,
]
