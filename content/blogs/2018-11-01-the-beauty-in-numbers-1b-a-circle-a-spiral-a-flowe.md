---
title: "The Beauty In Numbers, 1b:  A circle, a spiral, a flower."
date: 2018-11-01T15:00:00Z
tags: ["Beauty", "Numbers", "Inspired Geometry"]
author: "L. Barker"
---

[](/images/55166c63ae25_GoldenAngle.png)[![](/images/c574bc85cb4c_sunflower.jpg)](/images/e6fb33f35bd6_sunflower.jpg)

[![](/images/ba7d9b819398_GoldenAngle.png)](/images/55166c63ae25_GoldenAngle.png)

A curve that starts from a point and moves farther away as it revolves around the point is called a spiral.

[](https://www.blogger.com/blogger.g?blogID=3106513228294325841)

These happen everywhere in nature.  Spiral curves are seen in the way plants arrange their leaves in circular patterns. It turns out, rather beautifully, that these plant spirals are often formed according to something called the Golden Angle, which in turn, is related to the Golden Ratio, also seen in the Fibonacci series. I won't go into the Golden Ratio here( dude, **look it up!** [](https://en.wikipedia.org/wiki/Golden_ratio)), but the Golden Angle seen below as angle ***b*** can be thought of this way: the ratio of the arc of *b* to ***a*** is the same as the ratio of ***a ***to the entire circle.

[![](/images/a0729814071a_220px-Golden_Angle.jpg)](/images/19551a7d4d5c_220px-Golden_Angle.jpg)

Another way to calculate it: Golden Angle = π(3 − √5) = roughly 2.4 radians = roughly 137.5 degrees.

Now, if we plot 500 points, plugging in the Golden Angle in R, the code would look like this:

# Defining the number of points

points = 500

# Defining the Golden Angle

angle = pi*(3-sqrt(5))

t = (1:points) * angle

x = sin(t)

y = cos(t)

df = data.frame(t, x, y)

resulting in

[![](/images/9d4a72b76687_GAngleFlowerPlot.jpeg)](/images/1453523901ff_GAngleFlowerPlot.jpeg)

[](https://www.blogger.com/blogger.g?blogID=3106513228294325841)

and if we clean it up and add some color, we get

[![](/images/b0c9384d05d2_ColorFlowerPlot.jpeg)](/images/76185d273034_ColorFlowerPlot.jpeg)

Cool. I LOVE this!
