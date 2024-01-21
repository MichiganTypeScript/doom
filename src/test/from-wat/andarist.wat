(module
  ;; (func $andarist (export "andarist") (param $x i32) (result i32)
  ;;   (local $a i32)

  ;;   ;; a = x + 10
  ;;   (local.set $a
  ;;     (i32.add
  ;;       (local.get $x)
  ;;       (i32.const 10)
  ;;     )
  ;;   )

  ;;   ;; if (a > 5)
  ;;   (if
  ;;     (i32.gt_s
  ;;       (local.get $a)
  ;;       (i32.const 5)
  ;;     )
  ;;     ;; then a = a + 2
  ;;     (then
  ;;       (local.set $a
  ;;         (i32.add
  ;;           (local.get $a)
  ;;           (i32.const 2)
  ;;         )
  ;;       )
  ;;     )
  ;;   )

  ;;   ;; a = a + 7
  ;;   (i32.add
  ;;     (local.get $a)
  ;;     (i32.const 7)
  ;;   )
  ;; )

  (func $andarist (param $x i32) (result i32)
    (i32.add
      (i32.add
        (local.get $x)
        (select
          (i32.const 12)
          (i32.const 10)
          (i32.gt_s
            (local.get $x)
            (i32.const -5)
          )
        )
      )
      (i32.const 7)
    )
  )

  (func $entry (export "entry") (param $a i32) (result i32)
    (call $andarist (local.get $a))
  )
)
