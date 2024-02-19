import { t } from './test-cases/arithmetic';
import { expect, test } from 'vitest';
import { arithmetic } from './test-utils';

test.each(t)('$a * $b === $mul', ({ a, b, mul }) => {
  expect(arithmetic.mul(a, b)).toBe(mul);
});
