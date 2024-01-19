(module
  (func $main (result f64)
    f64.const 10 ;; load a number onto the stack
    f64.neg ;; negate the values
  )
  (export "main" (func $main))
)
