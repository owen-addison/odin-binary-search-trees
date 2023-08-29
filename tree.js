import Node from "./node.js";

// Tree factory
const Tree = () => {
  const root = buildTree();

  return {
    root,
  };
};

// Function for building tree
function buildTree(array) {
  /*
    PSEUDOCODE

    1. Sort array
    2. Remove duplicates
  */

  // Sort the array and remove duplicates using a sorting function and the Set() object
  const uniqSorted = [...new Set(array.sort((a, b) => a - b))];
}
