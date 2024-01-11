(module
  (func $useLocalTee (export "useLocalTee") (param $x i32) (result i32)
    (local $y i32)  ;; declare a local variable $y

    local.get $x    ;; get the value of parameter $x
    local.tee $y    ;; set $y to the value of $x and keep $x on the stack
    i32.add         ;; add $x (still on the stack) to $y (returned by local.tee)

    ;; The function returns the result of x + x (doubling x)
  )
)
