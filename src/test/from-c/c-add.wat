(module
  (type $t0 (func (result i32)))
  (type $t1 (func))
  (type $t2 (func (param i32 i32) (result i32)))
  (type $t3 (func (param i32)))
  (type $t4 (func (param i32) (result i32)))
  (func $__wasm_call_ctors (type $t1)
    (call $emscripten_stack_init))
  (func $entry (export "entry") (type $t2) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32)
    (local.set $l2
      (global.get $__stack_pointer))
    (local.set $l3
      (i32.const 16))
    (local.set $l4
      (i32.sub
        (local.get $l2)
        (local.get $l3)))
    (i32.store offset=12
      (local.get $l4)
      (local.get $p0))
    (i32.store offset=8
      (local.get $l4)
      (local.get $p1))
    (local.set $l5
      (i32.load offset=12
        (local.get $l4)))
    (local.set $l6
      (i32.load offset=8
        (local.get $l4)))
    (local.set $l7
      (i32.add
        (local.get $l5)
        (local.get $l6)))
    (return
      (local.get $l7)))
  (func $_initialize (export "_initialize") (type $t1)
    (block $B0
      (br_if $B0
        (i32.eqz
          (i32.const 1)))
      (call $__wasm_call_ctors)))
  (func $stackSave (export "stackSave") (type $t0) (result i32)
    (global.get $__stack_pointer))
  (func $stackRestore (export "stackRestore") (type $t3) (param $p0 i32)
    (global.set $__stack_pointer
      (local.get $p0)))
  (func $stackAlloc (export "stackAlloc") (type $t4) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    (global.set $__stack_pointer
      (local.tee $l1
        (i32.and
          (i32.sub
            (global.get $__stack_pointer)
            (local.get $p0))
          (i32.const -16))))
    (local.get $l1))
  (func $emscripten_stack_init (export "emscripten_stack_init") (type $t1)
    (global.set $__stack_base
      (i32.const 5243920))
    (global.set $__stack_end
      (i32.and
        (i32.add
          (i32.const 1028)
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
    (i32.const 1024))
  (table $__indirect_function_table (export "__indirect_function_table") 2 2 funcref)
  (memory $memory (export "memory") 256 256)
  (global $__stack_pointer (mut i32) (i32.const 5243920))
  (global $__stack_end (mut i32) (i32.const 0))
  (global $__stack_base (mut i32) (i32.const 0))
  (elem $e0 (i32.const 1) func $__wasm_call_ctors))
