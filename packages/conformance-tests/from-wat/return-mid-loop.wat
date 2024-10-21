(module
  (memory $memory (export "memory") 7)
  (func $f5 (param $p0 i32) (param $p1 i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32)
    (loop $L0
      (local.set $l3
        (i32.add
          (local.get $p0)
          (local.get $l2)))
      (block $B1
        (if $I2
          (i32.ne
            (local.get $l2)
            (i32.const 8))
          (then
            (br_if $B1
              (local.tee $l4
                (i32.load8_u
                  (i32.add
                    (local.get $p1)
                    (local.get $l2)))))))
        (local.set $p0
          (i32.sub
            (i32.const 8)
            (local.get $l2)))
        (local.set $l2
          (i32.const 0))
        (loop $L3
          (if $I4
            (i32.ne
              (local.get $p0)
              (local.get $l2))
            (then
              (i32.store8
                (i32.add
                  (local.get $l2)
                  (local.get $l3))
                (i32.const 0))
              (local.set $l2
                (i32.add
                  (local.get $l2)
                  (i32.const 1)))
              (br $L3))))
        (return))
      (i32.store8
        (local.get $l3)
        (local.get $l4))
      (local.set $l2
        (i32.add
          (local.get $l2)
          (i32.const 1)))
      (br $L0))
    (unreachable))

  (func $entry (export "entry") (param $a i32) (param $b i32) (result i32)
    ;; initialize memory
    (i32.store8 (i32.const 60552) (i32.const 80))
    (i32.store8 (i32.const 393736) (i32.const 80))
    
    local.get $a
    local.get $b
    call $f5
    i32.const 10
  )
)