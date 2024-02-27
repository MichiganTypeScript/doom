import { expect, test } from "vitest";
import { t } from "../test-cases/bitwise-shift-i64";
import { bigIntToTwosComplement, bitwiseBigInt, twosComplementToBigInt } from "../test-utils";

test.each(t)("encoding i64 decimal bitwise to i64 binary (and back) %#", ({
  a,
  b,
  shl,
  shr_s,
  shr_u,
  a_binary64,
  b_binary64,
  shl_binary64,
  shr_s_binary64,
  shr_u_binary64,
}) => {
  const aTwos = bigIntToTwosComplement(a);
  const bTwos = bigIntToTwosComplement(b);
  const shlTwos = bigIntToTwosComplement(shl);
  const shr_sTwos = bigIntToTwosComplement(shr_s);
  const shr_uTwos = bigIntToTwosComplement(shr_u);

  expect(aTwos).toEqual(a_binary64);
  expect(bTwos).toEqual(b_binary64);
  expect(shlTwos).toEqual(shl_binary64);
  expect(shr_sTwos).toEqual(shr_s_binary64);
  expect(shr_uTwos).toEqual(shr_u_binary64);

  const aRoundTrip = twosComplementToBigInt(aTwos);
  const bRoundTrip = twosComplementToBigInt(bTwos);
  const shlRoundTrip = twosComplementToBigInt(shlTwos);
  const shr_sRoundTrip = twosComplementToBigInt(shr_sTwos);
  const shr_uRoundTrip = twosComplementToBigInt(shr_uTwos);

  expect(aRoundTrip).toBe(a);
  expect(bRoundTrip).toBe(b);
  expect(shlRoundTrip).toBe(shl);
  expect(shr_sRoundTrip).toBe(shr_s);
  expect(shr_uRoundTrip).toBe(shr_u);
});

test.each(t)("i64 bitwise in i64: $a, $b", async ({
  a,
  b,
  shl,
  shr_s,
  shr_u,
}) => {
  expect(bitwiseBigInt.shl(a, b)).toEqual(shl);
  expect(bitwiseBigInt.shr_s(a, b)).toEqual(shr_s);
  expect(bitwiseBigInt.shr_u(a, b)).toEqual(shr_u);
});
