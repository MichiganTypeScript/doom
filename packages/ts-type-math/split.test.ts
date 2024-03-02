import { Equal, Expect } from "type-testing";
import { Clamp, SplitToBytes } from "./split";
import { Load } from "./load";
import { Convert } from "./conversion";
import { test } from 'vitest';
test('split')

type s = SplitToBytes<"000000001"> // =>

type split = [
  Expect<Equal<SplitToBytes<"00000000">, ["00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000">, ['12345678', "00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000abcdefgh00000000">, ['12345678', "00000000", "abcdefgh", "00000000"]>>,
  Expect<Equal<SplitToBytes<"1234567800000000abcdefgh0000000011111111222222223333333344444444">, ['12345678', "00000000", "abcdefgh", "00000000", "11111111", "22222222", "33333333", "44444444"]>>,

  Expect<Equal<SplitToBytes<"000000001">, ["00000000"]>>,
]

type ABunchaNines = Convert.U32Decimal.ToU32Binary<99999>;

type roundTrip = [
  Expect<Equal<Load.JoinBytes<SplitToBytes<"00000000">>, "00000000">>,
  Expect<Equal<Load.JoinBytes<SplitToBytes<"1234567800000000">>, "1234567800000000">>,

  Expect<Equal<Load.JoinBytes<SplitToBytes<ABunchaNines>>, ABunchaNines>>,
]


type result31 = "1234000000000000000000000000789"
type result32 = "12340000000000000000000000000789"
type result33 = "012340000000000000000000000000789"


type last8 = "23456789";

type clamp32 = [
  Expect<Equal<Clamp.Last32Bits<result31>, never>>,
  Expect<Equal<Clamp.Last32Bits<result32>, result32>>,
  Expect<Equal<Clamp.Last32Bits<result33>, result32>>,
  Expect<Equal<Clamp.Last32Bits<"a">, never>>,

  Expect<Equal<Clamp.Last8Bits<"3456789">, never>>,
  Expect<Equal<Clamp.Last8Bits<"23456789">, last8>>,
  Expect<Equal<Clamp.Last8Bits<"123456789">, last8>>,
  Expect<Equal<Clamp.Last8Bits<"0123456789">, last8>>,
  Expect<Equal<Clamp.Last8Bits<"90123456789">, last8>>,
  Expect<Equal<Clamp.Last8Bits<"01234567890123456789">, last8>>,
]