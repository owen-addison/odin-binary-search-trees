import Node from "./node.js";

// Tree factory
const Tree = (array) => {
  // Sort the array and remove duplicates using a sorting function and the Set() object
  const uniqSorted = [...new Set(array.sort((a, b) => a - b))];

  const root = buildTree(uniqSorted);

  return {
    root,
  };
};

// Function for building tree
function buildTree(array, start, end) {
  /*
  PSEUDOCODE

  1. Sort array
  2. Remove duplicates
  3. Initialise the start, end and mid points of the array
  4. Check base case
  5. Set the root node to the mid point data of the array
  6. Recursively construct left subtree and make it the left child of root
  7. Recursively construct right subtree and make it the right child of root
  8. Return root node
  */

  // Check the base case
  if (start > end) {
    return null;
  }

  // Initialise start, end and mid points of array
  const mid = parseInt((start + end) / 2);
  // Make the middle element the root node
  const root = Node(array[mid]);

  // Recursively construct the left subtree and make it left child of root
  root.left = buildTree(array, start, mid - 1);

  // Recursively construct the right subtree and make it left child of root
  root.right = buildTree(array, mid + 1, end);

  // Return the root
  return root;
}
