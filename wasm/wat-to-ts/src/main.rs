extern crate wast;

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

fn doit(wat: String) -> String {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = parser::parse::<Wat>(&buf).unwrap();

    let mut output = String::from("");
    // temporary, but doesn't hurt anyone
    let imports = "import { Numbers, Call } from 'hotscript';";
    output += imports;
    output += "\n";

    if let wast::Wat::Module(module) = parsed_wat {
        if let ModuleKind::Text(fields) = module.kind {
            output += "\n";
            for field in fields {
                match field {
                    ModuleField::Func(func) => {
                        if let Some(id) = func.id {
                            output += "type ";
                            output += id.name();
                        }

                        let mut param_names: Vec<String> = Vec::new();
                        if let Some(ref func_type) = func.ty.inline {
                            for (param_id, _, _) in func_type.params.iter() {
                                if let Some(p) = param_id {
                                    param_names.push(format!("${}", p.name()));
                                }
                            }

                            if !func_type.params.is_empty() {
                                output += "<";
                                output += "\n";
                                output += &param_names
                                    .iter()
                                    .map(|name| format!("  {} extends number", name))
                                    .collect::<Vec<_>>()
                                    .join(",\n");
                                output += "\n";
                                output += ">";
                            }

                            output += " = ";
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
                                            output += "Numbers.Add<";
                                            output += param_names.get(0).unwrap();
                                            output += ", ";
                                            output += param_names.get(1).unwrap();
                                            output += ">;"
                                        }
                                        Instruction::ArrayCopy(_) => {}
                                        _ => {}
                                    }
                                    // dbg!(instruction);
                                }
                            }
                        }
                        output += "\n";
                        // dbg!(func);
                    }
                    ModuleField::Global(global) => {
                        output += "\n";
                        output += "export type ";

                        // TODO: handle multiple exports for the same name
                        let id = global.exports.names.first().unwrap();
                        output += id;
                        output += " = ";

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
                                            output += "Call<";

                                            if let Index::Id(id) = id {
                                                output += id.name();
                                                output += "<"
                                            }

                                            output += &args.join(", ");
                                            output += ">"; // end the call args

                                            output += ">"; // end the `Call`
                                        }
                                        _ => {}
                                    }
                                }
                            }
                        }

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

        // dbg!(module);
    }
    output
}

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();

    println!("{wat}");

    clear_output_file();

    let output = doit(wat);

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
                let test_file_path = entry.path();
                let test_file_name = test_file_path.file_name().unwrap();

                if test_file_name.to_string_lossy().ends_with(".wat") {
                    let expected_output_path = test_file_path.with_extension("d.ts");

                    let input_data = fs::read_to_string(&test_file_path).unwrap();

                    let actual_output_data = doit(input_data);

                    let expected_output_data = fs::read_to_string(&expected_output_path).unwrap();

                    assert_eq!(actual_output_data, expected_output_data);
                }
            }
        }
    }
}
