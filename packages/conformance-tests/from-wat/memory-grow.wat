(module
  (memory $memory (export "memory") 42)

  (func $entry (export "entry") (result i32 i32 i32)
    memory.size  ;; pushes 42 to the stack
    i32.const 27 ;; we will grow by 27 pages
    memory.grow  ;; grows and pushes 69 to the stack
    memory.size  ;; pushes 69 to the stack
  )
)
