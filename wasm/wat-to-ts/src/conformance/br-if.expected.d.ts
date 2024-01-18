import { Call, Numbers } from 'hotscript'

type $foo<
  $x extends number,
  RESULT =
    (Call<Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 0
    ? (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 0
      ? 7
      : 99
    : 42
> = RESULT

export type brif<
  $x extends number,
  RESULT =
    $foo<
      $x
    >
> = RESULT
