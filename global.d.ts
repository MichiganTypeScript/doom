declare global {
  // Development Mode

  /** guess who gets credit for this one :) */
  type Satisfies<David, Blass extends David> = Blass

  // WARNING: changing this (as in to a noop) will cause catastrophic performance degradation
  type evaluate<T> = {
    [K in keyof T]: T[K]
  } & unknown

  // Production Mode
  // type Satisfies<T, U> = U;
}

export {};
