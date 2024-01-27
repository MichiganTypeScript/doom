export type Abs<T extends number> = `${T}` extends `-${infer U extends
  | number
 }`
  ? U
  : T;
