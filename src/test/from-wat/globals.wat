(module
  (global $myGlobal (mut i32) (i32.const 0))

  (func $setGlobal
    (i32.const 42)
    (global.set $myGlobal)
  )

  (func $getGlobal (result i32)
    (global.get $myGlobal)
  )

  (func $entry (export "entry") (result i32)
    (call $setGlobal)
    (call $getGlobal)
  )
)