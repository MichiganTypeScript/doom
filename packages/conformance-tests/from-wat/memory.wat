(module
  ;; Declare a memory of 1 page (64KiB)
  (memory $memory (export "memory") 1)

  (func $entry (export "entry") (param $value i32) (result i32)
    i32.const 0 ;; index to store the value
    local.get $value
    i32.store

    i32.const 0 ;; index to load the value from
    i32.load
  )
)
