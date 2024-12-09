# DIVI-Viz Documentation

## Running Example Articles

For penguins article
 - Run `npm run build-penguins` to compile the article

For Old Faithful article
 - Run `npm run build-faithful` to compile the article

For Olympians article
 - Run `npm run build-olympians` to compile the article

## DIVI-Viz Parameters

There are two parameters that `divi-viz` takes:
- `simpleFilter: Array<[string, (number|string), (number|undefined)]`: A list of data entries specifying the filtering constraints for attributes defined within the chart, where each entry contains either: (1) attribute name (string) and exact value to match (string|number) or (2) attribute name (string), minimum value of desired range (number), and maximum value of desired range (number)
- `filter : Array<Object>`: A list of data entries specifying the filtering constraints for attributes not defined within the chart, where each entry is an object from the original dataset. It is expected this list will be created using the `filter()` method in JavaScript

A typical workflow is to
1. initialize a list that will represent the interactions to be performed
2. create the `divi-viz` component with the desired parameters and chart
3. If using `filter` and not `simpleFilter`, use JavaScript to perform filtering
3. Use inline syntax to set initialized list to new list to show changes

## DIVI-Viz Examples

### Example of `simpleFilter`

Here is an example using `simpleFilter`:
Suppose we have a dataset called `data` of Objects with attributes `height`, `width`, `weight`. We create a scatterplot of height and weight using `divi-viz` and we want to filter by objects with height between 10 and 20. We would do the following:

First define a list:
````
``` js 
simpleFilter1 = []
```
````

Then create the component with the parameter
````
::: divi-viz {simpleFilter=`simpleFilter1`}
``` js
Plot.plot({
  x: {label: "height"},
  y: {label: "weight"},
  marks: [
    Plot.dot(data, {x: "height", y: "weight"})
  ]
})
```
:::
````

Finally use the inline link syntax to show the changes
```
[Click here to show changes](`simpleFilter1=[['height',10,20]]`)
```

### Example of `filter`

Here is an example using `filter`:
Suppose on the same dataset we want to filter by objects with width between 3 and 5. Since our chart does not contain the width attribute we would need to use `filter` instead of `simpleFilter`. We would do the following:

First initialize a list:
````
``` js 
filter1 = []
```
````

Next create the component with the parameter
````
::: divi-viz {filter=`filter1`}
``` js
Plot.plot({
  x: {label: "height"},
  y: {label: "weight"},
  marks: [
    Plot.dot(data, {x: "height", y: "weight"})
  ]
})
```
:::
````

Then define the filtered list based on weight:
````
``` js 
filteredOnWidth = data.filter(x => x.width >= 3 && x.width <= 5);
```
````

Finally use the inline link syntax to show the changes
```
[Click here to show changes](`filter1=filteredOnWidth`)
```