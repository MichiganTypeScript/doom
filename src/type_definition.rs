use crate::utils::RESULT_SENTINEL;
use indexmap::IndexMap;

use crate::{
    generic_parameter::GenericParameter, statement::Statement, type_constraint::TypeConstraint,
};

/// This is a single TypeScript type definition.
#[derive(Debug, Clone)]
pub struct TypeDefinition {
    /// the global name of the type
    pub name: String,

    /// any arguments to the type
    pub generics: Vec<GenericParameter>,

    /// the body of the type.  because we're in TypeScript types, a "statement" is really a generic parameter with a default value.
    pub statements: Vec<Statement>,

    /// the final result of the type
    pub result: Statement,

    /// whether or not this is an exported type
    pub exported: bool,
}

pub type TypeDefinitions = IndexMap<String, TypeDefinition>;

impl ToString for TypeDefinition {
    fn to_string(&self) -> String {
        let TypeDefinition {
            exported,
            generics,
            statements,
            name,
            result,
        } = self.clone();

        let export = if exported { "export " } else { "" };

        let mut g = String::new();
        if !generics.is_empty() {
            g = generics.iter().map(|line| line.to_string() + ",").collect();
        }

        let mut all_statements = statements.clone();

        // handle RESULT
        all_statements.push(result);

        let s = &all_statements
            .iter()
            .map(|statement| {
                let mut working = statement.clone();
                let extends = if working.constraint != TypeConstraint::None {
                    " extends ".to_string() + &working.constraint.to_string()
                } else {
                    String::new()
                };

                let mut working_stack = working
                    .fragments
                    .pop()
                    .expect("tried to pop a Fragment from statements but there wasn't one");

                working_stack.increase_indent();
                working_stack.increase_indent();
                let before_equals = "\n  ".to_string() + &working.name + &extends + " ";
                let mut after_equals = "\n".to_string() + &working_stack.to_string();
                after_equals.pop();
                before_equals.to_string() + "=" + &after_equals
            })
            .collect::<Vec<String>>()
            .join(",");

        format!("{export}type {name}<{g}{s}\n> = {RESULT_SENTINEL}\n")
    }
}
