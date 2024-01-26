use core::panic;
use std::collections::VecDeque;

use wast::core::{Func, Instruction, MemArg};

use crate::utils::format_index;

#[allow(clippy::useless_format)]
pub fn handle_instructions(
    func: &Func,
    instrs: &mut VecDeque<&Instruction>,
    indent: usize,
    output: Vec<(usize, String)>,
    context: &mut Vec<&str>,
) -> Vec<(usize, String)> {
    let instruction_first = instrs.pop_front();

    if instruction_first.is_none() {
        return output;
    }

    let mut result = output;

    let instruction = &instruction_first.expect("should not be possible");

    match instruction {
        Instruction::I32Add | Instruction::I64Add | Instruction::F32Add | Instruction::F64Add => {
            result.push((indent, format!("{{ kind: 'Add' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Call(index) => {
            let id = format_index(index);

            result.push((indent, format!("{{ kind: 'Call'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32Const(value) => {
            result.push((indent, format!("{{ kind: 'Const'; value: {value} }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I64Const(value) => {
            result.push((indent, format!("{{ kind: 'Const'; value: {value} }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::F32Const(raw_bits) => {
            let value = f32::from_bits(raw_bits.bits).to_string();
            result.push((indent, format!("{{ kind: 'Const'; value: {value} }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::F64Const(raw_bits) => {
            let value = f64::from_bits(raw_bits.bits).to_string();
            result.push((indent, format!("{{ kind: 'Const'; value: {value} }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32Sub | Instruction::I64Sub | Instruction::F32Sub | Instruction::F64Sub => {
            result.push((indent, format!("{{ kind: 'Subtract' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32Eqz | Instruction::I64Eqz => {
            result.push((indent, format!("{{ kind: 'EqualsZero' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::LocalGet(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'LocalGet'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::LocalSet(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'LocalSet'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::GlobalGet(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'GlobalGet'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::GlobalSet(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'GlobalSet'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Return => {
            let count = func
                .ty
                .inline
                .clone()
                .expect("must have a return type")
                .results
                .len();
            result.push((indent, format!("{{ kind: 'Return'; count: {count} }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::LocalTee(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'LocalTee'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32Mul | Instruction::I64Mul | Instruction::F32Mul | Instruction::F64Mul => {
            result.push((indent, format!("{{ kind: 'Multiply' }},")));
            handle_instructions(func, instrs, indent, result, context)
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
            result.push((
                indent,
                format!("{{ kind: 'Load'; offset: {offset}; align: {align} }},"),
            ));
            handle_instructions(func, instrs, indent, result, context)
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
            result.push((
                indent,
                format!("{{ kind: 'Store'; offset: {offset}; align: {align} }},"),
            ));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32And | Instruction::I64And => {
            result.push((indent, format!("{{ kind: 'And' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32Eq | Instruction::I64Eq | Instruction::F32Eq | Instruction::F64Eq => {
            result.push((indent, format!("{{ kind: 'Equals' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Nop => {
            result.push((
                indent,
                format!("{{ kind: 'Nop'; ziltoid: 'theOmniscient' }},"),
            ));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::F32Neg | Instruction::F64Neg => {
            result.push((indent, format!("{{ kind: 'Negate' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32GeS
        | Instruction::I64GeS
        | Instruction::I32GeU
        | Instruction::I64GeU
        | Instruction::F32Ge
        | Instruction::F64Ge => {
            result.push((indent, format!("{{ kind: 'GreaterThanOrEqual' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32GtS
        | Instruction::I64GtS
        | Instruction::I32GtU
        | Instruction::I64GtU
        | Instruction::F32Gt
        | Instruction::F64Gt => {
            result.push((indent, format!("{{ kind: 'GreaterThan' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32LtS
        | Instruction::I64LtS
        | Instruction::I32LtU
        | Instruction::I64LtU
        | Instruction::F32Lt
        | Instruction::F64Lt => {
            result.push((indent, format!("{{ kind: 'LessThan' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::I32LeS
        | Instruction::I64LeS
        | Instruction::I32LeU
        | Instruction::I64LeU
        | Instruction::F32Le
        | Instruction::F64Le => {
            result.push((indent, format!("{{ kind: 'LessThanOrEqual' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::If(_) => {
            result.push((indent, format!("{{ kind: 'If';")));

            result.push((indent + 1, format!("then: [")));

            context.push("If");

            let then_instrs = vec![];
            let then_branch = handle_instructions(func, instrs, indent + 2, then_instrs, context);
            result.extend(then_branch);

            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Else(_) => {
            result.push((indent - 1, format!("];")));
            result.push((indent - 1, format!("else: [")));

            context.pop(); // remove the "If" context that came before
            context.push("Else");

            let else_instrs = vec![];
            let else_branch = handle_instructions(func, instrs, indent, else_instrs, context);
            result.extend(else_branch);

            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::End(_) => {
            let this_context = context.pop();

            if this_context == Some("If") {
                result.push((indent, format!("];")));
            } else if this_context == Some("Else") || this_context == Some("Block") {
                result.push((indent - 1, format!("];")));
            } else {
                panic!("unexpected context {:#?}", this_context);
            }

            result.push((indent - 2, format!("}},")));
            handle_instructions(func, instrs, indent - 2, result, context)
        }
        Instruction::Select(_) => {
            result.push((indent, format!("{{ kind: 'Select' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Br(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'Branch'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::BrIf(index) => {
            let id = format_index(index);
            result.push((indent, format!("{{ kind: 'BranchIf'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::Block(block) => {
            let label = block.label.expect("blocks must have labels").name();
            result.push((indent, format!("{{ kind: 'Block';")));
            result.push((indent + 1, format!("id: '${label}';")));
            result.push((indent + 1, format!("instructions: [")));

            context.push("Block");

            let block_instrs = vec![];
            let block_branch = handle_instructions(func, instrs, indent + 2, block_instrs, context);
            result.extend(block_branch);

            handle_instructions(func, instrs, indent, result, context)
        }
        Instruction::CallIndirect(call_indirect) => {
            let id = format_index(&call_indirect.table);
            result.push((indent, format!("{{ kind: 'CallIndirect'; id: '{id}' }},")));
            handle_instructions(func, instrs, indent, result, context)
        }
        _ => {
            panic!("not implemented instruction {:#?}", instruction);
        }
    }
}

pub fn handle_func(func: &Func) -> String {
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

            let instructions = handle_instructions(
                func,
                &mut expression.instrs.iter().collect(),
                3,
                vec![],
                &mut vec![],
            )
            .iter()
            .map(|(indent, line)| format!("{}{}\n", "  ".repeat(*indent), line))
            .collect::<Vec<String>>()
            .join("");

            format!(
                "    locals: [{locals}];
    instructions: [
{instructions}    ];"
            )
        }
    }
}
