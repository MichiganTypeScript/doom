(module
  (func $drop (export "dop") (param $first_arg i32) (param $second_arg i32) (result i32)
    local.get $first_arg
    local.get $second_arg
    drop
  )

  (func $entry (export "entry") (param $first_arg i32) (param $second_arg i32) (result i32)
    local.get $second_arg
    local.get $first_arg
    call $drop
  )
)