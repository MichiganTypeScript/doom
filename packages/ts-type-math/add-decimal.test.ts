import { t, T } from './test-cases/add';
import { expect, test } from 'vitest';

test.each(t)('$a + $b === $e', () => {
  t.forEach(({ a, b, e }) => {
    expect(a + b).toBe(e);
  });

  expect(t).toHaveLength(48);
})
