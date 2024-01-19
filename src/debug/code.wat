(module
  (type $t0 (func (param i32)))
  (type $t1 (func))
  (type $t2 (func (result i32)))
  (type $t3 (func (param i32) (result i32)))
  (type $t4 (func (param i32 i32) (result i32)))
  (func $__wasi_proc_exit (import "wasi_snapshot_preview1" "proc_exit") (type $t0) (param i32))
  (func $__wasm_call_ctors (type $t1)
    (nop))
  (func $add (export "add") (type $t4) (param $p0 i32) (param $p1 i32) (result i32)
    (i32.add
      (local.get $p0)
      (local.get $p1)))
  (func $andarist (export "andarist") (type $t3) (param $p0 i32) (result i32)
    (i32.add
      (i32.add
        (local.get $p0)
        (select
          (i32.const 12)
          (i32.const 10)
          (i32.gt_s
            (local.get $p0)
            (i32.const -5))))
      (i32.const 7)))
  (func $__original_main (type $t2) (result i32)
    (i32.const 0))
  (func $_start (export "_start") (type $t1)
    (call $__wasm_call_ctors)
    (call $exit
      (call $__original_main))
    (unreachable))
  (func $dummy (type $t1)
    (nop))
  (func $libc_exit_fini (type $t1)
    (call $dummy))
  (func $exit (type $t0) (param $p0 i32)
    (call $dummy)
    (call $libc_exit_fini)
    (call $dummy)
    (call $_Exit
      (local.get $p0))
    (unreachable))
  (func $_Exit (type $t0) (param $p0 i32)
    (call $__wasi_proc_exit
      (local.get $p0))
    (unreachable))
  (func $stackSave (export "stackSave") (type $t2) (result i32)
    (global.get $__stack_pointer))
  (func $stackRestore (export "stackRestore") (type $t0) (param $p0 i32)
    (global.set $__stack_pointer
      (local.get $p0)))
  (func $stackAlloc (export "stackAlloc") (type $t3) (param $p0 i32) (result i32)
    (local $l1 i32)
    (global.set $__stack_pointer
      (local.tee $l1
        (i32.and
          (i32.sub
            (global.get $__stack_pointer)
            (local.get $p0))
          (i32.const -16))))
    (local.get $l1))
  (func $__errno_location (export "__errno_location") (type $t2) (result i32)
    (i32.const 1024))
  (table $__indirect_function_table (export "__indirect_function_table") 2 2 funcref)
  (memory $memory (export "memory") 256 256)
  (global $__stack_pointer (mut i32) (i32.const 5243920))
  (elem $e0 (i32.const 1) func $__wasm_call_ctors))
