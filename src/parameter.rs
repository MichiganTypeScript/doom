use wast::core::Local;

use crate::{type_constraint::TypeConstraint, utils::format_call_id};

/// This is a parameter to a function.
///
/// It differs from a statement in that it doesn't have a value (i.e. generic default).
#[derive(Debug, Clone)]
pub struct Parameter {
    /// the name of the variable
    pub name: String,

    /// the type of the variable
    pub constraint: TypeConstraint,
}

impl Parameter {
    #[allow(dead_code)] // we'll probably need this later hopefully
    pub fn new_string<T: Into<String>>(name: T) -> Self {
        Parameter {
            constraint: TypeConstraint::String,
            name: name.into(),
        }
    }
}

impl From<&Local<'_>> for Parameter {
    fn from(local: &Local) -> Self {
        let name = local.id.expect("didn't get local name").name().to_string();
        Parameter {
            constraint: TypeConstraint::from(&local.ty),
            name: format_call_id(name),
        }
    }
}

impl ToString for Parameter {
    fn to_string(&self) -> String {
        format!("\n  {} extends {}", self.name, self.constraint)
    }
}
