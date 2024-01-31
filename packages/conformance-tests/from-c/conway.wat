(module
  (type $t0 (func (result i32)))
  (type $t1 (func))
  (type $t2 (func (param i32 i32 i32) (result i32)))
  (type $t3 (func (param i32) (result i32)))
  (type $t4 (func (param i32 i32 i32 i32 i32 i32)))
  (type $t5 (func (param i32 i32 i32)))
  (type $t6 (func (param i32)))
  (func $__wasm_call_ctors (type $t1)
    (call $emscripten_stack_init))
  (func $countAliveNeighbors (type $t4) (param $p0 i32) (param $p1 i32) (param $p2 i32) (param $p3 i32) (param $p4 i32) (param $p5 i32)
    (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32) (local $l72 i32) (local $l73 i32) (local $l74 i32) (local $l75 i32) (local $l76 i32) (local $l77 i32) (local $l78 i32) (local $l79 i32) (local $l80 i32) (local $l81 i32) (local $l82 i32) (local $l83 i32)
    (local.set $l6
      (global.get $__stack_pointer))
    (local.set $l7
      (i32.const 48))
    (local.set $l8
      (i32.sub
        (local.get $l6)
        (local.get $l7)))
    (i32.store offset=44
      (local.get $l8)
      (local.get $p0))
    (i32.store offset=40
      (local.get $l8)
      (local.get $p1))
    (i32.store offset=36
      (local.get $l8)
      (local.get $p2))
    (i32.store offset=32
      (local.get $l8)
      (local.get $p3))
    (i32.store offset=28
      (local.get $l8)
      (local.get $p4))
    (i32.store offset=24
      (local.get $l8)
      (local.get $p5))
    (local.set $l9
      (i32.load offset=24
        (local.get $l8)))
    (local.set $l10
      (i32.const 0))
    (i32.store
      (local.get $l9)
      (local.get $l10))
    (local.set $l11
      (i32.const -1))
    (i32.store offset=20
      (local.get $l8)
      (local.get $l11))
    (block $B0
      (loop $L1
        (local.set $l12
          (i32.load offset=20
            (local.get $l8)))
        (local.set $l13
          (i32.const 1))
        (local.set $l14
          (local.get $l12))
        (local.set $l15
          (local.get $l13))
        (local.set $l16
          (i32.le_s
            (local.get $l14)
            (local.get $l15)))
        (local.set $l17
          (i32.const 1))
        (local.set $l18
          (i32.and
            (local.get $l16)
            (local.get $l17)))
        (br_if $B0
          (i32.eqz
            (local.get $l18)))
        (local.set $l19
          (i32.const -1))
        (i32.store offset=16
          (local.get $l8)
          (local.get $l19))
        (block $B2
          (loop $L3
            (local.set $l20
              (i32.load offset=16
                (local.get $l8)))
            (local.set $l21
              (i32.const 1))
            (local.set $l22
              (local.get $l20))
            (local.set $l23
              (local.get $l21))
            (local.set $l24
              (i32.le_s
                (local.get $l22)
                (local.get $l23)))
            (local.set $l25
              (i32.const 1))
            (local.set $l26
              (i32.and
                (local.get $l24)
                (local.get $l25)))
            (br_if $B2
              (i32.eqz
                (local.get $l26)))
            (local.set $l27
              (i32.load offset=20
                (local.get $l8)))
            (block $B4
              (block $B5
                (br_if $B5
                  (local.get $l27))
                (local.set $l28
                  (i32.load offset=16
                    (local.get $l8)))
                (br_if $B5
                  (local.get $l28))
                (br $B4))
              (local.set $l29
                (i32.load offset=32
                  (local.get $l8)))
              (local.set $l30
                (i32.load offset=20
                  (local.get $l8)))
              (local.set $l31
                (i32.add
                  (local.get $l29)
                  (local.get $l30)))
              (i32.store offset=12
                (local.get $l8)
                (local.get $l31))
              (local.set $l32
                (i32.load offset=28
                  (local.get $l8)))
              (local.set $l33
                (i32.load offset=16
                  (local.get $l8)))
              (local.set $l34
                (i32.add
                  (local.get $l32)
                  (local.get $l33)))
              (i32.store offset=8
                (local.get $l8)
                (local.get $l34))
              (local.set $l35
                (i32.load offset=12
                  (local.get $l8)))
              (local.set $l36
                (i32.const 0))
              (local.set $l37
                (local.get $l35))
              (local.set $l38
                (local.get $l36))
              (local.set $l39
                (i32.ge_s
                  (local.get $l37)
                  (local.get $l38)))
              (local.set $l40
                (i32.const 1))
              (local.set $l41
                (i32.and
                  (local.get $l39)
                  (local.get $l40)))
              (block $B6
                (br_if $B6
                  (i32.eqz
                    (local.get $l41)))
                (local.set $l42
                  (i32.load offset=12
                    (local.get $l8)))
                (local.set $l43
                  (i32.load offset=40
                    (local.get $l8)))
                (local.set $l44
                  (local.get $l42))
                (local.set $l45
                  (local.get $l43))
                (local.set $l46
                  (i32.lt_s
                    (local.get $l44)
                    (local.get $l45)))
                (local.set $l47
                  (i32.const 1))
                (local.set $l48
                  (i32.and
                    (local.get $l46)
                    (local.get $l47)))
                (br_if $B6
                  (i32.eqz
                    (local.get $l48)))
                (local.set $l49
                  (i32.load offset=8
                    (local.get $l8)))
                (local.set $l50
                  (i32.const 0))
                (local.set $l51
                  (local.get $l49))
                (local.set $l52
                  (local.get $l50))
                (local.set $l53
                  (i32.ge_s
                    (local.get $l51)
                    (local.get $l52)))
                (local.set $l54
                  (i32.const 1))
                (local.set $l55
                  (i32.and
                    (local.get $l53)
                    (local.get $l54)))
                (br_if $B6
                  (i32.eqz
                    (local.get $l55)))
                (local.set $l56
                  (i32.load offset=8
                    (local.get $l8)))
                (local.set $l57
                  (i32.load offset=36
                    (local.get $l8)))
                (local.set $l58
                  (local.get $l56))
                (local.set $l59
                  (local.get $l57))
                (local.set $l60
                  (i32.lt_s
                    (local.get $l58)
                    (local.get $l59)))
                (local.set $l61
                  (i32.const 1))
                (local.set $l62
                  (i32.and
                    (local.get $l60)
                    (local.get $l61)))
                (br_if $B6
                  (i32.eqz
                    (local.get $l62)))
                (local.set $l63
                  (i32.load offset=44
                    (local.get $l8)))
                (local.set $l64
                  (i32.load offset=12
                    (local.get $l8)))
                (local.set $l65
                  (i32.const 9))
                (local.set $l66
                  (i32.mul
                    (local.get $l64)
                    (local.get $l65)))
                (local.set $l67
                  (i32.add
                    (local.get $l63)
                    (local.get $l66)))
                (local.set $l68
                  (i32.load offset=8
                    (local.get $l8)))
                (local.set $l69
                  (i32.add
                    (local.get $l67)
                    (local.get $l68)))
                (local.set $l70
                  (i32.load8_u
                    (local.get $l69)))
                (local.set $l71
                  (i32.const 24))
                (local.set $l72
                  (i32.shl
                    (local.get $l70)
                    (local.get $l71)))
                (local.set $l73
                  (i32.shr_s
                    (local.get $l72)
                    (local.get $l71)))
                (br_if $B6
                  (i32.eqz
                    (local.get $l73)))
                (local.set $l74
                  (i32.load offset=24
                    (local.get $l8)))
                (local.set $l75
                  (i32.load
                    (local.get $l74)))
                (local.set $l76
                  (i32.const 1))
                (local.set $l77
                  (i32.add
                    (local.get $l75)
                    (local.get $l76)))
                (i32.store
                  (local.get $l74)
                  (local.get $l77))))
            (local.set $l78
              (i32.load offset=16
                (local.get $l8)))
            (local.set $l79
              (i32.const 1))
            (local.set $l80
              (i32.add
                (local.get $l78)
                (local.get $l79)))
            (i32.store offset=16
              (local.get $l8)
              (local.get $l80))
            (br $L3))
          (unreachable))
        (local.set $l81
          (i32.load offset=20
            (local.get $l8)))
        (local.set $l82
          (i32.const 1))
        (local.set $l83
          (i32.add
            (local.get $l81)
            (local.get $l82)))
        (i32.store offset=20
          (local.get $l8)
          (local.get $l83))
        (br $L1))
      (unreachable))
    (return))
  (func $updateGrid (type $t5) (param $p0 i32) (param $p1 i32) (param $p2 i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32) (local $l72 i32) (local $l73 i32) (local $l74 i32) (local $l75 i32) (local $l76 i32) (local $l77 i32) (local $l78 i32) (local $l79 i32) (local $l80 i32) (local $l81 i32) (local $l82 i32) (local $l83 i32) (local $l84 i32) (local $l85 i32) (local $l86 i32) (local $l87 i32) (local $l88 i32) (local $l89 i32) (local $l90 i32) (local $l91 i32) (local $l92 i32) (local $l93 i32) (local $l94 i32) (local $l95 i32) (local $l96 i32) (local $l97 i32) (local $l98 i32) (local $l99 i32) (local $l100 i32) (local $l101 i32) (local $l102 i32) (local $l103 i32) (local $l104 i32) (local $l105 i32) (local $l106 i32) (local $l107 i32) (local $l108 i32) (local $l109 i32) (local $l110 i32) (local $l111 i32) (local $l112 i32) (local $l113 i32) (local $l114 i32) (local $l115 i32) (local $l116 i32) (local $l117 i32) (local $l118 i32) (local $l119 i32) (local $l120 i32) (local $l121 i32) (local $l122 i32)
    (local.set $l3
      (global.get $__stack_pointer))
    (local.set $l4
      (i32.const 128))
    (local.set $l5
      (i32.sub
        (local.get $l3)
        (local.get $l4)))
    (global.set $__stack_pointer
      (local.get $l5))
    (i32.store offset=124
      (local.get $l5)
      (local.get $p0))
    (i32.store offset=120
      (local.get $l5)
      (local.get $p1))
    (i32.store offset=116
      (local.get $l5)
      (local.get $p2))
    (local.set $l6
      (i32.const 0))
    (i32.store offset=28
      (local.get $l5)
      (local.get $l6))
    (block $B0
      (loop $L1
        (local.set $l7
          (i32.load offset=28
            (local.get $l5)))
        (local.set $l8
          (i32.load offset=120
            (local.get $l5)))
        (local.set $l9
          (local.get $l7))
        (local.set $l10
          (local.get $l8))
        (local.set $l11
          (i32.lt_s
            (local.get $l9)
            (local.get $l10)))
        (local.set $l12
          (i32.const 1))
        (local.set $l13
          (i32.and
            (local.get $l11)
            (local.get $l12)))
        (br_if $B0
          (i32.eqz
            (local.get $l13)))
        (local.set $l14
          (i32.const 0))
        (i32.store offset=24
          (local.get $l5)
          (local.get $l14))
        (block $B2
          (loop $L3
            (local.set $l15
              (i32.load offset=24
                (local.get $l5)))
            (local.set $l16
              (i32.load offset=116
                (local.get $l5)))
            (local.set $l17
              (local.get $l15))
            (local.set $l18
              (local.get $l16))
            (local.set $l19
              (i32.lt_s
                (local.get $l17)
                (local.get $l18)))
            (local.set $l20
              (i32.const 1))
            (local.set $l21
              (i32.and
                (local.get $l19)
                (local.get $l20)))
            (br_if $B2
              (i32.eqz
                (local.get $l21)))
            (local.set $l22
              (i32.load offset=124
                (local.get $l5)))
            (local.set $l23
              (i32.load offset=120
                (local.get $l5)))
            (local.set $l24
              (i32.load offset=116
                (local.get $l5)))
            (local.set $l25
              (i32.load offset=28
                (local.get $l5)))
            (local.set $l26
              (i32.load offset=24
                (local.get $l5)))
            (local.set $l27
              (i32.const 20))
            (local.set $l28
              (i32.add
                (local.get $l5)
                (local.get $l27)))
            (local.set $l29
              (local.get $l28))
            (call $countAliveNeighbors
              (local.get $l22)
              (local.get $l23)
              (local.get $l24)
              (local.get $l25)
              (local.get $l26)
              (local.get $l29))
            (local.set $l30
              (i32.load offset=124
                (local.get $l5)))
            (local.set $l31
              (i32.load offset=28
                (local.get $l5)))
            (local.set $l32
              (i32.const 9))
            (local.set $l33
              (i32.mul
                (local.get $l31)
                (local.get $l32)))
            (local.set $l34
              (i32.add
                (local.get $l30)
                (local.get $l33)))
            (local.set $l35
              (i32.load offset=24
                (local.get $l5)))
            (local.set $l36
              (i32.add
                (local.get $l34)
                (local.get $l35)))
            (local.set $l37
              (i32.load8_u
                (local.get $l36)))
            (local.set $l38
              (i32.const 24))
            (local.set $l39
              (i32.shl
                (local.get $l37)
                (local.get $l38)))
            (local.set $l40
              (i32.shr_s
                (local.get $l39)
                (local.get $l38)))
            (block $B4
              (block $B5
                (br_if $B5
                  (i32.eqz
                    (local.get $l40)))
                (local.set $l41
                  (i32.load offset=20
                    (local.get $l5)))
                (local.set $l42
                  (i32.const 2))
                (local.set $l43
                  (local.get $l41))
                (local.set $l44
                  (local.get $l42))
                (local.set $l45
                  (i32.eq
                    (local.get $l43)
                    (local.get $l44)))
                (local.set $l46
                  (i32.const 1))
                (local.set $l47
                  (i32.const 1))
                (local.set $l48
                  (i32.and
                    (local.get $l45)
                    (local.get $l47)))
                (local.set $l49
                  (local.get $l46))
                (block $B6
                  (br_if $B6
                    (local.get $l48))
                  (local.set $l50
                    (i32.load offset=20
                      (local.get $l5)))
                  (local.set $l51
                    (i32.const 3))
                  (local.set $l52
                    (local.get $l50))
                  (local.set $l53
                    (local.get $l51))
                  (local.set $l54
                    (i32.eq
                      (local.get $l52)
                      (local.get $l53)))
                  (local.set $l49
                    (local.get $l54)))
                (local.set $l55
                  (local.get $l49))
                (local.set $l56
                  (i32.const 1))
                (local.set $l57
                  (i32.and
                    (local.get $l55)
                    (local.get $l56)))
                (local.set $l58
                  (local.get $l57))
                (br $B4))
              (local.set $l59
                (i32.load offset=20
                  (local.get $l5)))
              (local.set $l60
                (i32.const 3))
              (local.set $l61
                (local.get $l59))
              (local.set $l62
                (local.get $l60))
              (local.set $l63
                (i32.eq
                  (local.get $l61)
                  (local.get $l62)))
              (local.set $l64
                (i32.const 1))
              (local.set $l65
                (i32.and
                  (local.get $l63)
                  (local.get $l64)))
              (local.set $l58
                (local.get $l65)))
            (local.set $l66
              (local.get $l58))
            (local.set $l67
              (i32.load offset=28
                (local.get $l5)))
            (local.set $l68
              (i32.const 32))
            (local.set $l69
              (i32.add
                (local.get $l5)
                (local.get $l68)))
            (local.set $l70
              (local.get $l69))
            (local.set $l71
              (i32.const 9))
            (local.set $l72
              (i32.mul
                (local.get $l67)
                (local.get $l71)))
            (local.set $l73
              (i32.add
                (local.get $l70)
                (local.get $l72)))
            (local.set $l74
              (i32.load offset=24
                (local.get $l5)))
            (local.set $l75
              (i32.add
                (local.get $l73)
                (local.get $l74)))
            (i32.store8
              (local.get $l75)
              (local.get $l66))
            (local.set $l76
              (i32.load offset=24
                (local.get $l5)))
            (local.set $l77
              (i32.const 1))
            (local.set $l78
              (i32.add
                (local.get $l76)
                (local.get $l77)))
            (i32.store offset=24
              (local.get $l5)
              (local.get $l78))
            (br $L3))
          (unreachable))
        (local.set $l79
          (i32.load offset=28
            (local.get $l5)))
        (local.set $l80
          (i32.const 1))
        (local.set $l81
          (i32.add
            (local.get $l79)
            (local.get $l80)))
        (i32.store offset=28
          (local.get $l5)
          (local.get $l81))
        (br $L1))
      (unreachable))
    (local.set $l82
      (i32.const 0))
    (i32.store offset=16
      (local.get $l5)
      (local.get $l82))
    (block $B7
      (loop $L8
        (local.set $l83
          (i32.load offset=16
            (local.get $l5)))
        (local.set $l84
          (i32.load offset=120
            (local.get $l5)))
        (local.set $l85
          (local.get $l83))
        (local.set $l86
          (local.get $l84))
        (local.set $l87
          (i32.lt_s
            (local.get $l85)
            (local.get $l86)))
        (local.set $l88
          (i32.const 1))
        (local.set $l89
          (i32.and
            (local.get $l87)
            (local.get $l88)))
        (br_if $B7
          (i32.eqz
            (local.get $l89)))
        (local.set $l90
          (i32.const 0))
        (i32.store offset=12
          (local.get $l5)
          (local.get $l90))
        (block $B9
          (loop $L10
            (local.set $l91
              (i32.load offset=12
                (local.get $l5)))
            (local.set $l92
              (i32.load offset=116
                (local.get $l5)))
            (local.set $l93
              (local.get $l91))
            (local.set $l94
              (local.get $l92))
            (local.set $l95
              (i32.lt_s
                (local.get $l93)
                (local.get $l94)))
            (local.set $l96
              (i32.const 1))
            (local.set $l97
              (i32.and
                (local.get $l95)
                (local.get $l96)))
            (br_if $B9
              (i32.eqz
                (local.get $l97)))
            (local.set $l98
              (i32.load offset=16
                (local.get $l5)))
            (local.set $l99
              (i32.const 32))
            (local.set $l100
              (i32.add
                (local.get $l5)
                (local.get $l99)))
            (local.set $l101
              (local.get $l100))
            (local.set $l102
              (i32.const 9))
            (local.set $l103
              (i32.mul
                (local.get $l98)
                (local.get $l102)))
            (local.set $l104
              (i32.add
                (local.get $l101)
                (local.get $l103)))
            (local.set $l105
              (i32.load offset=12
                (local.get $l5)))
            (local.set $l106
              (i32.add
                (local.get $l104)
                (local.get $l105)))
            (local.set $l107
              (i32.load8_u
                (local.get $l106)))
            (local.set $l108
              (i32.load offset=124
                (local.get $l5)))
            (local.set $l109
              (i32.load offset=16
                (local.get $l5)))
            (local.set $l110
              (i32.const 9))
            (local.set $l111
              (i32.mul
                (local.get $l109)
                (local.get $l110)))
            (local.set $l112
              (i32.add
                (local.get $l108)
                (local.get $l111)))
            (local.set $l113
              (i32.load offset=12
                (local.get $l5)))
            (local.set $l114
              (i32.add
                (local.get $l112)
                (local.get $l113)))
            (i32.store8
              (local.get $l114)
              (local.get $l107))
            (local.set $l115
              (i32.load offset=12
                (local.get $l5)))
            (local.set $l116
              (i32.const 1))
            (local.set $l117
              (i32.add
                (local.get $l115)
                (local.get $l116)))
            (i32.store offset=12
              (local.get $l5)
              (local.get $l117))
            (br $L10))
          (unreachable))
        (local.set $l118
          (i32.load offset=16
            (local.get $l5)))
        (local.set $l119
          (i32.const 1))
        (local.set $l120
          (i32.add
            (local.get $l118)
            (local.get $l119)))
        (i32.store offset=16
          (local.get $l5)
          (local.get $l120))
        (br $L8))
      (unreachable))
    (local.set $l121
      (i32.const 128))
    (local.set $l122
      (i32.add
        (local.get $l5)
        (local.get $l121)))
    (global.set $__stack_pointer
      (local.get $l122))
    (return))
  (func $displayGrid (type $t2) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32)
    (local.set $l3
      (global.get $__stack_pointer))
    (local.set $l4
      (i32.const 32))
    (local.set $l5
      (i32.sub
        (local.get $l3)
        (local.get $l4)))
    (i32.store offset=28
      (local.get $l5)
      (local.get $p0))
    (i32.store offset=24
      (local.get $l5)
      (local.get $p1))
    (i32.store offset=20
      (local.get $l5)
      (local.get $p2))
    (local.set $l6
      (i32.const 0))
    (i32.store offset=16
      (local.get $l5)
      (local.get $l6))
    (local.set $l7
      (i32.const 0))
    (i32.store offset=12
      (local.get $l5)
      (local.get $l7))
    (block $B0
      (loop $L1
        (local.set $l8
          (i32.load offset=12
            (local.get $l5)))
        (local.set $l9
          (i32.load offset=24
            (local.get $l5)))
        (local.set $l10
          (local.get $l8))
        (local.set $l11
          (local.get $l9))
        (local.set $l12
          (i32.lt_s
            (local.get $l10)
            (local.get $l11)))
        (local.set $l13
          (i32.const 1))
        (local.set $l14
          (i32.and
            (local.get $l12)
            (local.get $l13)))
        (br_if $B0
          (i32.eqz
            (local.get $l14)))
        (local.set $l15
          (i32.const 0))
        (i32.store offset=8
          (local.get $l5)
          (local.get $l15))
        (block $B2
          (loop $L3
            (local.set $l16
              (i32.load offset=8
                (local.get $l5)))
            (local.set $l17
              (i32.load offset=20
                (local.get $l5)))
            (local.set $l18
              (local.get $l16))
            (local.set $l19
              (local.get $l17))
            (local.set $l20
              (i32.lt_s
                (local.get $l18)
                (local.get $l19)))
            (local.set $l21
              (i32.const 1))
            (local.set $l22
              (i32.and
                (local.get $l20)
                (local.get $l21)))
            (br_if $B2
              (i32.eqz
                (local.get $l22)))
            (local.set $l23
              (i32.load offset=16
                (local.get $l5)))
            (local.set $l24
              (i32.const 79))
            (local.set $l25
              (local.get $l23))
            (local.set $l26
              (local.get $l24))
            (local.set $l27
              (i32.lt_s
                (local.get $l25)
                (local.get $l26)))
            (local.set $l28
              (i32.const 1))
            (local.set $l29
              (i32.and
                (local.get $l27)
                (local.get $l28)))
            (block $B4
              (br_if $B4
                (i32.eqz
                  (local.get $l29)))
              (local.set $l30
                (i32.load offset=28
                  (local.get $l5)))
              (local.set $l31
                (i32.load offset=12
                  (local.get $l5)))
              (local.set $l32
                (i32.const 9))
              (local.set $l33
                (i32.mul
                  (local.get $l31)
                  (local.get $l32)))
              (local.set $l34
                (i32.add
                  (local.get $l30)
                  (local.get $l33)))
              (local.set $l35
                (i32.load offset=8
                  (local.get $l5)))
              (local.set $l36
                (i32.add
                  (local.get $l34)
                  (local.get $l35)))
              (local.set $l37
                (i32.load8_u
                  (local.get $l36)))
              (local.set $l38
                (i32.const 24))
              (local.set $l39
                (i32.shl
                  (local.get $l37)
                  (local.get $l38)))
              (local.set $l40
                (i32.shr_s
                  (local.get $l39)
                  (local.get $l38)))
              (local.set $l41
                (i32.const 36))
              (local.set $l42
                (i32.const 46))
              (local.set $l43
                (select
                  (local.get $l41)
                  (local.get $l42)
                  (local.get $l40)))
              (local.set $l44
                (i32.load offset=16
                  (local.get $l5)))
              (local.set $l45
                (i32.const 1))
              (local.set $l46
                (i32.add
                  (local.get $l44)
                  (local.get $l45)))
              (i32.store offset=16
                (local.get $l5)
                (local.get $l46))
              (i32.store8 offset=1120
                (local.get $l44)
                (local.get $l43)))
            (local.set $l47
              (i32.load offset=8
                (local.get $l5)))
            (local.set $l48
              (i32.const 1))
            (local.set $l49
              (i32.add
                (local.get $l47)
                (local.get $l48)))
            (i32.store offset=8
              (local.get $l5)
              (local.get $l49))
            (br $L3))
          (unreachable))
        (local.set $l50
          (i32.load offset=16
            (local.get $l5)))
        (local.set $l51
          (i32.const 79))
        (local.set $l52
          (local.get $l50))
        (local.set $l53
          (local.get $l51))
        (local.set $l54
          (i32.lt_s
            (local.get $l52)
            (local.get $l53)))
        (local.set $l55
          (i32.const 1))
        (local.set $l56
          (i32.and
            (local.get $l54)
            (local.get $l55)))
        (block $B5
          (br_if $B5
            (i32.eqz
              (local.get $l56)))
          (local.set $l57
            (i32.load offset=16
              (local.get $l5)))
          (local.set $l58
            (i32.const 1))
          (local.set $l59
            (i32.add
              (local.get $l57)
              (local.get $l58)))
          (i32.store offset=16
            (local.get $l5)
            (local.get $l59))
          (local.set $l60
            (i32.const 10))
          (i32.store8 offset=1120
            (local.get $l57)
            (local.get $l60)))
        (local.set $l61
          (i32.load offset=12
            (local.get $l5)))
        (local.set $l62
          (i32.const 1))
        (local.set $l63
          (i32.add
            (local.get $l61)
            (local.get $l62)))
        (i32.store offset=12
          (local.get $l5)
          (local.get $l63))
        (br $L1))
      (unreachable))
    (local.set $l64
      (i32.load offset=16
        (local.get $l5)))
    (local.set $l65
      (i32.const 0))
    (i32.store8 offset=1120
      (local.get $l64)
      (local.get $l65))
    (local.set $l66
      (i32.const 1120))
    (return
      (local.get $l66)))
  (func $entry (export "entry") (type $t3) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32) (local $l3 i32) (local $l4 i32) (local $l5 i32) (local $l6 i32) (local $l7 i32) (local $l8 i32) (local $l9 i32) (local $l10 i32) (local $l11 i32) (local $l12 i32) (local $l13 i32) (local $l14 i32) (local $l15 i32) (local $l16 i32) (local $l17 i32) (local $l18 i32) (local $l19 i32) (local $l20 i32) (local $l21 i32) (local $l22 i32) (local $l23 i32) (local $l24 i32) (local $l25 i32) (local $l26 i32) (local $l27 i32) (local $l28 i32) (local $l29 i32) (local $l30 i32) (local $l31 i32) (local $l32 i32) (local $l33 i32) (local $l34 i32) (local $l35 i32) (local $l36 i32) (local $l37 i32) (local $l38 i32) (local $l39 i32) (local $l40 i32) (local $l41 i32) (local $l42 i32) (local $l43 i32) (local $l44 i32) (local $l45 i32) (local $l46 i32) (local $l47 i32) (local $l48 i32) (local $l49 i32) (local $l50 i32) (local $l51 i32) (local $l52 i32) (local $l53 i32) (local $l54 i32) (local $l55 i32) (local $l56 i32) (local $l57 i32) (local $l58 i32) (local $l59 i32) (local $l60 i32) (local $l61 i32) (local $l62 i32) (local $l63 i32) (local $l64 i32) (local $l65 i32) (local $l66 i32) (local $l67 i32) (local $l68 i32) (local $l69 i32) (local $l70 i32) (local $l71 i32)
    (local.set $l1
      (global.get $__stack_pointer))
    (local.set $l2
      (i32.const 208))
    (local.set $l3
      (i32.sub
        (local.get $l1)
        (local.get $l2)))
    (global.set $__stack_pointer
      (local.get $l3))
    (i32.store offset=204
      (local.get $l3)
      (local.get $p0))
    (local.set $l4
      (i32.const 16))
    (local.set $l5
      (i32.add
        (local.get $l3)
        (local.get $l4)))
    (local.set $l6
      (local.get $l5))
    (local.set $l7
      (i32.const 1024))
    (local.set $l8
      (i32.const 81))
    (drop
      (call $__memcpy
        (local.get $l6)
        (local.get $l7)
        (local.get $l8)))
    (local.set $l9
      (i32.const 0))
    (i32.store offset=12
      (local.get $l3)
      (local.get $l9))
    (block $B0
      (loop $L1
        (local.set $l10
          (i32.load offset=12
            (local.get $l3)))
        (local.set $l11
          (i32.const 9))
        (local.set $l12
          (local.get $l10))
        (local.set $l13
          (local.get $l11))
        (local.set $l14
          (i32.lt_s
            (local.get $l12)
            (local.get $l13)))
        (local.set $l15
          (i32.const 1))
        (local.set $l16
          (i32.and
            (local.get $l14)
            (local.get $l15)))
        (br_if $B0
          (i32.eqz
            (local.get $l16)))
        (local.set $l17
          (i32.const 0))
        (i32.store offset=8
          (local.get $l3)
          (local.get $l17))
        (block $B2
          (loop $L3
            (local.set $l18
              (i32.load offset=8
                (local.get $l3)))
            (local.set $l19
              (i32.const 9))
            (local.set $l20
              (local.get $l18))
            (local.set $l21
              (local.get $l19))
            (local.set $l22
              (i32.lt_s
                (local.get $l20)
                (local.get $l21)))
            (local.set $l23
              (i32.const 1))
            (local.set $l24
              (i32.and
                (local.get $l22)
                (local.get $l23)))
            (br_if $B2
              (i32.eqz
                (local.get $l24)))
            (local.set $l25
              (i32.load offset=12
                (local.get $l3)))
            (local.set $l26
              (i32.const 16))
            (local.set $l27
              (i32.add
                (local.get $l3)
                (local.get $l26)))
            (local.set $l28
              (local.get $l27))
            (local.set $l29
              (i32.const 9))
            (local.set $l30
              (i32.mul
                (local.get $l25)
                (local.get $l29)))
            (local.set $l31
              (i32.add
                (local.get $l28)
                (local.get $l30)))
            (local.set $l32
              (i32.load offset=8
                (local.get $l3)))
            (local.set $l33
              (i32.add
                (local.get $l31)
                (local.get $l32)))
            (local.set $l34
              (i32.load8_u
                (local.get $l33)))
            (local.set $l35
              (i32.load offset=12
                (local.get $l3)))
            (local.set $l36
              (i32.const 112))
            (local.set $l37
              (i32.add
                (local.get $l3)
                (local.get $l36)))
            (local.set $l38
              (local.get $l37))
            (local.set $l39
              (i32.const 9))
            (local.set $l40
              (i32.mul
                (local.get $l35)
                (local.get $l39)))
            (local.set $l41
              (i32.add
                (local.get $l38)
                (local.get $l40)))
            (local.set $l42
              (i32.load offset=8
                (local.get $l3)))
            (local.set $l43
              (i32.add
                (local.get $l41)
                (local.get $l42)))
            (i32.store8
              (local.get $l43)
              (local.get $l34))
            (local.set $l44
              (i32.load offset=8
                (local.get $l3)))
            (local.set $l45
              (i32.const 1))
            (local.set $l46
              (i32.add
                (local.get $l44)
                (local.get $l45)))
            (i32.store offset=8
              (local.get $l3)
              (local.get $l46))
            (br $L3))
          (unreachable))
        (local.set $l47
          (i32.load offset=12
            (local.get $l3)))
        (local.set $l48
          (i32.const 1))
        (local.set $l49
          (i32.add
            (local.get $l47)
            (local.get $l48)))
        (i32.store offset=12
          (local.get $l3)
          (local.get $l49))
        (br $L1))
      (unreachable))
    (local.set $l50
      (i32.const 0))
    (i32.store offset=4
      (local.get $l3)
      (local.get $l50))
    (block $B4
      (loop $L5
        (local.set $l51
          (i32.load offset=4
            (local.get $l3)))
        (local.set $l52
          (i32.load offset=204
            (local.get $l3)))
        (local.set $l53
          (local.get $l51))
        (local.set $l54
          (local.get $l52))
        (local.set $l55
          (i32.lt_s
            (local.get $l53)
            (local.get $l54)))
        (local.set $l56
          (i32.const 1))
        (local.set $l57
          (i32.and
            (local.get $l55)
            (local.get $l56)))
        (br_if $B4
          (i32.eqz
            (local.get $l57)))
        (local.set $l58
          (i32.const 112))
        (local.set $l59
          (i32.add
            (local.get $l3)
            (local.get $l58)))
        (local.set $l60
          (local.get $l59))
        (local.set $l61
          (i32.const 9))
        (call $updateGrid
          (local.get $l60)
          (local.get $l61)
          (local.get $l61))
        (local.set $l62
          (i32.load offset=4
            (local.get $l3)))
        (local.set $l63
          (i32.const 1))
        (local.set $l64
          (i32.add
            (local.get $l62)
            (local.get $l63)))
        (i32.store offset=4
          (local.get $l3)
          (local.get $l64))
        (br $L5))
      (unreachable))
    (local.set $l65
      (i32.const 112))
    (local.set $l66
      (i32.add
        (local.get $l3)
        (local.get $l65)))
    (local.set $l67
      (local.get $l66))
    (local.set $l68
      (i32.const 9))
    (local.set $l69
      (call $displayGrid
        (local.get $l67)
        (local.get $l68)
        (local.get $l68)))
    (local.set $l70
      (i32.const 208))
    (local.set $l71
      (i32.add
        (local.get $l3)
        (local.get $l70)))
    (global.set $__stack_pointer
      (local.get $l71))
    (return
      (local.get $l69)))
  (func $_initialize (export "_initialize") (type $t1)
    (block $B0
      (br_if $B0
        (i32.eqz
          (i32.const 1)))
      (call $__wasm_call_ctors)))
  (func $__memcpy (type $t2) (param $p0 i32) (param $p1 i32) (param $p2 i32) (result i32)
    (local $l3 i32) (local $l4 i32) (local $l5 i32)
    (local.set $l3
      (i32.add
        (local.get $p0)
        (local.get $p2)))
    (block $B0
      (block $B1
        (block $B2
          (block $B3
            (br_if $B3
              (i32.and
                (i32.xor
                  (local.get $p1)
                  (local.get $p0))
                (i32.const 3)))
            (br_if $B2
              (i32.eqz
                (i32.and
                  (local.get $p0)
                  (i32.const 3))))
            (br_if $B2
              (i32.lt_s
                (local.get $p2)
                (i32.const 1)))
            (local.set $p2
              (local.get $p0))
            (loop $L4
              (i32.store8
                (local.get $p2)
                (i32.load8_u
                  (local.get $p1)))
              (local.set $p1
                (i32.add
                  (local.get $p1)
                  (i32.const 1)))
              (br_if $B1
                (i32.eqz
                  (i32.and
                    (local.tee $p2
                      (i32.add
                        (local.get $p2)
                        (i32.const 1)))
                    (i32.const 3))))
              (br_if $L4
                (i32.lt_u
                  (local.get $p2)
                  (local.get $l3)))
              (br $B1))
            (unreachable))
          (block $B5
            (br_if $B5
              (i32.lt_u
                (local.get $l3)
                (i32.const 4)))
            (br_if $B5
              (i32.lt_u
                (local.tee $l4
                  (i32.add
                    (local.get $l3)
                    (i32.const -4)))
                (local.get $p0)))
            (local.set $p2
              (local.get $p0))
            (loop $L6
              (i32.store8
                (local.get $p2)
                (i32.load8_u
                  (local.get $p1)))
              (i32.store8 offset=1
                (local.get $p2)
                (i32.load8_u offset=1
                  (local.get $p1)))
              (i32.store8 offset=2
                (local.get $p2)
                (i32.load8_u offset=2
                  (local.get $p1)))
              (i32.store8 offset=3
                (local.get $p2)
                (i32.load8_u offset=3
                  (local.get $p1)))
              (local.set $p1
                (i32.add
                  (local.get $p1)
                  (i32.const 4)))
              (br_if $L6
                (i32.le_u
                  (local.tee $p2
                    (i32.add
                      (local.get $p2)
                      (i32.const 4)))
                  (local.get $l4)))
              (br $B0))
            (unreachable))
          (local.set $p2
            (local.get $p0))
          (br $B0))
        (local.set $p2
          (local.get $p0)))
      (block $B7
        (br_if $B7
          (i32.lt_u
            (local.tee $l4
              (i32.and
                (local.get $l3)
                (i32.const -4)))
            (i32.const 64)))
        (br_if $B7
          (i32.gt_u
            (local.get $p2)
            (local.tee $l5
              (i32.add
                (local.get $l4)
                (i32.const -64)))))
        (loop $L8
          (i32.store
            (local.get $p2)
            (i32.load
              (local.get $p1)))
          (i32.store offset=4
            (local.get $p2)
            (i32.load offset=4
              (local.get $p1)))
          (i32.store offset=8
            (local.get $p2)
            (i32.load offset=8
              (local.get $p1)))
          (i32.store offset=12
            (local.get $p2)
            (i32.load offset=12
              (local.get $p1)))
          (i32.store offset=16
            (local.get $p2)
            (i32.load offset=16
              (local.get $p1)))
          (i32.store offset=20
            (local.get $p2)
            (i32.load offset=20
              (local.get $p1)))
          (i32.store offset=24
            (local.get $p2)
            (i32.load offset=24
              (local.get $p1)))
          (i32.store offset=28
            (local.get $p2)
            (i32.load offset=28
              (local.get $p1)))
          (i32.store offset=32
            (local.get $p2)
            (i32.load offset=32
              (local.get $p1)))
          (i32.store offset=36
            (local.get $p2)
            (i32.load offset=36
              (local.get $p1)))
          (i32.store offset=40
            (local.get $p2)
            (i32.load offset=40
              (local.get $p1)))
          (i32.store offset=44
            (local.get $p2)
            (i32.load offset=44
              (local.get $p1)))
          (i32.store offset=48
            (local.get $p2)
            (i32.load offset=48
              (local.get $p1)))
          (i32.store offset=52
            (local.get $p2)
            (i32.load offset=52
              (local.get $p1)))
          (i32.store offset=56
            (local.get $p2)
            (i32.load offset=56
              (local.get $p1)))
          (i32.store offset=60
            (local.get $p2)
            (i32.load offset=60
              (local.get $p1)))
          (local.set $p1
            (i32.add
              (local.get $p1)
              (i32.const 64)))
          (br_if $L8
            (i32.le_u
              (local.tee $p2
                (i32.add
                  (local.get $p2)
                  (i32.const 64)))
              (local.get $l5)))))
      (br_if $B0
        (i32.ge_u
          (local.get $p2)
          (local.get $l4)))
      (loop $L9
        (i32.store
          (local.get $p2)
          (i32.load
            (local.get $p1)))
        (local.set $p1
          (i32.add
            (local.get $p1)
            (i32.const 4)))
        (br_if $L9
          (i32.lt_u
            (local.tee $p2
              (i32.add
                (local.get $p2)
                (i32.const 4)))
            (local.get $l4)))))
    (block $B10
      (br_if $B10
        (i32.ge_u
          (local.get $p2)
          (local.get $l3)))
      (loop $L11
        (i32.store8
          (local.get $p2)
          (i32.load8_u
            (local.get $p1)))
        (local.set $p1
          (i32.add
            (local.get $p1)
            (i32.const 1)))
        (br_if $L11
          (i32.ne
            (local.tee $p2
              (i32.add
                (local.get $p2)
                (i32.const 1)))
            (local.get $l3)))))
    (local.get $p0))
  (func $stackSave (export "stackSave") (type $t0) (result i32)
    (global.get $__stack_pointer))
  (func $stackRestore (export "stackRestore") (type $t6) (param $p0 i32)
    (global.set $__stack_pointer
      (local.get $p0)))
  (func $stackAlloc (export "stackAlloc") (type $t3) (param $p0 i32) (result i32)
    (local $l1 i32) (local $l2 i32)
    (global.set $__stack_pointer
      (local.tee $l1
        (i32.and
          (i32.sub
            (global.get $__stack_pointer)
            (local.get $p0))
          (i32.const -16))))
    (local.get $l1))
  (func $emscripten_stack_init (export "emscripten_stack_init") (type $t1)
    (global.set $__stack_base
      (i32.const 5244096))
    (global.set $__stack_end
      (i32.and
        (i32.add
          (i32.const 1208)
          (i32.const 15))
        (i32.const -16))))
  (func $emscripten_stack_get_free (export "emscripten_stack_get_free") (type $t0) (result i32)
    (i32.sub
      (global.get $__stack_pointer)
      (global.get $__stack_end)))
  (func $emscripten_stack_get_base (export "emscripten_stack_get_base") (type $t0) (result i32)
    (global.get $__stack_base))
  (func $emscripten_stack_get_end (export "emscripten_stack_get_end") (type $t0) (result i32)
    (global.get $__stack_end))
  (func $__errno_location (export "__errno_location") (type $t0) (result i32)
    (i32.const 1204))
  (table $__indirect_function_table (export "__indirect_function_table") 2 2 funcref)
  (memory $memory (export "memory") 256 256)
  (global $__stack_pointer (mut i32) (i32.const 5244096))
  (global $__stack_end (mut i32) (i32.const 0))
  (global $__stack_base (mut i32) (i32.const 0))
  (elem $e0 (i32.const 1) func $__wasm_call_ctors)
  (data $.rodata (i32.const 1024) "\01\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\01\01\01\00\00\00\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00"))
