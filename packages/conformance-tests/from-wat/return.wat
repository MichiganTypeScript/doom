(module
  (func $return (result i32)
    i32.const 0
    i32.const 1
    i32.const 2
    i32.const 3
    i32.const 4
    return
  )

  (func $entry (export "entry") (result i32)
    (call $return)
  )
)