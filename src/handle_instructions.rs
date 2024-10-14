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

fn format_offset(offset: u64) -> String {
    if offset == 0 {
        return "".to_string();
    }

    format!("; offset: '{:032b}'", offset)
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
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:032b}' }},", value))]
        }
        Instruction::I64Const(value) => {
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:064b}' }},", value))]
        }
        Instruction::F32Const(f32) => {
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:032b}' }},", f32.bits))]
        }
        Instruction::F64Const(f64) => {
            vec![(*indent, format!("{{ kind: 'Const'; value: '{:064b}' }},", f64.bits))]
        }

        /* Comparison Instructions */
        Instruction::I32Eqz => {
            vec![(*indent, format!("{{ kind: 'EqualsZero', type: 'i32' }},"))]
        }
        Instruction::I64Eqz => {
            vec![(*indent, format!("{{ kind: 'EqualsZero', type: 'i64' }},"))]
        }
        Instruction::I32Eq => {
            vec![(*indent, format!("{{ kind: 'Equals', type: 'i32' }},"))]
        }
        Instruction::I64Eq => {
            vec![(*indent, format!("{{ kind: 'Equals', type: 'i64' }},"))]
        }
        Instruction::F32Eq => {
            vec![(*indent, format!("{{ kind: 'Equals', type: 'f32' }},"))]
        }
        Instruction::F64Eq => {
            vec![(*indent, format!("{{ kind: 'Equals', type: 'f64' }},"))]
        }
        Instruction::I32Ne => {
            vec![(*indent, format!("{{ kind: 'NotEqual', type: 'i32' }},"))]
        }
        Instruction::I64Ne => {
            vec![(*indent, format!("{{ kind: 'NotEqual', type: 'i64' }},"))]
        }
        Instruction::F32Ne => {
            vec![(*indent, format!("{{ kind: 'NotEqual', type: 'i32' }},"))]
        }
        Instruction::F64Ne => {
            vec![(*indent, format!("{{ kind: 'NotEqual', type: 'f64' }},"))]
        }

        Instruction::I32GtS => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64GtS => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32GtU => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64GtU => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: false, type: 'i64' }},"))]
        }
        Instruction::F32Gt => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: true, type: 'f32' }},"))]
        }
        Instruction::F64Gt => {
            vec![(*indent, format!("{{ kind: 'GreaterThan', signed: true, type: 'f64' }},"))]
        }

        Instruction::I32LtS => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64LtS => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32LtU => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64LtU => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: false, type: 'i64' }},"))]
        }
        Instruction::F32Lt => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: true, type: 'f32' }},"))]
        }
        Instruction::F64Lt => {
            vec![(*indent, format!("{{ kind: 'LessThan', signed: true, type: 'f64' }},"))]
        }

        Instruction::I32GeS => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64GeS => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32GeU => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64GeU => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: false, type: 'i64' }},"))]
        }
        Instruction::F32Ge => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: true, type: 'f32' }},"))]
        }
        Instruction::F64Ge => {
            vec![(*indent, format!("{{ kind: 'GreaterThanOrEqual', signed: true, type: 'f64' }},"))]
        }

        Instruction::I32LeS => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64LeS => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32LeU => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64LeU => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: false, type: 'i64' }},"))]
        }
        Instruction::F32Le => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: true, type: 'f32' }},"))]
        }
        Instruction::F64Le => {
            vec![(*indent, format!("{{ kind: 'LessThanOrEqual', signed: true, type: 'f64' }},"))]
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
        Instruction::I32Sub => {
            vec![(*indent, format!("{{ kind: 'Subtract', type: 'i32' }},"))]
        }
        Instruction::I64Sub => {
            vec![(*indent, format!("{{ kind: 'Subtract', type: 'i64' }},"))]
        }
        Instruction::F32Sub => {
            vec![(*indent, format!("{{ kind: 'Subtract', type: 'f32' }},"))]
        }
        Instruction::F64Sub => {
            vec![(*indent, format!("{{ kind: 'Subtract', type: 'f64' }},"))]
        }
        Instruction::I32Mul => {
            vec![(*indent, format!("{{ kind: 'Multiply', type: 'i32' }},"))]
        }
        Instruction::I64Mul => {
            vec![(*indent, format!("{{ kind: 'Multiply', type: 'i64' }},"))]
        }
        Instruction::F32Mul => {
            vec![(*indent, format!("{{ kind: 'Multiply', type: 'f32' }},"))]
        }
        Instruction::F64Mul => {
            vec![(*indent, format!("{{ kind: 'Multiply', type: 'f64' }},"))]
        }
        Instruction::F32Div => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: true, type: 'f32' }},"))]
        }
        Instruction::F64Div => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: true, type: 'f64' }},"))]
        }
        Instruction::I32DivS => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64DivS => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32DivU => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64DivU => {
            vec![(*indent, format!("{{ kind: 'Divide', signed: false, type: 'i64' }},"))]
        }
        Instruction::I32RemS => {
            vec![(*indent, format!("{{ kind: 'Remainder', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64RemS => {
            vec![(*indent, format!("{{ kind: 'Remainder', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32RemU => {
            vec![(*indent, format!("{{ kind: 'Remainder', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64RemU => {
            vec![(*indent, format!("{{ kind: 'Remainder', signed: false, type: 'i64' }},"))]
        }

        /* Conversion Instructions */
        Instruction::I32WrapI64 => {
            vec![(*indent, format!("{{ kind: 'Wrap' }},"))]
        }
        Instruction::I32Extend8S => {
            vec![(*indent, format!("{{ kind: 'Extend', signed: true, from: 8 }},"))]
        }
        Instruction::I32Extend16S => {
            vec![(*indent, format!("{{ kind: 'Extend', signed: true, from: 16 }},"))]
        }
        Instruction::I64ExtendI32S => {
            vec![(*indent, format!("{{ kind: 'Extend', signed: true, from: 32 }},"))]
        }
        Instruction::I64ExtendI32U => {
            vec![(*indent, format!("{{ kind: 'Extend', signed: false, from: 32 }},"))]
        }
        Instruction::I64Extend32S => {
            vec![(*indent, format!("{{ kind: 'ExtendSign', from: 32 }},"))]
        }
        Instruction::F32ReinterpretI32 | Instruction::I32ReinterpretF32 | Instruction::F64ReinterpretI64 | Instruction::I64ReinterpretF64 => {
            vec![(*indent, format!("{{ kind: 'Reinterpret' }},"))]
        }
        Instruction::F64PromoteF32 => {
            vec![(*indent, format!("{{ kind: 'Promote' }},"))]
        }
        Instruction::F32ConvertI32S => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: true, from: 'f32', to: 'i32' }},"))]
        }
        Instruction::F32ConvertI32U => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: false, from: 'f32', to: 'i32' }},"))]
        }
        Instruction::F32ConvertI64S => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: true, from: 'f32', to: 'i64' }},"))]
        }
        Instruction::F32ConvertI64U => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: false, from: 'f32', to: 'i64' }},"))]
        }
        Instruction::F64ConvertI32S => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: true, from: 'f64', to: 'i32' }},"))]
        }
        Instruction::F64ConvertI32U => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: false, from: 'f64', to: 'i32' }},"))]
        }
        Instruction::F64ConvertI64S => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: true, from: 'f64', to: 'i64' }},"))]
        }
        Instruction::F64ConvertI64U => {
            vec![(*indent, format!("{{ kind: 'Convert', signed: false, from: 'f64', to: 'i64' }},"))]
        }
        Instruction::I32TruncF32S => {
            vec![(*indent, format!("{{ kind: 'Truncate', signed: true, from: 'i32', to: 'f32' }},"))]
        }
        Instruction::I32TruncF64U => {
            vec![(*indent, format!("{{ kind: 'Truncate', signed: false, from: 'i32', to: 'f64' }},"))]
        }
        Instruction::I32TruncF64S => {
            vec![(*indent, format!("{{ kind: 'Truncate', signed: true, from: 'i32', to: 'f64' }},"))]
        }
        Instruction::F32DemoteF64 => {
            vec![(*indent, format!("{{ kind: 'Demote' }},"))]
        }

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
        Instruction::I32And => {
            vec![(*indent, format!("{{ kind: 'And', type: 'i32' }},"))]
        }
        Instruction::I64And => {
            vec![(*indent, format!("{{ kind: 'And', type: 'i64' }},"))]
        }
        Instruction::I32Or => {
            vec![(*indent, format!("{{ kind: 'Or', type: 'i32' }},"))]
        }
        Instruction::I64Or => {
            vec![(*indent, format!("{{ kind: 'Or', type: 'i64' }},"))]
        }
        Instruction::I32Xor => {
            vec![(*indent, format!("{{ kind: 'Xor', type: 'i32' }},"))]
        }
        Instruction::I64Xor => {
            vec![(*indent, format!("{{ kind: 'Xor', type: 'i64' }},"))]
        }
        Instruction::I32Shl => {
            vec![(*indent, format!("{{ kind: 'ShiftLeft', type: 'i32' }},"))]
        }
        Instruction::I64Shl => {
            vec![(*indent, format!("{{ kind: 'ShiftLeft', type: 'i64' }},"))]
        }
        Instruction::I32ShrU => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: false, type: 'i32' }},"))]
        }
        Instruction::I64ShrU => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: false, type: 'i64' }},"))]
        }
        Instruction::I32ShrS => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: true, type: 'i32' }},"))]
        }
        Instruction::I64ShrS => {
            vec![(*indent, format!("{{ kind: 'ShiftRight', signed: true, type: 'i64' }},"))]
        }
        Instruction::I32Rotl => {
            vec![(*indent, format!("{{ kind: 'RotateLeft', type: 'i32' }},"))]
        }
        Instruction::I64Rotl => {
            vec![(*indent, format!("{{ kind: 'RotateLeft', type: 'i64' }},"))]
        }
        Instruction::I32Rotr => {
            vec![(*indent, format!("{{ kind: 'RotateRight', type: 'i32' }},"))]
        }
        Instruction::I64Rotr => {
            vec![(*indent, format!("{{ kind: 'RotateRight', type: 'i64' }},"))]
        }
        Instruction::I32Clz => {
            vec![(*indent, format!("{{ kind: 'CountLeadingZeros', type: 'i32' }},"))]
        }
        Instruction::I64Clz => {
            vec![(*indent, format!("{{ kind: 'CountLeadingZeros', type: 'i64' }},"))]
        }
        Instruction::I32Ctz => {
            vec![(*indent, format!("{{ kind: 'CountTrailingZeros', type: 'i32' }},"))]
        }
        Instruction::I64Ctz => {
            vec![(*indent, format!("{{ kind: 'CountTrailingZeros', type: 'i64' }},"))]
        }
        Instruction::I32Popcnt => {
            vec![(*indent, format!("{{ kind: 'PopulationCount', type: 'i32' }},"))]
        }
        Instruction::I64Popcnt => {
            vec![(*indent, format!("{{ kind: 'PopulationCount', type: 'i64' }},"))]
        }

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
        Instruction::MemoryGrow(_) => {
            vec![(*indent, format!("{{ kind: 'MemoryGrow' }},"))]
        }
        Instruction::MemorySize(_) => {
            vec![(*indent, format!("{{ kind: 'MemorySize' }},"))]
        }

        Instruction::I32Load(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I32Load'{offset} }},"))]
        }
        Instruction::I32Load8s(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I32Load8s'{offset} }},"))]
        }
        Instruction::I32Load8u(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I32Load8u'{offset} }},"))]
        }
        Instruction::I32Load16s(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I32Load16s'{offset} }},"))]
        }
        Instruction::I32Load16u(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I32Load16u'{offset} }},"))]
        }

        Instruction::I64Load8s(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load8s'{offset} }},"))]
        }
        Instruction::I64Load8u(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load8u'{offset} }},"))]
        }
        Instruction::I64Load16s(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load16s'{offset} }},"))]
        }
        Instruction::I64Load16u(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load16u'{offset} }},"))]
        }
        Instruction::I64Load32s(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load32s'{offset} }},"))]
        }
        Instruction::I64Load32u(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load32u'{offset} }},"))]
        }

        Instruction::F32Load(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'F32Load'{offset} }},"))]
        }
        Instruction::F64Load(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'F64Load'{offset} }},"))]
        }
        Instruction::I64Load(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Load'; subkind: 'I64Load'{offset} }},"))]
        }

        Instruction::I32Store(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I32Store'{offset} }},"))]
        }
        Instruction::I64Store(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I64Store'{offset} }},"))]
        }
        Instruction::F32Store(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'F32Store'{offset} }},"))]
        }
        Instruction::F64Store(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'F64Store'{offset} }},"))]
        }
        Instruction::I32Store8(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I32Store8'{offset} }},"))]
        }
        Instruction::I32Store16(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I32Store16'{offset} }},"))]
        }
        Instruction::I64Store8(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I64Store8'{offset} }},"))]
        }
        Instruction::I64Store16(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I64Store16'{offset} }},"))]
        }
        Instruction::I64Store32(mem_arg) => {
            let offset = format_offset(mem_arg.offset);
            vec![(*indent, format!("{{ kind: 'Store'; subkind: 'I64Store32'{offset} }},"))]
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
                .map(|(index, label)| format!("'{:032b}': {}", index, format_index(label)))
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

            let pop = if this_context == Some("If") || this_context == Some("Else") || this_context == Some("Block") || this_context == Some("Loop") {
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
            let maybe_inline = func.ty.inline.clone();
            let count = if let Some(ft) = maybe_inline { ft.results.len() } else { 0 };
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
