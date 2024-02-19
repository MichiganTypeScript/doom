import { WasmValue, Wasm } from "./wasm";

export namespace Load {
  /** returns an array of bytes */
  export type ReadBytes<
    /** number of bytes to read */
    count extends number,

    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,

    address extends WasmValue,

    _Acc extends Wasm.Byte[] = [],
  > =
    _Acc['length'] extends count
      ? _Acc
      : ReadBytes<
          count,
          memory,
          Wasm.I32Add<address, Wasm.I32True>,
          [
            ..._Acc,
            memory[address]
          ]
        >

  type _JoinBytes<
    T extends Wasm.Byte[],

    Acc extends WasmValue = ''
  > = Satisfies<WasmValue,
    T extends [
      infer byte extends Wasm.Byte,
      ...infer Tail extends Wasm.Byte[]
    ]
    ? _JoinBytes<Tail, `${Acc}${byte}`>
    : Acc
  >

  export type JoinBytes<
    T extends Wasm.Byte[]
  > = Satisfies<WasmValue,
    _JoinBytes<T>
  >
}