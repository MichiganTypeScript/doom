(module
  ;; Declare a function that takes an i32 and returns an i32.
  ;; This function returns 1 if the input is 0, and 0 otherwise.
  (func $isZero (param $x i32) (result i32)
    (local.get $x)     ;; Push the value of x onto the stack
    i32.eqz            ;; Check if x is equal to zero
  )

  (func $entry (export "entry") (param $a i32) (result i32)
    (call $isZero (local.get $a))
  )
)