(module
  (func $entry (export "entry") (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.rem_s
  )
)