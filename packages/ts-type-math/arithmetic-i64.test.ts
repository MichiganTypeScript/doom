import { expect, test } from "vitest";
import { t } from "./test-cases/arithmetic-i64";
import { arithmeticBigInt, bigIntToTwosComplement, twosComplementToBigInt } from "./test-utils";

test.each(t)("encoding i64 decimal arithmetic to i64 binary (and back)", ({
  a,
  b,
  add,
  sub,
  mul,
  div_s,
  div_u,
  rem_s,
  rem_u,
  clz,
}) => {
  const aTwos = bigIntToTwosComplement(a);
  const bTwos = bigIntToTwosComplement(b);
  const sumTwos = bigIntToTwosComplement(add);
  const subTwos = bigIntToTwosComplement(sub);
  const mulTwos = bigIntToTwosComplement(mul);
  const divsTwos = bigIntToTwosComplement(div_s);
  const divuTwos = bigIntToTwosComplement(div_u);
  const remsTwos = bigIntToTwosComplement(rem_s);
  const remuTwos = bigIntToTwosComplement(rem_u);
  const clzTwos = bigIntToTwosComplement(clz);

  const aRoundTrip = twosComplementToBigInt(aTwos);
  const bRoundTrip = twosComplementToBigInt(bTwos);
  const sumRoundTrip = twosComplementToBigInt(sumTwos);
  const subRoundTrip = twosComplementToBigInt(subTwos);
  const mulRoundTrip = twosComplementToBigInt(mulTwos);
  const divsRoundTrip = twosComplementToBigInt(divsTwos);
  const divuRoundTrip = twosComplementToBigInt(divuTwos);
  const remsRoundTrip = twosComplementToBigInt(remsTwos);
  const remuRoundTrip = twosComplementToBigInt(remuTwos);
  const clzRoundTrip = twosComplementToBigInt(clzTwos);

  expect(aRoundTrip).toBe(a);
  expect(bRoundTrip).toBe(b);
  expect(sumRoundTrip).toBe(add);
  expect(subRoundTrip).toBe(sub);
  expect(mulRoundTrip).toBe(mul);
  expect(divsRoundTrip).toBe(div_s);
  expect(divuRoundTrip).toBe(div_u);
  expect(remsRoundTrip).toBe(rem_s);
  expect(remuRoundTrip).toBe(rem_u);
  expect(clzRoundTrip).toBe(clz);
});

test.each(t)("i64 arithmetic in i64: $a, $b", async ({
  a,
  b,
  add,
  sub,
  mul,
  div_s,
  div_u,
  rem_s,
  rem_u,
  clz,
}) => {
  expect(arithmeticBigInt.add(a, b)).toEqual(add);
  expect(arithmeticBigInt.sub(a, b)).toEqual(sub);
  expect(arithmeticBigInt.mul(a, b)).toEqual(mul);
  expect(arithmeticBigInt.divs(a, b)).toEqual(div_s);
  expect(arithmeticBigInt.divu(a, b)).toEqual(div_u);
  expect(arithmeticBigInt.rems(a, b)).toEqual(rem_s);
  expect(arithmeticBigInt.remu(a, b)).toEqual(rem_u);
  expect(arithmeticBigInt.clz(a)).toEqual(clz);
});
