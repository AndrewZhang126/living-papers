import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
// import { hydrate } from '/node_modules/uwdata-divi';
// import { select } from 'd3-selection';
import { hydrate, selectMarks, annotate } from '/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs'


export default class Divi extends ArticleElement {

  static get properties() {
    return {
      //interaction type
      mode: {type: String},

      //values to manipulate
      values: {type: Array}
    };
  }

  constructor() {
    super();
    this.mode = "";
    this.values = [];
  }

  // gather svg from rendered child cell-view nodes
  initialChildNodes(nodes) {

    //logs ["AAPL"]
    this.__children = nodes;

    //making the call here removes typerror for undefined compared to in render
    this.hydrateChildren();
  }

  hydrateChildren() {
    console.log("hydrate")
    // const that = this
    this.__children.forEach(d => d.addEventListener('change', function(event) {
      hydrate(event.target.value).then((result) => {
        // const data = result[0].data.table._data._mark_.data
        // console.log(data)

        /*
        -- selectMarks API --
        */
        const state = result[0];
        const { svgMarks } = state;
        const selectedMarks = [svgMarks[0]]; // Select random mark
        selectMarks(svgMarks, selectedMarks); // Apply selection

        /*
        -- annotate API --
        */
       annotate(state, 3000, 'Chinstrap', 'annotation'); // Annotate in dataspace: (body_mass_g = 3000, species = Chinstrap)

        // for (let element of data) {
        //   console.log(element)
        //   if (that.values.indexOf(element.__data__) !== -1) {
        //     if (that.mode === 'select') {
        //       select(element).attr('opacity', 0)
        //     }
        //   }
        // }
      })
    }));
  }

  render() {
    // console.log('mode: ' + this.mode)
    // console.log('values: ' + this.values)
    // console.log(this.__children)

    //casues undefined error
    // this.hydrateChildren()
    return this.__children;
  }
}