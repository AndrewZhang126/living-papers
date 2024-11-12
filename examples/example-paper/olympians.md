---
title: Analysis of Athletes from the 2016 Olympic Games
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
The official website of the 2016 Olympic Games in Rio [@olympians] gathered data for every athlete and their characteristics, such as weight, height, nationality, etc. As such, there can be a lot of interestng analysis to be done on this dataset.

# Analysis of Athletes
``` js {hide=true}
olympiansSubset = olympians.slice(0, 500)
---
simpleFilter1 = []
---
filter1 = []
---
nationality = olympians.filter((x) => x.nationality === "ESP")
//You may want create a new list here for Spanish athletes
```


We would like to filter the data:

- By athletes between 2 and 2.5 meters tall using `simpleFilter`. The change should show when clicking  [here](`simpleFilter1=[['height',2,2.5]]`).

- By athletes only from Spain using `filter` (hint: the dataset has a `nationality` attribute for each athlete and Spain is denoted as 'ESP'). The change should show when clicking [ESP](`filter1=nationality`);

- By something of your choice. You can find more data attributes from the website [@olympians].

::: divi-viz {simpleFilter=`simpleFilter1` filter=`filter1`}
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

~~~ bibliography
@misc{olympians,
  title = {2016 Olympic Games Data},
  year = {2024},
  url = {https://github.com/flother/rio2016}
}
~~~