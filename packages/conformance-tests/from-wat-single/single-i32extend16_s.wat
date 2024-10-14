(module
  (func $entry (export "entry") (param $a i32) (result i32)
    local.get $a
    i32.extend16_s
  )
)