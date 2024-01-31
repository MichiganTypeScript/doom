(module
  (func $test (param $a i32) (result i32)
    local.get $a
  )

  ;; an example of a function that takes many more parameters than it returns
  ;; this is to test that the stack is properly popped from and pushed to
  (func $entry (export "entry") (param $first i32) (param $second i32) (param $third i32) (result i32)
    local.get $third
    call $test
  )
)