import { StringAddArbitraryReversed } from "./add";
import { ReverseString8Segments, ReverseStringTheWorstWayPossible } from "./binary";
import { Ensure } from "./ensure";
import { Wasm, WasmValue } from "./wasm";

type a = "00000000000000000000000001100100"
type b = "00000000000000000000000000001010"

export type I32MultiplyBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends Wasm.I32False ? Wasm.I32False :
  b extends Wasm.I32False ? Wasm.I32False :
  a extends Wasm.I32True ? b :
  b extends Wasm.I32True ? a :
  Ensure.I32<
    _MultiplyBinary<
      ReverseString8Segments<a>,
      ReverseString8Segments<b>,
      '',
      ''
    >
  >
>

export type I64MultiplyBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends Wasm.I64False ? Wasm.I64False :
  b extends Wasm.I64False ? Wasm.I64False :
  a extends Wasm.I64True ? b :
  b extends Wasm.I64True ? a :
  Ensure.I64<
    _MultiplyBinary<
      ReverseString8Segments<a>,
      ReverseString8Segments<b>,
      '',
      ''
    >
  >
>

export type _MultiplyBinary<
  a extends string,
  revB extends string,

  _Place extends string,
  _Acc extends string
> =
  revB extends `${infer digit}${infer tail}`
  ? digit extends "0"
    ? // there's no point in doing any "work", so we can just move on to the next digit
      _MultiplyBinary<
        a,
        tail,
        `0${_Place}`,
        _Acc
      >

    : // we have a digit to multiply
      _MultiplyBinary<
        a,
        tail,
        `0${_Place}`,

        StringAddArbitraryReversed<
          `${_Place}${a}`,
          _Acc,
          []
        >
      >

  : ReverseStringTheWorstWayPossible<_Acc>
