(module
  (func $entry (export "entry") (param $a i64) (result i64)
    local.get $a
    i64.clz
  )
)