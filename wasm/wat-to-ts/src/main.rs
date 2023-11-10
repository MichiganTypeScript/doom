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

pub struct SourcePrinter {
    indent_level: usize,
    indent: String,
    lines: Vec<String>,
}

impl SourcePrinter {
    pub fn new() -> Self {
        SourcePrinter {
            indent_level: 1,
            indent: String::from("  "), // 2 spaces for each level
            lines: Vec::new(),
        }
    }

    pub fn line(&mut self, content: &str) {
        let indentation = self.indent.repeat(self.indent_level);
        let indented_line = format!("{indentation}{content}");
        self.lines.push(indented_line);
    }

    pub fn increase_indent(&mut self) {
        self.indent_level += 1;
    }

    pub fn decrease_indent(&mut self) {
        if self.indent_level > 0 {
            self.indent_level -= 1;
        }
    }

    pub fn get_lines(&self) -> Vec<String> {
        self.lines.clone()
    }
}

impl Default for SourcePrinter {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for SourcePrinter {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for line in &self.lines {
            writeln!(f, "{}", line)?;
        }
        Ok(())
    }
}

fn handle_instructions(
    source: &mut SourceCode,
    instructions: &[Instruction<'_>],
    locals: &[Option<String>],
) -> String {
    let mut stack: Vec<String> = Vec::new();

    let mut definition = "".to_string();

    let mut source_printer = SourcePrinter::new();

    let mut if_context = String::from("");

    for instruction in instructions.iter() {
        match instruction {
            Instruction::LocalGet(local) => match local {
                Index::Id(id) => {
                    stack.push(id.name().to_string());
                }
                Index::Num(num, _) => {
                    stack.push(format_index_name(*num as usize));
                }
            },
            Instruction::If(_block) => {
                if_context += " extends true";
                if_context += "\n";
            }
            Instruction::Else(_) => {
                let then_side = stack.pop().unwrap();
                if_context += format!("\n? {then_side}").as_str();
            }
            Instruction::End(_) => {
                let else_side = stack.pop().unwrap();
                if_context += format!("\n: {else_side}").as_str();
                definition += &if_context;
                if_context = String::from("");
            }
            Instruction::I32Add => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");
                // dbg!(locals);

                let lhs = &get_element(locals, ElementAccess::ByIndex(0)).unwrap();
                let rhs = &get_element(locals, ElementAccess::ByIndex(1)).unwrap();

                source_printer.line("Call<Numbers.Add<");
                source_printer.increase_indent();
                source_printer.line(format!("{lhs},").as_str());
                source_printer.line(rhs);
                source_printer.decrease_indent();
                source_printer.line(">>");
            }
            Instruction::I32GeS => {
                source.add_import("hotscript", "Call");
                source.add_import("hotscript", "Numbers");

                let rhs = &stack.pop().unwrap();
                let lhs = &stack.pop().unwrap();

                source_printer.line("Call<Numbers.GreaterThanOrEqual<");
                source_printer.increase_indent();
                source_printer.line(format!("{lhs},").as_str());
                source_printer.line(rhs);
                source_printer.decrease_indent();
                source_printer.line(">>");
            }
            Instruction::F32Const(num) => {
                stack.push(format!("{:?}", num));
            }
            Instruction::F64Const(num) => {
                stack.push(format!("{:?}", num));
            }
            Instruction::I32Const(num) => {
                stack.push(num.to_string());
            }
            Instruction::I64Const(num) => {
                stack.push(num.to_string());
            }
            Instruction::Call(id) => {
                let mut definition = "".to_string();
                if let Index::Id(id) = id {
                    definition += id.name();
                    definition += "<" // start the call args
                }

                definition += &stack.join(", ");
                definition += ">"; // end the call args

                source_printer.line(&definition);
            }

            _ => {
                panic!("not implemented instruction {:#?}", instruction);
            }
        }
    }
    // dbg!(instruction);

    source_printer.to_string()
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
            definition = handle_instructions(source, &expression.instrs, &param_names);
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
            definition = handle_instructions(source, &expression.instrs, &[]);
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
