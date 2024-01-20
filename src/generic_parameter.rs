use wast::core::Local;

use crate::{type_constraint::TypeConstraint, utils::format_call_id};

#[derive(Debug, Clone)]
pub struct GenericParameter {
    pub constraint: TypeConstraint,
    pub name: String,
}

impl GenericParameter {
    #[allow(dead_code)] // we'll probably need this later hopefully
    pub fn new_string<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: TypeConstraint::String,
            name: name.into(),
        }
    }
    pub fn new_number<T: Into<String>>(name: T) -> Self {
        GenericParameter {
            constraint: TypeConstraint::Number,
            name: name.into(),
        }
    }
}

impl From<&Local<'_>> for GenericParameter {
    fn from(local: &Local) -> Self {
        let name = local.id.expect("didn't get local name").name().to_string();
        GenericParameter {
            constraint: TypeConstraint::from(&local.ty),
            name: format_call_id(name),
        }
    }
}

impl ToString for GenericParameter {
    fn to_string(&self) -> String {
        format!("\n  {} extends {}", self.name, self.constraint)
    }
}
