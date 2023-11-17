import { Call, Numbers } from 'hotscript'

type $main<
  $var extends number =
    10,
  RESULT =
    Call<Numbers.Add<
      $var,
      1
    >>
> = RESULT
