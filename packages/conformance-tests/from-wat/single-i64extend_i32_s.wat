(module
  (func $entry (export "entry") (param $a i32) (result i64)
    local.get $a
    i64.extend_i32_s
  )
)