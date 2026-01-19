---
title: "Markdown Learning Cheatsheet"
date: 2026-01-08
draft: false
tags: ["markdown", "writing", "reference"]
description: "A quick reference for learning Markdown, the lightweight markup language used for formatting text on the web"
---

A quick reference for learning **Markdown**, the lightweight markup language used for formatting text on the web (e.g., GitHub, Reddit, and many docs).

---

## Basics

### Headings
Use `#` for headings (1–6 levels).
```markdown
# H1
## H2
### H3
#### H4
##### H5
###### H6
```

### Paragraphs & Line Breaks
Just write normally for a paragraph.
Use two spaces at the end of a line for a line break.
Or insert a blank line between paragraphs.

```markdown
This is a paragraph.

This is another paragraph.
```

---

## Emphasis

| Style | Markdown | Output |
|--------|-----------|---------|
| *Italic* | `*text*` or `_text_` | *Italic* |
| **Bold** | `**text**` or `__text__` | **Bold** |
| ***Bold & Italic*** | `***text***` | ***Bold & Italic*** |
| ~~Strikethrough~~ | `~~text~~` | ~~Strikethrough~~ |

---

## Links & Images

### Links
```markdown
[OpenAI](https://www.openai.com)
```
[OpenAI](https://www.openai.com)

### Images
```markdown
![Alt Text](https://placekitten.com/200/200)
```

---

## Lists

### Unordered List
```markdown
- Item 1
- Item 2
  - Subitem 2a
  - Subitem 2b
```
- Item 1
- Item 2
  - Subitem 2a
  - Subitem 2b

### Ordered List
```markdown
1. First
2. Second
3. Third
```
1. First
2. Second
3. Third

---

## Code

### Inline Code
```markdown
Use `print("Hello, world!")` inside text.
```
Use `print("Hello, world!")` inside text.

### Code Blocks (Triple Backticks)

Produces:

```python
def greet(name):
    return f"Hello, {name}!"
```

---

## Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```
> This is a blockquote.
> It can span multiple lines.

---

## Tables

```markdown
| Column A | Column B | Column C |
|-----------|-----------|-----------|
| Data 1    | Data 2    | Data 3    |
| Data 4    | Data 5    | Data 6    |
```

| Column A | Column B | Column C |
|-----------|-----------|-----------|
| Data 1    | Data 2    | Data 3    |
| Data 4    | Data 5    | Data 6    |

---

## Task Lists

```markdown
- [x] Learn Markdown basics
- [ ] Practice writing docs
- [ ] Build a README.md
```

- [x] Learn Markdown basics
- [ ] Practice writing docs
- [ ] Build a README.md

---

## Horizontal Rules

```markdown
---
***
___
```
All three produce a horizontal rule.

---

## Tips
- You can mix **bold**, *italic*, and `code` freely.
- Most Markdown renderers (like GitHub) also support:
  - Syntax highlighting for code
  - Tables and task lists
  - Emoji shortcodes (e.g., `:rocket:`)
- Save files as `.md` extension (e.g., `README.md`)

---

**Now you know the essentials!**
Experiment by editing and previewing Markdown in VS Code, Typora, or GitHub.
