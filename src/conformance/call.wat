(module
  (func $get42 (result i32)
    i32.const 42
  )

  (func $get42Plus1 (result i32)
    call $get42
    i32.const 1
    i32.add
  )

  (func $entry (export "entry") (result i32)
    (call $get42Plus1)
  )
)