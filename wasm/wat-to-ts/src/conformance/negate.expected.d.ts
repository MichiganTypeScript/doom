import { Call, Numbers } from 'hotscript'

type $main<
  RESULT =
    Call<Numbers.Negate<
      10
    >>
> = RESULT
