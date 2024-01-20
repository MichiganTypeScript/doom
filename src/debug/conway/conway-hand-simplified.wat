(module
  (func $updateGrid (param $p0 i32) (param $p1 i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32)
    (global.set $__stack_pointer
      (local.tee $l11
        (i32.sub
          (global.get $__stack_pointer)
          (i32.const 336))))
    (i32.store
      (local.get $p0)
      (local.tee $l12
        (i32.load
          (local.get $p1))))
    (i32.store offset=4
      (local.get $p0)
      (local.tee $l13
        (i32.load offset=4
          (local.get $p1))))
    (block $B0
      (br_if $B0
        (i32.le_s
          (local.get $l12)
          (i32.const 0)))
      (br_if $B0
        (i32.le_s
          (local.get $l13)
          (i32.const 0)))
      (loop $L1
        (local.set $l7
          (i32.add
            (local.get $l6)
            (i32.const 1)))
        (local.set $l9
          (i32.sub
            (local.get $l6)
            (i32.const 1)))
        (local.set $l3
          (i32.const 0))
        (loop $L2
          (local.set $l2
            (i32.const 0))
          (local.set $l5
            (i32.load offset=4
              (local.tee $l4
                (call $__memcpy
                  (local.get $l11)
                  (local.get $p1)
                  (i32.const 332)))))
          (local.set $l8
            (i32.load
              (local.get $l4)))
          (block $B3
            (br_if $B3
              (i32.eqz
                (local.get $l6)))
            (br_if $B3
              (i32.gt_s
                (local.get $l6)
                (local.get $l8)))
            (block $B4
              (br_if $B4
                (i32.eqz
                  (local.get $l3)))
              (br_if $B4
                (i32.gt_s
                  (local.get $l3)
                  (local.get $l5)))
              (local.set $l2
                (i32.ne
                  (i32.load offset=4
                    (i32.add
                      (i32.add
                        (local.get $l4)
                        (i32.mul
                          (local.get $l9)
                          (i32.const 36)))
                      (i32.shl
                        (local.get $l3)
                        (i32.const 2))))
                  (i32.const 0))))
            (if $I5
              (i32.lt_s
                (local.get $l3)
                (local.get $l5))
              (then
                (local.set $l2
                  (i32.add
                    (local.get $l2)
                    (i32.ne
                      (i32.load offset=8
                        (i32.add
                          (i32.add
                            (local.get $l4)
                            (i32.mul
                              (local.get $l9)
                              (i32.const 36)))
                          (i32.shl
                            (local.get $l3)
                            (i32.const 2))))
                      (i32.const 0))))))
            (br_if $B3
              (i32.ge_s
                (local.tee $l10
                  (i32.add
                    (local.get $l3)
                    (i32.const 1)))
                (local.get $l5)))
            (local.set $l2
              (i32.add
                (local.get $l2)
                (i32.ne
                  (i32.load offset=8
                    (i32.add
                      (i32.add
                        (local.get $l4)
                        (i32.mul
                          (local.get $l9)
                          (i32.const 36)))
                      (i32.shl
                        (local.get $l10)
                        (i32.const 2))))
                  (i32.const 0)))))
          (block $B6
            (br_if $B6
              (i32.ge_s
                (local.get $l6)
                (local.get $l8)))
            (block $B7
              (br_if $B7
                (i32.eqz
                  (local.get $l3)))
              (br_if $B7
                (i32.gt_s
                  (local.get $l3)
                  (local.get $l5)))
              (local.set $l2
                (i32.add
                  (local.get $l2)
                  (i32.ne
                    (i32.load offset=4
                      (i32.add
                        (i32.add
                          (local.get $l4)
                          (i32.mul
                            (local.get $l6)
                            (i32.const 36)))
                        (i32.shl
                          (local.get $l3)
                          (i32.const 2))))
                    (i32.const 0)))))
            (br_if $B6
              (i32.ge_s
                (local.tee $l10
                  (i32.add
                    (local.get $l3)
                    (i32.const 1)))
                (local.get $l5)))
            (local.set $l2
              (i32.add
                (local.get $l2)
                (i32.ne
                  (i32.load offset=8
                    (i32.add
                      (i32.add
                        (local.get $l4)
                        (i32.mul
                          (local.get $l6)
                          (i32.const 36)))
                      (i32.shl
                        (local.get $l10)
                        (i32.const 2))))
                  (i32.const 0)))))
          (block $B8
            (br_if $B8
              (i32.ge_s
                (local.get $l7)
                (local.get $l8)))
            (block $B9
              (br_if $B9
                (i32.eqz
                  (local.get $l3)))
              (br_if $B9
                (i32.gt_s
                  (local.get $l3)
                  (local.get $l5)))
              (local.set $l2
                (i32.add
                  (local.get $l2)
                  (i32.ne
                    (i32.load offset=4
                      (i32.add
                        (i32.add
                          (local.get $l4)
                          (i32.mul
                            (local.get $l7)
                            (i32.const 36)))
                        (i32.shl
                          (local.get $l3)
                          (i32.const 2))))
                    (i32.const 0)))))
            (if $I10
              (i32.lt_s
                (local.get $l3)
                (local.get $l5))
              (then
                (local.set $l2
                  (i32.add
                    (local.get $l2)
                    (i32.ne
                      (i32.load offset=8
                        (i32.add
                          (i32.add
                            (local.get $l4)
                            (i32.mul
                              (local.get $l7)
                              (i32.const 36)))
                          (i32.shl
                            (local.get $l3)
                            (i32.const 2))))
                      (i32.const 0))))))
            (br_if $B8
              (i32.ge_s
                (local.tee $l8
                  (i32.add
                    (local.get $l3)
                    (i32.const 1)))
                (local.get $l5)))
            (local.set $l2
              (i32.add
                (local.get $l2)
                (i32.ne
                  (i32.load offset=8
                    (i32.add
                      (i32.add
                        (local.get $l4)
                        (i32.mul
                          (local.get $l7)
                          (i32.const 36)))
                      (i32.shl
                        (local.get $l8)
                        (i32.const 2))))
                  (i32.const 0)))))
          (i32.store offset=8
            (i32.add
              (local.tee $l4
                (i32.shl
                  (local.get $l3)
                  (i32.const 2)))
              (i32.add
                (local.get $p0)
                (local.tee $l5
                  (i32.mul
                    (local.get $l6)
                    (i32.const 36)))))
            (select
              (i32.eq
                (i32.and
                  (local.get $l2)
                  (i32.const 254))
                (i32.const 2))
              (i32.eq
                (local.get $l2)
                (i32.const 3))
              (i32.load offset=8
                (i32.add
                  (i32.add
                    (local.get $p1)
                    (local.get $l5))
                  (local.get $l4)))))
          (br_if $L2
            (i32.ne
              (local.tee $l3
                (i32.add
                  (local.get $l3)
                  (i32.const 1)))
              (local.get $l13))))
        (br_if $L1
          (i32.ne
            (local.tee $l6
              (local.get $l7))
            (local.get $l12)))))
    (global.set $__stack_pointer
      (i32.add
        (local.get $l11)
        (i32.const 336))))
  (func $conway (export "conway") (param $p0 i32) (param $p1 i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32)
    (global.set $__stack_pointer
      (local.tee $l2
        (i32.sub
          (global.get $__stack_pointer)
          (i32.const 1008))))
    (i64.store align=4
      (local.get $p0)
      (i64.const 38654705673))
    (drop
      (call $memset
        (i32.add
          (local.get $l2)
          (i32.const 672))
        (i32.const 0)
        (i32.const 324)))
    (i32.store offset=868
      (local.get $l2)
      (i32.const 1))
    (i32.store offset=836
      (local.get $l2)
      (i32.const 1))
    (i64.store offset=828 align=4
      (local.get $l2)
      (i64.const 4294967297))
    (i32.store offset=796
      (local.get $l2)
      (i32.const 1))
    (local.set $l4
      (i32.const 9))
    (local.set $l5
      (i32.const 9))
    (loop $L0
      (local.set $l3
        (i32.const 0))
      (if $I1
        (i32.gt_s
          (local.get $l5)
          (i32.const 0))
        (then
          (loop $L2
            (i32.store offset=8
              (i32.add
                (local.tee $l4
                  (i32.shl
                    (local.get $l3)
                    (i32.const 2)))
                (i32.add
                  (local.get $p0)
                  (local.tee $l5
                    (i32.mul
                      (local.get $l6)
                      (i32.const 36)))))
              (i32.load
                (i32.add
                  (i32.add
                    (i32.add
                      (local.get $l2)
                      (i32.const 672))
                    (local.get $l5))
                  (local.get $l4))))
            (br_if $L2
              (i32.lt_s
                (local.tee $l3
                  (i32.add
                    (local.get $l3)
                    (i32.const 1)))
                (local.tee $l5
                  (i32.load offset=4
                    (local.get $p0))))))
          (local.set $l4
            (i32.load
              (local.get $p0)))))
      (br_if $L0
        (i32.lt_s
          (local.tee $l6
            (i32.add
              (local.get $l6)
              (i32.const 1)))
          (local.get $l4))))
    (if $I3
      (i32.gt_s
        (local.get $p1)
        (i32.const 0))
      (then
        (local.set $l3
          (i32.const 0))
        (loop $L4
          (drop
            (call $__memcpy
              (i32.add
                (local.get $l2)
                (i32.const 4))
              (local.get $p0)
              (i32.const 332)))
          (call $updateGrid
            (i32.add
              (local.get $l2)
              (i32.const 336))
            (i32.add
              (local.get $l2)
              (i32.const 4)))
          (drop
            (call $__memcpy
              (local.get $p0)
              (i32.add
                (local.get $l2)
                (i32.const 336))
              (i32.const 332)))
          (br_if $L4
            (i32.ne
              (local.tee $l3
                (i32.add
                  (local.get $l3)
                  (i32.const 1)))
              (local.get $p1))))))
    (global.set $__stack_pointer
      (i32.add
        (local.get $l2)
        (i32.const 1008))))
  (func $__memcpy (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    (local.set $l3
      (i32.add
        (local.get $p0)
        (local.get $p2)))
    (block $B0
      (block $B1
        (block $B2
          (if $I3
            (i32.eqz
              (i32.and
                (i32.xor
                  (local.get $p0)
                  (local.get $p1))
                (i32.const 3)))
            (then
              (br_if $B2
                (i32.eqz
                  (i32.and
                    (local.get $p0)
                    (i32.const 3))))
              (br_if $B2
                (i32.le_s
                  (local.get $p2)
                  (i32.const 0)))
              (local.set $p2
                (local.get $p0))
              (loop $L4
                (i32.store8
                  (local.get $p2)
                  (i32.load8_u
                    (local.get $p1)))
                (local.set $p1
                  (i32.add
                    (local.get $p1)
                    (i32.const 1)))
                (br_if $B1
                  (i32.eqz
                    (i32.and
                      (local.tee $p2
                        (i32.add
                          (local.get $p2)
                          (i32.const 1)))
                      (i32.const 3))))
                (br_if $L4
                  (i32.lt_u
                    (local.get $p2)
                    (local.get $l3))))
              (br $B1)))
          (block $B5
            (br_if $B5
              (i32.lt_u
                (local.get $l3)
                (i32.const 4)))
            (br_if $B5
              (i32.lt_u
                (local.tee $l4
                  (i32.sub
                    (local.get $l3)
                    (i32.const 4)))
                (local.get $p0)))
            (local.set $p2
              (local.get $p0))
            (loop $L6
              (i32.store8
                (local.get $p2)
                (i32.load8_u
                  (local.get $p1)))
              (i32.store8 offset=1
                (local.get $p2)
                (i32.load8_u offset=1
                  (local.get $p1)))
              (i32.store8 offset=2
                (local.get $p2)
                (i32.load8_u offset=2
                  (local.get $p1)))
              (i32.store8 offset=3
                (local.get $p2)
                (i32.load8_u offset=3
                  (local.get $p1)))
              (local.set $p1
                (i32.add
                  (local.get $p1)
                  (i32.const 4)))
              (br_if $L6
                (i32.le_u
                  (local.tee $p2
                    (i32.add
                      (local.get $p2)
                      (i32.const 4)))
                  (local.get $l4))))
            (br $B0))
          (local.set $p2
            (local.get $p0))
          (br $B0))
        (local.set $p2
          (local.get $p0)))
      (block $B7
        (br_if $B7
          (i32.lt_u
            (local.tee $l4
              (i32.and
                (local.get $l3)
                (i32.const -4)))
            (i32.const 64)))
        (br_if $B7
          (i32.gt_u
            (local.get $p2)
            (local.tee $l5
              (i32.add
                (local.get $l4)
                (i32.const -64)))))
        (loop $L8
          (i32.store
            (local.get $p2)
            (i32.load
              (local.get $p1)))
          (i32.store offset=4
            (local.get $p2)
            (i32.load offset=4
              (local.get $p1)))
          (i32.store offset=8
            (local.get $p2)
            (i32.load offset=8
              (local.get $p1)))
          (i32.store offset=12
            (local.get $p2)
            (i32.load offset=12
              (local.get $p1)))
          (i32.store offset=16
            (local.get $p2)
            (i32.load offset=16
              (local.get $p1)))
          (i32.store offset=20
            (local.get $p2)
            (i32.load offset=20
              (local.get $p1)))
          (i32.store offset=24
            (local.get $p2)
            (i32.load offset=24
              (local.get $p1)))
          (i32.store offset=28
            (local.get $p2)
            (i32.load offset=28
              (local.get $p1)))
          (i32.store offset=32
            (local.get $p2)
            (i32.load offset=32
              (local.get $p1)))
          (i32.store offset=36
            (local.get $p2)
            (i32.load offset=36
              (local.get $p1)))
          (i32.store offset=40
            (local.get $p2)
            (i32.load offset=40
              (local.get $p1)))
          (i32.store offset=44
            (local.get $p2)
            (i32.load offset=44
              (local.get $p1)))
          (i32.store offset=48
            (local.get $p2)
            (i32.load offset=48
              (local.get $p1)))
          (i32.store offset=52
            (local.get $p2)
            (i32.load offset=52
              (local.get $p1)))
          (i32.store offset=56
            (local.get $p2)
            (i32.load offset=56
              (local.get $p1)))
          (i32.store offset=60
            (local.get $p2)
            (i32.load offset=60
              (local.get $p1)))
          (local.set $p1
            (i32.sub
              (local.get $p1)
              (i32.const -64)))
          (br_if $L8
            (i32.le_u
              (local.tee $p2
                (i32.sub
                  (local.get $p2)
                  (i32.const -64)))
              (local.get $l5)))))
      (br_if $B0
        (i32.ge_u
          (local.get $p2)
          (local.get $l4)))
      (loop $L9
        (i32.store
          (local.get $p2)
          (i32.load
            (local.get $p1)))
        (local.set $p1
          (i32.add
            (local.get $p1)
            (i32.const 4)))
        (br_if $L9
          (i32.lt_u
            (local.tee $p2
              (i32.add
                (local.get $p2)
                (i32.const 4)))
            (local.get $l4)))))
    (if $I10
      (i32.lt_u
        (local.get $p2)
        (local.get $l3))
      (then
        (loop $L11
          (i32.store8
            (local.get $p2)
            (i32.load8_u
              (local.get $p1)))
          (local.set $p1
            (i32.add
              (local.get $p1)
              (i32.const 1)))
          (br_if $L11
            (i32.ne
              (local.tee $p2
                (i32.add
                  (local.get $p2)
                  (i32.const 1)))
              (local.get $l3))))))
    (local.get $p0))
  (func $memset (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i64) (local $l6 i32)
    (block $B0
      (br_if $B0
        (i32.eqz
          (local.get $p2)))
      (i32.store8
        (local.get $p0)
        (local.get $p1))
      (i32.store8
        (i32.sub
          (local.tee $l3
            (i32.add
              (local.get $p0)
              (local.get $p2)))
          (i32.const 1))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.get $p2)
          (i32.const 3)))
      (i32.store8 offset=2
        (local.get $p0)
        (local.get $p1))
      (i32.store8 offset=1
        (local.get $p0)
        (local.get $p1))
      (i32.store8
        (i32.sub
          (local.get $l3)
          (i32.const 3))
        (local.get $p1))
      (i32.store8
        (i32.sub
          (local.get $l3)
          (i32.const 2))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.get $p2)
          (i32.const 7)))
      (i32.store8 offset=3
        (local.get $p0)
        (local.get $p1))
      (i32.store8
        (i32.sub
          (local.get $l3)
          (i32.const 4))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.get $p2)
          (i32.const 9)))
      (i32.store
        (local.tee $l3
          (i32.add
            (local.get $p0)
            (local.tee $l4
              (i32.and
                (i32.sub
                  (i32.const 0)
                  (local.get $p0))
                (i32.const 3)))))
        (local.tee $p1
          (i32.mul
            (i32.and
              (local.get $p1)
              (i32.const 255))
            (i32.const 16843009))))
      (i32.store
        (i32.sub
          (local.tee $p2
            (i32.add
              (local.get $l3)
              (local.tee $l4
                (i32.and
                  (i32.sub
                    (local.get $p2)
                    (local.get $l4))
                  (i32.const -4)))))
          (i32.const 4))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.get $l4)
          (i32.const 9)))
      (i32.store offset=8
        (local.get $l3)
        (local.get $p1))
      (i32.store offset=4
        (local.get $l3)
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 8))
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 12))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.get $l4)
          (i32.const 25)))
      (i32.store offset=24
        (local.get $l3)
        (local.get $p1))
      (i32.store offset=20
        (local.get $l3)
        (local.get $p1))
      (i32.store offset=16
        (local.get $l3)
        (local.get $p1))
      (i32.store offset=12
        (local.get $l3)
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 16))
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 20))
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 24))
        (local.get $p1))
      (i32.store
        (i32.sub
          (local.get $p2)
          (i32.const 28))
        (local.get $p1))
      (br_if $B0
        (i32.lt_u
          (local.tee $p2
            (i32.sub
              (local.get $l4)
              (local.tee $l6
                (i32.or
                  (i32.and
                    (local.get $l3)
                    (i32.const 4))
                  (i32.const 24)))))
          (i32.const 32)))
      (local.set $l5
        (i64.mul
          (i64.extend_i32_u
            (local.get $p1))
          (i64.const 4294967297)))
      (local.set $p1
        (i32.add
          (local.get $l3)
          (local.get $l6)))
      (loop $L1
        (i64.store offset=24
          (local.get $p1)
          (local.get $l5))
        (i64.store offset=16
          (local.get $p1)
          (local.get $l5))
        (i64.store offset=8
          (local.get $p1)
          (local.get $l5))
        (i64.store
          (local.get $p1)
          (local.get $l5))
        (local.set $p1
          (i32.add
            (local.get $p1)
            (i32.const 32)))
        (br_if $L1
          (i32.gt_u
            (local.tee $p2
              (i32.sub
                (local.get $p2)
                (i32.const 32)))
            (i32.const 31)))))
    (local.get $p0))
  (global $__stack_pointer (mut i32) (i32.const 5243920))
)