import { AddBinary } from "./add";
import { WasmValue, Wasm } from "./wasm";

export namespace Load {
  export type Read1Byte<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    address extends WasmValue,
  > =
    `${memory[address]}`
  
  export type Read2Bytes<
      /** memory object to read from */
      memory extends Record<WasmValue, Wasm.Byte>,
  
      address extends WasmValue,
    > =
    // WARNING this is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
    // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
      `${
        memory[AddBinary<address, '1'>]
      }${
        memory[address]
      }`
  
  export type Read4Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    address extends WasmValue,
  > =
  // WARNING this is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
  // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    `${
      memory[AddBinary<address, '11'>]
    }${
      memory[AddBinary<address, '10'>]
    }${
      memory[AddBinary<address,  '1'>]
    }${
      memory[address]
    }`
  
  export type Read8Bytes<
    /** memory object to read from */
    memory extends Record<WasmValue, Wasm.Byte>,
  
    address extends WasmValue,
  > =
  // WARNING this is dangerous because it can overflow past I32 but the other (safer) option is to use Wasm.I32Add which does a Clamp, which is very expensive.
  // this is such an incredibly hot path for memory management that if we actually overflow here.. well.. that's gonna be a rough debugging day.  just gonna have to hope that doesn't happen.
    `${
      memory[AddBinary<address, '111'>]
    }${
      memory[AddBinary<address, '110'>]
    }${
      memory[AddBinary<address, '101'>]
    }${
      memory[AddBinary<address, '100'>]
    }${
      memory[AddBinary<address,  '11'>]
    }${
      memory[AddBinary<address,  '10'>]
    }${
      memory[AddBinary<address,   '1'>]
    }${
      memory[address]
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
