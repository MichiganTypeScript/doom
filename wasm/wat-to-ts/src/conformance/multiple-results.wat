(module
  ;; Define a function that takes an i64 and an i32
  ;; Returns an i64 (double the i64) and an i32 (square of the i32)
  (func $compute (param $a i64) (param $b i32) (result i64 i32)
    ;; Double the i64 parameter
    local.get $a
    local.get $a
    i64.add

    ;; Square the i32 parameter
    local.get $b
    local.get $b
    i32.mul
  )

  ;; Export the function
  (export "compute" (func $compute))
)
