use std::fmt;

use indexmap::{IndexMap, IndexSet};

pub type Imports = IndexMap<String, IndexSet<String>>;

#[derive(Debug)]
pub struct TypeDefinition {
    name: String,
    generics: String,
    body: String,
    exported: bool,
}

pub type TypeDefinitions = IndexMap<String, TypeDefinition>;

pub struct SourceCode {
    imports: Imports,
    types: TypeDefinitions,
}

impl fmt::Debug for SourceCode {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ {:?} {:?} }}", self.imports, self.types)
    }
}

impl ToString for SourceCode {
    fn to_string(&self) -> String {
        let mut things: Vec<String> = vec![];

        for (package, imports) in &self.imports {
            things.push(
                format!(
                    "import {{ {} }} from '{}';",
                    imports.iter().cloned().collect::<Vec<String>>().join(", "),
                    package
                )
                .to_string(),
            );
        }

        if !things.is_empty() {
            things.push(String::from(""));
        }

        for (_name, ty) in &self.types {
            let export = if ty.exported { "export " } else { "" };
            let name = format!("type {}{} = ", ty.name, ty.generics);
            things.push(format!("{}{}{};\n", export, name, ty.body).to_string())
        }

        things.join("\n")
    }
}

impl SourceCode {
    pub fn new() -> Self {
        SourceCode {
            imports: Imports::new(),
            types: TypeDefinitions::new(),
        }
    }

    pub fn add_import<P: Into<String>, I: Into<String>>(&mut self, package: P, import: I) {
        let entry = self.imports.entry(package.into()).or_default();
        entry.insert(import.into());
    }

    pub fn add_type<N: Into<String>, G: Into<String>, D: Into<String>>(
        &mut self,
        name: N,
        generics: G,
        definition: D,
        exported: bool,
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
                exported,
            },
        );
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_add_imports() {
        let mut source = SourceCode::new();

        source.add_import("package1", "import1");
        source.add_import("package2", "import3");
        source.add_import("package1", "import2");

        assert_eq!(source.imports.len(), 2); // Two packages in imports
        assert_eq!(source.imports["package1"].len(), 2); // Two imports in package1
        assert_eq!(source.imports["package2"].len(), 1); // One import in package2
    }

    #[test]
    fn test_print_imports() {
        let mut source = SourceCode::new();

        source.add_import("package1", "import1");
        source.add_import("package2", "import3");
        source.add_import("package1", "import2");

        let expected = [
            "import { import1, import2 } from 'package1';",
            "import { import3 } from 'package2';",
        ]
        .map(|line| format!("{line}\n"))
        .join("");

        assert_eq!(source.to_string(), expected);
    }

    #[test]
    fn test_add_type() {
        let mut source = SourceCode::new();
        source.add_type("IsTruthy", "", "(x: string) => boolean", false);

        // TODO, this is not really a good test of the values, it's testing printing

        assert_eq!(
            source.to_string(),
            "type IsTruthy = (x: string) => boolean;\n"
        );

        // // Adding the same type name should panic
        // assert!(std::panic::catch_unwind(|| {
        //     source.add_type(ty.name, ty.definition, ty.exported);
        // })
        // .is_err());
    }

    #[test]
    fn test_to_string() {
        let mut source = SourceCode::new();

        source.add_type("IsTruthy", "<T extends string>", "(x: T) => boolean", false);
        source.add_type("Multiply", "", "(a: number, b: number) => number", true);

        let expected = "type IsTruthy<T extends string> = (x: T) => boolean;\n\n\
                        export type Multiply = (a: number, b: number) => number;\n";
        assert_eq!(source.to_string(), expected);
    }
}
