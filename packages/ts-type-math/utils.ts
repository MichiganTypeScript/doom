// WARNING: changing this (as in to a noop) will cause catastrophic performance degradation
export type evaluate<T> = {
  [K in keyof T]: T[K]
} & unknown
