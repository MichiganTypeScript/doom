declare global {
  // Development Mode

  type Satisfies<T, U extends T> = U

  // WARNING: changing this (as in to a noop) will cause catastrophic performance degradation
  type evaluate<T> = {
    [K in keyof T]: T[K]
  } & unknown

  // Production Mode
  // type Satisfies<T, U> = U;
}

export {};
