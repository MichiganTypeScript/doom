(module
  (type $t0 (func (param i32 i32) (result i32)))

  (func $add (type $t0) (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )

  (func $multiply (type $t0) (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.mul
  )

  ;; Declare a table of type funcref with three slots (because the offset takes one up).
  (table $T0 3 3 funcref)

  ;; Populate the table with the $add function at index 0 and $multiply at index 1.
  (elem $e0 (i32.const 1) func $add $multiply)

  ;; entry(a, b) = (a + b) + (a * b)
  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.const 1
    call_indirect $T0 (type $t0)

    local.get $a
    local.get $b
    i32.const 2
    call_indirect $T0 (type $t0)

    i32.add
  )
)
