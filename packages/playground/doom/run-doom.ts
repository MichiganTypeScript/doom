import { readFile } from "fs/promises";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { WASI } from 'wasi';
import { argv, env } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

type i32 = number;
const nop = (name: string) => (...args: any[]) => {
  console.log(name, { args })
};


export const meetYourDoom = () => async <
  Input extends number[],
>(...input: Input) => {
  const wasmPath = join(__dirname, `doom.wasm`);
  const wasmBuffer = await readFile(wasmPath);
  const wasmModule = await WebAssembly.compile(wasmBuffer);

  const fakeEnv = {
    exit: (_0: i32) => { throw 'exited'},
    system: nop('system'),
    clock_gettime: nop('clock_gettime'),
    __syscall_open: nop('__syscall_open'),
    __syscall_fcntl64: nop('__syscall_fcntl64'),
    __syscall_ioctl: nop('__syscall_ioctl'),
    __syscall_mkdir: nop('__syscall_mkdir'),
    emscripten_get_now: nop('emscripten_get_now'),
    __syscall_unlink: nop('__syscall_unlink'),
    __syscall_rmdir: nop('__syscall_rmdir'),
    __syscall_rename: nop('__syscall_rename'),
    emscripten_resize_heap: nop('emscripten_resize_heap'),
    setTempRet0: nop('setTempRet0'),
  };
  // const importObject = {
  //   wasi_snapshot_preview1: {
  //     fd_write: nop('fd_write'),
  //     fd_seek: nop('fd_seek'),
  //     fd_read: nop('fd_read'),
  //     fd_close: nop('fd_close'),
  //   },
  // };

  const wasi = new WASI({
    version: 'preview1',
    args: argv,
    env,
  });
  // @ts-expect-error
  const importObject = wasi.getImportObject();
  console.log({ importObject})

  const instance = await WebAssembly.instantiate(wasmModule, { env: fakeEnv, ...importObject });
  const { exports } = instance;
  const { main } = exports as { main: () => void };
  wasi.start(instance);
  main();
}

console.log('hi')

const entry = meetYourDoom();
await entry()
