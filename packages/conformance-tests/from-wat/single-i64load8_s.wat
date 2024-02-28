(module
  (memory $memory (export "memory") 1)

  (func $entry (export "entry") (param $value i64) (result i64)
    i32.const 0
    local.get $value
    i64.store

    i32.const 0
    i64.load8_s
  )
)
