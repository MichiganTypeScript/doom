(module
  (func $and (param $a i32) (param $b i32) (result i32)
    (i32.and (local.get $a) (local.get $b))
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (call $and (local.get $a) (local.get $b))
  )
)
