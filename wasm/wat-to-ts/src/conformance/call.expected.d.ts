import { Call, Numbers } from 'hotscript'

type $get42<
  RESULT =
    42
> = RESULT

type $get42Plus1<
  RESULT =
    Call<Numbers.Add<
      $get42,
      1
    >>
> = RESULT

export type get42Plus1<
  RESULT =
    $get42Plus1
> = RESULT
