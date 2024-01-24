export type MemoryAddress = number;

export type MemoryByAddress<
  RESULT extends Record<MemoryAddress, number> = {}
> = RESULT;
