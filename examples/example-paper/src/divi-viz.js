import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
// import { hydrate } from '/node_modules/uwdata-divi';
import { selectAll } from 'd3-selection';
import { hydrate, selectMarks, annotate } from '/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs'


export default class Divi extends ArticleElement {

  static get properties() {
    return {
      //interaction type
      modes: {type: Array},

      //values to manipulate
      values: {type: Array}
    };
  }

  constructor() {
    super();
    this.modes = [];
    this.values = [];
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
        that.modes.forEach((currMode, i) => {
          if (currMode === 'annotation') {
            that.values[i].forEach(currValue => {
              annotate(state, currValue[0], currValue[1], currValue[2]);
            })
          }
          else if (currMode === 'selection') {
            let { svgMarks } = state;
            let selectedMarks = [];
            console.log(svgMarks)
            svgMarks.forEach((d, j) => 
              {
                if (that.values[i].includes(j)) {
                  selectedMarks.push(d)
                  console.log(j)
                }
              }
            )
            selectMarks(svgMarks, selectedMarks);
          }
        })
      // })
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