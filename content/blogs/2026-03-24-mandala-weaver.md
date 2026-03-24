---
title: "Mandala Weaver"
date: 2026-03-24
draft: false
tags: ["Art", "AI", "Generative Art", "Music", "p5.js"]
description: "Two old sketches — a deformed tangram rug and a radial mandala — finally introduced to each other."
featureimage: "/images/mandala-weaver.webp"
---

[![](/images/mandala-weaver.webp)](/images/mandala-weaver.webp)

Two sketches had been sitting on my desktop for months — separately, doing nothing.

One generates rugs: deformed tangram grids, each cell filled with hatching, colors drawn from a random palette, tile edges warped by a slow sine function so the grid breathes instead of sitting still. The other draws mandalas: radial curves that follow the mouse, a handful of parameters controlling how the arms splay and bend and spread.

I kept thinking they might belong together.

---

**Try it.** Move your mouse to shape the mandala. Click to generate a new rug. Press Space to start the music and let the piece run on its own.

<div style="margin: 1.5rem 0; border-radius: 4px; overflow: hidden; background: #000;">
  <iframe
    src="/sketches/mandala-weaver/"
    style="width: 100%; height: 580px; border: none; display: block;"
    allow="autoplay"
    title="Mandala Weaver — interactive generative sketch"
  ></iframe>
</div>

---

The rug renders once at setup, then freezes — captured as a pixel snapshot, stamped behind every frame. The mandala draws on top of it, using the rug's own palette so the two feel like they know each other. When you press Space, the music starts and the mandala begins to move on its own: slow oscillations in arm count, spread, and curvature, interrupted on every beat with a small pulse. Every twelfth beat, a new rug. New colors, new geometry, new frame for the same mandala.

The beat timestamps came from librosa. The music is mine.

---

I've made a lot of these over the years. Most of them live on old hard drives, rendered as still images or short video loops, interesting to me for a week and then forgotten. What's different now is the iteration speed — not just the code, but the *composition* loop. Hear it wrong, fix it, hear it again. Decide the rug is too dominant. Decide the arm count needs to start higher. Actually, lower. The decisions that used to take a day of debugging take an hour of directing.

What doesn't change is whether you know what you want. That's still on you.

---

Here's the rendered version — title card, the full 43 seconds, music baked in:

<div>
<video controls style="width:100%;border-radius:4px;margin:1.5rem 0;">
  <source src="/videos/mandalaweaver-square.webm" type="video/webm">
</video>
</div>
