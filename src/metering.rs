//! Wasmer will let you easily run Wasm module in a Rust host.
//!
//! This example illustrates the basics of using Wasmer metering features:
//!
//!   1. How to enable metering in a module
//!   2. How to meter a specific function call
//!   3. How to make execution fails if cost exceeds a given limit

use crate::wasmer_middleware::{get_remaining_points, Metering, MeteringPoints};
use once_cell::sync::Lazy;
use std::fmt;
use std::sync::atomic::AtomicUsize;
use std::sync::Arc;
use wasmer::sys::EngineBuilder;
use wasmer::wasmparser::Operator;
use wasmer::{imports, wat2wasm, Instance, Module, Store, TypedFunction};
use wasmer::{CompilerConfig, Function};
use wasmer_compiler_cranelift::Cranelift;

// First we need to create an error type that we'll use to signal the end of execution.
#[derive(Debug, Clone, Copy)]
struct ExitCode(u32);

// This type must implement `std::error::Error` so we must also implement `std::fmt::Display` for it.
impl fmt::Display for ExitCode {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{}", self.0)
    }
}

// And then we implement `std::error::Error`.
impl std::error::Error for ExitCode {}

static WAT_FILE: &str = r#"
(module
  (type $t0 (func (param i32)))

  (func $exit (import "env" "exit") (type $t0) (param i32))

  (func $entry (export "entry") (param $input i32) (result i32)
    (local $i i32)
    (local $result i32)

    ;; initialize $i to 0
    (local.set $i (i32.const 0))
    (local.set $result (local.get $input))

    (loop $my_loop
      ;; add one to $i
      local.get $i
      i32.const 1
      i32.add
      local.set $i

      ;; multiply $result by 2
      local.get $result
      i32.const 2
      i32.mul
      local.set $result

      ;; if $i is less than 3 branch to outside the loop
      local.get $i
      i32.const 3
      i32.lt_s
      br_if $my_loop
    )

    local.get $result
  )
)"#;

// create a static counter with Arc
static COUNTER: Lazy<Arc<AtomicUsize>> = Lazy::new(|| Arc::new(AtomicUsize::new(0)));

pub fn meter() -> anyhow::Result<()> {
    // declare the Wasm module.
    let wasm_bytes = match wat2wasm(WAT_FILE.as_bytes()) {
        Ok(wasm_bytes) => wasm_bytes,
        Err(error) => panic!("Failed to convert the WAT to Wasm: {}", error),
    };

    // create a hashtable that keeps track of the cost of each operator
    // let cost_table = RefCell::new(std::collections::HashMap::new());

    // This cost function will be called for each `Operator` encountered during the Wasm module execution.
    // It should return the cost of the operator that it received as it first argument.
    let cost_function = |operator: &Operator| -> u64 {
        let name = format!("{:#?}", operator).split_whitespace().next().unwrap().to_string();
        println!("{name}");

        // increment the static counter
        COUNTER.fetch_add(1, std::sync::atomic::Ordering::SeqCst);

        // *cost_table.borrow_mut().entry(name).or_insert(0) += 1;

        1
    };

    // Now let's create our metering middleware.
    //
    // `Metering` needs to be configured with a limit and a cost function.
    //
    // For each `Operator`, the metering middleware will call the cost function and subtract the cost from the remaining points.
    let metering = Arc::new(Metering::new(1_000, cost_function));
    let mut compiler_config = Cranelift::default();
    compiler_config.push_middleware(metering);

    // Create a Store.
    //
    // We use our previously create compiler configuration with the Universal engine.
    let mut store = Store::new(EngineBuilder::new(compiler_config));

    // Compile the Wasm module.
    let module = Module::new(&store, wasm_bytes)?;

    // Create an empty import object.
    let imports = imports! {
      "env" => {
        "exit" => Function::new_typed(&mut store, |_: i32| {
          println!("Program finished");
          std::process::exit(0)
        }),
      }
    };

    // instantiate the Wasm module.
    let instance = match Instance::new(&mut store, &module, &imports) {
        Ok(instance) => instance,
        Err(error) => panic!("Failed to instantiate the Wasm module: {error}"),
    };

    // We now have an instance ready to be used.
    //
    // Our module exports a single `entry`  function.
    // We want to measure the cost of executing this function.
    let entry: TypedFunction<i32, i32> = instance.exports.get_function("entry")?.typed(&store)?;

    let points = match get_remaining_points(&mut store, &instance) {
        MeteringPoints::Remaining(points) => points,
        MeteringPoints::Exhausted => panic!("Metering points exhausted."),
    };
    println!("points: {}", points);
    // call the `entry` function
    entry.call(&mut store, 2)?;

    let points = match get_remaining_points(&mut store, &instance) {
        MeteringPoints::Remaining(points) => points,
        MeteringPoints::Exhausted => panic!("Metering points exhausted."),
    };
    println!("points: {}", points);
    entry.call(&mut store, 0)?;

    let points = match get_remaining_points(&mut store, &instance) {
        MeteringPoints::Remaining(points) => points,
        MeteringPoints::Exhausted => panic!("Metering points exhausted."),
    };
    println!("points: {}", points);
    let run_func = entry.call(&mut store, 0);
    match run_func {
        Ok(result) => {
            println!("complete.\n{result}");
        }
        // In case of a failure, which we expect, we attempt to downcast the error into the error type that we were expecting.
        Err(e) => match e.downcast::<ExitCode>() {
            // We found the exit code used to terminate execution.
            Ok(exit_code) => {
                println!("Exited early with exit code: {exit_code}");
            }
            Err(e) => {
                panic!("found unknown error:\n`{e}`\nexpected `ErrorCode`");
            }
        },
    }

    println!("Total cost: {}", COUNTER.load(std::sync::atomic::Ordering::SeqCst));

    Ok(())
}
