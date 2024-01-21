use std::fmt::Display;

use wast::token::Index;

use crate::{fragment::Fragment, source_file::SourceFile, type_constraint::TypeConstraint};

#[macro_export]
macro_rules! dbg_dump_file {
    ($expr:expr, $filename:expr) => {{
        let mut file_path = std::env::current_dir().unwrap();
        file_path.push($filename);

        let _ = std::fs::write(&file_path, $expr);
        // println!("{}", $filename);
        // println!("{}", file_source);
    }};
}

pub const RESULT_SENTINEL: &str = "RESULT";

pub fn format_call_id<I: Into<String>>(id: I) -> String {
    format!("${}", id.into())
}

pub fn format_index(index: &Index) -> String {
    match index {
        Index::Id(id) => "$".to_string() + id.name(),
        _ => panic!("numeric index not supported"),
    }
}

pub fn hotscript_unary<N: Into<String> + Copy>(
    source: &SourceFile,
    stack: &mut Vec<Fragment>,
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
    operand.indent_lines();

    let mut fragment = Fragment::new(result_type_constraint);

    fragment.push(
        indent,
        format!("Call<{}.{}<", namespace.into(), method.into()),
    );
    fragment.append(&mut operand.lines);
    fragment.push(indent, ">>");

    if is_predicate {
        fragment.format_predicate();
    }

    stack.push(fragment);
}

pub fn hotscript_binary<N: Into<String> + Copy + Display>(
    source: &SourceFile,
    stack: &mut Vec<Fragment>,
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

    let mut fragment = Fragment::new(result_type_constraint);

    let indent = rhs
        .lines
        .first()
        .unwrap_or_else(|| panic!("{} indent", &method.into()))
        .indent;

    fragment.push(
        indent,
        format!("Call<{}.{}<", namespace.into(), &method.into()),
    );

    lhs.indent_lines();
    lhs.append_to_last_line(","); // add comma to separate parameters (trailing commas in parameter lists are not valid in TypeScript, unfortunately)
    fragment.append(&mut lhs.lines);

    rhs.indent_lines();
    fragment.append(&mut rhs.lines);

    fragment.push(indent, ">>");

    if is_predicate {
        fragment.format_predicate();
    }

    stack.push(fragment);
}

pub fn get_param_name(maybe_name: &Option<String>) -> String {
    if let Some(name) = maybe_name {
        name.to_string()
    } else {
        panic!("numeric param name not supported")
    }
}
