import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
// import { hydrate } from '/node_modules/uwdata-divi';
import { hydrate } from '/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs'


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
    console.log(this.values)

    this.__children = nodes;
    this.__children.forEach(d => d.addEventListener('change', function(event) {
      // console.log(event.target.value);
      // hydrate(event.target.value);
      hydrate(event.target.value).then((result) => {
        console.log(result[0])
        const data = result[0].data.table._data._mark_.data
        console.log(data)

        //logs undefined
        console.log(this.values)

        // this.values.forEach((value) => {
        //   for (let element of data) {
        //     if (!(Object.values(element.__inferred__data__).includes(value))) {
        //       if (this.mode === 'select') {
        //         element.__opacity__ = "0"
        //       }
        //     }
        //   }
        // })

        for (let element of data) {
          if (element.__data__ === 3) {
            console.log("test 3")
            element.__opacity__ = "0"
          }
        }

      })
    }));
  }

  render() {
    return this.__children;
  }
}