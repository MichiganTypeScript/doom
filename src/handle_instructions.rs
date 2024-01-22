use core::panic;

use wast::core::{Func, Instruction};

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
        Instruction::I32Sub | Instruction::I64Sub | Instruction::F32Sub | Instruction::F64Sub => {
            format!("{indent}{{ kind: 'Sub' }}")
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
{instructions}
    ];"
            )
        }
    }
}
