(module
  ;; Declare a memory of 1 page (64KiB)
  (memory $memory (export "memory") 1)

  (func $entry (export "entry") (param $value i32) (result i32)
    i32.const 1024            ;; index to store the result for step 4
  
    ;; Step 1: Store the initial value at index 0
    i32.const 1024            ;; index to store the value
    local.get $value          ;; get the parameter value
    i32.store                 ;; store the value in memory

    ;; Step 2: Load the value from index 0
    i32.const 1024            ;; index to load the value from
    i32.load                  ;; load the value

    ;; Step 3: Multiply the loaded value by 3
    i32.const 3               ;; load constant 3
    i32.mul                   ;; multiply the loaded value by 3

    ;; Step 4: Store the result back into memory at index 0
    i32.store                 ;; store the multiplied value in memory

    ;; Step 5: Load the final value from index 0
    i32.const 1024            ;; index to load the final value from
    i32.load                  ;; load the final value

    ;; The final loaded value is automatically returned as the result
  )
)
