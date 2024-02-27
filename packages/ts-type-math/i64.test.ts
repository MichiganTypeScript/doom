import { expect, test } from "vitest";
import { t as i64t } from "./test-cases/arithmetic-i64";
import { bigintArithmetic, bigintToTwosComplement, twosComplementToBigInt } from "./test-utils";
import { createWasm } from "./wasm-tools";

test.each(i64t)("encoding i64 decimal arithmetic to i64 binary (and back)", ({
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
  const aTwos = bigintToTwosComplement(a);
  const bTwos = bigintToTwosComplement(b);
  const sumTwos = bigintToTwosComplement(add);
  const subTwos = bigintToTwosComplement(sub);
  const mulTwos = bigintToTwosComplement(mul);
  const divsTwos = bigintToTwosComplement(div_s);
  const divuTwos = bigintToTwosComplement(div_u);
  const remsTwos = bigintToTwosComplement(rem_s);
  const remuTwos = bigintToTwosComplement(rem_u);
  const clzTwos = bigintToTwosComplement(clz);

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

test.each(i64t)("i64 arithmetic in i64: $a, $b", async ({
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
  expect(bigintArithmetic.add(a, b)).toEqual(add);
  expect(bigintArithmetic.sub(a, b)).toEqual(sub);
  expect(bigintArithmetic.mul(a, b)).toEqual(mul);
  expect(bigintArithmetic.divs(a, b)).toEqual(div_s);
  expect(bigintArithmetic.divu(a, b)).toEqual(div_u);
  expect(bigintArithmetic.rems(a, b)).toEqual(rem_s);
  expect(bigintArithmetic.remu(a, b)).toEqual(rem_u);
  expect(bigintArithmetic.clz(a)).toEqual(clz);
});
