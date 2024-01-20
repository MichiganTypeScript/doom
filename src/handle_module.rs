use crate::handle_instructions::handle_instructions;
use crate::source_file::{GenericParameter, SourceFile, TypeConstraint};
use crate::statement::Statement;
use crate::utils::{get_param_name, map_valtype_to_typeconstraint};
use std::{collections::HashMap, vec};
use wast::core::{Export, Func, Global, ModuleField};

use crate::utils::format_index;

fn handle_module_field_func(source: &mut SourceFile, func: &Func, _module_func_index: usize) {
    // dbg!(func);
    // dbg!(module_func_index);
    let name = "$".to_string()
      + func
          .id
          .unwrap_or_else(|| panic!("need to implement no name funcs but it looks like I can skirt by without having to do any of it"))
          .name();

    let mut generics = vec![];

    let mut param_names: Vec<Option<String>> = Vec::new();

    let mut result_type_constraint = TypeConstraint::None;

    if let Some(ref func_type) = func.ty.inline {
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
                .map(|(index, name)| GenericParameter::new_number(get_param_name(index, name)))
                .collect();
        }

        if func_type.results.len() > 1 {
            dbg!(func.id);
            dbg!(&func_type);
            panic!("multiple returns are not supported");
        }

        result_type_constraint = func_type
            .results
            .first()
            .map_or(TypeConstraint::None, map_valtype_to_typeconstraint);
    }

    let (statements, results) = match &func.kind {
        wast::core::FuncKind::Import(_imp) => {
            panic!("didn't implement FuncKind::Import")
        }
        wast::core::FuncKind::Inline { locals, expression } => {
            let func_locals = locals.iter().map(Statement::from).collect();

            handle_instructions(
                source,
                &expression.instrs,
                result_type_constraint,
                func_locals,
            )
        }
    };

    source.add_type(&name, generics, statements, results);

    for export in func.exports.names.iter() {
        source.add_export(&name, *export);
    }
}

fn handle_module_field_global(source: &mut SourceFile, global: &Global) {
    // dbg!(global);
    let (statements, results) = match &global.kind {
        wast::core::GlobalKind::Import(_import) => {
            panic!("not implemented GlobalKind::Import")
        }
        wast::core::GlobalKind::Inline(expression) => {
            let result_type_constraint = map_valtype_to_typeconstraint(&global.ty.ty);
            handle_instructions(source, &expression.instrs, result_type_constraint, vec![])
        }
    };

    let name = "$".to_string() + global.id.unwrap().name();
    source.add_type(&name, vec![], statements, results);

    for export in global.exports.names.iter() {
        source.add_export(&name, *export);
    }
}

fn handle_module_field_export(source: &mut SourceFile, export: &Export) {
    // dbg!(export);
    let export_name = export.name;
    let local_name = format_index(&export.item);

    source.add_export(local_name, export_name);
}

/*
In WebAssembly, the index used to reference entities like functions, globals, or types is relative to the entire module, but it's specific to each kind of entity.

Each category (functions, globals, types, etc.) has its own separate index space.

This means that the first function in a module has index 0 in the function index space, the first global has index 0 in the global index space, and so on.

Additionally, you can call a function by its index even if it has a name, which means we need to keep track if this shit at all times.  Ugg.
*/
pub fn handle_module_fields(source: &mut SourceFile, fields: &Vec<ModuleField>) {
    let mut module_index: HashMap<&str, usize> = HashMap::new();

    for field in fields {
        match field {
            ModuleField::Func(func) => {
                let count = module_index.entry("Func").or_insert(0);
                handle_module_field_func(source, func, *count);
                *count += 1;
            }

            ModuleField::Global(global) => {
                let count = module_index.entry("Global").or_insert(0);
                handle_module_field_global(source, global);
                *count += 1;
            }
            ModuleField::Export(export) => {
                // no known need for module_index addressing exports, but it was implemented early on accident and so I left it here.
                handle_module_field_export(source, export);
            }
            ModuleField::Table(_)
            | ModuleField::Import(_)
            | ModuleField::Memory(_)
            | ModuleField::Elem(_)
            | ModuleField::Data(_) => {
                dbg!(field);
                panic!("unintentionally not implemented module field");
            }
            ModuleField::Tag(_)
            | ModuleField::Custom(_)
            | ModuleField::Start(_)
            | ModuleField::Rec(_) => {
                dbg!(field);
                panic!("intentionally not implemented module field");
            }
            ModuleField::Type(_) => {
                // intentionally ignored
            }
        }
    }
}
