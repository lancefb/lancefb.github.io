---
title: "The Beauty In Numbers, 2a: Circular Matrices"
date: 2019-02-10T22:06:00.003Z
tags: ["Beauty", "Numbers", "Inspired Geometry"]
author: "L. Barker"
---

[![](/images/16261f6b338d_circMatrixT1.png)](/images/dfa0ee461537_circMatrixT1.png)

I consider myself a fledgling geometer. That is, someone who is inspired by the beauty in numbers and wants to make stuff in that realm. Geometric images and like that. Some call it Sacred Geometry. I prefer to call it Inspired Geometry. So, I'm an Inspired Geometer? Okay. I can go with that.

For many months now, I have been studying and playing with transforming numbers into pictures. I've been using a programming language called R. It is an astonishingly powerful tool. I started out being interested in using it to wrangle datasets around. I'm fascinated with big data, like many others these days. But then I discovered the expressive capacity to make art. I'm hooked. Shall I call it aRt?

Besides being free, one of the benefits of R is that if is supported the world over and contains a huge depository of libraries that people have contributed that extend the capacity of R to do all sorts of things. Many are mundane. Many are wild and wonderful.

A man named **Zuguang Gu** has created a huge library package call **circlize** that takes numeric data and creates visualizations in the circular. It is an astonishing achievement IMHO.

[![](/images/70eb8281a991_circR_ZuGu.png)](/images/b581cc338683_circR_ZuGu.png)

If you're inclined, you can learn more about it **[HERE](https://jokergoo.github.io/circlize_book/book/)**. And you can learn more about **[R HERE](https://en.wikipedia.org/wiki/R_(programming_language))**.

I could get lost in this package alone for years, but I've much else to do, eh? So when I found out that I can transform a simple matrix into a circular geometric shape, I quickly fell in love with the possibilities.

In it's simplest form, a matrix is a rectangular array of numbers arranged in rows and columns. Here is a 2 x 3 matrix of random numbers.

![](https://wikimedia.org/api/rest_v1/media/math/render/svg/d16330f5f99566fa754114ff04cd176d6185c796)

In R, you can create a 5 x 5 matrix consisting of the number 1 like this:

matrix(1, 5, 5)
It would look something like this:

[![](/images/49ea01fdfaad_matrix5.png)](/images/0a0a2547e87e_matrix5.png)

The simplest one line R program to generate a visualization of this using the **circlize** library, might look like:

circlize::chordDiagram(matrix(1, 5, 5))
Amazingly, this one line program generates this image:

[![](/images/f97247e16569_CircMat5.jpeg)](/images/2612ecd92655_CircMat5.jpeg)

This is because **circlize** appends a lot of default properties to its use. In order to get to something much simpler that I liked:

[![](/images/fdda57dcc577_circMat5_BW.jpeg)](/images/c20fed3a0fb0_circMat5_BW.jpeg)

I had to add more to the program, writing this:

par(mar = c(1, 1, 1, 1), bg="white")
circlize::chordDiagram(matrix(1, 5, 5),
                       col="black",
                       symmetric = TRUE,
                       transparency = 0.25,
                       annotationTrack = NULL)

I spent weeks experimenting with colors, transparency and values to get to this point:

[![](/images/2d2bd5eaa0c5_circMatrix20.1.png)](/images/0d5234cbd979_circMatrix20.1.png)

Next I want to transfer some of these images onto a canvas with oils.  Then, make animated movies.
