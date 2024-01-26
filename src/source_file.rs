use std::{
    cell::RefCell,
    fmt::{self},
};

use indexmap::{IndexMap, IndexSet};
use wast::core::Elem;

use crate::utils::format_index;

/// This represents is a literal TypeScript file that is the final build output of the program
pub struct SourceFile {
    /// WASM module-level globals
    globals: RefCell<IndexMap<String, String>>,

    /// npm imports needed for this type to function (globally deduplicated for the whole file)
    imports: RefCell<IndexMap<String, IndexSet<String>>>,

    /// separate typescript type definitions for this type
    types: RefCell<IndexMap<String, String>>,

    /// the declared size of that memory segment and the maximum memory size
    memory: RefCell<(u64, u64)>,

    /// table ref elements
    indirect: RefCell<Vec<String>>,
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
            .map(|(name, _)| format!("      {name}: {name};"))
            .collect::<Vec<_>>()
            .join("\n");

        let mut globals = self
            .globals
            .borrow()
            .iter()
            .map(|(name, value)| format!("      {name}: {value};"))
            .collect::<Vec<_>>()
            .join("\n");
        if !globals.is_empty() {
            globals = format!("\n{globals}\n    ");
        }

        let (memory_size, _max_memory) = self.memory.borrow().to_owned();

        let indirect = self.indirect.borrow().to_owned().join(", ");

        let entry = format!(
            "export type entry<
  input extends number[] = [],
  debugMode extends boolean = false
> = runProgram<
  {{
    stack: input;
    funcs: {{
{funcs}
    }};
    globals: {{{globals}}};
    memory: {{}};
    memorySize: {memory_size};
    indirect: [{indirect}];
  }},
  debugMode
>"
        );

        format!("{imports}\n{types}\n{entry}\n")
    }
}

impl SourceFile {
    pub fn new() -> Self {
        SourceFile {
            globals: RefCell::new(IndexMap::new()),
            imports: RefCell::new(IndexMap::new()),
            types: RefCell::new(IndexMap::new()),
            memory: RefCell::new((0, 0)),
            indirect: RefCell::new(Vec::new()),
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

    pub fn add_global(&self, name: String, value: String) {
        self.globals.borrow_mut().insert(name, value);
    }

    pub fn set_memory(&self, size: u64, max: u64) {
        self.memory.borrow_mut().0 = size;
        self.memory.borrow_mut().1 = max;
    }

    pub fn add_element(&self, element: &Elem) {
        let strings: Vec<String> = match element.payload {
            wast::core::ElemPayload::Indices(ref indices) => indices
                .iter()
                .map(format_index)
                .map(|x| format!("\"{x}\""))
                .collect(),
            _ => panic!("only Indices ElemPayload supported"),
        };

        self.indirect.borrow_mut().extend(strings);
    }
}
