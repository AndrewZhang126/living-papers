import { ArticleElement } from '@living-papers/components';
import { ascending } from 'd3-array'
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
  }

  render() {
    //create a div and display this svg
    this._root = document.createElement('div');
    const svgCode = '<svg <rect width="10" height="10" y="80"></rect> </svg>';
    const svgContainer = document.createElement('div');
    svgContainer.innerHTML = svgCode;
    console.log(ascending(1, 2));
    console.log('test');
    // hydrate(null);
    // hydrate(svgContainer)
    // Color();
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

// import { DependentElement } from '@living-papers/components';

// export default class Divi extends DependentElement {
//   static get dependencies() {
//     return [
//       {
//         name: '@uwdata/highlightjs',
//         version: '0.0.1',
//         main: 'dist/highlight.min.js',
//         css: 'dist/styles/github.css'
//       }
//     ]
//   }

//   static get properties() {
//     return {
//       code: {type: String},
//       inline: {type: Boolean},
//       language: {type: String}
//     };
//   }

//   constructor() {
//     super();
//     this.inline = false;
//     this.language = null;
//   }

//   initialChildNodes(nodes) {
//     // attempt to extract code from first child
//     if (!this.hasAttribute('code') && nodes.length) {
//       this.code = nodes[0].textContent.trim();
//     }
//   }

//   render() {
//     // console.log(ascending(1, 2));
//     const hljs = this.getDependency('@uwdata/highlightjs');
//     if (!hljs || !this.code) return;

//     const { language, inline } = this;
//     const root = document.createElement(inline ? 'code' : 'pre');
//     language
//       ? (root.innerHTML = hljs.highlight(this.code, { language }).value)
//       : (root.innerText = this.code);
//     console.log(root)
//     console.log(language)
//     return root;
//   }
// }
