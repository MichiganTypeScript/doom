use std::fmt;

#[derive(Debug)]
pub struct SourceLine {
    pub indent: usize,
    pub text: String,
}

impl SourceLine {
    fn new(indent: usize, text: String) -> Self {
        SourceLine { indent, text }
    }
}

#[derive(Debug)]
pub struct SourcePrinter {
    pub lines: Vec<SourceLine>,
}

impl SourcePrinter {
    pub fn new() -> Self {
        SourcePrinter { lines: Vec::new() }
    }

    pub fn from_string<C: Into<String>>(content: C) -> Self {
        SourcePrinter {
            lines: content
                .into()
                .lines()
                .map(|line| SourceLine::new(1, line.to_string()))
                .collect(),
        }
    }

    pub fn line<C: Into<String>>(&mut self, indent: usize, content: C) {
        self.lines.push(SourceLine::new(indent, content.into()));
    }

    pub fn lines(&mut self, lines: &mut Vec<SourceLine>) {
        self.lines.append(lines);
    }

    pub fn map_lines<F>(&mut self, transform: F)
    where
        F: Fn(&String) -> String,
    {
        for line in &mut self.lines {
            line.text = transform(&line.text);
        }
    }

    // pub fn clear(&mut self) {
    //     *self = SourcePrinter::new();
    // }

    pub fn increase_indent(&mut self) {
        self.lines = self
            .lines
            .iter()
            .map(|line| SourceLine::new(line.indent + 1, line.text.clone()))
            .collect();
    }

    pub fn prepent_to_first_line(&mut self, content: &str) {
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
}

impl Default for SourcePrinter {
    fn default() -> Self {
        Self::new()
    }
}

impl fmt::Display for SourcePrinter {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        for SourceLine { indent, text } in &self.lines {
            let indentation = "  ".repeat(*indent);
            writeln!(f, "{indentation}{text}")?;
        }
        Ok(())
    }
}
