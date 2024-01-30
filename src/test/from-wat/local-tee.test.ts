import { Expect, Equal } from 'type-testing';
import type { entry } from "./local-tee.actual.js";

import { getWasm } from '../../utils.js';
import { expect, test } from 'vitest';

const name = 'local-tee';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry(2)).toStrictEqual(4);
  expect(entry(1)).toStrictEqual(2);
  expect(entry(0)).toStrictEqual(0);
  expect(entry(-1)).toStrictEqual(-2);
  expect(entry(-2)).toStrictEqual(-4);
});

type testCases = [
  Expect<Equal<entry<[2]>, 4>>,
  Expect<Equal<entry<[1]>, 2>>,
  Expect<Equal<entry<[0]>, 0>>,
  Expect<Equal<entry<[-1]>, -2>>,
  Expect<Equal<entry<[-2]>, -4>>,
]
