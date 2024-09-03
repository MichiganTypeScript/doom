use std::{cell::RefCell, fmt, str::from_utf8};

use indexmap::{IndexMap, IndexSet};
use wast::core::{Elem, Type};

use crate::utils::{format_id, format_index, format_val_type};

struct MemoryData {
    index: i32,
    name: String,

    /// here's a fun fact to wreck your weekend: the string contained within does not necessarily need to be utf-8
    data: Vec<u8>,
}

#[derive(Clone)]
pub struct ModuleType {
    pub params: Vec<String>,
    pub result: String,
}

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

    // MemoryData by id
    data: RefCell<IndexMap<String, MemoryData>>,

    /// the arguments constraint to the entry function
    args: RefCell<String>,

    // module types.  rarely needed, but unfortunately not never needed
    module_types: RefCell<IndexMap<String, ModuleType>>,
}

impl fmt::Debug for SourceFile {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{{ {:?} {:?} }}", self.imports, self.types)
    }
}

#[allow(clippy::to_string_trait_impl)]
impl ToString for SourceFile {
    fn to_string(&self) -> String {
        let mut data_types = String::from("");

        let mut memory_data = vec![];

        self.data.borrow().iter().for_each(|(_name, MemoryData { data, name, index, .. })| {
            let mut current_index = *index;
            let contained_string = from_utf8(data).unwrap_or("<not valid uft-8.  sorry bro.>");

            let expanded_data = data
                .iter()
                .map(|byte| {
                    let utf8_byte = [*byte];
                    let utf8 = from_utf8(&utf8_byte).unwrap_or("");
                    let result = format!("  '{:032b}': '{:08b}'; // {}", current_index, byte, utf8);
                    current_index += 1;
                    result
                })
                .filter(|line| !line.contains(": '00000000'"))
                .collect::<Vec<String>>()
                .join("\n");

            data_types.push_str(&format!("\n/** {contained_string} */\ntype {name} = {{\n{expanded_data}\n}}\n"));

            memory_data.push(format!("      & {}", name));
        });

        let memory = if !memory_data.is_empty() {
            format!("\n{}\n    ", memory_data.join("\n"))
        } else {
            " {}".to_string()
        };

        let imports = self
            .imports
            .borrow()
            .iter()
            .map(|(package, imports)| {
                format!(
                    "import type {{ {} }} from '{}'\n",
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

        let funcs_data = self
            .types
            .borrow()
            .iter()
            .map(|(name, _)| format!("  {name}: {name};"))
            .collect::<Vec<_>>()
            .join("\n");

        let funcs = format!("export type funcs = {{\n{funcs_data}\n}}\n");

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
        dbg!(&memory_size);
        let memory_size_binary = format!("{:032b}", memory_size);

        let indirect = self.indirect.borrow().to_owned().join(", ");

        // look for the `$entry` type and use the number of params it has to create a tuple like [number, number] for each
        let arguments = self.args.borrow();

        let entry = format!(
            "export type entry<
  arguments extends {arguments},
  debugMode extends boolean = false,
  stopAt extends number = number,
> = bootstrap<
  {{
    arguments: arguments;
    funcs: funcs;
    globals: {{{globals}}};
    memory:{memory};
    memorySize: '{memory_size_binary}';
    indirect: [{indirect}];
  }},
  debugMode,
  stopAt
>"
        );

        format!("{imports}\n{types}\n{funcs}\n{entry}\n{data_types}")
    }
}

impl Default for SourceFile {
    fn default() -> Self {
        Self::new()
    }
}

impl SourceFile {
    pub fn new() -> Self {
        SourceFile {
            args: RefCell::new(String::from("")),
            data: RefCell::new(IndexMap::new()),
            globals: RefCell::new(IndexMap::new()),
            imports: RefCell::new(IndexMap::new()),
            indirect: RefCell::new(Vec::new()),
            memory: RefCell::new((0, 0)),
            types: RefCell::new(IndexMap::new()),
            module_types: RefCell::new(IndexMap::new()),
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
            wast::core::ElemPayload::Indices(ref indices) => indices.iter().map(format_index).collect(),
            _ => panic!("only Indices ElemPayload supported"),
        };

        self.indirect.borrow_mut().extend(strings);
    }

    pub fn add_data(&self, index: i32, name: String, data: Vec<u8>) {
        self.data.borrow_mut().insert(name.clone(), MemoryData { name, data, index });
    }

    pub fn set_args(&self, args: String) {
        self.args.replace(args);
    }

    pub fn add_module_type(&self, module_type: &Type) {
        let (params, result) = match module_type.def {
            wast::core::TypeDef::Func(ref function_type) => {
                let params = function_type.params.iter().map(|(_, _, val)| format_val_type(val)).collect();

                if function_type.results.len() > 1 {
                    panic!("multiple results not supported");
                }
                let result = if let Some(val) = function_type.results.first() {
                    format_val_type(val)
                } else {
                    "null".to_string()
                };

                (params, result)
            }
            _ => panic!("only Func TypeDef supported"),
        };

        let name = format_id(&module_type.id.expect("module type to have a name"));

        self.module_types.borrow_mut().insert(name, ModuleType { params, result });
    }

    pub fn get_module_type(&self, name: &String) -> Option<ModuleType> {
        self.module_types.borrow().get(name).cloned()
    }
}
