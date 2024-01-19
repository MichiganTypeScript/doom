use std::fmt::Display;

use indexmap::IndexMap;
use wast::{
    core::{Instruction, Module, ModuleField, ModuleKind, ValType},
    token::Index,
};

use crate::{
    fragment::Fragment,
    source_file::{SourceFile, TypeConstraint},
};

#[macro_export]
macro_rules! dbg_dump_file {
    ($expr:expr, $filename:expr) => {{
        let mut file_path = std::env::current_dir().unwrap();
        file_path.push($filename);

        let _ = std::fs::write(&file_path, $expr);
        // println!("{}", $filename);
        // println!("{}", file_source);
    }};
}

pub fn format_index_name(index: usize) -> String {
    format!("i_{index}")
}

pub fn format_call_id<I: Into<String>>(id: I) -> String {
    format!("${}", id.into())
}

pub fn format_index(index: &Index) -> String {
    match index {
        Index::Id(id) => "$".to_string() + id.name(),
        Index::Num(num, _) => format_index_name(*num as usize),
    }
}

pub fn map_valtype_to_typeconstraint(val_type: &ValType) -> TypeConstraint {
    match *val_type {
        ValType::F32 | ValType::F64 | ValType::I32 | ValType::I64 => TypeConstraint::Number,
        ValType::Ref(_) | ValType::V128 => {
            panic!("not a supported return type")
        }
    }
}

pub fn hotscript_unary<N: Into<String> + Copy>(
    source: &mut SourceFile,
    stack: &mut Vec<Fragment>,
    namespace: N,
    method: N,
    result_type_constraint: TypeConstraint,
    is_predicate: bool,
) {
    source.add_import("hotscript", "Call");
    source.add_import("hotscript", namespace.into());

    let mut operand = stack
        .pop()
        .unwrap_or_else(|| panic!("{} lines", &method.into()));

    let indent = operand
        .lines
        .first()
        .unwrap_or_else(|| panic!("{} indent", &method.into()))
        .indent;
    operand.increase_indent();

    let mut f = Fragment::new(result_type_constraint);

    let predicate_prefix = if is_predicate { "(" } else { "" };
    let predicate_suffix = if is_predicate {
        " extends true ? 1 : 0)"
    } else {
        ""
    };

    f.line(
        indent,
        format!(
            "{}Call<{}.{}<",
            predicate_prefix,
            namespace.into(),
            method.into()
        ),
    );
    f.lines(&mut operand.lines);
    f.line(indent, format!(">>{predicate_suffix}"));

    stack.push(f);
}

pub fn hotscript_binary<N: Into<String> + Copy + Display>(
    source: &mut SourceFile,
    stack: &mut Vec<Fragment>,
    namespace: N,
    method: N,
    result_type_constraint: TypeConstraint,
    is_predicate: bool,
) {
    source.add_import("hotscript", "Call");
    source.add_import("hotscript", namespace.into());

    let mut rhs = stack
        .pop()
        .unwrap_or_else(|| panic!("{} rhs pop", &method.into()));
    let mut lhs = stack
        .pop()
        .unwrap_or_else(|| panic!("{} lhs pop", &method.into()));

    let mut f = Fragment::new(result_type_constraint);

    let indent = rhs
        .lines
        .first()
        .unwrap_or_else(|| panic!("{} indent", &method.into()))
        .indent;

    let predicate_prefix = if is_predicate { "(" } else { "" };
    let predicate_suffix = if is_predicate {
        " extends true ? 1 : 0)"
    } else {
        ""
    };

    f.line(
        indent,
        format!(
            "{}Call<{}.{}<",
            predicate_prefix,
            namespace.into(),
            &method.into()
        ),
    );

    lhs.increase_indent();
    lhs.map_lines(|text| format!("{text},"));
    f.lines(&mut lhs.lines);

    rhs.increase_indent();
    f.lines(&mut rhs.lines);

    f.line(indent, format!(">>{predicate_suffix}"));
    stack.push(f);
}

pub fn get_param_name(index: usize, maybe_name: &Option<String>) -> String {
    if let Some(name) = maybe_name {
        name.to_string()
    } else {
        format_index_name(index)
    }
}

pub fn count_instructions(module: &Module) -> IndexMap<String, u32> {
    let mut counts = IndexMap::new();

    if let ModuleKind::Text(fields) = &module.kind {
        for field in fields {
            if let ModuleField::Func(func) = field {
                if let wast::core::FuncKind::Inline {
                    locals: _,
                    expression,
                } = &func.kind
                {
                    for instr in expression.instrs.iter() {
                        // https://webassembly.github.io/spec/core/exec/instructions.html
                        match instr {
                            Instruction::LocalGet(_) => {
                                *counts.entry("LocalGet".to_string()).or_insert(0) += 1
                            }
                            Instruction::Block(_) => {
                                *counts.entry("Block".to_string()).or_insert(0) += 1
                            }
                            Instruction::If(_) => *counts.entry("If".to_string()).or_insert(0) += 1,
                            Instruction::Else(_) => {
                                *counts.entry("Else".to_string()).or_insert(0) += 1
                            }
                            Instruction::Loop(_) => {
                                *counts.entry("Loop".to_string()).or_insert(0) += 1
                            }
                            Instruction::End(_) => {
                                *counts.entry("End".to_string()).or_insert(0) += 1
                            }
                            Instruction::Unreachable => {
                                *counts.entry("Unreachable".to_string()).or_insert(0) += 1
                            }
                            Instruction::Nop => *counts.entry("Nop".to_string()).or_insert(0) += 1,
                            Instruction::Br(_) => *counts.entry("Br".to_string()).or_insert(0) += 1,
                            Instruction::BrIf(_) => {
                                *counts.entry("BrIf".to_string()).or_insert(0) += 1
                            }
                            Instruction::BrTable(_) => {
                                *counts.entry("BrTable".to_string()).or_insert(0) += 1
                            }
                            Instruction::Return => {
                                *counts.entry("Return".to_string()).or_insert(0) += 1
                            }
                            Instruction::Call(_) => {
                                *counts.entry("Call".to_string()).or_insert(0) += 1
                            }
                            Instruction::CallIndirect(_) => {
                                *counts.entry("CallIndirect".to_string()).or_insert(0) += 1
                            }
                            Instruction::ReturnCall(_) => {
                                *counts.entry("ReturnCall".to_string()).or_insert(0) += 1
                            }
                            Instruction::ReturnCallIndirect(_) => {
                                *counts.entry("ReturnCallIndirect".to_string()).or_insert(0) += 1
                            }
                            Instruction::CallRef(_) => {
                                *counts.entry("CallRef".to_string()).or_insert(0) += 1
                            }
                            Instruction::ReturnCallRef(_) => {
                                *counts.entry("ReturnCallRef".to_string()).or_insert(0) += 1
                            }
                            Instruction::FuncBind(_) => {
                                *counts.entry("FuncBind".to_string()).or_insert(0) += 1
                            }
                            Instruction::Let(_) => {
                                *counts.entry("Let".to_string()).or_insert(0) += 1
                            }
                            Instruction::Drop => {
                                *counts.entry("Drop".to_string()).or_insert(0) += 1
                            }
                            Instruction::Select(_) => {
                                *counts.entry("Select".to_string()).or_insert(0) += 1
                            }
                            Instruction::LocalSet(_) => {
                                *counts.entry("LocalSet".to_string()).or_insert(0) += 1
                            }
                            Instruction::LocalTee(_) => {
                                *counts.entry("LocalTee".to_string()).or_insert(0) += 1
                            }
                            Instruction::GlobalGet(_) => {
                                *counts.entry("GlobalGet".to_string()).or_insert(0) += 1
                            }
                            Instruction::GlobalSet(_) => {
                                *counts.entry("GlobalSet".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableGet(_) => {
                                *counts.entry("TableGet".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableSet(_) => {
                                *counts.entry("TableSet".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Load(_) => {
                                *counts.entry("I32Load".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load(_) => {
                                *counts.entry("I64Load".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Load(_) => {
                                *counts.entry("F32Load".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Load(_) => {
                                *counts.entry("F64Load".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Load8s(_) => {
                                *counts.entry("I32Load8s".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Load8u(_) => {
                                *counts.entry("I32Load8u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Load16s(_) => {
                                *counts.entry("I32Load16s".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Load16u(_) => {
                                *counts.entry("I32Load16u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load8s(_) => {
                                *counts.entry("I64Load8s".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load8u(_) => {
                                *counts.entry("I64Load8u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load16s(_) => {
                                *counts.entry("I64Load16s".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load16u(_) => {
                                *counts.entry("I64Load16u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load32s(_) => {
                                *counts.entry("I64Load32s".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Load32u(_) => {
                                *counts.entry("I64Load32u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Store(_) => {
                                *counts.entry("I32Store".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Store(_) => {
                                *counts.entry("I64Store".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Store(_) => {
                                *counts.entry("F32Store".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Store(_) => {
                                *counts.entry("F64Store".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Store8(_) => {
                                *counts.entry("I32Store8".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Store16(_) => {
                                *counts.entry("I32Store16".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Store8(_) => {
                                *counts.entry("I64Store8".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Store16(_) => {
                                *counts.entry("I64Store16".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Store32(_) => {
                                *counts.entry("I64Store32".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemorySize(_) => {
                                *counts.entry("MemorySize".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryGrow(_) => {
                                *counts.entry("MemoryGrow".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryInit(_) => {
                                *counts.entry("MemoryInit".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryCopy(_) => {
                                *counts.entry("MemoryCopy".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryFill(_) => {
                                *counts.entry("MemoryFill".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryDiscard(_) => {
                                *counts.entry("MemoryDiscard".to_string()).or_insert(0) += 1
                            }
                            Instruction::DataDrop(_) => {
                                *counts.entry("DataDrop".to_string()).or_insert(0) += 1
                            }
                            Instruction::ElemDrop(_) => {
                                *counts.entry("ElemDrop".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableInit(_) => {
                                *counts.entry("TableInit".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableCopy(_) => {
                                *counts.entry("TableCopy".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableFill(_) => {
                                *counts.entry("TableFill".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableSize(_) => {
                                *counts.entry("TableSize".to_string()).or_insert(0) += 1
                            }
                            Instruction::TableGrow(_) => {
                                *counts.entry("TableGrow".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefNull(_) => {
                                *counts.entry("RefNull".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefIsNull => {
                                *counts.entry("RefIsNull".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefFunc(_) => {
                                *counts.entry("RefFunc".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefAsNonNull => {
                                *counts.entry("RefAsNonNull".to_string()).or_insert(0) += 1
                            }
                            Instruction::BrOnNull(_) => {
                                *counts.entry("BrOnNull".to_string()).or_insert(0) += 1
                            }
                            Instruction::BrOnNonNull(_) => {
                                *counts.entry("BrOnNonNull".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefEq => {
                                *counts.entry("RefEq".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructNew(_) => {
                                *counts.entry("StructNew".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructNewDefault(_) => {
                                *counts.entry("StructNewDefault".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructGet(_) => {
                                *counts.entry("StructGet".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructGetS(_) => {
                                *counts.entry("StructGetS".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructGetU(_) => {
                                *counts.entry("StructGetU".to_string()).or_insert(0) += 1
                            }
                            Instruction::StructSet(_) => {
                                *counts.entry("StructSet".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayNew(_) => {
                                *counts.entry("ArrayNew".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayNewDefault(_) => {
                                *counts.entry("ArrayNewDefault".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayNewFixed(_) => {
                                *counts.entry("ArrayNewFixed".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayNewData(_) => {
                                *counts.entry("ArrayNewData".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayNewElem(_) => {
                                *counts.entry("ArrayNewElem".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayGet(_) => {
                                *counts.entry("ArrayGet".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayGetS(_) => {
                                *counts.entry("ArrayGetS".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayGetU(_) => {
                                *counts.entry("ArrayGetU".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArraySet(_) => {
                                *counts.entry("ArraySet".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayLen => {
                                *counts.entry("ArrayLen".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayFill(_) => {
                                *counts.entry("ArrayFill".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayCopy(_) => {
                                *counts.entry("ArrayCopy".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayInitData(_) => {
                                *counts.entry("ArrayInitData".to_string()).or_insert(0) += 1
                            }
                            Instruction::ArrayInitElem(_) => {
                                *counts.entry("ArrayInitElem".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefI31 => {
                                *counts.entry("RefI31".to_string()).or_insert(0) += 1
                            }
                            Instruction::I31GetS => {
                                *counts.entry("I31GetS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I31GetU => {
                                *counts.entry("I31GetU".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefTest(_) => {
                                *counts.entry("RefTest".to_string()).or_insert(0) += 1
                            }
                            Instruction::RefCast(_) => {
                                *counts.entry("RefCast".to_string()).or_insert(0) += 1
                            }
                            Instruction::BrOnCast(_) => {
                                *counts.entry("BrOnCast".to_string()).or_insert(0) += 1
                            }
                            Instruction::BrOnCastFail(_) => {
                                *counts.entry("BrOnCastFail".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Const(_) => {
                                *counts.entry("I32Const".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Const(_) => {
                                *counts.entry("I64Const".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Const(_) => {
                                *counts.entry("F32Const".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Const(_) => {
                                *counts.entry("F64Const".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Clz => {
                                *counts.entry("I32Clz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Ctz => {
                                *counts.entry("I32Ctz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Popcnt => {
                                *counts.entry("I32Popcnt".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Add => {
                                *counts.entry("I32Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Sub => {
                                *counts.entry("I32Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Mul => {
                                *counts.entry("I32Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32DivS => {
                                *counts.entry("I32DivS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32DivU => {
                                *counts.entry("I32DivU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32RemS => {
                                *counts.entry("I32RemS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32RemU => {
                                *counts.entry("I32RemU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32And => {
                                *counts.entry("I32And".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Or => {
                                *counts.entry("I32Or".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Xor => {
                                *counts.entry("I32Xor".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Shl => {
                                *counts.entry("I32Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32ShrS => {
                                *counts.entry("I32ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32ShrU => {
                                *counts.entry("I32ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Rotl => {
                                *counts.entry("I32Rotl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Rotr => {
                                *counts.entry("I32Rotr".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Clz => {
                                *counts.entry("I64Clz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Ctz => {
                                *counts.entry("I64Ctz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Popcnt => {
                                *counts.entry("I64Popcnt".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Add => {
                                *counts.entry("I64Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Sub => {
                                *counts.entry("I64Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Mul => {
                                *counts.entry("I64Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64DivS => {
                                *counts.entry("I64DivS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64DivU => {
                                *counts.entry("I64DivU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64RemS => {
                                *counts.entry("I64RemS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64RemU => {
                                *counts.entry("I64RemU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64And => {
                                *counts.entry("I64And".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Or => {
                                *counts.entry("I64Or".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Xor => {
                                *counts.entry("I64Xor".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Shl => {
                                *counts.entry("I64Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64ShrS => {
                                *counts.entry("I64ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64ShrU => {
                                *counts.entry("I64ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Rotl => {
                                *counts.entry("I64Rotl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Rotr => {
                                *counts.entry("I64Rotr".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Abs => {
                                *counts.entry("F32Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Neg => {
                                *counts.entry("F32Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Ceil => {
                                *counts.entry("F32Ceil".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Floor => {
                                *counts.entry("F32Floor".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Trunc => {
                                *counts.entry("F32Trunc".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Nearest => {
                                *counts.entry("F32Nearest".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Sqrt => {
                                *counts.entry("F32Sqrt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Add => {
                                *counts.entry("F32Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Sub => {
                                *counts.entry("F32Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Mul => {
                                *counts.entry("F32Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Div => {
                                *counts.entry("F32Div".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Min => {
                                *counts.entry("F32Min".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Max => {
                                *counts.entry("F32Max".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Copysign => {
                                *counts.entry("F32Copysign".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Abs => {
                                *counts.entry("F64Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Neg => {
                                *counts.entry("F64Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Ceil => {
                                *counts.entry("F64Ceil".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Floor => {
                                *counts.entry("F64Floor".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Trunc => {
                                *counts.entry("F64Trunc".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Nearest => {
                                *counts.entry("F64Nearest".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Sqrt => {
                                *counts.entry("F64Sqrt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Add => {
                                *counts.entry("F64Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Sub => {
                                *counts.entry("F64Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Mul => {
                                *counts.entry("F64Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Div => {
                                *counts.entry("F64Div".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Min => {
                                *counts.entry("F64Min".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Max => {
                                *counts.entry("F64Max".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Copysign => {
                                *counts.entry("F64Copysign".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Eqz => {
                                *counts.entry("I32Eqz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Eq => {
                                *counts.entry("I32Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Ne => {
                                *counts.entry("I32Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32LtS => {
                                *counts.entry("I32LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32LtU => {
                                *counts.entry("I32LtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32GtS => {
                                *counts.entry("I32GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32GtU => {
                                *counts.entry("I32GtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32LeS => {
                                *counts.entry("I32LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32LeU => {
                                *counts.entry("I32LeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32GeS => {
                                *counts.entry("I32GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32GeU => {
                                *counts.entry("I32GeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Eqz => {
                                *counts.entry("I64Eqz".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Eq => {
                                *counts.entry("I64Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Ne => {
                                *counts.entry("I64Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64LtS => {
                                *counts.entry("I64LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64LtU => {
                                *counts.entry("I64LtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64GtS => {
                                *counts.entry("I64GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64GtU => {
                                *counts.entry("I64GtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64LeS => {
                                *counts.entry("I64LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64LeU => {
                                *counts.entry("I64LeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64GeS => {
                                *counts.entry("I64GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64GeU => {
                                *counts.entry("I64GeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Eq => {
                                *counts.entry("F32Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Ne => {
                                *counts.entry("F32Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Lt => {
                                *counts.entry("F32Lt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Gt => {
                                *counts.entry("F32Gt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Le => {
                                *counts.entry("F32Le".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32Ge => {
                                *counts.entry("F32Ge".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Eq => {
                                *counts.entry("F64Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Ne => {
                                *counts.entry("F64Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Lt => {
                                *counts.entry("F64Lt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Gt => {
                                *counts.entry("F64Gt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Le => {
                                *counts.entry("F64Le".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64Ge => {
                                *counts.entry("F64Ge".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32WrapI64 => {
                                *counts.entry("I32WrapI64".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncF32S => {
                                *counts.entry("I32TruncF32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncF32U => {
                                *counts.entry("I32TruncF32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncF64S => {
                                *counts.entry("I32TruncF64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncF64U => {
                                *counts.entry("I32TruncF64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64ExtendI32S => {
                                *counts.entry("I64ExtendI32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64ExtendI32U => {
                                *counts.entry("I64ExtendI32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncF32S => {
                                *counts.entry("I64TruncF32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncF32U => {
                                *counts.entry("I64TruncF32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncF64S => {
                                *counts.entry("I64TruncF64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncF64U => {
                                *counts.entry("I64TruncF64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32ConvertI32S => {
                                *counts.entry("F32ConvertI32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32ConvertI32U => {
                                *counts.entry("F32ConvertI32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32ConvertI64S => {
                                *counts.entry("F32ConvertI64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32ConvertI64U => {
                                *counts.entry("F32ConvertI64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32DemoteF64 => {
                                *counts.entry("F32DemoteF64".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64ConvertI32S => {
                                *counts.entry("F64ConvertI32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64ConvertI32U => {
                                *counts.entry("F64ConvertI32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64ConvertI64S => {
                                *counts.entry("F64ConvertI64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64ConvertI64U => {
                                *counts.entry("F64ConvertI64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64PromoteF32 => {
                                *counts.entry("F64PromoteF32".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32ReinterpretF32 => {
                                *counts.entry("I32ReinterpretF32".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64ReinterpretF64 => {
                                *counts.entry("I64ReinterpretF64".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32ReinterpretI32 => {
                                *counts.entry("F32ReinterpretI32".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64ReinterpretI64 => {
                                *counts.entry("F64ReinterpretI64".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncSatF32S => {
                                *counts.entry("I32TruncSatF32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncSatF32U => {
                                *counts.entry("I32TruncSatF32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncSatF64S => {
                                *counts.entry("I32TruncSatF64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32TruncSatF64U => {
                                *counts.entry("I32TruncSatF64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncSatF32S => {
                                *counts.entry("I64TruncSatF32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncSatF32U => {
                                *counts.entry("I64TruncSatF32U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncSatF64S => {
                                *counts.entry("I64TruncSatF64S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64TruncSatF64U => {
                                *counts.entry("I64TruncSatF64U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Extend8S => {
                                *counts.entry("I32Extend8S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32Extend16S => {
                                *counts.entry("I32Extend16S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Extend8S => {
                                *counts.entry("I64Extend8S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Extend16S => {
                                *counts.entry("I64Extend16S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64Extend32S => {
                                *counts.entry("I64Extend32S".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryAtomicNotify(_) => {
                                *counts.entry("MemoryAtomicNotify".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryAtomicWait32(_) => {
                                *counts.entry("MemoryAtomicWait32".to_string()).or_insert(0) += 1
                            }
                            Instruction::MemoryAtomicWait64(_) => {
                                *counts.entry("MemoryAtomicWait64".to_string()).or_insert(0) += 1
                            }
                            Instruction::AtomicFence => {
                                *counts.entry("AtomicFence".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicLoad(_) => {
                                *counts.entry("I32AtomicLoad".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicLoad(_) => {
                                *counts.entry("I64AtomicLoad".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicLoad8u(_) => {
                                *counts.entry("I32AtomicLoad8u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicLoad16u(_) => {
                                *counts.entry("I32AtomicLoad16u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicLoad8u(_) => {
                                *counts.entry("I64AtomicLoad8u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicLoad16u(_) => {
                                *counts.entry("I64AtomicLoad16u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicLoad32u(_) => {
                                *counts.entry("I64AtomicLoad32u".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicStore(_) => {
                                *counts.entry("I32AtomicStore".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicStore(_) => {
                                *counts.entry("I64AtomicStore".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicStore8(_) => {
                                *counts.entry("I32AtomicStore8".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicStore16(_) => {
                                *counts.entry("I32AtomicStore16".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicStore8(_) => {
                                *counts.entry("I64AtomicStore8".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicStore16(_) => {
                                *counts.entry("I64AtomicStore16".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicStore32(_) => {
                                *counts.entry("I64AtomicStore32".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwAdd(_) => {
                                *counts.entry("I32AtomicRmwAdd".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwAdd(_) => {
                                *counts.entry("I64AtomicRmwAdd".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8AddU(_) => {
                                *counts.entry("I32AtomicRmw8AddU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16AddU(_) => {
                                *counts.entry("I32AtomicRmw16AddU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8AddU(_) => {
                                *counts.entry("I64AtomicRmw8AddU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16AddU(_) => {
                                *counts.entry("I64AtomicRmw16AddU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32AddU(_) => {
                                *counts.entry("I64AtomicRmw32AddU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwSub(_) => {
                                *counts.entry("I32AtomicRmwSub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwSub(_) => {
                                *counts.entry("I64AtomicRmwSub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8SubU(_) => {
                                *counts.entry("I32AtomicRmw8SubU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16SubU(_) => {
                                *counts.entry("I32AtomicRmw16SubU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8SubU(_) => {
                                *counts.entry("I64AtomicRmw8SubU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16SubU(_) => {
                                *counts.entry("I64AtomicRmw16SubU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32SubU(_) => {
                                *counts.entry("I64AtomicRmw32SubU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwAnd(_) => {
                                *counts.entry("I32AtomicRmwAnd".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwAnd(_) => {
                                *counts.entry("I64AtomicRmwAnd".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8AndU(_) => {
                                *counts.entry("I32AtomicRmw8AndU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16AndU(_) => {
                                *counts.entry("I32AtomicRmw16AndU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8AndU(_) => {
                                *counts.entry("I64AtomicRmw8AndU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16AndU(_) => {
                                *counts.entry("I64AtomicRmw16AndU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32AndU(_) => {
                                *counts.entry("I64AtomicRmw32AndU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwOr(_) => {
                                *counts.entry("I32AtomicRmwOr".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwOr(_) => {
                                *counts.entry("I64AtomicRmwOr".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8OrU(_) => {
                                *counts.entry("I32AtomicRmw8OrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16OrU(_) => {
                                *counts.entry("I32AtomicRmw16OrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8OrU(_) => {
                                *counts.entry("I64AtomicRmw8OrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16OrU(_) => {
                                *counts.entry("I64AtomicRmw16OrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32OrU(_) => {
                                *counts.entry("I64AtomicRmw32OrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwXor(_) => {
                                *counts.entry("I32AtomicRmwXor".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwXor(_) => {
                                *counts.entry("I64AtomicRmwXor".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8XorU(_) => {
                                *counts.entry("I32AtomicRmw8XorU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16XorU(_) => {
                                *counts.entry("I32AtomicRmw16XorU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8XorU(_) => {
                                *counts.entry("I64AtomicRmw8XorU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16XorU(_) => {
                                *counts.entry("I64AtomicRmw16XorU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32XorU(_) => {
                                *counts.entry("I64AtomicRmw32XorU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwXchg(_) => {
                                *counts.entry("I32AtomicRmwXchg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwXchg(_) => {
                                *counts.entry("I64AtomicRmwXchg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8XchgU(_) => {
                                *counts.entry("I32AtomicRmw8XchgU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16XchgU(_) => {
                                *counts.entry("I32AtomicRmw16XchgU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8XchgU(_) => {
                                *counts.entry("I64AtomicRmw8XchgU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16XchgU(_) => {
                                *counts.entry("I64AtomicRmw16XchgU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32XchgU(_) => {
                                *counts.entry("I64AtomicRmw32XchgU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmwCmpxchg(_) => {
                                *counts.entry("I32AtomicRmwCmpxchg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmwCmpxchg(_) => {
                                *counts.entry("I64AtomicRmwCmpxchg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw8CmpxchgU(_) => {
                                *counts
                                    .entry("I32AtomicRmw8CmpxchgU".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32AtomicRmw16CmpxchgU(_) => {
                                *counts
                                    .entry("I32AtomicRmw16CmpxchgU".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw8CmpxchgU(_) => {
                                *counts
                                    .entry("I64AtomicRmw8CmpxchgU".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw16CmpxchgU(_) => {
                                *counts
                                    .entry("I64AtomicRmw16CmpxchgU".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64AtomicRmw32CmpxchgU(_) => {
                                *counts
                                    .entry("I64AtomicRmw32CmpxchgU".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::V128Load(_) => {
                                *counts.entry("V128Load".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load8x8S(_) => {
                                *counts.entry("V128Load8x8S".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load8x8U(_) => {
                                *counts.entry("V128Load8x8U".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load16x4S(_) => {
                                *counts.entry("V128Load16x4S".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load16x4U(_) => {
                                *counts.entry("V128Load16x4U".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load32x2S(_) => {
                                *counts.entry("V128Load32x2S".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load32x2U(_) => {
                                *counts.entry("V128Load32x2U".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load8Splat(_) => {
                                *counts.entry("V128Load8Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load16Splat(_) => {
                                *counts.entry("V128Load16Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load32Splat(_) => {
                                *counts.entry("V128Load32Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load64Splat(_) => {
                                *counts.entry("V128Load64Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load32Zero(_) => {
                                *counts.entry("V128Load32Zero".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load64Zero(_) => {
                                *counts.entry("V128Load64Zero".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Store(_) => {
                                *counts.entry("V128Store".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load8Lane(_) => {
                                *counts.entry("V128Load8Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load16Lane(_) => {
                                *counts.entry("V128Load16Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load32Lane(_) => {
                                *counts.entry("V128Load32Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Load64Lane(_) => {
                                *counts.entry("V128Load64Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Store8Lane(_) => {
                                *counts.entry("V128Store8Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Store16Lane(_) => {
                                *counts.entry("V128Store16Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Store32Lane(_) => {
                                *counts.entry("V128Store32Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Store64Lane(_) => {
                                *counts.entry("V128Store64Lane".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Const(_) => {
                                *counts.entry("V128Const".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Shuffle(_) => {
                                *counts.entry("I8x16Shuffle".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16ExtractLaneS(_) => {
                                *counts.entry("I8x16ExtractLaneS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16ExtractLaneU(_) => {
                                *counts.entry("I8x16ExtractLaneU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16ReplaceLane(_) => {
                                *counts.entry("I8x16ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ExtractLaneS(_) => {
                                *counts.entry("I16x8ExtractLaneS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ExtractLaneU(_) => {
                                *counts.entry("I16x8ExtractLaneU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ReplaceLane(_) => {
                                *counts.entry("I16x8ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ExtractLane(_) => {
                                *counts.entry("I32x4ExtractLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ReplaceLane(_) => {
                                *counts.entry("I32x4ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ExtractLane(_) => {
                                *counts.entry("I64x2ExtractLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ReplaceLane(_) => {
                                *counts.entry("I64x2ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4ExtractLane(_) => {
                                *counts.entry("F32x4ExtractLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4ReplaceLane(_) => {
                                *counts.entry("F32x4ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2ExtractLane(_) => {
                                *counts.entry("F64x2ExtractLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2ReplaceLane(_) => {
                                *counts.entry("F64x2ReplaceLane".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Swizzle => {
                                *counts.entry("I8x16Swizzle".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Splat => {
                                *counts.entry("I8x16Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Splat => {
                                *counts.entry("I16x8Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Splat => {
                                *counts.entry("I32x4Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Splat => {
                                *counts.entry("I64x2Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Splat => {
                                *counts.entry("F32x4Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Splat => {
                                *counts.entry("F64x2Splat".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Eq => {
                                *counts.entry("I8x16Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Ne => {
                                *counts.entry("I8x16Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16LtS => {
                                *counts.entry("I8x16LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16LtU => {
                                *counts.entry("I8x16LtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16GtS => {
                                *counts.entry("I8x16GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16GtU => {
                                *counts.entry("I8x16GtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16LeS => {
                                *counts.entry("I8x16LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16LeU => {
                                *counts.entry("I8x16LeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16GeS => {
                                *counts.entry("I8x16GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16GeU => {
                                *counts.entry("I8x16GeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Eq => {
                                *counts.entry("I16x8Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Ne => {
                                *counts.entry("I16x8Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8LtS => {
                                *counts.entry("I16x8LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8LtU => {
                                *counts.entry("I16x8LtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8GtS => {
                                *counts.entry("I16x8GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8GtU => {
                                *counts.entry("I16x8GtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8LeS => {
                                *counts.entry("I16x8LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8LeU => {
                                *counts.entry("I16x8LeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8GeS => {
                                *counts.entry("I16x8GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8GeU => {
                                *counts.entry("I16x8GeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Eq => {
                                *counts.entry("I32x4Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Ne => {
                                *counts.entry("I32x4Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4LtS => {
                                *counts.entry("I32x4LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4LtU => {
                                *counts.entry("I32x4LtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4GtS => {
                                *counts.entry("I32x4GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4GtU => {
                                *counts.entry("I32x4GtU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4LeS => {
                                *counts.entry("I32x4LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4LeU => {
                                *counts.entry("I32x4LeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4GeS => {
                                *counts.entry("I32x4GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4GeU => {
                                *counts.entry("I32x4GeU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Eq => {
                                *counts.entry("I64x2Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Ne => {
                                *counts.entry("I64x2Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2LtS => {
                                *counts.entry("I64x2LtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2GtS => {
                                *counts.entry("I64x2GtS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2LeS => {
                                *counts.entry("I64x2LeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2GeS => {
                                *counts.entry("I64x2GeS".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Eq => {
                                *counts.entry("F32x4Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Ne => {
                                *counts.entry("F32x4Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Lt => {
                                *counts.entry("F32x4Lt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Gt => {
                                *counts.entry("F32x4Gt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Le => {
                                *counts.entry("F32x4Le".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Ge => {
                                *counts.entry("F32x4Ge".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Eq => {
                                *counts.entry("F64x2Eq".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Ne => {
                                *counts.entry("F64x2Ne".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Lt => {
                                *counts.entry("F64x2Lt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Gt => {
                                *counts.entry("F64x2Gt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Le => {
                                *counts.entry("F64x2Le".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Ge => {
                                *counts.entry("F64x2Ge".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Not => {
                                *counts.entry("V128Not".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128And => {
                                *counts.entry("V128And".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Andnot => {
                                *counts.entry("V128Andnot".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Or => {
                                *counts.entry("V128Or".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Xor => {
                                *counts.entry("V128Xor".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128Bitselect => {
                                *counts.entry("V128Bitselect".to_string()).or_insert(0) += 1
                            }
                            Instruction::V128AnyTrue => {
                                *counts.entry("V128AnyTrue".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Abs => {
                                *counts.entry("I8x16Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Neg => {
                                *counts.entry("I8x16Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Popcnt => {
                                *counts.entry("I8x16Popcnt".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16AllTrue => {
                                *counts.entry("I8x16AllTrue".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Bitmask => {
                                *counts.entry("I8x16Bitmask".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16NarrowI16x8S => {
                                *counts.entry("I8x16NarrowI16x8S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16NarrowI16x8U => {
                                *counts.entry("I8x16NarrowI16x8U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Shl => {
                                *counts.entry("I8x16Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16ShrS => {
                                *counts.entry("I8x16ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16ShrU => {
                                *counts.entry("I8x16ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Add => {
                                *counts.entry("I8x16Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16AddSatS => {
                                *counts.entry("I8x16AddSatS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16AddSatU => {
                                *counts.entry("I8x16AddSatU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16Sub => {
                                *counts.entry("I8x16Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16SubSatS => {
                                *counts.entry("I8x16SubSatS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16SubSatU => {
                                *counts.entry("I8x16SubSatU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16MinS => {
                                *counts.entry("I8x16MinS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16MinU => {
                                *counts.entry("I8x16MinU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16MaxS => {
                                *counts.entry("I8x16MaxS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16MaxU => {
                                *counts.entry("I8x16MaxU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16AvgrU => {
                                *counts.entry("I8x16AvgrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ExtAddPairwiseI8x16S => {
                                *counts
                                    .entry("I16x8ExtAddPairwiseI8x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtAddPairwiseI8x16U => {
                                *counts
                                    .entry("I16x8ExtAddPairwiseI8x16U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8Abs => {
                                *counts.entry("I16x8Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Neg => {
                                *counts.entry("I16x8Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Q15MulrSatS => {
                                *counts.entry("I16x8Q15MulrSatS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8AllTrue => {
                                *counts.entry("I16x8AllTrue".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Bitmask => {
                                *counts.entry("I16x8Bitmask".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8NarrowI32x4S => {
                                *counts.entry("I16x8NarrowI32x4S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8NarrowI32x4U => {
                                *counts.entry("I16x8NarrowI32x4U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ExtendLowI8x16S => {
                                *counts
                                    .entry("I16x8ExtendLowI8x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtendHighI8x16S => {
                                *counts
                                    .entry("I16x8ExtendHighI8x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtendLowI8x16U => {
                                *counts
                                    .entry("I16x8ExtendLowI8x16U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtendHighI8x16u => {
                                *counts
                                    .entry("I16x8ExtendHighI8x16u".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8Shl => {
                                *counts.entry("I16x8Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ShrS => {
                                *counts.entry("I16x8ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ShrU => {
                                *counts.entry("I16x8ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Add => {
                                *counts.entry("I16x8Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8AddSatS => {
                                *counts.entry("I16x8AddSatS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8AddSatU => {
                                *counts.entry("I16x8AddSatU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Sub => {
                                *counts.entry("I16x8Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8SubSatS => {
                                *counts.entry("I16x8SubSatS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8SubSatU => {
                                *counts.entry("I16x8SubSatU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8Mul => {
                                *counts.entry("I16x8Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8MinS => {
                                *counts.entry("I16x8MinS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8MinU => {
                                *counts.entry("I16x8MinU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8MaxS => {
                                *counts.entry("I16x8MaxS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8MaxU => {
                                *counts.entry("I16x8MaxU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8AvgrU => {
                                *counts.entry("I16x8AvgrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8ExtMulLowI8x16S => {
                                *counts
                                    .entry("I16x8ExtMulLowI8x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtMulHighI8x16S => {
                                *counts
                                    .entry("I16x8ExtMulHighI8x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtMulLowI8x16U => {
                                *counts
                                    .entry("I16x8ExtMulLowI8x16U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8ExtMulHighI8x16U => {
                                *counts
                                    .entry("I16x8ExtMulHighI8x16U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtAddPairwiseI16x8S => {
                                *counts
                                    .entry("I32x4ExtAddPairwiseI16x8S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtAddPairwiseI16x8U => {
                                *counts
                                    .entry("I32x4ExtAddPairwiseI16x8U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4Abs => {
                                *counts.entry("I32x4Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Neg => {
                                *counts.entry("I32x4Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4AllTrue => {
                                *counts.entry("I32x4AllTrue".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Bitmask => {
                                *counts.entry("I32x4Bitmask".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ExtendLowI16x8S => {
                                *counts
                                    .entry("I32x4ExtendLowI16x8S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtendHighI16x8S => {
                                *counts
                                    .entry("I32x4ExtendHighI16x8S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtendLowI16x8U => {
                                *counts
                                    .entry("I32x4ExtendLowI16x8U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtendHighI16x8U => {
                                *counts
                                    .entry("I32x4ExtendHighI16x8U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4Shl => {
                                *counts.entry("I32x4Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ShrS => {
                                *counts.entry("I32x4ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ShrU => {
                                *counts.entry("I32x4ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Add => {
                                *counts.entry("I32x4Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Sub => {
                                *counts.entry("I32x4Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4Mul => {
                                *counts.entry("I32x4Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4MinS => {
                                *counts.entry("I32x4MinS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4MinU => {
                                *counts.entry("I32x4MinU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4MaxS => {
                                *counts.entry("I32x4MaxS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4MaxU => {
                                *counts.entry("I32x4MaxU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4DotI16x8S => {
                                *counts.entry("I32x4DotI16x8S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4ExtMulLowI16x8S => {
                                *counts
                                    .entry("I32x4ExtMulLowI16x8S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtMulHighI16x8S => {
                                *counts
                                    .entry("I32x4ExtMulHighI16x8S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtMulLowI16x8U => {
                                *counts
                                    .entry("I32x4ExtMulLowI16x8U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4ExtMulHighI16x8U => {
                                *counts
                                    .entry("I32x4ExtMulHighI16x8U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2Abs => {
                                *counts.entry("I64x2Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Neg => {
                                *counts.entry("I64x2Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2AllTrue => {
                                *counts.entry("I64x2AllTrue".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Bitmask => {
                                *counts.entry("I64x2Bitmask".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ExtendLowI32x4S => {
                                *counts
                                    .entry("I64x2ExtendLowI32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtendHighI32x4S => {
                                *counts
                                    .entry("I64x2ExtendHighI32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtendLowI32x4U => {
                                *counts
                                    .entry("I64x2ExtendLowI32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtendHighI32x4U => {
                                *counts
                                    .entry("I64x2ExtendHighI32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2Shl => {
                                *counts.entry("I64x2Shl".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ShrS => {
                                *counts.entry("I64x2ShrS".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ShrU => {
                                *counts.entry("I64x2ShrU".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Add => {
                                *counts.entry("I64x2Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Sub => {
                                *counts.entry("I64x2Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2Mul => {
                                *counts.entry("I64x2Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::I64x2ExtMulLowI32x4S => {
                                *counts
                                    .entry("I64x2ExtMulLowI32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtMulHighI32x4S => {
                                *counts
                                    .entry("I64x2ExtMulHighI32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtMulLowI32x4U => {
                                *counts
                                    .entry("I64x2ExtMulLowI32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2ExtMulHighI32x4U => {
                                *counts
                                    .entry("I64x2ExtMulHighI32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F32x4Ceil => {
                                *counts.entry("F32x4Ceil".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Floor => {
                                *counts.entry("F32x4Floor".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Trunc => {
                                *counts.entry("F32x4Trunc".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Nearest => {
                                *counts.entry("F32x4Nearest".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Abs => {
                                *counts.entry("F32x4Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Neg => {
                                *counts.entry("F32x4Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Sqrt => {
                                *counts.entry("F32x4Sqrt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Add => {
                                *counts.entry("F32x4Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Sub => {
                                *counts.entry("F32x4Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Mul => {
                                *counts.entry("F32x4Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Div => {
                                *counts.entry("F32x4Div".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Min => {
                                *counts.entry("F32x4Min".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4Max => {
                                *counts.entry("F32x4Max".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4PMin => {
                                *counts.entry("F32x4PMin".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4PMax => {
                                *counts.entry("F32x4PMax".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Ceil => {
                                *counts.entry("F64x2Ceil".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Floor => {
                                *counts.entry("F64x2Floor".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Trunc => {
                                *counts.entry("F64x2Trunc".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Nearest => {
                                *counts.entry("F64x2Nearest".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Abs => {
                                *counts.entry("F64x2Abs".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Neg => {
                                *counts.entry("F64x2Neg".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Sqrt => {
                                *counts.entry("F64x2Sqrt".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Add => {
                                *counts.entry("F64x2Add".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Sub => {
                                *counts.entry("F64x2Sub".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Mul => {
                                *counts.entry("F64x2Mul".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Div => {
                                *counts.entry("F64x2Div".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Min => {
                                *counts.entry("F64x2Min".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2Max => {
                                *counts.entry("F64x2Max".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2PMin => {
                                *counts.entry("F64x2PMin".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2PMax => {
                                *counts.entry("F64x2PMax".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4TruncSatF32x4S => {
                                *counts.entry("I32x4TruncSatF32x4S".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4TruncSatF32x4U => {
                                *counts.entry("I32x4TruncSatF32x4U".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4ConvertI32x4S => {
                                *counts.entry("F32x4ConvertI32x4S".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4ConvertI32x4U => {
                                *counts.entry("F32x4ConvertI32x4U".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4TruncSatF64x2SZero => {
                                *counts
                                    .entry("I32x4TruncSatF64x2SZero".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4TruncSatF64x2UZero => {
                                *counts
                                    .entry("I32x4TruncSatF64x2UZero".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F64x2ConvertLowI32x4S => {
                                *counts
                                    .entry("F64x2ConvertLowI32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F64x2ConvertLowI32x4U => {
                                *counts
                                    .entry("F64x2ConvertLowI32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F32x4DemoteF64x2Zero => {
                                *counts
                                    .entry("F32x4DemoteF64x2Zero".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F64x2PromoteLowF32x4 => {
                                *counts
                                    .entry("F64x2PromoteLowF32x4".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::Try(_) => {
                                *counts.entry("Try".to_string()).or_insert(0) += 1
                            }
                            Instruction::Catch(_) => {
                                *counts.entry("Catch".to_string()).or_insert(0) += 1
                            }
                            Instruction::Throw(_) => {
                                *counts.entry("Throw".to_string()).or_insert(0) += 1
                            }
                            Instruction::Rethrow(_) => {
                                *counts.entry("Rethrow".to_string()).or_insert(0) += 1
                            }
                            Instruction::Delegate(_) => {
                                *counts.entry("Delegate".to_string()).or_insert(0) += 1
                            }
                            Instruction::CatchAll => {
                                *counts.entry("CatchAll".to_string()).or_insert(0) += 1
                            }
                            Instruction::ThrowRef => {
                                *counts.entry("ThrowRef".to_string()).or_insert(0) += 1
                            }
                            Instruction::TryTable(_) => {
                                *counts.entry("TryTable".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16RelaxedSwizzle => {
                                *counts.entry("I8x16RelaxedSwizzle".to_string()).or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedTruncF32x4S => {
                                *counts
                                    .entry("I32x4RelaxedTruncF32x4S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedTruncF32x4U => {
                                *counts
                                    .entry("I32x4RelaxedTruncF32x4U".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedTruncF64x2SZero => {
                                *counts
                                    .entry("I32x4RelaxedTruncF64x2SZero".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedTruncF64x2UZero => {
                                *counts
                                    .entry("I32x4RelaxedTruncF64x2UZero".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F32x4RelaxedMadd => {
                                *counts.entry("F32x4RelaxedMadd".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4RelaxedNmadd => {
                                *counts.entry("F32x4RelaxedNmadd".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2RelaxedMadd => {
                                *counts.entry("F64x2RelaxedMadd".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2RelaxedNmadd => {
                                *counts.entry("F64x2RelaxedNmadd".to_string()).or_insert(0) += 1
                            }
                            Instruction::I8x16RelaxedLaneselect => {
                                *counts
                                    .entry("I8x16RelaxedLaneselect".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8RelaxedLaneselect => {
                                *counts
                                    .entry("I16x8RelaxedLaneselect".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedLaneselect => {
                                *counts
                                    .entry("I32x4RelaxedLaneselect".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I64x2RelaxedLaneselect => {
                                *counts
                                    .entry("I64x2RelaxedLaneselect".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::F32x4RelaxedMin => {
                                *counts.entry("F32x4RelaxedMin".to_string()).or_insert(0) += 1
                            }
                            Instruction::F32x4RelaxedMax => {
                                *counts.entry("F32x4RelaxedMax".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2RelaxedMin => {
                                *counts.entry("F64x2RelaxedMin".to_string()).or_insert(0) += 1
                            }
                            Instruction::F64x2RelaxedMax => {
                                *counts.entry("F64x2RelaxedMax".to_string()).or_insert(0) += 1
                            }
                            Instruction::I16x8RelaxedQ15mulrS => {
                                *counts
                                    .entry("I16x8RelaxedQ15mulrS".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I16x8RelaxedDotI8x16I7x16S => {
                                *counts
                                    .entry("I16x8RelaxedDotI8x16I7x16S".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::I32x4RelaxedDotI8x16I7x16AddS => {
                                *counts
                                    .entry("I32x4RelaxedDotI8x16I7x16AddS".to_string())
                                    .or_insert(0) += 1
                            }
                            Instruction::AnyConvertExtern => {}
                            Instruction::ExternConvertAny => {
                                *counts.entry("ExternConvertAny".to_string()).or_insert(0) += 1
                            }
                        }
                        // ... handle other instruction types similarly // Handle or ignore other cases as needed
                    }
                }
            }
        }
    }

    counts.sort_by(|_k1, v1, _k2, v2| v2.cmp(v1));
    counts
}
