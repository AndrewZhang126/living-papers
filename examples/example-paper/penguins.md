---
title: Dimorphism within a Community of Antarctic Penguins
author:
  - name: Andrew Zhang
    email: azhang26@uw.edu
    org: University of Washington
    city: Seattle
    state: WA
    country: United States
year: 2024
output:
  html: true
---


# Background
[Palmer penguins](https://allisonhorst.github.io/palmerpenguins/)
Males and females of the same species can have different traits related to their role within an ecosystem. This is known as 
ecological sexual dimorphism. In this paper [@doi:10.1371/journal.pone.0090081], the authors seeks to explore ecological sexual dimorphism among species of *Pygoscelis* penguins. They examine if foraging niche are more pronounced in sexually dimorphic species by collecting data from chinstrap, Adelie, and gentoo penguins.
<!-- [This Adelie penguin has the smallest mass](`selection1=[['body_mass_g →',-1760.0187921524039]], annotation1=[], filter1=[]`).

[These are the largest penguins](`filter1=[['body_mass_g →',1000,2000]], annotation1=[[6000,1000,'Largest Gentoo penguins']]`) is an outlier.  -->

# Body Mass Analysis

<!-- ::: divi-viz {modes=`modes1` values=`values1`} -->
Body mass of species. Click to show male/female chinstrap, Adelie, and gentoo penguins. Show that Adelies and gentoos were more sexually dimorphic in body mass. 

::: divi-viz {selection=`selection1` annotation=`annotation1` filter=`filter1`}
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


# Culmen and Flipper Analysis

Show that Chinstraps were more sexually dimorphic in culmen and flippers by again clicking to show male/female chinstrap, Adelie, and gentoo penguins. 
<!-- [Adelie penguins have a large range of body mass values](`selection1=adelie, annotation1=[[5000,'Adelie','Adelie']]`). -->
```js { hide=true }
selection1 = []
---
annotation1 = []
---
filter1 = []
---
femaleAdelineMass = penguins.filter(x => x.species === 'Adelie' && x.sex === 'FEMALE').map(x => {
  return [x.body_mass_g, x.species]
})
---
adelieMass = penguins.filter(x => x.species === 'Adelie').map(x => {
  return [x.culmen_length_mm, x.flipper_length_mm]
})
```

::: divi-viz
``` js
Plot.plot({
  grid: true,
  x: {label: "Culmen length (mm)"},
  y: {label: "Flipper length (mm)"},
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "flipper_length_mm", stroke: "species"})
  ]
})
```
:::


<!-- ::: divi-viz {}
``` js
Plot.plot({
  y: {grid: true},
  marks: [
    Plot.dot(penguins, Plot.dodgeX("middle", {fx: "species", y: "body_mass_g", fill: "sex"}))
  ]
})
```
::: -->
# Simpson's Paradox

culmne length vs culmen depth
[Simpson's paradox](https://observablehq.com/@observablehq/plot-linear-regression-simpson)
Highlight each species, which seems to each have positive correlation (longer culmens have longer depth). 
However, overall data is negatively correlated. 

``` js {hide=true}
selection10 = []
---
adelie = penguins.filter(x => x.species === 'Adelie').map(x => {
  return ['culmen_length_mm →',x.culmen_length_mm]
})
```

[Adeline penguins](`selection10=adelie`)

::: divi-viz {selection=`selection10`}
``` js
Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"}).plot()
```
:::

# Conclusion

Chinstraps were found to be the most sexually size dimorphic, followed by gentoos. The paper also found that male chinstraps and gentoos were also enriched with certain isotopic nitrogen relative to females, thus revealing a foraging niche. 