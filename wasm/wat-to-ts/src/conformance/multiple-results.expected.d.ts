import { Call, Numbers } from 'hotscript'

type $compute<
  $a extends number,
  $b extends number,
  RESULT =
    [
      Call<Numbers.Add<
        $a,
        $a
      >>,
      Call<Numbers.Mul<
        $b,
        $b
      >>,
    ]
> = RESULT

export type compute<
  $a extends number,
  $b extends number,
  RESULT =
    $compute<
      $a,
      $b
    >
> = RESULT
