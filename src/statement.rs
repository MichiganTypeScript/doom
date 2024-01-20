use wast::core::Local;

use crate::{fragment::Fragment, type_constraint::TypeConstraint, utils::format_call_id};

/// a "Statement" in this sense is very similar to a statement in a programming language.
///
/// In TypeScript, though, the way to do "statements" is with generic parameters.
///
/// So that's what these are.
#[derive(Debug, Clone)]
pub struct Statement {
    /// the name of the variable
    pub name: String,

    /// the type of the variable
    pub constraint: TypeConstraint,

    /// the value of the variable
    pub value: Fragment,
}

impl Statement {
    pub fn new<S: AsRef<str>>(name: S, constraint: TypeConstraint, value: Fragment) -> Self {
        Statement {
            name: name.as_ref().to_string(),
            constraint,
            value,
        }
    }
}

impl From<&Local<'_>> for Statement {
    fn from(local: &Local) -> Self {
        let name = local.id.expect("didn't get local name").name().to_string();
        let constraint = TypeConstraint::from(&local.ty);
        Statement {
            name: format_call_id(name),
            constraint,
            value: Fragment::from_string("never", constraint),
        }
    }
}
