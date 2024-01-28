import { Expect, Equal } from 'type-testing';
import type { entry } from './bitwise-or.actual.js';

import { test, expect } from 'vitest';
import { getWasm } from '../../utils.js';

const example = (a: number, b: number) => {
  return a | b
}

test('or example', () => {
  expect(example(1, 2)).toStrictEqual(3);
  expect(example(3, 7)).toStrictEqual(7);
  expect(example(0, 1)).toStrictEqual(1);
  expect(example(8, 12)).toStrictEqual(12);
  expect(example(12345, 54321)).toStrictEqual(62521);
  expect(example(-1, 1)).toStrictEqual(-1);
  expect(example(-1, -1)).toStrictEqual(-1);
  expect(example(-1, 0)).toStrictEqual(-1);
  expect(example(2147483647, 1)).toStrictEqual(2147483647);
  expect(example(-2147483648, -1)).toStrictEqual(-1);
  expect(example(123, 456)).toStrictEqual(507);
  expect(example(987, 654)).toStrictEqual(991);
  expect(example(-500, 500)).toStrictEqual(-4);
  expect(example(-400, 400)).toStrictEqual(-16);
  expect(example(-300, 300)).toStrictEqual(-4);
  expect(example(-200, 200)).toStrictEqual(-8);
  expect(example(0, 0)).toStrictEqual(0);
  expect(example(0, -1)).toStrictEqual(-1);
  expect(example(-1, 0)).toStrictEqual(-1);
  expect(example(100000, 10000)).toStrictEqual(108464);
  expect(example(200000, 20000)).toStrictEqual(216928);
  expect(example(300000, 30000)).toStrictEqual(325616);
  expect(example(400000, 40000)).toStrictEqual(433856);
  expect(example(500000, 50000)).toStrictEqual(516976);
  expect(example(600000, 60000)).toStrictEqual(651232);
  expect(example(700000, 70000)).toStrictEqual(769904);
  expect(example(800000, 80000)).toStrictEqual(867712);
  expect(example(900000, 90000)).toStrictEqual(917424);
  expect(example(1000000, 100000)).toStrictEqual(1033952);
  expect(example(1100000, 110000)).toStrictEqual(1175024);
})

const name = 'bitwise-or';
test(name, async () => {
  const { entry } = await getWasm("from-wat", name);
  expect(entry(1, 2)).toStrictEqual(3);
  expect(entry(3, 7)).toStrictEqual(7);
  expect(entry(0, 1)).toStrictEqual(1);
  expect(entry(8, 12)).toStrictEqual(12);
  expect(entry(12345, 54321)).toStrictEqual(62521);
  expect(entry(-1, 1)).toStrictEqual(-1);
  expect(entry(-1, -1)).toStrictEqual(-1);
  expect(entry(-1, 0)).toStrictEqual(-1);
  expect(entry(2147483647, 1)).toStrictEqual(2147483647);
  expect(entry(-2147483648, -1)).toStrictEqual(-1);
  expect(entry(123, 456)).toStrictEqual(507);
  expect(entry(987, 654)).toStrictEqual(991);
  expect(entry(-500, 500)).toStrictEqual(-4);
  expect(entry(-400, 400)).toStrictEqual(-16);
  expect(entry(-300, 300)).toStrictEqual(-4);
  expect(entry(-200, 200)).toStrictEqual(-8);
  expect(entry(0, 0)).toStrictEqual(0);
  expect(entry(0, -1)).toStrictEqual(-1);
  expect(entry(-1, 0)).toStrictEqual(-1);
  expect(entry(100000, 10000)).toStrictEqual(108464);
  expect(entry(200000, 20000)).toStrictEqual(216928);
  expect(entry(300000, 30000)).toStrictEqual(325616);
  expect(entry(400000, 40000)).toStrictEqual(433856);
  expect(entry(500000, 50000)).toStrictEqual(516976);
  expect(entry(600000, 60000)).toStrictEqual(651232);
  expect(entry(700000, 70000)).toStrictEqual(769904);
  expect(entry(800000, 80000)).toStrictEqual(867712);
  expect(entry(900000, 90000)).toStrictEqual(917424);
  expect(entry(1000000, 100000)).toStrictEqual(1033952);
  expect(entry(1100000, 110000)).toStrictEqual(1175024);
});

type testCases = [
  Expect<Equal<entry<[1, 2]>, 3>>,
  Expect<Equal<entry<[3, 7]>, 7>>,
  Expect<Equal<entry<[0, 1]>, 1>>,
  Expect<Equal<entry<[8, 12]>, 12>>,
  Expect<Equal<entry<[12345, 54321]>, 62521>>,
  Expect<Equal<entry<[-1, 1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[-1, -1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[-1, 0]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[2147483647, 1]>, 2147483647>>,
  Expect<Equal<entry<[-2147483648, -1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[123, 456]>, 507>>,
  Expect<Equal<entry<[987, 654]>, 991>>,
  Expect<Equal<entry<[-500, 500]>, 2147484148>>, // DIFFERENT!
  Expect<Equal<entry<[-400, 400]>, 2147484048>>, // DIFFERENT!
  Expect<Equal<entry<[-300, 300]>, 2147483948>>, // DIFFERENT!
  Expect<Equal<entry<[-200, 200]>, 2147483848>>, // DIFFERENT!
  Expect<Equal<entry<[0, 0]>, 0>>,
  Expect<Equal<entry<[0, -1]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[-1, 0]>, 2147483649>>, // DIFFERENT!
  Expect<Equal<entry<[100000, 10000]>, 108464>>,
  Expect<Equal<entry<[200000, 20000]>, 216928>>,
  Expect<Equal<entry<[300000, 30000]>, 325616>>,
  Expect<Equal<entry<[400000, 40000]>, 433856>>,
  Expect<Equal<entry<[500000, 50000]>, 516976>>,
  Expect<Equal<entry<[600000, 60000]>, 651232>>,
  Expect<Equal<entry<[700000, 70000]>, 769904>>,
  Expect<Equal<entry<[800000, 80000]>, 867712>>,
  Expect<Equal<entry<[900000, 90000]>, 917424>>,
  Expect<Equal<entry<[1000000, 100000]>, 1033952>>,
  Expect<Equal<entry<[1100000, 110000]>, 1175024>>,
]
