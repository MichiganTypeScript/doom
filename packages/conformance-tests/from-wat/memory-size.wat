(module
  (memory $memory (export "memory") 42)

  (func $foo (result i32)
    memory.size
  )

  (func $entry (export "entry") (result i32)
    call $foo
  )
)
