// type HexDigit = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | 'a' | 'b' | 'c' | 'd' | 'e' | 'f';
// type HexNumber = string;

// type NumberToTupleBase<
//   T extends string,
//   R extends any[] = []
// > =
//   `${T}` extends `${number}`
//   ? `${T}` extends `${R['length']}`
//     ? R
//     : NumberToTupleBase<T, [...R, 1]>
//   : []

// type Expand10<
//   T extends any[]
// > = [
//   ...T, // 0
//   ...T, // 1
//   ...T, // 2
//   ...T, // 3
//   ...T, // 4
//   ...T, // 5
//   ...T, // 6
//   ...T, // 7
//   ...T, // 8
//   ...T, // 9
// ]

// type NumberToTuple<
//   S extends HexNumber,
//   Res extends any[] = [],
// > =
//   S extends `${infer L}${infer R}`
//   ? NumberToTuple<
//       R,
//       [
//         ...Expand10<Res>,
//         ...NumberToTupleBase<L>
//       ]
//     >
//   : Res

// type Remaind16<T extends any[]> = Satisfies<{ number: string, carry: string },
//   //         0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
//   T extends [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, ...infer R]
//   ? {
//     number: `${R['length']}`,
//     carry: "1"
//   }
//   : {
//     number: `${T['length']}`,
//     carry: ""
//   }
// >

// type DigitAdd<
//   A extends HexNumber,
//   B extends HexNumber,
//   carry extends any[] = []
// > =
//   Remaind16<[
//     ...NumberToTuple<A>,
//     ...NumberToTuple<B>,
//     ...carry
//   ]>

// type StrAdd<
//   A extends string,
//   B extends string,
//   carry extends any[] = []
// > =
//   A extends `${infer A_Digit}${infer A_Remaining}`

//   ? // A has a digit
//     B extends `${infer B_Digit}${infer B_Remaining}`

//     ? // A and B both have a digit
//       `${
//         DigitAdd<
//           A_Digit,
//           B_Digit,
//           carry
//         >['number']
//       }${
//         StrAdd<
//           A_Remaining,
//           B_Remaining,
//           DigitAdd<
//             A_Digit,
//             B_Digit,
//             carry
//           >['carry']
//         >
//       }`

//     : // A has a digit, but B does not
//       `${
//         DigitAdd<
//           A_Digit,
//           "0",
//           carry
//         >['number']
//       }${
//         StrAdd<
//           A_Remaining,
//           '0',
//           DigitAdd<
//             A_Digit,
//             "0",
//             carry
//           >['carry']
//         >
//       }`

//   : // A does not have a digit
//     B extends `${infer B_Digit}${infer B_Remaining}`
//     ? // A does not have a digit, but B does
//       `${
//         DigitAdd<
//           "0",
//           B_Digit,
//           carry
//         >['number']
//       }${
//         StrAdd<
//           '',
//           B_Remaining,
//           DigitAdd<
//             '',
//             B_Digit,
//             carry
//           >['carry']
//         >
//       }`
//     : // A and B do not have a digit
//       carry extends "1"
//       ? // there was a carry
//         '1'
//       : // there was no carry, base case of recursion
//         ''

// export type HexAdd<
//   A extends HexNumber,
//   B extends HexNumber
// > =
//   Reverse<
//     StrAdd<
//       Reverse<`${A}`>,
//       Reverse<`${B}`>
//     >
//   >

// type x = HexAdd<'2', '1'> // =>

// type Reverse<
//   T extends string
// > =
//   T extends `${infer L}${infer R}`
//   ? `${Reverse<R>}${L}`
//   : ''
