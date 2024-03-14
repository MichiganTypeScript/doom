import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i32shr_u'
import { t, T } from '../../ts-type-math/test-cases/bitwise-shift'

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('shr_u($a, $b) === $shr_u', async ({ a, b, shr_u }) => {
  const entry = await getWasm("from-wat-single", 'single-i32shr_u');
  expect(entry(a, b)).toStrictEqual(shr_u);
});

type tests = [
  Expect<Equal<entry<[T[ 0]['a'], T[ 0]['b']]>, T[ 0]['shr_u']>>,
  Expect<Equal<entry<[T[ 1]['a'], T[ 1]['b']]>, T[ 1]['shr_u']>>,
  Expect<Equal<entry<[T[ 2]['a'], T[ 2]['b']]>, T[ 2]['shr_u']>>,
  Expect<Equal<entry<[T[ 3]['a'], T[ 3]['b']]>, T[ 3]['shr_u']>>,
  Expect<Equal<entry<[T[ 4]['a'], T[ 4]['b']]>, T[ 4]['shr_u']>>,
  Expect<Equal<entry<[T[ 5]['a'], T[ 5]['b']]>, T[ 5]['shr_u']>>,
  Expect<Equal<entry<[T[ 6]['a'], T[ 6]['b']]>, T[ 6]['shr_u']>>,
  Expect<Equal<entry<[T[ 7]['a'], T[ 7]['b']]>, T[ 7]['shr_u']>>,
  Expect<Equal<entry<[T[ 8]['a'], T[ 8]['b']]>, T[ 8]['shr_u']>>,
  Expect<Equal<entry<[T[ 9]['a'], T[ 9]['b']]>, T[ 9]['shr_u']>>,
  Expect<Equal<entry<[T[10]['a'], T[10]['b']]>, T[10]['shr_u']>>,
  Expect<Equal<entry<[T[11]['a'], T[11]['b']]>, T[11]['shr_u']>>,
  Expect<Equal<entry<[T[12]['a'], T[12]['b']]>, T[12]['shr_u']>>,
  Expect<Equal<entry<[T[13]['a'], T[13]['b']]>, T[13]['shr_u']>>,
  Expect<Equal<entry<[T[14]['a'], T[14]['b']]>, T[14]['shr_u']>>,
  Expect<Equal<entry<[T[15]['a'], T[15]['b']]>, T[15]['shr_u']>>,
  Expect<Equal<entry<[T[16]['a'], T[16]['b']]>, T[16]['shr_u']>>,
  Expect<Equal<entry<[T[17]['a'], T[17]['b']]>, T[17]['shr_u']>>,
  Expect<Equal<entry<[T[18]['a'], T[18]['b']]>, T[18]['shr_u']>>,
  Expect<Equal<entry<[T[19]['a'], T[19]['b']]>, T[19]['shr_u']>>,
  Expect<Equal<entry<[T[20]['a'], T[20]['b']]>, T[20]['shr_u']>>,
  Expect<Equal<entry<[T[21]['a'], T[21]['b']]>, T[21]['shr_u']>>,
  Expect<Equal<entry<[T[22]['a'], T[22]['b']]>, T[22]['shr_u']>>,
  Expect<Equal<entry<[T[23]['a'], T[23]['b']]>, T[23]['shr_u']>>,
  Expect<Equal<entry<[T[24]['a'], T[24]['b']]>, T[24]['shr_u']>>,
  Expect<Equal<entry<[T[25]['a'], T[25]['b']]>, T[25]['shr_u']>>,
  Expect<Equal<entry<[T[26]['a'], T[26]['b']]>, T[26]['shr_u']>>,
  Expect<Equal<entry<[T[27]['a'], T[27]['b']]>, T[27]['shr_u']>>,

  Expect<Equal<T['length'], 28>>,
]
