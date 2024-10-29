(module
  (func $test (param $a i32) (param $b i32) (param $c i32) (result i32)
    local.get $a
    i32.const 1
    i32.add
  )

  (func $entry (export "entry") (result i32 i32)
    i32.const 8 ;; this value will be untouched
    
    i32.const 16 ;; this will populate $a
    i32.const 32 ;; this will populate $b
    i32.const 64 ;; this will populate $c
    call $test ;; this will return $a + 1
  )
)