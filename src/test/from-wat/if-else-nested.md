# Motivating Example

```ts
const $if = ($n: number, $control: number) => {
  if ($control === 1) {
    return 101 + $n
  } else if ($control === 2) {
    return 102 + $n
  } else {
    if ($control === 3 || $control === 4) {
      return 134 + $n
    }
  }
  return 105 + $n
}

const entry = ($a: number, $b: number) => {
  return $if($a, $b)
}
```
