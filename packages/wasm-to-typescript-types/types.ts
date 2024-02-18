import type { Instruction } from "./instructions/instructions"
import type { WasmType, WasmValue } from "ts-type-math"

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

export type MemoryAddress = WasmValue;

export type MemoryByAddress = Record<MemoryAddress, WasmValue>

export type BranchId = string;

export type GlobalsById = Record<string, WasmValue>;

export type Param = string;

export type Func = {
  kind: 'func';
  params: Param[];
  paramsTypes: WasmType[];
  result: WasmType | never;
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

  /** a stack of execution contexts */
  executionContexts: ExecutionContext[];

  activeExecutionContext: ExecutionContext;

  funcs: FuncsById;

  globals: GlobalsById;

  /** used for dynamic dispatch: maps directly to funcs */
  indirect: string[];

  /** the currently executing instructions */
  instructions: Instruction[];

  /** the linear memory of the program */
  memory: MemoryByAddress;

  memorySize: WasmValue;

  /** a stack of values */
  stack: WasmValue[];

  /** the result of the program */
  result: number | null;
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
