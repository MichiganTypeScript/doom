import type { Instruction } from "./instructions/instructions"

export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown

/** an item on the stack */

export type Entry = number;

export type MemoryAddress = number;

export type MemoryValue = string;

export type MemoryByAddress = Record<MemoryAddress, MemoryValue>

export type BranchId = string;

export type GlobalsById = Record<string, Entry>;

export type Param = string;

export type Func = {
  kind: 'func';
  params: Param[];
  result: number;
  locals: string[];
  instructions: Instruction[];
}

export type LocalsById = Record<string, number>;

export type BranchesById = Record<BranchId, Instruction[]>;

export type FuncsById = Record<string, Func>;

export type Reverse<T extends any[]> =
  T extends [infer head, ...infer tail]
  ? [...Reverse<tail>, head]
  : []

export type CorePrimitive = 'i32' | 'i64' | 'f32' | 'f64';

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

  memorySize: number;

  /** a stack of values */
  stack: Entry[];
}

export type ProgramInput = Pick<
  ProgramState,
  | "memory" | "memorySize" | "indirect" | "funcs" | "globals"
> & {
  arguments: number[];
}

type RemoveNullTerminator<T extends string> =
  T extends `${infer A}${infer B}`
  ? `${A extends "\0" ? "" : A}${RemoveNullTerminator<B>}`
  : T;

type Example = RemoveNullTerminator<`Make it perfect!\u0000`>;
//   ^?
