import { Expect, Equal } from 'type-testing';
import type { entry } from "./memory-offset.actual.js"

import { getWasm } from '../utils.js'
import { expect, test } from 'vitest';

const example = (a: number, b: number, c: number) => {
  return (b - a) + c
}

test("memory-offset example", async () => {
  expect(example(1, 2, 3)).toStrictEqual(4);
  expect(example(10, 20, 30)).toStrictEqual(40);
  expect(example(2, 3, 4)).toStrictEqual(5);
  expect(example(0, 0, 0)).toStrictEqual(0);
  expect(example(-1, -100, 10)).toStrictEqual(-89);
  expect(example(-1, -2, -3)).toStrictEqual(-4);
});


const name = 'memory-offset';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1, 2, 3)).toStrictEqual(4);
  expect(entry(10, 20, 30)).toStrictEqual(40);
  expect(entry(2, 3, 4)).toStrictEqual(5);
  expect(entry(0, 0, 0)).toStrictEqual(0);
  expect(entry(-1, -100, 10)).toStrictEqual(-89);
  expect(entry(-1, -2, -3)).toStrictEqual(-4);
});

type testCases = [
  Expect<Equal<entry<[1, 2, 3]>, 4>>,
  Expect<Equal<entry<[10, 20, 30]>, 40>>,
  Expect<Equal<entry<[2, 3, 4]>, 5>>,
  Expect<Equal<entry<[0, 0, 0]>, 0>>,
  Expect<Equal<entry<[-1, -100, 10]>, -89>>,
  Expect<Equal<entry<[-1, -2, -3]>, -4>>,
]
