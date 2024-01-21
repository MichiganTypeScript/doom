(module
  (func $nop
    nop
  )

  (func $entry (export "entry")
    (call $nop)
  )
)
