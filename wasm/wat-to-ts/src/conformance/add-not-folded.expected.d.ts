import { Call, Numbers } from 'hotscript'

type $add<
  $a extends number,
  $b extends number,
  RESULT =
    Call<Numbers.Add<
      $a,
      $b
    >>
> = RESULT

export type add<
  $a extends number,
  $b extends number,
  RESULT =
    $add<
      $a,
      $b
    >
> = RESULT
