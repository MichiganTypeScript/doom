(module
  (func $throw
    unreachable
  )

  (func $entry (export "entry")
    call $throw
  )
)
