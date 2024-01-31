(module
  (func $xor (param $a i32) (param $b i32) (result i32)
    (i32.xor (local.get $a) (local.get $b))
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (call $xor (local.get $a) (local.get $b))
  )
)
