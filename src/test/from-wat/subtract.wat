(module
  (func $minusOne (param $a i32) (result i32)
    local.get $a ;; load $a onto the stack
    i32.const 1  ;; load 1 onto the stack
    i32.sub      ;; subtract 1 from $a (i.e. `$a-1`)
  )

  (func $entry (export "entry") (param $a i32) (result i32)
    (call $minusOne (local.get $a)) ;; call $minusOne with $a
  )
)