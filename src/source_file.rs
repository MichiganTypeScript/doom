use std::{collections::HashMap, fmt};

use indexmap::{IndexMap, IndexSet};

use crate::{
    fragment::Fragment,
    generic_parameter::GenericParameter,
    type_definition::{TypeDefinition, TypeDefinitions},
    utils::RESULT_SENTINEL,
    Statement,
};

pub type Imports = IndexMap<String, IndexSet<String>>;

/// This represents is a literal TypeScript file that is the final build output of the program
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
            lines.push(definition.to_string());

            let type_key = &definition.name;

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
        result: Statement,
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
                result,
                exported: false, // TODO, is this correct?
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
