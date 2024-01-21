import { Instruction } from "./instructions.js";

/**
 * `kind` maps directly to the WAT name of the field
 */
export namespace ModuleField {
  export type Func = {
    kind: 'func';
    signature: {
      params: string[];
      result: number;
      locals: string[];
      instructions: Instruction[];
    };
  }
}