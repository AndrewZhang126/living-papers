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

    //store divified svg
    this.svg = "";
    this.status = PENDING;
    // const targetNode = document.querySelector("divi-viz");
    // const config = { attributes: true }
    // console.log(targetNode);
    // const callback = (mutationList, observer) => {
    //   for (const mutation of mutationList) {
    //     console.log(mutation + " " + observer)
    //   }
    // };
    // const observer = new MutationObserver(callback);
    // observer.observe(targetNode, config)
    //check contents of children
    // console.log(this.__children)
  }

  // // code should be rendered as cell-view and should be a child
  // initialChildNodes(nodes) {
  //   console.log(nodes)
  //   const targetNode = document.querySelector("divi-viz");
  //   const config = { attributes: true }
  //   console.log(targetNode);
  //   const callback = (mutationList, observer) => {
  //     for (const mutation of mutationList) {
  //       console.log(mutation + " " + observer)
  //     }
  //   };
  //   const observer = new MutationObserver(callback);
  //   observer.observe(targetNode, config)
  // }

  //   // console.log(nodes)

  //   // nodes[0].addEventListener("change", function() { 
  //   //   console.log("Hello from " + nodes[0].observer); 
  //   // });
  //   // child should be cell-view

  //   //test if cell-view gets fulfilled
    
  //   // setInterval(function() { 
  //   //   console.log(nodes[0].observer);
  //   // }, 2000);

  //   // const map = new Map;
  //   // const rootNode = document.querySelector('divi-viz');
  //   // rootNode.querySelectorAll('cell-view').forEach(node => {
  //   //   map.set(+node.getAttribute('data-cell'), node.observer);
  //   // });
  //   // console.log(map)
    
  // // return def => map.get(def.cell);
  // //   const rootNode = document.querySelector('divi-viz');
  // //   rootNode.querySelectorAll('cell-view').forEach(node => {
  // //     console.log("test cell-view")
  // //     console.log(node)
  // //   });

  
  //   const firstChild = nodes[0]
  //   let svgContent = firstChild.value
  //   if (firstChild.status === FULFILLED) {
  //     console.log("fulfilled")
  //     svgContent = firstChild.value
  //     // this.__children.addNode(hydrate(svgContent))
  //     this.__children.addNode(svgContent)
  //   }
  //   // else if (firstChild.status === PENDING) {
  //   //   console.log("pending")
  //   //   //use event listener to figure out when status is fulfilled
  //   //   console.log(firstChild.observer)
  //   // }
  //   this.__children = nodes
  // }

  // //wait for cell-view to render
  // async getChild() {

  //   // const el = this.__children[0]
  //   // console.log(el)
  //   // wait for element to be ready, get content type
  //   // if (el.observer) {
  //   //   // wait for reactive runtime cell
  //   //   const value = await el.observer.promise();
  //   //   console.log("value: " + value)
  //   // }
  // }

  render() {
    // console.log(this.__children[0])
    // // console.log(this.__children[0].getElementsByClassName("plot-d6a7b5").innerHTML)
    // console.log(this.__children[0].contentDocument)
    // console.log(Object.entries(this.__children[0]));

    let tmp = this.__children[0];
    tmp.addEventListener('change', function(event) {
      console.log(event.target.value); 
    });


    const targetNode = document.querySelector("divi-viz");
    // console.log(targetNode);
    const config = { childList: true, subtree: true }

    let renderedSVG = "";
    // const callback = (mutationList, observer) => {
    //   for (const mutation of mutationList) {
    //     console.log(mutation.type + " " + observer.status)
    //   }
    // };
    // const observer = new MutationObserver(callback);
    let observer = new MutationObserver(function(mutations) {  
      mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
          let list_values = [].slice.call(targetNode.children);
          renderedSVG = list_values[0].getElementsByTagName("svg")[0]
          // console.log(list_values[0]);
          // console.log(renderedSVG);
        }
      });
    });
    observer.observe(targetNode, config);
  
    // observer.observe(targetNode, config);
    // observer.disconnect();
    return this.__children[0];
    // return this.__children[0];
    //should be children with fulfilled cell views and divi-fied svg?
    // console.log("test " + this.__children[0].value)
    // console.log(this.svg)
    // // setTimeout(function() { this.svg = this.__children[0].value; }, 10000);
    // this.__children[0].addEventListener("change", function() { 
    //   console.log("Hello from " +  this.__children[0].observer); 
    // });
    // console.log(this.svg)
    
    //create a div and display this svg
    // this.testroot = document.querySelector("test1");
    // console.log(this.testroot)
    // console.log.apply(this.code)
    // if (this.status === FULFILLED) {
    //   console.log(this.svg)
    // }
    // this.getChild();
    // this.connectedCallback()
    // // console.log(this.__children);
    // this._root = document.createElement('div');
    // this._root.innerHTML = "test";
    // return this._root;
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