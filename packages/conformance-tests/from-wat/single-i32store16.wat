(module
  (memory $memory (export "memory") 1)

  (func $entry (export "entry") (param $value i32) (result i32)
    i32.const 0
    local.get $value
    i32.store16

    i32.const 0
    i32.load
  )
)
