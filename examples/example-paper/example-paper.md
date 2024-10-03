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


# Scatter and Dot Plot
<!-- ``` js
Plot.plot({
  marginLeft: 60,
  x: {inset: 10},
  y: {label: null},
  marks: [
    Plot.dot(penguins, {x: "body_mass_g", y: "species", stroke: "sex"})
  ]
})
``` -->
## With Divi
[Chinstrap penguins generally have smaller body masses than Gentoo penguins](`selection1=chinstraps`).

[This Chinstrap penguin](`annotation1=[[4000,'Chinstrap','body mass = 4000']]`) is an outlier. 

[Adelie penguins have a large range of body mass values](`selection1=adelie, annotation1=[[5000,'Adelie','Adelie']]`).
```js
selection1 = []
---
annotation1 = []
---
chinstraps = Array.from({length: 210 - 160 + 1}, (v, k) => k + 160);
---
adelie = Array.from({length: 100 - 0 + 1}, (v, k) => k + 0);
```
<!-- ::: divi-viz {modes=`modes1` values=`values1`} -->
::: divi-viz {selection=`selection1` annotation=`annotation1`}
``` js
Plot.plot({
  marginLeft: 60,
  x: {inset: 10},
  y: {label: null},
  marks: [
    Plot.dot(penguins, {x: "body_mass_g", y: "species", stroke: "sex"})
  ]
})
```
:::


<!-- 
# Histogram and Density Plot
[Cluster of shorter ~2 min eruptions](`mode2='select', values2=['2']`)
[Cluster of longer ~4 min eruptions](`mode2='select', values2=['4']`)
```js
mode2 = 'select'
---
values2 = ['']
```
::: divi-viz {mode=`mode2` values=`values2`}
``` js
faithful = FileAttachment('faithful.tsv').tsv({ typed: true })
---
bandwidth = 20
---
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
::: -->

<!-- # Map and Vector Plot

``` js
mode3 = 'select'
---
values3 = ['']
``` -->

<!-- ::: divi-viz {mode=`mode2` values=`values2`}
``` js
election = FileAttachment("us-presidential-election-2020.csv").csv()
---
us = FileAttachment("us-counties-10m.json").json()
---
nation = topojson.feature(us, us.objects.nation)
---
statemesh = topojson.mesh(us, us.objects.states)
---
counties = {
  const counties = topojson.feature(us, us.objects.counties).features;
  const _election = new Map(election.map((d) => [d.fips, d]));
  counties.forEach(county => {
    county.properties.margin2020 = +_election.get(county.id)?.margin2020;
    county.properties.votes = +_election.get(county.id)?.votes;
  });
  return counties;
}
---
Plot.plot({
  projection: "albers-usa",
  length: {type: "sqrt", transform: Math.abs},
  marks: [
    Plot.geo(statemesh, {strokeWidth: 0.5}),
    Plot.geo(nation),
    Plot.vector(
      counties,
      Plot.centroid({
        anchor: "start",
        length: (d) => d.properties.margin2020 * d.properties.votes,
        stroke: (d) => d.properties.margin2020 > 0 ? "red" : "blue",
        rotate: (d) => d.properties.margin2020 > 0 ? 60 : -60
      })
    )
  ]
})
```
::: -->
