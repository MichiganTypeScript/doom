import { t } from '../test-cases/arithmetic';
import { expect, test } from 'vitest';
import { arithmetic, numberToTwosComplement, twosComplementToNumber } from '../test-utils';

test.each(t)('$a * $b === $mul', ({ a, a_binary, b, b_binary, mul, mul_binary }) => {
  expect(a).toBe(twosComplementToNumber(a_binary));
  expect(a_binary).toEqual(numberToTwosComplement(a));
  expect(b).toBe(twosComplementToNumber(b_binary));
  expect(b_binary).toEqual(numberToTwosComplement(b));
  expect(mul).toBe(twosComplementToNumber(mul_binary));
  expect(mul_binary).toEqual(numberToTwosComplement(mul));
  
  expect(arithmetic.mul(a, b)).toBe(mul);
});
