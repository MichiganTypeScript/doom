export type WasmType = 'i32' | 'i64' | 'f32' | 'f64';


/**
 * This type is a wasm memory value.  Could be an item on the stack, or a global, or a byte in memory (or a few bytes)
 * this is a string with either 8, 16, 32 or 64 bits in binary
 */
export type WasmValue = string;
