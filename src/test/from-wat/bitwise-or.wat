(module
  (func $or (param $a i32) (param $b i32) (result i32)
    (i32.or (local.get $a) (local.get $b))
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (call $or (local.get $a) (local.get $b))
  )
)
