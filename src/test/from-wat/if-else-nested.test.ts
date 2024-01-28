import { Expect, Equal } from 'type-testing';
import type { entry } from "./if-else-nested.actual.js";

import { getWasm } from '../../utils.js';
import { expect, test } from 'vitest';

/** the motivating example for this test */
const example = ($n: number, $control: number) => {
  if ($control === 1) {
    return 101 + $n
  } else if ($control === 2) {
    return 102 - $n
  } else {
    if ($control >= 3) {
      if ($control > 5) {
        return 103 * $n
      }
      return 104 + $n
    }
  }
  return 105 + $n
}

test('if-else example', () => {
  expect(example(10, 0)).toStrictEqual(115);
  expect(example(10, 1)).toStrictEqual(111);
  expect(example(10, 2)).toStrictEqual(92);
  expect(example(10, 3)).toStrictEqual(114);
  expect(example(10, 4)).toStrictEqual(114);
  expect(example(10, 5)).toStrictEqual(114);
  expect(example(10, 6)).toStrictEqual(1030);
});

const name = 'if-else-nested';
test(name, async () => {
  const { entry } = await getWasm("from-wat", name);
  expect(entry(10, 0)).toStrictEqual(115);
  expect(entry(10, 1)).toStrictEqual(111);
  expect(entry(10, 2)).toStrictEqual(92);
  expect(entry(10, 3)).toStrictEqual(114);
  expect(entry(10, 4)).toStrictEqual(114);
  expect(entry(10, 5)).toStrictEqual(114);
  expect(entry(10, 6)).toStrictEqual(1030);
});

type testCases = [
  Expect<Equal<entry<[10, 0]>, 115>>,
  Expect<Equal<entry<[10, 1]>, 111>>,
  Expect<Equal<entry<[10, 2]>, 92>>,
  Expect<Equal<entry<[10, 3]>, 114>>,
  Expect<Equal<entry<[10, 4]>, 114>>,
  Expect<Equal<entry<[10, 5]>, 114>>,
  Expect<Equal<entry<[10, 6]>, 1030>>,
]

