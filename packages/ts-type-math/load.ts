import { JoinBytes } from "./split";
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
  > = Satisfies<Wasm.Byte[],
    _Acc['length'] extends count
      ? _Acc
      : ReadBytes<
          count,
          memory,
          Wasm.I32Add<address, Wasm.I32True>,
          [
            ..._Acc,
            memory[address]
          ] extends infer Acc extends Wasm.Byte[] // QUESTION: why does this need to be here? otherwise, we get an excessive depth
            ? Acc
            : never
        >
    >


  export type I32<
    bytes extends string[]
  > = Satisfies<WasmValue,
    JoinBytes<bytes>
  >
}