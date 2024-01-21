import { Call, Numbers } from 'hotscript'

type $negate<
  RESULT extends number =
    Call<Numbers.Negate<
      10
    >>
> = RESULT

type $entry<
  RESULT extends number =
    $negate
> = RESULT

export type entry<
  RESULT extends number =
    $entry
> = RESULT
