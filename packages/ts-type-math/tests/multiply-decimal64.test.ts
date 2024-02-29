import { t } from '../test-cases/arithmetic-i64';
import { expect, test } from 'vitest';
import { arithmeticBigInt, bigIntToTwosComplement, twosComplementToBigInt } from '../test-utils';

test.each(t)('$a * $b === $mul', ({ a, a_binary64, b, b_binary64, mul, mul_binary64 }) => {
  expect(a).toBe(twosComplementToBigInt(a_binary64));
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(b).toBe(twosComplementToBigInt(b_binary64));
  expect(b_binary64).toEqual(bigIntToTwosComplement(b));
  expect(mul).toBe(twosComplementToBigInt(mul_binary64));
  expect(mul_binary64).toEqual(bigIntToTwosComplement(mul));
  
  expect(arithmeticBigInt.mul(a, b)).toBe(mul);
});
