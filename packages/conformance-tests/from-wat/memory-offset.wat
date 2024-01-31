(module
  (memory $memory (export "memory") 1)

  (func $foo (param $a i32) (param $b i32) (param $c i32) (result i32)
    (local $start i32)
    (local.set $start (i32.const 0))
  
    (local.get $start)
    (local.get $a)
    (i32.store) ;; no offset specified, 0 implied
    
    (local.get $start)
    (local.get $b)
    (i32.store offset=4)

    (local.get $start)
    (local.get $c)
    (i32.store offset=8)

    (local.get $start)
    (i32.load offset=8)
    
    (local.get $start)
    (i32.load offset=4)
    
    (local.get $start)
    (i32.load) ;; no offset specified, 0 implied

    (i32.sub)
    (i32.add)
  )

  (func $entry (export "entry") (param $a i32) (param $b i32) (param $c i32) (result i32)
    (call $foo
      (local.get $a)
      (local.get $b)
      (local.get $c)
    )
  )
)
