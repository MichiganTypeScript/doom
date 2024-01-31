import type { Expect, Equal } from 'type-testing';
import type { Convert } from './conversion.d.ts';

// type tests_U8HexToU8Decimal = [
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"00">, 0>>,
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"60">, 96>>,
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"8c">, 140>>,
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"e2">, 226>>,
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"f1">, 241>>,
//   Expect<Equal<Convert.U8Hex.ToU8Decimal<"ff">, 255>>,
// ]

// type tests_U8DecimalToU8Hex = [
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<0>,   "00">>,
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<96>,  "60">>,
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<140>, "8c">>,
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<226>, "e2">>,
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<241>, "f1">>,
//   Expect<Equal<Convert.U8Decimal.ToU8Hex<255>, "ff">>,
// ]

type tests_U8BinaryToU8Decimal = [
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"00000000">, 0>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"01100000">, 96>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"10001100">, 140>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11100010">, 226>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11110001">, 241>>,
  Expect<Equal<Convert.U8Binary.ToU8Decimal<"11111111">, 255>>,
]

type tests_U8DecimalToU8Binary = [
  Expect<Equal<Convert.U8Decimal.ToU8Binary<0>,   "00000000">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<96>,  "01100000">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<140>, "10001100">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<226>, "11100010">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<241>, "11110001">>,
  Expect<Equal<Convert.U8Decimal.ToU8Binary<255>, "11111111">>,
]

type tests_AsciiToU8Decimal = [
  Expect<Equal<Convert.Ascii.ToU8Decimal<"A">,      65>>,
  Expect<Equal<Convert.Ascii.ToU8Decimal<"a">,      97>>,
  Expect<Equal<Convert.Ascii.ToU8Decimal<"Z">,      90>>,
  Expect<Equal<Convert.Ascii.ToU8Decimal<"z">,      122>>,
  Expect<Equal<Convert.Ascii.ToU8Decimal<"\u0000">, 0>>,
  Expect<Equal<Convert.Ascii.ToU8Decimal<"$">,      36>>,
]

type tests_U8DecimalToAscii = [
  Expect<Equal<Convert.U8Decimal.ToAscii<65>,  "A">>,
  Expect<Equal<Convert.U8Decimal.ToAscii<97>,  "a">>,
  Expect<Equal<Convert.U8Decimal.ToAscii<90>,  "Z">>,
  Expect<Equal<Convert.U8Decimal.ToAscii<122>, "z">>,
  Expect<Equal<Convert.U8Decimal.ToAscii<0>,   "\u0000">>,
  Expect<Equal<Convert.U8Decimal.ToAscii<36>,  "$">>,
]
