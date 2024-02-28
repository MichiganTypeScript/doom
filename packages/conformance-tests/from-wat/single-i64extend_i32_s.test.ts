import type { Expect, Equal } from 'type-testing';
import type { entry } from './single-i64extend_i32_s.actual'
import { tExtend as t, TExtend as T, Ops } from '../../ts-type-math/test-cases/wasm-conversion';

import { test, expect } from 'vitest';
import { getWasm } from '../utils'

test.each(t)('extend_i32_s($a) === $extend_i32_s', async ({ a, extend_i32_s }) => {
  const entry = await getWasm<Ops['extend_i32_s']>("from-wat", 'single-i64extend_i32_s');
  expect(entry(a)).toStrictEqual(extend_i32_s);
});

type i = 0
type a = T[i]['a']           // =>
type u = T[i]['extend_i32_s']// =>
type x = entry<[a]>          // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['extend_i32_s']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['extend_i32_s']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['extend_i32_s']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['extend_i32_s']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['extend_i32_s']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['extend_i32_s']>>,

  Expect<Equal<T['length'], 6>>,
]
