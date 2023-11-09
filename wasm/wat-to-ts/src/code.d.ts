import { Numbers, Call } from 'hotscript';

type add<
  i_0 extends number,
  $b extends number
> = Numbers.Add<i_0, $b>;

export type program = Call<add<1, 2>>;
