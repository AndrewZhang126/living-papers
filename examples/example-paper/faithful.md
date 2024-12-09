---
title: Examination of Old Faithful Eruptions
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

Old Faithful [@faithful] is a highly predictable geyser in Yellowstone National Park that erupts about every 45 minutes to two hours. Following the data from this paper [@doi:10.2307/2347385], we can examine the the duration of eruptions and how that relates to how long it takes for the next eruption.

# Eruption Analysis
We demonstrate two visualizations: the first is a scatterplot of the length of the eruption versus the waiting time between eruptions and the second is a bar chart of the frequency of the different lengths of eruptions. From both charts, we can distinctly see two clusters of eruptions based on their length.

First we can examine the shorter [~2 minute eruptions](`simpleFilter1=[['eruptions',0,2.5]]`). Notice that the most frequent of these shorter eruptions lasts around [1.8 to 1.9 minutes](`simpleFilter1=[['eruptions',1.8,1.9]]`). We can then examine the longer [~4 min eruptions](`simpleFilter1=[['eruptions',3.5,5.5]]`). It seems the most frequent of these longer eruptions lasts around [4.5 to 4.6 minutes](`simpleFilter1=[['eruptions',4.5,4.6]]`)

```js
simpleFilter1 = []
---
faithful = FileAttachment('faithful.tsv').tsv({ typed: true })
---
bandwidth = 20
```
::: divi-viz {simpleFilter=`simpleFilter1`}
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

::: divi-viz {simpleFilter=`simpleFilter1`}
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

~~~ bibliography
@misc{faithful,
  title = {Old Faithful},
  year = {2024},
  url = {https://en.wikipedia.org/wiki/Old_Faithful}
}
~~~
