declare global {
  /** guess who gets credit for this one :) */
  type Satisfies<David, Blass extends David> = Blass
}

export {};
