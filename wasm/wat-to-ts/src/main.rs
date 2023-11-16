extern crate wast;

mod source_code;
mod source_printer;
mod utils;

use source_printer::SourcePrinter;

use source_code::SourceCode;
use std::{fs, vec};
use wast::{
    core::{Export, Func, Global, Instruction, ModuleField, ModuleKind},
    parser,
    token::Index,
    Wat,
};

use crate::utils::{count_instructions, format_call_id, format_index_name};

#[macro_use]
extern crate pretty_assertions;

fn handle_instructions(source: &mut SourceCode, instructions: &[Instruction<'_>]) -> String {
    let mut stack: Vec<SourcePrinter> = Vec::new();

    for instruction in instructions.iter() {
        dbg!(&stack);
        dbg!(&instruction);

        match instruction {
            Instruction::LocalGet(local) => {
                let value = match local {
                    Index::Id(id) => "$".to_string() + id.name(),
                    Index::Num(num, _) => format_index_name(*num as usize),
                };
                stack.push(SourcePrinter::from_string(value));
            }
            Instruction::If(_block) => {
                let mut condition_pop = stack.pop().expect("If");
                condition_pop.append_to_last_line(" extends true");
                stack.push(condition_pop);
            }
            Instruction::Else(_) => {
                let mut then_side_pop = stack.pop().expect("Else");
                then_side_pop.prepent_to_first_line("? ");
                stack.push(then_side_pop);
            }
            Instruction::End(_) => {
                let mut else_side = stack.pop().expect("End else_side pop");
                else_side.prepent_to_first_line(": ");

                let mut then_side = stack.pop().expect("End then_side pop");
                let mut condition = stack.pop().expect("End condition pop");

                condition.lines(&mut then_side.lines);
                condition.lines(&mut else_side.lines);

                stack.push(condition);
            }
            Instruction::I32Add => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                let mut rhs = stack.pop().expect("I32Add rhs pop");
                let mut lhs = stack.pop().expect("I32Add lsh pop");

                let mut sp = SourcePrinter::new();

                let indent = lhs.lines.first().expect("I32Add base_indent").indent;
                sp.line(indent, "Call<Numbers.Add<");

                lhs.append_to_last_line(",");

                lhs.increase_indent();
                sp.lines(&mut lhs.lines);

                rhs.increase_indent();
                sp.lines(&mut rhs.lines);

                sp.line(indent, ">>");

                stack.push(sp);
            }
            Instruction::I32GeS => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                let mut rhs = stack.pop().expect("I32GeS rhs pop");
                let mut lhs = stack.pop().expect("I32GeS lsh pop");

                let mut sp = SourcePrinter::new();

                let indent = rhs.lines.first().expect("I32GeS indent").indent;
                sp.line(indent, "Call<Numbers.GreaterThanOrEqual<");

                lhs.increase_indent();
                lhs.map_lines(|text| format!("{text},"));
                sp.lines(&mut lhs.lines);

                rhs.increase_indent();
                sp.lines(&mut rhs.lines);

                sp.line(indent, ">>");
                stack.push(sp);
            }
            Instruction::F64Const(raw_bits) => {
                let float_value = f64::from_bits(raw_bits.bits).to_string();

                stack.push(SourcePrinter::from_string(float_value));
            }
            Instruction::I32Const(num) => {
                stack.push(SourcePrinter::from_string(num.to_string()));
            }
            Instruction::I64Const(num) => {
                stack.push(SourcePrinter::from_string(num.to_string()));
            }
            Instruction::F64Neg => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                let mut operands = stack.pop().expect("F64Neg lines");
                let indent = operands.lines.first().expect("F64Neg indent").indent;
                operands.increase_indent();

                let mut sp = SourcePrinter::new();

                sp.line(indent, "Call<Numbers.Negate<");
                sp.lines(&mut operands.lines);
                sp.line(indent, ">>");

                stack.push(sp);
            }
            Instruction::Call(id) => {
                let actual_id = match id {
                    Index::Id(i) => format_call_id(i.name()),
                    Index::Num(num, _span) => format_index_name(*num as usize),
                };
                let print_id = match id {
                    Index::Id(i) => i.name().to_string(),
                    Index::Num(num, _span) => format_index_name(*num as usize),
                };

                if let Some(td) = source.types.get(&actual_id) {
                    let indent = 1;
                    let mut sp = SourcePrinter::new();

                    sp.line(indent, format!("{print_id}<"));

                    let mut temp = vec![];
                    for (index, _) in td.generics.iter().enumerate() {
                        let mut sp = stack.pop().expect("Call sp");

                        sp.increase_indent();

                        // we're going to reverse the temp list after this loop block, so what this is effectively saying is "add a comma at the last line of all expressions except the last one" because (unfortunately) trailing commas in TS arguments are not allowed).
                        if index != 0 {
                            sp.append_to_last_line(",");
                        }
                        temp.push(sp.lines);
                    }

                    temp.reverse();
                    for mut t in temp {
                        sp.lines(&mut t);
                    }

                    sp.line(indent, ">");
                    stack.push(sp);
                } else {
                    dbg!(source);
                    panic!("can't find id in Call: {actual_id}");
                }
            }

            _ => {
                panic!("not implemented instruction {:#?}", instruction);
            }
        }
    }

    let expr = stack.pop().expect("the stack was totally empty");
    expr.to_string()
}

fn get_param_name(index: usize, maybe_name: &Option<String>) -> String {
    if let Some(name) = maybe_name {
        name.to_string()
    } else {
        format_index_name(index)
    }
}

fn handle_module_field_func(source: &mut SourceCode, field: &Func) {
    let name = "$".to_string()
        + field
            .id
            .unwrap_or_else(|| panic!("need to implement no name funcs"))
            .name();

    let mut generics = vec![];
    let mut definition = "".to_string();

    let mut param_names: Vec<Option<String>> = Vec::new();
    if let Some(ref func_type) = field.ty.inline {
        for (param_id, _, _) in func_type.params.iter() {
            if let Some(p) = param_id {
                param_names.push(Some(format!("${}", p.name())));
            } else {
                param_names.push(None);
            }
        }

        if !func_type.params.is_empty() {
            generics = param_names
                .iter()
                .enumerate()
                .map(|(index, name)| (get_param_name(index, name), "number".to_string()))
                .collect();
        }

        // dbg!(func_types);
    }

    match &field.kind {
        wast::core::FuncKind::Import(_imp) => {}
        wast::core::FuncKind::Inline {
            locals: _,
            expression,
        } => {
            definition = handle_instructions(source, &expression.instrs);
        }
    }

    source.add_type(&name, generics, definition);

    for export in field.exports.names.iter() {
        source.add_export(&name, *export);
    }

    // dbg!(func);
}

fn handle_module_field_global(source: &mut SourceCode, field: &Global) {
    let mut definition = "".to_string();

    match &field.kind {
        wast::core::GlobalKind::Import(_import) => {}
        wast::core::GlobalKind::Inline(expression) => {
            definition = handle_instructions(source, &expression.instrs);
        }
    }

    let name = "$".to_string() + field.id.unwrap().name();
    source.add_type(&name, vec![], definition);

    for export in field.exports.names.iter() {
        source.add_export(&name, *export);
    }

    // dbg!(global);
}

fn handle_module_field_export(_source: &mut SourceCode, _field: &Export) {
    // dbg!(field);
}

fn handle_module_field(source: &mut SourceCode, field: &ModuleField) {
    match field {
        ModuleField::Func(field) => handle_module_field_func(source, field),
        ModuleField::Global(field) => handle_module_field_global(source, field),
        ModuleField::Export(field) => handle_module_field_export(source, field),

        _other => {
            // dbg!(other);
            panic!("not implemented module field");
        }
    }
}

fn wat_to_dts(wat: String, dump_path: &str) -> SourceCode {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = &parser::parse::<Wat>(&buf).unwrap();

    let mut source = SourceCode::new();

    if let wast::Wat::Module(ref module) = parsed_wat {
        let counter = count_instructions(module);

        let dump = format!("{:#?}\n\n\n\n\n{:#?}", module, counter);
        dbg_dump_file!(dump, dump_path);

        match &module.kind {
            ModuleKind::Binary(_) => {
                panic!("WebAssembly Binary is not supported.  Only WebAssembly Text.");
            }
            ModuleKind::Text(fields) => {
                for field in fields {
                    handle_module_field(&mut source, field);
                }
            }
        }
    }

    source
}

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();
    let output = wat_to_dts(wat, "src/code.dump").to_string();
    fs::write("src/code.d.ts", output).unwrap();
}

#[cfg(test)]
mod tests {
    use std::fs;

    use super::*;

    #[test]
    fn run_conformance() {
        let conformance_dir = "src/conformance/";

        let test_files = fs::read_dir(conformance_dir).unwrap();

        for entry in test_files.flatten() {
            if !entry.path().is_file() {
                continue;
            }

            let wat_path = entry.path();

            let file_name = wat_path.file_name().unwrap().to_string_lossy();

            if !file_name.ends_with(".wat") {
                continue;
            }

            // // focus
            // if file_name != "add.wat" {
            //     continue;
            // }

            let wat = fs::read_to_string(&wat_path).unwrap();

            let dump_path = format!(
                "{}{}",
                conformance_dir,
                wat_path
                    .with_extension("dump")
                    .file_name()
                    .unwrap()
                    .to_str()
                    .unwrap()
                    .to_owned()
            );

            let source = wat_to_dts(wat, &dump_path);
            let actual = source.to_string();

            let expected_output_path = wat_path.with_extension("d.ts");
            let expected = fs::read_to_string(&expected_output_path).unwrap();

            let actual_path = wat_path.with_extension("actual.d.ts");
            fs::write(&actual_path, &actual).unwrap();

            assert_eq!(actual, expected, "{}", file_name);
        }
    }
}
