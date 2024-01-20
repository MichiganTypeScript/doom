use std::fmt;

use crate::{source_line::SourceLine, type_constraint::TypeConstraint};

/// a fragment of code that's resolved and possible to be returned
#[derive(Debug, Clone)]
pub struct Fragment {
    pub constraint: TypeConstraint,
    pub lines: Vec<SourceLine>,
}

impl Fragment {
    pub fn new(constraint: TypeConstraint) -> Self {
        Fragment {
            lines: Vec::new(),
            constraint,
        }
    }

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

    /// add a single line to this fragment
    pub fn push<C: AsRef<str>>(&mut self, indent: usize, content: C) {
        self.lines.push(SourceLine::new(indent, content.as_ref()));
    }

    /// add multiple `SourceLine`s to this fragment
    pub fn append(&mut self, lines: &mut Vec<SourceLine>) {
        self.lines.append(lines);
    }

    /// add a single indent level to all lines in this fragment
    pub fn indent_lines(&mut self) {
        self.lines = self
            .lines
            .iter()
            .map(|line| SourceLine::new(line.indent + 1, &line.text))
            .collect();
    }

    pub fn prepend_to_first_line(&mut self, content: &str) {
        if let Some(first_line) = self.lines.first_mut() {
            first_line.text = content.to_string() + &first_line.text;
        } else {
            panic!("can't get then side pop")
        }
    }

    pub fn append_to_last_line(&mut self, content: &str) {
        if let Some(last_line) = self.lines.last_mut() {
            // add a comma to separate the argument
            last_line.text += content;
        } else {
            panic!("Can't append to last line because something went wrong");
        }
    }

    pub fn format_predicate(&mut self) {
        self.prepend_to_first_line("(");
        self.append_to_last_line(" extends true ? 1 : 0)");
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
