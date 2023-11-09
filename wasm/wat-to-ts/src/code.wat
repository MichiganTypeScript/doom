(module
  (func $add (export "add") (param i32) (param $b i32) (result i32)
    (i32.add (local.get 0) (local.get $b))
  )

  (global $program (export "program") i32 (i32.const 1) (i32.const 2) (call $add))
)
