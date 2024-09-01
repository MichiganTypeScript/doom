import type { Expect, Equal } from 'type-testing';
import type { entry } from "./local-get-fallback"

import { getWasm } from '../utils'
import { expect, test } from 'vitest';

const name = 'local-get-fallback';
test(name, async () => {
  const entry = await getWasm("from-wat", name);
  expect(entry()).toStrictEqual(0);
});

type reallyHopeThereArentAnyMoreLittleThingsLikeThisBecauseThisWasSortaRoughtToDebug = entry<[]>;
//   ^?

type testCases = [
  Expect<Equal<entry<[]>, 0>>,
]
