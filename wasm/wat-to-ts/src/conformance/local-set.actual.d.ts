import { Call, Numbers } from 'hotscript'

type $main<
  $var extends number =
    10,
  RESULT extends number =
    Call<Numbers.Add<
      $var,
      1
    >>
> = RESULT

export type main<
  RESULT extends number =
    $main
> = RESULT
