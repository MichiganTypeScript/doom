(module
  (func $f0
    ;; stackStartSize = 1
    ;; stack: [0]
    return
    ;; stack: [0]
  )

  (func $entry (export "entry") (result i32)
    ;; stackStartSize = 0
    ;; stack: []
    (i32.const 0)
    ;; stack: [0]
    (call $f0)
    ;; stack: [0]
  )
)