---
title: "Pushback Jack: When the Cartoon Got Too Complicated"
date: 2026-02-25
tags: ["AI", "Satire", "Video", "Remotion", "Creative", "Tech"]
author: "L. Barker"
featureimage: "/images/pushback-jack-studio.webp"
---

[![](/images/pushback-jack-studio.webp)](/images/pushback-jack-studio.webp)

This one starts with a failed project.

A while back I wrote about [MAGA Mick](/blogs/2025-04-08-red-hats-cold-feet/) — a cartoon character I was building in CreateStudio4. A flannel-wearing Republican voter, slowly reckoning with the gap between what he'd been told and what he was seeing. Satirical cards, one after the other. The premise was solid. The execution? Brutal.

The problem wasn't the character. It was the production. Every card, every caption, every scene change — done by hand in the GUI. If you wanted five different videos on five different topics, you were doing it five times. From scratch. There was no pipeline. There was only labor.

So the cartoon sat there. And I sat here. And eventually I started thinking about the problem differently.

---

## The Re-engineering

What I actually wanted was a **format**, not a project. Something repeatable. A character who shows up, holds up a card, flips to the next one, exits. The text changes. The character doesn't. You write the cards, hit render, get a video.

That's Pushback Jack.

Jack is a lumberjack — straight-backed, bearded, toque, the kind of guy who has seen some things and is done pretending they make sense. He holds cue cards. Each card has two parts: a thing that gets said with great confidence, and the thing that quietly makes it ridiculous.

He's not political. That was the other big shift from the MAGA Mick days. Politics is exhausting and everyone's tired of being argued at. Jack pushes back on **cognitive bias and group-think** — the stuff that cuts across all of it. AI hype. Media spin. Study of the week. The gap between what gets announced and what actually happens.

Dry. Deadpan. Defensible.

---

## The Stack

The setup is a hybrid of GUI animation and code:

**[CreateStudio4](https://createstudio.com/)** handles the character. Jack is a 3D-rigged figure with a pre-built card-flip animation. Export is a VP9 WebM with an alpha channel — Jack floats over a transparent background, physical card prop included.

**[Remotion](https://www.remotion.dev/)** handles the compositing. It's a React-based video renderer that runs in headless Chrome. I write the video as a React component — background image, character video, text overlays, timing, transitions — and it renders to MP4.

The character video composites over the background using the `transparent` prop on Remotion's `OffthreadVideo` component, which preserves the VP9 alpha channel. The card text sits *on top* of the character layer, positioned to land inside the physical card prop's region.

**Content** comes from a `cards.json` file. Two lines per card, separated by a blank line: the setup, and the punchline. Want a new episode? Swap the JSON, render.

The current pipeline:

```
src/cards.json  (topic + cards)
      ↓
npx remotion render PushbackJack out/episode.mp4
      ↓
MP4 at 1280×720, ~15–17 seconds
```

---

## Lumberjack Studios

Every show needs a set.

I generated the Lumberjack Studios backdrop using [Flux Schnell](https://replicate.com/) via Replicate — a woodsy broadcast studio with dark paneled walls, a mounted moose head, pine trees through the window, warm amber lighting, and the Lumberjack Studios sign on the wall. About three cents and one prompt.

The full video has three scenes:

1. **Intro bumper** — the Lumberjack Studios set, title card fades in at the bottom: *Lumberjack Studios Presents / Pushback Jack*
2. **Main segment** — Jack appears via cross dissolve, works through his cards, holds on the last one for two seconds
3. **Outro** — Jack fades out, the studio remains, tagline fades in: *Pushing back against group-think and cognitive bias*

---

## A Few Things I Learned the Hard Way

Getting `OffthreadVideo` with a VP9 alpha channel to composite correctly over a real background image took a few iterations:

- The video component **must be wrapped in `AbsoluteFill`** — otherwise Remotion's flex layout pushes it off screen
- The `transparent` prop is **required** for alpha to work against anything other than a solid color background
- The card text layers go **above** Jack in the DOM — the physical card prop in the WebM is opaque, so text behind it disappears
- Don't add a CSS background to the text overlay — Jack's physical card already provides the white surface

None of this is in the docs. All of it is in the render output.

---

## What's Next

The format is working. The pipeline is working. What's missing is the longer clip — Jack needs a 5–6 card animation from CS4, which means a longer WebM with more flips. That's the next CS4 session.

After that: a proper publishing workflow. Write the cards, render, post. The whole thing in under ten minutes.

MAGA Mick got too complicated. Pushback Jack is supposed to be simple. So far, it is.

---

*Lumberjack Studios. We push back so you don't have to.*
