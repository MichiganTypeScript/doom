(module
  (func $__wasm_call_ctors
    (call $emscripten_stack_init)
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (local $stack_pointer i32)
    (local $stack_size i32)
    (local $this_stack i32)
    (local $stack_a i32)
    (local $stack_b i32)
    (local $result i32)

    ;; set $stack pointer to the $__stack_pointer global variable
    (local.set $stack_pointer
      (global.get $__stack_pointer)
    )

    (local.set $stack_size
      ;; the size (in bytes) allocated on the stack for this function's execution
      (i32.const 16)
    )

    ;; This local is used to calculate a new stack pointer value by subtracting $stack_size from $stack_pointer.
    ;; It effectively moves the stack pointer (BACKWARDS, by the way) to create space for local variables or data.
    (local.set $this_stack
      (i32.sub
        (local.get $stack_pointer)
        (local.get $stack_size)
      )
    )

    ;; store $a on this function's stack space
    (i32.store offset=12
      (local.get $this_stack)
      (local.get $a)
    )

    ;; store $b on this function's stack space
    (i32.store offset=8
      (local.get $this_stack)
      (local.get $b)
    )

    ;; load $a from this function's stack space
    (local.set $stack_a
      (i32.load offset=12
        (local.get $this_stack)
      )
    )

    ;; load $a from this function's stack space
    (local.set $stack_b
      (i32.load offset=8
        (local.get $this_stack)
      )
    )

    ;; store the result of the addition on this function's stack space
    (local.set $result
      ;; add $a and $b
      (i32.add
        (local.get $stack_a)
        (local.get $stack_b)
      )
    )

    ;; return the result of the addition (and delete whatever's left on the function's execution context stack)
    (return
      (local.get $result)
    )
  )

  (func $emscripten_stack_init (export "emscripten_stack_init")
    ;; set the stack pointer to the base of the stack
    (global.set $__stack_base
      (i32.const 5243920)
    )

    (global.set $__stack_end
      ;; the end of the stack is the base + 1024 bytes
      (i32.and

        ;; the base of the stack
        (i32.add
          (i32.const 1028)
          (i32.const 15)
        )
        
        ;; the end of the stack
        (i32.const -16)
      )
    )
  )

  (memory $memory (export "memory") 1 1)

  (global $__stack_pointer (mut i32) (i32.const 5243920))
  (global $__stack_end (mut i32) (i32.const 0))
  (global $__stack_base (mut i32) (i32.const 0))

  ;; these two go together somehow
  (table $__indirect_function_table 2 2 funcref)
  (elem $e0 (i32.const 1) func $__wasm_call_ctors)
)
