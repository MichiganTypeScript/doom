import { Call, Numbers } from 'hotscript'

type branch<
  $x extends number,
  RESULT extends number =
    (Call<Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 1
    ? 42
    : (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 1
      ? 99
      : 7
> = RESULT

type tests = [
  // ^?
  branch<1>,
  branch<0>,
  branch<-2>,
]
