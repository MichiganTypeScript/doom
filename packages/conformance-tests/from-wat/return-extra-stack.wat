(module
  (func $f0 (result i32)
  
    ;; stackDepth = 1
    ;; stack: [0]
    i32.const 1
    ;; stack: [0, 1]
    i32.const 2
    ;; stack: [0, 1, 2]
    i32.const 3
    ;; stack: [0, 1, 2, 3]
    i32.const 4
    ;; stack: [0, 1, 2, 3, 4]
    i32.const 5
    ;; stack: [0, 1, 2, 3, 4, 5]
    i32.const 6
    ;; stack: [0, 1, 2, 3, 4, 5, 6]
    i32.const 7
    ;; stack: [0, 1, 2, 3, 4, 5, 6, 7]
    return
    ;; 1. remove the number of elements from the stack that the function returns
    ;; stack: [0, 1, 2, 3, 4, 5, 6]
    ;; tempReturn: [7]

    ;; 2. remove values from the stack until you get it to stackDepth
    ;; stack: [0, 1, 2, 3, 4, 5, 6]
    ;; stack: [0, 1, 2, 3, 4, 5]
    ;; stack: [0, 1, 2, 3, 4]
    ;; stack: [0, 1, 2, 3]
    ;; stack: [0, 1, 2]
    ;; stack: [0, 1]
    ;; stack: [0]

    ;; 3. append the tempReturn to the stack
    ;; stack: [0, 7]
  )
  (func $f1 (result i32 i32)
    ;; stackDepth = 2
    ;; stack: [0, 7]
    i32.const 8
    ;; stack: [0, 7, 8]
    i32.const 9
    ;; stack: [0, 7, 8, 9]
    i32.const 10
    ;; stack: [0, 7, 8, 9, 10]
    return
    ;; 1. remove the number of elements from the stack that the function returns
    ;; stack: [0, 7, 8, 9, 10]
    ;; tempReturn: [10]
    ;; stack: [0, 7, 8, 9]
    ;; tempReturn: [9, 10] // note that 9 is prepended!!
    ;; stack: [0, 7, 8]

    ;; 2. remove values from the stack until you get it to stackDepth
    ;; stack: [0, 7, 8]
    ;; stack: [0, 7]

    ;; 3. append the tempReturn to the stack
    ;; stack: [0, 7, 9, 10]
  )
  (func $f2 (param $a i32) (result i32 i32)
    ;; before calling: stack: [0, 7, 9, 10]
    
    ;; populate params: pop 10 from the stack
    ;; stack: [0, 7, 9]
    ;; stackDepth = 3

    ;; stack: [0, 7, 9]
    i32.const 11
    ;; stack: [0, 7, 9, 11]
    i32.const 12
    ;; stack: [0, 7, 9, 11, 12]
    i32.const 13
    ;; stack: [0, 7, 9, 11, 12, 13]
    return
    ;; 1. remove the number of elements from the stack that the function returns
    ;; stack: [0, 7, 9, 11, 12, 13]
    ;; tempReturn: [12]
    ;; stack: [0, 7, 9, 11, 12]
    ;; tempReturn: [12, 13] // note that 12 is prepended!!
    ;; stack: [0, 7, 9, 11]

    ;; 2. remove values from the stack until you get it to stackDepth
    ;; stack: [0, 7, 9, 11]
    ;; stack: [0, 7, 9]

    ;; 3. append the tempReturn to the stack
    ;; stack: [0, 7, 9, 12, 13]
  )

  (func $entry (export "entry") (result i32 i32 i32)
    ;; stackDepth = 0
    ;; stack: []
    i32.const 0
    ;; stack: [0]
    call $f0
    ;; stack: [0, 7]
    call $f1
    ;; stack: [0, 7, 9, 10]
    call $f2
    ;; stack: [0, 7, 9, 12, 13]
    return
    ;; 1. remove the number of elements from the stack that the function returns
    ;; stack: [0, 7, 9, 12, 13]
    ;; tempReturn: [13]
    ;; stack: [0, 7, 9, 12]
    ;; tempReturn: [12, 13]
    ;; stack: [0, 7, 9]
    ;; tempReturn: [9, 12, 13]
    ;; stack: [0, 7]

    ;; 2. remove values from the stack until you get it to stackDepth
    ;; stack: [0, 7]
    ;; stack: [0]
    ;; stack: []

    ;; 3. append the tempReturn to the stack
    ;; stack: [9, 12, 13]
  )
)