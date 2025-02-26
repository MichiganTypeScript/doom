import { ProgramState } from "../../../wasm-to-typescript-types/types"
import { DoomPaletteToAscii } from "./palette";

type I32PlusOne<
  Val extends string,
  Suffix extends string = ''
> =
  Val extends `${infer Val1}1` | `${infer Val0}0`
  ? Val0 extends `${any}`
    ? `${Val0}1${Suffix}`
    : I32PlusOne<Val1, `0${Suffix}`>
  : `1${Suffix}`;

type I32Plus<
  A extends string,
  B extends string,
  Carry extends string = '0',
  Suffix extends string = ''
> =
  `${Carry}${A}+${B}` extends
    | `1${infer A111}1+${infer B111}1`
    | `0${infer A110}1+${infer B110}1`
    | `1${infer A110}1+${infer B110}0`
    | `1${infer A110}0+${infer B110}1`
    | `0${infer A100}1+${infer B100}0`
    | `0${infer A100}0+${infer B100}1`
    | `1${infer A100}0+${infer B100}0`
    | `0${infer A000}0+${infer B000}0`
  ? A000 extends `${any}`
    ? I32Plus<A000, B000, '0', `0${Suffix}`>
    : A100 extends `${any}`
      ? I32Plus<A100, B100, '0', `1${Suffix}`>
      : A110 extends `${any}`
        ? I32Plus<A110, B110, '1', `0${Suffix}`>
        : I32Plus<A111, B111, '1', `1${Suffix}`>
  : `${A}${B}${Suffix}`;

type _GenerateLine<
  memory extends ProgramState["memory"],
  address extends string,

  /** there's no one like teamchong. */
  count extends string = '11111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111',
  line extends string = '',
> =
  count extends `1${infer S}`

  ? // look up the value in memory
    memory[address] extends infer value
    ? _GenerateLine<
        memory,
        I32PlusOne<address>,
        S,
        `${line}${value extends keyof DoomPaletteToAscii ? DoomPaletteToAscii[value] : "  "}`
      >

    : // you fucked up. you. fucked. up... yet again.
      `ERROR: memory address ${address} not found`
  : // the base case of recursion
    line

export type MeetYourDoom<
  state extends ProgramState,
  memory extends ProgramState["memory"] = state['memory'],
  address extends string = state['stack'][0],
> = {
  "0001": _GenerateLine<memory, I32Plus<address, '00000000000000000000000000000000'>>, //   0 offset (line 0)
  "0002": _GenerateLine<memory, I32Plus<address, '00000000000000000000000101000000'>>, // 320 offset (line 1)
  "0003": _GenerateLine<memory, I32Plus<address, '00000000000000000000001010000000'>>, // 640 offset (line 2)
  "0004": _GenerateLine<memory, I32Plus<address, '00000000000000000000001111000000'>>, // 960 offset (line 3)
  "0005": _GenerateLine<memory, I32Plus<address, '00000000000000000000010100000000'>>, // ...etc
  "0006": _GenerateLine<memory, I32Plus<address, '00000000000000000000011001000000'>>,
  "0007": _GenerateLine<memory, I32Plus<address, '00000000000000000000011110000000'>>,
  "0008": _GenerateLine<memory, I32Plus<address, '00000000000000000000100011000000'>>,
  "0009": _GenerateLine<memory, I32Plus<address, '00000000000000000000101000000000'>>,
  "0010": _GenerateLine<memory, I32Plus<address, '00000000000000000000101101000000'>>,
  "0011": _GenerateLine<memory, I32Plus<address, '00000000000000000000110010000000'>>,
  "0012": _GenerateLine<memory, I32Plus<address, '00000000000000000000110111000000'>>,
  "0013": _GenerateLine<memory, I32Plus<address, '00000000000000000000111100000000'>>,
  "0014": _GenerateLine<memory, I32Plus<address, '00000000000000000001000001000000'>>,
  "0015": _GenerateLine<memory, I32Plus<address, '00000000000000000001000110000000'>>,
  "0016": _GenerateLine<memory, I32Plus<address, '00000000000000000001001011000000'>>,
  "0017": _GenerateLine<memory, I32Plus<address, '00000000000000000001010000000000'>>,
  "0018": _GenerateLine<memory, I32Plus<address, '00000000000000000001010101000000'>>,
  "0019": _GenerateLine<memory, I32Plus<address, '00000000000000000001011010000000'>>,
  "0020": _GenerateLine<memory, I32Plus<address, '00000000000000000001011111000000'>>,
  "0021": _GenerateLine<memory, I32Plus<address, '00000000000000000001100100000000'>>,
  "0022": _GenerateLine<memory, I32Plus<address, '00000000000000000001101001000000'>>,
  "0023": _GenerateLine<memory, I32Plus<address, '00000000000000000001101110000000'>>,
  "0024": _GenerateLine<memory, I32Plus<address, '00000000000000000001110011000000'>>,
  "0025": _GenerateLine<memory, I32Plus<address, '00000000000000000001111000000000'>>,
  "0026": _GenerateLine<memory, I32Plus<address, '00000000000000000001111101000000'>>,
  "0027": _GenerateLine<memory, I32Plus<address, '00000000000000000010000010000000'>>,
  "0028": _GenerateLine<memory, I32Plus<address, '00000000000000000010000111000000'>>,
  "0029": _GenerateLine<memory, I32Plus<address, '00000000000000000010001100000000'>>,
  "0030": _GenerateLine<memory, I32Plus<address, '00000000000000000010010001000000'>>,
  "0031": _GenerateLine<memory, I32Plus<address, '00000000000000000010010110000000'>>,
  "0032": _GenerateLine<memory, I32Plus<address, '00000000000000000010011011000000'>>,
  "0033": _GenerateLine<memory, I32Plus<address, '00000000000000000010100000000000'>>,
  "0034": _GenerateLine<memory, I32Plus<address, '00000000000000000010100101000000'>>,
  "0035": _GenerateLine<memory, I32Plus<address, '00000000000000000010101010000000'>>,
  "0036": _GenerateLine<memory, I32Plus<address, '00000000000000000010101111000000'>>,
  "0037": _GenerateLine<memory, I32Plus<address, '00000000000000000010110100000000'>>,
  "0038": _GenerateLine<memory, I32Plus<address, '00000000000000000010111001000000'>>,
  "0039": _GenerateLine<memory, I32Plus<address, '00000000000000000010111110000000'>>,
  "0040": _GenerateLine<memory, I32Plus<address, '00000000000000000011000011000000'>>,
  "0041": _GenerateLine<memory, I32Plus<address, '00000000000000000011001000000000'>>,
  "0042": _GenerateLine<memory, I32Plus<address, '00000000000000000011001101000000'>>,
  "0043": _GenerateLine<memory, I32Plus<address, '00000000000000000011010010000000'>>,
  "0044": _GenerateLine<memory, I32Plus<address, '00000000000000000011010111000000'>>,
  "0045": _GenerateLine<memory, I32Plus<address, '00000000000000000011011100000000'>>,
  "0046": _GenerateLine<memory, I32Plus<address, '00000000000000000011100001000000'>>,
  "0047": _GenerateLine<memory, I32Plus<address, '00000000000000000011100110000000'>>,
  "0048": _GenerateLine<memory, I32Plus<address, '00000000000000000011101011000000'>>,
  "0049": _GenerateLine<memory, I32Plus<address, '00000000000000000011110000000000'>>,
  "0050": _GenerateLine<memory, I32Plus<address, '00000000000000000011110101000000'>>,
  "0051": _GenerateLine<memory, I32Plus<address, '00000000000000000011111010000000'>>,
  "0052": _GenerateLine<memory, I32Plus<address, '00000000000000000011111111000000'>>,
  "0053": _GenerateLine<memory, I32Plus<address, '00000000000000000100000100000000'>>,
  "0054": _GenerateLine<memory, I32Plus<address, '00000000000000000100001001000000'>>,
  "0055": _GenerateLine<memory, I32Plus<address, '00000000000000000100001110000000'>>,
  "0056": _GenerateLine<memory, I32Plus<address, '00000000000000000100010011000000'>>,
  "0057": _GenerateLine<memory, I32Plus<address, '00000000000000000100011000000000'>>,
  "0058": _GenerateLine<memory, I32Plus<address, '00000000000000000100011101000000'>>,
  "0059": _GenerateLine<memory, I32Plus<address, '00000000000000000100100010000000'>>,
  "0060": _GenerateLine<memory, I32Plus<address, '00000000000000000100100111000000'>>,
  "0061": _GenerateLine<memory, I32Plus<address, '00000000000000000100101100000000'>>,
  "0062": _GenerateLine<memory, I32Plus<address, '00000000000000000100110001000000'>>,
  "0063": _GenerateLine<memory, I32Plus<address, '00000000000000000100110110000000'>>,
  "0064": _GenerateLine<memory, I32Plus<address, '00000000000000000100111011000000'>>,
  "0065": _GenerateLine<memory, I32Plus<address, '00000000000000000101000000000000'>>,
  "0066": _GenerateLine<memory, I32Plus<address, '00000000000000000101000101000000'>>,
  "0067": _GenerateLine<memory, I32Plus<address, '00000000000000000101001010000000'>>,
  "0068": _GenerateLine<memory, I32Plus<address, '00000000000000000101001111000000'>>,
  "0069": _GenerateLine<memory, I32Plus<address, '00000000000000000101010100000000'>>,
  "0070": _GenerateLine<memory, I32Plus<address, '00000000000000000101011001000000'>>,
  "0071": _GenerateLine<memory, I32Plus<address, '00000000000000000101011110000000'>>,
  "0072": _GenerateLine<memory, I32Plus<address, '00000000000000000101100011000000'>>,
  "0073": _GenerateLine<memory, I32Plus<address, '00000000000000000101101000000000'>>,
  "0074": _GenerateLine<memory, I32Plus<address, '00000000000000000101101101000000'>>,
  "0075": _GenerateLine<memory, I32Plus<address, '00000000000000000101110010000000'>>,
  "0076": _GenerateLine<memory, I32Plus<address, '00000000000000000101110111000000'>>,
  "0077": _GenerateLine<memory, I32Plus<address, '00000000000000000101111100000000'>>,
  "0078": _GenerateLine<memory, I32Plus<address, '00000000000000000110000001000000'>>,
  "0079": _GenerateLine<memory, I32Plus<address, '00000000000000000110000110000000'>>,
  "0080": _GenerateLine<memory, I32Plus<address, '00000000000000000110001011000000'>>,
  "0081": _GenerateLine<memory, I32Plus<address, '00000000000000000110010000000000'>>,
  "0082": _GenerateLine<memory, I32Plus<address, '00000000000000000110010101000000'>>,
  "0083": _GenerateLine<memory, I32Plus<address, '00000000000000000110011010000000'>>,
  "0084": _GenerateLine<memory, I32Plus<address, '00000000000000000110011111000000'>>,
  "0085": _GenerateLine<memory, I32Plus<address, '00000000000000000110100100000000'>>,
  "0086": _GenerateLine<memory, I32Plus<address, '00000000000000000110101001000000'>>,
  "0087": _GenerateLine<memory, I32Plus<address, '00000000000000000110101110000000'>>,
  "0088": _GenerateLine<memory, I32Plus<address, '00000000000000000110110011000000'>>,
  "0089": _GenerateLine<memory, I32Plus<address, '00000000000000000110111000000000'>>,
  "0090": _GenerateLine<memory, I32Plus<address, '00000000000000000110111101000000'>>,
  "0091": _GenerateLine<memory, I32Plus<address, '00000000000000000111000010000000'>>,
  "0092": _GenerateLine<memory, I32Plus<address, '00000000000000000111000111000000'>>,
  "0093": _GenerateLine<memory, I32Plus<address, '00000000000000000111001100000000'>>,
  "0094": _GenerateLine<memory, I32Plus<address, '00000000000000000111010001000000'>>,
  "0095": _GenerateLine<memory, I32Plus<address, '00000000000000000111010110000000'>>,
  "0096": _GenerateLine<memory, I32Plus<address, '00000000000000000111011011000000'>>,
  "0097": _GenerateLine<memory, I32Plus<address, '00000000000000000111100000000000'>>,
  "0098": _GenerateLine<memory, I32Plus<address, '00000000000000000111100101000000'>>,
  "0099": _GenerateLine<memory, I32Plus<address, '00000000000000000111101010000000'>>,
  "0100": _GenerateLine<memory, I32Plus<address, '00000000000000000111101111000000'>>,
  "0101": _GenerateLine<memory, I32Plus<address, '00000000000000000111110100000000'>>,
  "0102": _GenerateLine<memory, I32Plus<address, '00000000000000000111111001000000'>>,
  "0103": _GenerateLine<memory, I32Plus<address, '00000000000000000111111110000000'>>,
  "0104": _GenerateLine<memory, I32Plus<address, '00000000000000001000000011000000'>>,
  "0105": _GenerateLine<memory, I32Plus<address, '00000000000000001000001000000000'>>,
  "0106": _GenerateLine<memory, I32Plus<address, '00000000000000001000001101000000'>>,
  "0107": _GenerateLine<memory, I32Plus<address, '00000000000000001000010010000000'>>,
  "0108": _GenerateLine<memory, I32Plus<address, '00000000000000001000010111000000'>>,
  "0109": _GenerateLine<memory, I32Plus<address, '00000000000000001000011100000000'>>,
  "0110": _GenerateLine<memory, I32Plus<address, '00000000000000001000100001000000'>>,
  "0111": _GenerateLine<memory, I32Plus<address, '00000000000000001000100110000000'>>,
  "0112": _GenerateLine<memory, I32Plus<address, '00000000000000001000101011000000'>>,
  "0113": _GenerateLine<memory, I32Plus<address, '00000000000000001000110000000000'>>,
  "0114": _GenerateLine<memory, I32Plus<address, '00000000000000001000110101000000'>>,
  "0115": _GenerateLine<memory, I32Plus<address, '00000000000000001000111010000000'>>,
  "0116": _GenerateLine<memory, I32Plus<address, '00000000000000001000111111000000'>>,
  "0117": _GenerateLine<memory, I32Plus<address, '00000000000000001001000100000000'>>,
  "0118": _GenerateLine<memory, I32Plus<address, '00000000000000001001001001000000'>>,
  "0119": _GenerateLine<memory, I32Plus<address, '00000000000000001001001110000000'>>,
  "0120": _GenerateLine<memory, I32Plus<address, '00000000000000001001010011000000'>>,
  "0121": _GenerateLine<memory, I32Plus<address, '00000000000000001001011000000000'>>,
  "0122": _GenerateLine<memory, I32Plus<address, '00000000000000001001011101000000'>>,
  "0123": _GenerateLine<memory, I32Plus<address, '00000000000000001001100010000000'>>,
  "0124": _GenerateLine<memory, I32Plus<address, '00000000000000001001100111000000'>>,
  "0125": _GenerateLine<memory, I32Plus<address, '00000000000000001001101100000000'>>,
  "0126": _GenerateLine<memory, I32Plus<address, '00000000000000001001110001000000'>>,
  "0127": _GenerateLine<memory, I32Plus<address, '00000000000000001001110110000000'>>,
  "0128": _GenerateLine<memory, I32Plus<address, '00000000000000001001111011000000'>>,
  "0129": _GenerateLine<memory, I32Plus<address, '00000000000000001010000000000000'>>,
  "0130": _GenerateLine<memory, I32Plus<address, '00000000000000001010000101000000'>>,
  "0131": _GenerateLine<memory, I32Plus<address, '00000000000000001010001010000000'>>,
  "0132": _GenerateLine<memory, I32Plus<address, '00000000000000001010001111000000'>>,
  "0133": _GenerateLine<memory, I32Plus<address, '00000000000000001010010100000000'>>,
  "0134": _GenerateLine<memory, I32Plus<address, '00000000000000001010011001000000'>>,
  "0135": _GenerateLine<memory, I32Plus<address, '00000000000000001010011110000000'>>,
  "0136": _GenerateLine<memory, I32Plus<address, '00000000000000001010100011000000'>>,
  "0137": _GenerateLine<memory, I32Plus<address, '00000000000000001010101000000000'>>,
  "0138": _GenerateLine<memory, I32Plus<address, '00000000000000001010101101000000'>>,
  "0139": _GenerateLine<memory, I32Plus<address, '00000000000000001010110010000000'>>,
  "0140": _GenerateLine<memory, I32Plus<address, '00000000000000001010110111000000'>>,
  "0141": _GenerateLine<memory, I32Plus<address, '00000000000000001010111100000000'>>,
  "0142": _GenerateLine<memory, I32Plus<address, '00000000000000001011000001000000'>>,
  "0143": _GenerateLine<memory, I32Plus<address, '00000000000000001011000110000000'>>,
  "0144": _GenerateLine<memory, I32Plus<address, '00000000000000001011001011000000'>>,
  "0145": _GenerateLine<memory, I32Plus<address, '00000000000000001011010000000000'>>,
  "0146": _GenerateLine<memory, I32Plus<address, '00000000000000001011010101000000'>>,
  "0147": _GenerateLine<memory, I32Plus<address, '00000000000000001011011010000000'>>,
  "0148": _GenerateLine<memory, I32Plus<address, '00000000000000001011011111000000'>>,
  "0149": _GenerateLine<memory, I32Plus<address, '00000000000000001011100100000000'>>,
  "0150": _GenerateLine<memory, I32Plus<address, '00000000000000001011101001000000'>>,
  "0151": _GenerateLine<memory, I32Plus<address, '00000000000000001011101110000000'>>,
  "0152": _GenerateLine<memory, I32Plus<address, '00000000000000001011110011000000'>>,
  "0153": _GenerateLine<memory, I32Plus<address, '00000000000000001011111000000000'>>,
  "0154": _GenerateLine<memory, I32Plus<address, '00000000000000001011111101000000'>>,
  "0155": _GenerateLine<memory, I32Plus<address, '00000000000000001100000010000000'>>,
  "0156": _GenerateLine<memory, I32Plus<address, '00000000000000001100000111000000'>>,
  "0157": _GenerateLine<memory, I32Plus<address, '00000000000000001100001100000000'>>,
  "0158": _GenerateLine<memory, I32Plus<address, '00000000000000001100010001000000'>>,
  "0159": _GenerateLine<memory, I32Plus<address, '00000000000000001100010110000000'>>,
  "0160": _GenerateLine<memory, I32Plus<address, '00000000000000001100011011000000'>>,
  "0161": _GenerateLine<memory, I32Plus<address, '00000000000000001100100000000000'>>,
  "0162": _GenerateLine<memory, I32Plus<address, '00000000000000001100100101000000'>>,
  "0163": _GenerateLine<memory, I32Plus<address, '00000000000000001100101010000000'>>,
  "0164": _GenerateLine<memory, I32Plus<address, '00000000000000001100101111000000'>>,
  "0165": _GenerateLine<memory, I32Plus<address, '00000000000000001100110100000000'>>,
  "0166": _GenerateLine<memory, I32Plus<address, '00000000000000001100111001000000'>>,
  "0167": _GenerateLine<memory, I32Plus<address, '00000000000000001100111110000000'>>,
  "0168": _GenerateLine<memory, I32Plus<address, '00000000000000001101000011000000'>>,
  "0169": _GenerateLine<memory, I32Plus<address, '00000000000000001101001000000000'>>,
  "0170": _GenerateLine<memory, I32Plus<address, '00000000000000001101001101000000'>>,
  "0171": _GenerateLine<memory, I32Plus<address, '00000000000000001101010010000000'>>,
  "0172": _GenerateLine<memory, I32Plus<address, '00000000000000001101010111000000'>>,
  "0173": _GenerateLine<memory, I32Plus<address, '00000000000000001101011100000000'>>,
  "0174": _GenerateLine<memory, I32Plus<address, '00000000000000001101100001000000'>>,
  "0175": _GenerateLine<memory, I32Plus<address, '00000000000000001101100110000000'>>,
  "0176": _GenerateLine<memory, I32Plus<address, '00000000000000001101101011000000'>>,
  "0177": _GenerateLine<memory, I32Plus<address, '00000000000000001101110000000000'>>,
  "0178": _GenerateLine<memory, I32Plus<address, '00000000000000001101110101000000'>>,
  "0179": _GenerateLine<memory, I32Plus<address, '00000000000000001101111010000000'>>,
  "0180": _GenerateLine<memory, I32Plus<address, '00000000000000001101111111000000'>>,
  "0181": _GenerateLine<memory, I32Plus<address, '00000000000000001110000100000000'>>,
  "0182": _GenerateLine<memory, I32Plus<address, '00000000000000001110001001000000'>>,
  "0183": _GenerateLine<memory, I32Plus<address, '00000000000000001110001110000000'>>,
  "0184": _GenerateLine<memory, I32Plus<address, '00000000000000001110010011000000'>>,
  "0185": _GenerateLine<memory, I32Plus<address, '00000000000000001110011000000000'>>,
  "0186": _GenerateLine<memory, I32Plus<address, '00000000000000001110011101000000'>>,
  "0187": _GenerateLine<memory, I32Plus<address, '00000000000000001110100010000000'>>,
  "0188": _GenerateLine<memory, I32Plus<address, '00000000000000001110100111000000'>>,
  "0189": _GenerateLine<memory, I32Plus<address, '00000000000000001110101100000000'>>,
  "0190": _GenerateLine<memory, I32Plus<address, '00000000000000001110110001000000'>>,
  "0191": _GenerateLine<memory, I32Plus<address, '00000000000000001110110110000000'>>,
  "0192": _GenerateLine<memory, I32Plus<address, '00000000000000001110111011000000'>>,
  "0193": _GenerateLine<memory, I32Plus<address, '00000000000000001111000000000000'>>,
  "0194": _GenerateLine<memory, I32Plus<address, '00000000000000001111000101000000'>>,
  "0195": _GenerateLine<memory, I32Plus<address, '00000000000000001111001010000000'>>,
  "0196": _GenerateLine<memory, I32Plus<address, '00000000000000001111001111000000'>>,
  "0197": _GenerateLine<memory, I32Plus<address, '00000000000000001111010100000000'>>,
  "0198": _GenerateLine<memory, I32Plus<address, '00000000000000001111011001000000'>>,
  "0199": _GenerateLine<memory, I32Plus<address, '00000000000000001111011110000000'>>,
  "0200": _GenerateLine<memory, I32Plus<address, '00000000000000001111100011000000'>>,
};
