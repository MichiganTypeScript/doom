use core::panic;

use wast::core::{Func, Instruction};

use crate::utils::format_index;

pub fn handle_instruction(instruction: &Instruction<'_>) -> String {
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
        Instruction::LocalGet(index) => {
            let id = format_index(index);
            format!("{indent}{{ kind: 'LocalGet'; id: '{id}' }}")
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
                .map(|local| local.id.expect("local must have a name").name().to_string())
                .collect::<Vec<String>>()
                .join(", ");

            let instructions = expression
                .instrs
                .iter()
                .map(handle_instruction)
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
