extern crate wast;

mod source_code;

use source_code::SourceCode;
use std::fs;
use wast::{
    core::{Instruction, ModuleField, ModuleKind},
    parser,
    token::Index,
    Wat,
};

const OUTPUT_PATH: &str = "src/output.d.ts";

fn clear_output_file() {
    fs::write(OUTPUT_PATH, "").unwrap();
}

fn wat_to_dts(wat: String) -> String {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = parser::parse::<Wat>(&buf).unwrap();

    let mut source = SourceCode::new();

    if let wast::Wat::Module(module) = parsed_wat {
        match module.kind {
            ModuleKind::Binary(_) => {
                panic!("WebAssembly Binary is not supported.  Only WebAssembly Text.");
            }
            ModuleKind::Text(fields) => {
                for field in fields {
                    match field {
                        ModuleField::Func(func) => {
                            let mut name = "asdf";
                            if let Some(id) = func.id {
                                name = id.name();
                            }

                            let mut generics = "".to_string();
                            let mut definition = "".to_string();
                            let exported = false;

                            let mut param_names: Vec<String> = Vec::new();
                            if let Some(ref func_type) = func.ty.inline {
                                for (param_id, _, _) in func_type.params.iter() {
                                    if let Some(p) = param_id {
                                        param_names.push(format!("${}", p.name()));
                                    }
                                }

                                if !func_type.params.is_empty() {
                                    generics += "<";
                                    generics += "\n";
                                    generics += &param_names
                                        .iter()
                                        .map(|name| format!("  {} extends number", name))
                                        .collect::<Vec<_>>()
                                        .join(",\n");
                                    generics += "\n";
                                    generics += ">";
                                }

                                // dbg!(func_types);
                            }

                            match func.kind {
                                wast::core::FuncKind::Import(_imp) => {}
                                wast::core::FuncKind::Inline {
                                    locals: _,
                                    expression,
                                } => {
                                    for instruction in expression.instrs.iter() {
                                        match instruction {
                                            Instruction::I32Add => {
                                                source.add_import("hotscript", "Numbers");

                                                definition += "Numbers.Add<";
                                                definition += param_names.get(0).unwrap();
                                                definition += ", ";
                                                definition += param_names.get(1).unwrap();
                                                definition += ">"
                                            }
                                            Instruction::ArrayCopy(_) => {}
                                            _ => {}
                                        }
                                        // dbg!(instruction);
                                    }
                                }
                            }

                            source.add_type(name, generics, definition, exported);

                            // dbg!(func);
                        }
                        ModuleField::Global(global) => {
                            // TODO: handle multiple exports for the same name
                            let name = global.exports.names.first().unwrap().to_string();

                            let generics = "".to_string();
                            let mut definition = "".to_string();
                            let exported = true;

                            match global.kind {
                                wast::core::GlobalKind::Import(_import) => {}
                                wast::core::GlobalKind::Inline(expression) => {
                                    let mut args: Vec<String> = Vec::new();

                                    for instruction in expression.instrs.iter() {
                                        match instruction {
                                            Instruction::I32Const(i32_const) => {
                                                args.push(i32_const.to_string());
                                            }
                                            Instruction::Call(id) => {
                                                source.add_import("hotscript", "Call");

                                                definition += "Call<";

                                                if let Index::Id(id) = id {
                                                    definition += id.name();
                                                    definition += "<"
                                                }

                                                definition += &args.join(", ");
                                                definition += ">"; // end the call args

                                                definition += ">"; // end the `Call`
                                            }
                                            _ => {}
                                        }
                                    }
                                }
                            }

                            source.add_type(name, generics, definition, exported);

                            // dbg!(global);
                        }
                        ModuleField::Export(export) => {
                            dbg!(export);
                        }
                        other => {
                            dbg!(other);
                        }
                    }
                }
            }
        }

        // dbg!(module);
    }

    source.to_string()
}

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();
    let output = wat_to_dts(wat);
    clear_output_file();
    fs::write(OUTPUT_PATH, output).unwrap();
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
                    let actual = wat_to_dts(wat);

                    let expected_output_path = wat_path.with_extension("d.ts");
                    let expected = fs::read_to_string(&expected_output_path).unwrap();

                    assert_eq!(actual, expected);
                }
            }
        }
    }
}
