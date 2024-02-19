(module
  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    local.get $a ;; load $a onto the stack
    local.get $b ;; load $b onto the stack
    i32.sub      ;; subtract $b from $a (i.e. `$a-$b`)
  )
)