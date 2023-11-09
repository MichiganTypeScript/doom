extern crate wast;

mod source_code;

use source_code::SourceCode;
use std::fs;
use wast::{
    core::{Export, Func, Global, Instruction, Local, ModuleField, ModuleKind},
    parser,
    token::Index,
    Wat,
};

macro_rules! dbg_dump_file {
    ($($expr:tt)*) => {{
        let dump_file = std::env::current_dir().unwrap().join("src/code.dump");
        let message = format!("{:#?}", ($($expr)*));
        let _ = fs::write(&dump_file, &message);
        eprintln!("{}", message);
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
    ByName(String),
}

fn get_element(collection: &Vec<Option<String>>, access: ElementAccess) -> Option<String> {
    match access {
        ElementAccess::ByName(name) => collection
            .iter()
            .find(|item| item.as_ref() == Some(&name))
            .cloned()
            .flatten(),
        ElementAccess::ByIndex(index) => match collection.get(index) {
            Some(Some(inner_string)) => Some(inner_string.clone()),
            _ => Some(format_index_name(index)),
        },
    }
}

fn handle_instructions(
    source: &mut SourceCode,
    instructions: &[Instruction<'_>],
    locals: &Vec<Option<String>>,
) -> String {
    let mut stack: Vec<String> = Vec::new();

    let mut definition = "".to_string();

    for instruction in instructions.iter() {
        match instruction {
            Instruction::LocalGet(local) => {}
            Instruction::I32Add => {
                source.add_import("hotscript", "Numbers");

                dbg!(locals);

                definition += "Numbers.Add<";
                definition += &get_element(locals, ElementAccess::ByIndex(0)).unwrap();
                definition += ", ";
                definition += &get_element(locals, ElementAccess::ByIndex(1)).unwrap();
                definition += ">"
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
                source.add_import("hotscript", "Call");

                definition += "Call<"; // start the `Call`

                if let Index::Id(id) = id {
                    definition += id.name();
                    definition += "<" // start the call args
                }

                definition += &stack.join(", ");
                definition += ">"; // end the call args

                definition += ">"; // end the `Call`
            }

            _ => {}
        }
    }
    // dbg!(instruction);

    definition
}

fn get_param_name(index: usize, maybe_name: &Option<String>) -> String {
    if let Some(name) = maybe_name {
        name.to_string()
    } else {
        format_index_name(index)
    }
}

fn handle_module_field_func(source: &mut SourceCode, field: &Func) {
    let name = field
        .id
        .map(|id| id.name())
        .unwrap_or_else(|| panic!("need to implement no name funcs"));

    let mut generics = "".to_string();
    let mut definition = "".to_string();
    let exported = false;

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
            generics += "<";
            generics += "\n";
            generics += &param_names
                .iter()
                .enumerate()
                .map(|(index, name)| format!("  {} extends number", get_param_name(index, name)))
                .collect::<Vec<_>>()
                .join(",\n");
            generics += "\n";
            generics += ">";
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

    source.add_type(name, generics, definition, exported);

    // dbg!(func);
}

fn handle_module_field_global(source: &mut SourceCode, field: &Global) {
    // TODO: handle multiple exports for the same definition
    let name = field.exports.names.first().unwrap().to_string();

    let generics = "".to_string();
    let mut definition = "".to_string();
    let exported = true;

    match &field.kind {
        wast::core::GlobalKind::Import(_import) => {}
        wast::core::GlobalKind::Inline(expression) => {
            definition = handle_instructions(source, &expression.instrs, &vec![]);
        }
    }
    source.add_type(name, generics, definition, exported);

    // dbg!(global);
}

fn handle_module_field_export(_source: &mut SourceCode, field: &Export) {
    // dbg!(field);
}

fn handle_module_field(source: &mut SourceCode, field: &ModuleField) {
    match field {
        ModuleField::Func(field) => handle_module_field_func(source, field),
        ModuleField::Global(field) => handle_module_field_global(source, field),
        ModuleField::Export(field) => handle_module_field_export(source, field),

        other => {
            // dbg!(other);
            // panic!("not implemented module field");
        }
    }
}

fn wat_to_dts(wat: String) -> (source_code::SourceCode, bool) {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = &parser::parse::<Wat>(&buf).unwrap();

    let mut source = SourceCode::new();

    if let wast::Wat::Module(ref module) = parsed_wat {
        dbg_dump_file!(module);

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

    (source, true)
}

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();
    let output = wat_to_dts(wat).0.to_string();
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
            if entry.path().is_file() {
                let wat_path = entry.path();
                let file_is_wat = wat_path
                    .file_name()
                    .unwrap()
                    .to_string_lossy()
                    .ends_with(".wat");

                if file_is_wat {
                    let wat = fs::read_to_string(&wat_path).unwrap();
                    let (source, _) = wat_to_dts(wat);
                    let actual = source.to_string();

                    let expected_output_path = wat_path.with_extension("d.ts");
                    let expected = fs::read_to_string(&expected_output_path).unwrap();

                    assert_eq!(actual, expected);
                }
            }
        }
    }
}
