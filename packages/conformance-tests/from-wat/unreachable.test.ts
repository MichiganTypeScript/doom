import type { Expect, Equal } from 'type-testing';
import type { entry } from "./unreachable"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'unreachable';
test(name, async () => {
  const entry = await getWasm("from-wat", name);

  expect(() => entry()).toThrow();
});

type e = entry<[], true>;

type testCases = [
  Expect<Equal<
    e['instructions']['length'],
    2
  >>,
  Expect<Equal<
    e['instructions'][0]['kind'],
    'Halt'
  >>,
]
