declare global {
  // Development Mode

  type Satisfies<T, U extends T> = U

  // Production Mode
  // type Satisfies<T, U> = U;
}

export {};
