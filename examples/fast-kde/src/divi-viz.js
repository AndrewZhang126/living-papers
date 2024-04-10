import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
// import { hydrate } from '/node_modules/uwdata-divi';
import { hydrate } from '/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs'


export default class Divi extends ArticleElement {

  static get properties() {
    return {
    };
  }

  constructor() {
    super();
  }

  // gather svg from rendered child cell-view nodes
  initialChildNodes(nodes) {
    this.__children = nodes;
    this.__children.forEach(d => d.addEventListener('change', function(event) {
      console.log(event.target.value);
      // Call hydrate(event.target.value);
      hydrate(event.target.value);
    }));
  }

  render() {
    return this.__children;
  }
}