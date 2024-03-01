import { AddBinary } from "./add";
import { ReverseString8Segments } from "./binary";
import { ShiftRightBinary } from "./shift";
import { Clamp } from "./split";
import { Wasm, WasmValue } from "./wasm";

type a = "00000000000000000000000001100100"
type b = "00000000000000000000000000001010"
type x = MultiplyBinary<a, b> // =>

export type I32MultiplyBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends Wasm.I32False ? Wasm.I32False :
  b extends Wasm.I32False ? Wasm.I32False :
  Clamp.Last32Bits<
    MultiplyBinary<a, b>
  >
>

export type I64MultiplyBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends Wasm.I64False ? Wasm.I64False :
  b extends Wasm.I64False ? Wasm.I64False :
  Clamp.Last64Bits<
    MultiplyBinary<a, b>
  >
>

// Hopefully there's a more efficient way to do this, but I'm using the method for repeated addition I learned in middle school
// apparently there's another way using right shift called the "partial sum" approach https://youtu.be/PjmWG_8b3os

/**
 * this is an unsigned arbitrary precision multiplication algo where both sides much be the same length
 * 
 * as yet another optimization, it also does not handle multiplication by zero so if you use this type you have to check first that both sides are not zero
 */
export type MultiplyBinary<
  a extends string, // multiplicand
  b extends string // multiplier
> =
  _MultiplyBinary<
    a,
    ReverseString8Segments<b>,
    '',
    ''
  >

export type _MultiplyBinary<
  a extends string,
  revB extends string,

  _Place extends string,
  _Acc extends string
> =
  revB extends `${infer digit}${infer tail}`
  ? digit extends "0"
    ? // there's no point in doing any work, so we can just move on to the next digit
      _MultiplyBinary<
        a,
        tail,
        `${_Place}0`,
        _Acc
      >

    : // we have a digit to multiply
      _MultiplyBinary<
        a,
        tail,
        `${_Place}0`,

        AddBinary<
          `${a}${_Place}`,
          _Acc
        >
      >

  : _Acc
