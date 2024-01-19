(module
  (func $selectTrue (export "selectTrue") (result i32)
    (select
      (i32.const 10) ;; first operand
      (i32.const 20) ;; second operand
      (i32.const 1)  ;; condition (non-zero, so first operand will be selected)
    )
  )

  (func $selectFalse (export "selectFalse") (result i32)
    (select
      (i32.const 10) ;; first operand
      (i32.const 20) ;; second operand
      (i32.const 0)  ;; condition (equal to zero, so the second operand will be selected)
    )
  )
)