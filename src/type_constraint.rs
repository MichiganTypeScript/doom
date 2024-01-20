use std::fmt;

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum TypeConstraint {
    None,
    Number,
    #[allow(dead_code)] // we'll probably need this later hopefully
    String,
}

impl fmt::Display for TypeConstraint {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            TypeConstraint::None => write!(f, ""),
            TypeConstraint::Number => write!(f, "number"),
            TypeConstraint::String => write!(f, "string"),
        }
    }
}
