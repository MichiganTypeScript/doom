import { writeFileSync } from "fs";
import {
  arithmetic,
  numberToTwosComplement,
  bigIntToTwosComplement,
  twosComplementToBigInt,
  twosComplementToNumber,
  arithmeticBigInt,
  bitwise,
  bitwiseBigInt,
  wasmConversion,
  memory,
} from "../ts-type-math/test-utils";
// import { t } from "../ts-type-math/test-cases/wrap";
// import { t } from "../ts-type-math/test-cases/arithmetic";

// const randomlyNegative = Math.random() > 0.5 ? 1 : -1;
// const randBetween = (max: number) => Math.floor(Math.random() * max);
// const randomPower = (max: number) => 2 ** randBetween(max);
// const array = (length: number) =>
//   Array.from({ length }, () => 0).map((_, index) => index);

// const randomNumber = () =>
//   Math.ceil(Math.random() * randomPower(32)) * randomlyNegative;

// // ARITHMETIC

// const nonRandom = [
//   [0, 0],
//   [0, 1],
//   [1, 0],
//   [1, 1],
//   [2, 0],
//   [3, 0],
//   [4, 0],
//   [5, 0],
//   [6, 0],
//   [7, 0],
//   [8, 0],
//   [9, 0],
//   [10, 0],
//   [11, 0],
//   [12, 0],
//   [13, 0],
//   [14, 0],
//   [15, 0],
//   [2, 1],
//   [3, 1],
//   [4, 1],
//   [5, 1],
//   [6, 1],
//   [7, 1],
//   [8, 1],
//   [9, 1],
//   [10, 1],
//   [11, 1],
//   [12, 1],
//   [13, 1],
//   [14, 1],
//   [15, 1],
//   [4248100, 83719208],
//   [-1706847184, 286967],
//   [1286748865, -1454381721],
//   [27571, -1147741429],
//   [-1373912411, 1184069],
//   [-1087120816, 502903308],
//   [2087, -132834491],
//   [264031922, 314526],
//   [3519102, 43361],
//   [-2052050758, 825643342],
//   [635102, 353965],
//   [255156151, -1895159168],
//   [-1396653413, 51592],
//   [-627086151, 2879],
//   [-1242858790, 167813448],
//   [-1958401347, 590058663],
// ];

// const result = t
//   .map(({ a, b }) => ({
//     a: a >> 0,
//     b: b >> 0,
//     add: arithmetic.add(a, b),
//     sub: arithmetic.sub(a, b),
//     mul: arithmetic.mul(a, b),
//     divs: arithmetic.divs(a, b),
//     divu: arithmetic.divu(a, b),
//     rems: arithmetic.rems(a, b),
//     remu: arithmetic.remu(a, b),
//   }))
//   .map(({ a, b, add, sub, mul, divs, divu, rems, remu }) => ({
//     a,
//     b,
//     add,
//     sub,
//     mul,
//     divs,
//     divu,
//     rems,
//     remu,
//     a_binary: numberToTwosComplement(a),
//     b_binary: numberToTwosComplement(b),
//     add_binary: numberToTwosComplement(add),
//     sub_binary: numberToTwosComplement(sub),
//     mul_binary: numberToTwosComplement(mul),
//     divs_binary: numberToTwosComplement(divs),
//     divu_binary: numberToTwosComplement(divu),
//     rems_binary: numberToTwosComplement(rems),
//     remu_binary: numberToTwosComplement(remu),
//   }));

// console.log(numberToTwosComplement(0 / 0))

// const stringifiedResult = JSON.stringify(result, null, 2);
// console.log(stringifiedResult);
// writeFileSync('./packages/playground/generated.json', stringifiedResult)

/*
00000000000000000000010000000000

type m = {
    "00000000010100000000010000001111": "01100001";
    "00000000000000000000010000000000": "00000000";
    "00000000000000000000010000000001": "00000000";
}
*/

// console.log(array(32).map(i => `\${infer b${i+1}}`).reverse().join(""))

// console.log(array(8).map(i => numberToTwosComplement(i+1024)).join("\n"))

// const bigints = [-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1n,-1167088121787636991n,-2147483647n,-4294443008n,-4294966976n,-4611686018427387904n,-4611967493404098560n,-9218868437227405313n,-9223090561878065152n,-9223090561878065152n,-9223090561878065152n,-9223372034707292161n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,-9223372036854775808n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,0n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,1n,10n,10n,10n,10n,10n,1000000000n,1000000000n,1000000000n,1000000000n,1000000001n,11n,1152921504606846975n,1152921504606846975n,1167088121787636990n,131072n,134284554n,13927n,140737488355328n,140737488355328n,140737488355328n,140737488355328n,140737488355328n,140737488355328n,15n,15n,15n,15n,15n,16n,16n,16777216n,16777216n,16777216n,16777216n,16777216n,16777216n,17179869184n,17179869184n,17592186048512n,1844674407370955162n,2n,2147483648n,2147483648n,214748364800n,2251799813685247n,2251799813685247n,2251799813685248n,2251799813685248n,25n,25n,25n,25n,25n,255n,255n,2686976n,28n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710655n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281474976710656n,281479284785472n,29n,3n,3n,3n,3n,3n,3n,3n,3n,30064771136n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32n,32088147345014784n,32088147345014784n,3285377520n,33554431n,33554431n,4n,4n,4n,4n,4n,4n,4294934528n,4294967294n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,4294967295n,42949672959n,4294967296n,4294967296n,4294967296n,4294967297n,4294967297n,4294967297n,4294967297n,4295098368n,4323455642275676160n,4323737117252386816n,4503599627370496n,4503599627370496n,45097156608150n,450971566183n,4575657221408423936n,4575938696385134592n,4577627546245398528n,4602678819172646912n,4610278643543834624n,4611123068473966592n,4611123068473966592n,4611123068473966592n,4611404543450677248n,4611404543450677248n,4611404543450677248n,4611686018427387905n,4619810130798575616n,4643211215818981376n,4643211215818981376n,4645181540655955968n,4645181540655955968n,4647433340469641215n,4647433340469641216n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,48n,489626271842n,4899634919602388991n,4899634919602388992n,49n,49n,49n,5n,52n,52n,562949953421311n,576460752303423488n,576460752303423488n,576460752303423489n,576460752303423489n,60n,60n,60n,60n,60n,61n,61n,61n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,63n,65536n,7n,7n,7n,773094113280n,8n,8432131802713292800n,858993459520n,8589934792n,8589934792n,8590065664n,9n,9214364837600034815n,9218868437227405312n,9218868437227405312n,9218868437227405312n,9218868437227405312n,9221120237041090560n,9222809086901354496n,9222809086901354496n,9223090561878065151n,9223090561878065151n,9223090561878065151n,9223090561878065151n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223090561878065152n,9223231299366420480n,9223231299366420480n,9223231299366420480n,9223231299366420480n,9223231299366420480n,9223231299366420480n,9223231299366420480n,9223372032559808515n,9223372034707292160n,92233720368547758n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,9223372036854775807n,];

const stringifyBigint = (_: any, v: any) => typeof v === 'bigint' ? v.toString()+"n" : v;

// console.log(
//   JSON.stringify(
//     Array.from(new Set(bigints))
//       .sort(() => Math.random() - 0.5)
//       .reduce((acc, x) => {
//         if (acc.a === null) {
//           return {
//             ...acc,
//             a: x,
//           }
//         } else if (acc.b === null) {
//           return {
//             ...acc,
//             b: x,
//           }
//         } else {
//           return {
//             values: acc.values.concat({ a: acc.a, b: acc.b }),
//             a: null,
//             b: null,
//           }
//         }
//       }, {
//         values: [] as { a: bigint, b: bigint }[],
//         a: null as bigint | null,
//         b: null as bigint | null
//       }).values,
//       stringifyBigint,
//       2,
//   )
// );

// import { t as t64 } from "../ts-type-math/test-cases/arithmetic-i64"
// import { t as t32 } from "../ts-type-math/test-cases/arithmetic"


// console.log(JSON.stringify(
//   t32
//   .map(({ a, b }) => ({ a: BigInt(a), b: BigInt(b) }))
//   .concat(t64.map(({ a, b }) => ({ a, b })))
//   .map(({ a, b }) => ({
//     a,
//     b,
//     add: bigintArithmetic.add(a, b),
//     sub: bigintArithmetic.sub(a, b),
//     mul: bigintArithmetic.mul(a, b),
//     divs: bigintArithmetic.divs(a, b),
//     divu: bigintArithmetic.divu(a, b),
//     rems: bigintArithmetic.rems(a, b),
//     remu: bigintArithmetic.remu(a, b),
//   }))
//   .map(({ a, b, add, sub, mul, divs, divu, rems, remu }) => ({
//     a,
//     b,
//     add,
//     sub,
//     mul,
//     divs,
//     divu,
//     rems,
//     remu,
//     a_binary64: bigintToTwosComplement(a),
//     b_binary64: bigintToTwosComplement(b),
//     add_binary64: bigintToTwosComplement(add),
//     sub_binary64: bigintToTwosComplement(sub),
//     mul_binary64: bigintToTwosComplement(mul),
//     divs_binary64: bigintToTwosComplement(divs),
//     divu_binary64: bigintToTwosComplement(divu),
//     rems_binary64: bigintToTwosComplement(rems),
//     remu_binary64: bigintToTwosComplement(remu),
//   })
// ), stringifyBigint, 2))

// import { generate } from '../ts-type-math/wasm-t

// import { t } from '../ts-type-math/test-cases/arithmetic'
// const file = JSON.stringify(
//   t.map(({
//     a,
//     b,
//     add,
//     sub,
//     mul,
//     div_s,
//     div_u,
//     rem_s,
//     rem_u,
//     a_binary,
//     b_binary,
//     add_binary,
//     sub_binary,
//     mul_binary,
//     div_s_binary,
//     div_u_binary,
//     rem_s_binary,
//     rem_u_binary,
//   }) => {
//     const clz = arithmetic.clz(a);

//     return {
//       a,
//       b,
//       add,
//       sub,
//       mul,
//       div_s,
//       div_u,
//       rem_s,
//       rem_u,
//       clz,
//       a_binary,
//       b_binary,
//       add_binary,
//       sub_binary,
//       mul_binary,
//       div_s_binary,
//       div_u_binary,
//       rem_s_binary,
//       rem_u_binary,
//       clz_binary: numberToTwosComplement(clz),
//     }
//   }),
//   stringifyBigint,
//   2
// );
// writeFileSync('./packages/ts-type-math/test-cases/arithmetic.ts', file)

// const a = -9223372036854775806n
// const b = 1n

// console.log(
//   bitwiseBigInt.shr_u(a, b),
// )

// console.log(Array.from(Array(65))
//   .map((_ ,index) => index)
//   .map(index => (
//     `  ${index}: '${'0'.repeat(index)}';`
//   ))
//   .join("\n")
// );

// console.log(Array.from(Array(65))
//   .map((_ ,index) => index)
//   .map(index => (
//     `    /* 2**${index} */ ${2n**BigInt(index)}n,`
//   ))
//   .join("\n")
// );

const t = [
  '00000000000000000000000000000000',
  '11111111111111111111111111111111',
  '10000000010000000010000000010000',
  '01000000001000000001000000001000',
  '00100000000100000000100000000100',
  '00010000000010000000010000000010',
  '00001000000001000000001000000001',
  '00000100000000100000000100000000',
  '00000010000000010000000010000000',
  '00000001000000001000000001000000',
  '00000000100000000100000000100000',
]

console.log(JSON.stringify(t.map((a_binary) => {
  const load_binary = memory.load(a_binary);
  const load8_s_binary = memory.load8_s(a_binary);
  const load8_u_binary = memory.load8_u(a_binary);
  const load16_s_binary = memory.load16_s(a_binary);
  const load16_u_binary = memory.load16_u(a_binary);

  const store_binary = memory.store(a_binary);
  const store8_binary = memory.store8(a_binary);
  const store16_binary = memory.store16(a_binary);
  
  return {
    a: twosComplementToNumber(a_binary),
    load: twosComplementToNumber(load_binary),
    load8_s: twosComplementToNumber(load8_s_binary),
    load8_u: twosComplementToNumber(load8_u_binary),
    load16_s: twosComplementToNumber(load16_s_binary),
    load16_u: twosComplementToNumber(load16_u_binary),
    store: twosComplementToNumber(store_binary),
    store8: twosComplementToNumber(store8_binary),
    store16: twosComplementToNumber(store16_binary),
    a_binary,
    load_binary,
    load8_s_binary,
    load8_u_binary,
    load16_s_binary,
    load16_u_binary,
    store_binary,
    store8_binary,
    store16_binary,
  }
}), stringifyBigint, 2));
