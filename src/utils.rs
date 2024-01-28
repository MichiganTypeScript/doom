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

pub fn format_index(index: &Index) -> String {
    match index {
        Index::Id(id) => "'$".to_string() + id.name() + "'",
        _ => panic!("numeric index not supported"),
    }
}
