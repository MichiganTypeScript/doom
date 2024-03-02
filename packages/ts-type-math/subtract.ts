import { AddBinary } from "./add";
import { ToDecimalSigned, TwosComplementFlip } from "./binary";
import { IsPositiveSignedBinary } from "./comparison";
import { Ensure } from "./ensure";
import { Clamp } from "./split";
import { WasmValue } from "./wasm";

/** NOTE! this is unclamped!  that means if you subtract two negative numbers you could get an overflow! */
export type SubtractBinary<
  a extends WasmValue, // minuend
  b extends WasmValue  // subtrahend
> =  Satisfies<WasmValue,
  IsPositiveSignedBinary<a> extends true

  ? // +a
    IsPositiveSignedBinary<b> extends true

    ? // +a +b
      AddBinary<a, TwosComplementFlip<b>>

    : // +a -b
      AddBinary<a, TwosComplementFlip<b>>

  : // -a
    IsPositiveSignedBinary<b> extends true

    ? // -a +b
      AddBinary<a, TwosComplementFlip<b>>

    : // -a -b
      AddBinary<a, TwosComplementFlip<b>>
  >

export type I32SubtractBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  Ensure.I32<
    SubtractBinary<a, b>
  >
>

export type I64SubtractBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  Ensure.I64<
    SubtractBinary<a, b>
  >
>


// 5
type p5="00000101"

// 3
type p3="00000011"

// -5
type n5=TwosComplementFlip<p5>   // =>

// -3
type n3=TwosComplementFlip<p3>   // =>

type a = '10000101101100000011000010111010'
type b = '00110001001101100101000101001110'
type s = '11010100011110011101111101101100'

type x1 = SubtractBinary<p3, p5> // =>
type z1 = ToDecimalSigned<x1>    // =>

type x2 = SubtractBinary<p3, n5> // =>
type z2 = ToDecimalSigned<x2>    // =>

type x3 = SubtractBinary<n3, p5> // =>
type z3 = ToDecimalSigned<x3>    // =>

type x4 = SubtractBinary<n3, n5> // =>
type z4 = ToDecimalSigned<x4>    // =>

type ab = AddBinary<n3, p5>; // =>
type z = Clamp.Last8Bits<ab> // =>
