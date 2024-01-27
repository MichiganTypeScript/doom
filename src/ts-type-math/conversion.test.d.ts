import { Expect, Equal } from 'type-testing';
import { Convert } from './conversion';

type tests_HexToDecimal = [
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"00">, 0>>,
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"60">, 96>>,
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"8c">, 140>>,
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"e2">, 226>>,
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"f1">, 241>>,
  Expect<Equal<Convert.U8Hex.ToU8Decimal<"ff">, 255>>,
]

type tests_DecimalToHex = [
  Expect<Equal<Convert.U8Decimal.ToU8Hex<0>,   "00">>,
  Expect<Equal<Convert.U8Decimal.ToU8Hex<96>,  "60">>,
  Expect<Equal<Convert.U8Decimal.ToU8Hex<140>, "8c">>,
  Expect<Equal<Convert.U8Decimal.ToU8Hex<226>, "e2">>,
  Expect<Equal<Convert.U8Decimal.ToU8Hex<241>, "f1">>,
  Expect<Equal<Convert.U8Decimal.ToU8Hex<255>, "ff">>,
]

type tests_BinaryToDecimal = [
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"00000000">, 0>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"01100000">, 96>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"10001100">, 140>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11100010">, 226>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11110001">, 241>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11111111">, 255>>,
]

type tests_DecimalToBinary = [
  Expect<Equal<Convert.U8Decimal.ToU8Binary<0>,   "00000000">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<96>,  "01100000">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<140>, "10001100">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<226>, "11100010">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<241>, "11110001">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<255>, "11111111">>,
]


