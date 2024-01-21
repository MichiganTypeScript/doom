import { readFile } from 'fs/promises';
import path from 'path';

export const getWasm = async (filePath: string) => {
  const wasmPath = path.join(__dirname, 'conformance', `${filePath}.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  return instance.exports.entry as CallableFunction;
}