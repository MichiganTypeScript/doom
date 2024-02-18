use crate::source_file::{ModuleType, SourceFile};
use crate::utils::format_id;
use crate::{handle_instructions::handle_func, utils::format_val_type};
use std::collections::HashMap;
use std::str;
use wast::core::{DataVal, Func, Global, GlobalKind, Instruction, Memory, MemoryKind, MemoryType, ModuleField};
use wast::token::Index;

fn handle_module_field_func(source: &SourceFile, func: &Func) {
    source.add_import("wasm-to-typescript-types", "Func");
    source.add_import("wasm-to-typescript-types", "runProgram");

    let name = "$".to_string()
        + func
            .id
            .unwrap_or_else(|| panic!("need to implement no name funcs but it looks like I can skirt by without having to do any of it"))
            .name();

    if name == "$entry" {
        source.set_args(String::from("[]"));
    }

    let params_and_result: String = if func.ty.inline.clone().is_some() {
        func.ty
            .inline
            .clone()
            .map(|function_type| {
                let params_and_types = function_type.params.iter().map(|(id, _, val_type)| {
                    let id = id.expect("params must have an id").name();
                    (format!("'${id}'"), format_val_type(val_type))
                });

                let params = &params_and_types.clone().map(|(id, _)| id.clone()).collect::<Vec<String>>().join(", ");
                let params_types = &params_and_types.map(|(_, val_type)| val_type.clone()).collect::<Vec<String>>().join(", ");

                if name == "$entry" {
                    let internals = (0..function_type.params.len()).map(|_| "number").collect::<Vec<&str>>().join(", ");
                    source.set_args(format!("[{internals}]"));
                }

                let result = function_type
                    .results
                    .first()
                    .map(|val_type| format_val_type(val_type))
                    .unwrap_or("never".to_string())
                    .to_string();

                format!("  params: [{params}];\n  paramsTypes: [{params_types}];\n  result: {result};")
            })
            .expect("better have an inline type because we already checked")
    } else if func.ty.index.is_some() {
        let id = match func.ty.index {
            Some(Index::Id(id)) => format_id(&id),
            _ => panic!("only id indexes supported for type use"),
        };
        let ModuleType { params, result } = source.get_module_type(&id).expect("looking for a module type that doesn't exist");
        let p = params.join(", ");

        format!("  params: [];\n  paramsTypes: [{p}];\n  result: {result};")
    } else {
        String::from("  params: [];\n  paramsTypes: [];\n  result: never;")
    };

    let instructions_and_locals = handle_func(func);

    let output = format!(
        "type {name} = Satisfies<Func, {{
  kind: 'func';
{params_and_result}
{instructions_and_locals}
}}>
"
    );

    source.add_type(name, output);
}

fn handle_module_field_global(source: &SourceFile, global: &Global) {
    let name = global.id.expect("global to have a name").name().to_string();

    let value = match &global.kind {
        GlobalKind::Import(_) => {
            panic!("imported globals are not supported");
        }
        GlobalKind::Inline(inline) => {
            let first = inline.instrs.first().expect("inline global to have at least one instruction");
            match first {
                Instruction::I32Const(value) => format!("'{:032b}'", value),
                _ => {
                    panic!("inline global to have a first instruction of i32.const");
                }
            }
        }
    };

    source.add_global(format!("${name}"), value);
}

fn handle_module_field_memory(source: &SourceFile, memory: &Memory) {
    match memory.kind {
        MemoryKind::Normal(memory_type) => match memory_type {
            MemoryType::B32 { limits, shared: _ } => {
                let size = limits.min;
                let max = limits.max.unwrap_or(size).into();
                source.set_memory(size.into(), max);
            }
            MemoryType::B64 { limits, shared: _ } => {
                let size = limits.min;
                let max = limits.max.unwrap_or(size);
                source.set_memory(size, max);
            }
        },
        _ => {
            panic!("only Normal MemoryKind supported");
        }
    };
}

/*
In WebAssembly, the index used to reference entities like functions, globals, or types is relative to the entire module, but it's specific to each kind of entity.

Each category (functions, globals, types, etc.) has its own separate index space.

This means that the first function in a module has index 0 in the function index space, the first global has index 0 in the global index space, and so on.

Additionally, you can call a function by its index even if it has a name, which means we need to keep track if this shit at all times.  Ugg.
*/
pub fn handle_module_fields(source: &SourceFile, fields: &Vec<ModuleField>) {
    let mut module_index: HashMap<&str, usize> = HashMap::new();

    for field in fields {
        match field {
            ModuleField::Func(func) => {
                let count = module_index.entry("Func").or_insert(0);
                *count += 1;
                // handle_module_field_func(source, func);
                handle_module_field_func(source, func);
            }

            ModuleField::Global(global) => {
                let count = module_index.entry("Global").or_insert(0);
                *count += 1;
                handle_module_field_global(source, global);
            }
            ModuleField::Memory(memory) => {
                let count = module_index.entry("Memory").or_insert(0);
                *count += 1;
                handle_module_field_memory(source, memory);
            }
            ModuleField::Table(_table) => {
                // handled by ModuleField::Elem
                // dbg!(table);
            }
            ModuleField::Elem(element) => {
                // it's assumed there's exactly one table and exactly one element
                source.add_element(element);
            }
            ModuleField::Data(data) => {
                let mut name = "$".to_string() + data.id.expect("data to have a name").name();
                name = name.replace('.', "_");

                let index = match &data.kind {
                    wast::core::DataKind::Active { memory: _, offset } => match offset.instrs.first().unwrap() {
                        Instruction::I32Const(index) => index,
                        _ => panic!("offset should only be i32.const"),
                    },
                    _ => panic!("only Active DataKind supported"),
                };

                let s = data
                    .data
                    .iter()
                    .map(|x| match x {
                        DataVal::Integral(_) => panic!("data should only be strings"),
                        DataVal::String(x) => {
                            str::from_utf8(x).unwrap().to_string() // Fix: Convert the result of str::from_utf8() to a String
                        }
                    })
                    .collect::<Vec<String>>()
                    .join(", ");

                source.add_data(*index, name, s);
            }
            ModuleField::Import(_) => {
                dbg!(field);
                panic!("you must be unwell.  handling imports is FAR beyond the scope of this project.");
            }
            ModuleField::Export(_) => {
                // handled by ModuleField::Func
                panic!("compile your wasm to use inline exports instead of module exports")
            }
            ModuleField::Tag(_) | ModuleField::Custom(_) | ModuleField::Start(_) | ModuleField::Rec(_) => {
                dbg!(field);
                panic!("intentionally not implemented module field");
            }
            ModuleField::Type(module_type) => {
                source.add_module_type(module_type);
                // intentionally ignored
            }
        }
    }
}
