import { expect, test } from "vitest";
import { entry } from './single-i64load8_u.actual';
import { t, T, Ops } from "../../ts-type-math/test-cases/memory-i64";
import { bigIntToTwosComplement, twosComplementToBigInt } from "../../ts-type-math/test-utils";
import { getWasm } from "../utils";
import { Expect, Equal } from "type-testing";

test.each(t)('i64load8_u($a) === $load8_u (%#)', async ({ a, a_binary64, load8_u, load8_u_binary64 }) => {
  expect(a).toEqual(twosComplementToBigInt(a_binary64));
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(load8_u).toEqual(twosComplementToBigInt(load8_u_binary64));
  expect(load8_u_binary64).toEqual(bigIntToTwosComplement(load8_u));
  
  const entry = await getWasm<Ops>("from-wat-single", 'single-i64load8_u');
  expect(entry(a)).toStrictEqual(load8_u);
});

type i = 2
type a = T[i]['a']      // =>
type e = T[i]['load8_u']// =>
type x = entry<[a]>     // =>

type tests = [
  Expect<Equal<entry<[T[ 0]['a']]>, T[ 0]['load8_u']>>,
  Expect<Equal<entry<[T[ 1]['a']]>, T[ 1]['load8_u']>>,
  Expect<Equal<entry<[T[ 2]['a']]>, T[ 2]['load8_u']>>,
  Expect<Equal<entry<[T[ 3]['a']]>, T[ 3]['load8_u']>>,
  Expect<Equal<entry<[T[ 4]['a']]>, T[ 4]['load8_u']>>,
  Expect<Equal<entry<[T[ 5]['a']]>, T[ 5]['load8_u']>>,
  Expect<Equal<entry<[T[ 6]['a']]>, T[ 6]['load8_u']>>,
  Expect<Equal<entry<[T[ 7]['a']]>, T[ 7]['load8_u']>>,
  Expect<Equal<entry<[T[ 8]['a']]>, T[ 8]['load8_u']>>,
  Expect<Equal<entry<[T[ 9]['a']]>, T[ 9]['load8_u']>>,
  Expect<Equal<entry<[T[10]['a']]>, T[10]['load8_u']>>,

  Expect<Equal<T['length'], 11>>,
]