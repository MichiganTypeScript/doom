import { readFile } from 'fs/promises';
import path from 'path';

export const getWasm = async (directory: string, filePath: string) => {
  const wasmPath = path.join(__dirname, 'test', directory, `${filePath}.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  return instance.exports.entry as CallableFunction;
}

type UpdateTuple<T extends readonly number[], Index extends keyof T, NewValue> = {
  [P in keyof T]: P extends Index ? NewValue : T[P]
};

export type Satisfies<T, U extends T> = U;

export type Cast<T, U> = T extends U ? T : never;
