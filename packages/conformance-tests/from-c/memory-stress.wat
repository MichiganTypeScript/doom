(module
  (type $t0 (func))
  (type $t1 (func (param i32) (result i32)))
  (func $__wasm_call_ctors (export "__wasm_call_ctors") (type $t0)
    (nop))
  (func $entry (export "entry") (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32)
    (if $I0
      (i32.gt_s
        (local.get $p0)
        (i32.const 0))
      (then
        (loop $L1
          (i32.store8
            (i32.add
              (local.get $l1)
              (i32.const 1024))
            (i32.const 97))
          (br_if $L1
            (i32.ne
              (local.get $p0)
              (local.tee $l1
                (i32.add
                  (local.get $l1)
                  (i32.const 1))))))))
    (i32.store8
      (i32.add
        (local.get $p0)
        (i32.const 1024))
      (i32.const 0))
    (i32.const 1024))
  (memory $memory (export "memory") 17)
  (global $__dso_handle (export "__dso_handle") i32 (i32.const 1024))
  (global $__data_end (export "__data_end") i32 (i32.const 1001024))
  (global $__stack_low (export "__stack_low") i32 (i32.const 1001024))
  (global $__stack_high (export "__stack_high") i32 (i32.const 1066560))
  (global $__global_base (export "__global_base") i32 (i32.const 1024))
  (global $__heap_base (export "__heap_base") i32 (i32.const 1066560))
  (global $__heap_end (export "__heap_end") i32 (i32.const 1114112))
  (global $__memory_base (export "__memory_base") i32 (i32.const 0))
  (global $__table_base (export "__table_base") i32 (i32.const 1)))
