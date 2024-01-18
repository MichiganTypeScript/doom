use wast::core::Local;

use crate::{
    fragment::Fragment,
    source_file::TypeConstraint,
    utils::{format_call_id, map_valtype_to_typeconstraint},
};

// a "Statement" in this sense is very similar to a statement in a programming language.  In TypeScript, though, the way to do "statements" is with generic parameters.  So that's what these are.
#[derive(Debug, Clone)]
pub struct Statement {
    pub name: String,
    pub constraint: TypeConstraint,
    pub fragments: Vec<Fragment>,
}

impl From<&Local<'_>> for Statement {
    fn from(local: &Local) -> Self {
        let name = local.id.expect("didn't get local name").name().to_string();
        let constraint = map_valtype_to_typeconstraint(&local.ty);
        Statement {
            name: format_call_id(name),
            constraint,
            fragments: vec![Fragment::from_string("never", constraint)],
        }
    }
}
