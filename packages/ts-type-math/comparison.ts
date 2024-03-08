import { WasmValue, Wasm } from "./wasm"

export type EqualsBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends b ? Wasm.I32True : Wasm.I32False
>

export type NotEqualsBinary<
  a extends WasmValue,
  b extends WasmValue
> = Satisfies<WasmValue,
  a extends b ? Wasm.I32False : Wasm.I32True
>

/** important! this algo won't work if the strings are of different length (as an optimization to avoid needing to pad) */
export type GreaterThanUnsignedBinary<
  a extends WasmValue,
  b extends WasmValue,
> = Satisfies<WasmValue,
  a extends `${infer A}${infer TailA}`

  ? // a has a digit
    b extends `${infer B}${infer TailB}`

    ? // b has a digit
      A extends '1'

      ? // a=1
        B extends '1'

        ? // a=1 b=1
          GreaterThanUnsignedBinary<TailA, TailB>
        
        : // a=1 b=0
          Wasm.I32True

      : // a=0
        B extends '1'

        ? // a=0 b=1
          Wasm.I32False

        : // a=0 b=0
          GreaterThanUnsignedBinary<TailA, TailB>

    : // b has no more digits
      never // this should never happen that a is out of digits before b
    
  : // a has no more digits, and since they should be of equal length, that means that they're equal
    Wasm.I32False
>

/** important! this algo won't work if the strings are of different length (as an optimization to avoid needing to pad) */
export type LessThanUnsignedBinary<
  a extends WasmValue,
  b extends WasmValue,
> = Satisfies<WasmValue,
  a extends `${infer A}${infer TailA}`

  ? // a has a digit
    b extends `${infer B}${infer TailB}`

    ? // b has a digit
      A extends '1'

      ? // a=1
        B extends '1'

        ? // a=1 b=1
          LessThanUnsignedBinary<TailA, TailB>
        
        : // a=1 b=0
          Wasm.I32False

      : // a=0
        B extends '1'

        ? // a=0 b=1
          Wasm.I32True

        : // a=0 b=0
          LessThanUnsignedBinary<TailA, TailB>

    : // b has no more digits
      never // this should never happen that a is out of digits before b
    
  : // a has no more digits, and since they should be of equal length, that means that they're equal
    Wasm.I32False
>

export type IsPositiveSignedBinary<
  a extends WasmValue
> = Satisfies<boolean,
  [a] extends [`0${string}`]
  ? true
  : false
>

export type GreaterThanSignedBinary<
  a extends WasmValue,
  b extends WasmValue,
> = Satisfies<WasmValue,
  IsPositiveSignedBinary<a> extends true

  ? // +a
    IsPositiveSignedBinary<b> extends true

    ? // +a +b
      GreaterThanUnsignedBinary<a, b>

    : // +a -b
      Wasm.I32True

  : // -a
    IsPositiveSignedBinary<b> extends true

    ? // -a +b
      Wasm.I32False

    : // -a -b
      GreaterThanUnsignedBinary<a, b>
>

export type LessThanSignedBinary<
  a extends WasmValue,
  b extends WasmValue,
> = Satisfies<WasmValue,
  IsPositiveSignedBinary<a> extends true

  ? // +a
    IsPositiveSignedBinary<b> extends true

    ? // +a +b
      LessThanUnsignedBinary<a, b>

    : // +a -b
      Wasm.I32False

  : // -a
    IsPositiveSignedBinary<b> extends true

    ? // -a +b
      Wasm.I32True

    : // -a -b
      LessThanUnsignedBinary<a, b>
>
