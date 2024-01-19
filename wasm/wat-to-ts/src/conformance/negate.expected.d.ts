import { Call, Numbers } from 'hotscript'

type $main<
  RESULT extends number =
    Call<Numbers.Negate<
      10
    >>
> = RESULT

export type main<
  RESULT extends number =
    $main
> = RESULT
