import type { Expect, Equal } from 'type-testing';
import type { entry } from './equals-zero.actual'
import { t, T } from '../../ts-type-math/test-cases/equals-zero'

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

test.each(t)('$a === 0 ? $e_bool', async ({ a, e }) => {
  const entry = await getWasm("from-wat", 'equals-zero');
  expect(entry(a)).toStrictEqual(e);
});

type testCases = [
  Expect<Equal<entry<[2]>, 0>>,
  Expect<Equal<entry<[1]>, 0>>,
  Expect<Equal<entry<[0]>, 1>>,
  Expect<Equal<entry<[-1]>, 0>>,
  Expect<Equal<entry<[-2]>, 0>>,
]
