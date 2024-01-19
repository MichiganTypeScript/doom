import { readFileSync } from 'fs';

// Load the WASM file and instantiate it.
const bytes = readFileSync('./src/debug/code.wasm');
let obj = await WebAssembly.instantiate(new Uint8Array(bytes));

const a = 1;
const b = 8;
// @ts-expect-error
let result = obj.instance.exports.add(a, b);
console.log(`${a} + ${b} = ${result}`);
