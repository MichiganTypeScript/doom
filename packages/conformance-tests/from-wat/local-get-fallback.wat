(module
  (func $entry (export "entry") (result i32)
    (local $l1 i32)
    local.get $l1 ;; get a local varaible that has not been set
  )
)