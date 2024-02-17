import { Equal, Expect } from "type-testing";
import { JoinBytes, SplitToBytes } from "./split";
import { Convert } from "./conversion";
import { test } from 'vitest';
test('conversion')

type t = JoinBytes<["1234567800000000"]>; // =>

type split = [
  Expect<Equal<SplitToBytes<"00000000">, ["00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000">, ['12345678', "00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000abcdefgh00000000">, ['12345678', "00000000", "abcdefgh", "00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000abcdefgh0000000011111111222222223333333344444444">, ['12345678', "00000000", "abcdefgh", "00000000", "11111111", "22222222", "33333333", "44444444"]>>,
]

type join = [
  Expect<Equal<JoinBytes<["00000000"]>, "00000000">>,
  Expect<Equal<JoinBytes<['12345678', "00000000"]>, "1234567800000000">>,
  Expect<Equal<JoinBytes<['12345678', "00000000", "abcdefgh", "00000000"]>, "1234567800000000abcdefgh00000000">>,
  Expect<Equal<JoinBytes<['12345678', "00000000", "abcdefgh", "00000000", "11111111", "22222222", "33333333", "44444444"]>, "1234567800000000abcdefgh0000000011111111222222223333333344444444">>,
  Expect<Equal<JoinBytes<['11111111', '11111111', '11111111', '11111111']>, '11111111111111111111111111111111'>>,
]

type ABunchaNines = Convert.U32Decimal.ToU32Binary<99999>;

type roundTrip = [
  Expect<Equal<JoinBytes<SplitToBytes<"00000000">>, "00000000">>,
  Expect<Equal<JoinBytes<SplitToBytes<"1234567800000000">>, "1234567800000000">>,

  Expect<Equal<JoinBytes<SplitToBytes<ABunchaNines>>, ABunchaNines>>,
]
