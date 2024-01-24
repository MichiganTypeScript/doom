```ts

const $if = ($n: number, $control: number) => {
  $n + (
    $control >= 0 ? 1 : -2
  )
}

const entry = ($a: number, $b: number) => {
  return $if($a, $b)
}

```