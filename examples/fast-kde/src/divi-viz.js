import { ArticleElement } from '@living-papers/components';
import { FULFILLED, PENDING } from '@living-papers/runtime';
import { html } from 'lit';
// import { CELL_VIEW } from 'living-papers/packages/runtime/src/constants.js';
// import { CellView } from '../../../packages/components/src/cell-view';
// import { ascending } from 'd3-array'
// import { hydrate } from 'uwdata-divi';
// import { Color } from 'd3-color'
// import { hydrate } from '/node_modules/uwdata-divi';

export default class Divi extends ArticleElement {

  static get properties() {
    return {
    //filepath of svg file (i.e. "figures/impulse_1d.svg")
      filepath: {type: String},
    };
  }

  constructor() {
    super();
    this.filepath = "";
    this.status = PENDING;
  }

  // code should be rendered as cell-view and should be a child
  initialChildNodes(nodes) {
    this.__children = nodes;
    this.__children.forEach(d => d.addEventListener('change', function(event) {
      console.log(event.target.value);
      // Call hydrate(event.target.value);
    }));
  }

  render() {
    return this.__children;
  }
}