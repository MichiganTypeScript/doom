(module
  (func $entry (export "entry") (param $a i64) (result i32)
    local.get $a
    i64.eqz
  )
)