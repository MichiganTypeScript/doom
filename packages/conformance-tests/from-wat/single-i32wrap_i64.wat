(module
  (func $entry (export "entry") (param $a i64) (result i32)
    (i32.wrap_i64 (local.get $a))
  )
)