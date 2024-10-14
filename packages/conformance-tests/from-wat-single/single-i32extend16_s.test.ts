import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i32extend16_s'
import { tExtend as t, TExtend as T, Ops } from '../../ts-type-math/test-cases/wasm-conversion';

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('i32.extend16_s($a) === $extend16_s', async ({ a, i32extend16_s }) => {
  const entry = await getWasm<Ops['i32extend16_s']>("from-wat-single", 'single-i32extend16_s');
  expect(entry(a)).toStrictEqual(i32extend16_s);
});

type i = 3
type a = T[i]['a']             // =>
type u = T[i]['i32extend16_s'] // =>
type x = entry<[a]>            // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['i32extend16_s']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['i32extend16_s']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['i32extend16_s']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['i32extend16_s']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['i32extend16_s']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['i32extend16_s']>>,

  Expect<Equal<T['length'], 6>>,
]
