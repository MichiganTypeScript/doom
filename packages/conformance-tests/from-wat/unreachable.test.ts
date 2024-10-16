import type { Expect, Equal } from 'type-testing';
import type { entry } from "./unreachable"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'unreachable';
test(name, async () => {
  const entry = await getWasm("from-wat", name);

  expect(() => entry()).toThrow();
});

type testCases = [
  Expect<Equal<
    entry<[]>['instructions']['length'],
    3
  >>,
  Expect<Equal<
    entry<[]>['instructions'][0]['kind'],
    'Halt'
  >>,
]
