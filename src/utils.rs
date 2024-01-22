use wast::token::Index;

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

pub const RESULT_SENTINEL: &str = "RESULT";

pub fn format_call_id<I: Into<String>>(id: I) -> String {
    format!("${}", id.into())
}

pub fn format_index(index: &Index) -> String {
    match index {
        Index::Id(id) => "$".to_string() + id.name(),
        _ => panic!("numeric index not supported"),
    }
}
