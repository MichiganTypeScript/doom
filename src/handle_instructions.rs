use core::panic;

use wast::{core::Instruction, token::Index};

use crate::{
    fragment::Fragment,
    source_file::SourceFile,
    statement::Statement,
    type_constraint::TypeConstraint,
    utils::{format_call_id, format_index, hotscript_binary, hotscript_unary, RESULT_SENTINEL},
};

pub fn handle_instructions(
    source: &SourceFile,
    instructions: &[Instruction<'_>],
    result_type_constraint: TypeConstraint,
    locals: Vec<Statement>,
) -> (Vec<Statement>, Statement) {
    let mut statements = locals;
    let mut fragments: Vec<Fragment> = Vec::new();

    // Order: I32, I64, F32, F64
    // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference
    for instruction in instructions.iter() {
        match instruction {
            ////////////////////////////////////////////////
            // Numeric Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric
            ////////////////////////////////////////////////

            ////// Constants
            //////
            Instruction::I32Const(num) => {
                fragments.push(Fragment::from_string(
                    num.to_string(),
                    TypeConstraint::Number,
                ));
            }
            Instruction::I64Const(num) => {
                fragments.push(Fragment::from_string(
                    num.to_string(),
                    TypeConstraint::Number,
                ));
            }
            //Instruction::F32Const
            Instruction::F64Const(raw_bits) => {
                let float_value = f64::from_bits(raw_bits.bits).to_string();

                fragments.push(Fragment::from_string(float_value, TypeConstraint::Number));
            }

            ////// Comparison
            //////
            Instruction::I32Eq | Instruction::I64Eq | Instruction::F32Eq | Instruction::F64Eq => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Equal",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32Eqz | Instruction::I64Eqz => {
                fragments.push(Fragment::from_string("0", TypeConstraint::Number));
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Equal",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32Ne | Instruction::I64Ne | Instruction::F32Ne | Instruction::F64Ne => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "NotEqual",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32GtS
            | Instruction::I32GtU
            | Instruction::I64GtS
            | Instruction::I64GtU
            | Instruction::F32Gt
            | Instruction::F64Gt => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "GreaterThan",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32GeS
            | Instruction::I32GeU
            | Instruction::I64GeS
            | Instruction::I64GeU
            | Instruction::F32Ge
            | Instruction::F64Ge => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "GreaterThanOrEqual",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32LtS
            | Instruction::I32LtU
            | Instruction::I64LtS
            | Instruction::I64LtU
            | Instruction::F32Lt
            | Instruction::F64Lt => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "LessThan",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32LeS
            | Instruction::I32LeU
            | Instruction::I64LeS
            | Instruction::I64LeU
            | Instruction::F32Le
            | Instruction::F64Le => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "LessThanOrEqual",
                    TypeConstraint::Number,
                    true,
                );
            }

            ////// Arithmetic
            //////
            Instruction::I32Add
            | Instruction::I64Add
            | Instruction::F32Add
            | Instruction::F64Add => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Add",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32Sub
            | Instruction::I64Sub
            | Instruction::F32Sub
            | Instruction::F64Sub => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Sub",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32Mul
            | Instruction::I64Mul
            | Instruction::F32Mul
            | Instruction::F64Mul => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Mul",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32DivS
            | Instruction::I32DivU
            | Instruction::I64DivS
            | Instruction::I64DivU => {
                hotscript_binary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Div",
                    TypeConstraint::Number,
                    false,
                );
            }

            ////// Floating Point Specific Instructions
            //////
            Instruction::F32Abs | Instruction::F64Abs => {
                hotscript_unary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Abs",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::F32Neg | Instruction::F64Neg => {
                hotscript_unary(
                    source,
                    &mut fragments,
                    "Numbers",
                    "Negate",
                    TypeConstraint::Number,
                    false,
                );
            }

            ////// Bitwise
            //////
            // Instruction::I32And() => {}

            ////////////////////////////////////////////////
            // Variable Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Variables
            ////////////////////////////////////////////////
            Instruction::LocalGet(index) => {
                let value = format_index(index);
                fragments.push(Fragment::from_string(
                    value,
                    TypeConstraint::Number, // TODO: need to get this type constraint from somewhere
                ));
            }
            Instruction::LocalSet(index) => {
                // `_` before a name means it's a local
                let name = format_index(index);

                statements.iter_mut().for_each(|local| {
                    if local.name == name {
                        local.value = fragments.pop().expect("LocalSet pop");
                    }
                });
            }
            Instruction::LocalTee(index) => {
                let name = format_index(index);
                statements.iter_mut().for_each(|local| {
                    if local.name == name {
                        // suspect that this is a bug that it uses `first`
                        local.value = fragments.first().expect("should be a fragment").clone();
                    }
                });
            }
            //Instruction::GlobalGet()
            //Instruction::GlobalSet()

            ////////////////////////////////////////////////
            // Control Flow Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow
            ////////////////////////////////////////////////
            Instruction::Nop => {
                fragments.push(Fragment::from_string("unknown", TypeConstraint::None))
            }
            Instruction::Block(block) => {
                dbg!(block);
            }
            Instruction::Br(index) => {
                dbg!(index);
            }
            Instruction::Call(index) => {
                let actual_id = match index {
                    Index::Id(i) => format_call_id(i.name()),
                    _ => panic!("numeric call index not supported"),
                };

                if let Some(td) = source.get_type(&actual_id) {
                    // dbg!(td);

                    let indent = 0; // probably a bug to not get this from somewhere actual.  oh well.
                    let mut f = Fragment::new(td.result.constraint);

                    if td.generics.is_empty() {
                        f.push(indent, actual_id);
                    } else {
                        f.push(indent, format!("{actual_id}<"));

                        let mut temp = vec![];
                        for (index, _) in td.generics.iter().enumerate() {
                            let mut f = fragments.pop().expect("Call st");

                            f.indent_lines();
                            // we're going to reverse the temp list after this loop block, so what this is effectively saying is "add a comma at the last line of all expressions except the last one" because (unfortunately) trailing commas in TS arguments are not allowed).
                            if index != 0 {
                                f.append_to_last_line(",");
                            }
                            temp.push(f.lines);
                        }

                        temp.reverse();
                        for mut t in temp {
                            f.append(&mut t);
                        }

                        f.push(indent, ">");
                    }

                    fragments.push(f);
                } else {
                    dbg!(source);
                    panic!("can't find id in Call: {actual_id}");
                }
            }
            //Instruction::Drop
            Instruction::End(_id) => {
                let mut else_side = fragments.pop().expect("End else_side pop");
                else_side.prepend_to_first_line(": ");

                let mut then_side = fragments.pop().expect("End then_side pop");
                let mut condition = fragments.pop().expect("End condition pop");

                condition.append(&mut then_side.lines);
                condition.append(&mut else_side.lines);

                fragments.push(condition);
            }
            Instruction::BrIf(index) => {
                dbg!(index);
            }
            Instruction::If(_block) => {
                let mut condition_pop = fragments.pop().expect("If");
                condition_pop.append_to_last_line(" extends 1");
                fragments.push(condition_pop);
            }
            Instruction::Else(_) => {
                let mut then_side_pop = fragments.pop().expect("Else");
                then_side_pop.prepend_to_first_line("? ");
                fragments.push(then_side_pop);
            }
            //Instruction::Loop()
            //Instruction::Nop
            //Instruction::Return
            Instruction::Select(_select_types) => {
                let mut condition = fragments.pop().expect("select 1");
                condition.append_to_last_line(" extends 0");

                let mut falsy = fragments.pop().expect("select2");
                falsy.prepend_to_first_line("? ");

                let mut truthy = fragments.pop().expect("select3");
                truthy.prepend_to_first_line(": ");

                condition.append(&mut falsy.lines);
                condition.append(&mut truthy.lines);

                fragments.push(condition);
            }
            Instruction::Unreachable => {
                // Unreachable instructions can be skipped as far as I can tell (why do they even exist anyway?)
            }
            _ => {
                panic!("not implemented instruction {:#?}", instruction);
            }
        }
    }

    let results = Statement::new(
        RESULT_SENTINEL,
        result_type_constraint,
        fragments.pop().expect("should be at least one"),
    );

    if !fragments.is_empty() {
        panic!("fragments should be empty by now because multiple returns are not supported");
    }

    (statements, results)
}
