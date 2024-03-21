import { Equal, Expect } from "type-testing"
import { t, T } from '../test-cases/arithmetic-i64';
import { expect, test } from 'vitest';
import { twosComplementToBigInt, bigIntToTwosComplement, arithmeticBigInt } from "../test-utils";
import { DivideSignedBinary64 } from "../divide";

test.each(t)('(%#)', ({ a, a_binary64, b, b_binary64, div_u, div_u_binary64 }) => {
  expect(a_binary64).toEqual(bigIntToTwosComplement(a));
  expect(a).toEqual(twosComplementToBigInt(a_binary64));
  expect(b_binary64).toEqual(bigIntToTwosComplement(b));
  expect(b).toEqual(twosComplementToBigInt(b_binary64));
  expect(div_u_binary64).toEqual(bigIntToTwosComplement(div_u));
  expect(div_u).toEqual(twosComplementToBigInt(div_u_binary64));

  const actual = arithmeticBigInt.div_u(a, b)
  expect(actual).toBe(div_u);
});

type i = 33
type a = T[i]['a_binary64']     // =>
type b = T[i]['b_binary64']     // =>
type x1 = DivideSignedBinary64<a, b>
type e = T[i]['div_u_binary64'] // =>
type x = x1['quotient']         // =>

type Case00  = Expect<Equal<DivideSignedBinary64<T[  0]['a_binary64'], T[  0]['b_binary64']>['quotient'], T[  0]['div_u_binary64']>>
type Case01  = Expect<Equal<DivideSignedBinary64<T[  1]['a_binary64'], T[  1]['b_binary64']>['quotient'], T[  1]['div_u_binary64']>>
type Case02  = Expect<Equal<DivideSignedBinary64<T[  2]['a_binary64'], T[  2]['b_binary64']>['quotient'], T[  2]['div_u_binary64']>>
type Case03  = Expect<Equal<DivideSignedBinary64<T[  3]['a_binary64'], T[  3]['b_binary64']>['quotient'], T[  3]['div_u_binary64']>>
type Case04  = Expect<Equal<DivideSignedBinary64<T[  4]['a_binary64'], T[  4]['b_binary64']>['quotient'], T[  4]['div_u_binary64']>>
type Case05  = Expect<Equal<DivideSignedBinary64<T[  5]['a_binary64'], T[  5]['b_binary64']>['quotient'], T[  5]['div_u_binary64']>>
type Case06  = Expect<Equal<DivideSignedBinary64<T[  6]['a_binary64'], T[  6]['b_binary64']>['quotient'], T[  6]['div_u_binary64']>>
type Case07  = Expect<Equal<DivideSignedBinary64<T[  7]['a_binary64'], T[  7]['b_binary64']>['quotient'], T[  7]['div_u_binary64']>>
type Case08  = Expect<Equal<DivideSignedBinary64<T[  8]['a_binary64'], T[  8]['b_binary64']>['quotient'], T[  8]['div_u_binary64']>>
type Case09  = Expect<Equal<DivideSignedBinary64<T[  9]['a_binary64'], T[  9]['b_binary64']>['quotient'], T[  9]['div_u_binary64']>>
type Case10  = Expect<Equal<DivideSignedBinary64<T[ 10]['a_binary64'], T[ 10]['b_binary64']>['quotient'], T[ 10]['div_u_binary64']>>
type Case11  = Expect<Equal<DivideSignedBinary64<T[ 11]['a_binary64'], T[ 11]['b_binary64']>['quotient'], T[ 11]['div_u_binary64']>>
type Case12  = Expect<Equal<DivideSignedBinary64<T[ 12]['a_binary64'], T[ 12]['b_binary64']>['quotient'], T[ 12]['div_u_binary64']>>
type Case13  = Expect<Equal<DivideSignedBinary64<T[ 13]['a_binary64'], T[ 13]['b_binary64']>['quotient'], T[ 13]['div_u_binary64']>>
type Case14  = Expect<Equal<DivideSignedBinary64<T[ 14]['a_binary64'], T[ 14]['b_binary64']>['quotient'], T[ 14]['div_u_binary64']>>
type Case15  = Expect<Equal<DivideSignedBinary64<T[ 15]['a_binary64'], T[ 15]['b_binary64']>['quotient'], T[ 15]['div_u_binary64']>>
type Case16  = Expect<Equal<DivideSignedBinary64<T[ 16]['a_binary64'], T[ 16]['b_binary64']>['quotient'], T[ 16]['div_u_binary64']>>
type Case17  = Expect<Equal<DivideSignedBinary64<T[ 17]['a_binary64'], T[ 17]['b_binary64']>['quotient'], T[ 17]['div_u_binary64']>>
type Case18  = Expect<Equal<DivideSignedBinary64<T[ 18]['a_binary64'], T[ 18]['b_binary64']>['quotient'], T[ 18]['div_u_binary64']>>
type Case19  = Expect<Equal<DivideSignedBinary64<T[ 19]['a_binary64'], T[ 19]['b_binary64']>['quotient'], T[ 19]['div_u_binary64']>>
type Case20  = Expect<Equal<DivideSignedBinary64<T[ 20]['a_binary64'], T[ 20]['b_binary64']>['quotient'], T[ 20]['div_u_binary64']>>
type Case21  = Expect<Equal<DivideSignedBinary64<T[ 21]['a_binary64'], T[ 21]['b_binary64']>['quotient'], T[ 21]['div_u_binary64']>>
type Case22  = Expect<Equal<DivideSignedBinary64<T[ 22]['a_binary64'], T[ 22]['b_binary64']>['quotient'], T[ 22]['div_u_binary64']>>
type Case23  = Expect<Equal<DivideSignedBinary64<T[ 23]['a_binary64'], T[ 23]['b_binary64']>['quotient'], T[ 23]['div_u_binary64']>>
type Case24  = Expect<Equal<DivideSignedBinary64<T[ 24]['a_binary64'], T[ 24]['b_binary64']>['quotient'], T[ 24]['div_u_binary64']>>
type Case25  = Expect<Equal<DivideSignedBinary64<T[ 25]['a_binary64'], T[ 25]['b_binary64']>['quotient'], T[ 25]['div_u_binary64']>>
type Case26  = Expect<Equal<DivideSignedBinary64<T[ 26]['a_binary64'], T[ 26]['b_binary64']>['quotient'], T[ 26]['div_u_binary64']>>
type Case27  = Expect<Equal<DivideSignedBinary64<T[ 27]['a_binary64'], T[ 27]['b_binary64']>['quotient'], T[ 27]['div_u_binary64']>>
type Case28  = Expect<Equal<DivideSignedBinary64<T[ 28]['a_binary64'], T[ 28]['b_binary64']>['quotient'], T[ 28]['div_u_binary64']>>
type Case29  = Expect<Equal<DivideSignedBinary64<T[ 29]['a_binary64'], T[ 29]['b_binary64']>['quotient'], T[ 29]['div_u_binary64']>>
type Case30  = Expect<Equal<DivideSignedBinary64<T[ 30]['a_binary64'], T[ 30]['b_binary64']>['quotient'], T[ 30]['div_u_binary64']>>
type Case31  = Expect<Equal<DivideSignedBinary64<T[ 31]['a_binary64'], T[ 31]['b_binary64']>['quotient'], T[ 31]['div_u_binary64']>>
type Case32  = Expect<Equal<DivideSignedBinary64<T[ 32]['a_binary64'], T[ 32]['b_binary64']>['quotient'], T[ 32]['div_u_binary64']>>
type Case33  = Expect<Equal<DivideSignedBinary64<T[ 33]['a_binary64'], T[ 33]['b_binary64']>['quotient'], T[ 33]['div_u_binary64']>>
type Case34  = Expect<Equal<DivideSignedBinary64<T[ 34]['a_binary64'], T[ 34]['b_binary64']>['quotient'], T[ 34]['div_u_binary64']>>
type Case35  = Expect<Equal<DivideSignedBinary64<T[ 35]['a_binary64'], T[ 35]['b_binary64']>['quotient'], T[ 35]['div_u_binary64']>>
type Case36  = Expect<Equal<DivideSignedBinary64<T[ 36]['a_binary64'], T[ 36]['b_binary64']>['quotient'], T[ 36]['div_u_binary64']>>
type Case37  = Expect<Equal<DivideSignedBinary64<T[ 37]['a_binary64'], T[ 37]['b_binary64']>['quotient'], T[ 37]['div_u_binary64']>>
type Case38  = Expect<Equal<DivideSignedBinary64<T[ 38]['a_binary64'], T[ 38]['b_binary64']>['quotient'], T[ 38]['div_u_binary64']>>
type Case39  = Expect<Equal<DivideSignedBinary64<T[ 39]['a_binary64'], T[ 39]['b_binary64']>['quotient'], T[ 39]['div_u_binary64']>>
type Case40  = Expect<Equal<DivideSignedBinary64<T[ 40]['a_binary64'], T[ 40]['b_binary64']>['quotient'], T[ 40]['div_u_binary64']>>
type Case41  = Expect<Equal<DivideSignedBinary64<T[ 41]['a_binary64'], T[ 41]['b_binary64']>['quotient'], T[ 41]['div_u_binary64']>>
type Case42  = Expect<Equal<DivideSignedBinary64<T[ 42]['a_binary64'], T[ 42]['b_binary64']>['quotient'], T[ 42]['div_u_binary64']>>
type Case43  = Expect<Equal<DivideSignedBinary64<T[ 43]['a_binary64'], T[ 43]['b_binary64']>['quotient'], T[ 43]['div_u_binary64']>>
type Case44  = Expect<Equal<DivideSignedBinary64<T[ 44]['a_binary64'], T[ 44]['b_binary64']>['quotient'], T[ 44]['div_u_binary64']>>
type Case45  = Expect<Equal<DivideSignedBinary64<T[ 45]['a_binary64'], T[ 45]['b_binary64']>['quotient'], T[ 45]['div_u_binary64']>>
type Case46  = Expect<Equal<DivideSignedBinary64<T[ 46]['a_binary64'], T[ 46]['b_binary64']>['quotient'], T[ 46]['div_u_binary64']>>
type Case47  = Expect<Equal<DivideSignedBinary64<T[ 47]['a_binary64'], T[ 47]['b_binary64']>['quotient'], T[ 47]['div_u_binary64']>>
type Case48  = Expect<Equal<DivideSignedBinary64<T[ 48]['a_binary64'], T[ 48]['b_binary64']>['quotient'], T[ 48]['div_u_binary64']>>
type Case49  = Expect<Equal<DivideSignedBinary64<T[ 49]['a_binary64'], T[ 49]['b_binary64']>['quotient'], T[ 49]['div_u_binary64']>>
type Case50  = Expect<Equal<DivideSignedBinary64<T[ 50]['a_binary64'], T[ 50]['b_binary64']>['quotient'], T[ 50]['div_u_binary64']>>
type Case51  = Expect<Equal<DivideSignedBinary64<T[ 51]['a_binary64'], T[ 51]['b_binary64']>['quotient'], T[ 51]['div_u_binary64']>>
type Case52  = Expect<Equal<DivideSignedBinary64<T[ 52]['a_binary64'], T[ 52]['b_binary64']>['quotient'], T[ 52]['div_u_binary64']>>
type Case53  = Expect<Equal<DivideSignedBinary64<T[ 53]['a_binary64'], T[ 53]['b_binary64']>['quotient'], T[ 53]['div_u_binary64']>>
type Case54  = Expect<Equal<DivideSignedBinary64<T[ 54]['a_binary64'], T[ 54]['b_binary64']>['quotient'], T[ 54]['div_u_binary64']>>
type Case55  = Expect<Equal<DivideSignedBinary64<T[ 55]['a_binary64'], T[ 55]['b_binary64']>['quotient'], T[ 55]['div_u_binary64']>>
type Case56  = Expect<Equal<DivideSignedBinary64<T[ 56]['a_binary64'], T[ 56]['b_binary64']>['quotient'], T[ 56]['div_u_binary64']>>
type Case57  = Expect<Equal<DivideSignedBinary64<T[ 57]['a_binary64'], T[ 57]['b_binary64']>['quotient'], T[ 57]['div_u_binary64']>>
type Case58  = Expect<Equal<DivideSignedBinary64<T[ 58]['a_binary64'], T[ 58]['b_binary64']>['quotient'], T[ 58]['div_u_binary64']>>
type Case59  = Expect<Equal<DivideSignedBinary64<T[ 59]['a_binary64'], T[ 59]['b_binary64']>['quotient'], T[ 59]['div_u_binary64']>>
type Case60  = Expect<Equal<DivideSignedBinary64<T[ 60]['a_binary64'], T[ 60]['b_binary64']>['quotient'], T[ 60]['div_u_binary64']>>
type Case61  = Expect<Equal<DivideSignedBinary64<T[ 61]['a_binary64'], T[ 61]['b_binary64']>['quotient'], T[ 61]['div_u_binary64']>>
type Case62  = Expect<Equal<DivideSignedBinary64<T[ 62]['a_binary64'], T[ 62]['b_binary64']>['quotient'], T[ 62]['div_u_binary64']>>
type Case63  = Expect<Equal<DivideSignedBinary64<T[ 63]['a_binary64'], T[ 63]['b_binary64']>['quotient'], T[ 63]['div_u_binary64']>>
type Case64  = Expect<Equal<DivideSignedBinary64<T[ 64]['a_binary64'], T[ 64]['b_binary64']>['quotient'], T[ 64]['div_u_binary64']>>
type Case65  = Expect<Equal<DivideSignedBinary64<T[ 65]['a_binary64'], T[ 65]['b_binary64']>['quotient'], T[ 65]['div_u_binary64']>>
type Case66  = Expect<Equal<DivideSignedBinary64<T[ 66]['a_binary64'], T[ 66]['b_binary64']>['quotient'], T[ 66]['div_u_binary64']>>
type Case67  = Expect<Equal<DivideSignedBinary64<T[ 67]['a_binary64'], T[ 67]['b_binary64']>['quotient'], T[ 67]['div_u_binary64']>>
type Case68  = Expect<Equal<DivideSignedBinary64<T[ 68]['a_binary64'], T[ 68]['b_binary64']>['quotient'], T[ 68]['div_u_binary64']>>
type Case69  = Expect<Equal<DivideSignedBinary64<T[ 69]['a_binary64'], T[ 69]['b_binary64']>['quotient'], T[ 69]['div_u_binary64']>>
type Case70  = Expect<Equal<DivideSignedBinary64<T[ 70]['a_binary64'], T[ 70]['b_binary64']>['quotient'], T[ 70]['div_u_binary64']>>
type Case71  = Expect<Equal<DivideSignedBinary64<T[ 71]['a_binary64'], T[ 71]['b_binary64']>['quotient'], T[ 71]['div_u_binary64']>>
type Case72  = Expect<Equal<DivideSignedBinary64<T[ 72]['a_binary64'], T[ 72]['b_binary64']>['quotient'], T[ 72]['div_u_binary64']>>
type Case73  = Expect<Equal<DivideSignedBinary64<T[ 73]['a_binary64'], T[ 73]['b_binary64']>['quotient'], T[ 73]['div_u_binary64']>>
type Case74  = Expect<Equal<DivideSignedBinary64<T[ 74]['a_binary64'], T[ 74]['b_binary64']>['quotient'], T[ 74]['div_u_binary64']>>
type Case75  = Expect<Equal<DivideSignedBinary64<T[ 75]['a_binary64'], T[ 75]['b_binary64']>['quotient'], T[ 75]['div_u_binary64']>>
type Case76  = Expect<Equal<DivideSignedBinary64<T[ 76]['a_binary64'], T[ 76]['b_binary64']>['quotient'], T[ 76]['div_u_binary64']>>
type Case77  = Expect<Equal<DivideSignedBinary64<T[ 77]['a_binary64'], T[ 77]['b_binary64']>['quotient'], T[ 77]['div_u_binary64']>>
type Case78  = Expect<Equal<DivideSignedBinary64<T[ 78]['a_binary64'], T[ 78]['b_binary64']>['quotient'], T[ 78]['div_u_binary64']>>
type Case79  = Expect<Equal<DivideSignedBinary64<T[ 79]['a_binary64'], T[ 79]['b_binary64']>['quotient'], T[ 79]['div_u_binary64']>>
type Case80  = Expect<Equal<DivideSignedBinary64<T[ 80]['a_binary64'], T[ 80]['b_binary64']>['quotient'], T[ 80]['div_u_binary64']>>
type Case81  = Expect<Equal<DivideSignedBinary64<T[ 81]['a_binary64'], T[ 81]['b_binary64']>['quotient'], T[ 81]['div_u_binary64']>>
type Case82  = Expect<Equal<DivideSignedBinary64<T[ 82]['a_binary64'], T[ 82]['b_binary64']>['quotient'], T[ 82]['div_u_binary64']>>
type Case83  = Expect<Equal<DivideSignedBinary64<T[ 83]['a_binary64'], T[ 83]['b_binary64']>['quotient'], T[ 83]['div_u_binary64']>>
type Case84  = Expect<Equal<DivideSignedBinary64<T[ 84]['a_binary64'], T[ 84]['b_binary64']>['quotient'], T[ 84]['div_u_binary64']>>
type Case85  = Expect<Equal<DivideSignedBinary64<T[ 85]['a_binary64'], T[ 85]['b_binary64']>['quotient'], T[ 85]['div_u_binary64']>>
type Case86  = Expect<Equal<DivideSignedBinary64<T[ 86]['a_binary64'], T[ 86]['b_binary64']>['quotient'], T[ 86]['div_u_binary64']>>
type Case87  = Expect<Equal<DivideSignedBinary64<T[ 87]['a_binary64'], T[ 87]['b_binary64']>['quotient'], T[ 87]['div_u_binary64']>>
type Case88  = Expect<Equal<DivideSignedBinary64<T[ 88]['a_binary64'], T[ 88]['b_binary64']>['quotient'], T[ 88]['div_u_binary64']>>
type Case89  = Expect<Equal<DivideSignedBinary64<T[ 89]['a_binary64'], T[ 89]['b_binary64']>['quotient'], T[ 89]['div_u_binary64']>>
type Case90  = Expect<Equal<DivideSignedBinary64<T[ 90]['a_binary64'], T[ 90]['b_binary64']>['quotient'], T[ 90]['div_u_binary64']>>
type Case91  = Expect<Equal<DivideSignedBinary64<T[ 91]['a_binary64'], T[ 91]['b_binary64']>['quotient'], T[ 91]['div_u_binary64']>>
type Case92  = Expect<Equal<DivideSignedBinary64<T[ 92]['a_binary64'], T[ 92]['b_binary64']>['quotient'], T[ 92]['div_u_binary64']>>
type Case93  = Expect<Equal<DivideSignedBinary64<T[ 93]['a_binary64'], T[ 93]['b_binary64']>['quotient'], T[ 93]['div_u_binary64']>>
type Case94  = Expect<Equal<DivideSignedBinary64<T[ 94]['a_binary64'], T[ 94]['b_binary64']>['quotient'], T[ 94]['div_u_binary64']>>
type Case95  = Expect<Equal<DivideSignedBinary64<T[ 95]['a_binary64'], T[ 95]['b_binary64']>['quotient'], T[ 95]['div_u_binary64']>>
type Case96  = Expect<Equal<DivideSignedBinary64<T[ 96]['a_binary64'], T[ 96]['b_binary64']>['quotient'], T[ 96]['div_u_binary64']>>
type Case97  = Expect<Equal<DivideSignedBinary64<T[ 97]['a_binary64'], T[ 97]['b_binary64']>['quotient'], T[ 97]['div_u_binary64']>>
type Case98  = Expect<Equal<DivideSignedBinary64<T[ 98]['a_binary64'], T[ 98]['b_binary64']>['quotient'], T[ 98]['div_u_binary64']>>
type Case99  = Expect<Equal<DivideSignedBinary64<T[ 99]['a_binary64'], T[ 99]['b_binary64']>['quotient'], T[ 99]['div_u_binary64']>>
type Case100 = Expect<Equal<DivideSignedBinary64<T[100]['a_binary64'], T[100]['b_binary64']>['quotient'], T[100]['div_u_binary64']>>
type Case101 = Expect<Equal<DivideSignedBinary64<T[101]['a_binary64'], T[101]['b_binary64']>['quotient'], T[101]['div_u_binary64']>>
type Case102 = Expect<Equal<DivideSignedBinary64<T[102]['a_binary64'], T[102]['b_binary64']>['quotient'], T[102]['div_u_binary64']>>
type Case103 = Expect<Equal<DivideSignedBinary64<T[103]['a_binary64'], T[103]['b_binary64']>['quotient'], T[103]['div_u_binary64']>>
type Case104 = Expect<Equal<DivideSignedBinary64<T[104]['a_binary64'], T[104]['b_binary64']>['quotient'], T[104]['div_u_binary64']>>
type Case105 = Expect<Equal<DivideSignedBinary64<T[105]['a_binary64'], T[105]['b_binary64']>['quotient'], T[105]['div_u_binary64']>>
type Case106 = Expect<Equal<DivideSignedBinary64<T[106]['a_binary64'], T[106]['b_binary64']>['quotient'], T[106]['div_u_binary64']>>
type Case107 = Expect<Equal<DivideSignedBinary64<T[107]['a_binary64'], T[107]['b_binary64']>['quotient'], T[107]['div_u_binary64']>>
type Case108 = Expect<Equal<DivideSignedBinary64<T[108]['a_binary64'], T[108]['b_binary64']>['quotient'], T[108]['div_u_binary64']>>
type Case109 = Expect<Equal<DivideSignedBinary64<T[109]['a_binary64'], T[109]['b_binary64']>['quotient'], T[109]['div_u_binary64']>>
type Case110 = Expect<Equal<DivideSignedBinary64<T[110]['a_binary64'], T[110]['b_binary64']>['quotient'], T[110]['div_u_binary64']>>
type Case111 = Expect<Equal<DivideSignedBinary64<T[111]['a_binary64'], T[111]['b_binary64']>['quotient'], T[111]['div_u_binary64']>>
type Case112 = Expect<Equal<DivideSignedBinary64<T[112]['a_binary64'], T[112]['b_binary64']>['quotient'], T[112]['div_u_binary64']>>

type CaseLength = Expect<Equal<T['length'], 113>>
