import { Call, Numbers } from 'hotscript'

type $add<
  $a extends number,
  $b extends number,
  RESULT extends number =
    Call<Numbers.Add<
      $a,
      $b
    >>
> = RESULT

export type add<
  $a extends number,
  $b extends number,
  RESULT extends number =
    $add<
      $a,
      $b
    >
> = RESULT
