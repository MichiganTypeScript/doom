export const floatToBinary = (input: number, bits: 32 | 64) => {
  const is32 = bits === 32;
  
  const buffer = new ArrayBuffer(bits / 8);

  let floatView = new (is32 ? Float32Array : Float64Array)(buffer);
  floatView[0] = input;

  const intView = new (is32 ? Uint32Array : BigUint64Array)(buffer);
  return intView[0].toString(2).padStart(bits, '0');
}

export const numberToTwosComplement = (decimal: number) => {
  const inRange = decimal >> 0;
  if (inRange >= 0) {
    return inRange.toString(2).padStart(32, '0')
  }
  return (inRange >>> 0).toString(2).padStart(32, '1');
}

export const twosComplementToNumber = (binary: string) => {
  return +`0b${binary}` >> 0;
}

export const bigIntToTwosComplement = (decimal: bigint) => {
  if (decimal >= 0n) {
    const padded = decimal.toString(2).padStart(64, '0');
    // make sure it only has 64 bits
    return padded.slice(-64);
  }

  if (decimal === 0n) {
    return '0'.repeat(64);
  }

  // Start at the LSB and work up. Copy 64 up to and including the
  // first 1 bit then invert the remaining
  let invert = false;
  return (-decimal).toString(2).split('').reverse().map(bit => {
    if(invert) return bit === '0' ? '1' : '0';
    if(bit === '0') return bit;
    invert = true;
    return bit;
  }).reverse().join('').padStart(64, '1').slice(-64);
};

export const twosComplementToBigInt = (binary: string) => {
  if (binary[0] === '0') {
    return BigInt(`0b${binary}`);
  }

  if (binary == '1') {
    return 1n
  } else if (binary == '0') {
    return 0n
  }

  let invert = false;
  return -BigInt(`0b${binary.split('').reverse().map(bit => {
    if(invert) return bit === '0' ? '1' : '0';
    if(bit === '0') return bit;
    invert = true;
    return bit;
  }).reverse().join('')}`);
}

export const clampTo64Bits = (input: bigint): bigint => {
  const tc = bigIntToTwosComplement(input);
  const clamped = tc.slice(-64);
  return twosComplementToBigInt(clamped);
}

export const compare = {
  gts: (a: number, b: number) => a > b ? 1 : 0,
  gtu: (a: number, b: number) => ((a >>> 0) > (b >>> 0)) ? 1 : 0,
  ges: (a: number, b: number) => a >= b ? 1 : 0,
  geu: (a: number, b: number) => ((a >>> 0) >= (b >>> 0)) ? 1 : 0,
  lts: (a: number, b: number) => a < b ? 1 : 0,
  ltu: (a: number, b: number) => ((a >>> 0) < (b >>> 0)) ? 1 : 0,
  les: (a: number, b: number) => a <= b ? 1 : 0,
  leu: (a: number, b: number) => ((a >>> 0) <= (b >>> 0)) ? 1 : 0,
   eq: (a: number, b: number) => a === b ? 1 : 0,
  eqz: (a: number) => a === 0 ? 1 : 0,
}

export const bitwise = {
    and: (a: number, b: number) => a & b,
     or: (a: number, b: number) => a | b,
    xor: (a: number, b: number) => a ^ b,
    not: (a: number) => ~a,
    shl: (a: number, b: number) => a << b,
  shr_s: (a: number, b: number) => a >> b,
  shr_u: (a: number, b: number) => a >>> b,
}

export const arithmetic = {
   add: (a: number, b: number) => (a + b) >> 0,
   sub: (a: number, b: number) => (a - b) >> 0,
   mul: (a: number, b: number) => (a * b) >> 0,
  divs: (a: number, b: number) => b === 0 ? 0 : Math.floor(a / b) >> 0,
  divu: (a: number, b: number) => b === 0 ? 0 : Math.floor((a >>> 0) / (b >>> 0)) >> 0,
  rems: (a: number, b: number) => b === 0 ? 0 : (a % b) >> 0,
  remu: (a: number, b: number) => b === 0 ? 0 : ((a >>> 0) % (b >>> 0)) >> 0,
   clz: (a: number) => a === 0 ? 32 : Math.clz32(a),
}

export const unsignedBigint = (x: bigint) => x < 0 ? x + (2n ** 64n) : x;

export const compareBigInt = {
  gts: (a: bigint, b: bigint) => a > b ? 1n : 0n,
  gtu: (a: bigint, b: bigint) => unsignedBigint(a) > unsignedBigint(b) ? 1n : 0n,
  ges: (a: bigint, b: bigint) => a >= b ? 1n : 0n,
  geu: (a: bigint, b: bigint) => unsignedBigint(a) >= unsignedBigint(b) ? 1n : 0n,
  lts: (a: bigint, b: bigint) => a < b ? 1n : 0n,
  ltu: (a: bigint, b: bigint) => unsignedBigint(a) < unsignedBigint(b) ? 1n : 0n,
  les: (a: bigint, b: bigint) => a <= b ? 1n : 0n,
  leu: (a: bigint, b: bigint) => unsignedBigint(a) <= unsignedBigint(b) ? 1n : 0n,
   eq: (a: bigint, b: bigint) => a === b ? 1n : 0n,
  eqz: (a: bigint) => a === 0n ? 1n : 0n,
}

const bigintShiftRightUnsigned = (a: bigint, b: bigint) => {
  if (b === 0n) {
    return a;
  }
  const aTwos = bigIntToTwosComplement(a);
  const shifted = aTwos.slice(0, -Number(b)).padStart(64, '0').slice(-64);
  const result = twosComplementToBigInt(shifted);
  return result;
}

export const bitwiseBigInt = {
    and: (a: bigint, b: bigint) => a & b,
     or: (a: bigint, b: bigint) => a | b,
    xor: (a: bigint, b: bigint) => a ^ b,
    not: (a: bigint) => ~a,
    shl: (a: bigint, b: bigint) => clampTo64Bits(a << b),
  shr_s: (a: bigint, b: bigint) => clampTo64Bits(a >> b),
  shr_u: (a: bigint, b: bigint) => bigintShiftRightUnsigned(a, b),
}

export const arithmeticBigInt = {
   add: (a: bigint, b: bigint) => clampTo64Bits(a + b),
   sub: (a: bigint, b: bigint) => a - b,
   mul: (a: bigint, b: bigint) => clampTo64Bits(a * b),
  divs: (a: bigint, b: bigint) => b === 0n ? 0n : clampTo64Bits(a / b),
  divu: (a: bigint, b: bigint) => b === 0n ? 0n : clampTo64Bits(unsignedBigint(a) / unsignedBigint(b)),
  rems: (a: bigint, b: bigint) => b === 0n ? 0n : clampTo64Bits(a % b),
  remu: (a: bigint, b: bigint) => b === 0n ? 0n : clampTo64Bits(unsignedBigint(a) % unsignedBigint(b)),
   clz: (a: bigint) => BigInt(bigIntToTwosComplement(a).match(/^0*/)?.[0].length || 0),
}

export const wasmConversion = {
  extend_i32_u: (a: number) => twosComplementToBigInt(`${'0'.repeat(32)}${numberToTwosComplement(a)}`),
  extend_i32_s: (a: number) => {
    const aTwos = numberToTwosComplement(a);
    return twosComplementToBigInt(`${aTwos[0].repeat(32)}${aTwos}`)
  },
}
