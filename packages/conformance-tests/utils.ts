import { readFile } from 'fs/promises';
import { join } from 'path';

export const getWasm = async <
  entry = (x?: number, y?: number, z?: number) => number
>(
  testDirectory: string,
  testName: string
) => {
  const wasmPath = join(__dirname, testDirectory, `${testName}.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  return instance.exports.entry as entry;
}

export const getWasmMemory = (
  testDirectory: string,
  testName: string,
) => async <
  Input extends number[],
>(...input: Input) => {
  const wasmPath = join(__dirname, testDirectory, `${testName}.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  const { exports } = instance;
  const { memory, entry } = exports as {
    entry: (...input: Input) => number;
    memory: WebAssembly.Memory
  };

  const pointer = entry(...input);

  const buffer = new Uint8Array(memory.buffer);

  let output = '';
  for (let i = pointer; buffer[i]; i++) {
    output += String.fromCharCode(buffer[i]);
  }
  return output
}
