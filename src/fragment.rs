use std::fmt;

use crate::{source_line::SourceLine, type_constraint::TypeConstraint};

/// a fragment of code that's resolved and possible to be returned
#[derive(Debug, Clone)]
pub struct Fragment {
    pub constraint: TypeConstraint,
    pub lines: Vec<SourceLine>,
}

impl Fragment {
    pub fn from_string<C: Into<String>>(content: C, constraint: TypeConstraint) -> Self {
        Fragment {
            constraint,
            lines: content
                .into()
                .lines()
                .map(|line| SourceLine::new(0, line))
                .collect(),
        }
    }

    /// add a single indent level to all lines in this fragment
    pub fn indent_lines(&mut self) {
        self.lines = self
            .lines
            .iter()
            .map(|line| SourceLine::new(line.indent + 1, &line.text))
            .collect();
    }
}

impl fmt::Display for Fragment {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for SourceLine { indent, text } in &self.lines {
            let indentation = "  ".repeat(*indent);
            writeln!(f, "{indentation}{text}")?;
        }
        Ok(())
    }
}
