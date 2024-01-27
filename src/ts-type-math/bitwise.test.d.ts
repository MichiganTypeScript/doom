import { Expect, Equal } from 'type-testing';
import { BitwiseU8Hex } from './bitwise';

type tests_HexToDecimal = [
  // (parseInt("ef", 16) & parseInt("ab", 16)).toString(16)
  Expect<Equal<BitwiseU8Hex.And<"ef", "ab">, "ab">>,
  Expect<Equal<BitwiseU8Hex.And<"d1", "f0">, "d0">>,
  Expect<Equal<BitwiseU8Hex.And<"0a", "0c">, "08">>,
  Expect<Equal<BitwiseU8Hex.And<"01", "11">, "01">>,
  Expect<Equal<BitwiseU8Hex.And<"01", "01">, "01">>,
  Expect<Equal<BitwiseU8Hex.And<"01", "23">, "01">>,
  Expect<Equal<BitwiseU8Hex.And<"45", "67">, "45">>,
  Expect<Equal<BitwiseU8Hex.And<"89", "ab">, "89">>,
  Expect<Equal<BitwiseU8Hex.And<"cd", "ef">, "cd">>,

  Expect<Equal<BitwiseU8Hex.Or<"ef", "ab">, "ef">>,
  Expect<Equal<BitwiseU8Hex.Or<"d1", "f0">, "f1">>,
  Expect<Equal<BitwiseU8Hex.Or<"0a", "0c">, "0e">>,
  Expect<Equal<BitwiseU8Hex.Or<"01", "11">, "11">>,
  Expect<Equal<BitwiseU8Hex.Or<"01", "01">, "01">>,
  Expect<Equal<BitwiseU8Hex.Or<"01", "23">, "23">>,
  Expect<Equal<BitwiseU8Hex.Or<"45", "67">, "67">>,
  Expect<Equal<BitwiseU8Hex.Or<"89", "ab">, "ab">>,
  Expect<Equal<BitwiseU8Hex.Or<"cd", "ef">, "ef">>,

  Expect<Equal<BitwiseU8Hex.Xor<"ef", "ab">, "44">>,
  Expect<Equal<BitwiseU8Hex.Xor<"d1", "f0">, "21">>,
  Expect<Equal<BitwiseU8Hex.Xor<"0a", "0c">, "06">>,
  Expect<Equal<BitwiseU8Hex.Xor<"01", "11">, "10">>,
  Expect<Equal<BitwiseU8Hex.Xor<"01", "01">, "00">>,
  Expect<Equal<BitwiseU8Hex.Xor<"01", "23">, "22">>,
  Expect<Equal<BitwiseU8Hex.Xor<"45", "67">, "22">>,
  Expect<Equal<BitwiseU8Hex.Xor<"89", "ab">, "22">>,
  Expect<Equal<BitwiseU8Hex.Xor<"cd", "ef">, "22">>,

  Expect<Equal<BitwiseU8Hex.Not<"ef">, "10">>,
  Expect<Equal<BitwiseU8Hex.Not<"d1">, "2e">>,
  Expect<Equal<BitwiseU8Hex.Not<"0a">, "f5">>,
  Expect<Equal<BitwiseU8Hex.Not<"01">, "fe">>,
  Expect<Equal<BitwiseU8Hex.Not<"23">, "dc">>,
  Expect<Equal<BitwiseU8Hex.Not<"45">, "ba">>,
  Expect<Equal<BitwiseU8Hex.Not<"67">, "98">>,
  Expect<Equal<BitwiseU8Hex.Not<"89">, "76">>,
  Expect<Equal<BitwiseU8Hex.Not<"ab">, "54">>,
  Expect<Equal<BitwiseU8Hex.Not<"cd">, "32">>,
  Expect<Equal<BitwiseU8Hex.Not<"ef">, "10">>,

]
