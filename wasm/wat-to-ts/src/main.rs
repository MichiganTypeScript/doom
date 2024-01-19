extern crate wast;

mod fragment;
mod handle_instructions;
mod handle_module;
mod source_file;
mod statement;
mod utils;
mod wat_to_dts;

use statement::Statement;
use std::fs;
use wat_to_dts::wat_to_dts;

#[macro_use]
extern crate pretty_assertions;

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/debug/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();
    let output = wat_to_dts(wat, "src/debug/code.dump").to_string();
    fs::write("src/debug/code.d.ts", output).unwrap();
}

#[cfg(test)]
mod tests {
    use std::{fs, process::Command};

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

            // focus
            // if file_name != "local-set.wat" {
            //     continue;
            // }

            // to skip files from the test suite, add them here
            if [
                "andarist", // andarist is blocked by needing a target implementation
                "br-if",    // this one blocked by sheer force of will
            ]
            .iter()
            .any(|&skip| file_name == format!("{skip}.wat"))
            {
                continue;
            }

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

            // convert the .wat file to a .wasm file (also validates the .wat)
            let output = Command::new("wat2wasm")
                .arg(&wat_path)
                .arg("--output")
                .arg(wat_path.with_extension("wasm"))
                .output()
                .expect("failed to execute wat2wasm");

            if !output.status.success() {
                // Print the standard error output
                let stderr = std::str::from_utf8(&output.stderr).unwrap_or("Error decoding stderr");
                println!("wat2wasm failed for {}: {}", file_name, stderr);
                panic!("wat2wasm conversion failed");
            }

            println!("running: {}", &file_name);

            let wat = fs::read_to_string(&wat_path).unwrap();
            let source = wat_to_dts(wat, &dump_path);
            let actual = source.to_string();

            let expected_output_path = wat_path.with_extension("expected.d.ts");
            let expected = fs::read_to_string(&expected_output_path).unwrap();

            let actual_path = wat_path.with_extension("actual.d.ts");
            fs::write(&actual_path, &actual).unwrap();

            assert_eq!(actual, expected, "{}", file_name);
        }
    }
}
