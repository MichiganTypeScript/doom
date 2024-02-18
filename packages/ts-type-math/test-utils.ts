export const floatToBinary = (input: number, bits: 32 | 64) => {
  const is32 = bits === 32;
  
  const buffer = new ArrayBuffer(bits / 8);

  let floatView = new (is32 ? Float32Array : Float64Array)(buffer);
  floatView[0] = input;

  const intView = new (is32 ? Uint32Array : BigUint64Array)(buffer);
  return intView[0].toString(2).padStart(bits, '0');
}

export const numberToTwosComplementBinary = (decimal: number) => {
  if (decimal >= 0) {
    return decimal.toString(2).padStart(32, '0')
  }
  return (decimal >>> 0).toString(2).padStart(32, '1');
}

export const binaryTwosComplementToNumber = (binary: string) => {
  return +`0b${binary}` >> 0;
}