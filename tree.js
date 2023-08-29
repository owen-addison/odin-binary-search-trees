import Node from "./node.js";

// Tree factory
const Tree = (array) => {
  // Sort the array and remove duplicates using a sorting function and the Set() object
  const uniqSorted = [...new Set(array.sort((a, b) => a - b))];

  const root = buildTree(uniqSorted, 0, uniqSorted.length - 1);

  return {
    root,
  };
};

// Function for building tree
function buildTree(array, start, end) {
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

export default Tree;
