import { expect, test } from "vitest";
import { t } from "../test-cases/bitwise-shift";
import { numberToTwosComplement, bitwise, twosComplementToNumber } from "../test-utils";

test.each(t)("encoding i32 decimal bitwise to i32 binary (and back)", ({
  a,
  b,
  shl,
  shr_s,
  shr_u,
  a_binary,
  b_binary,
  shl_binary,
  shr_s_binary,
  shr_u_binary,
}) => {
  const aTwos = numberToTwosComplement(a);
  const bTwos = numberToTwosComplement(b);
  const shlTwos = numberToTwosComplement(shl);
  const shr_sTwos = numberToTwosComplement(shr_s);
  const shr_uTwos = numberToTwosComplement(shr_u);

  expect(aTwos).toEqual(a_binary);
  expect(bTwos).toEqual(b_binary);
  expect(shlTwos).toEqual(shl_binary);
  expect(shr_sTwos).toEqual(shr_s_binary);
  expect(shr_uTwos).toEqual(shr_u_binary);

  const aRoundTrip = twosComplementToNumber(aTwos);
  const bRoundTrip = twosComplementToNumber(bTwos);
  const shlRoundTrip = twosComplementToNumber(shlTwos);
  const shr_sRoundTrip = twosComplementToNumber(shr_sTwos);
  const shr_uRoundTrip = twosComplementToNumber(shr_uTwos);

  expect(aRoundTrip).toBe(a);
  expect(bRoundTrip).toBe(b);
  expect(shlRoundTrip).toBe(shl);
  expect(shr_sRoundTrip).toBe(shr_s);
  expect(shr_uRoundTrip >> 0).toBe(shr_u >> 0);
});

test.each(t)("i32 bitwise in i32: $a, $b", async ({
  a,
  b,
  shl,
  shr_s,
  shr_u,
}) => {
  expect(bitwise.shl(a, b)).toEqual(shl);
  expect(bitwise.shr_s(a, b)).toEqual(shr_s);
  expect(bitwise.shr_u(a, b) >> 0).toEqual(shr_u >> 0);
});
