declare global {
  type Satisfies<T, U extends T> = U;
}

export {};
