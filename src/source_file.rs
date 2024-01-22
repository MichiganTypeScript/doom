use std::{
    cell::RefCell,
    fmt::{self},
};

use indexmap::{IndexMap, IndexSet};

/// This represents is a literal TypeScript file that is the final build output of the program
pub struct SourceFile {
    /// npm imports needed for this type to function (globally deduplicated for the whole file)
    imports: RefCell<IndexMap<String, IndexSet<String>>>,

    /// separate typescript type definitions for this type
    types: RefCell<IndexMap<String, String>>,
}

impl fmt::Debug for SourceFile {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ {:?} {:?} }}", self.imports, self.types)
    }
}

impl ToString for SourceFile {
    fn to_string(&self) -> String {
        let imports = self
            .imports
            .borrow()
            .iter()
            .map(|(package, imports)| {
                format!(
                    "import {{ {} }} from '{}'\n",
                    imports.iter().cloned().collect::<Vec<String>>().join(", "),
                    package
                )
                .to_string()
            })
            .collect::<Vec<_>>()
            .join("");

        let types = self
            .types
            .borrow()
            .iter()
            .map(|(_name, contents)| contents.to_string())
            .collect::<Vec<_>>()
            .join("\n");

        let funcs = self
            .types
            .borrow()
            .iter()
            .map(|(name, _)| format!("        {name}: {name};"))
            .collect::<Vec<_>>()
            .join("\n");

        let entry = format!(
            "type entry<
  input extends number[]
> = runProgram<
  {{
    stack: input;
    module: {{
      func: {{
{funcs}
      }}
    }}
  }},
  false
>"
        );

        format!("{imports}\n{types}\n{entry}")
    }
}

impl SourceFile {
    pub fn new() -> Self {
        SourceFile {
            imports: RefCell::new(IndexMap::new()),
            types: RefCell::new(IndexMap::new()),
        }
    }

    pub fn add_import<P: Into<String>, I: Into<String>>(&self, package: P, import: I) {
        let mut imports = self.imports.borrow_mut();
        let entry = imports.entry(package.into()).or_default();
        entry.insert(import.into());
    }

    pub fn add_type(&self, name: String, contents: String) {
        self.types.borrow_mut().insert(name, contents);
    }
}
