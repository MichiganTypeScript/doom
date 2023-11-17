import { Call, Numbers } from 'hotscript'

type $main<
  RESULT =
    Call<Numbers.Equal<
      10,
      2
    >>
> = RESULT
