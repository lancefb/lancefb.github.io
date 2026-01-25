---
title: "Latest image"
date: 2019-04-12T19:10:00Z
tags: ["Beauty", "Numbers", "Inspired Geometry", "Art"]
author: "L. Barker"
---

The latest image from my generative art series was a nice surprise.

 It started as this:

for (i in 1:500)

{

x = x*((0.98)^i)*cos(i)

y = y*((0.98)^i)*sin(i)

}

which is simple R code that generates 500 x, y points that spiral. That code gave me this:

 

[![](/images/25fd62257e25_points500.png)](/images/218ed02c9eb9_points500.png)

Next, I replaced the dots with line segments. This looks much different.

[![](/images/b3370fd1ff5e_p500_path.png)](/images/f1c58ad685bf_p500_path.png)

Finally, I ran an image processing script over it. The short version is that the script connects dots with a series of lines. That script spit this image out, which I love:

[![](/images/644dcd3639df_sfSrl2.png)](/images/f36a6ba09798_sfSrl2.png)

There are a lot of possible permutations of this I want to explore later. Like:

[![](/images/e4504c772b62_p250x96.png)](/images/ce8efc9cafba_p250x96.png)
