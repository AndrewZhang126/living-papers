---
title: Example Living Papers DIVI
author:
  - name: Andrew Zhang
    email: azhang26@uw.edu
    org: University of Washington
    city: Seattle
    state: WA
    country: United States
keywords:
  - data visualizations
year: 2024
output:
  html: true
---

# Background

[This data](https://github.com/flother/rio2016) is gathered from the official website of the 2016 Olympic Games in Rio. This contains data related to every athlete and their characteristics, such as weight, height, nationality, etc. As such, there can be
a lot of interestng analysis to be done. 

# Analysis of Athletes
``` js
filter4 = []
---
annotation4 = []
```


::: divi-viz {}
``` js
Plot.dot(olympians, {
  x: "weight",
  y: "height",
}).plot()
```
:::

Select by countries, sports

# Conclusion