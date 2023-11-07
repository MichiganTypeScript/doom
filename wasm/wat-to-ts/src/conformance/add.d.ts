import { Numbers, Call } from 'hotscript';

type add<
  $a extends number,
  $b extends number
> = Numbers.Add<$a, $b>;

export type program = Call<add<1, 2>>;
