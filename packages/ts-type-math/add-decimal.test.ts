import { t, T } from './test-cases/arithmetic';
import { expect, test } from 'vitest';

test.each(t)('$a + $b === $add', ({ a, b, add }) => {
  expect(a + b).toBe(add);
  expect(t).toHaveLength(78);
})
