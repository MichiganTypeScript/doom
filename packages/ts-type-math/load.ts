import { AddBinary } from "./add";
import { WasmValue, Wasm } from "./wasm";

export namespace Load {
  /**
   * in WebAssembly, linear memory is "zeroed out" when the program initializes, which means it's actually totally fine to read memory beyond what's been written.
   * all that happens is you get zero bytes.  check out the single-i32store8.wat for a simple example.
   */
  type ZeroedByte = '00000000';

  /**
   * this function will use a fallback if the resulting value is equal to any or unknown
   * 
   * specifically, this is useful for when you're reading from memory and you want to use a fallback value if the memory is uninitialized.
   */
  type IsUnknownOrAnyFallback<T, Fallback> = unknown extends T ? Fallback : T

  export type Read1Byte<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    address extends WasmValue,

    _b0 extends string = memory[address]
  > =
    `${IsUnknownOrAnyFallback<_b0, ZeroedByte>}`
  
  export type Read2Bytes<
      /** memory object to read from */
      memory extends Record<WasmValue, Wasm.Byte>,
  
      address extends WasmValue,

      // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
      // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
      _b1 extends string = memory[AddBinary<address, '00000000000000000000000000000001'>],
      _b0 extends string = memory[address],
    > =
      `${
        IsUnknownOrAnyFallback<_b1, ZeroedByte>
      }${
        IsUnknownOrAnyFallback<_b0, ZeroedByte>
      }`
  
  export type Read4Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
    // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    address extends WasmValue,
    _b3 extends string = memory[AddBinary<address, '00000000000000000000000000000011'>],
    _b2 extends string = memory[AddBinary<address, '00000000000000000000000000000010'>],
    _b1 extends string = memory[AddBinary<address, '00000000000000000000000000000001'>],
    _b0 extends string = memory[address],
  > =
    `${
      IsUnknownOrAnyFallback<_b3, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b2, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b1, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b0, ZeroedByte>
    }`
  
  export type Read8Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
    // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    address extends WasmValue,
    _b7 extends string = memory[AddBinary<address, '00000000000000000000000000000111'>],
    _b6 extends string = memory[AddBinary<address, '00000000000000000000000000000110'>],
    _b5 extends string = memory[AddBinary<address, '00000000000000000000000000000101'>],
    _b4 extends string = memory[AddBinary<address, '00000000000000000000000000000100'>],
    _b3 extends string = memory[AddBinary<address, '00000000000000000000000000000011'>],
    _b2 extends string = memory[AddBinary<address, '00000000000000000000000000000010'>],
    _b1 extends string = memory[AddBinary<address, '00000000000000000000000000000001'>],
    _b0 extends string = memory[address],
  > =
    `${
      IsUnknownOrAnyFallback<_b7, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b6, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b5, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b4, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b3, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b2, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b1, ZeroedByte>
    }${
      IsUnknownOrAnyFallback<_b0, ZeroedByte>
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
