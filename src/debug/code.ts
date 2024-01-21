import { readFile } from 'fs/promises';

export const getWasm = async () => {
  const wasmBuffer = await readFile('./src/debug/code.wasm');
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  return instance.exports as unknown as {
    memory: WebAssembly.Memory;
    entry: (x: number) => number;
  };
}

getWasm().then(({ memory, entry }) => {
  const buffer = new Uint8Array(memory.buffer);

  const ptr = entry(5);

  let str = '';

  for (let i = ptr; buffer[i]; i++) {
    str += String.fromCharCode(buffer[i]);
  }

  console.log(str);
}).catch(console.error);
