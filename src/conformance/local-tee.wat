(module
  
  ;; The function returns the result of x + x (doubling x)
  (func $localTee (param $x i32) (result i32)
    (local $y i32)  ;; declare a local variable $y

    local.get $x    ;; get the value of parameter $x
    local.tee $y    ;; set $y to the value of $x and keep $x on the stack

    local.get $y    ;; get the value of the local $y

    i32.add         ;; add $x (still on the stack) to $y (returned by local.tee)
  )

  (func $entry (export "entry") (param $a i32) (result i32)
    (call $localTee (local.get $a))
  )
)
