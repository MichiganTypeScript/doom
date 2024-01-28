import { readFile } from 'fs/promises';
import path from 'path';

export const getWasm = async <
  entry = (x?: number, y?: number, z?: number) => number
>(
  directory: string,
  filePath: string
) => {
  const wasmPath = path.join(__dirname, 'test', directory, `${filePath}.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  return instance.exports as {
    memory: WebAssembly.Memory;
    entry: entry;
  };
}
