(module
  (func $main (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.ne
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (call $main (local.get $a) (local.get $b))
  )
)