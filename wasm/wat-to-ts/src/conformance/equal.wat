(module
  (func $main (export "equal")  (param $a i32) (param $b i32)
    local.get $a
    local.get $b
    i32.eq
  )
)