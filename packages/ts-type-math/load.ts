import { AddBinary } from "./add";
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

          // WARNING this is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
          // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.

          // Wasm.I32Add<address, Wasm.I32True>,
          AddBinary<address, '1'>,
          [
            ..._Acc,
            memory[address],
          ]
        >

  export type Read4Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,

    address extends WasmValue,
  > =
  // WARNING this is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
  // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    `${
      memory[address]
     }${
      memory[AddBinary<address, '1'>]
     }${
      memory[AddBinary<address, '10'>]
     }${
      memory[AddBinary<address, '11'>]
     }`

  export type JoinBytes<
    T extends Wasm.Byte[],

    Acc extends WasmValue = ''
  > = Satisfies<WasmValue,
    T extends [
      infer byte extends Wasm.Byte,
      ...infer Tail extends Wasm.Byte[],
    ]
    ? JoinBytes<Tail, `${Acc}${byte & Wasm.Byte}`>
    : Acc
  >
}