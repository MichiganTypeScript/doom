import { expect, test } from "vitest";
import { t } from "./test-cases/arithmetic";
import { arithmetic, numberToTwosComplement, twosComplementToNumber } from "./test-utils";

test.each(t)("encoding i32 decimal arithmetic to i32 binary (and back)", ({
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
  const aTwos = numberToTwosComplement(a);
  const bTwos = numberToTwosComplement(b);
  const sumTwos = numberToTwosComplement(add);
  const subTwos = numberToTwosComplement(sub);
  const mulTwos = numberToTwosComplement(mul);
  const divsTwos = numberToTwosComplement(div_s);
  const divuTwos = numberToTwosComplement(div_u);
  const remsTwos = numberToTwosComplement(rem_s);
  const remuTwos = numberToTwosComplement(rem_u);
  const clzTwos = numberToTwosComplement(clz);

  const aRoundTrip = twosComplementToNumber(aTwos);
  const bRoundTrip = twosComplementToNumber(bTwos);
  const sumRoundTrip = twosComplementToNumber(sumTwos);
  const subRoundTrip = twosComplementToNumber(subTwos);
  const mulRoundTrip = twosComplementToNumber(mulTwos);
  const divsRoundTrip = twosComplementToNumber(divsTwos);
  const divuRoundTrip = twosComplementToNumber(divuTwos);
  const remsRoundTrip = twosComplementToNumber(remsTwos);
  const remuRoundTrip = twosComplementToNumber(remuTwos);
  const clzRoundTrip = twosComplementToNumber(clzTwos);

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

test.each(t)("i32 arithmetic in i32: $a, $b", async ({
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
  expect(arithmetic.add(a, b)).toEqual(add);
  expect(arithmetic.sub(a, b)).toEqual(sub);
  expect(arithmetic.mul(a, b)).toEqual(mul);
  expect(arithmetic.divs(a, b)).toEqual(div_s);
  expect(arithmetic.divu(a, b)).toEqual(div_u);
  expect(arithmetic.rems(a, b)).toEqual(rem_s);
  expect(arithmetic.remu(a, b)).toEqual(rem_u);
  expect(arithmetic.clz(a)).toEqual(clz);
});
