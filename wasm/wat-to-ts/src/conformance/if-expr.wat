;; Shows how the WAT "if" statement can be used as an expression in its
;; folded form.
;;
;; Eli Bendersky [https://eli.thegreenplace.net]
;; This code is in the public domain.
(module
    ;; Returns n+1 if control >= 0, n-1 otherwise.
    ;; This is a somewhat artificial function designed to demonstrate a WAT
    ;; feature.
    (func $ifexpr (export "ifexpr") (param $n i32) (param $control i32) (result i32)
        (i32.add 
            (local.get $n)
            ;; The "(result i32)" clause says that the expression will leave
            ;; a single i32 value on the stack. If it's ommitted, the WASM
            ;; module will fail type-checking.
            (if (result i32)
                (i32.ge_s (local.get $control) (i32.const 0))
                (then (i32.const 1))
                (else (i32.const -1))
            )
        )
    )
)
