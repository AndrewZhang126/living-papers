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

[Cluster of shorter ~2 min eruptions](`filter1=[['eruptions',0,2.5]], filter2=[['eruptions',0,2.5]]`)

[It seems the most frequent of the shorter eruptiosn lasts around 1.8 to 1.9 minutes](`filter1=[['eruptions',1.8,1.9]]`)

[Cluster of shorter ~4 min eruptions](`filter1=[['eruptions',3.5,5.5]]`)

[It seems the most frequent of the shorter eruptiosn lasts around 4.5 to 4.6 minutes](`filter1=[['eruptions',4.5,4.6]]`)

```js
filter1 = []
---
annotation1 = []
---
filter2 = []
---
faithful = FileAttachment('faithful.tsv').tsv({ typed: true })
---
bandwidth = 20
```
::: divi-viz {filter=`filter1` annotation=`annotation1`}
``` js
Plot.plot({
  width: 650,
  inset: 20,
  x: {label: "eruptions", domain: [1.5, 5.5]},
  y: {label: "waiting"},
  marks: [
    Plot.density(faithful, {x: "eruptions", y: "waiting", stroke: "steelblue", strokeWidth: 0.25, bandwidth}),
    Plot.density(faithful, {x: "eruptions", y: "waiting", stroke: "steelblue", thresholds: 4, bandwidth}),
    Plot.dot(faithful, {x: "eruptions", y: "waiting", fill: "currentColor", r: 1.5})
  ]
})
```
:::

::: divi-viz {filter=`filter1`}
``` js
Plot.plot({
  width: 650,
  height: 100,
  x: { label: "eruptions", domain: [1.5, 5.5], inset: 20 },
  marks: [
    Plot.rectY(faithful, Plot.binX({y: "count", thresholds: 25}, {x: "eruptions", "fill": "steelblue"}))
  ]
})
```
:::
