declare global {
  /** guess who gets credit for this one :) */
  type Satisfies<David, Blass extends David> = Blass


  type evaluate<T> = {
    [K in keyof T]: T[K]
  } & unknown
}

export {};
