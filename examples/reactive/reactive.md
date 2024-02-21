---
title: Reactive Runtime Example
author:
  - name: Living Papers Team
    org: University of Washington
output:
  html: true
  latex: true
  runtime: true
---

``` js { hide=true }
init = 128
```

``` js { hide=static }
viewof a = Inputs.range([0, 255], {step: 1, value: init})
```

::: figure
``` js
format = new Intl.NumberFormat().format
---
plot = Plot.plot({
  marks: [
   Plot.lineY([1,2,3])
  ],
})
```
| A plot of $$y = x^2$$ at $$x = ${a}$$, $$x^2 = ${a * a}$$.
:::

The square of `js a` is `js format(a * a)`.

::: .html:only
Living Papers articles can import reactive runtime content from other articles.
Here is [an article that reuses this article's plot](./import)!
:::
