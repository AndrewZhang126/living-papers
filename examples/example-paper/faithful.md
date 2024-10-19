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

[Old Faithful](https://en.wikipedia.org/wiki/Old_Faithful) is a highly predictable geyser in Yellowstone National Park that erupts about every 45 minutes to two hours. Following the data from this paper [@doi:10.2307/2347385], we can examine the the duration of eruptions and how that relates to how long it takes for the next eruption.

# Eruption Analysis

[Cluster of shorter ~2 min eruptions](`filter2=[['eruptions →',0,1]], annotation2=[[2,85,'2 minute eruptions']]`)

[Cluster of shorter ~4 min eruptions](`filter2=[['eruptions →',-2,-1]], annotation2=[[4.5,50,'4 minute eruptions']]`)
```js
filter2 = []
---
annotation2 = []
---
selection3 = []
---
annotation3 = []
---
faithful = FileAttachment('faithful.tsv').tsv({ typed: true })
---
bandwidth = 20
```
::: divi-viz {filter=`filter2` annotation=`annotation2`}
``` js
Plot.plot({
  x: { domain: [1.5, 5.5] },
  width: 650,
  inset: 20,
  marks: [
    Plot.density(faithful, {x: "eruptions", y: "waiting", stroke: "steelblue", strokeWidth: 0.25, bandwidth}),
    Plot.density(faithful, {x: "eruptions", y: "waiting", stroke: "steelblue", thresholds: 4, bandwidth}),
    Plot.dot(faithful, {x: "eruptions", y: "waiting", fill: "currentColor", r: 1.5})
  ]
})
```
:::

::: divi-viz {selection=`selection3` annotation=`annotation3`}
``` js
Plot.plot({
  width: 650,
  height: 100,
  x: { domain: [1.5, 5.5], inset: 20 },
  marks: [
    Plot.rectY(faithful, Plot.binX({y: "count", thresholds: 25}, {x: "eruptions", "fill": "steelblue"}))
  ]
})
```
:::
