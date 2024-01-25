use core::panic;

use wast::core::{Func, Instruction, MemArg};

use crate::utils::format_index;

pub fn handle_instruction(func: &Func, instruction: &Instruction<'_>) -> String {
    let indent = "      ";
    match instruction {
        Instruction::I32Add | Instruction::I64Add | Instruction::F32Add | Instruction::F64Add => {
            format!("{indent}{{ kind: 'Add' }}")
        }
        Instruction::Call(index) => {
            let id = format_index(index);
            // let id = index.id().expect("call index must have an id").name();
            format!("{indent}{{ kind: 'Call'; id: '{id}' }}")
        }
        Instruction::I32Const(value) => {
            format!("{indent}{{ kind: 'Const'; value: {value} }}")
        }
        Instruction::I64Const(value) => {
            format!("{indent}{{ kind: 'Const'; value: {value} }}")
        }
        Instruction::F32Const(raw_bits) => {
            let value = f32::from_bits(raw_bits.bits).to_string();
            format!("{indent}{{ kind: 'Const'; value: {value} }}")
        }
        Instruction::F64Const(raw_bits) => {
            let value = f64::from_bits(raw_bits.bits).to_string();
            format!("{indent}{{ kind: 'Const'; value: {value} }}")
        }
        Instruction::I32Sub | Instruction::I64Sub | Instruction::F32Sub | Instruction::F64Sub => {
            format!("{indent}{{ kind: 'Subtract' }}")
        }
        Instruction::I32Eqz | Instruction::I64Eqz => {
            format!("{indent}{{ kind: 'EqualsZero' }}")
        }
        Instruction::LocalGet(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'LocalGet'; id: '{id}' }}")
        }
        Instruction::LocalSet(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'LocalSet'; id: '{id}' }}")
        }
        Instruction::GlobalGet(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'GlobalGet'; id: '{id}' }}")
        }
        Instruction::GlobalSet(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'GlobalSet'; id: '{id}' }}")
        }
        Instruction::Return => {
            let count = func
                .ty
                .inline
                .clone()
                .expect("must have a return type")
                .results
                .len();
            format!("{indent}{{ kind: 'Return'; count: {count} }}")
        }
        Instruction::LocalTee(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'LocalTee'; id: '{id}' }}")
        }
        Instruction::I32Mul | Instruction::I64Mul | Instruction::F32Mul | Instruction::F64Mul => {
            format!("{indent}{{ kind: 'Multiply' }}")
        }

        Instruction::I32Load(MemArg {
            offset,
            align,
            memory: _,
        })
        | Instruction::I64Load(MemArg {
            offset,
            align,
            memory: _,
        }) => {
            format!("{indent}{{ kind: 'Load'; offset: {offset}; align: {align} }}")
        }
        Instruction::I32Store(MemArg {
            offset,
            align,
            memory: _,
        })
        | Instruction::I64Store(MemArg {
            offset,
            align,
            memory: _,
        }) => {
            format!("{indent}{{ kind: 'Store'; offset: {offset}; align: {align} }}")
        }
        Instruction::I32And | Instruction::I64And => {
            format!("{indent}{{ kind: 'And' }}")
        }
        Instruction::I32Eq | Instruction::I64Eq | Instruction::F32Eq | Instruction::F64Eq => {
            format!("{indent}{{ kind: 'Equals' }}")
        }
        Instruction::Nop => {
            format!("{indent}{{ kind: 'Nop'; ziltoid: 'theOmniscient' }}")
        }
        Instruction::F32Neg | Instruction::F64Neg => {
            format!("{indent}{{ kind: 'Negate' }}")
        }
        Instruction::I32GeS
        | Instruction::I64GeS
        | Instruction::I32GeU
        | Instruction::I64GeU
        | Instruction::F32Ge
        | Instruction::F64Ge => {
            format!("{indent}{{ kind: 'GreaterThanOrEqual' }}")
        }
        Instruction::I32GtS
        | Instruction::I64GtS
        | Instruction::I32GtU
        | Instruction::I64GtU
        | Instruction::F32Gt
        | Instruction::F64Gt => {
            format!("{indent}{{ kind: 'GreaterThan' }}")
        }
        Instruction::I32LtS
        | Instruction::I64LtS
        | Instruction::I32LtU
        | Instruction::I64LtU
        | Instruction::F32Lt
        | Instruction::F64Lt => {
            format!("{indent}{{ kind: 'LessThan' }}")
        }
        Instruction::I32LeS
        | Instruction::I64LeS
        | Instruction::I32LeU
        | Instruction::I64LeU
        | Instruction::F32Le
        | Instruction::F64Le => {
            format!("{indent}{{ kind: 'LessThanOrEqual' }}")
        }
        Instruction::If(_) => {
            format!("{indent}{{ kind: 'If' }}")
        }
        Instruction::End(_) => {
            format!("{indent}{{ kind: 'End' }}")
        }
        Instruction::Else(_) => {
            format!("{indent}{{ kind: 'Else' }}")
        }
        Instruction::Select(_) => {
            format!("{indent}{{ kind: 'Select' }}")
        }
        Instruction::Br(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'Branch'; id: '{id}' }}")
        }
        Instruction::BrIf(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'BranchIf'; id: '{id}' }}")
        }
        Instruction::Block(block) => {
            let label = block.label.expect("blocks must have labels").name();
            format!("{indent}{{ kind: 'Block'; id: '${label}' }}")
        }
        _ => {
            panic!("not implemented instruction {:#?}", instruction);
        }
    }
}

pub fn handle_instructions(func: &Func) -> String {
    match &func.kind {
        wast::core::FuncKind::Import(_) => {
            panic!("didn't implement FuncKind::Import")
        }
        wast::core::FuncKind::Inline { locals, expression } => {
            let locals = locals
                .iter()
                .map(|local| format!("'${}'", local.id.expect("local must have a name").name()))
                .collect::<Vec<String>>()
                .join(", ");

            let instructions = expression
                .instrs
                .iter()
                .map(|instruction| handle_instruction(func, instruction))
                .collect::<Vec<_>>()
                .join(",\n");
            format!(
                "    locals: [{locals}];
    instructions: [
{instructions},
    ];"
            )
        }
    }
}
