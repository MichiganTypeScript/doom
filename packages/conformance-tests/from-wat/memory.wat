(module
  ;; Declare a memory of 1 page (64KiB)
  (memory $memory (export "memory") 1)

  ;; Function to store an i32 value at a specific index
  (func $storeValue (param $index i32) (param $value i32)
    ;; Calculate the byte offset (assuming 4 bytes per i32)
    local.get $index
    i32.const 4
    i32.mul

    ;; Get the value to store
    local.get $value

    ;; Store the value in memory
    i32.store
  )

  ;; Function to load an i32 value from a specific index
  (func $loadValue (param $index i32) (result i32)
    ;; Calculate the byte offset (assuming 4 bytes per i32)
    local.get $index
    i32.const 4
    i32.mul

    ;; Load the value from memory
    i32.load
  )

  (func $foo (param $a i32) (result i32)
    ;; Index to store/load the value
    (i32.const 2)

    ;; Value to store
    (local.get $a)

    ;; Call $storeValue with the index and value
    (call $storeValue)

    ;; Index to load the value from
    (i32.const 2)

    ;; Call $loadValue with the index
    (call $loadValue)

    ;; Add 1 to the loaded value just to make sure everything's working as intended
    (i32.const 1)
    (i32.add)
  )

  (func $entry (export "entry") (param $value i32) (result i32)
    (call $foo (local.get $value))
  )
)
