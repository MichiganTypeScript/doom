import { Call, Numbers } from 'hotscript'

type Satisfies<Base, T extends Base> = T;
type x = Satisfies<number, 2>;

type Satisfies2<Base, T> = T extends Base ? T : never;
type y = Satisfies2<number, 2>;

type $main<
  $a extends number,
  $b extends number,
  RESULT extends number =
    Call<Numbers.Equal<
      $a,
      $b
    >>
> = RESULT

export type equal<
  $a extends number,
  $b extends number,
  RESULT =
    $main<
      $a,
      $b
    >
> = RESULT
