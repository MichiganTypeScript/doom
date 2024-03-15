//! Wasmer will let you easily run Wasm module in a Rust host.
//!
//! This example illustrates the basics of using Wasmer metering features:
//!
//!   1. How to enable metering in a module
//!   2. How to meter a specific function call
//!   3. How to make execution fails if cost exceeds a given limit

use anyhow::bail;
use std::sync::Arc;
use wasmer::sys::EngineBuilder;
use wasmer::wasmparser::Operator;
use wasmer::CompilerConfig;
use wasmer::{imports, wat2wasm, Instance, Module, Store, TypedFunction};
use wasmer_compiler_cranelift::Cranelift;
use wasmer_middlewares::{
    metering::{get_remaining_points, set_remaining_points, MeteringPoints},
    Metering,
};

static WAT_FILE: &str = r#"
(module
  (func $entry (export "entry") (param $value i32) (result i32)
    local.get $value
    i32.const 1
    i32.add
  )
)"#;

// (func $exit (import "env" "exit") (type $t0) (param i32))

pub fn meter() -> anyhow::Result<()> {
    // Let's declare the Wasm module.
    //
    // We are using the text representation of the module here but you can also load `.wasm`
    // files using the `include_bytes!` macro.
    let wasm_bytes = wat2wasm(WAT_FILE.as_bytes())?;

    // create a hashtable that keeps track of the cost of each operator
    // let mut cost_table = std::collections::HashMap::new();
    // let cost_table_cell = Cell::new(cost_table);

    // Let's define our cost function.
    //
    // This function will be called for each `Operator` encountered during
    // the Wasm module execution. It should return the cost of the operator
    // that it received as it first argument.
    let cost_function = |operator: &Operator| -> u64 {
        let mut name = "";
        match operator {
            Operator::LocalGet { .. } => {
                name = "LocalGet";
            }
            Operator::I32Const { .. } => {
                name = "I32Const";
            }
            Operator::I32Add { .. } => {
                name = "I32Add";
            }
            _ => {}
        }

        // let mut cost_table = cost_table_cell.take();
        // *cost_table.entry(name).or_insert(0) += 1;
        // cost_table_cell.set(cost_table);
        println!("{name}");

        1
    };

    // Now let's create our metering middleware.
    //
    // `Metering` needs to be configured with a limit and a cost function.
    //
    // For each `Operator`, the metering middleware will call the cost
    // function and subtract the cost from the remaining points.
    let metering = Arc::new(Metering::new(10, cost_function));
    let mut compiler_config = Cranelift::default();
    compiler_config.push_middleware(metering);

    // Create a Store.
    //
    // We use our previously create compiler configuration
    // with the Universal engine.
    let mut store = Store::new(EngineBuilder::new(compiler_config));

    // Compile the Wasm module.
    let module = Module::new(&store, wasm_bytes)?;

    // Create an empty import object.
    let import_object = imports! {};

    // instantiate the Wasm module.
    let instance = Instance::new(&mut store, &module, &import_object)?;

    // We now have an instance ready to be used.
    //
    // Our module exports a single `entry`  function. We want to
    // measure the cost of executing this function.
    let entry: TypedFunction<i32, i32> = instance.exports.get_function("entry")?.typed(&store)?;

    println!("Calling `entry` function once...");
    entry.call(&mut store, 1)?;

    // As you can see here, after the first call we have 6 remaining points.
    //
    // This is correct, here are the details of how it has been computed:
    // * `local.get $value` is a `Operator::LocalGet` which costs 1 point;
    // * `i32.const` is a `Operator::I32Const` which costs 1 point;
    // * `i32.add` is a `Operator::I32Add` which costs 2 points.
    let remaining_points_after_first_call = get_remaining_points(&mut store, &instance);
    assert_eq!(remaining_points_after_first_call, MeteringPoints::Remaining(6));

    println!("Remaining points after the first call: {:?}", remaining_points_after_first_call);

    println!("Calling `entry` function twice...");
    entry.call(&mut store, 1)?;

    // We spent 4 more points with the second call.
    // We have 2 remaining points.
    let remaining_points_after_second_call = get_remaining_points(&mut store, &instance);
    assert_eq!(remaining_points_after_second_call, MeteringPoints::Remaining(2));

    println!("Remaining points after the second call: {:?}", remaining_points_after_second_call);

    // Because calling our `entry` function consumes 4 points,
    // calling it a third time will fail: we already consume 8
    // points, there are only two remaining.
    println!("Calling `entry` function a third time...");
    match entry.call(&mut store, 1) {
        Ok(result) => {
            bail!("Expected failure while calling `entry`, found: {}", result);
        }
        Err(_) => {
            println!("Calling `entry` failed.");

            // Because the last needed more than the remaining points, we should have an error.
            let remaining_points = get_remaining_points(&mut store, &instance);

            match remaining_points {
                MeteringPoints::Remaining(..) => {
                    bail!("No metering error: there are remaining points")
                }
                MeteringPoints::Exhausted => println!("Not enough points remaining"),
            }
        }
    }

    // Now let's see how we can set a new limit...
    println!("Set new remaining points to 10");
    let new_limit = 10;
    set_remaining_points(&mut store, &instance, new_limit);

    let remaining_points = get_remaining_points(&mut store, &instance);
    assert_eq!(remaining_points, MeteringPoints::Remaining(new_limit));

    println!("Remaining points: {:?}", remaining_points);

    Ok(())
}
