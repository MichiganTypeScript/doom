(module
  (func $entry (export "entry") (param $num i32) (param $by i32) (result i32)
    local.get $num
    local.get $by
    i32.shl
  )
)
