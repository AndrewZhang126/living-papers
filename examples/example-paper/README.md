# Living Papers with DIVI Examples

For penguins article
 - Run `npm run build-penguins` to compile the article

For Old Faithful article
 - Run `npm run build-faithful` to compile the article

For Olympians article
 - Run `npm run build-olympians` to compile the article

There are two parameters that `divi-viz` takes:
- `simpleFilter : List[List[]]` is for filtering on attributes defined within the plot. It is a list of lists, each list is either of the form [`attribute`, `minValue`, `maxValue`] to filter by a range of values or [`attribute`, `value`] to filter by specific values

- `filter : List[Object]` is for filtering on attributes not defined within the plot. It is a list of Objects, which can be created by performing standard filtering in JavaScript on the dataset using the `filter` method

A typical workflow is to
1. initialize a list that will represent the interactions to be performed
2. create the `divi-viz` component with the desired parameters and chart
3. If using `filter` and not `simpleFilter`, use JavaScript to perform filtering
3. Use inline syntax to set initialized list to new list to show changes

# SimpleFilter Example
Here is an example using `simpleFilter`:
Suppose we have a dataset of Objects with attributes `height`, `width`, `weight`. We create a scatterplot of height and weight using `divi-viz` and we want to filter by objects with height between 10 and 20. We would do the following:

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
Plot.plot(data)
```
:::
````

Finally use the inline syntax to show the changes
```
[Click here to show changes](`simpleFilter1=[['height',10,20]]`)
```

# Filter Example

Here is an example using `filter`:
Suppose on the same dataset we want to filter by objects with weight between 3 and 5. Since our chart does not contain the weight attribute we would need to use `filter` instead of `simpleFilter`. We would do the following:

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
Plot.plot(data)
```
:::
````

Then define the filtered list based on weight:
````
``` js 
filteredOnWeight = data.filter(x => x.weight >= 3 && x.weight <= 5);
```
````

Finally use the inline syntax to show the changes
```
[Click here to show changes](`filter1=filteredOnWeight`)
```