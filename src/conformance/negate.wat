(module
  (func $negate (result f64)
    f64.const 10 ;; load a number onto the stack
    f64.neg ;; negate the values
  )

  (func $entry (export "entry") (result f64)
    (call $negate)
  )
)
