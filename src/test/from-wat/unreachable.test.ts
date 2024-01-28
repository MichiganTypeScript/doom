import { Expect, Equal } from 'type-testing';
import type { entry } from "./unreachable.actual.js";

import { getWasm } from '../../utils.js';
import { expect, test } from 'vitest';

const name = 'unreachable';
test(name, async () => {
  const entry = await getWasm("from-wat", name);

  expect(() => entry()).toThrow();
});

type testCases = [
  Expect<Equal<
    entry<[]>['instructions'],
    [{ kind: "Halt"; }]
  >>,
]
