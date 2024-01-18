import { ArticleElement } from '@living-papers/components';
// import { hydrate } from 'uwdata-divi';
import { hydrate } from '/node_modules/uwdata-divi';

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
  }


  render() {
    //create a div and display this svg
    this._root = document.createElement('div');
    const svgCode = '<svg <rect width="10" height="10" y="80"></rect> </svg>';
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgCode;
    hydrate(svgContainer)
    // this._root.innerHTML = `<img src="${this.svg}"/>`
    // let svg = fetch(this.filepath)
    //   .then(response => response.text())
    //   .catch(error => console.log(error))
    
    // this.svg = svg.then(result => console.log(result))
    // console.log("test1  " + this.svg)
    // console.log(this.svg)
    // this.svg = fetch(this.filepath)
    //   .then(response => response.text())
    //   .catch(text => console.log(text))

    // fetch(this.filepath)
    //   .then(response => response.text())
    //   .then(text => console.log(hydrate(text)))
    
    this._root.innerHTML = this.filepath;
    return this._root
  }
}

