(module
  (func $main (result i32)
    (local $var i32) ;; create a local variable named $var
    (local.set $var (i32.const 10)) ;; set $var to 10
    local.get $var ;; load $var onto the stack
    i32.const 1
    i32.add
  )

  (func $entry (export "entry") (result i32)
    (call $main)
  )
)