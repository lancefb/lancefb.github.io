---
title: "Boxed In: a look at recursion"
date: 2019-07-03T04:16:00Z
tags: ["Beauty", "Numbers", "Inspired Geometry", "Art", "Experiment"]
author: "L. Barker"
featureimage: "/images/boxed-in-a-look-at-recursion.webp"
---

[![](/images/boxed-in-a-look-at-recursion.webp)](/images/boxed-in-a-look-at-recursion.webp)

##
"To understand recursion, you must understand recursion."

*(How I love this.)*

I made one of my little generative art animations with the idea of seeing what kind of effect I could get from recursively drawing some simple shape or shapes over and over again with small changes.

I used just a box and a circle and came up with this:

<video controls width="100%">
    <source src="/videos/BoxedIn.mp4" type="video/mp4">
  </video>

While coding, this happens when a function being defined is applied within it's own definition, like this:

```javascript
function makeBox(x, y, s) {
    translate(x, y);
    rotate(s / 10 + (col / 2) % 360);
    // blah, blah, blah
    {
        makeBox(x + s / 4, y, s / 2);
        makeBox(x - s / 4, y, s / 2);
        makeBox(x, y + s / 4, s / 2);
    }
}
```

In this case the function **makeBox** calls itself within it's own definition. This can be very powerful. And so much fun!

I hope you enjoy.
