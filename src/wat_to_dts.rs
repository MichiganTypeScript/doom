use wast::{core::ModuleKind, parser, Wat};

use crate::{
    dbg_dump_file, handle_module::handle_module_fields, source_file::SourceFile,
    stats::count_instructions,
};

pub fn wat_to_dts(wat: String, dump_path: &str) -> SourceFile {
    let buf = parser::ParseBuffer::new(&wat).unwrap();
    let parsed_wat = &parser::parse::<Wat>(&buf).unwrap();

    let source = SourceFile::new();

    if let wast::Wat::Module(ref module) = parsed_wat {
        let counter = count_instructions(module);
        // dbg!(&counter);

        let dump = format!("{:#?}\n\n\n\n\n{:#?}", module, counter);
        dbg_dump_file!(dump, dump_path);

        match &module.kind {
            ModuleKind::Binary(_) => {
                panic!("WebAssembly Binary is not supported.  Only WebAssembly Text.");
            }
            ModuleKind::Text(fields) => {
                handle_module_fields(&source, fields);
            }
        }
    }

    source
}
