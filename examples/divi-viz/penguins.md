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
Males and females of the same species can have different traits related to their role within an ecosystem. This is known as 
ecological sexual dimorphism. In this paper [@doi:10.1371/journal.pone.0090081], the authors seeks to explore ecological sexual dimorphism among Palmer penguins[@penguins], species of penguins observed on the islands of the Palmer Archipelago in Antarctica.  They examine if foraging niche are more pronounced in sexually dimorphic species by collecting data from Chinstrap, Adelie, and Gentoo penguins.

# Culmen and Flipper Analysis
In the following visualization, we plot the culmen (or bill) length and the flipper length of all observed penguins. 

```js { hide=true }
filter1 = []
---
annotation1 = [[2000,2000,"test"]]
---
adelie = penguins.filter(x => x.species === 'Adelie');
---
adelieFemale = adelie.filter(x => x.sex === 'FEMALE');
---
adelieMale = adelie.filter(x => x.sex === 'MALE');
---
chinstrap = penguins.filter(x => x.species === 'Chinstrap');
---
chinstrapFemale = chinstrap.filter(x => x.sex === 'FEMALE');
---
chinstrapMale = chinstrap.filter(x => x.sex === 'MALE');
---
gentoo = penguins.filter(x => x.species === 'Gentoo');
---
gentooFemale = gentoo.filter(x => x.sex === 'FEMALE');
---
gentooMale = gentoo.filter(x => x.sex === 'MALE');
```

::: divi-viz {filter=`filter1` annotation=`annotation1`}
``` js
Plot.plot({
  grid: true,
  x: {label: "culmen_length_mm"},
  y: {label: "flipper_length_mm"},
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "flipper_length_mm"})
  ]
})
```
:::

Here are all the [Adelie penguins](`filter1=adelie, annotation1=[[44,185,'Adelie penguins']]`). Within the Adelie penguins, we can observe the [females](`filter1=adelieFemale, annotation1=[[40,177,'Female Adelie penguins']]`) and [males](`filter1=adelieMale, annotation1=[[44,190,'Male Adelie penguins']]`). Similarly here are all [Chinstrap penguins](`filter1=chinstrap, annotation1=[[50,185,'Chinstrap penguins']]`) and the [female](`filter1=chinstrapFemale, annotation1=[[47,180,'Female Chinstrap penguins']]`) and [males](`filter1=chinstrapMale, annotation1=[[53,195,'Male Chinstrap penguins']]`).Finally, observe the [Gentoo penguins](`filter1=gentoo, annotation1=[[50,210,'Gentoo penguins']]`) along with their [females](`filter1=gentooFemale, annotation1=[[46,205,'Female Gentoo penguins']]`) and [males](`filter1=gentooMale, annotation1=[[53,215,'Male Gentoo penguins']]`). Notice the dimorphism in each of the species, which is evident by the clear separation in culmen and flipper length depending on sex. Further, notice that Chinstrap penguins are more sexually dimorphic sex as penguins of the same sex are more closely clustered together and shares less overlap compared to the other species.

# Simpson's Paradox

``` js {hide=true}
filter2 = []
```
Within this dataset, we can also observe a phenonenom called the Simpson's paradox [@simpsons].
Highlight each species, which seems to each have positive correlation (longer culmens have longer depth). 
However, overall data is negatively correlated. 
In the following chart graphing penguins based on their culmen length and depth, we can look at each species individually, namely the [Adelie](`filter2=adelie`), [Chinstrap](`filter2=chinstrap`), and [Gentoo](`filter2=gentoo`). Notice that each species individually looks positively correlated (penguins with longer culmen length tend to have larger culmen depth as well). However, when looking at the [overall data](`filter2=[]`), culmen length and culmen depth are actually negatively correlated. As such, this demonstrates the Simpson's paradox, which is where a certain trend appears in several groups of data but is nonexistent or reversed when the groups are combined. 

::: divi-viz {filter=`filter2`}
``` js
Plot.plot({
  grid: true,
  x: {label: "culmen_length_mm"},
  y: {label: "culmen_depth_mm"},
  marks: [
    Plot.dot(penguins, {x: "culmen_length_mm", y: "culmen_depth_mm"})
  ]
})
```
:::

# Conclusion

From analyzing the dataset, Chinstraps were found to be the most sexually size dimorphic, followed by Gentoos and Adelies. The original paper also found that male Chinstraps and Gentoos were also enriched with certain isotopic nitrogen relative to females, thus revealing a foraging niche. 

~~~ bibliography
@misc{penguins,
  title = {Palmer Penguins},
  year = {2024},
  url = {https://allisonhorst.github.io/palmerpenguins/}
}

@misc{simpsons,
  title = {Simpson's Paradox},
  year = {2024},
  url = {https://observablehq.com/@observablehq/plot-linear-regression-simpson}
}
~~~