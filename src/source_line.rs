#[derive(Debug, Clone)]
pub struct SourceLine {
    pub indent: usize,
    pub text: String,
}

// this refers to a single line of code in the generated source file
impl SourceLine {
    pub fn new<S: AsRef<str>>(indent: usize, text: S) -> Self {
        SourceLine {
            indent,
            text: text.as_ref().to_owned(),
        }
    }
}
