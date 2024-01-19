use std::{collections::HashMap, fmt};

use indexmap::{IndexMap, IndexSet};
use wast::core::Local;

use crate::{
    fragment::Fragment,
    utils::{format_call_id, map_valtype_to_typeconstraint},
    Statement,
};

pub const RESULT_SENTINEL: &str = "RESULT";

pub type Imports = IndexMap<String, IndexSet<String>>;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum TypeConstraint {
    None,
    Number,
    #[allow(dead_code)] // we'll probably need this later hopefully
    String,
}

impl fmt::Display for TypeConstraint {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            TypeConstraint::None => write!(f, ""),
            TypeConstraint::Number => write!(f, "number"),
            TypeConstraint::String => write!(f, "string"),
        }
    }
}

#[derive(Debug)]
pub struct GenericParameter {
    pub constraint: TypeConstraint,
    pub name: String,
}

impl GenericParameter {
    #[allow(dead_code)] // we'll probably need this later hopefully
    pub fn new_string<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: TypeConstraint::String,
            name: name.into(),
        }
    }
    pub fn new_number<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: TypeConstraint::Number,
            name: name.into(),
        }
    }
}

impl From<&Local<'_>> for GenericParameter {
    fn from(local: &Local) -> Self {
        let name = local.id.expect("didn't get local name").name().to_string();
        GenericParameter {
            constraint: map_valtype_to_typeconstraint(&local.ty),
            name: format_call_id(name),
        }
    }
}

#[derive(Debug)]
pub struct TypeDefinition {
    /// the name of the type
    pub name: String,

    /// any arguments
    pub generics: Vec<GenericParameter>,

    /// the body of the type
    pub statements: Vec<Statement>,

    /// a set of statements
    pub result: Statement,
}

pub type TypeDefinitions = IndexMap<String, TypeDefinition>;

pub struct SourceFile {
    pub imports: Imports,

    /// separate typescript type definitions for this type
    pub types: TypeDefinitions,

    /// exports declared for this type
    pub exports: HashMap<String, Vec<String>>,
}

impl fmt::Debug for SourceFile {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ {:?} {:?} }}", self.imports, self.types)
    }
}

pub fn create_type(
    exported: bool,
    name: String,
    generics: Vec<String>,
    statements: &mut Vec<Statement>,
    result: Statement,
) -> String {
    // dbg!(
    //     "create type",
    //     exported,
    //     &name,
    //     &generics,
    //     &statements,
    //     &results
    // );

    let export = if exported { "export " } else { "" };

    let mut g = String::new();
    if !generics.is_empty() {
        g = generics.iter().map(|line| line.to_string() + ",").collect();
    }

    // handle RESULT
    statements.push(result);

    let s = &statements
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

impl ToString for SourceFile {
    fn to_string(&self) -> String {
        let mut lines: Vec<String> = vec![];

        for (package, imports) in &self.imports {
            lines.push(
                format!(
                    "import {{ {} }} from '{}'",
                    imports.iter().cloned().collect::<Vec<String>>().join(", "),
                    package
                )
                .to_string(),
            );
        }

        if !lines.is_empty() {
            lines.push(String::from(""));
        }

        for (_name, definition) in &self.types {
            let type_key = &definition.name;
            let mut generics: Vec<String> = Vec::new();

            if !definition.generics.is_empty() {
                generics = definition
                    .generics
                    .iter()
                    .map(|GenericParameter { constraint, name }| {
                        format!("\n  {name} extends {constraint}")
                    })
                    .collect::<Vec<_>>()
            }

            let mut statements = definition.statements.clone();
            let results = definition.result.clone();

            let name = create_type(
                false,
                type_key.clone(),
                generics.clone(),
                &mut statements,
                results,
            );

            lines.push(name);

            // handle exports
            if let Some(export_names) = self.exports.get(type_key) {
                for export_name in export_names {
                    let mut passed_generics = "".to_string();

                    if !definition.generics.is_empty() {
                        passed_generics += "<\n";
                        passed_generics += &definition
                            .generics
                            .iter()
                            .map(|GenericParameter { name, .. }| "  ".to_string() + name)
                            .collect::<Vec<_>>()
                            .join(",\n")
                            .to_string();
                        passed_generics += "\n>";
                    }

                    let result = format!("{type_key}{passed_generics}");
                    let export_section = create_type(
                        true,
                        export_name.to_string(),
                        generics.clone(),
                        &mut vec![],
                        Statement {
                            name: RESULT_SENTINEL.to_string(),
                            fragments: vec![Fragment::from_string(
                                result,
                                definition.result.constraint,
                            )],
                            constraint: definition.result.constraint,
                        },
                    );

                    lines.push(export_section);
                }
            }
        }

        lines.join("\n")
    }
}

impl SourceFile {
    pub fn new() -> Self {
        SourceFile {
            imports: Imports::new(),
            types: TypeDefinitions::new(),
            exports: HashMap::new(),
        }
    }

    pub fn add_import<P: Into<String>, I: Into<String>>(&mut self, package: P, import: I) {
        let entry = self.imports.entry(package.into()).or_default();
        entry.insert(import.into());
    }

    pub fn add_type<N: Into<String>>(
        &mut self,
        name: N,
        generics: Vec<GenericParameter>,
        statements: Vec<Statement>,
        results: Statement,
    ) {
        let name = name.into();
        if self.types.contains_key(&name) {
            panic!("cannot replace type definitions {}", name);
        }
        self.types.insert(
            name.clone(),
            TypeDefinition {
                statements,
                generics,
                name,
                result: results,
            },
        );
    }

    pub fn add_export<S: Into<String>, E: Into<String>>(&mut self, source: S, export: E) {
        let source_key = source.into();

        if let Some(existing) = self.exports.get_mut(&source_key) {
            existing.push(export.into());
        } else {
            self.exports.insert(source_key, vec![export.into()]);
        }
    }
}
