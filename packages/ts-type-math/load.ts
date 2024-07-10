import { AddBinaryFixed } from "./add";
import { WasmValue, Wasm } from "./wasm";
import type { Satisfies } from './utils'

type FalseByte = '00000000';

export namespace Load {
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
    `${IsUnknownOrAnyFallback<_b0, FalseByte>}`
  
  export type Read2Bytes<
      /** memory object to read from */
      memory extends Record<WasmValue, Wasm.Byte>,
  
      address extends WasmValue,

      // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
      // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
      _b1 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000001'>],
      _b0 extends string = memory[address],
    > =
      `${
        IsUnknownOrAnyFallback<_b1, FalseByte>
      }${
        IsUnknownOrAnyFallback<_b0, FalseByte>
      }`
  
  export type Read4Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
    // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    address extends WasmValue,
    _b3 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000011'>],
    _b2 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000010'>],
    _b1 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000001'>],
    _b0 extends string = memory[address],
  > =
    `${
      IsUnknownOrAnyFallback<_b3, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b2, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b1, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b0, FalseByte>
    }`
  
  export type Read8Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    // WARNING using AddBinary here is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
    // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    address extends WasmValue,
    _b7 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000111'>],
    _b6 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000110'>],
    _b5 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000101'>],
    _b4 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000100'>],
    _b3 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000011'>],
    _b2 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000010'>],
    _b1 extends string = memory[AddBinaryFixed<address, '00000000000000000000000000000001'>],
    _b0 extends string = memory[address],
  > =
    `${
      IsUnknownOrAnyFallback<_b7, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b6, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b5, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b4, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b3, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b2, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b1, FalseByte>
    }${
      IsUnknownOrAnyFallback<_b0, FalseByte>
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
