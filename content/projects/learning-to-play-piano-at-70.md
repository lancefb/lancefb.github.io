---
title: "Learning To Play Piano At 70"
date: 2026-01-23
draft: false
featureimage: "/images/piano-journey.webp"
tags: ["AI", "Music", "Learning"]
---

[![](/images/piano-journey.webp)](/images/piano-journey.webp)

## Overview

I'm learning to play piano at age 70. It’s something I’ve always wanted to do — and now, I’m going for it.

But let’s be honest: the aging brain doesn’t pick things up the way it used to. Motor memory, pattern recognition, even just staying focused — it’s all a little slower, a little harder. I don't have the luxury of wasting time on inefficient practice.

So I'm using AI to help — not just as a tutor, but as a co-pilot in my learning journey.

## The Problem

Traditional music education is built for young learners with endless time and plastic brains. I have some years of music behind me, but my fingers are new to the keyboard. The problem? I need to learn smarter, not harder — and fast.

## The Solution

I'm consulting with some LLMs for ideas and coding up AI-enhanced tools to accelerate the process:
- [Interactive triad visualizers](https://github.com/lancefb/piano-triad-explorer)
- various practice apps
- Spaced repetition tools for chord memory
- Reflective journaling pipelines with AI assistance

## Technical Details

### Stack

- **Frontend:** HTML, JavaScript, TailwindCSS, and who knows what else
- **AI Integration:** ChatGPT, Gemini, Claude
- **Utilities:** Python scripts for MIDI analysis and visualization (maybe -- at least it sounds good)
- **Hosting:** GitHub Pages

### Architecture

The tools are mostly lightweight, client-side apps — some are being prototyped directly in-browser, while others may evolve into standalone Python apps or web utilities. One tool, for instance, is the [Piano Triad Explorer](https://github.com/lancefb/piano-triad-explorer) — it highlights and plays triads on a virtual keyboard based on inversion and root selection.

```javascript
function playTriad(root, type, inversion) {
  // Render the chord on a virtual keyboard and play it
}
```

## Challenges & Learnings

- Adapting AI tools to match *my* learning pace
- Coding for musical accuracy (enharmonic spelling is a beast)
- Designing UI/UX that supports learning, not just interaction

Most importantly, I've learned that curiosity and momentum matter more than speed.

## Results & Impact

The tools are already helping me visualize chords and hear relationships more clearly. I practice more consistently because I can build tools *I want to use*. Friends and collaborators are also curious about using these tools in their own learning.

## Future Plans

- Integrate voice recognition for verbal input?
- Build a “line learner” for playing and repeating short musical phrases
- Create a course-like flow for beginners over 60

---

**Project Status:** Active Development. 
