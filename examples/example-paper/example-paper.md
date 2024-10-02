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
## With Divi
[Chinstrap penguins generally have smaller body masses than Gentoo penguins](`mode1='select', values1=['Gentoo','Chinstrap']`) 
[This Chinstrap penguin](`mode1='annotation', values1=['body mass = 4,600']`) is an outlier. 
```js
mode1 = 'select'
---
values1 = ['Adelie']
```
::: divi-viz {mode=`mode1` values=`values1`}
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
:::

# Map and Vector Plot

``` js
mode3 = 'select'
---
values3 = ['']
```


<!-- ``` js
population = FileAttachment("population.json").json()
  .then((data) =>
    data
      .slice(1) // removes a header line
      .map(([p, state, county]) => ({
        state,
        fips: `${state}${county}`,
        population: +p
      }))
  )
---
centroid = {
  const path = d3.geoPath();
  return feature => path.centroid(feature);
}
---
us = FileAttachment("counties-albers-10m.json").json()
---
nation = topojson.feature(us, us.objects.nation)
---
statemap = new Map(topojson.feature(us, us.objects.states).features.map(d => [d.id, d]))
---
countymap = new Map(topojson.feature(us, us.objects.counties).features.map(d => [d.id, d]))
---
statemesh = topojson.mesh(us, us.objects.states, (a, b) => a !== b)
---
spike = (length, width = 7) => `M${-width / 2},0L0,${-length}L${width / 2},0`
---
map = Plot.plot({
  width: 975,
  projection: "identity",
  length: {range: [0, 200]},
  marks: [
    Plot.geo(nation, { fill: "#eee" }),
    Plot.geo(statemesh, { stroke: "white" }),
    Plot.spike(population, Plot.centroid({length: "population", geometry: ({fips}) => countymap.get(fips)}))
  ]
}) 
```-->
::: divi-viz {mode=`mode2` values=`values2`}
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
:::

<!-- ::: divi-viz {mode=`mode3` values=`values3`}
```js
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