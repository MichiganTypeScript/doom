import { Expect, Equal } from 'type-testing';
import type { entry } from './bitwise-and.actual.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const example = (a: number, b: number) => {
  return a & b
}

test('and example', () => {
  expect(example(1, 2)).toStrictEqual(0);
  expect(example(3, 7)).toStrictEqual(3);
  expect(example(0, 1)).toStrictEqual(0);
  expect(example(8, 12)).toStrictEqual(8);
  expect(example(12345, 54321)).toStrictEqual(4145);
  expect(example(-1, 1)).toStrictEqual(1);
  expect(example(-1, -1)).toStrictEqual(-1);
  expect(example(-1, 0)).toStrictEqual(0);
  expect(example(2147483647, 1)).toStrictEqual(1);
  expect(example(-2147483648, -1)).toStrictEqual(-2147483648);
  expect(example(123, 456)).toStrictEqual(72);
  expect(example(987, 654)).toStrictEqual(650);
  expect(example(-500, 500)).toStrictEqual(4);
  expect(example(-400, 400)).toStrictEqual(16);
  expect(example(-300, 300)).toStrictEqual(4);
  expect(example(-200, 200)).toStrictEqual(8);
  expect(example(0, 0)).toStrictEqual(0);
  expect(example(0, -1)).toStrictEqual(0);
  expect(example(-1, 0)).toStrictEqual(0);
  expect(example(100000, 10000)).toStrictEqual(1536);
  expect(example(200000, 20000)).toStrictEqual(3072);
  expect(example(300000, 30000)).toStrictEqual(4384);
  expect(example(400000, 40000)).toStrictEqual(6144);
  expect(example(500000, 50000)).toStrictEqual(33024);
  expect(example(600000, 60000)).toStrictEqual(8768);
  expect(example(700000, 70000)).toStrictEqual(96);
  expect(example(800000, 80000)).toStrictEqual(12288);
  expect(example(900000, 90000)).toStrictEqual(72576);
  expect(example(1000000, 100000)).toStrictEqual(66048);
  expect(example(1100000, 110000)).toStrictEqual(34976);
})

const name = 'bitwise-and';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(example(1, 2)).toStrictEqual(0);
  expect(example(3, 7)).toStrictEqual(3);
  expect(example(0, 1)).toStrictEqual(0);
  expect(example(8, 12)).toStrictEqual(8);
  expect(example(12345, 54321)).toStrictEqual(4145);
  expect(example(-1, 1)).toStrictEqual(1);
  expect(example(-1, -1)).toStrictEqual(-1);
  expect(example(-1, 0)).toStrictEqual(0);
  expect(example(2147483647, 1)).toStrictEqual(1);
  expect(example(-2147483648, -1)).toStrictEqual(-2147483648);
  expect(example(123, 456)).toStrictEqual(72);
  expect(example(987, 654)).toStrictEqual(650);
  expect(example(-500, 500)).toStrictEqual(4);
  expect(example(-400, 400)).toStrictEqual(16);
  expect(example(-300, 300)).toStrictEqual(4);
  expect(example(-200, 200)).toStrictEqual(8);
  expect(example(0, 0)).toStrictEqual(0);
  expect(example(0, -1)).toStrictEqual(0);
  expect(example(-1, 0)).toStrictEqual(0);
  expect(example(100000, 10000)).toStrictEqual(1536);
  expect(example(200000, 20000)).toStrictEqual(3072);
  expect(example(300000, 30000)).toStrictEqual(4384);
  expect(example(400000, 40000)).toStrictEqual(6144);
  expect(example(500000, 50000)).toStrictEqual(33024);
  expect(example(600000, 60000)).toStrictEqual(8768);
  expect(example(700000, 70000)).toStrictEqual(96);
  expect(example(800000, 80000)).toStrictEqual(12288);
  expect(example(900000, 90000)).toStrictEqual(72576);
  expect(example(1000000, 100000)).toStrictEqual(66048);
  expect(example(1100000, 110000)).toStrictEqual(34976);
});

type testCases = [
  Expect<Equal<entry<[1, 2]>, 0>>,
  Expect<Equal<entry<[3, 7]>, 3>>,
  Expect<Equal<entry<[0, 1]>, 0>>,
  Expect<Equal<entry<[8, 12]>, 8>>,
  Expect<Equal<entry<[12345, 54321]>, 4145>>,
  Expect<Equal<entry<[-1, 1]>, 1>>,
  Expect<Equal<entry<[-1, -1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[-1, 0]>, 0>>,
  Expect<Equal<entry<[2147483647, 1]>, 1>>,
  Expect<Equal<entry<[-2147483648, -1]>, 2147483648>>, // DIFFERENT!
  Expect<Equal<entry<[123, 456]>, 72>>,
  Expect<Equal<entry<[987, 654]>, 650>>,
  Expect<Equal<entry<[-500, 500]>, 500>>, // DIFFERENT!
  Expect<Equal<entry<[-400, 400]>, 400>>, // DIFFERENT!
  Expect<Equal<entry<[-300, 300]>, 300>>, // DIFFERENT!
  Expect<Equal<entry<[-200, 200]>, 200>>, // DIFFERENT!
  Expect<Equal<entry<[0, 0]>, 0>>,
  Expect<Equal<entry<[0, -1]>, 0>>,
  Expect<Equal<entry<[-1, 0]>, 0>>,
  Expect<Equal<entry<[100000, 10000]>, 1536>>,
  Expect<Equal<entry<[200000, 20000]>, 3072>>,
  Expect<Equal<entry<[300000, 30000]>, 4384>>,
  Expect<Equal<entry<[400000, 40000]>, 6144>>,
  Expect<Equal<entry<[500000, 50000]>, 33024>>,
  Expect<Equal<entry<[600000, 60000]>, 8768>>,
  Expect<Equal<entry<[700000, 70000]>, 96>>,
  Expect<Equal<entry<[800000, 80000]>, 12288>>,
  Expect<Equal<entry<[900000, 90000]>, 72576>>,
  Expect<Equal<entry<[1000000, 100000]>, 66048>>,
  Expect<Equal<entry<[1100000, 110000]>, 34976>>,
]
