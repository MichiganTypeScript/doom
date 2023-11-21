import { Call, Numbers } from 'hotscript'

type branch2<
  $x extends number,
  RESULT =
    (Call<Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 1
    ? 42
    : (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 1
      ? 99
      : 7
> = RESULT

type x2 = [
  // ^?
  branch2<1>,
  branch2<0>,
  branch2<-2>,
]

type branch<
  $x extends number,
  RESULT =
    Call<Numbers.Equal<$x, 0>>  extends true
    ? 42
    : Call<Numbers.Equal<$x, 1>> extends true
      ? 99
      : 7
> = RESULT

type x = [
  // ^?
  branch<1>,
  branch<0>,
  branch<-2>,
]