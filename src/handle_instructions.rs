use core::panic;
use std::{collections::VecDeque, vec};

use wast::core::{Func, Instruction};

use crate::utils::format_index;

pub fn handle_instructions(func: &Func, instrs: &mut VecDeque<&Instruction>, indent: &mut usize, context: &mut Vec<&str>) -> Vec<(usize, String)> {
    let mut result: Vec<(usize, String)> = vec![];

    while let Some(instruction) = instrs.pop_front() {
        result.extend(handle_instruction(func, instrs, instruction, indent, context));
    }

    result
}

#[allow(clippy::useless_format)]
fn handle_instruction(
    func: &Func,
    instrs: &mut VecDeque<&Instruction>,
    instruction: &Instruction,
    indent: &mut usize,
    context: &mut Vec<&str>,
) -> Vec<(usize, String)> {
    match instruction {
        /**************
         * Numeric Instructions
         **************/

        /* Constants Instructions */
        Instruction::I32Const(value) => {
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:b}' }},", value))]
        }
        Instruction::I64Const(value) => {
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:b}' }},", value))]
        }
        // Instruction::F32Const(raw_bits) => {
        //     let value = f32::from_bits(raw_bits.bits).to_string();
        //     vec![(*indent, format!("{{ kind: 'Const'; value: {value} }},"))]
        // }
        // Instruction::F64Const(raw_bits) => {
        //     let value = f64::from_bits(raw_bits.bits).to_string();
        //     vec![(*indent, format!("{{ kind: 'Const'; value: {value} }},"))]
        // }

        /* Comparison Instructions */
        Instruction::I32Eqz | Instruction::I64Eqz => {
            vec![(*indent, format!("{{ kind: 'EqualsZero' }},"))]
        }
        Instruction::I32Eq | Instruction::I64Eq | Instruction::F32Eq | Instruction::F64Eq => {
            vec![(*indent, format!("{{ kind: 'Equals' }},"))]
        }
        Instruction::F32Ne | Instruction::F64Ne | Instruction::I32Ne | Instruction::I64Ne => {
            vec![(*indent, format!("{{ kind: 'NotEqual' }},"))]
        }
        Instruction::I32GtS | Instruction::I64GtS | Instruction::I32GtU | Instruction::I64GtU | Instruction::F32Gt | Instruction::F64Gt => {
            vec![(*indent, format!("{{ kind: 'GreaterThan' }},"))]
        }
        Instruction::I32LtS | Instruction::I64LtS | Instruction::I32LtU | Instruction::I64LtU | Instruction::F32Lt | Instruction::F64Lt => {
            vec![(*indent, format!("{{ kind: 'LessThan' }},"))]
        }
        Instruction::I32GeS | Instruction::I64GeS | Instruction::I32GeU | Instruction::I64GeU | Instruction::F32Ge | Instruction::F64Ge => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual' }},"))]
        }
        Instruction::I32LeS | Instruction::I64LeS | Instruction::I32LeU | Instruction::I64LeU | Instruction::F32Le | Instruction::F64Le => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual' }},"))]
        }

        /* Arithmetic Instructions */
        Instruction::I32Add => {
            vec![(*indent, format!("{{ kind: 'Add', type: 'i32' }},"))]
        }
        Instruction::I64Add => {
            vec![(*indent, format!("{{ kind: 'Add', type: 'i64' }},"))]
        }
        Instruction::F32Add => {
            vec![(*indent, format!("{{ kind: 'Add', type: 'f32' }},"))]
        }
        Instruction::F64Add => {
            vec![(*indent, format!("{{ kind: 'Add', type: 'f64' }},"))]
        }
        Instruction::I32Sub | Instruction::I64Sub | Instruction::F32Sub | Instruction::F64Sub => {
            vec![(*indent, format!("{{ kind: 'Subtract' }},"))]
        }
        Instruction::I32Mul | Instruction::I64Mul | Instruction::F32Mul | Instruction::F64Mul => {
            vec![(*indent, format!("{{ kind: 'Multiply' }},"))]
        }
        Instruction::F32Div | Instruction::F64Div | Instruction::I32DivS | Instruction::I64DivS | Instruction::I32DivU | Instruction::I64DivU => {
            vec![(*indent, format!("{{ kind: 'Divide' }},"))]
        }
        Instruction::I32RemS | Instruction::I64RemS | Instruction::I32RemU | Instruction::I64RemU => {
            vec![(*indent, format!("{{ kind: 'Remainder' }},"))]
        }

        /* Conversion Instructions */
        Instruction::I64ExtendI32U => {
            vec![(*indent, format!("{{ kind: 'Extend8Unsigned' }},"))]
        }
        // Wrap
        // Promote
        // Demote
        // Convert
        // Trunc (float to int)
        // Reinterpret

        /* Floating Point Specific Instructions */
        // Min
        // Max
        // Nearest
        // Ceil
        // Floor
        // Truncate (float to float)
        Instruction::F32Abs | Instruction::F64Abs => {
            vec![(*indent, format!("{{ kind: 'AbsoluteValue' }},"))]
        }
        Instruction::F32Neg | Instruction::F64Neg => {
            vec![(*indent, format!("{{ kind: 'Negate' }},"))]
        }
        // SquareRoot
        // CopySign

        /* Bitwise Instructions */
        Instruction::I32And | Instruction::I64And => {
            vec![(*indent, format!("{{ kind: 'And' }},"))]
        }
        Instruction::I32Or | Instruction::I64Or => {
            vec![(*indent, format!("{{ kind: 'Or' }},"))]
        }
        Instruction::I32Xor | Instruction::I64Xor => {
            vec![(*indent, format!("{{ kind: 'Xor' }},"))]
        }
        Instruction::I32Shl | Instruction::I64Shl => {
            vec![(*indent, format!("{{ kind: 'ShiftLeft' }},"))]
        }
        Instruction::I32ShrU | Instruction::I64ShrU => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: false }},"))]
        }
        Instruction::I32ShrS | Instruction::I64ShrS => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: true }},"))]
        }
        Instruction::I32Rotl | Instruction::I64Rotl => {
            vec![(*indent, format!("{{ kind: 'RotateLeft' }},"))]
        }
        Instruction::I32Rotr | Instruction::I64Rotr => {
            vec![(*indent, format!("{{ kind: 'RotateRight' }},"))]
        }
        // CountLeadingZeros
        // CountTrailingZeros
        // PopulationCount

        /**************
         * Variable Instructions
         **************/
        Instruction::LocalGet(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'LocalGet'; id: {id} }},"))]
        }
        Instruction::LocalSet(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'LocalSet'; id: {id} }},"))]
        }
        Instruction::LocalTee(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'LocalTee'; id: {id} }},"))]
        }
        Instruction::GlobalGet(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'GlobalGet'; id: {id} }},"))]
        }
        Instruction::GlobalSet(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'GlobalSet'; id: {id} }},"))]
        }

        /**************
         * Memory Instructions
         **************/
        // Grow
        Instruction::MemorySize(_) => {
            vec![(*indent, format!("{{ kind: 'MemorySize' }},"))]
        }
        Instruction::I32Load(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Load'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::F32Load(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'F32Load'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::F64Load(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'F64Load'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Load8s(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Load8s'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Load8u(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Load8u'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Load16s(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Load16s'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Load16u(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Load16u'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load8s(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load8s'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load8u(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load8u'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load16s(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load16s'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load16u(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load16u'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load32s(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load32s'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Load32u(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Load32u'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Store(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Store'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Store(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Store'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::F32Store(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'F32Store'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::F64Store(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'F64Store'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Store8(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Store8'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I32Store16(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I32Store16'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Store8(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Store8'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Store16(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Store16'; offset: {} }},", mem_arg.offset))]
        }
        Instruction::I64Store32(mem_arg) => {
            vec![(*indent, format!("{{ kind: 'I64Store32'; offset: {} }},", mem_arg.offset))]
        }

        /**************
         * Control Flow Instructions
         **************/
        Instruction::Block(block) => {
            let label = block.label.expect("blocks must have labels").name();

            context.push("Block");
            let nest = handle_instructions(func, instrs, &mut (*indent + 2), context);

            vec![
                (*indent, format!("{{ kind: 'Block';")),
                (*indent + 1, format!("id: '${label}';")),
                (*indent + 1, format!("instructions: [")),
            ]
            .into_iter()
            .chain(nest)
            .collect::<Vec<(usize, String)>>()
        }
        Instruction::Br(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'Branch'; id: {id} }},"))]
        }
        Instruction::BrIf(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'BranchIf'; id: {id} }},"))]
        }
        Instruction::BrTable(br_table) => {
            let branches = br_table
                .labels
                .iter()
                .enumerate()
                .map(|(index, label)| format!("{}: {}", index, format_index(label)))
                .collect::<Vec<String>>()
                .join(", ");

            let default_label = format_index(&br_table.default);

            vec![
                (*indent, format!("{{ kind: 'BranchTable';")),
                (*indent + 1, format!("branches: {{ {branches} }};")),
                (*indent + 1, format!("default: {default_label};")),
                (*indent, format!("}}")),
            ]
        }
        Instruction::Call(index) => {
            let id = format_index(index);
            vec![(*indent, format!("{{ kind: 'Call'; id: {id} }},"))]
        }
        Instruction::CallIndirect(call_indirect) => {
            let id = format_index(&call_indirect.table);
            vec![(*indent, format!("{{ kind: 'CallIndirect'; id: {id} }},"))]
        }
        // ReturnCall
        // ReturnCallIndirect
        Instruction::Drop => {
            vec![(*indent, format!("{{ kind: 'Drop' }},"))]
        }
        Instruction::End(_) => {
            let this_context = context.pop();

            let pop = if this_context == Some("If") {
                (*indent, format!("];"))
            } else if this_context == Some("Else") || this_context == Some("Block") || this_context == Some("Loop") {
                (*indent - 1, format!("];"))
            } else {
                panic!("unexpected context {:#?}", this_context);
            };

            let thing = vec![pop, (*indent - 2, format!("}},"))];
            *indent -= 2;
            thing
        }
        Instruction::If(_) => {
            context.push("If");

            let then_instrs = handle_instructions(func, instrs, &mut (*indent + 2), context);

            let thing = vec![(*indent, format!("{{ kind: 'If';")), (*indent + 1, format!("then: ["))]
                .into_iter()
                .chain(then_instrs)
                .collect::<Vec<(usize, String)>>();
            *indent -= 2;
            thing
        }
        Instruction::Else(_) => {
            context.pop(); // remove the "If" context that came before
            context.push("Else");

            let else_instrs = handle_instructions(func, instrs, &mut (indent.clone()), context);

            vec![
                (*indent - 1, format!("];")),      // end the "then" context
                (*indent - 1, format!("else: [")), // start the "else" context
            ]
            .into_iter()
            .chain(else_instrs)
            .collect::<Vec<(usize, String)>>()
        }
        Instruction::Loop(block_type) => {
            context.push("Loop");
            let nest = handle_instructions(func, instrs, &mut (*indent + 2), context);

            let thing = vec![
                (*indent, format!("{{ kind: 'Loop';")),
                (*indent + 1, format!("id: '${}';", block_type.label.expect("loops must have labels").name())),
                (*indent + 1, format!("instructions: [")),
            ]
            .into_iter()
            .chain(nest)
            .collect::<Vec<(usize, String)>>();
            *indent -= 2;
            thing
        }
        Instruction::Nop => {
            vec![(*indent, format!("{{ kind: 'Nop'; ziltoid: 'theOmniscient' }},"))]
        }
        Instruction::Return => {
            let count = func.ty.inline.clone().expect("must have a return type").results.len();
            vec![(*indent, format!("{{ kind: 'Return'; count: {count} }},"))]
        }
        Instruction::Select(_) => {
            vec![(*indent, format!("{{ kind: 'Select' }},"))]
        }
        Instruction::Unreachable => {
            vec![(*indent, format!("{{ kind: 'Unreachable' }},"))]
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

            let indent = &mut 3;

            let instructions = handle_instructions(func, &mut expression.instrs.iter().collect(), indent, &mut vec![])
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
