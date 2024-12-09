import { ArticleElement } from "@living-papers/components";
import { selectAll } from "d3-selection";

//change this?
import {
  hydrate,
  selectMarks,
  selectAllMarks,
  annotate,
} from "/Users/andrewzhang/Documents/DIVI/divi/dist/divi.mjs";

export default class Divi extends ArticleElement {
  static get properties() {
    return {
      simpleFilter: { type: Array },
      filter: { type: Array },
      annotation: { type: Array },
    };
  }

  constructor() {
    super();

    /**
     * A list of data entries specifying the filtering constraints for attributes defined within the chart,
     * where each entry contains either:
     * - attribute name (string)
     * - exact value to match (string|number)
     *
     * or
     *
     * - attribute name (string)
     * - minimum value of desired range (number)
     * - maximum value of desired range (number)
     *
     *  @type {Array<[string, (number|string), (number|undefined)]>}
     *  @example
     *  const simpleFilter = [
     *    ['name', 'Joe'],
     *    ['age', 20],
     *    ['height', 5, 6],
     *  ];
     *  This will filter the data by objects with name Joe, age 20, and height between 5 and 6.
     */
    this.simpleFilter = [];

    /**
     * A list of data entries specifying the filtering constraints for attributes not defined within the chart,
     * where each entry is an object from the original dataset. It is expected this list will be created using
     * the `filter` method in JavaScript
     *
     *  @type {Array<Object>}
     *  @example
     *  const filter = [
     *    {name: 'Joe', age: 20, height: 5.5, country: 'USA'},
     *    {name: 'Betty', age: 30, height: 5.2, country: 'USA'}
     *  ];
     *  This will filter the data by objects from the country 'USA'
     */
    this.filter = [];

    /**
     * A list of data entries specifying the annotations to show in the chart,
     * where each entry contains:
     * - x-coordinate of annotation in chart (number)
     * - y-coordinate of annotation in chart (number)
     * - annotation content (string)
     *
     *  @type {Array<[number, number, string]>}
     *  @example
     *  const annotation = [
     *    [2, 2, 'Annotation at (2,2)'],
     *    [5, 10, 'Annotation at (5,10)']
     *  ];
     *  This will create annotations at the coordinates (2,2) and (5,10) with their respective content.
     */
    this.annotation = [];
  }

  // Gather SVG from rendered child cell-view nodes
  initialChildNodes(nodes) {
    this.__children = nodes;
    this.__state = null;
    this.__svg = null;

    this.hydrateChildren();
  }

  // Call hydrate to retrieve chart metadata and use DIVI handlers to perform interactions
  hydrateChildren() {
    const that = this;
    this.__children.forEach((d) =>
      d.addEventListener("change", async function (event) {
        if (!that.__state) {
          that.__state = (await hydrate(event.target.value))[0];
          that.__svg = that.__state.svg.cloneNode(true);
        } else {
          selectAll(".annotation-group").remove();
          that.__state.svg = that.__svg;
        }

        const state = that.__state;
        let { svgMarks } = state;
        selectAllMarks(svgMarks);

        if (that.annotation.length > 0) {
          that.annotation.forEach((curr) => {
            const [x, y, value] = curr;
            annotate(state, x, y, value);
          });
        }
        if (that.filter.length > 0 || that.simpleFilter.length > 0) {
          let selectedMarks = [];
          svgMarks.forEach((d) => {
            const infer = d._inferred_data_;
            that.filter.forEach((s) => {
              if (verifySelection(infer, s)) {
                selectedMarks.push(d);
              }
            });
            that.simpleFilter.forEach((f) => {
              // Check for exact value match
              if (f.length === 2) {
                if (typeof f[1] === "number") {
                  if (compareNumbers(infer[f[0]], f[1])) {
                    selectedMarks.push(d);
                  }
                } else {
                  if (infer[f[0]] === f[1]) {
                    selectedMarks.push(d);
                  }
                }

                // Check value falls in range
              } else {
                if (infer[f[0]] >= f[1] && infer[f[0]] <= f[2]) {
                  selectedMarks.push(d);
                }
              }
            });
          });
          selectMarks(svgMarks, selectedMarks);
        }
      })
    );
  }

  render() {
    this.__children.forEach((d) => d.dispatchEvent(new Event("change")));
    return this.__children;
  }
}

/**
 * Compares two objects and returns true if both objects the same values for the same attributes
 * and false otherwise
 *
 * @param {Object} o1 - The first object to compare.
 * @param {Object} o2 - The second object to compare.
 * @returns {boolean} - Returns true if both objects are equal and false otherwise
 */
function verifySelection(o1, o2) {
  for (const [k, v] of Object.entries(o1)) {
    const v2 = o2[k];
    if (typeof v === "number") {
      if (!compareNumbers(v, v2)) {
        return false;
      }
    } else {
      if (v !== v2) {
        return false;
      }
    }
  }
  return true;
}

/**
 * Compares two numbers and rounds the first number to the same decimal places as the second number.
 * Returns true if both numbers are the same after rounding and false otherwise.
 *
 * @param {Object} n1 - The first number to compare.
 * @param {Object} n2 - The second object to compare.
 * @returns {boolean} - Returns true if both objects are equal after rounding and false otherwise
 */
function compareNumbers(n1, n2) {
  let decimals = 0;
  if (n2 % 1 != 0) {
    decimals = n2.toString().split(".")[1].length || 0;
  }
  if (Number(n1.toFixed(decimals)) !== n2) {
    return false;
  }
  return true;
}
