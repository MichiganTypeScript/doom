import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const getWasm = async <entry = (x: number) => number>() => {
  const wasmBuffer = await readFile(join(__dirname, './conway.wasm'));
  const wasmModule = await WebAssembly.compile(wasmBuffer);
  const instance = await WebAssembly.instantiate(wasmModule);
  const { exports } = instance;
  const { memory } = exports as { memory: WebAssembly.Memory };
  
  const buffer = new Uint8Array(memory.buffer);

  const ptr = entry(1);
  console.log({ ptr })

  let output = [];
  for (let i = ptr; buffer[i]; i++) {
    output.push(buffer[i]);
  }

  console.log(output);
}

getWasm().then(({ memory, entry }) => {

}).catch(console.error);
