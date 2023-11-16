use std::{collections::HashMap, fmt};

use indexmap::{IndexMap, IndexSet};

pub type Imports = IndexMap<String, IndexSet<String>>;

#[derive(Debug)]
pub struct TypeDefinition {
    pub name: String,
    pub generics: Vec<(String, String)>,
    pub body: String,
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

pub fn create_type(exported: bool, name: String, generics: Vec<String>, result: String) -> String {
    let export = if exported { "export " } else { "" };

    let mut gen = String::new();
    if !generics.is_empty() {
        gen = generics.iter().map(|line| line.to_string() + ",").collect();
    }

    let res = result
        .lines()
        .map(|line| "    ".to_string() + line)
        .collect::<Vec<_>>()
        .join("\n");

    format!(
        r#"{export}type {name}<{gen}
  RESULT =
{res}
> = RESULT
"#
    )
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
                    .map(|(name, extends)| format!("\n  {name} extends {extends}"))
                    .collect::<Vec<_>>()
            }

            let name = create_type(
                false,
                type_key.clone(),
                generics.clone(),
                definition.body.clone(),
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
                            .map(|(name, _extends)| "  ".to_string() + name)
                            .collect::<Vec<_>>()
                            .join(",\n")
                            .to_string();
                        passed_generics += "\n>";
                    }

                    let result = format!("{type_key}{passed_generics}");
                    let export_section =
                        create_type(true, export_name.to_string(), generics.clone(), result);

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

    pub fn add_type<N: Into<String>, G: Into<Vec<(String, String)>>, D: Into<String>>(
        &mut self,
        name: N,
        generics: G,
        definition: D,
    ) {
        let name = name.into();
        if self.types.contains_key(&name) {
            panic!("cannot replace type definitions {}", name);
        }
        self.types.insert(
            name.clone(),
            TypeDefinition {
                body: definition.into(),
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

        // let source_name = source.into();
        // let export_name = export.into();

        // if let Some(original) = self.types.get_mut(&source_name) {
        //     let thing = format!("export type {export_name} =\n");

        //     self.types.insert(
        //         export_name.clone(),
        //         TypeDefinition {
        //             body: "".into(),
        //             generics: "".into(),
        //             name: thing,
        //         },
        //     );
        // } else {
        //     panic!("Type not found for export: {}", source_name);
        // }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[ignore]
    #[test]
    fn test_add_imports() {
        let mut source = SourceFile::new();

        source.add_import("package1", "import1");
        source.add_import("package2", "import3");
        source.add_import("package1", "import2");

        assert_eq!(source.imports.len(), 2); // Two packages in imports
        assert_eq!(source.imports["package1"].len(), 2); // Two imports in package1
        assert_eq!(source.imports["package2"].len(), 1); // One import in package2
    }

    #[ignore]
    #[test]
    fn test_print_imports() {
        let mut source = SourceFile::new();

        source.add_import("package1", "import1");
        source.add_import("package2", "import3");
        source.add_import("package1", "import2");

        let expected = [
            "import { import1, import2 } from 'package1'",
            "import { import3 } from 'package2'",
        ]
        .map(|line| format!("{line}\n"))
        .join("");

        assert_eq!(source.to_string(), expected);
    }

    #[ignore]
    #[test]
    fn test_add_type() {
        let mut source = SourceFile::new();
        source.add_type("$isFalsey", vec![], "(x: string) => boolean");

        // TODO, this is not really a good test of the values, it's testing printing

        assert_eq!(
            source.to_string(),
            "type $isFalsey =\n(x: string) => boolean"
        );

        // // Adding the same type name should panic
        // assert!(std::panic::catch_unwind(|| {
        //     source.add_type(ty.name, ty.definition, ty.exported);
        // })
        // .is_err());
    }

    #[ignore]
    #[test]
    fn test_to_string() {
        let mut source = SourceFile::new();

        source.add_type(
            "$isTruthy",
            [(String::from("T"), String::from("string"))],
            "(x: T) => boolean",
        );
        source.add_type("$multiply", vec![], "(a: number, b: number) => number");
        source.add_export("$multiply", "multiply");

        let expected = "type $isTruthy<\n  T extends string\n> =\n(x: T) => boolean\n\
                        type $multiply =\n(a: number, b: number) => number\n\
                        export type multiply = $multiply\n";
        assert_eq!(source.to_string(), expected);
    }
}
