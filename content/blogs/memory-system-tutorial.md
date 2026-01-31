---
title: "Building a Personal Knowledge Base with AI"
date: 2026-01-21
draft: false
tags: ["AI", "productivity", "knowledge-management", "PAI"]
description: "How to set up a markdown-based memory system that your AI assistant can read and write to directly"
featureimage: "/images/desk_papers_notes_500x500.jpg"
---

## Got Notes? ##

[![](/images/desk_papers_notes_500x500.jpg)](/images/desk_papers_notes_500x500.jpg)

Most note-taking systems are designed for humans. You write notes, organize them, and hope you can find them later. But what if your AI assistant could be a full participant—reading your notes for context, writing new ones, and helping you build a knowledge base over time?

This tutorial shows how to set up a **MEMORY system**: a simple folder structure that serves as shared memory between you and your AI.

---

## The Problem with Traditional Notes

When you use Apple Notes, Notion, or even Obsidian, your AI assistant can't easily:
- Read your existing notes for context
- Save insights directly to your knowledge base
- Search your notes to answer questions
- Build on previous research

You end up copy-pasting between your notes app and your AI chat. That friction adds up.

## The Solution: A Shared Filesystem

The fix is simple: use a folder of markdown files that both you and your AI can access. No special app required—just files on disk.

```
~/Documents/PAI/MEMORY/
```

Your AI reads and writes markdown. You can open the same files in any text editor, VS Code, or even Obsidian if you want a GUI.

---

## Directory Structure

Here's the structure I use:

```
MEMORY/
├── research/       # Research session outputs
├── ideas/          # Brainstorm captures
├── learnings/      # Things I've learned
├── decisions/      # Decisions and their rationale
├── sessions/       # Session summaries
├── analysis/       # Deep-dive documents
├── Work/           # Active task working memory
└── State/          # Operational state (JSON)
```

Each folder has a clear purpose. When you tell your AI to "save this research," it knows exactly where it goes.

---

## Setting It Up

Create the directory structure:

```bash
mkdir -p ~/Documents/PAI/MEMORY/{research,ideas,learnings,decisions,sessions,analysis,Work,State}
```

Add a README so you remember what goes where:

```bash
cat > ~/Documents/PAI/MEMORY/README.md << 'EOF'
# MEMORY

Personal knowledge base.

| Folder | Purpose |
|--------|---------|
| research/ | Research outputs |
| ideas/ | Brainstorms |
| learnings/ | Things learned |
| decisions/ | Decisions + rationale |
| sessions/ | Session summaries |
| analysis/ | Deep dives |
| Work/ | Active tasks |
EOF
```

That's it. You now have a knowledge base your AI can use.

---

## Using It with Your AI

Once the structure exists, you can talk to your AI naturally:

### Saving Content

```
"Save this idea: what if we used webhooks instead of polling?"
```
→ Creates `MEMORY/ideas/2026-01-21_webhooks-idea.md`

```
"Record this learning: Claude works better with specific examples"
```
→ Creates `MEMORY/learnings/2026-01-21_claude-examples.md`

```
"Save this research to memory"
```
→ Creates `MEMORY/research/2026-01-21_[topic].md`

### Retrieving Content

```
"What ideas have I saved recently?"
```
→ AI reads from `MEMORY/ideas/`

```
"What did I learn about API design?"
```
→ AI searches `MEMORY/learnings/`

```
"Show me my recent research"
```
→ AI lists files in `MEMORY/research/`

### Building On Previous Work

```
"Continue the research from yesterday on authentication patterns"
```
→ AI reads previous file, adds new content

```
"What decisions have I made about the database?"
```
→ AI searches `MEMORY/decisions/` for relevant entries

---

## File Naming Convention

I use this format for consistency:

```
YYYY-MM-DD_short-description.md
```

Examples:
- `2026-01-21_webhooks-vs-polling.md`
- `2026-01-15_auth-architecture-decision.md`
- `2026-01-10_fabric-patterns-research.md`

This keeps files sorted chronologically and makes them easy to scan.

---

## Integration with Fabric Patterns

This pairs well with [Fabric patterns](/blogs/fabric-tutorial/). When you run `extract_wisdom` on a podcast or article, save the output directly to your memory:

```
"Use extract_wisdom on this transcript and save it to research"
```

Now that insight is permanently captured and searchable.

---

## The Work/ Directory

For active tasks, I use a separate `Work/` directory with per-task folders:

```
Work/
└── Website-Redesign_2026-01-20/
    ├── Work.md           # Goal, status, notes
    ├── Output/           # Deliverables
    └── Learning/         # What I learned
```

When a task is done, learnings get promoted to the main `learnings/` folder, and the work directory gets archived.

---

## Tips

1. **Be consistent with commands** — Pick phrases like "save this idea" and stick with them
2. **Date everything** — Makes it easy to find recent vs. old content
3. **Don't over-organize** — Five folders is plenty. Add more only when needed
4. **Review periodically** — Skim your ideas and learnings monthly
5. **Let the AI summarize** — Ask "summarize my learnings from this month"

---

## Why Not Just Use Obsidian/Notion?

You can! This approach works alongside those tools:

- **Obsidian**: Point a vault at `MEMORY/` and get graph view, search, and plugins
- **Notion**: Harder to integrate, but you could sync key files
- **Apple Notes**: Use for quick mobile capture, then migrate important notes to `MEMORY/`

The point isn't to replace your favorite app—it's to have a shared space where your AI can participate fully.

---

## What You Get

After a few weeks of use, you'll have:

- A searchable archive of your research
- A log of decisions and their rationale
- Ideas captured before they evaporate
- Learnings that compound over time
- An AI that knows your context

Your AI becomes less of a stateless chatbot and more of a collaborator with memory.

---

The best note-taking system is one you actually use. By making your AI a full participant, you remove the friction of maintaining it alone.
