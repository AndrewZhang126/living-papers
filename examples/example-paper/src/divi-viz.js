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
      selection: {type: Array},
      filter: {type: Array},
      annotation: {type: Array},
    };
  }

  constructor() {
    super();
    // this.modes = [];
    // this.values = [];

    //[[x1, y1], [x2, y2]]
    this.selection = [];

    //[[x1, y1, note], [x2, y2, note]]
    this.annotation = [];

    this.filter = [];
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
        that.__state = (await hydrate(event.target.value))[0];
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
        if (that.selection.length > 0 || that.filter.length > 0) {
          let selectedMarks = [];
          svgMarks.forEach(d => {
            const infer = d._inferred_data_;
            that.selection.forEach(s => {
              if (infer[s[0]] === s[1]) {
                selectedMarks.push(d)
              }
            })
            that.filter.forEach(f => {
              if (infer[f[0]] >= f[1] && infer[f[0]] <= f[2]) {
                console.log('hello')
                selectedMarks.push(d)
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