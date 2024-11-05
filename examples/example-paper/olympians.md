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
``` js {hide=true}
olympiansSubset = olympians.slice(0, 500)
---
selection1 = []
---
filter = []
---
annotation = []
// ---
// spanish = olympiansSubset.filter(x => x.nationality === 'ESP');
```

``` js
JSON.stringify(olympiansSubset[0])
```

::: divi-viz {}
``` js
Plot.plot({
  grid: true,
  x: {label: "height"},
  y: {label: "weight"},
  marks: [
    Plot.dot(olympiansSubset, {x: "height", y: "weight"})
  ]
})
```
:::

<!-- [Spain](`selection1=spanish`) -->
Select by countries, sports

# Conclusion