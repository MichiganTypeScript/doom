(module
  (func $negate (param $theOmniscient f64) (result f64)
    local.get $theOmniscient
    f64.neg ;; negate the values
  )

  (func $entry (export "entry") (param $ziltoid f64) (result f64)
    (call $negate (local.get $ziltoid)) ;; call the negate function
  )
)
