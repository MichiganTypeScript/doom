(module
  (type $add_t (func (param i32 i32) (result i32)))

  ;; Define a function that takes two i32 parameters and returns their sum.
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add)

  ;; Declare a table of type funcref with one element.
  (table $__indirect_function_table 1 funcref)

  ;; Populate the table with the $add function at index 0.
  (elem $e0 (i32.const 0) $add)

  ;; Define a function to perform an indirect call to the function in the table.
  (func $indirect_call (param $a i32) (param $b i32) (result i32)
    ;; The index in the table (0 in this case) and the parameters for the call.
    i32.const 0
    local.get $a
    local.get $b

    ;; Perform the indirect call. The type signature is (param i32 i32) (result i32).
    call_indirect $__indirect_function_table (type $add_t)
  )
)