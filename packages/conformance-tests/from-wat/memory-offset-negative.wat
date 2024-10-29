(module
  (memory $memory (export "memory") 1)

  (func $entry (export "entry") (param $value i32) (result i32)
    i32.const -1
    local.get $value
    i32.store offset=20

    i32.const -1
    i32.load offset=20
  )
)
