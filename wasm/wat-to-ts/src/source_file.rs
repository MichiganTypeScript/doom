use std::{collections::HashMap, fmt};

use indexmap::{IndexMap, IndexSet};

use crate::{source_type::SourceType, Statement, RESULT_SENTINEL};

pub type Imports = IndexMap<String, IndexSet<String>>;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum GenericConstraint {
    None,
    Number,
    #[allow(dead_code)] // we'll probably need this later hopefully
    String,
}

impl fmt::Display for GenericConstraint {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            GenericConstraint::None => write!(f, ""),
            GenericConstraint::Number => write!(f, "number"),
            GenericConstraint::String => write!(f, "string"),
        }
    }
}

#[derive(Debug)]
pub struct GenericParameter {
    pub constraint: GenericConstraint,
    pub name: String,
}

impl GenericParameter {
    #[allow(dead_code)] // we'll probably need this later hopefully
    pub fn new_string<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: GenericConstraint::String,
            name: name.into(),
        }
    }
    pub fn new_number<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: GenericConstraint::Number,
            name: name.into(),
        }
    }
}

#[derive(Debug)]
pub struct TypeDefinition {
    pub name: String,
    pub generics: Vec<GenericParameter>,
    pub statements: Vec<Statement>,
}

pub type TypeDefinitions = IndexMap<String, TypeDefinition>;

pub struct SourceFile {
    pub imports: Imports,
    pub types: TypeDefinitions,
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
    statements: Vec<Statement>,
) -> String {
    dbg!(exported, &name, &generics, &statements);

    let export = if exported { "export " } else { "" };

    let mut g = String::new();
    if !generics.is_empty() {
        g = generics.iter().map(|line| line.to_string() + ",").collect();
    }

    let s = &statements
        .iter()
        .map(|statement| {
            let mut working = statement.clone();
            let extends = if working.constraint != GenericConstraint::None {
                " extends ".to_string() + &working.constraint.to_string()
            } else {
                String::new()
            };

            working.stack.increase_indent();
            working.stack.increase_indent();
            let before_equals = "\n  ".to_string() + &working.name + &extends + " ";
            let mut after_equals = "\n".to_string() + &working.stack.to_string();
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

        dbg!(self);

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

            let name = create_type(
                false,
                type_key.clone(),
                generics.clone(),
                definition.statements.clone(),
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
                        vec![Statement {
                            name: RESULT_SENTINEL.to_string(),
                            stack: SourceType::from_string(result, GenericConstraint::None),
                            constraint: GenericConstraint::None,
                        }],
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

    pub fn add_type<N: Into<String>, G: Into<Vec<GenericParameter>>>(
        &mut self,
        name: N,
        generics: G,
        statements: Vec<Statement>,
    ) {
        let name = name.into();
        if self.types.contains_key(&name) {
            panic!("cannot replace type definitions {}", name);
        }
        self.types.insert(
            name.clone(),
            TypeDefinition {
                statements,
                generics: generics.into(),
                name,
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
