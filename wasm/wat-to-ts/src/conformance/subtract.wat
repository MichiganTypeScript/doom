(module
  (func $theOmniscient

    ;; load `10` and `3` onto the stack
    i32.const 10
    i32.const 3

    i32.sub ;; subtract on number from the other
  )

  (export "ziltoid" (func $theOmniscient))
)