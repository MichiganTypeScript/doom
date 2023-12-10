(func $foo (param $x i32) (result i32)
  (local $result i32)
  (block $outer_block
    (block $middle_block
      (block $inner_block
        ;; x == 0
        local.get $x
        i32.eqz
        br_if $inner_block

        ;; x == 1
        local.get $x
        i32.const 1
        i32.eq
        br_if $middle_block

        ;; the `else` case
        i32.const 7
        local.set $result
        br $outer_block
      )
      i32.const 42
      local.set $result
      br $outer_block
    )
    i32.const 99
    local.set $result
  )
  local.get $result
)
