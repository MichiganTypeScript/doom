import type { Instruction } from "./instructions/instructions"
import type { WasmType, WasmValue, Wasm } from "ts-type-math"

export type MemoryAddress = WasmValue;

export type MemoryByAddress = Record<MemoryAddress, Wasm.Byte>

export type BranchId = string;

export type GlobalsById = Record<string, WasmValue>;

export type Param = string;

export type Func = {
  kind: 'func';
  params: Param[];
  paramsTypes: WasmType[];
  result: WasmType | null;
  locals: string[];
  instructions: Instruction[];
}

export type LocalsById = Record<string, WasmValue>;

export type BranchesById = Record<BranchId, Instruction[]>;

export type FuncsById = Record<string, Func>;

export type Reverse<T extends any[]> =
  T extends [infer head, ...infer tail]
  ? [...Reverse<tail>, head]
  : []

export type StorageBits = 8 | 16 | 32 | 64;

export type ExecutionContext = {
  /** the current local variable values */
  locals: LocalsById;

  /** not really required, but really helpful for debugging */
  funcId: string;

  /**
   * a control flow helper that tells the program how to interpret the next when it hits a branch
   */
  branches: BranchesById;
}

export type ProgramState = {
  /** the number of instructions we've executed, useful for debugging */
  count: number;

  /** the result of the program */
  result: number | null;

  /** a stack of values */
  stack: WasmValue[];

  /** the currently executing instructions */
  instructions: Instruction[];

  /** the current execution context locals */
  activeLocals: LocalsById;
  /** the current execution context funcId */
  activeFuncId: string;
  /** the current execution context branches */
  activeBranches: BranchesById;

  globals: GlobalsById;

  /** the linear memory of the program */
  memory: MemoryByAddress;

  /** used for dynamic dispatch: maps directly to funcs */
  indirect: string[];

  memorySize: WasmValue;

  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];

  funcs: FuncsById;
}

export type ProgramInput = Pick<
  ProgramState,
  | "memory" | "indirect" | "globals" | "memorySize"
> & {
  arguments: number[];
  funcs: FuncsById & {
    $entry: Func;
  };
}

type RemoveNullTerminator<T extends string> =
  T extends `${infer A}${infer B}`
  ? `${A extends "\0" ? "" : A}${RemoveNullTerminator<B>}`
  : T;

type Example = RemoveNullTerminator<`Make it perfect!\u0000`>;
//   ^?
