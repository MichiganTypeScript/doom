import type { Expect, Equal } from 'type-testing';
import type { entry } from "./unreachable.actual"

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
    1
  >>,
  Expect<Equal<
    entry<[]>['instructions'][0]['kind'],
    'Halt'
  >>,
]
