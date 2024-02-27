use wast::{
    core::ValType,
    token::{Id, Index},
};

#[macro_export]
macro_rules! dbg_dump_file {
    ($expr:expr, $filename:expr) => {{
        let mut file_path = std::env::current_dir().unwrap();
        file_path.push($filename);

        let _ = std::fs::write(&file_path, $expr);
        // println!("{}", $filename);
        // println!("{}", file_source);
    }};
}

pub fn format_index(index: &Index) -> String {
    match index {
        Index::Id(id) => "'$".to_string() + id.name() + "'",
        _ => panic!("numeric index not supported"),
    }
}

pub fn format_id(id: &Id) -> String {
    "$".to_string() + id.name()
}

pub fn val_type_to_typescript_type(val_type: &ValType) -> String {
    match val_type {
        ValType::I32 => "number".to_string(),
        ValType::I64 => "bigint".to_string(),
        ValType::F32 => "number".to_string(),
        ValType::F64 => "number".to_string(),
        _ => panic!("unsupported type"),
    }
}

pub fn format_val_type(val_type: &ValType) -> String {
    match val_type {
        ValType::I32 => "'i32'".to_string(),
        ValType::I64 => "'i64'".to_string(),
        ValType::F32 => "'f32'".to_string(),
        ValType::F64 => "'f64'".to_string(),
        _ => panic!("unsupported type"),
    }
}
