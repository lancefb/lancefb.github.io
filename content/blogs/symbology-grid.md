---
title: "Sigils, Spirals, and Sine Waves"
date: 2026-02-26
draft: false
tags: ["Art", "AI", "Generative Art", "Sacred Geometry", "Music", "Remotion"]
description: "A new generative animation built with AI — occult symbols, sacred geometry, and pure mathematics, synced to a beat."
featureimage: "/images/symbology-grid.webp"
---

[![](/images/symbology-grid.webp)](/images/symbology-grid.webp)

In [Is Generative Art Now Quaint?](/blogs/generative-art-quaint/) I ended with a question dressed up as a statement: *I'm genuinely curious what's possible now.*

This is what's possible now.

**Symbology Grid** is a generative animation — a 12×8 grid of symbols that continuously mutate, and on every beat of the music, selected cells scale outward and rotate, snapping back like a struck bell.

<div>
<video controls style="width:100%;border-radius:4px;margin:1.5rem 0;">
  <source src="/videos/symbology-grid.webm" type="video/webm">
  <source src="/videos/symbology-grid.mp4" type="video/mp4">
</video>
</div>

I built it with Claude.

Not "I described it and Claude built it." More like: I had the vision, I drove the decisions, and Claude wrote the code while I directed, adjusted, and pushed back when something wasn't right. The old friction — hours debugging why a transform was applied in the wrong coordinate space, why randomness wasn't seeding correctly, why the beat sync was drifting — that friction is largely gone. What remains is the part I actually care about.

What to make. And why.

---

The grid draws from three symbol families, arranged along a deliberate spectrum.

On one end: **occult symbols**. Pentagrams, sigils, arrows, geometric abstractions that feel borrowed from a witch's notebook. Forms that carry the weight of being handed down through centuries of mystery — drawn by people trying to name what they couldn't explain.

On the other end: **pure mathematics**. Lissajous figures tracing frequency ratios. Golden spirals growing by φ every quarter turn. Modular arithmetic webs where connecting point *i* to point *i×k* on a circle produces, somehow, a cardioid. Spirograph curves — hypotrochoids — the same patterns I used to make with a plastic wheel and a Bic pen in 1979.

In the middle: **sacred geometry**. Mandalas with n-fold symmetry. Flowers of Life — seven overlapping circles of equal radius, the geometry of packing. Rose curves with 3, 5, and 7 petals. Star polygons: pentagram, heptagram, octagram. Forms that feel like they belong in a temple and also in a textbook.

The spectrum wasn't accidental. Occult symbols and mathematical symbols are both attempts to describe what can't quite be seen directly. One language was handed down through mystery traditions. The other was derived through centuries of proof. Both use abstract forms to reach for something underneath the visible world.

Maybe they're the same impulse wearing different clothes.

---

The animation runs in **Remotion**, a React-based video framework. Every frame is deterministic — seeded with a fixed number, the same video renders identically every time. Beat timestamps were extracted from the audio using **librosa** onset detection, then converted to exact frame numbers. There's no drift, no approximation. When the bass hits at 4.3 seconds, frame 129 fires, and the cells respond.

The whole thing is pre-computed. A timeline built once at setup: initial grid, regen events (one cell replaced every few seconds), beat events. Then `computeState(timeline, frame)` — replay to frame N, return state. Simple. Reproducible. Fast.

It renders to MP4 in a few minutes. Music baked in.

---

I spent a long time in the old workflow. Processing sketches. Hundreds of exported frames. FFmpeg stitching them together. Dropping the audio in manually and nudging the offset until it felt right.

That's gone now. The pipeline is cleaner, the sync is perfect, and the iteration cycle that used to take a day takes an hour.

But the *decisions* — what symbols to put in the grid, what spectrum to place them on, how long the beat pop should last, when the fade should start — those are still mine. Faster tools don't make those choices. They just get out of the way while you make them.

The toolset was upgraded.

The old way was how I got here. This is where *here* leads.

And wherever there is number, there is beauty. Still.
