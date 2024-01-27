(module
  (func $my_loop (param $input i32) (result i32)
    (local $i i32)
    (local $result i32)

    ;; initialize $i to 0
    (local.set $i (i32.const 0))
    (local.set $result (local.get $input))

    (loop $my_loop
      ;; add one to $i
      local.get $i
      i32.const 1
      i32.add
      local.set $i

      ;; multiply $result by 2
      local.get $result
      i32.const 2
      i32.mul
      local.set $result

      ;; if $i is less than 3 branch to outside the loop
      local.get $i
      i32.const 3
      i32.lt_s
      br_if $my_loop
    )

    local.get $result
  )

  (func $entry (export "entry") (param $a i32) (result i32)
    (call $my_loop (local.get $a))
  )
)