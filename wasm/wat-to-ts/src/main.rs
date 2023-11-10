extern crate wast;

mod source_code;

use source_code::SourceCode;
use std::{fmt, fs, vec};
use wast::{
    core::{Export, Func, Global, Instruction, ModuleField, ModuleKind},
    parser,
    token::Index,
    Wat,
};

#[macro_use]
extern crate pretty_assertions;

macro_rules! dbg_dump_file {
    ($expr:expr, $filename:expr) => {{
        let mut file_path = std::env::current_dir().unwrap();
        file_path.push($filename);

        let file_source = format!("{:#?}", $expr);
        let _ = fs::write(&file_path, &file_source);
        // println!("{}", $filename);
        // println!("{}", file_source);
    }};
}

// struct InstructionContext<'a> {
//     locals: Vec<Local<'a>>,
// }

// impl<'a> InstructionContext<'a> {
//     fn get(&self, )
// }

fn format_index_name(index: usize) -> String {
    format!("i_{index}")
}

fn format_call_id<I: Into<String>>(id: I) -> String {
    format!("${}", id.into())
}

enum ElementAccess {
    ByIndex(usize),
    // ByName(String),
}

fn get_element(collection: &[Option<String>], access: ElementAccess) -> Option<String> {
    match access {
        // ElementAccess::ByName(name) => collection
        //     .iter()
        //     .find(|item| item.as_ref() == Some(&name))
        //     .cloned()
        //     .flatten(),
        ElementAccess::ByIndex(index) => match collection.get(index) {
            Some(Some(inner_string)) => Some(inner_string.clone()),
            _ => Some(format_index_name(index)),
        },
    }
}

#[derive(Debug)]
pub struct SourcePrinter {
    pub lines: Vec<(usize, String)>,
}

impl SourcePrinter {
    pub fn new() -> Self {
        SourcePrinter { lines: Vec::new() }
    }

    pub fn from_string<C: Into<String>>(content: C) -> Self {
        SourcePrinter {
            lines: content
                .into()
                .lines()
                .map(|line| (1, line.to_string()))
                .collect(),
        }
    }

    pub fn line<C: Into<String>>(&mut self, indent: usize, content: C) {
        self.lines.push((indent, content.into()));
    }

    pub fn lines(&mut self, lines: &mut Vec<(usize, String)>) {
        self.lines.append(lines);
    }

    pub fn clear(&mut self) {
        *self = SourcePrinter::new();
    }
}

impl Default for SourcePrinter {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for SourcePrinter {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (indent, line) in &self.lines {
            let indentation = "  ".repeat(*indent);
            writeln!(f, "{indentation}{line}")?;
        }
        Ok(())
    }
}

fn handle_instructions(source: &mut SourceCode, instructions: &[Instruction<'_>]) -> String {
    let mut stack: Vec<SourcePrinter> = Vec::new();

    // let mut source_printer = SourcePrinter::new();

    for instruction in instructions.iter() {
        dbg!(&stack);
        dbg!(&instruction);
        // dbg!(&source_printer);

        match instruction {
            Instruction::LocalGet(local) => {
                let value = match local {
                    Index::Id(id) => "$".to_string() + id.name(),
                    Index::Num(num, _) => format_index_name(*num as usize),
                };
                stack.push(SourcePrinter::from_string(value));
            }
            Instruction::If(_block) => {
                let mut condition_pop = stack.pop().unwrap();

                // Get a mutable reference to the last line
                if let Some((_, last)) = condition_pop.lines.last_mut() {
                    *last += " extends true";
                } else {
                    panic!("can't get final thing")
                }

                stack.push(condition_pop);
            }
            Instruction::Else(_) => {
                let mut then_side_pop = stack.pop().unwrap();
                if let Some((_, first)) = then_side_pop.lines.first_mut() {
                    *first = "? ".to_string() + first;
                } else {
                    panic!("can't get then side pop")
                }
                stack.push(then_side_pop);
            }
            Instruction::End(_) => {
                let mut else_side = stack.pop().unwrap();
                if let Some((_, first)) = else_side.lines.first_mut() {
                    *first = ": ".to_string() + first;
                } else {
                    panic!("can't get else side pop")
                }

                let mut then_side = stack.pop().unwrap();
                let mut condition = stack.pop().unwrap();

                condition.lines(&mut then_side.lines);
                condition.lines(&mut else_side.lines);

                stack.push(condition);
            }
            Instruction::I32Add => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                // let lhs = &get_element(locals, ElementAccess::ByIndex(0)).unwrap();
                // let rhs = &get_element(locals, ElementAccess::ByIndex(1)).unwrap();

                let rhs = stack.pop().unwrap().lines;
                let mut lhs = stack.pop().unwrap().lines;

                let mut source_printer = SourcePrinter::new();

                let base_indent = lhs.first().unwrap().0;
                source_printer.line(base_indent, "Call<Numbers.Add<");

                if let Some((_, line)) = lhs.last_mut() {
                    // add a comma to separate the argument
                    *line += ",";
                } else {
                    panic!("Can't add a comma because something went wrong with lhs");
                }
                for l in &lhs {
                    source_printer.line(l.0 + 1, &l.1);
                }

                for r in rhs {
                    source_printer.line(r.0 + 1, r.1.to_string());
                }
                source_printer.line(base_indent, ">>");

                stack.push(source_printer);
            }
            Instruction::I32GeS => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                let rhs = &stack.pop().unwrap().lines;
                let lhs = &stack.pop().unwrap().lines;

                let indent = rhs.first().unwrap().0;

                let mut source_printer = SourcePrinter::new();

                source_printer.line(indent, "Call<Numbers.GreaterThanOrEqual<");

                for l in lhs {
                    source_printer.line(indent + 1, format!("{},", l.1));
                }
                for r in rhs {
                    source_printer.line(indent + 1, r.1.to_string());
                }

                source_printer.line(indent, ">>");
                stack.push(source_printer);
            }
            Instruction::F32Const(num) => {
                stack.push(SourcePrinter::from_string(format!("{:?}", num)));
            }
            Instruction::F64Const(num) => {
                stack.push(SourcePrinter::from_string(format!("{:?}", num)));
            }
            Instruction::I32Const(num) => {
                stack.push(SourcePrinter::from_string(num.to_string()));
            }
            Instruction::I64Const(num) => {
                stack.push(SourcePrinter::from_string(num.to_string()));
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
                    let mut source_printer = SourcePrinter::new();

                    source_printer.line(indent, format!("{print_id}<"));

                    let mut temp = vec![];
                    for (index, _) in td.generics.iter().enumerate() {
                        let sp = stack.pop().unwrap();
                        let mut lines: Vec<(usize, String)> = sp
                            .lines
                            .iter()
                            .map(|line| (line.0 + 1, line.1.clone()))
                            .collect();

                        // we're going to reverse the temp list after this loop block, so what this is effectively saying is "add a comma at the last line of all expressions except the last one" because (unfortunately) trailing commas in TS arguments are not allowed).
                        if index != 0 {
                            let last_line = lines.last_mut().unwrap();
                            last_line.1 = format!("{},", last_line.1);
                        }
                        temp.push(lines);
                    }

                    temp.reverse();
                    for mut t in temp {
                        source_printer.lines(&mut t);
                    }

                    source_printer.line(indent, ">");
                    stack.push(source_printer);
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

    let expr = stack.pop().unwrap();
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
            // panic!("not implemented module field");
        }
    }
}

fn wat_to_dts(wat: String, dump_path: &str) -> SourceCode {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = &parser::parse::<Wat>(&buf).unwrap();

    let mut source = SourceCode::new();

    if let wast::Wat::Module(ref module) = parsed_wat {
        dbg_dump_file!(module, dump_path);

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
