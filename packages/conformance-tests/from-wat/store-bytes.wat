(module
  (memory (export "memory") 1)

  (func $entry (export "entry") (result i32)
    (i32.const 0)
  )

  (data $.rodata (i32.const 0) "Ziltoid, the Omniscient!\00")
  (data $.data (i32.const 1024) "in search of the ultimate cup of coffee\00")
  (data $.data.1 (i32.const 2048) "you have five Earth minutes... make it perfect!\00")

  ;; the fact that mutlipe strings are allowed to be stored like this is... horseshit.
  (data $.data.2 (i32.const 4096) "I am so omniscient," " if there were to be two omnisciences.." " I would be both!\00")
)