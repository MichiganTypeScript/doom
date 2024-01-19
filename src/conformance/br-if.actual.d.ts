import { Call, Numbers } from 'hotscript'

export type $foo<
  $x extends number,
  RESULT extends number =
    (Call<Numbers.Equal<$x, 0>> extends true ? 1 : 0) extends 1
    ? 42
    : (Call<Numbers.Equal<$x, 1>> extends true ? 1 : 0) extends 1
      ? 99
      : 7
> = RESULT

export type brif<
  $x extends number,
  RESULT extends number =
    $foo<
      $x
    >
> = RESULT
