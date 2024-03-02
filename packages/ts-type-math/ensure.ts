import { WasmValue, Wasm } from "./wasm"

export namespace Ensure {
  export type Length<
    input extends string,

    control extends string,

    Acc extends string = '',

    reverse extends boolean = false
  > =
    input extends `${infer AHead}${infer ATail}`
    ? control extends `${infer BHead}${infer BTail}`
      ? Length<
          ATail,
          BTail,
          reverse extends true
            ? `${AHead}${Acc}`
            : `${Acc}${AHead}`,
          reverse
        >
      : OverflowProtection<Acc, input>
    : control extends ''
      ? Acc
      : Length<
          control,
          control,
          Acc,
          true
        >

  export type I32<
    input extends WasmValue
  > = Length<input, Wasm.I32False>

  export type I64<
    input extends WasmValue
  > = Length<input, Wasm.I64False>

  export type OverflowProtection<
    input extends string,
    overflow extends string
  > =
    input extends `${infer discarded}${infer InputTail}`
    ? overflow extends `${infer OHead}${infer ORest}`
      ? OverflowProtection<`${InputTail}${OHead}`, ORest>
      : input
    : never
}

/** note that it cuts off anything beyond the control */
type preventsOverflows = // =>
  Ensure.Length<
    "abcdefghijk",
    "00000000"
  >

/** note that it adds the zeros AT THE BEGINNING */
type padsUnderflows = // =>
  Ensure.Length<
    "abcd",
    "00000000"
  >