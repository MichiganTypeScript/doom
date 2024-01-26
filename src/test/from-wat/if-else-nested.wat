(module
  (func $example (param $n i32) (param $control i32) (result i32)

    ;; if ($control === 1)
    local.get $control
    i32.const 1
    i32.eq
    (if (result i32)
      (then
        i32.const 101
        local.get $n
        i32.add
      )

      ;; else if ($control === 2)
      (else
        local.get $control
        i32.const 2
        i32.eq
        (if (result i32)
          (then
            i32.const 102
            local.get $n
            i32.sub
          )

          ;; else
          (else
            ;; if ($control >= 3)
            local.get $control
            i32.const 3
            i32.ge_s
            (if (result i32)
              (then
                ;; if ($control > 5)
                local.get $control
                i32.const 5
                i32.gt_s
                (if (result i32)
                  (then
                    i32.const 103
                    local.get $n
                    i32.mul
                  )
                  ;; else
                  (else
                    i32.const 104
                    local.get $n
                    i32.add
                  )
                )
              )

              ;; else
              (else
                i32.const 105
                local.get $n
                i32.add
              )
            )
          )
        )
      )
    )
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    (call $example (local.get $a) (local.get $b))
  )
)
