extern crate wast;

mod source_file;
mod source_type;
mod utils;

use source_type::SourceType;

use source_file::{GenericParameter, SourceFile, TypeConstraint};
use std::{collections::HashMap, fs, vec};
use utils::map_valtype_to_typeconstraint;
use wast::{
    core::{Export, Func, Global, Instruction, ModuleField, ModuleKind},
    parser,
    token::Index,
    Wat,
};

use crate::utils::{count_instructions, format_call_id, format_index, format_index_name};

#[derive(Debug, Clone)]
pub struct Statement {
    pub name: String,
    pub constraint: TypeConstraint,
    pub source_types: Vec<SourceType>,
}

const RESULT_SENTINEL: &str = "RESULT";

#[macro_use]
extern crate pretty_assertions;

fn hotscript_unary<N: Into<String> + Copy>(
    source: &mut SourceFile,
    stack: &mut Vec<SourceType>,
    namespace: N,
    method: N,
    result_type_constraint: TypeConstraint,
    is_predicate: bool,
) {
    source.add_import("hotscript", "Call");
    source.add_import("hotscript", namespace.into());

    let mut operand = stack
        .pop()
        .unwrap_or_else(|| panic!("{} lines", &method.into()));

    let indent = operand
        .lines
        .first()
        .unwrap_or_else(|| panic!("{} indent", &method.into()))
        .indent;
    operand.increase_indent();

    let mut st = SourceType::new(result_type_constraint);

    let predicate_prefix = if is_predicate { "(" } else { "" };
    let predicate_suffix = if is_predicate {
        " extends true ? 1 : 0)"
    } else {
        ""
    };

    st.line(
        indent,
        format!(
            "{}Call<{}.{}<",
            predicate_prefix,
            namespace.into(),
            method.into()
        ),
    );
    st.lines(&mut operand.lines);
    st.line(indent, format!(">>{predicate_suffix}"));

    stack.push(st);
}

fn hotscript_binary<N: Into<String> + Copy>(
    source: &mut SourceFile,
    stack: &mut Vec<SourceType>,
    namespace: N,
    method: N,
    result_type_constraint: TypeConstraint,
    is_predicate: bool,
) {
    source.add_import("hotscript", "Call");
    source.add_import("hotscript", namespace.into());

    let mut rhs = stack
        .pop()
        .unwrap_or_else(|| panic!("{} rhs pop", &method.into()));
    let mut lhs = stack
        .pop()
        .unwrap_or_else(|| panic!("{} lhs pop", &method.into()));

    let mut st = SourceType::new(result_type_constraint);

    let indent = rhs.lines.first().expect("I32GtS indent").indent;

    let predicate_prefix = if is_predicate { "(" } else { "" };
    let predicate_suffix = if is_predicate {
        " extends true ? 1 : 0)"
    } else {
        ""
    };

    st.line(
        indent,
        format!(
            "{}Call<{}.{}<",
            predicate_prefix,
            namespace.into(),
            method.into()
        ),
    );

    lhs.increase_indent();
    lhs.map_lines(|text| format!("{text},"));
    st.lines(&mut lhs.lines);

    rhs.increase_indent();
    st.lines(&mut rhs.lines);

    st.line(indent, format!(">>{predicate_suffix}"));
    stack.push(st);
}

fn handle_instructions(
    source: &mut SourceFile,
    instructions: &[Instruction<'_>],
    result_type_constraints: Vec<TypeConstraint>,
) -> (Vec<Statement>, Statement) {
    let mut statements: Vec<Statement> = Vec::new();

    let mut source_types: Vec<SourceType> = Vec::new();

    for instruction in instructions.iter() {
        // dbg!(&stack);
        // dbg!(&instruction);

        // Order: I32, I64, F32, F64

        // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference
        match instruction {
            ////////////////////////////////////////////////
            // Numeric Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Numeric
            ////////////////////////////////////////////////

            ////// Constants
            //////
            Instruction::I32Const(num) => {
                source_types.push(SourceType::from_string(
                    num.to_string(),
                    TypeConstraint::Number,
                ));
            }
            Instruction::I64Const(num) => {
                source_types.push(SourceType::from_string(
                    num.to_string(),
                    TypeConstraint::Number,
                ));
            }
            //Instruction::F32Const
            Instruction::F64Const(raw_bits) => {
                let float_value = f64::from_bits(raw_bits.bits).to_string();

                source_types.push(SourceType::from_string(float_value, TypeConstraint::Number));
            }

            ////// Comparison
            //////
            Instruction::I32Eq | Instruction::I64Eq | Instruction::F32Eq | Instruction::F64Eq => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Equal",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32Eqz | Instruction::I64Eqz => {
                source_types.push(SourceType::from_string("0", TypeConstraint::Number));
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Equal",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32Ne | Instruction::I64Ne | Instruction::F32Ne | Instruction::F64Ne => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "NotEqual",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32GtS
            | Instruction::I32GtU
            | Instruction::I64GtS
            | Instruction::I64GtU
            | Instruction::F32Gt
            | Instruction::F64Gt => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "GreaterThan",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32GeS
            | Instruction::I32GeU
            | Instruction::I64GeS
            | Instruction::I64GeU
            | Instruction::F32Ge
            | Instruction::F64Ge => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "GreaterThanOrEqual",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32LtS
            | Instruction::I32LtU
            | Instruction::I64LtS
            | Instruction::I64LtU
            | Instruction::F32Lt
            | Instruction::F64Lt => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "LessThan",
                    TypeConstraint::Number,
                    true,
                );
            }
            Instruction::I32LeS
            | Instruction::I32LeU
            | Instruction::I64LeS
            | Instruction::I64LeU
            | Instruction::F32Le
            | Instruction::F64Le => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "LessThanOrEqual",
                    TypeConstraint::Number,
                    true,
                );
            }

            ////// Arithmetic
            //////
            Instruction::I32Add
            | Instruction::I64Add
            | Instruction::F32Add
            | Instruction::F64Add => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Add",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32Sub
            | Instruction::I64Sub
            | Instruction::F32Sub
            | Instruction::F64Sub => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Sub",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32Mul
            | Instruction::I64Mul
            | Instruction::F32Mul
            | Instruction::F64Mul => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Mul",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::I32DivS
            | Instruction::I32DivU
            | Instruction::I64DivS
            | Instruction::I64DivU => {
                hotscript_binary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Div",
                    TypeConstraint::Number,
                    false,
                );
            }

            ////// Floating Point Specific Instructions
            //////
            Instruction::F32Abs | Instruction::F64Abs => {
                hotscript_unary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Abs",
                    TypeConstraint::Number,
                    false,
                );
            }
            Instruction::F32Neg | Instruction::F64Neg => {
                hotscript_unary(
                    source,
                    &mut source_types,
                    "Numbers",
                    "Negate",
                    TypeConstraint::Number,
                    false,
                );
            }

            ////////////////////////////////////////////////
            // Variable Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Variables
            ////////////////////////////////////////////////
            Instruction::LocalGet(index) => {
                let value = format_index(index);
                source_types.push(SourceType::from_string(value, TypeConstraint::None));
            }
            Instruction::LocalSet(index) => {
                // `_` before a name means it's a local
                let name = format_index(index);
                let original = source_types.clone();
                let value = source_types.pop().expect("LocalSet pop").clone();
                let constraint = value.constraint;

                statements.push(Statement {
                    name,
                    source_types: original,
                    constraint,
                });
            }
            //Instruction::LocalTee()
            //Instruction::GlobalGet()
            //Instruction::GlobalSet()

            ////////////////////////////////////////////////
            // Control Flow Instructions
            // https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow
            ////////////////////////////////////////////////
            Instruction::Block(block) => {
                dbg!(block);
            }
            Instruction::Br(index) => {
                dbg!(index);
            }
            Instruction::Call(index) => {
                let actual_id = match index {
                    Index::Id(i) => format_call_id(i.name()),
                    Index::Num(num, _span) => format_index_name(*num as usize),
                };
                let print_id = match index {
                    Index::Id(i) => i.name().to_string(),
                    Index::Num(num, _span) => format_index_name(*num as usize),
                };

                if let Some(td) = source.types.get(&actual_id) {
                    dbg!(td);
                    // td.generics.length()

                    let indent = 0; // probably a bug to not get this from somewhere actual.  oh well.
                    let mut st = SourceType::new(TypeConstraint::Number);

                    if td.generics.is_empty() {
                        st.line(indent, actual_id);
                    } else {
                        st.line(indent, format!("{print_id}<"));

                        let mut temp = vec![];
                        for (index, _) in td.generics.iter().enumerate() {
                            let mut st = source_types.pop().expect("Call st");

                            st.increase_indent();
                            // we're going to reverse the temp list after this loop block, so what this is effectively saying is "add a comma at the last line of all expressions except the last one" because (unfortunately) trailing commas in TS arguments are not allowed).
                            if index != 0 {
                                st.append_to_last_line(",");
                            }
                            temp.push(st.lines);
                        }

                        temp.reverse();
                        for mut t in temp {
                            st.lines(&mut t);
                        }

                        st.line(indent, ">");
                    }

                    source_types.push(st);
                } else {
                    dbg!(source);
                    panic!("can't find id in Call: {actual_id}");
                }
            }
            //Instruction::Drop
            Instruction::End(_) => {
                let mut else_side = source_types.pop().expect("End else_side pop");
                else_side.prepend_to_first_line(": ");

                let mut then_side = source_types.pop().expect("End then_side pop");
                let mut condition = source_types.pop().expect("End condition pop");

                condition.lines(&mut then_side.lines);
                condition.lines(&mut else_side.lines);

                source_types.push(condition);
            }
            Instruction::BrIf(index) => {
                dbg!(index);
            }
            Instruction::If(_block) => {
                let mut condition_pop = source_types.pop().expect("If");
                condition_pop.append_to_last_line(" extends 1");
                source_types.push(condition_pop);
            }
            Instruction::Else(_) => {
                let mut then_side_pop = source_types.pop().expect("Else");
                then_side_pop.prepend_to_first_line("? ");
                source_types.push(then_side_pop);
            }
            //Instruction::Loop()
            //Instruction::Nop
            //Instruction::Return
            Instruction::Select(_select_types) => {
                let condition = source_types.pop().expect("select 1");
                let falsy = source_types.pop().expect("select2");
                let truthy = source_types.pop().expect("select2");

                let mut st = SourceType::new(TypeConstraint::Number);

                st.line(0, format!("{} extends 0", condition.to_string().trim_end()));
                st.line(0, format!("? {}", falsy.to_string().trim_end()));
                st.line(0, format!(": {}", truthy.to_string().trim_end()));

                source_types.push(st);
            }
            //Instruction::Unreachable
            _ => {
                panic!("not implemented instruction {:#?}", instruction);
            }
        }
    }

    let results = Statement {
        constraint: TypeConstraint::None, // TODO: if there's just one then get the one, otherwise get the bunch
        name: RESULT_SENTINEL.to_string(),
        source_types: result_type_constraints
            .iter()
            .map(|tc| {
                let st = source_types
                    .pop()
                    .expect("constraints matched by remaining statements");
                if *tc != st.constraint {
                    panic!("non matching constraint");
                }
                st
            })
            .collect(),
    };

    dbg!(
        &result_type_constraints,
        &statements,
        &source_types,
        &results
    );

    (statements, results)
}

fn get_param_name(index: usize, maybe_name: &Option<String>) -> String {
    if let Some(name) = maybe_name {
        name.to_string()
    } else {
        format_index_name(index)
    }
}

fn handle_module_field_func(source: &mut SourceFile, func: &Func, _module_func_index: usize) {
    dbg!(func);
    // dbg!(module_func_index);
    let name = "$".to_string()
        + func
            .id
            .unwrap_or_else(|| panic!("need to implement no name funcs but it looks like I can skirt by without having to do any of it"))
            .name();

    let mut generics = vec![];

    let mut result_type_constraints: Vec<TypeConstraint> = vec![];

    let mut param_names: Vec<Option<String>> = Vec::new();
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

        result_type_constraints = func_type
            .results
            .to_vec()
            .iter()
            .map(map_valtype_to_typeconstraint)
            .collect();

        // dbg!(func_types);
    }

    let (statements, results) = match &func.kind {
        wast::core::FuncKind::Import(_imp) => {
            panic!("didn't implement FuncKind::Import")
        }
        wast::core::FuncKind::Inline {
            locals: _,
            expression,
        } => handle_instructions(source, &expression.instrs, result_type_constraints),
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

            handle_instructions(source, &expression.instrs, vec![result_type_constraint])
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
fn handle_module_fields(source: &mut SourceFile, fields: &Vec<ModuleField>) {
    let mut module_index: HashMap<&str, usize> = HashMap::new();

    for field in fields {
        // dbg!(field);

        match field {
            // ModuleFieldType(Type<'a>),
            // ModuleFieldRec(Rec<'a>),
            // ModuleFieldImport(Import<'a>), // TODO: imports can increase the module func index space
            ModuleField::Func(func) => {
                let count = module_index.entry("Func").or_insert(0);
                handle_module_field_func(source, func, *count);
                *count += 1;
            }
            // ModuleFieldTable(Table<'a>),
            // ModuleFieldMemory(Memory<'a>),
            ModuleField::Global(global) => {
                let count = module_index.entry("Global").or_insert(0);
                handle_module_field_global(source, global);
                *count += 1;
            }
            ModuleField::Export(export) => {
                // no known need for module_index addressing exports
                handle_module_field_export(source, export);
            }
            // ModuleFieldStart(Index<'a>),
            // ModuleFieldElem(Elem<'a>),
            // ModuleFieldData(Data<'a>),
            // ModuleFieldTag(Tag<'a>),
            // ModuleFieldCustom(Custom<'a>),
            _other => {
                // dbg!(other);
                panic!("not implemented module field");
            }
        }
    }
    // dbg!(module_index);
}

fn wat_to_dts(wat: String, dump_path: &str) -> SourceFile {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = &parser::parse::<Wat>(&buf).unwrap();

    let mut source = SourceFile::new();

    if let wast::Wat::Module(ref module) = parsed_wat {
        let counter = count_instructions(module);
        // dbg!(&counter);

        let dump = format!("{:#?}\n\n\n\n\n{:#?}", module, counter);
        dbg_dump_file!(dump, dump_path);

        match &module.kind {
            ModuleKind::Binary(_) => {
                panic!("WebAssembly Binary is not supported.  Only WebAssembly Text.");
            }
            ModuleKind::Text(fields) => {
                handle_module_fields(&mut source, fields);
            }
        }
    }

    source
}

fn main() {
    let current_dir = std::env::current_dir().unwrap();
    let wat_path = current_dir.join("src/debug/code.wat");
    let wat = fs::read_to_string(wat_path).unwrap();
    let output = wat_to_dts(wat, "src/debug/code.dump").to_string();
    fs::write("src/debug/code.d.ts", output).unwrap();
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

            // focus
            if file_name != "select.wat" {
                continue;
            }

            // // skip
            // if file_name == "equal.wat" {
            //     continue;
            // }

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

            println!("\n\nTRYING WITH {}\n\n", &file_name);

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
