import { Expect, Equal } from 'type-testing';
import type { entry } from './bitwise-xor.actual.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const example = (a: number, b: number) => {
  return a ^ b
}

test('xor example', () => {
  expect(example(1, 2)).toStrictEqual(3);
  expect(example(3, 7)).toStrictEqual(4);
  expect(example(0, 1)).toStrictEqual(1);
  expect(example(8, 12)).toStrictEqual(4);
  expect(example(12345, 54321)).toStrictEqual(58376);
  expect(example(-1, 1)).toStrictEqual(-2);
  expect(example(-1, -1)).toStrictEqual(0);
  expect(example(-1, 0)).toStrictEqual(-1);
  expect(example(2147483647, 1)).toStrictEqual(2147483646);
  expect(example(-2147483648, -1)).toStrictEqual(2147483647);
  expect(example(123, 456)).toStrictEqual(435);
  expect(example(987, 654)).toStrictEqual(341);
  expect(example(-500, 500)).toStrictEqual(-8);
  expect(example(-400, 400)).toStrictEqual(-32);
  expect(example(-300, 300)).toStrictEqual(-8);
  expect(example(-200, 200)).toStrictEqual(-16);
  expect(example(0, 0)).toStrictEqual(0);
  expect(example(0, -1)).toStrictEqual(-1);
  expect(example(-1, 0)).toStrictEqual(-1);
  expect(example(100000, 10000)).toStrictEqual(106928);
  expect(example(200000, 20000)).toStrictEqual(213856);
  expect(example(300000, 30000)).toStrictEqual(321232);
  expect(example(400000, 40000)).toStrictEqual(427712);
  expect(example(500000, 50000)).toStrictEqual(483952);
  expect(example(600000, 60000)).toStrictEqual(642464);
  expect(example(700000, 70000)).toStrictEqual(769808);
  expect(example(800000, 80000)).toStrictEqual(855424);
  expect(example(900000, 90000)).toStrictEqual(844848);
  expect(example(1000000, 100000)).toStrictEqual(967904);
  expect(example(1100000, 110000)).toStrictEqual(1140048);
})

const name = 'bitwise-xor';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(1, 2)).toStrictEqual(3);
  expect(entry(3, 7)).toStrictEqual(4);
  expect(entry(0, 1)).toStrictEqual(1);
  expect(entry(8, 12)).toStrictEqual(4);
  expect(entry(12345, 54321)).toStrictEqual(58376);
  expect(entry(-1, 1)).toStrictEqual(-2);
  expect(entry(-1, -1)).toStrictEqual(0);
  expect(entry(-1, 0)).toStrictEqual(-1);
  expect(entry(2147483647, 1)).toStrictEqual(2147483646);
  expect(entry(-2147483648, -1)).toStrictEqual(2147483647);
  expect(entry(123, 456)).toStrictEqual(435);
  expect(entry(987, 654)).toStrictEqual(341);
  expect(entry(-500, 500)).toStrictEqual(-8);
  expect(entry(-400, 400)).toStrictEqual(-32);
  expect(entry(-300, 300)).toStrictEqual(-8);
  expect(entry(-200, 200)).toStrictEqual(-16);
  expect(entry(0, 0)).toStrictEqual(0);
  expect(entry(0, -1)).toStrictEqual(-1);
  expect(entry(-1, 0)).toStrictEqual(-1);
  expect(entry(100000, 10000)).toStrictEqual(106928);
  expect(entry(200000, 20000)).toStrictEqual(213856);
  expect(entry(300000, 30000)).toStrictEqual(321232);
  expect(entry(400000, 40000)).toStrictEqual(427712);
  expect(entry(500000, 50000)).toStrictEqual(483952);
  expect(entry(600000, 60000)).toStrictEqual(642464);
  expect(entry(700000, 70000)).toStrictEqual(769808);
  expect(entry(800000, 80000)).toStrictEqual(855424);
  expect(entry(900000, 90000)).toStrictEqual(844848);
  expect(entry(1000000, 100000)).toStrictEqual(967904);
  expect(entry(1100000, 110000)).toStrictEqual(1140048);
});

type testCases = [
  Expect<Equal<entry<[1, 2]>, 3>>,
  Expect<Equal<entry<[3, 7]>, 4>>,
  Expect<Equal<entry<[0, 1]>, 1>>,
  Expect<Equal<entry<[8, 12]>, 4>>,
  Expect<Equal<entry<[12345, 54321]>, 58376>>,
  Expect<Equal<entry<[-1, 1]>, 2147483648>>, // DIFFERENT!
  Expect<Equal<entry<[-1, -1]>, 0>>,
  Expect<Equal<entry<[-1, 0]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[2147483647, 1]>, 2147483646>>, // DIFFERENT!
  Expect<Equal<entry<[-2147483648, -1]>, 1>>, // DIFFERENT!
  Expect<Equal<entry<[123, 456]>, 435>>,
  Expect<Equal<entry<[987, 654]>, 341>>,
  Expect<Equal<entry<[-500, 500]>, 2147483648>>, // DIFFERENT!
  Expect<Equal<entry<[-400, 400]>, 2147483648>>, // DIFFERENT
  Expect<Equal<entry<[-300, 300]>, 2147483648>>, // DIFFERENT!
  Expect<Equal<entry<[-200, 200]>, 2147483648>>, // DIFFERENT!
  Expect<Equal<entry<[0, 0]>, 0>>,
  Expect<Equal<entry<[0, -1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[-1, 0]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[100000, 10000]>, 106928>>,
  Expect<Equal<entry<[200000, 20000]>, 213856>>,
  Expect<Equal<entry<[300000, 30000]>, 321232>>,
  Expect<Equal<entry<[400000, 40000]>, 427712>>,
  Expect<Equal<entry<[500000, 50000]>, 483952>>,
  Expect<Equal<entry<[600000, 60000]>, 642464>>,
  Expect<Equal<entry<[700000, 70000]>, 769808>>,
  Expect<Equal<entry<[800000, 80000]>, 855424>>,
  Expect<Equal<entry<[900000, 90000]>, 844848>>,
  Expect<Equal<entry<[1000000, 100000]>, 967904>>,
  Expect<Equal<entry<[1100000, 110000]>, 1140048>>,
]
