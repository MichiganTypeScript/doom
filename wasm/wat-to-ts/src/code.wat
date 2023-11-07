(module
  (func $add (export "add") (param $a i32) (param $b i32) (result i32)
    (i32.add (local.get $a) (local.get $b))
  )

  (global $program (export "program") i32 (i32.const 1) (i32.const 2) (call $add))
)
