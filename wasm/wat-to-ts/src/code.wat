(module
  (func $exampleFunction
    ;; Local variable declarations
    (local $x i32)

    ;; Set the local variable $x to 5
    (i32.const 5)
    (local.set $x)

    ;; Check if $x is greater than 3
    (local.get $x)
    (i32.const 3)
    (i32.gt_s)  ;; Pushes 1 (true) if $x > 3, else 0 (false)

    ;; Conditional branch
    br_if 0    ;; If the condition is true, branch to label 0

    ;; Code to execute if $x <= 3
    ;; (This part will be skipped if $x > 3)
    ;; ...

    ;; Label 0: Target for the branch
    ;; Code to execute if $x > 3
    ;; ...
  )
  ;; Other functions, imports, exports, etc.
)
