(module
  (type $t0 (func (param i32 i32 i32) (result i32)))
  (type $t1 (func (param i32) (result i32)))
  (type $t2 (func (result i32)))
  (type $t3 (func (param i32)))
  (type $t4 (func))
  (type $t5 (func (param i32 i64 i32) (result i64)))
  (type $t6 (func (param i32 i32)))
  (type $t7 (func (param i32 i32) (result i32)))
  (type $t8 (func (param i32 i32 i32 i32)))
  (type $t9 (func (param i32 f64 i32 i32 i32 i32) (result i32)))
  (type $t10 (func (param i64 i32) (result i32)))
  (type $t11 (func (param i32 i64 i64 i32)))
  (type $t12 (func (param i32 i32 i32 i32) (result i32)))
  (type $t13 (func (param i32 i64 i32 i32) (result i32)))
  (type $t14 (func (param f64 i32) (result f64)))
  (type $t15 (func (param i32 i32 i32 i32 i32) (result i32)))
  (type $t16 (func (param i32 i32 i32 i32 i32 i32 i32) (result i32)))
  (type $t17 (func (param i32 i32 i32)))
  (type $t18 (func (param i64 i32 i32) (result i32)))
  (type $t19 (func (param i32 i32 i32 i32 i32)))
  (type $t20 (func (param f64) (result i64)))
  (type $t21 (func (param i64 i64) (result f64)))
  (func $__wasi_proc_exit (import "wasi_snapshot_preview1" "proc_exit") (type $t3) (param i32))
  (func $__wasi_fd_write (import "wasi_snapshot_preview1" "fd_write") (type $t12) (param i32 i32 i32 i32) (result i32))
  (func $__wasi_fd_close (import "wasi_snapshot_preview1" "fd_close") (type $t1) (param i32) (result i32))
  (func $__wasi_fd_seek (import "wasi_snapshot_preview1" "fd_seek") (type $t13) (param i32 i64 i32 i32) (result i32))
  (func $__wasm_call_ctors (type $t4)
    call $emscripten_stack_init
    call $init_pthread_self)
  (func $countAliveNeighbors (type $t8) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32)
    (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32) (local $l72 i32) (local $l73 i32) (local $l74 i32) (local $l75 i32) (local $l76 i32) (local $l77 i32) (local $l78 i32) (local $l79 i32) (local $l80 i32) (local $l81 i32)
    global.get $__stack_pointer
    local.set $l4
    i32.const 32
    local.set $l5
    local.get $l4
    local.get $l5
    i32.sub
    local.set $l6
    local.get $l6
    local.get $p1
    i32.store offset=28
    local.get $l6
    local.get $p2
    i32.store offset=24
    local.get $l6
    local.get $p3
    i32.store offset=20
    local.get $l6
    i32.load offset=20
    local.set $l7
    i32.const 0
    local.set $l8
    local.get $l7
    local.get $l8
    i32.store
    i32.const -1
    local.set $l9
    local.get $l6
    local.get $l9
    i32.store offset=16
    block $B0
      loop $L1
        local.get $l6
        i32.load offset=16
        local.set $l10
        i32.const 1
        local.set $l11
        local.get $l10
        local.set $l12
        local.get $l11
        local.set $l13
        local.get $l12
        local.get $l13
        i32.le_s
        local.set $l14
        i32.const 1
        local.set $l15
        local.get $l14
        local.get $l15
        i32.and
        local.set $l16
        local.get $l16
        i32.eqz
        br_if $B0
        i32.const -1
        local.set $l17
        local.get $l6
        local.get $l17
        i32.store offset=12
        block $B2
          loop $L3
            local.get $l6
            i32.load offset=12
            local.set $l18
            i32.const 1
            local.set $l19
            local.get $l18
            local.set $l20
            local.get $l19
            local.set $l21
            local.get $l20
            local.get $l21
            i32.le_s
            local.set $l22
            i32.const 1
            local.set $l23
            local.get $l22
            local.get $l23
            i32.and
            local.set $l24
            local.get $l24
            i32.eqz
            br_if $B2
            local.get $l6
            i32.load offset=16
            local.set $l25
            block $B4
              block $B5
                local.get $l25
                br_if $B5
                local.get $l6
                i32.load offset=12
                local.set $l26
                local.get $l26
                br_if $B5
                br $B4
              end
              local.get $l6
              i32.load offset=28
              local.set $l27
              local.get $l6
              i32.load offset=16
              local.set $l28
              local.get $l27
              local.get $l28
              i32.add
              local.set $l29
              local.get $l6
              local.get $l29
              i32.store offset=8
              local.get $l6
              i32.load offset=24
              local.set $l30
              local.get $l6
              i32.load offset=12
              local.set $l31
              local.get $l30
              local.get $l31
              i32.add
              local.set $l32
              local.get $l6
              local.get $l32
              i32.store offset=4
              local.get $l6
              i32.load offset=8
              local.set $l33
              i32.const 0
              local.set $l34
              local.get $l33
              local.set $l35
              local.get $l34
              local.set $l36
              local.get $l35
              local.get $l36
              i32.ge_s
              local.set $l37
              i32.const 1
              local.set $l38
              local.get $l37
              local.get $l38
              i32.and
              local.set $l39
              block $B6
                local.get $l39
                i32.eqz
                br_if $B6
                local.get $l6
                i32.load offset=8
                local.set $l40
                local.get $p0
                i32.load
                local.set $l41
                local.get $l40
                local.set $l42
                local.get $l41
                local.set $l43
                local.get $l42
                local.get $l43
                i32.lt_s
                local.set $l44
                i32.const 1
                local.set $l45
                local.get $l44
                local.get $l45
                i32.and
                local.set $l46
                local.get $l46
                i32.eqz
                br_if $B6
                local.get $l6
                i32.load offset=4
                local.set $l47
                i32.const 0
                local.set $l48
                local.get $l47
                local.set $l49
                local.get $l48
                local.set $l50
                local.get $l49
                local.get $l50
                i32.ge_s
                local.set $l51
                i32.const 1
                local.set $l52
                local.get $l51
                local.get $l52
                i32.and
                local.set $l53
                local.get $l53
                i32.eqz
                br_if $B6
                local.get $l6
                i32.load offset=4
                local.set $l54
                local.get $p0
                i32.load offset=4
                local.set $l55
                local.get $l54
                local.set $l56
                local.get $l55
                local.set $l57
                local.get $l56
                local.get $l57
                i32.lt_s
                local.set $l58
                i32.const 1
                local.set $l59
                local.get $l58
                local.get $l59
                i32.and
                local.set $l60
                local.get $l60
                i32.eqz
                br_if $B6
                i32.const 8
                local.set $l61
                local.get $p0
                local.get $l61
                i32.add
                local.set $l62
                local.get $l6
                i32.load offset=8
                local.set $l63
                i32.const 36
                local.set $l64
                local.get $l63
                local.get $l64
                i32.mul
                local.set $l65
                local.get $l62
                local.get $l65
                i32.add
                local.set $l66
                local.get $l6
                i32.load offset=4
                local.set $l67
                i32.const 2
                local.set $l68
                local.get $l67
                local.get $l68
                i32.shl
                local.set $l69
                local.get $l66
                local.get $l69
                i32.add
                local.set $l70
                local.get $l70
                i32.load
                local.set $l71
                local.get $l71
                i32.eqz
                br_if $B6
                local.get $l6
                i32.load offset=20
                local.set $l72
                local.get $l72
                i32.load
                local.set $l73
                i32.const 1
                local.set $l74
                local.get $l73
                local.get $l74
                i32.add
                local.set $l75
                local.get $l72
                local.get $l75
                i32.store
              end
            end
            local.get $l6
            i32.load offset=12
            local.set $l76
            i32.const 1
            local.set $l77
            local.get $l76
            local.get $l77
            i32.add
            local.set $l78
            local.get $l6
            local.get $l78
            i32.store offset=12
            br $L3
          end
          unreachable
        end
        local.get $l6
        i32.load offset=16
        local.set $l79
        i32.const 1
        local.set $l80
        local.get $l79
        local.get $l80
        i32.add
        local.set $l81
        local.get $l6
        local.get $l81
        i32.store offset=16
        br $L1
      end
      unreachable
    end
    return)
  (func $updateGrid (type $t6) (param $p0 i32) (param $p1 i32)
    (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32) (local $l72 i32) (local $l73 i32) (local $l74 i32) (local $l75 i32) (local $l76 i32) (local $l77 i32) (local $l78 i32) (local $l79 i32) (local $l80 i32) (local $l81 i32) (local $l82 i32) (local $l83 i32) (local $l84 i32) (local $l85 i32) (local $l86 i32) (local $l87 i32) (local $l88 i32) (local $l89 i32) (local $l90 i32) (local $l91 i32) (local $l92 i32) (local $l93 i32) (local $l94 i32) (local $l95 i32) (local $l96 i32) (local $l97 i32) (local $l98 i32) (local $l99 i32) (local $l100 i32)
    global.get $__stack_pointer
    local.set $l2
    i32.const 352
    local.set $l3
    local.get $l2
    local.get $l3
    i32.sub
    local.set $l4
    local.get $l4
    global.set $__stack_pointer
    local.get $p1
    i32.load
    local.set $l5
    local.get $p0
    local.get $l5
    i32.store
    local.get $p1
    i32.load offset=4
    local.set $l6
    local.get $p0
    local.get $l6
    i32.store offset=4
    i32.const 0
    local.set $l7
    local.get $l4
    local.get $l7
    i32.store offset=348
    block $B0
      loop $L1
        local.get $l4
        i32.load offset=348
        local.set $l8
        local.get $p1
        i32.load
        local.set $l9
        local.get $l8
        local.set $l10
        local.get $l9
        local.set $l11
        local.get $l10
        local.get $l11
        i32.lt_s
        local.set $l12
        i32.const 1
        local.set $l13
        local.get $l12
        local.get $l13
        i32.and
        local.set $l14
        local.get $l14
        i32.eqz
        br_if $B0
        i32.const 0
        local.set $l15
        local.get $l4
        local.get $l15
        i32.store offset=344
        block $B2
          loop $L3
            local.get $l4
            i32.load offset=344
            local.set $l16
            local.get $p1
            i32.load offset=4
            local.set $l17
            local.get $l16
            local.set $l18
            local.get $l17
            local.set $l19
            local.get $l18
            local.get $l19
            i32.lt_s
            local.set $l20
            i32.const 1
            local.set $l21
            local.get $l20
            local.get $l21
            i32.and
            local.set $l22
            local.get $l22
            i32.eqz
            br_if $B2
            local.get $l4
            i32.load offset=348
            local.set $l23
            local.get $l4
            i32.load offset=344
            local.set $l24
            i32.const 332
            local.set $l25
            i32.const 8
            local.set $l26
            local.get $l4
            local.get $l26
            i32.add
            local.set $l27
            local.get $l27
            local.get $p1
            local.get $l25
            call $__memcpy
            drop
            i32.const 8
            local.set $l28
            local.get $l4
            local.get $l28
            i32.add
            local.set $l29
            i32.const 340
            local.set $l30
            local.get $l4
            local.get $l30
            i32.add
            local.set $l31
            local.get $l29
            local.get $l23
            local.get $l24
            local.get $l31
            call $countAliveNeighbors
            i32.const 8
            local.set $l32
            local.get $p1
            local.get $l32
            i32.add
            local.set $l33
            local.get $l4
            i32.load offset=348
            local.set $l34
            i32.const 36
            local.set $l35
            local.get $l34
            local.get $l35
            i32.mul
            local.set $l36
            local.get $l33
            local.get $l36
            i32.add
            local.set $l37
            local.get $l4
            i32.load offset=344
            local.set $l38
            i32.const 2
            local.set $l39
            local.get $l38
            local.get $l39
            i32.shl
            local.set $l40
            local.get $l37
            local.get $l40
            i32.add
            local.set $l41
            local.get $l41
            i32.load
            local.set $l42
            block $B4
              block $B5
                local.get $l42
                i32.eqz
                br_if $B5
                local.get $l4
                i32.load offset=340
                local.set $l43
                i32.const 2
                local.set $l44
                local.get $l43
                local.set $l45
                local.get $l44
                local.set $l46
                local.get $l45
                local.get $l46
                i32.eq
                local.set $l47
                i32.const 1
                local.set $l48
                i32.const 1
                local.set $l49
                local.get $l47
                local.get $l49
                i32.and
                local.set $l50
                local.get $l48
                local.set $l51
                block $B6
                  local.get $l50
                  br_if $B6
                  local.get $l4
                  i32.load offset=340
                  local.set $l52
                  i32.const 3
                  local.set $l53
                  local.get $l52
                  local.set $l54
                  local.get $l53
                  local.set $l55
                  local.get $l54
                  local.get $l55
                  i32.eq
                  local.set $l56
                  local.get $l56
                  local.set $l51
                end
                local.get $l51
                local.set $l57
                i32.const 1
                local.set $l58
                i32.const 0
                local.set $l59
                i32.const 1
                local.set $l60
                local.get $l57
                local.get $l60
                i32.and
                local.set $l61
                local.get $l58
                local.get $l59
                local.get $l61
                select
                local.set $l62
                i32.const 8
                local.set $l63
                local.get $p0
                local.get $l63
                i32.add
                local.set $l64
                local.get $l4
                i32.load offset=348
                local.set $l65
                i32.const 36
                local.set $l66
                local.get $l65
                local.get $l66
                i32.mul
                local.set $l67
                local.get $l64
                local.get $l67
                i32.add
                local.set $l68
                local.get $l4
                i32.load offset=344
                local.set $l69
                i32.const 2
                local.set $l70
                local.get $l69
                local.get $l70
                i32.shl
                local.set $l71
                local.get $l68
                local.get $l71
                i32.add
                local.set $l72
                local.get $l72
                local.get $l62
                i32.store
                br $B4
              end
              local.get $l4
              i32.load offset=340
              local.set $l73
              i32.const 3
              local.set $l74
              local.get $l73
              local.set $l75
              local.get $l74
              local.set $l76
              local.get $l75
              local.get $l76
              i32.eq
              local.set $l77
              i32.const 1
              local.set $l78
              i32.const 0
              local.set $l79
              i32.const 1
              local.set $l80
              local.get $l77
              local.get $l80
              i32.and
              local.set $l81
              local.get $l78
              local.get $l79
              local.get $l81
              select
              local.set $l82
              i32.const 8
              local.set $l83
              local.get $p0
              local.get $l83
              i32.add
              local.set $l84
              local.get $l4
              i32.load offset=348
              local.set $l85
              i32.const 36
              local.set $l86
              local.get $l85
              local.get $l86
              i32.mul
              local.set $l87
              local.get $l84
              local.get $l87
              i32.add
              local.set $l88
              local.get $l4
              i32.load offset=344
              local.set $l89
              i32.const 2
              local.set $l90
              local.get $l89
              local.get $l90
              i32.shl
              local.set $l91
              local.get $l88
              local.get $l91
              i32.add
              local.set $l92
              local.get $l92
              local.get $l82
              i32.store
            end
            local.get $l4
            i32.load offset=344
            local.set $l93
            i32.const 1
            local.set $l94
            local.get $l93
            local.get $l94
            i32.add
            local.set $l95
            local.get $l4
            local.get $l95
            i32.store offset=344
            br $L3
          end
          unreachable
        end
        local.get $l4
        i32.load offset=348
        local.set $l96
        i32.const 1
        local.set $l97
        local.get $l96
        local.get $l97
        i32.add
        local.set $l98
        local.get $l4
        local.get $l98
        i32.store offset=348
        br $L1
      end
      unreachable
    end
    i32.const 352
    local.set $l99
    local.get $l4
    local.get $l99
    i32.add
    local.set $l100
    local.get $l100
    global.set $__stack_pointer
    return)
  (func $displayGrid (type $t3) (param $p0 i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32)
    global.get $__stack_pointer
    local.set $l1
    i32.const 16
    local.set $l2
    local.get $l1
    local.get $l2
    i32.sub
    local.set $l3
    local.get $l3
    global.set $__stack_pointer
    i32.const 0
    local.set $l4
    local.get $l3
    local.get $l4
    i32.store offset=12
    block $B0
      loop $L1
        local.get $l3
        i32.load offset=12
        local.set $l5
        local.get $p0
        i32.load
        local.set $l6
        local.get $l5
        local.set $l7
        local.get $l6
        local.set $l8
        local.get $l7
        local.get $l8
        i32.lt_s
        local.set $l9
        i32.const 1
        local.set $l10
        local.get $l9
        local.get $l10
        i32.and
        local.set $l11
        local.get $l11
        i32.eqz
        br_if $B0
        i32.const 0
        local.set $l12
        local.get $l3
        local.get $l12
        i32.store offset=8
        block $B2
          loop $L3
            local.get $l3
            i32.load offset=8
            local.set $l13
            local.get $p0
            i32.load offset=4
            local.set $l14
            local.get $l13
            local.set $l15
            local.get $l14
            local.set $l16
            local.get $l15
            local.get $l16
            i32.lt_s
            local.set $l17
            i32.const 1
            local.set $l18
            local.get $l17
            local.get $l18
            i32.and
            local.set $l19
            local.get $l19
            i32.eqz
            br_if $B2
            i32.const 8
            local.set $l20
            local.get $p0
            local.get $l20
            i32.add
            local.set $l21
            local.get $l3
            i32.load offset=12
            local.set $l22
            i32.const 36
            local.set $l23
            local.get $l22
            local.get $l23
            i32.mul
            local.set $l24
            local.get $l21
            local.get $l24
            i32.add
            local.set $l25
            local.get $l3
            i32.load offset=8
            local.set $l26
            i32.const 2
            local.set $l27
            local.get $l26
            local.get $l27
            i32.shl
            local.set $l28
            local.get $l25
            local.get $l28
            i32.add
            local.set $l29
            local.get $l29
            i32.load
            local.set $l30
            i32.const 88
            local.set $l31
            i32.const 32
            local.set $l32
            local.get $l31
            local.get $l32
            local.get $l30
            select
            local.set $l33
            local.get $l3
            local.get $l33
            i32.store
            i32.const 1061
            local.set $l34
            local.get $l34
            local.get $l3
            call $printf
            drop
            local.get $l3
            i32.load offset=8
            local.set $l35
            i32.const 1
            local.set $l36
            local.get $l35
            local.get $l36
            i32.add
            local.set $l37
            local.get $l3
            local.get $l37
            i32.store offset=8
            br $L3
          end
          unreachable
        end
        i32.const 1095
        local.set $l38
        i32.const 0
        local.set $l39
        local.get $l38
        local.get $l39
        call $printf
        drop
        local.get $l3
        i32.load offset=12
        local.set $l40
        i32.const 1
        local.set $l41
        local.get $l40
        local.get $l41
        i32.add
        local.set $l42
        local.get $l3
        local.get $l42
        i32.store offset=12
        br $L1
      end
      unreachable
    end
    i32.const 16
    local.set $l43
    local.get $l3
    local.get $l43
    i32.add
    local.set $l44
    local.get $l44
    global.set $__stack_pointer
    return)
  (func $__original_main (type $t2) (result i32)
    (local $l0 i32) (local $l1 i32) (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32) (local $l72 i32) (local $l73 i32) (local $l74 i32) (local $l75 i32) (local $l76 i32) (local $l77 i32) (local $l78 i32) (local $l79 i32) (local $l80 i32) (local $l81 i32) (local $l82 i32) (local $l83 i32) (local $l84 i32) (local $l85 i32) (local $l86 i32) (local $l87 i32) (local $l88 i32) (local $l89 i32) (local $l90 i32) (local $l91 i32) (local $l92 i32) (local $l93 i32) (local $l94 i32) (local $l95 i32) (local $l96 i32) (local $l97 i32) (local $l98 i32) (local $l99 i32) (local $l100 i32) (local $l101 i32) (local $l102 i32) (local $l103 i32) (local $l104 i32) (local $l105 i32) (local $l106 i32)
    global.get $__stack_pointer
    local.set $l0
    i32.const 1696
    local.set $l1
    local.get $l0
    local.get $l1
    i32.sub
    local.set $l2
    local.get $l2
    global.set $__stack_pointer
    i32.const 0
    local.set $l3
    local.get $l2
    local.get $l3
    i32.store offset=1692
    i32.const 9
    local.set $l4
    local.get $l2
    local.get $l4
    i32.store offset=1360
    i32.const 9
    local.set $l5
    local.get $l2
    local.get $l5
    i32.store offset=1364
    i32.const 1024
    local.set $l6
    local.get $l2
    local.get $l6
    i32.add
    local.set $l7
    local.get $l7
    local.set $l8
    i32.const 324
    local.set $l9
    i32.const 0
    local.set $l10
    local.get $l8
    local.get $l10
    local.get $l9
    call $memset
    drop
    i32.const 1
    local.set $l11
    local.get $l2
    local.get $l11
    i32.store offset=1148
    i32.const 1
    local.set $l12
    local.get $l2
    local.get $l12
    i32.store offset=1180
    i32.const 1
    local.set $l13
    local.get $l2
    local.get $l13
    i32.store offset=1184
    i32.const 1
    local.set $l14
    local.get $l2
    local.get $l14
    i32.store offset=1188
    i32.const 1
    local.set $l15
    local.get $l2
    local.get $l15
    i32.store offset=1220
    i32.const 0
    local.set $l16
    local.get $l2
    local.get $l16
    i32.store offset=1020
    block $B0
      loop $L1
        local.get $l2
        i32.load offset=1020
        local.set $l17
        local.get $l2
        i32.load offset=1360
        local.set $l18
        local.get $l17
        local.set $l19
        local.get $l18
        local.set $l20
        local.get $l19
        local.get $l20
        i32.lt_s
        local.set $l21
        i32.const 1
        local.set $l22
        local.get $l21
        local.get $l22
        i32.and
        local.set $l23
        local.get $l23
        i32.eqz
        br_if $B0
        i32.const 0
        local.set $l24
        local.get $l2
        local.get $l24
        i32.store offset=1016
        block $B2
          loop $L3
            local.get $l2
            i32.load offset=1016
            local.set $l25
            local.get $l2
            i32.load offset=1364
            local.set $l26
            local.get $l25
            local.set $l27
            local.get $l26
            local.set $l28
            local.get $l27
            local.get $l28
            i32.lt_s
            local.set $l29
            i32.const 1
            local.set $l30
            local.get $l29
            local.get $l30
            i32.and
            local.set $l31
            local.get $l31
            i32.eqz
            br_if $B2
            local.get $l2
            i32.load offset=1020
            local.set $l32
            i32.const 1024
            local.set $l33
            local.get $l2
            local.get $l33
            i32.add
            local.set $l34
            local.get $l34
            local.set $l35
            i32.const 36
            local.set $l36
            local.get $l32
            local.get $l36
            i32.mul
            local.set $l37
            local.get $l35
            local.get $l37
            i32.add
            local.set $l38
            local.get $l2
            i32.load offset=1016
            local.set $l39
            i32.const 2
            local.set $l40
            local.get $l39
            local.get $l40
            i32.shl
            local.set $l41
            local.get $l38
            local.get $l41
            i32.add
            local.set $l42
            local.get $l42
            i32.load
            local.set $l43
            i32.const 1360
            local.set $l44
            local.get $l2
            local.get $l44
            i32.add
            local.set $l45
            local.get $l45
            local.set $l46
            i32.const 8
            local.set $l47
            local.get $l46
            local.get $l47
            i32.add
            local.set $l48
            local.get $l2
            i32.load offset=1020
            local.set $l49
            i32.const 36
            local.set $l50
            local.get $l49
            local.get $l50
            i32.mul
            local.set $l51
            local.get $l48
            local.get $l51
            i32.add
            local.set $l52
            local.get $l2
            i32.load offset=1016
            local.set $l53
            i32.const 2
            local.set $l54
            local.get $l53
            local.get $l54
            i32.shl
            local.set $l55
            local.get $l52
            local.get $l55
            i32.add
            local.set $l56
            local.get $l56
            local.get $l43
            i32.store
            local.get $l2
            i32.load offset=1016
            local.set $l57
            i32.const 1
            local.set $l58
            local.get $l57
            local.get $l58
            i32.add
            local.set $l59
            local.get $l2
            local.get $l59
            i32.store offset=1016
            br $L3
          end
          unreachable
        end
        local.get $l2
        i32.load offset=1020
        local.set $l60
        i32.const 1
        local.set $l61
        local.get $l60
        local.get $l61
        i32.add
        local.set $l62
        local.get $l2
        local.get $l62
        i32.store offset=1020
        br $L1
      end
      unreachable
    end
    i32.const 1
    local.set $l63
    local.get $l2
    local.get $l63
    i32.store offset=1012
    i32.const 0
    local.set $l64
    local.get $l2
    local.get $l64
    i32.store offset=1008
    block $B4
      loop $L5
        local.get $l2
        i32.load offset=1008
        local.set $l65
        local.get $l2
        i32.load offset=1012
        local.set $l66
        local.get $l65
        local.set $l67
        local.get $l66
        local.set $l68
        local.get $l67
        local.get $l68
        i32.lt_s
        local.set $l69
        i32.const 1
        local.set $l70
        local.get $l69
        local.get $l70
        i32.and
        local.set $l71
        local.get $l71
        i32.eqz
        br_if $B4
        i32.const 672
        local.set $l72
        local.get $l2
        local.get $l72
        i32.add
        local.set $l73
        local.get $l73
        drop
        i32.const 332
        local.set $l74
        i32.const 4
        local.set $l75
        local.get $l2
        local.get $l75
        i32.add
        local.set $l76
        i32.const 1360
        local.set $l77
        local.get $l2
        local.get $l77
        i32.add
        local.set $l78
        local.get $l76
        local.get $l78
        local.get $l74
        call $__memcpy
        drop
        i32.const 672
        local.set $l79
        local.get $l2
        local.get $l79
        i32.add
        local.set $l80
        i32.const 4
        local.set $l81
        local.get $l2
        local.get $l81
        i32.add
        local.set $l82
        local.get $l80
        local.get $l82
        call $updateGrid
        i32.const 1360
        local.set $l83
        local.get $l2
        local.get $l83
        i32.add
        local.set $l84
        local.get $l84
        local.set $l85
        i32.const 672
        local.set $l86
        local.get $l2
        local.get $l86
        i32.add
        local.set $l87
        local.get $l87
        local.set $l88
        i32.const 332
        local.set $l89
        local.get $l85
        local.get $l88
        local.get $l89
        call $__memcpy
        drop
        local.get $l2
        i32.load offset=1008
        local.set $l90
        i32.const 1
        local.set $l91
        local.get $l90
        local.get $l91
        i32.add
        local.set $l92
        local.get $l2
        local.get $l92
        i32.store offset=1008
        br $L5
      end
      unreachable
    end
    local.get $l2
    i32.load offset=1012
    local.set $l93
    local.get $l2
    local.get $l93
    i32.store offset=336
    i32.const 1081
    local.set $l94
    i32.const 336
    local.set $l95
    local.get $l2
    local.get $l95
    i32.add
    local.set $l96
    local.get $l94
    local.get $l96
    call $printf
    drop
    i32.const 332
    local.set $l97
    i32.const 340
    local.set $l98
    local.get $l2
    local.get $l98
    i32.add
    local.set $l99
    i32.const 1360
    local.set $l100
    local.get $l2
    local.get $l100
    i32.add
    local.set $l101
    local.get $l99
    local.get $l101
    local.get $l97
    call $__memcpy
    drop
    i32.const 340
    local.set $l102
    local.get $l2
    local.get $l102
    i32.add
    local.set $l103
    local.get $l103
    call $displayGrid
    i32.const 0
    local.set $l104
    i32.const 1696
    local.set $l105
    local.get $l2
    local.get $l105
    i32.add
    local.set $l106
    local.get $l106
    global.set $__stack_pointer
    local.get $l104
    return)
  (func $_start (export "_start") (type $t4)
    block $B0
      i32.const 1
      i32.eqz
      br_if $B0
      call $__wasm_call_ctors
    end
    call $__original_main
    call $exit
    unreachable)
  (func $__memcpy (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    local.get $p0
    local.get $p2
    i32.add
    local.set $l3
    block $B0
      block $B1
        block $B2
          block $B3
            local.get $p1
            local.get $p0
            i32.xor
            i32.const 3
            i32.and
            br_if $B3
            local.get $p0
            i32.const 3
            i32.and
            i32.eqz
            br_if $B2
            local.get $p2
            i32.const 1
            i32.lt_s
            br_if $B2
            local.get $p0
            local.set $p2
            loop $L4
              local.get $p2
              local.get $p1
              i32.load8_u
              i32.store8
              local.get $p1
              i32.const 1
              i32.add
              local.set $p1
              local.get $p2
              i32.const 1
              i32.add
              local.tee $p2
              i32.const 3
              i32.and
              i32.eqz
              br_if $B1
              local.get $p2
              local.get $l3
              i32.lt_u
              br_if $L4
              br $B1
            end
            unreachable
          end
          block $B5
            local.get $l3
            i32.const 4
            i32.lt_u
            br_if $B5
            local.get $l3
            i32.const -4
            i32.add
            local.tee $l4
            local.get $p0
            i32.lt_u
            br_if $B5
            local.get $p0
            local.set $p2
            loop $L6
              local.get $p2
              local.get $p1
              i32.load8_u
              i32.store8
              local.get $p2
              local.get $p1
              i32.load8_u offset=1
              i32.store8 offset=1
              local.get $p2
              local.get $p1
              i32.load8_u offset=2
              i32.store8 offset=2
              local.get $p2
              local.get $p1
              i32.load8_u offset=3
              i32.store8 offset=3
              local.get $p1
              i32.const 4
              i32.add
              local.set $p1
              local.get $p2
              i32.const 4
              i32.add
              local.tee $p2
              local.get $l4
              i32.le_u
              br_if $L6
              br $B0
            end
            unreachable
          end
          local.get $p0
          local.set $p2
          br $B0
        end
        local.get $p0
        local.set $p2
      end
      block $B7
        local.get $l3
        i32.const -4
        i32.and
        local.tee $l4
        i32.const 64
        i32.lt_u
        br_if $B7
        local.get $p2
        local.get $l4
        i32.const -64
        i32.add
        local.tee $l5
        i32.gt_u
        br_if $B7
        loop $L8
          local.get $p2
          local.get $p1
          i32.load
          i32.store
          local.get $p2
          local.get $p1
          i32.load offset=4
          i32.store offset=4
          local.get $p2
          local.get $p1
          i32.load offset=8
          i32.store offset=8
          local.get $p2
          local.get $p1
          i32.load offset=12
          i32.store offset=12
          local.get $p2
          local.get $p1
          i32.load offset=16
          i32.store offset=16
          local.get $p2
          local.get $p1
          i32.load offset=20
          i32.store offset=20
          local.get $p2
          local.get $p1
          i32.load offset=24
          i32.store offset=24
          local.get $p2
          local.get $p1
          i32.load offset=28
          i32.store offset=28
          local.get $p2
          local.get $p1
          i32.load offset=32
          i32.store offset=32
          local.get $p2
          local.get $p1
          i32.load offset=36
          i32.store offset=36
          local.get $p2
          local.get $p1
          i32.load offset=40
          i32.store offset=40
          local.get $p2
          local.get $p1
          i32.load offset=44
          i32.store offset=44
          local.get $p2
          local.get $p1
          i32.load offset=48
          i32.store offset=48
          local.get $p2
          local.get $p1
          i32.load offset=52
          i32.store offset=52
          local.get $p2
          local.get $p1
          i32.load offset=56
          i32.store offset=56
          local.get $p2
          local.get $p1
          i32.load offset=60
          i32.store offset=60
          local.get $p1
          i32.const 64
          i32.add
          local.set $p1
          local.get $p2
          i32.const 64
          i32.add
          local.tee $p2
          local.get $l5
          i32.le_u
          br_if $L8
        end
      end
      local.get $p2
      local.get $l4
      i32.ge_u
      br_if $B0
      loop $L9
        local.get $p2
        local.get $p1
        i32.load
        i32.store
        local.get $p1
        i32.const 4
        i32.add
        local.set $p1
        local.get $p2
        i32.const 4
        i32.add
        local.tee $p2
        local.get $l4
        i32.lt_u
        br_if $L9
      end
    end
    block $B10
      local.get $p2
      local.get $l3
      i32.ge_u
      br_if $B10
      loop $L11
        local.get $p2
        local.get $p1
        i32.load8_u
        i32.store8
        local.get $p1
        i32.const 1
        i32.add
        local.set $p1
        local.get $p2
        i32.const 1
        i32.add
        local.tee $p2
        local.get $l3
        i32.ne
        br_if $L11
      end
    end
    local.get $p0)
  (func $dummy (type $t4))
  (func $libc_exit_fini (type $t4)
    (local $l0 i32)
    i32.const 0
    local.set $l0
    block $B0
      i32.const 0
      i32.const 0
      i32.le_u
      br_if $B0
      loop $L1
        local.get $l0
        i32.const -4
        i32.add
        local.tee $l0
        i32.load
        call_indirect $__indirect_function_table (type $t4)
        local.get $l0
        i32.const 0
        i32.gt_u
        br_if $L1
      end
    end
    call $dummy)
  (func $exit (type $t3) (param $p0 i32)
    call $dummy
    call $libc_exit_fini
    call $__stdio_exit
    local.get $p0
    call $_Exit
    unreachable)
  (func $_Exit (type $t3) (param $p0 i32)
    local.get $p0
    call $__wasi_proc_exit
    unreachable)
  (func $memset (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i64)
    block $B0
      local.get $p2
      i32.eqz
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8
      local.get $p2
      local.get $p0
      i32.add
      local.tee $l3
      i32.const -1
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 3
      i32.lt_u
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8 offset=2
      local.get $p0
      local.get $p1
      i32.store8 offset=1
      local.get $l3
      i32.const -3
      i32.add
      local.get $p1
      i32.store8
      local.get $l3
      i32.const -2
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 7
      i32.lt_u
      br_if $B0
      local.get $p0
      local.get $p1
      i32.store8 offset=3
      local.get $l3
      i32.const -4
      i32.add
      local.get $p1
      i32.store8
      local.get $p2
      i32.const 9
      i32.lt_u
      br_if $B0
      local.get $p0
      i32.const 0
      local.get $p0
      i32.sub
      i32.const 3
      i32.and
      local.tee $l4
      i32.add
      local.tee $l3
      local.get $p1
      i32.const 255
      i32.and
      i32.const 16843009
      i32.mul
      local.tee $p1
      i32.store
      local.get $l3
      local.get $p2
      local.get $l4
      i32.sub
      i32.const -4
      i32.and
      local.tee $l4
      i32.add
      local.tee $p2
      i32.const -4
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      i32.const 9
      i32.lt_u
      br_if $B0
      local.get $l3
      local.get $p1
      i32.store offset=8
      local.get $l3
      local.get $p1
      i32.store offset=4
      local.get $p2
      i32.const -8
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -12
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      i32.const 25
      i32.lt_u
      br_if $B0
      local.get $l3
      local.get $p1
      i32.store offset=24
      local.get $l3
      local.get $p1
      i32.store offset=20
      local.get $l3
      local.get $p1
      i32.store offset=16
      local.get $l3
      local.get $p1
      i32.store offset=12
      local.get $p2
      i32.const -16
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -20
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -24
      i32.add
      local.get $p1
      i32.store
      local.get $p2
      i32.const -28
      i32.add
      local.get $p1
      i32.store
      local.get $l4
      local.get $l3
      i32.const 4
      i32.and
      i32.const 24
      i32.or
      local.tee $l5
      i32.sub
      local.tee $p2
      i32.const 32
      i32.lt_u
      br_if $B0
      local.get $p1
      i64.extend_i32_u
      i64.const 4294967297
      i64.mul
      local.set $l6
      local.get $l3
      local.get $l5
      i32.add
      local.set $p1
      loop $L1
        local.get $p1
        local.get $l6
        i64.store offset=24
        local.get $p1
        local.get $l6
        i64.store offset=16
        local.get $p1
        local.get $l6
        i64.store offset=8
        local.get $p1
        local.get $l6
        i64.store
        local.get $p1
        i32.const 32
        i32.add
        local.set $p1
        local.get $p2
        i32.const -32
        i32.add
        local.tee $p2
        i32.const 31
        i32.gt_u
        br_if $L1
      end
    end
    local.get $p0)
  (func $printf (type $t7) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32)
    global.get $__stack_pointer
    i32.const 16
    i32.sub
    local.tee $l2
    global.set $__stack_pointer
    local.get $l2
    local.get $p1
    i32.store offset=12
    i32.const 1584
    local.get $p0
    local.get $p1
    call $vfprintf
    local.set $p1
    local.get $l2
    i32.const 16
    i32.add
    global.set $__stack_pointer
    local.get $p1)
  (func $__stdio_write (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32)
    global.get $__stack_pointer
    i32.const 32
    i32.sub
    local.tee $l3
    global.set $__stack_pointer
    local.get $l3
    local.get $p0
    i32.load offset=28
    local.tee $l4
    i32.store offset=16
    local.get $p0
    i32.load offset=20
    local.set $l5
    local.get $l3
    local.get $p2
    i32.store offset=28
    local.get $l3
    local.get $p1
    i32.store offset=24
    local.get $l3
    local.get $l5
    local.get $l4
    i32.sub
    local.tee $p1
    i32.store offset=20
    local.get $p1
    local.get $p2
    i32.add
    local.set $l6
    i32.const 2
    local.set $l7
    local.get $l3
    i32.const 16
    i32.add
    local.set $p1
    block $B0
      block $B1
        block $B2
          block $B3
            local.get $p0
            i32.load offset=60
            local.get $l3
            i32.const 16
            i32.add
            i32.const 2
            local.get $l3
            i32.const 12
            i32.add
            call $__wasi_fd_write
            call $__wasi_syscall_ret
            br_if $B3
            loop $L4
              local.get $l6
              local.get $l3
              i32.load offset=12
              local.tee $l4
              i32.eq
              br_if $B2
              local.get $l4
              i32.const -1
              i32.le_s
              br_if $B1
              local.get $p1
              local.get $l4
              local.get $p1
              i32.load offset=4
              local.tee $l8
              i32.gt_u
              local.tee $l5
              i32.const 3
              i32.shl
              i32.add
              local.tee $l9
              local.get $l9
              i32.load
              local.get $l4
              local.get $l8
              i32.const 0
              local.get $l5
              select
              i32.sub
              local.tee $l8
              i32.add
              i32.store
              local.get $p1
              i32.const 12
              i32.const 4
              local.get $l5
              select
              i32.add
              local.tee $l9
              local.get $l9
              i32.load
              local.get $l8
              i32.sub
              i32.store
              local.get $l6
              local.get $l4
              i32.sub
              local.set $l6
              local.get $p0
              i32.load offset=60
              local.get $p1
              i32.const 8
              i32.add
              local.get $p1
              local.get $l5
              select
              local.tee $p1
              local.get $l7
              local.get $l5
              i32.sub
              local.tee $l7
              local.get $l3
              i32.const 12
              i32.add
              call $__wasi_fd_write
              call $__wasi_syscall_ret
              i32.eqz
              br_if $L4
            end
          end
          local.get $l6
          i32.const -1
          i32.ne
          br_if $B1
        end
        local.get $p0
        local.get $p0
        i32.load offset=44
        local.tee $p1
        i32.store offset=28
        local.get $p0
        local.get $p1
        i32.store offset=20
        local.get $p0
        local.get $p1
        local.get $p0
        i32.load offset=48
        i32.add
        i32.store offset=16
        local.get $p2
        local.set $l4
        br $B0
      end
      i32.const 0
      local.set $l4
      local.get $p0
      i32.const 0
      i32.store offset=28
      local.get $p0
      i64.const 0
      i64.store offset=16
      local.get $p0
      local.get $p0
      i32.load
      i32.const 32
      i32.or
      i32.store
      local.get $l7
      i32.const 2
      i32.eq
      br_if $B0
      local.get $p2
      local.get $p1
      i32.load offset=4
      i32.sub
      local.set $l4
    end
    local.get $l3
    i32.const 32
    i32.add
    global.set $__stack_pointer
    local.get $l4)
  (func $__emscripten_stdout_close (type $t1) (param $p0 i32) (result i32)
    i32.const 0)
  (func $__emscripten_stdout_seek (type $t5) (param $p0 i32) (param $p1 i64) (param $p2 i32) (result i64)
    i64.const 0)
  (func $__lockfile (type $t1) (param $p0 i32) (result i32)
    i32.const 1)
  (func $__unlockfile (type $t3) (param $p0 i32))
  (func $__errno_location (export "__errno_location") (type $t2) (result i32)
    i32.const 2920)
  (func $__lock (type $t3) (param $p0 i32))
  (func $__ofl_lock (type $t2) (result i32)
    i32.const 2924
    call $__lock
    i32.const 2928)
  (func $__stdio_exit (type $t4)
    (local $l0 i32)
    block $B0
      call $__ofl_lock
      i32.load
      local.tee $l0
      i32.eqz
      br_if $B0
      loop $L1
        local.get $l0
        call $close_file
        local.get $l0
        i32.load offset=56
        local.tee $l0
        br_if $L1
      end
    end
    i32.const 0
    i32.load offset=2932
    call $close_file
    i32.const 0
    i32.load offset=1728
    call $close_file
    i32.const 0
    i32.load offset=1880
    call $close_file)
  (func $close_file (type $t3) (param $p0 i32)
    (local $l1 i32) (local $l2 i32)
    block $B0
      local.get $p0
      i32.eqz
      br_if $B0
      block $B1
        local.get $p0
        i32.load offset=76
        i32.const 0
        i32.lt_s
        br_if $B1
        local.get $p0
        call $__lockfile
        drop
      end
      block $B2
        local.get $p0
        i32.load offset=20
        local.get $p0
        i32.load offset=28
        i32.eq
        br_if $B2
        local.get $p0
        i32.const 0
        i32.const 0
        local.get $p0
        i32.load offset=36
        call_indirect $__indirect_function_table (type $t0)
        drop
      end
      local.get $p0
      i32.load offset=4
      local.tee $l1
      local.get $p0
      i32.load offset=8
      local.tee $l2
      i32.eq
      br_if $B0
      local.get $p0
      local.get $l1
      local.get $l2
      i32.sub
      i64.extend_i32_s
      i32.const 1
      local.get $p0
      i32.load offset=40
      call_indirect $__indirect_function_table (type $t5)
      drop
    end)
  (func $__towrite (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32)
    local.get $p0
    local.get $p0
    i32.load offset=72
    local.tee $l1
    i32.const -1
    i32.add
    local.get $l1
    i32.or
    i32.store offset=72
    block $B0
      local.get $p0
      i32.load
      local.tee $l1
      i32.const 8
      i32.and
      i32.eqz
      br_if $B0
      local.get $p0
      local.get $l1
      i32.const 32
      i32.or
      i32.store
      i32.const -1
      return
    end
    local.get $p0
    i64.const 0
    i64.store offset=4 align=4
    local.get $p0
    local.get $p0
    i32.load offset=44
    local.tee $l1
    i32.store offset=28
    local.get $p0
    local.get $l1
    i32.store offset=20
    local.get $p0
    local.get $l1
    local.get $p0
    i32.load offset=48
    i32.add
    i32.store offset=16
    i32.const 0)
  (func $isdigit (type $t1) (param $p0 i32) (result i32)
    local.get $p0
    i32.const -48
    i32.add
    i32.const 10
    i32.lt_u)
  (func $memchr (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32)
    local.get $p2
    i32.const 0
    i32.ne
    local.set $l3
    block $B0
      block $B1
        block $B2
          local.get $p0
          i32.const 3
          i32.and
          i32.eqz
          br_if $B2
          local.get $p2
          i32.eqz
          br_if $B2
          local.get $p1
          i32.const 255
          i32.and
          local.set $l4
          loop $L3
            local.get $p0
            i32.load8_u
            local.get $l4
            i32.eq
            br_if $B1
            local.get $p2
            i32.const -1
            i32.add
            local.tee $p2
            i32.const 0
            i32.ne
            local.set $l3
            local.get $p0
            i32.const 1
            i32.add
            local.tee $p0
            i32.const 3
            i32.and
            i32.eqz
            br_if $B2
            local.get $p2
            br_if $L3
          end
        end
        local.get $l3
        i32.eqz
        br_if $B0
      end
      block $B4
        local.get $p0
        i32.load8_u
        local.get $p1
        i32.const 255
        i32.and
        i32.eq
        br_if $B4
        local.get $p2
        i32.const 4
        i32.lt_u
        br_if $B4
        local.get $p1
        i32.const 255
        i32.and
        i32.const 16843009
        i32.mul
        local.set $l4
        loop $L5
          local.get $p0
          i32.load
          local.get $l4
          i32.xor
          local.tee $l3
          i32.const -1
          i32.xor
          local.get $l3
          i32.const -16843009
          i32.add
          i32.and
          i32.const -2139062144
          i32.and
          br_if $B4
          local.get $p0
          i32.const 4
          i32.add
          local.set $p0
          local.get $p2
          i32.const -4
          i32.add
          local.tee $p2
          i32.const 3
          i32.gt_u
          br_if $L5
        end
      end
      local.get $p2
      i32.eqz
      br_if $B0
      local.get $p1
      i32.const 255
      i32.and
      local.set $l3
      loop $L6
        block $B7
          local.get $p0
          i32.load8_u
          local.get $l3
          i32.ne
          br_if $B7
          local.get $p0
          return
        end
        local.get $p0
        i32.const 1
        i32.add
        local.set $p0
        local.get $p2
        i32.const -1
        i32.add
        local.tee $p2
        br_if $L6
      end
    end
    i32.const 0)
  (func $strnlen (type $t7) (param $p0 i32) (param $p1 i32) (result i32)
    (local $l2 i32)
    local.get $p0
    i32.const 0
    local.get $p1
    call $memchr
    local.tee $l2
    local.get $p0
    i32.sub
    local.get $p1
    local.get $l2
    select)
  (func $frexp (type $t14) (param $p0 f64) (param $p1 i32) (result f64)
    (local $l2 i64) (local $l3 i32)
    block $B0
      local.get $p0
      i64.reinterpret_f64
      local.tee $l2
      i64.const 52
      i64.shr_u
      i32.wrap_i64
      i32.const 2047
      i32.and
      local.tee $l3
      i32.const 2047
      i32.eq
      br_if $B0
      block $B1
        local.get $l3
        br_if $B1
        block $B2
          block $B3
            local.get $p0
            f64.const 0x0p+0 (;=0;)
            f64.ne
            br_if $B3
            i32.const 0
            local.set $l3
            br $B2
          end
          local.get $p0
          f64.const 0x1p+64 (;=1.84467e+19;)
          f64.mul
          local.get $p1
          call $frexp
          local.set $p0
          local.get $p1
          i32.load
          i32.const -64
          i32.add
          local.set $l3
        end
        local.get $p1
        local.get $l3
        i32.store
        local.get $p0
        return
      end
      local.get $p1
      local.get $l3
      i32.const -1022
      i32.add
      i32.store
      local.get $l2
      i64.const -9218868437227405313
      i64.and
      i64.const 4602678819172646912
      i64.or
      f64.reinterpret_i64
      local.set $p0
    end
    local.get $p0)
  (func $__fwritex (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    block $B0
      block $B1
        local.get $p2
        i32.load offset=16
        local.tee $l3
        br_if $B1
        i32.const 0
        local.set $l4
        local.get $p2
        call $__towrite
        br_if $B0
        local.get $p2
        i32.load offset=16
        local.set $l3
      end
      block $B2
        local.get $l3
        local.get $p2
        i32.load offset=20
        local.tee $l5
        i32.sub
        local.get $p1
        i32.ge_u
        br_if $B2
        local.get $p2
        local.get $p0
        local.get $p1
        local.get $p2
        i32.load offset=36
        call_indirect $__indirect_function_table (type $t0)
        return
      end
      block $B3
        block $B4
          local.get $p2
          i32.load offset=80
          i32.const 0
          i32.ge_s
          br_if $B4
          i32.const 0
          local.set $l3
          br $B3
        end
        local.get $p1
        local.set $l4
        loop $L5
          block $B6
            local.get $l4
            local.tee $l3
            br_if $B6
            i32.const 0
            local.set $l3
            br $B3
          end
          local.get $p0
          local.get $l3
          i32.const -1
          i32.add
          local.tee $l4
          i32.add
          i32.load8_u
          i32.const 10
          i32.ne
          br_if $L5
        end
        local.get $p2
        local.get $p0
        local.get $l3
        local.get $p2
        i32.load offset=36
        call_indirect $__indirect_function_table (type $t0)
        local.tee $l4
        local.get $l3
        i32.lt_u
        br_if $B0
        local.get $p0
        local.get $l3
        i32.add
        local.set $p0
        local.get $p1
        local.get $l3
        i32.sub
        local.set $p1
        local.get $p2
        i32.load offset=20
        local.set $l5
      end
      local.get $l5
      local.get $p0
      local.get $p1
      call $__memcpy
      drop
      local.get $p2
      local.get $p2
      i32.load offset=20
      local.get $p1
      i32.add
      i32.store offset=20
      local.get $l3
      local.get $p1
      i32.add
      local.set $l4
    end
    local.get $l4)
  (func $__vfprintf_internal (type $t15) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (result i32)
    (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32)
    global.get $__stack_pointer
    i32.const 208
    i32.sub
    local.tee $l5
    global.set $__stack_pointer
    local.get $l5
    local.get $p2
    i32.store offset=204
    i32.const 0
    local.set $l6
    local.get $l5
    i32.const 160
    i32.add
    i32.const 0
    i32.const 40
    call $memset
    drop
    local.get $l5
    local.get $l5
    i32.load offset=204
    i32.store offset=200
    block $B0
      block $B1
        i32.const 0
        local.get $p1
        local.get $l5
        i32.const 200
        i32.add
        local.get $l5
        i32.const 80
        i32.add
        local.get $l5
        i32.const 160
        i32.add
        local.get $p3
        local.get $p4
        call $printf_core
        i32.const 0
        i32.ge_s
        br_if $B1
        i32.const -1
        local.set $p1
        br $B0
      end
      block $B2
        local.get $p0
        i32.load offset=76
        i32.const 0
        i32.lt_s
        br_if $B2
        local.get $p0
        call $__lockfile
        local.set $l6
      end
      local.get $p0
      i32.load
      local.set $l7
      block $B3
        local.get $p0
        i32.load offset=72
        i32.const 0
        i32.gt_s
        br_if $B3
        local.get $p0
        local.get $l7
        i32.const -33
        i32.and
        i32.store
      end
      block $B4
        block $B5
          block $B6
            block $B7
              local.get $p0
              i32.load offset=48
              br_if $B7
              local.get $p0
              i32.const 80
              i32.store offset=48
              local.get $p0
              i32.const 0
              i32.store offset=28
              local.get $p0
              i64.const 0
              i64.store offset=16
              local.get $p0
              i32.load offset=44
              local.set $l8
              local.get $p0
              local.get $l5
              i32.store offset=44
              br $B6
            end
            i32.const 0
            local.set $l8
            local.get $p0
            i32.load offset=16
            br_if $B5
          end
          i32.const -1
          local.set $p2
          local.get $p0
          call $__towrite
          br_if $B4
        end
        local.get $p0
        local.get $p1
        local.get $l5
        i32.const 200
        i32.add
        local.get $l5
        i32.const 80
        i32.add
        local.get $l5
        i32.const 160
        i32.add
        local.get $p3
        local.get $p4
        call $printf_core
        local.set $p2
      end
      local.get $l7
      i32.const 32
      i32.and
      local.set $p1
      block $B8
        local.get $l8
        i32.eqz
        br_if $B8
        local.get $p0
        i32.const 0
        i32.const 0
        local.get $p0
        i32.load offset=36
        call_indirect $__indirect_function_table (type $t0)
        drop
        local.get $p0
        i32.const 0
        i32.store offset=48
        local.get $p0
        local.get $l8
        i32.store offset=44
        local.get $p0
        i32.const 0
        i32.store offset=28
        local.get $p0
        i32.load offset=20
        local.set $p3
        local.get $p0
        i64.const 0
        i64.store offset=16
        local.get $p2
        i32.const -1
        local.get $p3
        select
        local.set $p2
      end
      local.get $p0
      local.get $p0
      i32.load
      local.tee $p3
      local.get $p1
      i32.or
      i32.store
      i32.const -1
      local.get $p2
      local.get $p3
      i32.const 32
      i32.and
      select
      local.set $p1
      local.get $l6
      i32.eqz
      br_if $B0
      local.get $p0
      call $__unlockfile
    end
    local.get $l5
    i32.const 208
    i32.add
    global.set $__stack_pointer
    local.get $p1)
  (func $printf_core (type $t16) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (param $p5 i32) (param $p6 i32) (result i32)
    (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i64)
    global.get $__stack_pointer
    i32.const 80
    i32.sub
    local.tee $l7
    global.set $__stack_pointer
    local.get $l7
    local.get $p1
    i32.store offset=76
    local.get $l7
    i32.const 55
    i32.add
    local.set $l8
    local.get $l7
    i32.const 56
    i32.add
    local.set $l9
    i32.const 0
    local.set $l10
    i32.const 0
    local.set $l11
    i32.const 0
    local.set $p1
    block $B0
      block $B1
        block $B2
          block $B3
            loop $L4
              local.get $p1
              i32.const 2147483647
              local.get $l11
              i32.sub
              i32.gt_s
              br_if $B3
              local.get $p1
              local.get $l11
              i32.add
              local.set $l11
              local.get $l7
              i32.load offset=76
              local.tee $l12
              local.set $p1
              block $B5
                block $B6
                  block $B7
                    block $B8
                      block $B9
                        local.get $l12
                        i32.load8_u
                        local.tee $l13
                        i32.eqz
                        br_if $B9
                        loop $L10
                          block $B11
                            block $B12
                              block $B13
                                local.get $l13
                                i32.const 255
                                i32.and
                                local.tee $l13
                                br_if $B13
                                local.get $p1
                                local.set $l13
                                br $B12
                              end
                              local.get $l13
                              i32.const 37
                              i32.ne
                              br_if $B11
                              local.get $p1
                              local.set $l13
                              loop $L14
                                local.get $p1
                                i32.load8_u offset=1
                                i32.const 37
                                i32.ne
                                br_if $B12
                                local.get $l7
                                local.get $p1
                                i32.const 2
                                i32.add
                                local.tee $l14
                                i32.store offset=76
                                local.get $l13
                                i32.const 1
                                i32.add
                                local.set $l13
                                local.get $p1
                                i32.load8_u offset=2
                                local.set $l15
                                local.get $l14
                                local.set $p1
                                local.get $l15
                                i32.const 37
                                i32.eq
                                br_if $L14
                              end
                            end
                            local.get $l13
                            local.get $l12
                            i32.sub
                            local.tee $p1
                            i32.const 2147483647
                            local.get $l11
                            i32.sub
                            local.tee $l13
                            i32.gt_s
                            br_if $B3
                            block $B15
                              local.get $p0
                              i32.eqz
                              br_if $B15
                              local.get $p0
                              local.get $l12
                              local.get $p1
                              call $out
                            end
                            local.get $p1
                            br_if $L4
                            i32.const -1
                            local.set $l16
                            i32.const 1
                            local.set $l14
                            local.get $l7
                            i32.load offset=76
                            i32.load8_s offset=1
                            call $isdigit
                            local.set $l15
                            local.get $l7
                            i32.load offset=76
                            local.set $p1
                            block $B16
                              local.get $l15
                              i32.eqz
                              br_if $B16
                              local.get $p1
                              i32.load8_u offset=2
                              i32.const 36
                              i32.ne
                              br_if $B16
                              local.get $p1
                              i32.load8_s offset=1
                              i32.const -48
                              i32.add
                              local.set $l16
                              i32.const 1
                              local.set $l10
                              i32.const 3
                              local.set $l14
                            end
                            local.get $l7
                            local.get $p1
                            local.get $l14
                            i32.add
                            local.tee $p1
                            i32.store offset=76
                            i32.const 0
                            local.set $l17
                            block $B17
                              block $B18
                                local.get $p1
                                i32.load8_s
                                local.tee $l18
                                i32.const -32
                                i32.add
                                local.tee $l15
                                i32.const 31
                                i32.le_u
                                br_if $B18
                                local.get $p1
                                local.set $l14
                                br $B17
                              end
                              i32.const 0
                              local.set $l17
                              local.get $p1
                              local.set $l14
                              i32.const 1
                              local.get $l15
                              i32.shl
                              local.tee $l15
                              i32.const 75913
                              i32.and
                              i32.eqz
                              br_if $B17
                              loop $L19
                                local.get $l7
                                local.get $p1
                                i32.const 1
                                i32.add
                                local.tee $l14
                                i32.store offset=76
                                local.get $l15
                                local.get $l17
                                i32.or
                                local.set $l17
                                local.get $p1
                                i32.load8_s offset=1
                                local.tee $l18
                                i32.const -32
                                i32.add
                                local.tee $l15
                                i32.const 32
                                i32.ge_u
                                br_if $B17
                                local.get $l14
                                local.set $p1
                                i32.const 1
                                local.get $l15
                                i32.shl
                                local.tee $l15
                                i32.const 75913
                                i32.and
                                br_if $L19
                              end
                            end
                            block $B20
                              block $B21
                                local.get $l18
                                i32.const 42
                                i32.ne
                                br_if $B21
                                block $B22
                                  block $B23
                                    local.get $l14
                                    i32.load8_s offset=1
                                    call $isdigit
                                    i32.eqz
                                    br_if $B23
                                    local.get $l7
                                    i32.load offset=76
                                    local.tee $l14
                                    i32.load8_u offset=2
                                    i32.const 36
                                    i32.ne
                                    br_if $B23
                                    local.get $l14
                                    i32.load8_s offset=1
                                    i32.const 2
                                    i32.shl
                                    local.get $p4
                                    i32.add
                                    i32.const -192
                                    i32.add
                                    i32.const 10
                                    i32.store
                                    local.get $l14
                                    i32.const 3
                                    i32.add
                                    local.set $p1
                                    local.get $l14
                                    i32.load8_s offset=1
                                    i32.const 3
                                    i32.shl
                                    local.get $p3
                                    i32.add
                                    i32.const -384
                                    i32.add
                                    i32.load
                                    local.set $l19
                                    i32.const 1
                                    local.set $l10
                                    br $B22
                                  end
                                  local.get $l10
                                  br_if $B8
                                  i32.const 0
                                  local.set $l10
                                  i32.const 0
                                  local.set $l19
                                  block $B24
                                    local.get $p0
                                    i32.eqz
                                    br_if $B24
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p1
                                    i32.load
                                    local.set $l19
                                  end
                                  local.get $l7
                                  i32.load offset=76
                                  i32.const 1
                                  i32.add
                                  local.set $p1
                                end
                                local.get $l7
                                local.get $p1
                                i32.store offset=76
                                local.get $l19
                                i32.const -1
                                i32.gt_s
                                br_if $B20
                                i32.const 0
                                local.get $l19
                                i32.sub
                                local.set $l19
                                local.get $l17
                                i32.const 8192
                                i32.or
                                local.set $l17
                                br $B20
                              end
                              local.get $l7
                              i32.const 76
                              i32.add
                              call $getint
                              local.tee $l19
                              i32.const 0
                              i32.lt_s
                              br_if $B3
                              local.get $l7
                              i32.load offset=76
                              local.set $p1
                            end
                            i32.const 0
                            local.set $l14
                            i32.const -1
                            local.set $l20
                            block $B25
                              block $B26
                                local.get $p1
                                i32.load8_u
                                i32.const 46
                                i32.eq
                                br_if $B26
                                i32.const 0
                                local.set $l21
                                br $B25
                              end
                              block $B27
                                local.get $p1
                                i32.load8_u offset=1
                                i32.const 42
                                i32.ne
                                br_if $B27
                                block $B28
                                  block $B29
                                    local.get $p1
                                    i32.load8_s offset=2
                                    call $isdigit
                                    i32.eqz
                                    br_if $B29
                                    local.get $l7
                                    i32.load offset=76
                                    local.tee $l15
                                    i32.load8_u offset=3
                                    i32.const 36
                                    i32.ne
                                    br_if $B29
                                    local.get $l15
                                    i32.load8_s offset=2
                                    i32.const 2
                                    i32.shl
                                    local.get $p4
                                    i32.add
                                    i32.const -192
                                    i32.add
                                    i32.const 10
                                    i32.store
                                    local.get $l15
                                    i32.const 4
                                    i32.add
                                    local.set $p1
                                    local.get $l15
                                    i32.load8_s offset=2
                                    i32.const 3
                                    i32.shl
                                    local.get $p3
                                    i32.add
                                    i32.const -384
                                    i32.add
                                    i32.load
                                    local.set $l20
                                    br $B28
                                  end
                                  local.get $l10
                                  br_if $B8
                                  block $B30
                                    block $B31
                                      local.get $p0
                                      br_if $B31
                                      i32.const 0
                                      local.set $l20
                                      br $B30
                                    end
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p1
                                    i32.load
                                    local.set $l20
                                  end
                                  local.get $l7
                                  i32.load offset=76
                                  i32.const 2
                                  i32.add
                                  local.set $p1
                                end
                                local.get $l7
                                local.get $p1
                                i32.store offset=76
                                local.get $l20
                                i32.const -1
                                i32.xor
                                i32.const 31
                                i32.shr_u
                                local.set $l21
                                br $B25
                              end
                              local.get $l7
                              local.get $p1
                              i32.const 1
                              i32.add
                              i32.store offset=76
                              i32.const 1
                              local.set $l21
                              local.get $l7
                              i32.const 76
                              i32.add
                              call $getint
                              local.set $l20
                              local.get $l7
                              i32.load offset=76
                              local.set $p1
                            end
                            loop $L32
                              local.get $l14
                              local.set $l15
                              i32.const 28
                              local.set $l22
                              local.get $p1
                              i32.load8_s
                              i32.const -123
                              i32.add
                              i32.const -58
                              i32.lt_u
                              br_if $B2
                              local.get $l7
                              local.get $p1
                              i32.const 1
                              i32.add
                              local.tee $l18
                              i32.store offset=76
                              local.get $p1
                              i32.load8_s
                              local.set $l14
                              local.get $l18
                              local.set $p1
                              local.get $l14
                              local.get $l15
                              i32.const 58
                              i32.mul
                              i32.add
                              i32.const 1039
                              i32.add
                              i32.load8_u
                              local.tee $l14
                              i32.const -1
                              i32.add
                              i32.const 8
                              i32.lt_u
                              br_if $L32
                            end
                            block $B33
                              block $B34
                                block $B35
                                  local.get $l14
                                  i32.const 27
                                  i32.eq
                                  br_if $B35
                                  local.get $l14
                                  i32.eqz
                                  br_if $B2
                                  block $B36
                                    local.get $l16
                                    i32.const 0
                                    i32.lt_s
                                    br_if $B36
                                    local.get $p4
                                    local.get $l16
                                    i32.const 2
                                    i32.shl
                                    i32.add
                                    local.get $l14
                                    i32.store
                                    local.get $l7
                                    local.get $p3
                                    local.get $l16
                                    i32.const 3
                                    i32.shl
                                    i32.add
                                    i64.load
                                    i64.store offset=64
                                    br $B34
                                  end
                                  local.get $p0
                                  i32.eqz
                                  br_if $B5
                                  local.get $l7
                                  i32.const 64
                                  i32.add
                                  local.get $l14
                                  local.get $p2
                                  local.get $p6
                                  call $pop_arg
                                  local.get $l7
                                  i32.load offset=76
                                  local.set $l18
                                  br $B33
                                end
                                local.get $l16
                                i32.const -1
                                i32.gt_s
                                br_if $B2
                              end
                              i32.const 0
                              local.set $p1
                              local.get $p0
                              i32.eqz
                              br_if $L4
                            end
                            local.get $l17
                            i32.const -65537
                            i32.and
                            local.tee $l23
                            local.get $l17
                            local.get $l17
                            i32.const 8192
                            i32.and
                            select
                            local.set $l14
                            i32.const 0
                            local.set $l17
                            i32.const 1024
                            local.set $l16
                            local.get $l9
                            local.set $l22
                            block $B37
                              block $B38
                                block $B39
                                  block $B40
                                    block $B41
                                      block $B42
                                        block $B43
                                          block $B44
                                            block $B45
                                              block $B46
                                                block $B47
                                                  block $B48
                                                    block $B49
                                                      block $B50
                                                        block $B51
                                                          block $B52
                                                            local.get $l18
                                                            i32.const -1
                                                            i32.add
                                                            i32.load8_s
                                                            local.tee $p1
                                                            i32.const -33
                                                            i32.and
                                                            local.get $p1
                                                            local.get $p1
                                                            i32.const 15
                                                            i32.and
                                                            i32.const 3
                                                            i32.eq
                                                            select
                                                            local.get $p1
                                                            local.get $l15
                                                            select
                                                            local.tee $p1
                                                            i32.const -88
                                                            i32.add
                                                            br_table $B48 $B6 $B6 $B6 $B6 $B6 $B6 $B6 $B6 $B38 $B6 $B37 $B46 $B38 $B38 $B38 $B6 $B46 $B6 $B6 $B6 $B6 $B50 $B47 $B49 $B6 $B6 $B43 $B6 $B51 $B6 $B6 $B48 $B52
                                                          end
                                                          local.get $l9
                                                          local.set $l22
                                                          block $B53
                                                            local.get $p1
                                                            i32.const -65
                                                            i32.add
                                                            br_table $B38 $B6 $B41 $B6 $B38 $B38 $B38 $B53
                                                          end
                                                          local.get $p1
                                                          i32.const 83
                                                          i32.eq
                                                          br_if $B42
                                                          br $B7
                                                        end
                                                        i32.const 0
                                                        local.set $l17
                                                        i32.const 1024
                                                        local.set $l16
                                                        local.get $l7
                                                        i64.load offset=64
                                                        local.set $l24
                                                        br $B45
                                                      end
                                                      i32.const 0
                                                      local.set $p1
                                                      block $B54
                                                        block $B55
                                                          block $B56
                                                            block $B57
                                                              block $B58
                                                                block $B59
                                                                  block $B60
                                                                    local.get $l15
                                                                    i32.const 255
                                                                    i32.and
                                                                    br_table $B60 $B59 $B58 $B57 $B56 $L4 $B55 $B54 $L4
                                                                  end
                                                                  local.get $l7
                                                                  i32.load offset=64
                                                                  local.get $l11
                                                                  i32.store
                                                                  br $L4
                                                                end
                                                                local.get $l7
                                                                i32.load offset=64
                                                                local.get $l11
                                                                i32.store
                                                                br $L4
                                                              end
                                                              local.get $l7
                                                              i32.load offset=64
                                                              local.get $l11
                                                              i64.extend_i32_s
                                                              i64.store
                                                              br $L4
                                                            end
                                                            local.get $l7
                                                            i32.load offset=64
                                                            local.get $l11
                                                            i32.store16
                                                            br $L4
                                                          end
                                                          local.get $l7
                                                          i32.load offset=64
                                                          local.get $l11
                                                          i32.store8
                                                          br $L4
                                                        end
                                                        local.get $l7
                                                        i32.load offset=64
                                                        local.get $l11
                                                        i32.store
                                                        br $L4
                                                      end
                                                      local.get $l7
                                                      i32.load offset=64
                                                      local.get $l11
                                                      i64.extend_i32_s
                                                      i64.store
                                                      br $L4
                                                    end
                                                    local.get $l20
                                                    i32.const 8
                                                    local.get $l20
                                                    i32.const 8
                                                    i32.gt_u
                                                    select
                                                    local.set $l20
                                                    local.get $l14
                                                    i32.const 8
                                                    i32.or
                                                    local.set $l14
                                                    i32.const 120
                                                    local.set $p1
                                                  end
                                                  local.get $l7
                                                  i64.load offset=64
                                                  local.get $l9
                                                  local.get $p1
                                                  i32.const 32
                                                  i32.and
                                                  call $fmt_x
                                                  local.set $l12
                                                  i32.const 0
                                                  local.set $l17
                                                  i32.const 1024
                                                  local.set $l16
                                                  local.get $l7
                                                  i64.load offset=64
                                                  i64.eqz
                                                  br_if $B44
                                                  local.get $l14
                                                  i32.const 8
                                                  i32.and
                                                  i32.eqz
                                                  br_if $B44
                                                  local.get $p1
                                                  i32.const 4
                                                  i32.shr_u
                                                  i32.const 1024
                                                  i32.add
                                                  local.set $l16
                                                  i32.const 2
                                                  local.set $l17
                                                  br $B44
                                                end
                                                i32.const 0
                                                local.set $l17
                                                i32.const 1024
                                                local.set $l16
                                                local.get $l7
                                                i64.load offset=64
                                                local.get $l9
                                                call $fmt_o
                                                local.set $l12
                                                local.get $l14
                                                i32.const 8
                                                i32.and
                                                i32.eqz
                                                br_if $B44
                                                local.get $l20
                                                local.get $l9
                                                local.get $l12
                                                i32.sub
                                                local.tee $p1
                                                i32.const 1
                                                i32.add
                                                local.get $l20
                                                local.get $p1
                                                i32.gt_s
                                                select
                                                local.set $l20
                                                br $B44
                                              end
                                              block $B61
                                                local.get $l7
                                                i64.load offset=64
                                                local.tee $l24
                                                i64.const -1
                                                i64.gt_s
                                                br_if $B61
                                                local.get $l7
                                                i64.const 0
                                                local.get $l24
                                                i64.sub
                                                local.tee $l24
                                                i64.store offset=64
                                                i32.const 1
                                                local.set $l17
                                                i32.const 1024
                                                local.set $l16
                                                br $B45
                                              end
                                              block $B62
                                                local.get $l14
                                                i32.const 2048
                                                i32.and
                                                i32.eqz
                                                br_if $B62
                                                i32.const 1
                                                local.set $l17
                                                i32.const 1025
                                                local.set $l16
                                                br $B45
                                              end
                                              i32.const 1026
                                              i32.const 1024
                                              local.get $l14
                                              i32.const 1
                                              i32.and
                                              local.tee $l17
                                              select
                                              local.set $l16
                                            end
                                            local.get $l24
                                            local.get $l9
                                            call $fmt_u
                                            local.set $l12
                                          end
                                          block $B63
                                            local.get $l21
                                            i32.eqz
                                            br_if $B63
                                            local.get $l20
                                            i32.const 0
                                            i32.lt_s
                                            br_if $B3
                                          end
                                          local.get $l14
                                          i32.const -65537
                                          i32.and
                                          local.get $l14
                                          local.get $l21
                                          select
                                          local.set $l14
                                          block $B64
                                            local.get $l7
                                            i64.load offset=64
                                            local.tee $l24
                                            i64.const 0
                                            i64.ne
                                            br_if $B64
                                            local.get $l20
                                            br_if $B64
                                            local.get $l9
                                            local.set $l12
                                            local.get $l9
                                            local.set $l22
                                            i32.const 0
                                            local.set $l20
                                            br $B6
                                          end
                                          local.get $l20
                                          local.get $l9
                                          local.get $l12
                                          i32.sub
                                          local.get $l24
                                          i64.eqz
                                          i32.add
                                          local.tee $p1
                                          local.get $l20
                                          local.get $p1
                                          i32.gt_s
                                          select
                                          local.set $l20
                                          br $B7
                                        end
                                        i32.const 0
                                        local.set $l17
                                        local.get $l7
                                        i32.load offset=64
                                        local.tee $p1
                                        i32.const 1074
                                        local.get $p1
                                        select
                                        local.set $l12
                                        local.get $l12
                                        local.get $l12
                                        i32.const 2147483647
                                        local.get $l20
                                        local.get $l20
                                        i32.const 0
                                        i32.lt_s
                                        select
                                        call $strnlen
                                        local.tee $p1
                                        i32.add
                                        local.set $l22
                                        block $B65
                                          local.get $l20
                                          i32.const -1
                                          i32.le_s
                                          br_if $B65
                                          local.get $l23
                                          local.set $l14
                                          local.get $p1
                                          local.set $l20
                                          br $B6
                                        end
                                        local.get $l23
                                        local.set $l14
                                        local.get $p1
                                        local.set $l20
                                        local.get $l22
                                        i32.load8_u
                                        br_if $B3
                                        br $B6
                                      end
                                      block $B66
                                        local.get $l20
                                        i32.eqz
                                        br_if $B66
                                        local.get $l7
                                        i32.load offset=64
                                        local.set $l13
                                        br $B40
                                      end
                                      i32.const 0
                                      local.set $p1
                                      local.get $p0
                                      i32.const 32
                                      local.get $l19
                                      i32.const 0
                                      local.get $l14
                                      call $pad
                                      br $B39
                                    end
                                    local.get $l7
                                    i32.const 0
                                    i32.store offset=12
                                    local.get $l7
                                    local.get $l7
                                    i64.load offset=64
                                    i64.store32 offset=8
                                    local.get $l7
                                    local.get $l7
                                    i32.const 8
                                    i32.add
                                    i32.store offset=64
                                    i32.const -1
                                    local.set $l20
                                    local.get $l7
                                    i32.const 8
                                    i32.add
                                    local.set $l13
                                  end
                                  i32.const 0
                                  local.set $p1
                                  block $B67
                                    loop $L68
                                      local.get $l13
                                      i32.load
                                      local.tee $l15
                                      i32.eqz
                                      br_if $B67
                                      block $B69
                                        local.get $l7
                                        i32.const 4
                                        i32.add
                                        local.get $l15
                                        call $wctomb
                                        local.tee $l15
                                        i32.const 0
                                        i32.lt_s
                                        local.tee $l12
                                        br_if $B69
                                        local.get $l15
                                        local.get $l20
                                        local.get $p1
                                        i32.sub
                                        i32.gt_u
                                        br_if $B69
                                        local.get $l13
                                        i32.const 4
                                        i32.add
                                        local.set $l13
                                        local.get $l20
                                        local.get $l15
                                        local.get $p1
                                        i32.add
                                        local.tee $p1
                                        i32.gt_u
                                        br_if $L68
                                        br $B67
                                      end
                                    end
                                    local.get $l12
                                    br_if $B1
                                  end
                                  i32.const 61
                                  local.set $l22
                                  local.get $p1
                                  i32.const 0
                                  i32.lt_s
                                  br_if $B2
                                  local.get $p0
                                  i32.const 32
                                  local.get $l19
                                  local.get $p1
                                  local.get $l14
                                  call $pad
                                  block $B70
                                    local.get $p1
                                    br_if $B70
                                    i32.const 0
                                    local.set $p1
                                    br $B39
                                  end
                                  i32.const 0
                                  local.set $l15
                                  local.get $l7
                                  i32.load offset=64
                                  local.set $l13
                                  loop $L71
                                    local.get $l13
                                    i32.load
                                    local.tee $l12
                                    i32.eqz
                                    br_if $B39
                                    local.get $l7
                                    i32.const 4
                                    i32.add
                                    local.get $l12
                                    call $wctomb
                                    local.tee $l12
                                    local.get $l15
                                    i32.add
                                    local.tee $l15
                                    local.get $p1
                                    i32.gt_u
                                    br_if $B39
                                    local.get $p0
                                    local.get $l7
                                    i32.const 4
                                    i32.add
                                    local.get $l12
                                    call $out
                                    local.get $l13
                                    i32.const 4
                                    i32.add
                                    local.set $l13
                                    local.get $l15
                                    local.get $p1
                                    i32.lt_u
                                    br_if $L71
                                  end
                                end
                                local.get $p0
                                i32.const 32
                                local.get $l19
                                local.get $p1
                                local.get $l14
                                i32.const 8192
                                i32.xor
                                call $pad
                                local.get $l19
                                local.get $p1
                                local.get $l19
                                local.get $p1
                                i32.gt_s
                                select
                                local.set $p1
                                br $L4
                              end
                              block $B72
                                local.get $l21
                                i32.eqz
                                br_if $B72
                                local.get $l20
                                i32.const 0
                                i32.lt_s
                                br_if $B3
                              end
                              i32.const 61
                              local.set $l22
                              local.get $p0
                              local.get $l7
                              f64.load offset=64
                              local.get $l19
                              local.get $l20
                              local.get $l14
                              local.get $p1
                              local.get $p5
                              call_indirect $__indirect_function_table (type $t9)
                              local.tee $p1
                              i32.const 0
                              i32.ge_s
                              br_if $L4
                              br $B2
                            end
                            local.get $l7
                            local.get $l7
                            i64.load offset=64
                            i64.store8 offset=55
                            i32.const 1
                            local.set $l20
                            local.get $l8
                            local.set $l12
                            local.get $l9
                            local.set $l22
                            local.get $l23
                            local.set $l14
                            br $B6
                          end
                          local.get $l7
                          local.get $p1
                          i32.const 1
                          i32.add
                          local.tee $l14
                          i32.store offset=76
                          local.get $p1
                          i32.load8_u offset=1
                          local.set $l13
                          local.get $l14
                          local.set $p1
                          br $L10
                        end
                        unreachable
                      end
                      local.get $p0
                      br_if $B0
                      local.get $l10
                      i32.eqz
                      br_if $B5
                      i32.const 1
                      local.set $p1
                      block $B73
                        loop $L74
                          local.get $p4
                          local.get $p1
                          i32.const 2
                          i32.shl
                          i32.add
                          i32.load
                          local.tee $l13
                          i32.eqz
                          br_if $B73
                          local.get $p3
                          local.get $p1
                          i32.const 3
                          i32.shl
                          i32.add
                          local.get $l13
                          local.get $p2
                          local.get $p6
                          call $pop_arg
                          i32.const 1
                          local.set $l11
                          local.get $p1
                          i32.const 1
                          i32.add
                          local.tee $p1
                          i32.const 10
                          i32.ne
                          br_if $L74
                          br $B0
                        end
                        unreachable
                      end
                      i32.const 1
                      local.set $l11
                      local.get $p1
                      i32.const 10
                      i32.ge_u
                      br_if $B0
                      loop $L75
                        local.get $p4
                        local.get $p1
                        i32.const 2
                        i32.shl
                        i32.add
                        i32.load
                        br_if $B8
                        i32.const 1
                        local.set $l11
                        local.get $p1
                        i32.const 1
                        i32.add
                        local.tee $p1
                        i32.const 10
                        i32.eq
                        br_if $B0
                        br $L75
                      end
                      unreachable
                    end
                    i32.const 28
                    local.set $l22
                    br $B2
                  end
                  local.get $l9
                  local.set $l22
                end
                local.get $l22
                local.get $l12
                i32.sub
                local.tee $l18
                local.get $l20
                local.get $l20
                local.get $l18
                i32.lt_s
                select
                local.tee $l20
                i32.const 2147483647
                local.get $l17
                i32.sub
                i32.gt_s
                br_if $B3
                i32.const 61
                local.set $l22
                local.get $l17
                local.get $l20
                i32.add
                local.tee $l15
                local.get $l19
                local.get $l19
                local.get $l15
                i32.lt_s
                select
                local.tee $p1
                local.get $l13
                i32.gt_s
                br_if $B2
                local.get $p0
                i32.const 32
                local.get $p1
                local.get $l15
                local.get $l14
                call $pad
                local.get $p0
                local.get $l16
                local.get $l17
                call $out
                local.get $p0
                i32.const 48
                local.get $p1
                local.get $l15
                local.get $l14
                i32.const 65536
                i32.xor
                call $pad
                local.get $p0
                i32.const 48
                local.get $l20
                local.get $l18
                i32.const 0
                call $pad
                local.get $p0
                local.get $l12
                local.get $l18
                call $out
                local.get $p0
                i32.const 32
                local.get $p1
                local.get $l15
                local.get $l14
                i32.const 8192
                i32.xor
                call $pad
                br $L4
              end
            end
            i32.const 0
            local.set $l11
            br $B0
          end
          i32.const 61
          local.set $l22
        end
        call $__errno_location
        local.get $l22
        i32.store
      end
      i32.const -1
      local.set $l11
    end
    local.get $l7
    i32.const 80
    i32.add
    global.set $__stack_pointer
    local.get $l11)
  (func $out (type $t17) (param $p0 i32) (param $p1 i32) (param $p2 i32)
    block $B0
      local.get $p0
      i32.load8_u
      i32.const 32
      i32.and
      br_if $B0
      local.get $p1
      local.get $p2
      local.get $p0
      call $__fwritex
      drop
    end)
  (func $getint (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32)
    i32.const 0
    local.set $l1
    block $B0
      local.get $p0
      i32.load
      i32.load8_s
      call $isdigit
      br_if $B0
      i32.const 0
      return
    end
    loop $L1
      local.get $p0
      i32.load
      local.set $l2
      i32.const -1
      local.set $l3
      block $B2
        local.get $l1
        i32.const 214748364
        i32.gt_u
        br_if $B2
        i32.const -1
        local.get $l2
        i32.load8_s
        i32.const -48
        i32.add
        local.tee $l3
        local.get $l1
        i32.const 10
        i32.mul
        local.tee $l1
        i32.add
        local.get $l3
        i32.const 2147483647
        local.get $l1
        i32.sub
        i32.gt_s
        select
        local.set $l3
      end
      local.get $p0
      local.get $l2
      i32.const 1
      i32.add
      i32.store
      local.get $l3
      local.set $l1
      local.get $l2
      i32.load8_s offset=1
      call $isdigit
      br_if $L1
    end
    local.get $l3)
  (func $pop_arg (type $t8) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32)
    block $B0
      block $B1
        block $B2
          block $B3
            block $B4
              block $B5
                block $B6
                  block $B7
                    block $B8
                      block $B9
                        block $B10
                          block $B11
                            block $B12
                              block $B13
                                block $B14
                                  block $B15
                                    block $B16
                                      block $B17
                                        block $B18
                                          local.get $p1
                                          i32.const -9
                                          i32.add
                                          br_table $B18 $B17 $B16 $B13 $B15 $B14 $B12 $B11 $B10 $B9 $B8 $B7 $B6 $B5 $B4 $B3 $B2 $B1 $B0
                                        end
                                        local.get $p2
                                        local.get $p2
                                        i32.load
                                        local.tee $p1
                                        i32.const 4
                                        i32.add
                                        i32.store
                                        local.get $p0
                                        local.get $p1
                                        i32.load
                                        i32.store
                                        return
                                      end
                                      local.get $p2
                                      local.get $p2
                                      i32.load
                                      local.tee $p1
                                      i32.const 4
                                      i32.add
                                      i32.store
                                      local.get $p0
                                      local.get $p1
                                      i64.load32_s
                                      i64.store
                                      return
                                    end
                                    local.get $p2
                                    local.get $p2
                                    i32.load
                                    local.tee $p1
                                    i32.const 4
                                    i32.add
                                    i32.store
                                    local.get $p0
                                    local.get $p1
                                    i64.load32_u
                                    i64.store
                                    return
                                  end
                                  local.get $p2
                                  local.get $p2
                                  i32.load
                                  local.tee $p1
                                  i32.const 4
                                  i32.add
                                  i32.store
                                  local.get $p0
                                  local.get $p1
                                  i64.load32_s
                                  i64.store
                                  return
                                end
                                local.get $p2
                                local.get $p2
                                i32.load
                                local.tee $p1
                                i32.const 4
                                i32.add
                                i32.store
                                local.get $p0
                                local.get $p1
                                i64.load32_u
                                i64.store
                                return
                              end
                              local.get $p2
                              local.get $p2
                              i32.load
                              i32.const 7
                              i32.add
                              i32.const -8
                              i32.and
                              local.tee $p1
                              i32.const 8
                              i32.add
                              i32.store
                              local.get $p0
                              local.get $p1
                              i64.load
                              i64.store
                              return
                            end
                            local.get $p2
                            local.get $p2
                            i32.load
                            local.tee $p1
                            i32.const 4
                            i32.add
                            i32.store
                            local.get $p0
                            local.get $p1
                            i64.load16_s
                            i64.store
                            return
                          end
                          local.get $p2
                          local.get $p2
                          i32.load
                          local.tee $p1
                          i32.const 4
                          i32.add
                          i32.store
                          local.get $p0
                          local.get $p1
                          i64.load16_u
                          i64.store
                          return
                        end
                        local.get $p2
                        local.get $p2
                        i32.load
                        local.tee $p1
                        i32.const 4
                        i32.add
                        i32.store
                        local.get $p0
                        local.get $p1
                        i64.load8_s
                        i64.store
                        return
                      end
                      local.get $p2
                      local.get $p2
                      i32.load
                      local.tee $p1
                      i32.const 4
                      i32.add
                      i32.store
                      local.get $p0
                      local.get $p1
                      i64.load8_u
                      i64.store
                      return
                    end
                    local.get $p2
                    local.get $p2
                    i32.load
                    i32.const 7
                    i32.add
                    i32.const -8
                    i32.and
                    local.tee $p1
                    i32.const 8
                    i32.add
                    i32.store
                    local.get $p0
                    local.get $p1
                    i64.load
                    i64.store
                    return
                  end
                  local.get $p2
                  local.get $p2
                  i32.load
                  local.tee $p1
                  i32.const 4
                  i32.add
                  i32.store
                  local.get $p0
                  local.get $p1
                  i64.load32_u
                  i64.store
                  return
                end
                local.get $p2
                local.get $p2
                i32.load
                i32.const 7
                i32.add
                i32.const -8
                i32.and
                local.tee $p1
                i32.const 8
                i32.add
                i32.store
                local.get $p0
                local.get $p1
                i64.load
                i64.store
                return
              end
              local.get $p2
              local.get $p2
              i32.load
              i32.const 7
              i32.add
              i32.const -8
              i32.and
              local.tee $p1
              i32.const 8
              i32.add
              i32.store
              local.get $p0
              local.get $p1
              i64.load
              i64.store
              return
            end
            local.get $p2
            local.get $p2
            i32.load
            local.tee $p1
            i32.const 4
            i32.add
            i32.store
            local.get $p0
            local.get $p1
            i64.load32_s
            i64.store
            return
          end
          local.get $p2
          local.get $p2
          i32.load
          local.tee $p1
          i32.const 4
          i32.add
          i32.store
          local.get $p0
          local.get $p1
          i64.load32_u
          i64.store
          return
        end
        local.get $p2
        local.get $p2
        i32.load
        i32.const 7
        i32.add
        i32.const -8
        i32.and
        local.tee $p1
        i32.const 8
        i32.add
        i32.store
        local.get $p0
        local.get $p1
        f64.load
        f64.store
        return
      end
      local.get $p0
      local.get $p2
      local.get $p3
      call_indirect $__indirect_function_table (type $t6)
    end)
  (func $fmt_x (type $t18) (param $p0 i64) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32)
    block $B0
      local.get $p0
      i64.eqz
      br_if $B0
      loop $L1
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        i32.wrap_i64
        i32.const 15
        i32.and
        i32.const 1568
        i32.add
        i32.load8_u
        local.get $p2
        i32.or
        i32.store8
        local.get $p0
        i64.const 15
        i64.gt_u
        local.set $l3
        local.get $p0
        i64.const 4
        i64.shr_u
        local.set $p0
        local.get $l3
        br_if $L1
      end
    end
    local.get $p1)
  (func $fmt_o (type $t10) (param $p0 i64) (param $p1 i32) (result i32)
    (local $l2 i32)
    block $B0
      local.get $p0
      i64.eqz
      br_if $B0
      loop $L1
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        i32.wrap_i64
        i32.const 7
        i32.and
        i32.const 48
        i32.or
        i32.store8
        local.get $p0
        i64.const 7
        i64.gt_u
        local.set $l2
        local.get $p0
        i64.const 3
        i64.shr_u
        local.set $p0
        local.get $l2
        br_if $L1
      end
    end
    local.get $p1)
  (func $fmt_u (type $t10) (param $p0 i64) (param $p1 i32) (result i32)
    (local $l2 i64) (local $l3 i32) (local $l4 i32) (local $l5 i32)
    block $B0
      block $B1
        local.get $p0
        i64.const 4294967296
        i64.ge_u
        br_if $B1
        local.get $p0
        local.set $l2
        br $B0
      end
      loop $L2
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $p0
        local.get $p0
        i64.const 10
        i64.div_u
        local.tee $l2
        i64.const 10
        i64.mul
        i64.sub
        i32.wrap_i64
        i32.const 48
        i32.or
        i32.store8
        local.get $p0
        i64.const 42949672959
        i64.gt_u
        local.set $l3
        local.get $l2
        local.set $p0
        local.get $l3
        br_if $L2
      end
    end
    block $B3
      local.get $l2
      i32.wrap_i64
      local.tee $l3
      i32.eqz
      br_if $B3
      loop $L4
        local.get $p1
        i32.const -1
        i32.add
        local.tee $p1
        local.get $l3
        local.get $l3
        i32.const 10
        i32.div_u
        local.tee $l4
        i32.const 10
        i32.mul
        i32.sub
        i32.const 48
        i32.or
        i32.store8
        local.get $l3
        i32.const 9
        i32.gt_u
        local.set $l5
        local.get $l4
        local.set $l3
        local.get $l5
        br_if $L4
      end
    end
    local.get $p1)
  (func $pad (type $t19) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32)
    (local $l5 i32)
    global.get $__stack_pointer
    i32.const 256
    i32.sub
    local.tee $l5
    global.set $__stack_pointer
    block $B0
      local.get $p2
      local.get $p3
      i32.le_s
      br_if $B0
      local.get $p4
      i32.const 73728
      i32.and
      br_if $B0
      local.get $l5
      local.get $p1
      i32.const 255
      i32.and
      local.get $p2
      local.get $p3
      i32.sub
      local.tee $p2
      i32.const 256
      local.get $p2
      i32.const 256
      i32.lt_u
      local.tee $p3
      select
      call $memset
      drop
      block $B1
        local.get $p3
        br_if $B1
        loop $L2
          local.get $p0
          local.get $l5
          i32.const 256
          call $out
          local.get $p2
          i32.const -256
          i32.add
          local.tee $p2
          i32.const 255
          i32.gt_u
          br_if $L2
        end
      end
      local.get $p0
      local.get $l5
      local.get $p2
      call $out
    end
    local.get $l5
    i32.const 256
    i32.add
    global.set $__stack_pointer)
  (func $vfprintf (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    local.get $p0
    local.get $p1
    local.get $p2
    i32.const 5
    i32.const 6
    call $__vfprintf_internal)
  (func $fmt_fp (type $t9) (param $p0 i32) (param $p1 f64) (param $p2 i32) (param $p3 i32) (param $p4 i32) (param $p5 i32) (result i32)
    (local $l6 i32) (local $l7 i32) (local $l8 i64) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i64) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 f64)
    global.get $__stack_pointer
    i32.const 560
    i32.sub
    local.tee $l6
    global.set $__stack_pointer
    i32.const 0
    local.set $l7
    local.get $l6
    i32.const 0
    i32.store offset=44
    block $B0
      block $B1
        local.get $p1
        call $__DOUBLE_BITS
        local.tee $l8
        i64.const -1
        i64.gt_s
        br_if $B1
        i32.const 1
        local.set $l9
        i32.const 1034
        local.set $l10
        local.get $p1
        f64.neg
        local.tee $p1
        call $__DOUBLE_BITS
        local.set $l8
        br $B0
      end
      block $B2
        local.get $p4
        i32.const 2048
        i32.and
        i32.eqz
        br_if $B2
        i32.const 1
        local.set $l9
        i32.const 1037
        local.set $l10
        br $B0
      end
      i32.const 1040
      i32.const 1035
      local.get $p4
      i32.const 1
      i32.and
      local.tee $l9
      select
      local.set $l10
      local.get $l9
      i32.eqz
      local.set $l7
    end
    block $B3
      block $B4
        local.get $l8
        i64.const 9218868437227405312
        i64.and
        i64.const 9218868437227405312
        i64.ne
        br_if $B4
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l9
        i32.const 3
        i32.add
        local.tee $l11
        local.get $p4
        i32.const -65537
        i32.and
        call $pad
        local.get $p0
        local.get $l10
        local.get $l9
        call $out
        local.get $p0
        i32.const 1053
        i32.const 1064
        local.get $p5
        i32.const 32
        i32.and
        local.tee $l12
        select
        i32.const 1057
        i32.const 1068
        local.get $l12
        select
        local.get $p1
        local.get $p1
        f64.ne
        select
        i32.const 3
        call $out
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l11
        local.get $p4
        i32.const 8192
        i32.xor
        call $pad
        local.get $p2
        local.get $l11
        local.get $l11
        local.get $p2
        i32.lt_s
        select
        local.set $l13
        br $B3
      end
      local.get $l6
      i32.const 16
      i32.add
      local.set $l14
      block $B5
        block $B6
          block $B7
            block $B8
              local.get $p1
              local.get $l6
              i32.const 44
              i32.add
              call $frexp
              local.tee $p1
              local.get $p1
              f64.add
              local.tee $p1
              f64.const 0x0p+0 (;=0;)
              f64.eq
              br_if $B8
              local.get $l6
              local.get $l6
              i32.load offset=44
              local.tee $l11
              i32.const -1
              i32.add
              i32.store offset=44
              local.get $p5
              i32.const 32
              i32.or
              local.tee $l15
              i32.const 97
              i32.ne
              br_if $B7
              br $B5
            end
            local.get $p5
            i32.const 32
            i32.or
            local.tee $l15
            i32.const 97
            i32.eq
            br_if $B5
            i32.const 6
            local.get $p3
            local.get $p3
            i32.const 0
            i32.lt_s
            select
            local.set $l16
            local.get $l6
            i32.load offset=44
            local.set $l17
            br $B6
          end
          local.get $l6
          local.get $l11
          i32.const -29
          i32.add
          local.tee $l17
          i32.store offset=44
          i32.const 6
          local.get $p3
          local.get $p3
          i32.const 0
          i32.lt_s
          select
          local.set $l16
          local.get $p1
          f64.const 0x1p+28 (;=2.68435e+08;)
          f64.mul
          local.set $p1
        end
        local.get $l6
        i32.const 48
        i32.add
        local.get $l6
        i32.const 336
        i32.add
        local.get $l17
        i32.const 0
        i32.lt_s
        select
        local.tee $l18
        local.set $l12
        loop $L9
          block $B10
            block $B11
              local.get $p1
              f64.const 0x1p+32 (;=4.29497e+09;)
              f64.lt
              local.get $p1
              f64.const 0x0p+0 (;=0;)
              f64.ge
              i32.and
              i32.eqz
              br_if $B11
              local.get $p1
              i32.trunc_f64_u
              local.set $l11
              br $B10
            end
            i32.const 0
            local.set $l11
          end
          local.get $l12
          local.get $l11
          i32.store
          local.get $l12
          i32.const 4
          i32.add
          local.set $l12
          local.get $p1
          local.get $l11
          f64.convert_i32_u
          f64.sub
          f64.const 0x1.dcd65p+29 (;=1e+09;)
          f64.mul
          local.tee $p1
          f64.const 0x0p+0 (;=0;)
          f64.ne
          br_if $L9
        end
        block $B12
          block $B13
            local.get $l17
            i32.const 1
            i32.ge_s
            br_if $B13
            local.get $l17
            local.set $p3
            local.get $l12
            local.set $l11
            local.get $l18
            local.set $l19
            br $B12
          end
          local.get $l18
          local.set $l19
          local.get $l17
          local.set $p3
          loop $L14
            local.get $p3
            i32.const 29
            local.get $p3
            i32.const 29
            i32.lt_u
            select
            local.set $p3
            block $B15
              local.get $l12
              i32.const -4
              i32.add
              local.tee $l11
              local.get $l19
              i32.lt_u
              br_if $B15
              local.get $p3
              i64.extend_i32_u
              local.set $l20
              i64.const 0
              local.set $l8
              loop $L16
                local.get $l11
                local.get $l11
                i64.load32_u
                local.get $l20
                i64.shl
                local.get $l8
                i64.const 4294967295
                i64.and
                i64.add
                local.tee $l8
                local.get $l8
                i64.const 1000000000
                i64.div_u
                local.tee $l8
                i64.const 1000000000
                i64.mul
                i64.sub
                i64.store32
                local.get $l11
                i32.const -4
                i32.add
                local.tee $l11
                local.get $l19
                i32.ge_u
                br_if $L16
              end
              local.get $l8
              i32.wrap_i64
              local.tee $l11
              i32.eqz
              br_if $B15
              local.get $l19
              i32.const -4
              i32.add
              local.tee $l19
              local.get $l11
              i32.store
            end
            block $B17
              loop $L18
                local.get $l12
                local.tee $l11
                local.get $l19
                i32.le_u
                br_if $B17
                local.get $l11
                i32.const -4
                i32.add
                local.tee $l12
                i32.load
                i32.eqz
                br_if $L18
              end
            end
            local.get $l6
            local.get $l6
            i32.load offset=44
            local.get $p3
            i32.sub
            local.tee $p3
            i32.store offset=44
            local.get $l11
            local.set $l12
            local.get $p3
            i32.const 0
            i32.gt_s
            br_if $L14
          end
        end
        block $B19
          local.get $p3
          i32.const -1
          i32.gt_s
          br_if $B19
          local.get $l16
          i32.const 25
          i32.add
          i32.const 9
          i32.div_u
          i32.const 1
          i32.add
          local.set $l21
          local.get $l15
          i32.const 102
          i32.eq
          local.set $l22
          loop $L20
            i32.const 0
            local.get $p3
            i32.sub
            local.tee $l12
            i32.const 9
            local.get $l12
            i32.const 9
            i32.lt_u
            select
            local.set $l23
            block $B21
              block $B22
                local.get $l19
                local.get $l11
                i32.lt_u
                br_if $B22
                local.get $l19
                i32.load
                local.set $l12
                br $B21
              end
              i32.const 1000000000
              local.get $l23
              i32.shr_u
              local.set $l24
              i32.const -1
              local.get $l23
              i32.shl
              i32.const -1
              i32.xor
              local.set $l25
              i32.const 0
              local.set $p3
              local.get $l19
              local.set $l12
              loop $L23
                local.get $l12
                local.get $l12
                i32.load
                local.tee $l13
                local.get $l23
                i32.shr_u
                local.get $p3
                i32.add
                i32.store
                local.get $l13
                local.get $l25
                i32.and
                local.get $l24
                i32.mul
                local.set $p3
                local.get $l12
                i32.const 4
                i32.add
                local.tee $l12
                local.get $l11
                i32.lt_u
                br_if $L23
              end
              local.get $l19
              i32.load
              local.set $l12
              local.get $p3
              i32.eqz
              br_if $B21
              local.get $l11
              local.get $p3
              i32.store
              local.get $l11
              i32.const 4
              i32.add
              local.set $l11
            end
            local.get $l6
            local.get $l6
            i32.load offset=44
            local.get $l23
            i32.add
            local.tee $p3
            i32.store offset=44
            local.get $l18
            local.get $l19
            local.get $l12
            i32.eqz
            i32.const 2
            i32.shl
            i32.add
            local.tee $l19
            local.get $l22
            select
            local.tee $l12
            local.get $l21
            i32.const 2
            i32.shl
            i32.add
            local.get $l11
            local.get $l11
            local.get $l12
            i32.sub
            i32.const 2
            i32.shr_s
            local.get $l21
            i32.gt_s
            select
            local.set $l11
            local.get $p3
            i32.const 0
            i32.lt_s
            br_if $L20
          end
        end
        i32.const 0
        local.set $p3
        block $B24
          local.get $l19
          local.get $l11
          i32.ge_u
          br_if $B24
          local.get $l18
          local.get $l19
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          local.set $p3
          i32.const 10
          local.set $l12
          local.get $l19
          i32.load
          local.tee $l13
          i32.const 10
          i32.lt_u
          br_if $B24
          loop $L25
            local.get $p3
            i32.const 1
            i32.add
            local.set $p3
            local.get $l13
            local.get $l12
            i32.const 10
            i32.mul
            local.tee $l12
            i32.ge_u
            br_if $L25
          end
        end
        block $B26
          local.get $l16
          i32.const 0
          local.get $p3
          local.get $l15
          i32.const 102
          i32.eq
          select
          i32.sub
          local.get $l16
          i32.const 0
          i32.ne
          local.get $l15
          i32.const 103
          i32.eq
          i32.and
          i32.sub
          local.tee $l12
          local.get $l11
          local.get $l18
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          i32.const -9
          i32.add
          i32.ge_s
          br_if $B26
          local.get $l12
          i32.const 9216
          i32.add
          local.tee $l13
          i32.const 9
          i32.div_s
          local.tee $l24
          i32.const 2
          i32.shl
          local.get $l6
          i32.const 48
          i32.add
          i32.const 4
          i32.const 292
          local.get $l17
          i32.const 0
          i32.lt_s
          select
          i32.add
          i32.add
          i32.const -4096
          i32.add
          local.set $l23
          i32.const 10
          local.set $l12
          block $B27
            local.get $l13
            local.get $l24
            i32.const 9
            i32.mul
            i32.sub
            local.tee $l13
            i32.const 7
            i32.gt_s
            br_if $B27
            loop $L28
              local.get $l12
              i32.const 10
              i32.mul
              local.set $l12
              local.get $l13
              i32.const 1
              i32.add
              local.tee $l13
              i32.const 8
              i32.ne
              br_if $L28
            end
          end
          local.get $l23
          i32.const 4
          i32.add
          local.set $l25
          block $B29
            block $B30
              local.get $l23
              i32.load
              local.tee $l13
              local.get $l13
              local.get $l12
              i32.div_u
              local.tee $l21
              local.get $l12
              i32.mul
              i32.sub
              local.tee $l24
              br_if $B30
              local.get $l25
              local.get $l11
              i32.eq
              br_if $B29
            end
            block $B31
              block $B32
                local.get $l21
                i32.const 1
                i32.and
                br_if $B32
                f64.const 0x1p+53 (;=9.0072e+15;)
                local.set $p1
                local.get $l12
                i32.const 1000000000
                i32.ne
                br_if $B31
                local.get $l23
                local.get $l19
                i32.le_u
                br_if $B31
                local.get $l23
                i32.const -4
                i32.add
                i32.load8_u
                i32.const 1
                i32.and
                i32.eqz
                br_if $B31
              end
              f64.const 0x1.0000000000001p+53 (;=9.0072e+15;)
              local.set $p1
            end
            f64.const 0x1p-1 (;=0.5;)
            f64.const 0x1p+0 (;=1;)
            f64.const 0x1.8p+0 (;=1.5;)
            local.get $l25
            local.get $l11
            i32.eq
            select
            f64.const 0x1.8p+0 (;=1.5;)
            local.get $l24
            local.get $l12
            i32.const 1
            i32.shr_u
            local.tee $l25
            i32.eq
            select
            local.get $l24
            local.get $l25
            i32.lt_u
            select
            local.set $l26
            block $B33
              local.get $l7
              br_if $B33
              local.get $l10
              i32.load8_u
              i32.const 45
              i32.ne
              br_if $B33
              local.get $l26
              f64.neg
              local.set $l26
              local.get $p1
              f64.neg
              local.set $p1
            end
            local.get $l23
            local.get $l13
            local.get $l24
            i32.sub
            local.tee $l13
            i32.store
            local.get $p1
            local.get $l26
            f64.add
            local.get $p1
            f64.eq
            br_if $B29
            local.get $l23
            local.get $l13
            local.get $l12
            i32.add
            local.tee $l12
            i32.store
            block $B34
              local.get $l12
              i32.const 1000000000
              i32.lt_u
              br_if $B34
              loop $L35
                local.get $l23
                i32.const 0
                i32.store
                block $B36
                  local.get $l23
                  i32.const -4
                  i32.add
                  local.tee $l23
                  local.get $l19
                  i32.ge_u
                  br_if $B36
                  local.get $l19
                  i32.const -4
                  i32.add
                  local.tee $l19
                  i32.const 0
                  i32.store
                end
                local.get $l23
                local.get $l23
                i32.load
                i32.const 1
                i32.add
                local.tee $l12
                i32.store
                local.get $l12
                i32.const 999999999
                i32.gt_u
                br_if $L35
              end
            end
            local.get $l18
            local.get $l19
            i32.sub
            i32.const 2
            i32.shr_s
            i32.const 9
            i32.mul
            local.set $p3
            i32.const 10
            local.set $l12
            local.get $l19
            i32.load
            local.tee $l13
            i32.const 10
            i32.lt_u
            br_if $B29
            loop $L37
              local.get $p3
              i32.const 1
              i32.add
              local.set $p3
              local.get $l13
              local.get $l12
              i32.const 10
              i32.mul
              local.tee $l12
              i32.ge_u
              br_if $L37
            end
          end
          local.get $l23
          i32.const 4
          i32.add
          local.tee $l12
          local.get $l11
          local.get $l11
          local.get $l12
          i32.gt_u
          select
          local.set $l11
        end
        block $B38
          loop $L39
            local.get $l11
            local.tee $l12
            local.get $l19
            i32.le_u
            local.tee $l13
            br_if $B38
            local.get $l12
            i32.const -4
            i32.add
            local.tee $l11
            i32.load
            i32.eqz
            br_if $L39
          end
        end
        block $B40
          block $B41
            local.get $l15
            i32.const 103
            i32.eq
            br_if $B41
            local.get $p4
            i32.const 8
            i32.and
            local.set $l23
            br $B40
          end
          local.get $p3
          i32.const -1
          i32.xor
          i32.const -1
          local.get $l16
          i32.const 1
          local.get $l16
          select
          local.tee $l11
          local.get $p3
          i32.gt_s
          local.get $p3
          i32.const -5
          i32.gt_s
          i32.and
          local.tee $l23
          select
          local.get $l11
          i32.add
          local.set $l16
          i32.const -1
          i32.const -2
          local.get $l23
          select
          local.get $p5
          i32.add
          local.set $p5
          local.get $p4
          i32.const 8
          i32.and
          local.tee $l23
          br_if $B40
          i32.const -9
          local.set $l11
          block $B42
            local.get $l13
            br_if $B42
            local.get $l12
            i32.const -4
            i32.add
            i32.load
            local.tee $l23
            i32.eqz
            br_if $B42
            i32.const 10
            local.set $l13
            i32.const 0
            local.set $l11
            local.get $l23
            i32.const 10
            i32.rem_u
            br_if $B42
            loop $L43
              local.get $l11
              local.tee $l24
              i32.const 1
              i32.add
              local.set $l11
              local.get $l23
              local.get $l13
              i32.const 10
              i32.mul
              local.tee $l13
              i32.rem_u
              i32.eqz
              br_if $L43
            end
            local.get $l24
            i32.const -1
            i32.xor
            local.set $l11
          end
          local.get $l12
          local.get $l18
          i32.sub
          i32.const 2
          i32.shr_s
          i32.const 9
          i32.mul
          local.set $l13
          block $B44
            local.get $p5
            i32.const -33
            i32.and
            i32.const 70
            i32.ne
            br_if $B44
            i32.const 0
            local.set $l23
            local.get $l16
            local.get $l13
            local.get $l11
            i32.add
            i32.const -9
            i32.add
            local.tee $l11
            i32.const 0
            local.get $l11
            i32.const 0
            i32.gt_s
            select
            local.tee $l11
            local.get $l16
            local.get $l11
            i32.lt_s
            select
            local.set $l16
            br $B40
          end
          i32.const 0
          local.set $l23
          local.get $l16
          local.get $p3
          local.get $l13
          i32.add
          local.get $l11
          i32.add
          i32.const -9
          i32.add
          local.tee $l11
          i32.const 0
          local.get $l11
          i32.const 0
          i32.gt_s
          select
          local.tee $l11
          local.get $l16
          local.get $l11
          i32.lt_s
          select
          local.set $l16
        end
        i32.const -1
        local.set $l13
        local.get $l16
        i32.const 2147483645
        i32.const 2147483646
        local.get $l16
        local.get $l23
        i32.or
        local.tee $l24
        select
        i32.gt_s
        br_if $B3
        local.get $l16
        local.get $l24
        i32.const 0
        i32.ne
        i32.add
        i32.const 1
        i32.add
        local.set $l25
        block $B45
          block $B46
            local.get $p5
            i32.const -33
            i32.and
            local.tee $l22
            i32.const 70
            i32.ne
            br_if $B46
            local.get $p3
            i32.const 2147483647
            local.get $l25
            i32.sub
            i32.gt_s
            br_if $B3
            local.get $p3
            i32.const 0
            local.get $p3
            i32.const 0
            i32.gt_s
            select
            local.set $l11
            br $B45
          end
          block $B47
            local.get $l14
            local.get $p3
            local.get $p3
            i32.const 31
            i32.shr_s
            local.tee $l11
            i32.add
            local.get $l11
            i32.xor
            i64.extend_i32_u
            local.get $l14
            call $fmt_u
            local.tee $l11
            i32.sub
            i32.const 1
            i32.gt_s
            br_if $B47
            loop $L48
              local.get $l11
              i32.const -1
              i32.add
              local.tee $l11
              i32.const 48
              i32.store8
              local.get $l14
              local.get $l11
              i32.sub
              i32.const 2
              i32.lt_s
              br_if $L48
            end
          end
          local.get $l11
          i32.const -2
          i32.add
          local.tee $l21
          local.get $p5
          i32.store8
          i32.const -1
          local.set $l13
          local.get $l11
          i32.const -1
          i32.add
          i32.const 45
          i32.const 43
          local.get $p3
          i32.const 0
          i32.lt_s
          select
          i32.store8
          local.get $l14
          local.get $l21
          i32.sub
          local.tee $l11
          i32.const 2147483647
          local.get $l25
          i32.sub
          i32.gt_s
          br_if $B3
        end
        i32.const -1
        local.set $l13
        local.get $l11
        local.get $l25
        i32.add
        local.tee $l11
        local.get $l9
        i32.const 2147483647
        i32.xor
        i32.gt_s
        br_if $B3
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l11
        local.get $l9
        i32.add
        local.tee $l25
        local.get $p4
        call $pad
        local.get $p0
        local.get $l10
        local.get $l9
        call $out
        local.get $p0
        i32.const 48
        local.get $p2
        local.get $l25
        local.get $p4
        i32.const 65536
        i32.xor
        call $pad
        block $B49
          block $B50
            block $B51
              block $B52
                local.get $l22
                i32.const 70
                i32.ne
                br_if $B52
                local.get $l6
                i32.const 16
                i32.add
                i32.const 8
                i32.or
                local.set $l23
                local.get $l6
                i32.const 16
                i32.add
                i32.const 9
                i32.or
                local.set $p3
                local.get $l18
                local.get $l19
                local.get $l19
                local.get $l18
                i32.gt_u
                select
                local.tee $l13
                local.set $l19
                loop $L53
                  local.get $l19
                  i64.load32_u
                  local.get $p3
                  call $fmt_u
                  local.set $l11
                  block $B54
                    block $B55
                      local.get $l19
                      local.get $l13
                      i32.eq
                      br_if $B55
                      local.get $l11
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.le_u
                      br_if $B54
                      loop $L56
                        local.get $l11
                        i32.const -1
                        i32.add
                        local.tee $l11
                        i32.const 48
                        i32.store8
                        local.get $l11
                        local.get $l6
                        i32.const 16
                        i32.add
                        i32.gt_u
                        br_if $L56
                        br $B54
                      end
                      unreachable
                    end
                    local.get $l11
                    local.get $p3
                    i32.ne
                    br_if $B54
                    local.get $l6
                    i32.const 48
                    i32.store8 offset=24
                    local.get $l23
                    local.set $l11
                  end
                  local.get $p0
                  local.get $l11
                  local.get $p3
                  local.get $l11
                  i32.sub
                  call $out
                  local.get $l19
                  i32.const 4
                  i32.add
                  local.tee $l19
                  local.get $l18
                  i32.le_u
                  br_if $L53
                end
                block $B57
                  local.get $l24
                  i32.eqz
                  br_if $B57
                  local.get $p0
                  i32.const 1072
                  i32.const 1
                  call $out
                end
                local.get $l19
                local.get $l12
                i32.ge_u
                br_if $B51
                local.get $l16
                i32.const 1
                i32.lt_s
                br_if $B51
                loop $L58
                  block $B59
                    local.get $l19
                    i64.load32_u
                    local.get $p3
                    call $fmt_u
                    local.tee $l11
                    local.get $l6
                    i32.const 16
                    i32.add
                    i32.le_u
                    br_if $B59
                    loop $L60
                      local.get $l11
                      i32.const -1
                      i32.add
                      local.tee $l11
                      i32.const 48
                      i32.store8
                      local.get $l11
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.gt_u
                      br_if $L60
                    end
                  end
                  local.get $p0
                  local.get $l11
                  local.get $l16
                  i32.const 9
                  local.get $l16
                  i32.const 9
                  i32.lt_s
                  select
                  call $out
                  local.get $l16
                  i32.const -9
                  i32.add
                  local.set $l11
                  local.get $l19
                  i32.const 4
                  i32.add
                  local.tee $l19
                  local.get $l12
                  i32.ge_u
                  br_if $B50
                  local.get $l16
                  i32.const 9
                  i32.gt_s
                  local.set $l13
                  local.get $l11
                  local.set $l16
                  local.get $l13
                  br_if $L58
                  br $B50
                end
                unreachable
              end
              block $B61
                local.get $l16
                i32.const 0
                i32.lt_s
                br_if $B61
                local.get $l12
                local.get $l19
                i32.const 4
                i32.add
                local.get $l12
                local.get $l19
                i32.gt_u
                select
                local.set $l24
                local.get $l6
                i32.const 16
                i32.add
                i32.const 8
                i32.or
                local.set $l18
                local.get $l6
                i32.const 16
                i32.add
                i32.const 9
                i32.or
                local.set $p3
                local.get $l19
                local.set $l12
                loop $L62
                  block $B63
                    local.get $l12
                    i64.load32_u
                    local.get $p3
                    call $fmt_u
                    local.tee $l11
                    local.get $p3
                    i32.ne
                    br_if $B63
                    local.get $l6
                    i32.const 48
                    i32.store8 offset=24
                    local.get $l18
                    local.set $l11
                  end
                  block $B64
                    block $B65
                      local.get $l12
                      local.get $l19
                      i32.eq
                      br_if $B65
                      local.get $l11
                      local.get $l6
                      i32.const 16
                      i32.add
                      i32.le_u
                      br_if $B64
                      loop $L66
                        local.get $l11
                        i32.const -1
                        i32.add
                        local.tee $l11
                        i32.const 48
                        i32.store8
                        local.get $l11
                        local.get $l6
                        i32.const 16
                        i32.add
                        i32.gt_u
                        br_if $L66
                        br $B64
                      end
                      unreachable
                    end
                    local.get $p0
                    local.get $l11
                    i32.const 1
                    call $out
                    local.get $l11
                    i32.const 1
                    i32.add
                    local.set $l11
                    local.get $l16
                    local.get $l23
                    i32.or
                    i32.eqz
                    br_if $B64
                    local.get $p0
                    i32.const 1072
                    i32.const 1
                    call $out
                  end
                  local.get $p0
                  local.get $l11
                  local.get $p3
                  local.get $l11
                  i32.sub
                  local.tee $l13
                  local.get $l16
                  local.get $l16
                  local.get $l13
                  i32.gt_s
                  select
                  call $out
                  local.get $l16
                  local.get $l13
                  i32.sub
                  local.set $l16
                  local.get $l12
                  i32.const 4
                  i32.add
                  local.tee $l12
                  local.get $l24
                  i32.ge_u
                  br_if $B61
                  local.get $l16
                  i32.const -1
                  i32.gt_s
                  br_if $L62
                end
              end
              local.get $p0
              i32.const 48
              local.get $l16
              i32.const 18
              i32.add
              i32.const 18
              i32.const 0
              call $pad
              local.get $p0
              local.get $l21
              local.get $l14
              local.get $l21
              i32.sub
              call $out
              br $B49
            end
            local.get $l16
            local.set $l11
          end
          local.get $p0
          i32.const 48
          local.get $l11
          i32.const 9
          i32.add
          i32.const 9
          i32.const 0
          call $pad
        end
        local.get $p0
        i32.const 32
        local.get $p2
        local.get $l25
        local.get $p4
        i32.const 8192
        i32.xor
        call $pad
        local.get $p2
        local.get $l25
        local.get $l25
        local.get $p2
        i32.lt_s
        select
        local.set $l13
        br $B3
      end
      local.get $l10
      local.get $p5
      i32.const 26
      i32.shl
      i32.const 31
      i32.shr_s
      i32.const 9
      i32.and
      i32.add
      local.set $l25
      block $B67
        local.get $p3
        i32.const 11
        i32.gt_u
        br_if $B67
        i32.const 12
        local.get $p3
        i32.sub
        local.set $l11
        f64.const 0x1p+4 (;=16;)
        local.set $l26
        loop $L68
          local.get $l26
          f64.const 0x1p+4 (;=16;)
          f64.mul
          local.set $l26
          local.get $l11
          i32.const -1
          i32.add
          local.tee $l11
          br_if $L68
        end
        block $B69
          local.get $l25
          i32.load8_u
          i32.const 45
          i32.ne
          br_if $B69
          local.get $l26
          local.get $p1
          f64.neg
          local.get $l26
          f64.sub
          f64.add
          f64.neg
          local.set $p1
          br $B67
        end
        local.get $p1
        local.get $l26
        f64.add
        local.get $l26
        f64.sub
        local.set $p1
      end
      block $B70
        local.get $l6
        i32.load offset=44
        local.tee $l11
        local.get $l11
        i32.const 31
        i32.shr_s
        local.tee $l11
        i32.add
        local.get $l11
        i32.xor
        i64.extend_i32_u
        local.get $l14
        call $fmt_u
        local.tee $l11
        local.get $l14
        i32.ne
        br_if $B70
        local.get $l6
        i32.const 48
        i32.store8 offset=15
        local.get $l6
        i32.const 15
        i32.add
        local.set $l11
      end
      local.get $l9
      i32.const 2
      i32.or
      local.set $l23
      local.get $p5
      i32.const 32
      i32.and
      local.set $l19
      local.get $l6
      i32.load offset=44
      local.set $l12
      local.get $l11
      i32.const -2
      i32.add
      local.tee $l24
      local.get $p5
      i32.const 15
      i32.add
      i32.store8
      local.get $l11
      i32.const -1
      i32.add
      i32.const 45
      i32.const 43
      local.get $l12
      i32.const 0
      i32.lt_s
      select
      i32.store8
      local.get $p4
      i32.const 8
      i32.and
      local.set $l13
      local.get $l6
      i32.const 16
      i32.add
      local.set $l12
      loop $L71
        local.get $l12
        local.set $l11
        block $B72
          block $B73
            local.get $p1
            f64.abs
            f64.const 0x1p+31 (;=2.14748e+09;)
            f64.lt
            i32.eqz
            br_if $B73
            local.get $p1
            i32.trunc_f64_s
            local.set $l12
            br $B72
          end
          i32.const -2147483648
          local.set $l12
        end
        local.get $l11
        local.get $l12
        i32.const 1568
        i32.add
        i32.load8_u
        local.get $l19
        i32.or
        i32.store8
        local.get $p1
        local.get $l12
        f64.convert_i32_s
        f64.sub
        f64.const 0x1p+4 (;=16;)
        f64.mul
        local.set $p1
        block $B74
          local.get $l11
          i32.const 1
          i32.add
          local.tee $l12
          local.get $l6
          i32.const 16
          i32.add
          i32.sub
          i32.const 1
          i32.ne
          br_if $B74
          block $B75
            local.get $l13
            br_if $B75
            local.get $p3
            i32.const 0
            i32.gt_s
            br_if $B75
            local.get $p1
            f64.const 0x0p+0 (;=0;)
            f64.eq
            br_if $B74
          end
          local.get $l11
          i32.const 46
          i32.store8 offset=1
          local.get $l11
          i32.const 2
          i32.add
          local.set $l12
        end
        local.get $p1
        f64.const 0x0p+0 (;=0;)
        f64.ne
        br_if $L71
      end
      i32.const -1
      local.set $l13
      i32.const 2147483645
      local.get $l23
      local.get $l14
      local.get $l24
      i32.sub
      local.tee $l21
      i32.add
      local.tee $l11
      i32.sub
      local.get $p3
      i32.lt_s
      br_if $B3
      block $B76
        block $B77
          local.get $p3
          i32.eqz
          br_if $B77
          local.get $l12
          local.get $l6
          i32.const 16
          i32.add
          i32.sub
          local.tee $l19
          i32.const -2
          i32.add
          local.get $p3
          i32.ge_s
          br_if $B77
          local.get $p3
          i32.const 2
          i32.add
          local.set $l12
          br $B76
        end
        local.get $l12
        local.get $l6
        i32.const 16
        i32.add
        i32.sub
        local.tee $l19
        local.set $l12
      end
      local.get $p0
      i32.const 32
      local.get $p2
      local.get $l11
      local.get $l12
      i32.add
      local.tee $l11
      local.get $p4
      call $pad
      local.get $p0
      local.get $l25
      local.get $l23
      call $out
      local.get $p0
      i32.const 48
      local.get $p2
      local.get $l11
      local.get $p4
      i32.const 65536
      i32.xor
      call $pad
      local.get $p0
      local.get $l6
      i32.const 16
      i32.add
      local.get $l19
      call $out
      local.get $p0
      i32.const 48
      local.get $l12
      local.get $l19
      i32.sub
      i32.const 0
      i32.const 0
      call $pad
      local.get $p0
      local.get $l24
      local.get $l21
      call $out
      local.get $p0
      i32.const 32
      local.get $p2
      local.get $l11
      local.get $p4
      i32.const 8192
      i32.xor
      call $pad
      local.get $p2
      local.get $l11
      local.get $l11
      local.get $p2
      i32.lt_s
      select
      local.set $l13
    end
    local.get $l6
    i32.const 560
    i32.add
    global.set $__stack_pointer
    local.get $l13)
  (func $pop_arg_long_double (type $t6) (param $p0 i32) (param $p1 i32)
    (local $l2 i32)
    local.get $p1
    local.get $p1
    i32.load
    i32.const 7
    i32.add
    i32.const -8
    i32.and
    local.tee $l2
    i32.const 16
    i32.add
    i32.store
    local.get $p0
    local.get $l2
    i64.load
    local.get $l2
    i32.const 8
    i32.add
    i64.load
    call $__trunctfdf2
    f64.store)
  (func $__DOUBLE_BITS (type $t20) (param $p0 f64) (result i64)
    local.get $p0
    i64.reinterpret_f64)
  (func $__wasi_syscall_ret (type $t1) (param $p0 i32) (result i32)
    block $B0
      local.get $p0
      br_if $B0
      i32.const 0
      return
    end
    call $__errno_location
    local.get $p0
    i32.store
    i32.const -1)
  (func $dummy.1 (type $t1) (param $p0 i32) (result i32)
    local.get $p0)
  (func $__stdio_close (type $t1) (param $p0 i32) (result i32)
    local.get $p0
    i32.load offset=60
    call $dummy.1
    call $__wasi_fd_close)
  (func $__lseek (type $t5) (param $p0 i32) (param $p1 i64) (param $p2 i32) (result i64)
    (local $l3 i32)
    global.get $__stack_pointer
    i32.const 16
    i32.sub
    local.tee $l3
    global.set $__stack_pointer
    local.get $p0
    local.get $p1
    local.get $p2
    i32.const 255
    i32.and
    local.get $l3
    i32.const 8
    i32.add
    call $__wasi_fd_seek
    call $__wasi_syscall_ret
    local.set $p0
    local.get $l3
    i64.load offset=8
    local.set $p1
    local.get $l3
    i32.const 16
    i32.add
    global.set $__stack_pointer
    i64.const -1
    local.get $p1
    local.get $p0
    select)
  (func $__stdio_seek (type $t5) (param $p0 i32) (param $p1 i64) (param $p2 i32) (result i64)
    local.get $p0
    i32.load offset=60
    local.get $p1
    local.get $p2
    call $__lseek)
  (func $__syscall_getpid (type $t2) (result i32)
    i32.const 42)
  (func $getpid (type $t2) (result i32)
    call $__syscall_getpid)
  (func $__get_tp (type $t2) (result i32)
    i32.const 3000)
  (func $init_pthread_self (type $t4)
    i32.const 0
    i32.const 2968
    i32.store offset=3088
    i32.const 0
    call $getpid
    i32.store offset=3016)
  (func $wcrtomb (type $t0) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32)
    i32.const 1
    local.set $l3
    block $B0
      block $B1
        local.get $p0
        i32.eqz
        br_if $B1
        local.get $p1
        i32.const 127
        i32.le_u
        br_if $B0
        block $B2
          block $B3
            call $__get_tp
            i32.load offset=88
            i32.load
            br_if $B3
            local.get $p1
            i32.const -128
            i32.and
            i32.const 57216
            i32.eq
            br_if $B0
            call $__errno_location
            i32.const 25
            i32.store
            br $B2
          end
          block $B4
            local.get $p1
            i32.const 2047
            i32.gt_u
            br_if $B4
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 192
            i32.or
            i32.store8
            i32.const 2
            return
          end
          block $B5
            block $B6
              local.get $p1
              i32.const 55296
              i32.lt_u
              br_if $B6
              local.get $p1
              i32.const -8192
              i32.and
              i32.const 57344
              i32.ne
              br_if $B5
            end
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=2
            local.get $p0
            local.get $p1
            i32.const 12
            i32.shr_u
            i32.const 224
            i32.or
            i32.store8
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            i32.const 3
            return
          end
          block $B7
            local.get $p1
            i32.const -65536
            i32.add
            i32.const 1048575
            i32.gt_u
            br_if $B7
            local.get $p0
            local.get $p1
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=3
            local.get $p0
            local.get $p1
            i32.const 18
            i32.shr_u
            i32.const 240
            i32.or
            i32.store8
            local.get $p0
            local.get $p1
            i32.const 6
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=2
            local.get $p0
            local.get $p1
            i32.const 12
            i32.shr_u
            i32.const 63
            i32.and
            i32.const 128
            i32.or
            i32.store8 offset=1
            i32.const 4
            return
          end
          call $__errno_location
          i32.const 25
          i32.store
        end
        i32.const -1
        local.set $l3
      end
      local.get $l3
      return
    end
    local.get $p0
    local.get $p1
    i32.store8
    i32.const 1)
  (func $wctomb (type $t7) (param $p0 i32) (param $p1 i32) (result i32)
    block $B0
      local.get $p0
      br_if $B0
      i32.const 0
      return
    end
    local.get $p0
    local.get $p1
    i32.const 0
    call $wcrtomb)
  (func $__ashlti3 (type $t11) (param $p0 i32) (param $p1 i64) (param $p2 i64) (param $p3 i32)
    (local $l4 i64)
    block $B0
      block $B1
        local.get $p3
        i32.const 64
        i32.and
        i32.eqz
        br_if $B1
        local.get $p1
        local.get $p3
        i32.const -64
        i32.add
        i64.extend_i32_u
        i64.shl
        local.set $p2
        i64.const 0
        local.set $p1
        br $B0
      end
      local.get $p3
      i32.eqz
      br_if $B0
      local.get $p1
      i32.const 64
      local.get $p3
      i32.sub
      i64.extend_i32_u
      i64.shr_u
      local.get $p2
      local.get $p3
      i64.extend_i32_u
      local.tee $l4
      i64.shl
      i64.or
      local.set $p2
      local.get $p1
      local.get $l4
      i64.shl
      local.set $p1
    end
    local.get $p0
    local.get $p1
    i64.store
    local.get $p0
    local.get $p2
    i64.store offset=8)
  (func $__lshrti3 (type $t11) (param $p0 i32) (param $p1 i64) (param $p2 i64) (param $p3 i32)
    (local $l4 i64)
    block $B0
      block $B1
        local.get $p3
        i32.const 64
        i32.and
        i32.eqz
        br_if $B1
        local.get $p2
        local.get $p3
        i32.const -64
        i32.add
        i64.extend_i32_u
        i64.shr_u
        local.set $p1
        i64.const 0
        local.set $p2
        br $B0
      end
      local.get $p3
      i32.eqz
      br_if $B0
      local.get $p2
      i32.const 64
      local.get $p3
      i32.sub
      i64.extend_i32_u
      i64.shl
      local.get $p1
      local.get $p3
      i64.extend_i32_u
      local.tee $l4
      i64.shr_u
      i64.or
      local.set $p1
      local.get $p2
      local.get $l4
      i64.shr_u
      local.set $p2
    end
    local.get $p0
    local.get $p1
    i64.store
    local.get $p0
    local.get $p2
    i64.store offset=8)
  (func $__trunctfdf2 (type $t21) (param $p0 i64) (param $p1 i64) (result f64)
    (local $l2 i32) (local $l3 i64) (local $l4 i64) (local $l5 i32)
    global.get $__stack_pointer
    i32.const 32
    i32.sub
    local.tee $l2
    global.set $__stack_pointer
    block $B0
      block $B1
        local.get $p1
        i64.const 9223372036854775807
        i64.and
        local.tee $l3
        i64.const -4323737117252386816
        i64.add
        local.get $l3
        i64.const -4899634919602388992
        i64.add
        i64.ge_u
        br_if $B1
        local.get $p0
        i64.const 60
        i64.shr_u
        local.get $p1
        i64.const 4
        i64.shl
        i64.or
        local.set $l3
        block $B2
          local.get $p0
          i64.const 1152921504606846975
          i64.and
          local.tee $p0
          i64.const 576460752303423489
          i64.lt_u
          br_if $B2
          local.get $l3
          i64.const 4611686018427387905
          i64.add
          local.set $l4
          br $B0
        end
        local.get $l3
        i64.const 4611686018427387904
        i64.add
        local.set $l4
        local.get $p0
        i64.const 576460752303423488
        i64.xor
        i64.const 0
        i64.ne
        br_if $B0
        local.get $l4
        local.get $l3
        i64.const 1
        i64.and
        i64.add
        local.set $l4
        br $B0
      end
      block $B3
        local.get $p0
        i64.eqz
        local.get $l3
        i64.const 9223090561878065152
        i64.lt_u
        local.get $l3
        i64.const 9223090561878065152
        i64.eq
        select
        br_if $B3
        local.get $p0
        i64.const 60
        i64.shr_u
        local.get $p1
        i64.const 4
        i64.shl
        i64.or
        i64.const 2251799813685247
        i64.and
        i64.const 9221120237041090560
        i64.or
        local.set $l4
        br $B0
      end
      i64.const 9218868437227405312
      local.set $l4
      local.get $l3
      i64.const 4899634919602388991
      i64.gt_u
      br_if $B0
      i64.const 0
      local.set $l4
      local.get $l3
      i64.const 48
      i64.shr_u
      i32.wrap_i64
      local.tee $l5
      i32.const 15249
      i32.lt_u
      br_if $B0
      local.get $l2
      i32.const 16
      i32.add
      local.get $p0
      local.get $p1
      i64.const 281474976710655
      i64.and
      i64.const 281474976710656
      i64.or
      local.tee $l3
      local.get $l5
      i32.const -15233
      i32.add
      call $__ashlti3
      local.get $l2
      local.get $p0
      local.get $l3
      i32.const 15361
      local.get $l5
      i32.sub
      call $__lshrti3
      local.get $l2
      i64.load
      local.tee $l3
      i64.const 60
      i64.shr_u
      local.get $l2
      i32.const 8
      i32.add
      i64.load
      i64.const 4
      i64.shl
      i64.or
      local.set $l4
      block $B4
        local.get $l3
        i64.const 1152921504606846975
        i64.and
        local.get $l2
        i64.load offset=16
        local.get $l2
        i32.const 16
        i32.add
        i32.const 8
        i32.add
        i64.load
        i64.or
        i64.const 0
        i64.ne
        i64.extend_i32_u
        i64.or
        local.tee $l3
        i64.const 576460752303423489
        i64.lt_u
        br_if $B4
        local.get $l4
        i64.const 1
        i64.add
        local.set $l4
        br $B0
      end
      local.get $l3
      i64.const 576460752303423488
      i64.xor
      i64.const 0
      i64.ne
      br_if $B0
      local.get $l4
      i64.const 1
      i64.and
      local.get $l4
      i64.add
      local.set $l4
    end
    local.get $l2
    i32.const 32
    i32.add
    global.set $__stack_pointer
    local.get $l4
    local.get $p1
    i64.const -9223372036854775808
    i64.and
    i64.or
    f64.reinterpret_i64)
  (func $stackSave (export "stackSave") (type $t2) (result i32)
    global.get $__stack_pointer)
  (func $stackRestore (export "stackRestore") (type $t3) (param $p0 i32)
    local.get $p0
    global.set $__stack_pointer)
  (func $stackAlloc (export "stackAlloc") (type $t1) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    global.get $__stack_pointer
    local.get $p0
    i32.sub
    i32.const -16
    i32.and
    local.tee $l1
    global.set $__stack_pointer
    local.get $l1)
  (func $emscripten_stack_init (export "emscripten_stack_init") (type $t4)
    i32.const 5246000
    global.set $__stack_base
    i32.const 3112
    i32.const 15
    i32.add
    i32.const -16
    i32.and
    global.set $__stack_end)
  (func $emscripten_stack_get_free (export "emscripten_stack_get_free") (type $t2) (result i32)
    global.get $__stack_pointer
    global.get $__stack_end
    i32.sub)
  (func $emscripten_stack_get_base (export "emscripten_stack_get_base") (type $t2) (result i32)
    global.get $__stack_base)
  (func $emscripten_stack_get_end (export "emscripten_stack_get_end") (type $t2) (result i32)
    global.get $__stack_end)
  (table $__indirect_function_table (export "__indirect_function_table") 9 9 funcref)
  (memory $memory (export "memory") 256 256)
  (global $__stack_pointer (mut i32) (i32.const 5246000))
  (global $__stack_end (mut i32) (i32.const 0))
  (global $__stack_base (mut i32) (i32.const 0))
  (elem $e0 (i32.const 1) func $__wasm_call_ctors $__emscripten_stdout_close $__stdio_write $__emscripten_stdout_seek $fmt_fp $pop_arg_long_double $__stdio_close $__stdio_seek)
  (data $.rodata (i32.const 1024) "-+   0X0x\00-0X+0X 0X-0x+0x 0x\00nan\00inf\00%c\00NAN\00INF\00.\00(null)\00Generation %d:\0a\00\00\00\00\00\00\00\00\19\00\0a\00\19\19\19\00\00\00\00\05\00\00\00\00\00\00\09\00\00\00\00\0b\00\00\00\00\00\00\00\00\19\00\11\0a\19\19\19\03\0a\07\00\01\00\09\0b\18\00\00\09\06\0b\00\00\0b\00\06\19\00\00\00\19\19\19\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0e\00\00\00\00\00\00\00\00\19\00\0a\0d\19\19\19\00\0d\00\00\02\00\09\0e\00\00\00\09\00\0e\00\00\0e\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\0c\00\00\00\00\00\00\00\00\00\00\00\13\00\00\00\00\13\00\00\00\00\09\0c\00\00\00\00\00\0c\00\00\0c\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\10\00\00\00\00\00\00\00\00\00\00\00\0f\00\00\00\04\0f\00\00\00\00\09\10\00\00\00\00\00\10\00\00\10\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\12\00\00\00\00\00\00\00\00\00\00\00\11\00\00\00\00\11\00\00\00\00\09\12\00\00\00\00\00\12\00\00\12\00\00\1a\00\00\00\1a\1a\1a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\1a\00\00\00\1a\1a\1a\00\00\00\00\00\00\09\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\14\00\00\00\00\00\00\00\00\00\00\00\17\00\00\00\00\17\00\00\00\00\09\14\00\00\00\00\00\14\00\00\14\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\16\00\00\00\00\00\00\00\00\00\00\00\15\00\00\00\00\15\00\00\00\00\09\16\00\00\00\00\00\16\00\00\16\00\000123456789ABCDEF")
  (data $.data (i32.const 1584) "\05\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\03\00\00\00\04\00\00\00h\07\00\00\00\04\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\0a\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\000\06\00\00\00\00\00\00\05\00\00\00\00\00\00\00\00\00\00\00\07\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\03\00\00\00\08\00\00\00\b8\0b\00\00\00\00\00\00\00\00\00\00\00\00\00\00\02\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\ff\ff\ff\ff\ff\ff\ff\ff\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\c8\06\00\00"))
