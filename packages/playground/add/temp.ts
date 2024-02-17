type Counter = 1[];

type Reverse<
  T extends string
> =
  T extends `${infer L}${infer R}`
  ? `${Reverse<R>}${L}`
  : ''

/**
 * A lookup table to convert a digit to a counter
 * It's possible to do this recursively with comparable performance but it takes up recursions, which this is optimized to also keep to a minimum
 */
type CountersByDigit = {
  '0': [],
  '1': [1],
  '2': [1, 1],
  '3': [1, 1, 1],
  '4': [1, 1, 1, 1],
  '5': [1, 1, 1, 1, 1],
  '6': [1, 1, 1, 1, 1, 1],
  '7': [1, 1, 1, 1, 1, 1, 1],
  '8': [1, 1, 1, 1, 1, 1, 1, 1],
  '9': [1, 1, 1, 1, 1, 1, 1, 1, 1],
  'a': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'b': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'c': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'd': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'e': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  'f': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
}

type DigitToCounter2<T extends string> =
  T extends keyof CountersByDigit
  ? CountersByDigit[T]
  : never


type DigitToCounter<T extends string> =
  T extends '0' ? [] :
  T extends '1' ? [1] :
  T extends '2' ? [1, 1] :
  T extends '3' ? [1, 1, 1] :
  T extends '4' ? [1, 1, 1, 1] :
  T extends '5' ? [1, 1, 1, 1, 1] :
  T extends '6' ? [1, 1, 1, 1, 1, 1] :
  T extends '7' ? [1, 1, 1, 1, 1, 1, 1] :
  T extends '8' ? [1, 1, 1, 1, 1, 1, 1, 1] :
  T extends '9' ? [1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'a' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'b' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'c' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'd' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'e' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  // T extends 'f' ? [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1] :
  never

type Calculation = {
  digit: string,
  carry: Counter,
}

//                 0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
type TenCounter = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

type NumToDigit<T extends number> =
  T extends 0 ? '0' :
  T extends 1 ? '1' :
  T extends 2 ? '2' :
  T extends 3 ? '3' :
  T extends 4 ? '4' :
  T extends 5 ? '5' :
  T extends 6 ? '6' :
  T extends 7 ? '7' :
  T extends 8 ? '8' :
  T extends 9 ? '9' :
  // T extends 10 ? 'a' :
  // T extends 11 ? 'b' :
  // T extends 12 ? 'c' :
  // T extends 13 ? 'd' :
  // T extends 14 ? 'e' :
  // T extends 15 ? 'f' :
  never

/** this creates a Calculation for the addition */
type Calculate<T extends Counter> =
  T extends [...TenCounter, ...infer Remainder]
  ? {
    digit: NumToDigit<Remainder['length']>
    carry: [1]
  }
  : {
    digit: NumToDigit<T['length']>
    carry: []
  }

/** This function's purpose in life is to avoid needing to calculate C twice */
type AppendCalculation<
  A_Remaining extends string,
  B_Remaining extends string,
  C extends Calculation
> = `${
  C['digit']
}${
  StringAdd<
    A_Remaining,
    B_Remaining,
    C['carry']
  >
}`

type StringAdd<
  A extends string,
  B extends string,
  carry extends Counter
> =
  A extends `${infer A_Digit}${infer A_Remaining}`
  
  ? // A has a digit
    B extends `${infer B_Digit}${infer B_Remaining}`
    ? // A and B both have a digit
      AppendCalculation<
        A_Remaining,
        B_Remaining,
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...DigitToCounter<B_Digit>,
          ...carry,
        ]>
      >

    : // A has a digit, but B does not
      AppendCalculation<
        A_Remaining,
        '', // since we know B is out of digits, we can just pass an empty string
        Calculate<[
          ...DigitToCounter<A_Digit>,
          ...carry
        ]>
      >

    : // A does not have a digit
      B extends `${infer B_Digit}${infer B_Remaining}`

      ? // A does not have a digit, but B does
        AppendCalculation<
          '', // since we know A is out of digits, we can just pass an empty string
          B_Remaining,
          Calculate<[
            ...DigitToCounter<B_Digit>,
            ...carry
          ]>
        >

      : // A and B do not have digits left.  just need to resolve the carry
        carry extends []
        ? // there was no a carry, base case of recursion
          ''
        : // there was a carry, base case of recursion
          '1'

export type Sum<
  A extends string,
  B extends string
> =
  // we reverse the strings so we can add them from right to left
  // there's no simply way in TypeScript to pick a character off the end of a string
  // since we only do this three times (once for A, once for B, and once for the result)
  // it's really not significant performance-wise
  Reverse<
    StringAdd<
      Reverse<A>,
      Reverse<B>,
      []
    >
  >


type x = Sum<'dad', '8ab'> // =>