import { writeFileSync } from "fs"
import { arithmetic, numberToTwosComplementBinary } from "../ts-type-math/test-utils"
import { t } from "../ts-type-math/test-cases/arithmetic"


const randomlyNegative = Math.random() > 0.5 ? 1 : -1
const randBetween = (max: number) => Math.floor(Math.random() * max)
const randomPower = (max: number) => 2**randBetween(max)
const array = (length: number) => Array.from({ length }, () => 0).map((_, index) => index)

const randomNumber = () => (
  Math.ceil(
    Math.random()*randomPower(32)
  ) * randomlyNegative
)

// ARITHMETIC

const nonRandom = [
  [0, 0],
  [0, 1],
  [1, 0],
  [1, 1],
  [2, 0],
  [3, 0],
  [4, 0],
  [5, 0],
  [6, 0],
  [7, 0],
  [8, 0],
  [9, 0],
  [10, 0],
  [11, 0],
  [12, 0],
  [13, 0],
  [14, 0],
  [15, 0],
  [2, 1],
  [3, 1],
  [4, 1],
  [5, 1],
  [6, 1],
  [7, 1],
  [8, 1],
  [9, 1],
  [10, 1],
  [11, 1],
  [12, 1],
  [13, 1],
  [14, 1],
  [15, 1],
  [4248100, 83719208],
  [-1706847184, 286967],
  [1286748865, -1454381721],
  [27571, -1147741429],
  [-1373912411, 1184069],
  [-1087120816, 502903308],
  [2087, -132834491],
  [264031922, 314526],
  [3519102, 43361],
  [-2052050758, 825643342],
  [635102, 353965],
  [255156151, -1895159168],
  [-1396653413, 51592],
  [-627086151, 2879],
  [-1242858790, 167813448],
  [-1958401347, 590058663],
]

const result =
  t
  .map(({ a, b }) => ({
    a: a >> 0,
    b: b >> 0,
    add: arithmetic.add(a, b),
    sub: arithmetic.sub(a, b),
    mul: arithmetic.mul(a, b),
    divs: arithmetic.divs(a, b),
    divu: arithmetic.divu(a, b),
    rems: arithmetic.rems(a, b),
    remu: arithmetic.remu(a, b),
  }))
  .map(({ a, b, add, sub, mul, divs, divu, rems, remu }) => ({
    a,
    b,
    add,
    sub,
    mul,
    divs,
    divu,
    rems,
    remu,
    a_binary: numberToTwosComplementBinary(a),
    b_binary: numberToTwosComplementBinary(b),
    add_binary: numberToTwosComplementBinary(add),
    sub_binary: numberToTwosComplementBinary(sub),
    mul_binary: numberToTwosComplementBinary(mul),
    divs_binary: numberToTwosComplementBinary(divs),
    divu_binary: numberToTwosComplementBinary(divu),
    rems_binary: numberToTwosComplementBinary(rems),
    remu_binary: numberToTwosComplementBinary(remu),
  }))

// console.log(numberToTwosComplementBinary(0 / 0))

const stringifiedResult = JSON.stringify(result, null, 2);
console.log(stringifiedResult);
writeFileSync('./packages/playground/generated.json', stringifiedResult)

/*
00000000010100000000010011000000


*/