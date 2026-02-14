---
title: "Fabric: AI Prompt Patterns for Everyday Use"
date: 2026-01-02
draft: false
tags: ["AI", "tools", "productivity", "Fabric"]
description: "A practical guide to using Fabric's 230+ prompt patterns for content analysis, summarization, and creative work"
featureimage: "/images/woven_fabric_illustration_500x500.webp"
---

## Meet Fabric

[![](/images/woven_fabric_illustration_500x500.webp)](/images/woven_fabric_illustration_500x500.webp)

**Fabric** is an open-source tool by Daniel Miessler that provides 230+ reusable AI prompt patterns for common tasks like summarizing content, extracting insights, improving writing, and more.

Think of it as a library of expertly-crafted prompts you can apply to any content.

---

## Why Fabric?

Most people interact with AI through free-form chat. That works, but it's inconsistent. The same question asked differently produces different results.

Fabric solves this with **patterns**—structured prompts that produce reliable, formatted output every time. Instead of asking "can you summarize this?", you run the `summarize` pattern and get consistent results.

---

## Installation

### Prerequisites
- Go 1.21+ (install via `brew install go` on macOS)

### Install Fabric

```bash
go install github.com/danielmiessler/fabric/cmd/fabric@latest
```

Add Go's bin directory to your PATH (add to `~/.zshrc` or `~/.bashrc`):

```bash
export PATH="$PATH:$HOME/go/bin"
```

### Initial Setup

Create the config directory and download patterns:

```bash
mkdir -p ~/.config/fabric
touch ~/.config/fabric/.env
fabric -U
```

This downloads 230+ patterns to `~/.config/fabric/patterns/`.

### (Optional) Add API Keys

If you want Fabric to call AI APIs directly, run:

```bash
fabric -S
```

This walks you through configuring providers like OpenAI, Anthropic, Ollama, etc.

---

## Basic Usage

### List Available Patterns

```bash
fabric -l
```

### Run a Pattern

Pipe content into Fabric:

```bash
cat article.txt | fabric -p summarize
```

Or use it with other tools:

```bash
curl -s https://example.com/article | fabric -p extract_wisdom
pbpaste | fabric -p improve_writing | pbcopy
```

### YouTube Transcripts

Fabric can fetch and process YouTube videos:

```bash
fabric -y "https://youtube.com/watch?v=VIDEO_ID" -p extract_wisdom
```

---

## Essential Patterns

Here are the patterns I use most often:

| Pattern | What It Does |
|---------|--------------|
| `summarize` | Concise summary of any content |
| `extract_wisdom` | Pull out ideas, insights, quotes, and recommendations |
| `improve_writing` | Clean up grammar, style, and clarity |
| `analyze_claims` | Fact-check and evaluate claims critically |
| `explain_code` | Explain what code does in plain language |
| `create_summary` | Structured summary with sections |
| `extract_ideas` | Just the key ideas, bulleted |
| `analyze_paper` | Academic paper analysis |
| `create_mermaid_visualization` | Generate diagrams from descriptions |

### Pattern Deep Dive: `extract_wisdom`

This is Fabric's signature pattern. It extracts:

- **SUMMARY** — 25-word overview
- **IDEAS** — Key concepts (16 words each)
- **INSIGHTS** — Refined, abstracted takeaways
- **QUOTES** — Notable quotes from the content
- **HABITS** — Practical habits mentioned
- **FACTS** — Verifiable facts stated
- **RECOMMENDATIONS** — Actionable advice

It's perfect for processing podcasts, articles, videos, or books.

---

## Native Pattern Execution

You don't need Fabric's CLI to use the patterns. Each pattern is just a markdown file with structured instructions.

Pattern location:
```
~/.config/fabric/patterns/{pattern_name}/system.md
```

You can read these files directly and use them with any AI tool—Claude, ChatGPT, or a local model. Just paste the pattern as a system prompt, then provide your content.

This is how I use Fabric patterns with Claude Code: I read the pattern file, apply it to content, and get structured output without spawning the CLI.

---

## Creating Custom Patterns

Patterns follow a simple structure:

```markdown
# IDENTITY and PURPOSE

You are an expert at [domain]. Your task is to [purpose].

# STEPS

1. [First step]
2. [Second step]
...

# OUTPUT INSTRUCTIONS

- Output in [format]
- Include [sections]

# INPUT

INPUT:
```

Save your pattern to:
```
~/.config/fabric/patterns/my_pattern/system.md
```

Then use it like any other:
```bash
cat content.txt | fabric -p my_pattern
```

---

## Using Fabric Patterns in Claude Code

If you're using Claude Code (or any AI assistant with file access), you can use Fabric patterns without the CLI. Just ask your assistant to apply a pattern to your content.

### Example Prompts

**Basic pattern application:**
```
Use the extract_wisdom pattern on this: [paste content]
```

```
Apply the summarize pattern to this article: [paste or URL]
```

```
Run improve_writing on this text: [paste]
```

**With files:**
```
Use extract_wisdom on the transcript in ~/Downloads/podcast.txt
```

```
Apply analyze_paper to the PDF at ~/Documents/research.pdf
```

**Web content:**
```
Fetch https://example.com/article and run summarize on it
```

**Output to file:**
```
Use extract_wisdom on this and save the output to ~/notes/insights.md
```

### What Happens Behind the Scenes

When you ask me to use a Fabric pattern, I:

1. Read the pattern from `~/.config/fabric/patterns/{pattern}/system.md`
2. Apply those instructions to your content
3. Return structured output matching the pattern's format

No API keys needed—I'm already the AI processing the content.

### Quick Reference

| You Say | I Do |
|---------|------|
| "use extract_wisdom on this" | Extract ideas, insights, quotes, recommendations |
| "summarize this" | Concise summary |
| "improve this writing" | Grammar, clarity, style cleanup |
| "analyze the claims in this" | Fact-check and evaluate |
| "explain this code" | Plain-language code explanation |
| "create a mermaid diagram of this" | Generate Mermaid visualization |

You can also ask me to list patterns (`what Fabric patterns are available?`) or read a specific pattern to see what it does.

---

## Tips

1. **Chain patterns** — Pipe output from one pattern into another
2. **Use with clipboard** — `pbpaste | fabric -p pattern | pbcopy` (macOS)
3. **Update regularly** — Run `fabric -U` to get new patterns
4. **Read the patterns** — Understanding how they work helps you use them better
5. **Start with `summarize` and `extract_wisdom`** — They handle 80% of use cases

---

## Resources

- [Fabric GitHub](https://github.com/danielmiessler/fabric) — Source code and documentation
- [Pattern Directory](https://github.com/danielmiessler/fabric/tree/main/patterns) — Browse all patterns online
- [Daniel Miessler's Blog](https://danielmiessler.com) — Creator's writing on AI and security

---

Fabric turns AI from a chatbot into a reliable tool. Once you build the habit of reaching for patterns, you'll wonder how you worked without them.
