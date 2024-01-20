use std::fmt;

use wast::core::ValType;

/// This is effectively the TypeScript type of a given fragment, which just so happens to often be expressed with an `extends` clause
#[derive(Debug, Clone, Copy, PartialEq)]
pub enum TypeConstraint {
    None,
    Number,
    #[allow(dead_code)] // we'll probably need String later hopefully
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

impl From<&ValType<'_>> for TypeConstraint {
    fn from(val_type: &ValType) -> TypeConstraint {
        match *val_type {
            ValType::F32 | ValType::F64 | ValType::I32 | ValType::I64 => TypeConstraint::Number,
            ValType::Ref(_) | ValType::V128 => {
                panic!("not a supported return type")
            }
        }
    }
}
