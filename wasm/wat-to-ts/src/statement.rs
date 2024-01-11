use crate::{fragment::Fragment, source_file::TypeConstraint};

// a "Statement" in this sense is very similar to a statement in a programming language.  In TypeScript, though, the way to do "statements" is with generic parameters.  So that's what these are.
#[derive(Debug, Clone)]
pub struct Statement {
    pub name: String,
    pub constraint: TypeConstraint,
    pub fragments: Vec<Fragment>,
}
