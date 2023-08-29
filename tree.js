import Node from "./node.js";

// Tree factory
const Tree = (array) => {
  const root = buildTree(array);

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
    3. Initialise the start, end and mid points of the array
    4. Check base case
  */

  // Sort the array and remove duplicates using a sorting function and the Set() object
  const uniqSorted = [...new Set(array.sort((a, b) => a - b))];

  // Initialise start, end and mid points of array
  const start = 0;
  const end = uniqSorted.length - 1;
  const mid = parseInt((start + end) / 2);

  // Check the base case for recursion
  if (uniqSorted.length < 2) {
    return null;
  }
}
