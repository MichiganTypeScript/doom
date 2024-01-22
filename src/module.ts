import { Entry, Instruction } from "./instructions.js";

export type Globals = Record<string, Entry>;

/** a representation of the full webassembly module */
export type WasmModule = {
  func: Record<string, ModuleField.Func>

  globals: Globals
};

export type Param = string;

/**
 * `kind` maps directly to the WAT name of the field
 */
export namespace ModuleField {
  export type Func = {
    kind: 'func';
    params: Param[];
    result: number;
    locals: string[];
    instructions: Instruction[];
  }
}