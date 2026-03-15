---
title: "What's in the Water (and How I Check)"
date: 2026-03-15
draft: false
tags: ["ai", "tools", "public-health", "claude-code", "pai"]
description: "I built a PAI skill that pulls California wastewater surveillance data from the CDC in one command. Here's what it does and why it matters."
featureimage: "/images/wastewater-ca_500x500.webp"
---

[![](/images/wastewater-ca_500x500.webp)](/images/wastewater-ca_500x500.webp)

The CDC has been tracking COVID-19 by measuring RNA concentrations in sewage.

No, really. Public health departments collect wastewater from treatment plants, test it for SARS-CoV-2 genetic material, and publish the data. The idea is that people shed the virus in stool days before symptoms show up — which means wastewater is an **early warning system** that doesn't depend on anyone getting tested.

It's open data. Free API. No key required.

So I built a slash command to fetch it.

---

## The Tip That Started It

There's a rotating tips display in the Claude Code CLI. One of them said `/data-wastewater-ca`. I typed it. Nothing happened — the skill was referenced but never installed. Just a tip for something that didn't exist yet.

That's actually a good problem to have. It meant someone thought this was worth having. So I built it.

---

## What the Skill Does

`/data-wastewater-ca` fetches the most recent California wastewater data from the CDC's [National Wastewater Surveillance System](https://www.cdc.gov/nwss/) (NWSS) and displays it in the terminal.

Running it looks like this:

```
╔══════════════════════════════════════════════════════════════╗
║   California Wastewater Surveillance  —  CDC NWSS            ║
╚══════════════════════════════════════════════════════════════╝

  Site:        Los Angeles County (WWTP ID 2536)
  Population:  ~200,000 served
  Pathogen:    SARS-CoV-2 (COVID-19)
  Last update: 2025-09-07
  Detection:   100% of samples positive (15-day window)

  ┌─ Latest Signal ──────────────────────────────────────────┐
  │  15-day change: +8%  →  stable
  │  Percentile:    79.2  — high (historically)
  │  ████████████████░░░░ 79.2th
  └──────────────────────────────────────────────────────────┘

  Weekly trend (most recent first):
  ─────────────────────────────────────────────────────────────
  Date          15d change   Historical pct   Signal
  ─────────────────────────────────────────────────────────────
  2025-09-07         +8%       79.2         →
  2025-09-04       +110%       79.2         ↑
  2025-09-02       +294%       74           ↑
  2025-08-28        +68%       74           ↑
```

Two key numbers:

- **ptc_15d** — the 15-day percent change in RNA concentration. Positive = rising. A jump from +8% to +294% in one week is not subtle.
- **Percentile** — where today's level sits relative to all historical readings. 79th percentile means higher than usual, but not the highest ever recorded.

---

## How It's Built

The skill is a TypeScript file that makes a single `fetch()` call to Socrata — CDC's public data API.

```typescript
const params = new URLSearchParams({
  "$where": `wwtp_id='2536'`,
  "$order": "date_end DESC",
  "$limit": "100",
});
const res = await fetch(`https://data.cdc.gov/resource/2ew6-ywp6.json?${params}`);
```

No authentication. No third-party library. One endpoint, a bit of formatting, done. The whole thing is about 120 lines.

It runs via:

```bash
bun run ~/.claude/skills/WastewaterCA/Tools/FetchWastewaterCA.ts
```

Or just `/data-wastewater-ca` in Claude Code once it's in your skills folder.

---

## Why This Is the Point

The wastewater skill is a small thing — one API, one command, one screen of output. But it illustrates something I find genuinely compelling about having a personal AI infrastructure.

A lot of useful data is publicly available but practically inaccessible. Not because it's locked up, but because:

- You'd have to know it exists
- You'd have to find the right endpoint
- You'd have to figure out the query syntax
- You'd have to decide how to display it
- You'd have to wire it up somewhere you'd actually remember to use it

That's four or five small friction points that add up to "I never do this."

PAI collapses that friction. I noticed the tip, described what I wanted, and had a working skill in one session. Now it's always there. The data that was technically available is now *actually* available — one command away, any time I want it.

That's the whole bet with PAI: make the things you care about easy enough to use that you actually use them.

---

## A Note on CA Coverage

Currently, only one California site reports to CDC NWSS: a treatment plant in LA County serving about 200,000 people. That's not the whole state — it's one data point. The CDC NWSS covers roughly 1,500 sites nationally, and California is sparse.

For broader California coverage, [CDPH runs its own wastewater program](https://www.cdph.ca.gov/Programs/CID/DCDC/Pages/COVID-19/Wastewater-Surveillance.aspx) — but that data requires CSV downloads rather than an API call. A future version of this skill could pull both.

For now, one site is enough to prove the concept. And LA County is not nothing.

---

## Tips

1. **`--weeks=20`** — pass this flag to see more history: `bun run FetchWastewaterCA.ts --weeks=20`
2. **`--raw`** — shows the raw JSON from CDC for debugging or building your own display
3. **The data lags.** CDC publishes weekly, and there's sometimes a gap of several weeks before recent data appears. Don't panic if the most recent date is older than you expect.
4. **The percentile is the more useful number.** A 294% week-over-week spike sounds alarming; a 74th percentile puts it in context.

---

Sewage doesn't lie. Neither does the CLI.
