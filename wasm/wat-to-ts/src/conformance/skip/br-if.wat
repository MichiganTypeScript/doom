(func $foo (param i32) (result i32)
       (local i32)
       (block
           (block
               (block
                   ;; x == 0
                   local.get 0
                   i32.eqz
                   br_if 0

                   ;; x == 1
                   local.get 0
                   i32.const 1
                   i32.eq
                   br_if 1

                   ;; the `else` case
                   i32.const 7
                   local.set 1
                   br 2)
             i32.const 42
             local.set 1
             br 1)
         i32.const 99
         local.set 1)
       local.get 1)