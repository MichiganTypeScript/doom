(module
  (func $theOmniscient (export "ziltoid") (result i32)
    i32.const 10 ;; load 10 onto the stack
    i32.const 3  ;; load 3 onto the stack
    i32.sub      ;; subtract one number from the other
  )
)