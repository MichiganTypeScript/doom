import { expect, test } from "vitest";
import { t } from "../test-cases/bitwise-i64";
import { bigIntToTwosComplement, bitwiseBigInt, twosComplementToBigInt } from "../test-utils";

test.each(t)("encoding i64 decimal bitwise to i64 binary (and back)", ({
  a,
  b,
  and,
  or,
  xor,
  not,
  a_binary64,
  b_binary64,
  and_binary64,
  or_binary64,
  xor_binary64,
  not_binary64,
}) => {
  const aTwos = bigIntToTwosComplement(a);
  const bTwos = bigIntToTwosComplement(b);
  const andTwos = bigIntToTwosComplement(and);
  const orTwos = bigIntToTwosComplement(or);
  const xorTwos = bigIntToTwosComplement(xor);
  const notTwos = bigIntToTwosComplement(not);

  expect(aTwos).toEqual(a_binary64);
  expect(bTwos).toEqual(b_binary64);
  expect(andTwos).toEqual(and_binary64);
  expect(orTwos).toEqual(or_binary64);
  expect(xorTwos).toEqual(xor_binary64);
  expect(notTwos).toEqual(not_binary64);

  const aRoundTrip = twosComplementToBigInt(aTwos);
  const bRoundTrip = twosComplementToBigInt(bTwos);
  const andRoundTrip = twosComplementToBigInt(andTwos);
  const orRoundTrip = twosComplementToBigInt(orTwos);
  const xorRoundTrip = twosComplementToBigInt(xorTwos);
  const notRoundTrip = twosComplementToBigInt(notTwos);

  expect(aRoundTrip).toBe(a);
  expect(bRoundTrip).toBe(b);
  expect(andRoundTrip).toBe(and);
  expect(orRoundTrip).toBe(or);
  expect(xorRoundTrip).toBe(xor);
  expect(notRoundTrip).toBe(not);
});

test.each(t)("i64 bitwise in i64: $a, $b", async ({
  a,
  b,
  and,
  or,
  xor,
  not,
}) => {
  expect(bitwiseBigInt.and(a, b)).toEqual(and);
  expect(bitwiseBigInt.or(a, b)).toEqual(or);
  expect(bitwiseBigInt.xor(a, b)).toEqual(xor);
  expect(bitwiseBigInt.not(a)).toEqual(not);
});
