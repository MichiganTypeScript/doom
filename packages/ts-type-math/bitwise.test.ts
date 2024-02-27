import { expect, test } from "vitest";
import { t } from "./test-cases/bitwise";
import { numberToTwosComplement, bitwise, twosComplementToNumber } from "./test-utils";

test.each(t)("encoding i32 decimal bitwise to i32 binary (and back)", ({
  a,
  b,
  and,
  or,
  xor,
  not,
  a_binary,
  b_binary,
  and_binary,
  or_binary,
  xor_binary,
  not_binary,
}) => {
  const aTwos = numberToTwosComplement(a);
  const bTwos = numberToTwosComplement(b);
  const andTwos = numberToTwosComplement(and);
  const orTwos = numberToTwosComplement(or);
  const xorTwos = numberToTwosComplement(xor);
  const notTwos = numberToTwosComplement(not);

  expect(aTwos).toEqual(a_binary);
  expect(bTwos).toEqual(b_binary);
  expect(andTwos).toEqual(and_binary);
  expect(orTwos).toEqual(or_binary);
  expect(xorTwos).toEqual(xor_binary);
  expect(notTwos).toEqual(not_binary);

  const aRoundTrip = twosComplementToNumber(aTwos);
  const bRoundTrip = twosComplementToNumber(bTwos);
  const andRoundTrip = twosComplementToNumber(andTwos);
  const orRoundTrip = twosComplementToNumber(orTwos);
  const xorRoundTrip = twosComplementToNumber(xorTwos);
  const notRoundTrip = twosComplementToNumber(notTwos);

  expect(aRoundTrip).toBe(a);
  expect(bRoundTrip).toBe(b);
  expect(andRoundTrip).toBe(and);
  expect(orRoundTrip).toBe(or);
  expect(xorRoundTrip).toBe(xor);
  expect(notRoundTrip).toBe(not);
});

test.each(t)("i32 bitwise in i32: $a, $b", async ({
  a,
  b,
  and,
  or,
  xor,
  not,
}) => {
  expect(bitwise.and(a, b)).toEqual(and);
  expect(bitwise.or(a, b)).toEqual(or);
  expect(bitwise.xor(a, b)).toEqual(xor);
  expect(bitwise.not(a)).toEqual(not);
});
