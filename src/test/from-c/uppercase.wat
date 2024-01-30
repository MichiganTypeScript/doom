(module
  (type $t0 (func (result i32)))
  (type $t1 (func (param i32) (result i32)))
  (type $t2 (func))
  (type $t3 (func (param i32)))
  (func $__wasm_call_ctors (type $t2)
    (call $emscripten_stack_init))
  (func $uppercase (export "uppercase") (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32)
    (local.set $l1
      (global.get $__stack_pointer))
    (local.set $l2
      (i32.const 16))
    (local.set $l3
      (i32.sub
        (local.get $l1)
        (local.get $l2)))
    (global.set $__stack_pointer
      (local.get $l3))
    (i32.store8 offset=15
      (local.get $l3)
      (local.get $p0))
    (local.set $l4
      (i32.load8_u offset=15
        (local.get $l3)))
    (local.set $l5
      (i32.const 24))
    (local.set $l6
      (i32.shl
        (local.get $l4)
        (local.get $l5)))
    (local.set $l7
      (i32.shr_s
        (local.get $l6)
        (local.get $l5)))
    (local.set $l8
      (call $toupper
        (local.get $l7)))
    (local.set $l9
      (i32.const 0))
    (i32.store8 offset=1024
      (local.get $l9)
      (local.get $l8))
    (local.set $l10
      (i32.const 0))
    (local.set $l11
      (i32.const 0))
    (i32.store8 offset=1025
      (local.get $l11)
      (local.get $l10))
    (local.set $l12
      (i32.const 1024))
    (local.set $l13
      (i32.const 16))
    (local.set $l14
      (i32.add
        (local.get $l3)
        (local.get $l13)))
    (global.set $__stack_pointer
      (local.get $l14))
    (return
      (local.get $l12)))
  (func $_initialize (export "_initialize") (type $t2)
    (block $B0
      (br_if $B0
        (i32.eqz
          (i32.const 1)))
      (call $__wasm_call_ctors)))
  (func $islower (type $t1) (param $p0 i32) (result i32)
    (i32.lt_u
      (i32.add
        (local.get $p0)
        (i32.const -97))
      (i32.const 26)))
  (func $toupper (type $t1) (param $p0 i32) (result i32)
    (select
      (i32.and
        (local.get $p0)
        (i32.const 95))
      (local.get $p0)
      (call $islower
        (local.get $p0))))
  (func $stackSave (export "stackSave") (type $t0) (result i32)
    (global.get $__stack_pointer))
  (func $stackRestore (export "stackRestore") (type $t3) (param $p0 i32)
    (global.set $__stack_pointer
      (local.get $p0)))
  (func $stackAlloc (export "stackAlloc") (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    (global.set $__stack_pointer
      (local.tee $l1
        (i32.and
          (i32.sub
            (global.get $__stack_pointer)
            (local.get $p0))
          (i32.const -16))))
    (local.get $l1))
  (func $emscripten_stack_init (export "emscripten_stack_init") (type $t2)
    (global.set $__stack_base
      (i32.const 5243920))
    (global.set $__stack_end
      (i32.and
        (i32.add
          (i32.const 1032)
          (i32.const 15))
        (i32.const -16))))
  (func $emscripten_stack_get_free (export "emscripten_stack_get_free") (type $t0) (result i32)
    (i32.sub
      (global.get $__stack_pointer)
      (global.get $__stack_end)))
  (func $emscripten_stack_get_base (export "emscripten_stack_get_base") (type $t0) (result i32)
    (global.get $__stack_base))
  (func $emscripten_stack_get_end (export "emscripten_stack_get_end") (type $t0) (result i32)
    (global.get $__stack_end))
  (func $__errno_location (export "__errno_location") (type $t0) (result i32)
    (i32.const 1028))
  (table $__indirect_function_table (export "__indirect_function_table") 2 2 funcref)
  (memory $memory (export "memory") 256 256)
  (global $__stack_pointer (mut i32) (i32.const 5243920))
  (global $__stack_end (mut i32) (i32.const 0))
  (global $__stack_base (mut i32) (i32.const 0))
  (elem $e0 (i32.const 1) func $__wasm_call_ctors))
