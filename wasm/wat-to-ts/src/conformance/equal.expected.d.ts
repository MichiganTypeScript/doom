import { Call, Numbers } from 'hotscript'

type $main<
  $a extends number,
  $b extends number,
  RESULT =
    Call<Numbers.Equal<
      $a,
      $b
    >>
> = RESULT

export type equal<
  $a extends number,
  $b extends number,
  RESULT =
    $main<
      $a,
      $b
    >
> = RESULT
