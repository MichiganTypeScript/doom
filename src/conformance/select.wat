(module
  (func $selectTrue (export "selectTrue") (result i32)
    i32.const 10
    i32.const 20
    i32.const 0
    select
  )

    (func $selectFalse (export "selectFalse") (result i32)
    i32.const 10
    i32.const 20
    i32.const 1
    select
  )
)