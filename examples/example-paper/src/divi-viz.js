import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
// import { hydrate } from '/node_modules/uwdata-divi';
import { selectAll } from 'd3-selection';
import { hydrate, selectMarks, selectAllMarks, annotate } from '/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs'


export default class Divi extends ArticleElement {

  static get properties() {
    return {
      //interaction type
      // modes: {type: Array},

      // // values to manipulate
      // values: {type: Array},
      simpleFilter: {type: Array},
      filter: {type: Array},
      annotation: {type: Array},
    };
  }

  constructor() {
    super();
    // this.modes = [];
    // this.values = [];

    //[[x1, y1], [x2, y2]]
    this.filter = [];

    //[[x1, y1, note], [x2, y2, note]]
    this.annotation = [];

    //[[variable, min, max]]
    // rename brush
    this.simpleFilter = [];
  }

  // update(changedProperties) {
  //   console.log(changedProperties)
  //   // changedProperties.forEach((_, key) => {
  //   //   this._sim[key](this[key]);
  //   // });
  //   this.__children.forEach(d => d.dispatchEvent(new Event('change')))
  // }

  // gather svg from rendered child cell-view nodes
  initialChildNodes(nodes) {

    this.__children = nodes;
    this.__state = null;
    this.__svg = null;

    //making the call here removes typerror for undefined compared to in render
    this.hydrateChildren();
  }

  //inferred data is incorrect
  //clear marks? that way can do multiple handlers 
  hydrateChildren() {
    const that = this
    // console.log(this.__children)
    this.__children.forEach(d => d.addEventListener('change', async function(event) {
      if (!that.__state) {
        that.__state = (await hydrate(event.target.value, ))[0];
        that.__svg = that.__state.svg.cloneNode(true);
      } else {
        selectAll('.annotation-group').remove();
        that.__state.svg = that.__svg;
      }
      // hydrate(this.__svg).then((result) => {
        // const state = result[0];
        const state = that.__state;
        console.log(state)
        let { svgMarks } = state;
        selectAllMarks(svgMarks);
        if (that.annotation.length > 0) {
          that.annotation.forEach(curr => {
            const [x, y, value] = curr;
            console.log(x, y, value)
            annotate(state, x, y, value);
          });
        }
        if (that.filter.length > 0 || that.simpleFilter.length > 0) {
          let selectedMarks = [];
          svgMarks.forEach(d => {
            const infer = d._inferred_data_;
            that.filter.forEach(s => {
              if (verifySelection(infer, s)) {
                selectedMarks.push(d)
              }
            })
            that.simpleFilter.forEach(f => {
              if (f.length === 2) {
                console.log(f)
                console.log(infer[f[0]])
                console.log(f[1])
                if (typeof f[1] === 'number') {
                  if (compareNumbers(infer[f[0]], f[1])) {
                    selectedMarks.push(d)
                  }
                }
                else {
                  if (infer[f[0]] === f[1]) {
                    selectedMarks.push(d)
                  }
                }
              }
              else {
                if (infer[f[0]] >= f[1] && infer[f[0]] <= f[2]) {
                  selectedMarks.push(d)
                }
              }
            })

          })
        // svgMarks.forEach((d, j) => 
        //   {
        //     if (that.selection.includes(j)) {
        //       selectedMarks.push(d)
        //       console.log(j)
        //     }
        //   }
        // )
        console.log(selectedMarks)
        selectMarks(svgMarks, selectedMarks);

        }
    }));
  }


  // isNumber(x) {
  // }


  render() {
    // console.log('mode: ' + this.mode)
    // console.log('values: ' + this.values)
    // console.log(this.__children)

    //casues undefined error
    // this.hydrateChildren()
    this.__children.forEach(d => d.dispatchEvent(new Event('change')))
    return this.__children;
  }
}

function verifySelection(o1, o2) {
  for (const [k, v] of Object.entries(o1)) {
    const v2 = o2[k];
    if (typeof v === 'number') {
      // let decimals = 0;
      // if (v2 % 1 != 0) {
      //   decimals = v2.toString().split('.')[1].length || 0;
      // }
      // // console.log(typeof x1.toFixed(decimals))
      // // console.log(typeof x2)
      // if (Number(v.toFixed(decimals)) !== v2) {
      //   return false;
      // }
      if (!compareNumbers(v, v2)) {
        return false;
      }
    }
    else {
      if (v !== v2) {
        return false;
      }
    }
  }
  return true;
  // if (typeof x1 === 'number') {
  //   let decimals = 0;
  //   if (x2 % 1 != 0) {
  //     decimals = x2.toString().split('.')[1].length || 0;
  //   }
  //   console.log(typeof x1.toFixed(decimals))
  //   console.log(typeof x2)
  //   if (Number(x1.toFixed(decimals)) === x2) {
  //     console.log("bob")
  //     return true;
  //   }
  //   return false;
  // }
  // else {
  //   return x1 === x2;
  // }
}

function compareNumbers(n1, n2) {
  let decimals = 0;
    if (n2 % 1 != 0) {
      decimals = n2.toString().split('.')[1].length || 0;
    }
    // console.log(typeof x1.toFixed(decimals))
    // console.log(typeof x2)
    if (Number(n1.toFixed(decimals)) !== n2) {
      return false;
    }
    return true

}