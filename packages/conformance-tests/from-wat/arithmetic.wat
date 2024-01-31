


(module
  (memory $memory (export "memory") 1)

  ;; F32Add
  (func $F32Add (param $a f32) (param $b f32) (result f32)
    local.get $a
    local.get $b
    f32.add
  )

  ;; F64Add
  (func $F64Add (param $a f64) (param $b f64) (result f64)
    local.get $a
    local.get $b
    f64.add
  )

  ;; I32Add
  (func $I32Add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )

  ;; I64Add
  (func $I64Add (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.add
  )

  ;; f32Div
  (func $F32Div (param $a f32) (param $b f32) (result f32)
    local.get $a
    local.get $b
    f32.div
  )

  ;; F64Div
  (func $F64Div (param $a f64) (param $b f64) (result f64)
    local.get $a
    local.get $b
    f64.div
  )

  ;; I32DivS
  (func $I32DivS (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.div_s
  )

  ;; I64DivS
  (func $I64DivS (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.div_s
  )

  ;; I32DivU
  (func $I32DivU (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.div_u
  )

  ;; I64DivU
  (func $I64DivU (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.div_u
  )

  ;; f32Mul
  (func $F32Mul (param $a f32) (param $b f32) (result f32)
    local.get $a
    local.get $b
    f32.mul
  )

  ;; F64Mul
  (func $F64Mul (param $a f64) (param $b f64) (result f64)
    local.get $a
    local.get $b
    f64.mul
  )

  ;; I32Mul
  (func $I32Mul (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.mul
  )

  ;; I64Mul
  (func $I64Mul (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.mul
  )

  ;; I32RemS
  (func $I32RemS (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.rem_s
  )

  ;; I32RemU
  (func $I32RemU (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.rem_u
  )

  ;;Doom doesn't use I64RemS or I64RemU so they're skipped

  ;; f32Sub
  (func $F32Sub (param $a f32) (param $b f32) (result f32)
    local.get $a
    local.get $b
    f32.sub
  )

  ;; F64Sub
  (func $F64Sub (param $a f64) (param $b f64) (result f64)
    local.get $a
    local.get $b
    f64.sub
  )

  ;; I32Sub
  (func $I32Sub (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.sub
  )

  ;; I64Sub
  (func $I64Sub (param $a i64) (param $b i64) (result i64)
    local.get $a
    local.get $b
    i64.sub
  )

  (func $arithmetic
    (param $F32Add_a f32)  (param $F32Add_b f32)
    (param $F64Add_a f64)  (param $F64Add_b f64)
    (param $I32Add_a i32)  (param $I32Add_b i32)
    (param $I64Add_a i64)  (param $I64Add_b i64)
    (param $F32Div_a f32)  (param $F32Div_b f32)
    (param $F64Div_a f64)  (param $F64Div_b f64)
    (param $I32DivS_a i32) (param $I32DivS_b i32)
    (param $I64DivS_a i64) (param $I64DivS_b i64)
    (param $I32DivU_a i32) (param $I32DivU_b i32)
    (param $I64DivU_a i64) (param $I64DivU_b i64)
    (param $F32Mul_a f32)  (param $F32Mul_b f32)
    (param $F64Mul_a f64)  (param $F64Mul_b f64)
    (param $I32Mul_a i32)  (param $I32Mul_b i32)
    (param $I64Mul_a i64)  (param $I64Mul_b i64)
    (param $I32RemS_a i32) (param $I32RemS_b i32)
    (param $I32RemU_a i32) (param $I32RemU_b i32)
    (param $F32Sub_a f32)  (param $F32Sub_b f32)
    (param $F64Sub_a f64)  (param $F64Sub_b f64)
    (param $I32Sub_a i32)  (param $I32Sub_b i32)
    (param $I64Sub_a i64)  (param $I64Sub_b i64)

    (local $index i32)

    i32.const 0
    local.set $index

    local.get $index
    local.get $F32Add_a
    local.get $F32Add_b
    call $F32Add
    f32.store offset=0

    local.get $index
    local.get $F64Add_a
    local.get $F64Add_b
    call $F64Add
    f64.store offset=8

    local.get $index
    local.get $I32Add_a
    local.get $I32Add_b
    call $I32Add
    i32.store offset=16

    local.get $index
    local.get $I64Add_a
    local.get $I64Add_b
    call $I64Add
    i64.store offset=24

    local.get $index
    local.get $F32Div_a
    local.get $F32Div_b
    call $F32Div
    f32.store offset=32

    local.get $index
    local.get $F64Div_a
    local.get $F64Div_b
    call $F64Div
    f64.store offset=40

    local.get $index
    local.get $I32DivS_a
    local.get $I32DivS_b
    call $I32DivS
    i32.store offset=48

    local.get $index
    local.get $I64DivS_a
    local.get $I64DivS_b
    call $I64DivS
    i64.store offset=56

    local.get $index
    local.get $I32DivU_a
    local.get $I32DivU_b
    call $I32DivU
    i32.store offset=64

    local.get $index
    local.get $I64DivU_a
    local.get $I64DivU_b
    call $I64DivU
    i64.store offset=72

    local.get $index
    local.get $F32Mul_a
    local.get $F32Mul_b
    call $F32Mul
    f32.store offset=80

    local.get $index
    local.get $F64Mul_a
    local.get $F64Mul_b
    call $F64Mul
    f64.store offset=88

    local.get $index
    local.get $I32Mul_a
    local.get $I32Mul_b
    call $I32Mul
    i32.store offset=96

    local.get $index
    local.get $I64Mul_a
    local.get $I64Mul_b
    call $I64Mul
    i64.store offset=104

    local.get $index
    local.get $I32RemS_a
    local.get $I32RemS_b
    call $I32RemS
    i32.store offset=112

    local.get $index
    local.get $I32RemU_a
    local.get $I32RemU_b
    call $I32RemU
    i32.store offset=120

    local.get $index
    local.get $F32Sub_a
    local.get $F32Sub_b
    call $F32Sub
    f32.store offset=128

    local.get $index
    local.get $F64Sub_a
    local.get $F64Sub_b
    call $F64Sub
    f64.store offset=136

    local.get $index
    local.get $I32Sub_a
    local.get $I32Sub_b
    call $I32Sub
    i32.store offset=144

    local.get $index
    local.get $I64Sub_a
    local.get $I64Sub_b
    call $I64Sub
    i64.store offset=152
  )
)