extern crate wast;

mod handle_instructions;
mod handle_module;
mod metering;
mod source_file;
mod stats;
mod utils;
mod wat_to_dts;

use std::{
    ffi::OsStr,
    fs::{self, DirEntry},
    path::{Path, PathBuf},
    process::Command,
};

use self::source_file::SourceFile;
use wat_to_dts::wat_to_dts;

pub fn skip_list() -> Vec<&'static str> {
    vec![
        // "conway", //
    ]
}

pub fn focus_list() -> Vec<&'static str> {
    vec![
        // "add-middle", //
                      // "if-else-nested",
                      // "if-else",
    ]
}

/// skip the file if anything in the skip list matches the given file name
pub fn should_skip(file_name: &str) -> bool {
    skip_list().iter().any(|&skip| file_name == skip)
}

/// the file is focused if anything in the focus list matches the given file name
pub fn is_focused(file_name: &str) -> bool {
    focus_list().iter().any(|&focus| file_name == focus)
}

/// this function consults skip_list and focus_list to determine if a test should be run
pub fn should_run(dir_entry: &DirEntry) -> bool {
    let path = dir_entry.path().with_extension("");
    let file_name = path.file_name().and_then(OsStr::to_str).expect("invalid file name");

    // focusing takes precedence over skipping
    if is_focused(file_name) {
        return true;
    }

    if !focus_list().is_empty() {
        return false;
    }

    if should_skip(file_name) {
        return false;
    }

    true
}

pub fn ensure_version(cmd: &str, expected: &str) {
    let output = Command::new(cmd)
        .arg("--version")
        .output()
        .unwrap_or_else(|_| panic!("failed to execute version command for {}", &cmd));
    let actual = std::str::from_utf8(&output.stdout).unwrap_or_else(|_| panic!("Error decoding stdout"));
    let error = format!("expected {} to be version {}, got {}", cmd, expected, actual);
    assert!(actual.contains(expected), "{error}");
}

pub fn generate_wat_from_wasm(dir_entry: &DirEntry) {
    let wasm_input = dir_entry.path().with_extension("wasm");

    // println!("generating wat from wasm: {:?}", &wasm_input);

    let cmd = "wasm2wat";
    ensure_version(cmd, "1.0.32");

    // convert the .wat file to a .wasm file (also validates the .wat)
    let output = Command::new(cmd)
        .arg(&wasm_input)
        .arg("--enable-code-metadata")
        .arg("--inline-exports")
        .arg("--inline-imports")
        .arg("--disable-reference-types")
        .arg("--generate-names")
        .arg("--fold-exprs")
        .args(["--output", &wasm_input.with_extension("wat").to_string_lossy()]) // output target
        .output()
        .unwrap_or_else(|_| panic!("failed to execute {}", cmd));

    if !output.status.success() {
        // Print the standard error output
        let stderr = std::str::from_utf8(&output.stderr).unwrap_or("Error decoding stderr");
        println!("{cmd} failed for {:?}: {}", wasm_input.file_name(), stderr);
        panic!("{cmd} failed");
    }
}

pub fn get_wat_files() -> Vec<DirEntry> {
    let from_wat = fs::read_dir("./packages/conformance-tests/from-wat/").unwrap().flatten();
    let single_wat = fs::read_dir("./packages/conformance-tests/from-wat-single/").unwrap().flatten();

    let files = from_wat.chain(single_wat);

    files
        .filter_map(|dir_entry| {
            let path = dir_entry.path();
            // dbg!(&path);

            if !path.is_file() {
                return None;
            }

            if path.extension().and_then(OsStr::to_str) != Some("wat") {
                return None;
            }

            if !should_run(&dir_entry) {
                // println!("skipping: {:?}", dir_entry.path());
                return None;
            }

            Some(dir_entry)
        })
        .collect()
}

pub fn get_c_files() -> Vec<DirEntry> {
    fs::read_dir("./packages/conformance-tests/from-c/")
        .unwrap()
        .flatten()
        .filter_map(|dir_entry| {
            let path = dir_entry.path();
            // dbg!(&path);

            if !path.is_file() {
                return None;
            }

            if path.extension().and_then(OsStr::to_str) != Some("c") {
                return None;
            }

            if path.file_name().unwrap().to_str().unwrap().contains(".test.c") {
                return None;
            }

            if !should_run(&dir_entry) {
                // println!("skipping: {:?}", dir_entry.path());
                return None;
            }

            Some(dir_entry)
        })
        .collect()
}

pub fn generate_wasm_from_wat(wat_input: &DirEntry) {
    // println!("generating wasm from wat: {:?}", &wat_input.path());

    let cmd = "wat2wasm";
    ensure_version(cmd, "1.0.32");

    // convert the .wat file to a .wasm file (also validates the .wat)
    let output = Command::new(cmd)
        .arg(&wat_input.path())
        .args(["--output", &wat_input.path().with_extension("wasm").to_string_lossy()])
        .output()
        .unwrap_or_else(|_| panic!("failed to execute {}", cmd));

    if !output.status.success() {
        // Print the standard error output
        let stderr = std::str::from_utf8(&output.stderr).unwrap_or("Error decoding stderr");
        println!("{cmd} failed for {:?}: {}", wat_input.path().file_name(), stderr);
        panic!("{cmd} failed");
    }
}

pub fn parse_wat_and_dump(dir_entry: &DirEntry) -> SourceFile {
    let wat_file = dir_entry.path().with_extension("wat");
    // println!("parsing wat and dumping: {:?}", &wat_file);

    let wat = fs::read_to_string(wat_file).unwrap();
    let dump_path = dir_entry.path().with_extension("dump").to_str().unwrap().to_owned();

    wat_to_dts(wat, &dump_path)
}

pub fn create_ts(source_file: &SourceFile, dir_entry: &DirEntry) {
    let path = dir_entry.path().with_extension("ts");
    fs::write(path, source_file.to_string()).unwrap();
}

pub fn generate_wasm_from_c(c_input: &DirEntry) {
    // println!("generating wasm from c: {:?}", &c_input.path());

    let cmd = "emcc";
    ensure_version(cmd, "3.1.6");

    // convert the .wat file to a .wasm file (also validates the .wat)
    let output = Command::new(cmd)
        .arg(&c_input.path())
        .args(["-o", &c_input.path().with_extension("wasm").to_string_lossy()]) // output target
        .arg("-g") // preserve debug information
        .arg("-O0") // no optimizations
        .args(["-s", "STANDALONE_WASM"]) // setting
        .arg("--no-entry") // no entry point (we disregard the main function and use the `entry` function instead)
        .output()
        .unwrap_or_else(|_| panic!("failed to execute {}", cmd));

    if !output.status.success() {
        // Print the standard error output
        let stderr = std::str::from_utf8(&output.stderr).unwrap_or("Error decoding stderr");
        println!("{cmd} failed for {:?}: {}", c_input.path().file_name(), stderr);
        panic!("{cmd} failed");
    }
}

fn main() {
    if "f".len() == 1 {
        let current_dir = std::env::current_dir().unwrap();
        let doom_dir = "packages/playground/doom-helion/";
        // let d = read_dir(doom_dir).unwrap().flatten().next().unwrap();
        // generate_wat_from_wasm(&d);
        let wat_file = Path::new(&doom_dir).join("doom.wat");
        let wat_path = current_dir.join(wat_file);
        let wat = fs::read_to_string(wat_path).unwrap();
        let output = wat_to_dts(wat, PathBuf::from(doom_dir).join("doom.dump").to_str().unwrap()).to_string();
        fs::write(PathBuf::from(doom_dir).join("doom.ts"), output).unwrap();
        println!("I did the needful, boss.");
        return;
    }
    match metering::meter() {
        Ok(_) => {}
        Err(e) => {
            eprintln!("error: {}", e);
            std::process::exit(1);
        }
    };
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn run_conformance_tests() {
        /*

        Here's how this works.  We can take two inputs.  One is a .wat file from the `test/from-wat` directory, and the other is a .c file from the `test/from-c` directory.  If it starts as a C file, we generate a .wat from that.  In both cases we generate `.wasm` files.  The `.dump` file is a debug representation of the `.wat` file's parsed contents.  We then generate a `.ts` file from our program.

        ## from-wat
            1. read .wat
            2. generate and write .wasm from .wat with wat2wasm

        ## from-c
            1. read .c
            2. generate and write .wasm from the .c with emcc
            3. generate and write .wat with wasm2wat

        ## point of convergence
            - parse .wat and write .dump
            - generate and write .ts file

        ## runtime tests
            runtime tests are done from javascript, so they need to be run with `pnpm test` in a separate step

        */

        let from_wat = get_wat_files();
        from_wat.iter().for_each(generate_wasm_from_wat);

        let from_c = get_c_files();
        from_c.iter().for_each(generate_wasm_from_c);
        from_c.iter().for_each(generate_wat_from_wasm);

        let all_files: Vec<_> = from_wat.iter().chain(from_c.iter()).collect();

        for dir_entry in all_files {
            let source_file = parse_wat_and_dump(dir_entry);
            create_ts(&source_file, dir_entry);
        }
    }
}
