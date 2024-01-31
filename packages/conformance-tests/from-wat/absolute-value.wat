(module
  (func $abs_f64 (param $x f64) (result f64)
    local.get $x
    f64.abs
  )

  (func $entry (export "entry") (param $a f64) (result f64)
    (call $abs_f64 (local.get $a))
  )
)
