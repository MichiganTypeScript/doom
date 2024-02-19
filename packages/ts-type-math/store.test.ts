import type { Expect, Equal } from "type-testing";
import type { AsciiToU8Binary, AsciiToU8Decimal, Store, StoreString, U8BinaryToAscii, U8DecimalToAscii } from "./store";
import { test } from 'vitest';
import { ReadStringFromMemory } from "./memory-read-string";

test('conversion')

type atodtoa = U8DecimalToAscii<AsciiToU8Decimal<"from ascii to decimal and back">>;
//   ^?

type atobtoa = U8BinaryToAscii<AsciiToU8Binary<"from ascii to binary and back">>;
//   ^?

// type write = StoreString<1024, "Let's hope this works..\u0000">;
// type read = ReadStringFromMemory<{ memory: write, stack: [1024] }>;

// type encode = [
//   Expect<Equal<write, {
//     1024: '01001100';
//     1025: '01100101';
//     1026: '01110100';
//     1027: '00100111';
//     1028: '01110011';
//     1029: '00100000';
//     1030: '01101000';
//     1031: '01101111';
//     1032: '01110000';
//     1033: '01100101';
//     1034: '00100000';
//     1035: '01110100';
//     1036: '01101000';
//     1037: '01101001';
//     1038: '01110011';
//     1039: '00100000';
//     1040: '01110111';
//     1041: '01101111';
//     1042: '01110010';
//     1043: '01101011';
//     1044: '01110011';
//     1045: '00101110';
//     1046: '00101110';
//     1047: '00000000';
//   }>>,

//   Expect<Equal<read, "Let's hope this works..">>,
// ]

// type storeTests = [
  // Expect<Equal<Store.I32<0>, ["00000000", "00000000", "00000000", "00000000"]>>,
//   Expect<Equal<Store.I32<1>, ["00000000", "00000000", "00000000", "00000001"]>>,
//   Expect<Equal<Store.I32<2>, ["00000000", "00000000", "00000000", "00000010"]>>,
//   Expect<Equal<Store.I32<2>[3], "00000010">>,
// ]
