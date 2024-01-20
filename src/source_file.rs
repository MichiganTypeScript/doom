use std::{
    cell::{Ref, RefCell},
    collections::HashMap,
    fmt,
};

use indexmap::{IndexMap, IndexSet};

use crate::{
    fragment::Fragment,
    generic_parameter::GenericParameter,
    type_definition::{TypeDefinition, TypeDefinitions},
    utils::RESULT_SENTINEL,
    Statement,
};

/// This represents is a literal TypeScript file that is the final build output of the program
pub struct SourceFile {
    imports: RefCell<IndexMap<String, IndexSet<String>>>,

    /// separate typescript type definitions for this type
    types: RefCell<TypeDefinitions>,

    /// exports declared for this type
    exports: RefCell<HashMap<String, Vec<String>>>,
}

impl fmt::Debug for SourceFile {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ {:?} {:?} }}", self.imports, self.types)
    }
}

impl ToString for SourceFile {
    fn to_string(&self) -> String {
        let mut lines: Vec<String> = vec![];

        for (package, imports) in self.imports.borrow().iter() {
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

        let types = self.types.borrow_mut();
        for (_name, definition) in types.iter() {
            lines.push(definition.to_string());

            let type_key = &definition.name;

            // handle exports
            if let Some(export_names) = self.exports.borrow().get(type_key) {
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
                    let export_section = TypeDefinition {
                        exported: true,
                        generics: definition.generics.clone(),
                        name: export_name.to_string(),
                        result: Statement {
                            name: RESULT_SENTINEL.to_string(),
                            fragments: vec![Fragment::from_string(
                                result,
                                definition.result.constraint,
                            )],
                            constraint: definition.result.constraint,
                        },
                        statements: vec![],
                    };

                    lines.push(export_section.to_string());
                }
            }
        }

        lines.join("\n")
    }
}

impl SourceFile {
    pub fn new() -> Self {
        SourceFile {
            imports: RefCell::new(IndexMap::new()),
            types: RefCell::new(TypeDefinitions::new()),
            exports: RefCell::new(HashMap::new()),
        }
    }

    pub fn add_import<P: Into<String>, I: Into<String>>(&self, package: P, import: I) {
        let mut imports = self.imports.borrow_mut();
        let entry = imports.entry(package.into()).or_default();
        entry.insert(import.into());
    }

    pub fn get_type(&self, type_id: &str) -> Option<Ref<TypeDefinition>> {
        Ref::filter_map(self.types.borrow(), |types| types.get(type_id)).ok()
    }

    pub fn add_type<N: Into<String>>(
        &self,
        name: N,
        generics: Vec<GenericParameter>,
        statements: Vec<Statement>,
        result: Statement,
    ) {
        let name = name.into();
        let mut types = self.types.borrow_mut();
        if types.contains_key(&name) {
            panic!("cannot replace type definitions {}", name);
        }
        types.insert(
            name.clone(),
            TypeDefinition {
                statements,
                generics,
                name,
                result,
                exported: false, // TODO, is this correct?
            },
        );
    }

    pub fn add_export<S: Into<String>, E: Into<String>>(&self, source: S, export: E) {
        let source_key = source.into();

        let mut exports = self.exports.borrow_mut();
        if let Some(existing) = exports.get_mut(&source_key) {
            existing.push(export.into());
        } else {
            exports.insert(source_key, vec![export.into()]);
        }
    }
}
