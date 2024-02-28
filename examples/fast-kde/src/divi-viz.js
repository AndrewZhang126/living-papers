import { ArticleElement } from '@living-papers/components';
import { FULFILLED, PENDING } from '@living-papers/runtime';
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
    this.connectedCallback

    //store divified svg
    this.svg = "";
    this.status = PENDING;
    //check contents of children
    // console.log(this.__children)
  }

  // code should be rendered as cell-view and should be a child
  initialChildNodes(nodes) {
    // child should be cell-view

    //test if cell-view gets fulfilled 
    setInterval(function() { 
      console.log(nodes[0].status);
    }, 2000);
  
    const firstChild = nodes[0]
    let svgContent = firstChild.value
    if (firstChild.status === FULFILLED) {
      console.log("fulfilled")
      svgContent = firstChild.value
      // this.__children.addNode(hydrate(svgContent))
      this.__children.addNode(svgContent)
    }
    else if (firstChild.status === PENDING) {
      console.log("pending")
      //use event listener to figure out when status is fulfilled
      console.log(firstChild.observer)
    }
    this.__children = nodes
  }

  //wait for cell-view to render
  async getChild() {

    const el = this.__children[0]
    console.log(el)
    // wait for element to be ready, get content type
    if (el.observer) {
      // wait for reactive runtime cell
      const value = await el.observer.promise();
      console.log("value: " + value)
    }
  }

  render() {
    //should be children with fulfilled cell views and divi-fied svg?
    // console.log("test " + this.__children[0].value)
    // console.log(this.svg)
    // // setTimeout(function() { this.svg = this.__children[0].value; }, 10000);
    // document.addEventListener("change", function() { // (1)
    //   alert("Hello from " +  this.__children[0].observer); // Hello from H1
    // });
    // console.log(this.svg)
    
    //create a div and display this svg
    // this.testroot = document.querySelector("test1");
    // console.log(this.testroot)
    // console.log.apply(this.code)
    // if (this.status === FULFILLED) {
    //   console.log(this.svg)
    // }
    this.getChild();
    this._root = document.createElement('div');
    this._root.innerHTML = this.filepath;
    return this._root
    // const svgCode = '<svg <rect width="10" height="10" y="80"></rect> </svg>';
    // const svgContainer = document.createElement('div');
    // svgContainer.innerHTML = svgCode;
    // this._root.insertBefore(svgContainer);
    // console.log(ascending(1, 2));
    // console.log('test');
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
    
    // this._root.innerHTML = this.filepath;
  }
}