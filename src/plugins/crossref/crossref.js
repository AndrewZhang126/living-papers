import {
  getNodeName,
  getPropertyValue,
  setValueProperty,
  visitNodes
} from '../../ast/index.js';

const CROSSREF = 'cross-ref';
const XREF = 'xref';
const INDEX = 'index';

export default function(lookup) {
  return function(ast) {
    visitNodes(ast, node => {
      const name = getNodeName(node);
      if (name === CROSSREF) {
        const key = getPropertyValue(node, XREF);
        if (lookup.has(key)) {
          setValueProperty(node, INDEX, lookup.get(key));
        } else {
          console.warn(`Cross-reference key not found: ${key}`);
        }
      }
    });
    return ast;
  };
}
