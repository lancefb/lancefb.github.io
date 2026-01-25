---
title: "The Beauty In Numbers, 1a: Plotting a circle."
date: 2018-10-04T06:36:00.002Z
tags: ["Beauty", "Numbers", "Inspired Geometry"]
author: "L. Barker"
---

[![](/images/88db50ea5faa_500px-Pythagorean.png)](/images/92df208404e2_500px-Pythagorean.png)

Let's use math to draw pictures, shall we? There is a wonderful world out there of representing patterns in nature, especially flowers, in mathematical terms. Ever gazed into a sunflower? I hope so. I'm learning and exploring as I go along here, so I'll start with simple circle plots and move on from there. But where to start?  How about Pythagorus?

*Although it is often argued that knowledge of the theorem predates him, the theorem is named after the ancient Greek mathematician Pythagoras (c. 570–495 BC) as it is he who, by tradition, is credited with its first proof, although no evidence of it exists. There is some evidence that Babylonian mathematicians understood the formula, although little of it indicates an application within a mathematical framework. Mesopotamian, Indian and Chinese mathematicians all discovered the theorem independently and, in some cases, provided proofs for special cases. (Wikipedia)*

The Pythagorean theorem is a wondrous thing, having to do with the relationship among the three sides of a right triangle. The theorem states that the square of the hypotenuse (the side opposite the right angle) is equal to the sum of the squares of the other two sides. It can be written as an equation relating the lengths of the sides a, b and c, :![](https://wikimedia.org/api/rest_v1/media/math/render/svg/92333b53991e3ea02f5d6384bac4911ae3060a1e)

where c represents the length of the hypotenuse and a and b the lengths of the triangle's other two sides.

But how do we turn this into compelling pictures? We can do a lot with this if we use software programs to draw or plot, say, circles. A lot of beautiful geometric patterns come out of circles, including patterns that represent the arrangement of petals and stems in flowers. But how do we get circles out of these triangles? By expressing the Pythagorean theorem in terms of trigonometric functions.

[![](/images/444282a8fd26_Trig_Functions.png)](/images/4f97c61d2bac_Trig_Functions.png)

[![](/images/42f2ba54cd2a_Unit_circle.jpg)](/images/08544a1b5510_Unit_circle.jpg)

We need to move to trigonometry because we need to move beyond solving triangles. Trigonometry give use a mathematical description of our physical world, of things that rotate or vibrate, such as light, sound, the paths of planets about the sun or satellites about the earth. We have to have angles of any size, and to extend to them the meanings of the trigonometric functions.

The Pythagorean trigonometric identity states that sin²(θ) + cos²(θ) = 1 for any real number θ. Since every (x, y) point should be in the unit circle (a circle with a radius of 1), it follows that x² + y² = 1.

Okay. Now that we've established the background information, we can begin building a series of plots. We start by creating a dataset of two variables, x and y. First, we'll draw 50 points on a circle of radius 1. 

In R, some code for drawing (plotting) 50 points in a circle looks like this:

t = seq(0, 2*pi, length.out=50)

x = sin(t)

y = cos(t)

df = data.frame(t, x, y)

 # Make a scatter plot of points in a circle

ggplot(df)

 Running this code results in this:

[![](/images/8331993a8818_PhyPlot1.png)](/images/7a27e4785e5d_PhyPlot1.png)

Very basic, yes? But with various enhancements and tweaks to the code, we can begin to get images that look like the geometry seen in flowers.

Thanks to @aschinchon
