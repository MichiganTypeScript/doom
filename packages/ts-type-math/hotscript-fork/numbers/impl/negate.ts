export type Negate<T extends number> =
  `${T}` extends `-${infer U extends number}`
    ? U
    : `-${T}` extends `${infer U extends number}`
    ? U
    : never;
