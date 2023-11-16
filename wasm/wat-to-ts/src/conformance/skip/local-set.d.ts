import { Call, Numbers } from 'hotscript';

type $main<
  _$var extends number = 10,
  $asdf = Call<Numbers.Add<2, _$var>>,
  RESULT = $asdf
> = RESULT;

type x = $main;
//   ^?